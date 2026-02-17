import { summariseCode, generateEmbedding, aiSummariseCommit } from "./gemini";
import { Document } from "@langchain/core/documents";

async function runTest() {
    console.log("🚀 Starting Gemini Code Test...\n");

    // 1. Test summariseCode
    console.log("--- Testing summariseCode ---");
    const testDoc = new Document({
        pageContent: "console.log('hello world'); function add(a, b) { return a + b; }",
        metadata: { source: "test-file.js" }
    });
    const summary = await summariseCode(testDoc);
    console.log("Summary Result:", summary || "FAILED (Empty)");

    // 2. Test generateEmbedding
    console.log("\n--- Testing generateEmbedding ---");
    if (summary) {
        const embedding = await generateEmbedding(summary);
        if (embedding && embedding.length > 0) {
            console.log(`✅ Success: Generated embedding array of length ${embedding.length}`);
        } else {
            console.log("❌ Failed: Embedding was null or empty.");
        }
    }

    // 3. Test aiSummariseCommit
    console.log("\n--- Testing aiSummariseCommit ---");
    const testDiff = `
diff --git a/main.js b/main.js
+ console.log("Added a new feature");
- console.log("Old buggy code");
    `;
    const commitSummary = await aiSummariseCommit(testDiff);
    console.log("Commit Summary:", commitSummary);

    console.log("\n✅ Test sequence complete.");
}

runTest().catch(console.error);