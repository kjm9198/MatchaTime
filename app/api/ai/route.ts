import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, mode } = await req.json();

  // Define system prompt based on mode
  const systemPrompt =
    mode === "summarize"
      ? "Summarize into clean Markdown. Use only '#' headings (no '**bold** headings'). Use '-' bullets and numbered lists. No code fences/backticks — return raw Markdown only."
      : "Generate clean Markdown. Use only '#' headings (no '**bold** headings'). Use '-' bullets and numbered lists. No code fences/backticks — return raw Markdown only.";

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://matcha-time.vercel.app", // optional, helps OpenRouter dashboard
        "X-Title": "MatchaTime", // optional
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free", // 🔒 locked to DeepSeek free
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content || "";

    return NextResponse.json({ content });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}