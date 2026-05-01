import readline from "node:readline/promises";
import Groq from "groq-sdk";
import { vectorStore } from "./prepare.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function chat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const question = await rl.question("You: ");
    if (question.toLowerCase() === "exit" || question.toLowerCase() === "bye") {
      break;
    }
    const similarChunks = await vectorStore.similaritySearch(question, 3);

    const context = similarChunks
      .map((chunk) => chunk.pageContent)
      .join("\n\n");

    const userQuery = `Based on the following context, answer the question: ${question}\n\nContext:\n${context} Answer:`;

    const systemPrompt = `You are a helpful assistant that answers questions based on the following context, if you dont know the answer, simply responed with "Sorry, I don't know."`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userQuery,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    console.log("Assistant:", completion.choices[0].message.content);
  }
  rl.close();
}
chat();
