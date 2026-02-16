/*import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";


export async function POST(req: Request) {
  const result = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt: "It's nice to meet you!",
  });

  const response = new Response(
    JSON.stringify({ message: result.text }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
  console.log("Generated text:", response);
  return response;
}
*/

/*import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const result = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt: "It's nice to meet you!",
    });

    // ✅ Log the actual generated text
    console.log("Generated text:", result.text);

    // ✅ Return JSON properly
    return Response.json(
      { message: result.text },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error generating text:", error);

    return Response.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}*/

import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt,
  });

  return Response.json({
    reply: result.text,
  });
}


/*import { streamText, UIMessage, convertToModelMessages } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "meta/llama-3.1-8b",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
*/
