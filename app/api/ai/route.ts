// app/api/ai/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const OR_BASE = "https://openrouter.ai/api/v1";
const MODEL = "tngtech/deepseek-r1t2-chimera:free";

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode } = (await req.json()) as {
      prompt: string;
      mode: "generate" | "summarize";
    };

    if (!prompt || !mode) {
      return NextResponse.json({ content: "", error: "Missing prompt or mode" }, { status: 400 });
    }

    const system =
      mode === "summarize"
        ? "You are a concise summarizer. Summarize faithfully in plain text only, without any markdown or formatting (such as **bold**, ## headings, or code blocks). Always use the same language as the user's input, and avoid any special characters or symbols like ''' or ###."
        : "You are a helpful writing assistant. Follow the instruction and produce clear, useful Markdown. Plain text only, without any markdown or formatting (such as **bold**, ## headings, or code blocks)";

    const body = {
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      temperature: mode === "summarize" ? 0.2 : 0.7,
      max_tokens: mode === "summarize" ? 2000 : 4000, // small safe caps
    };

    const res = await fetch(`${OR_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.SITE_URL || "https://matcha-time.vercel.app",
        "X-Title": process.env.APP_NAME || "MatchaTime",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { content: "", error: `OpenRouter error ${res.status}: ${text}` },
        { status: 200 }
      );
    }

    const data = await res.json();
    const content =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      data?.content ??
      "";

    return NextResponse.json({ content });
  } catch (e: any) {
    return NextResponse.json({ content: "", error: e?.message || "Server error" }, { status: 200 });
  }
}
