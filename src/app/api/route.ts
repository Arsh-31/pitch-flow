import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command",
      prompt: `Write a catchy marketing tagline for the following product:\n"${message}"\nOnly output the tagline. No explanations, no extra text.`,
      max_tokens: 60,
      temperature: 0.9,
      k: 0,
      p: 0.75,
      stop_sequences: [],
      return_likelihoods: "NONE",
    }),
  });

  const data = await response.json();
  const rawOutput = data.generations?.[0]?.text?.trim() || "";
  const cleanedOutput = rawOutput
    .replace(/^["'\n\s]*(Tagline:)?\s*/i, "")
    .replace(/["'\n\s]*$/, "");

  return NextResponse.json({ output: cleanedOutput });
}
