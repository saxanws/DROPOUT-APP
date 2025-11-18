import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY environment variable is not set" },
        { status: 500 }
      );
    }

    if (!process.env.MODEL_NAME) {
      return NextResponse.json(
        { error: "MODEL_NAME environment variable is not set" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.MODEL_NAME,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("OpenAI API error:", res.status, errorData);
      return NextResponse.json(
        { error: `Upstream error: ${res.status}` },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      output: data.choices?.[0]?.message?.content || "No response"
    });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: `Unable to process request: ${err.message}` },
      { status: 500 }
    );
  }
}
