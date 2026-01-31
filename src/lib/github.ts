// import "dotenv/config";
// import { db } from "@/server/db";
// import {Octokit } from "octokit"
// import { string } from "zod";



// export const octokit = new Octokit({
//     auth: process.env.GITHUB_TOKEN,
// })


// const githubUrl='https://github.com/Vinothini0406/Git-main'


// type Response={
//     commitHash: string;
//     commitMessage: string;
//     commitAuthorName: string;
//     commitAuthorAvatar: string;
//     commitDate: string;
// }
// export const getCommitHashes  = async (githubUrl: string): Promise <Response[]> => {
//     const [owner,repo] = githubUrl.split('/').slice(-2)
//     if(!owner || !repo){
//         throw new Error("Invalid GitHub URL");
//     }
//      const {data} = await octokit.rest.repos.listCommits({
//         owner,
//         repo
//      });
//      const sortedCommits = data.sort((a: any, b: any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any[];
//      return sortedCommits.slice(0,10).map((commit: any) => ({
//         commitHash: commit.sha as string,
//         commitMessage: commit.commit.message ?? "",
//         commitAuthorName: commit.commit?.author?.name ?? "",
//         commitAuthorAvatar: commit?.author?.avatar_url ?? "",
//         commitDate: commit.commit?.author?.date ?? "",
//      }));
// }

// export const pollCommits = async (projectId : string) =>{
//     const {project, githubUrl} = await fetchProjectGithubUrl(projectId);
//     const commitHashes = await getCommitHashes(githubUrl);
//     const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);
//     return unprocessedCommits
// }

// async function summariseCommit(githubUrl: string, commitHash: string){

// } 

// async function fetchProjectGithubUrl(projectId: string){
//      const project = await db.project.findUnique({
//         where: {id: projectId},
//         select: {
//             githubUrl: true
//         },
//      })
//      if(!project?.githubUrl){
//         throw new Error("Project has no GitHub URL");
//      }
//      return {project, githubUrl: project?.githubUrl};
// }

// async function filterUnprocessedCommits(projectId: string, commitHashes: Response[]){
//     const processedCommits = await db.commit.findMany({
//         where: {
//             projectId: projectId,

//         }
//     });
//     const unprocessedCommits = commitHashes.filter(commit => !processedCommits.some((processesCommit)=> processesCommit.commitHash === commit.commitHash));
//     return unprocessedCommits;
// }
// await pollCommits('cml26412p0000j7a4zjesjc4z').then(console.log)

import "dotenv/config"
import { db } from "@/server/db"
import { Octokit } from "octokit"

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

type Response = {
  commitHash: string
  commitMessage: string
  commitAuthorName: string
  commitAuthorAvatar: string
  commitDate: string
}

function normalizeGithubUrl(url: string) {
  return url
    .replace("https://github.com/", "")
    .replace(".git", "")
    .replace(/\/$/, "")
}

export const getCommitHashes = async (
  githubUrl: string
): Promise<Response[]> => {
  const normalized = normalizeGithubUrl(githubUrl)
  const [owner, repo] = normalized.split("/")

  if (!owner || !repo) {
    throw new Error("Invalid GitHub URL")
  }

  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
    per_page: 10,
  })

  return data.map((commit) => ({
    commitHash: commit.sha,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit.author?.name ?? "",
    commitAuthorAvatar: commit.author?.avatar_url ?? "",
    commitDate: commit.commit.author?.date ?? "",
  }))
}

export const pollCommits = async (projectId: string) => {
  const { githubUrl } = await fetchProjectGithubUrl(projectId)
  const commits = await getCommitHashes(githubUrl)
  const unprocessed = await filterUnprocessedCommits(projectId, commits)
  return unprocessed
}

async function fetchProjectGithubUrl(projectId: string) {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { githubUrl: true },
  })

  if (!project?.githubUrl) {
    throw new Error("Project has no GitHub URL")
  }

  return { githubUrl: project.githubUrl }
}

async function filterUnprocessedCommits(
  projectId: string,
  commits: Response[]
) {
  const processed = await db.commit.findMany({
    where: { projectId },
    select: { commitHash: true },
  })

  return commits.filter(
    (commit) =>
      !processed.some(
        (processedCommit) =>
          processedCommit.commitHash === commit.commitHash
      )
  )
}

await pollCommits("cml26412p0000j7a4zjesjc4z").then(console.log)
