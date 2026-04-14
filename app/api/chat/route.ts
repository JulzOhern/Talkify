import { convertToModelMessages, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

// Create a Google Generative AI client
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const result = streamText({
    model: google(process.env.AI_MODEL!),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
