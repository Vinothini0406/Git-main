
import { db } from '@/server/db';
import { GithubRepoLoader } from '@langchain/community/document_loaders/web/github';
import { Document } from '@langchain/core/documents';
import { generateEmbedding, summariseCode } from './gemini';


export const loadGithubRepo = async (
  githubUrl: string,
  githubToken?: string
) => {
  // Use provided token or fall back to environment variable for authenticated requests
  const token = githubToken || process.env.GITHUB_TOKEN || ''
  
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: token,
    branch: 'main',
    ignoreFiles: [
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml'
    ],
    recursive: true,
    unknown: 'warn',
    maxConcurrency: 5
  })

  const docs = await loader.load()
  return docs
}

export  const indexGithubRepo = async (projectId : string ,githubUrl: string, githubToken?: string) => {
  const docs = await loadGithubRepo(githubUrl, githubToken)
  const allEmbeddings = await generateEmbeddings(docs)
  await Promise.allSettled(allEmbeddings.map(async(embedding,index)=>{
    console.log(`processing embedding ${index} of ${allEmbeddings.length}`)
    if(!embedding) return

    const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
        data : {
            summary: embedding.summary,
            sourceCode : embedding.sourceCode,
            fileName : embedding.fileName,
            projectId,
        }
    })
     await db.$executeRaw`
     UPDATE "SourceCodeEmbedding"
     SET embedding = ${embedding.embedding} :: vector
     WHERE "id" = ${sourceCodeEmbedding.id}
     `

  }))
}

const generateEmbeddings = async (docs: Document[]) => {
    const results = await Promise.allSettled(docs.map(async doc=>{
        const summary = await summariseCode(doc)
        const embedding = await generateEmbedding(summary)
        
        // Skip if embedding is null (from empty summary)
        if (!embedding) {
            return null
        }
        
        return {
            summary,
            embedding,
            sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
            fileName: doc.metadata.source,
        }
    }))
    
    // Filter out failed promises and null results
    return results
        .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
        .map(result => result.value)
        .filter((value): value is any => value !== null)

}