import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { loadQARefineChain } from "langchain/chains";
// import { Document } from "@langchain/schema";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// Types
type PreparedData = { filePath: string; promptFriendlyContent: string };

export default class EmbeddingHandler {
  static async qa(question: string, entries: PreparedData[]) {
    const model = new OpenAI({ temperature: 0, modelName: "gpt-4o-mini" });
    const chain = loadQARefineChain(model);
    const docs = entries.map(
      (entry) =>
        new Document({
          pageContent: entry.promptFriendlyContent,
          metadata: { source: entry.filePath },
        }),
    );
    const embeddings = new OpenAIEmbeddings();
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
    const relevantDocs = await store.similaritySearch(question);
    const res = await chain.call({
      input_documents: relevantDocs,
      question,
    });

    return res.output_text;
  }
}
