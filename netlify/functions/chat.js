import {
  BUSINESS_KNOWLEDGE,
  getFallbackAnswer,
} from "../../src/data/chatKnowledge.js";

const SYSTEM_PROMPT = `You are the website assistant for B Squared Solutions.

Use only the approved business information below. Be concise, friendly, and useful. Never invent prices, discounts, guarantees, timelines, availability, policies, or capabilities. If the answer is uncertain, custom, contractual, billing-related, or scheduling-related, direct the visitor to call 720-549-4203 or email info@bsquaredsolutions.io.

FORMAT
- Write responses in clean Markdown.
- Start with a short direct answer or recommendation.
- Use short paragraphs and bullet lists when they improve readability.
- Use bold labels sparingly for important recommendations or prices.
- When a relevant B Squared page exists, include a short clickable Markdown link near the end.
- Only use these approved internal link destinations: /packages/, /products/, /templates/, /portfolio/, /faq/, /contact/, and /packages/#maintenance.
- For phone contact, use [Call 720-549-4203](tel:+17205494203).
- For email contact, use [Email info@bsquaredsolutions.io](mailto:info@bsquaredsolutions.io).
- Do not create external links, raw URLs, tables, code blocks, or HTML.
- Do not repeat every available link. Include only the links that are useful for the visitor's question.

${BUSINESS_KNOWLEDGE}`;

function json(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init.headers || {}),
    },
  });
}

function extractOutputText(data) {
  const texts = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "output_text" && content?.text) {
        texts.push(content.text);
      }
    }
  }
  return texts.join("\n").trim();
}

function logChatEvent(details) {
  console.log(
    JSON.stringify({
      event: "chat_assistant",
      timestamp: new Date().toISOString(),
      ...details,
    })
  );
}

export default async (request) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-5-mini";

  if (request.method === "GET") {
    return json({
      status: "ok",
      aiConfigured: Boolean(apiKey),
      model,
    });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages)
    ? body.messages
        .filter(
          (message) =>
            (message?.role === "user" || message?.role === "assistant") &&
            typeof message?.content === "string"
        )
        .slice(-8)
        .map((message) => ({
          role: message.role,
          content: message.content.slice(0, 1200),
        }))
    : [];

  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user")?.content;

  if (!latestUserMessage) {
    return json({ error: "A user message is required" }, { status: 400 });
  }

  if (!apiKey) {
    logChatEvent({
      source: "local",
      reason: "missing_api_key",
    });

    return json({
      answer: getFallbackAnswer(latestUserMessage),
      source: "local",
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        store: false,
        instructions: SYSTEM_PROMPT,
        input: messages,
        reasoning: { effort: "low" },
        text: { verbosity: "low" },
        max_output_tokens: 600,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `OpenAI request failed with ${response.status}: ${errorBody.slice(0, 300)}`
      );
    }

    const data = await response.json();
    const answer = extractOutputText(data);
    const usage = data?.usage || {};

    logChatEvent({
      source: answer ? "ai" : "local",
      reason: answer ? "completed" : "empty_ai_output",
      model,
      responseStatus: data?.status ?? null,
      incompleteReason: data?.incomplete_details?.reason ?? null,
      inputTokens: usage.input_tokens ?? null,
      cachedInputTokens: usage.input_tokens_details?.cached_tokens ?? null,
      outputTokens: usage.output_tokens ?? null,
      reasoningTokens: usage.output_tokens_details?.reasoning_tokens ?? null,
      totalTokens: usage.total_tokens ?? null,
    });

    return json({
      answer: answer || getFallbackAnswer(latestUserMessage),
      source: answer ? "ai" : "local",
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "chat_assistant_error",
        timestamp: new Date().toISOString(),
        message: error instanceof Error ? error.message : "Unknown chat error",
      })
    );

    logChatEvent({
      source: "local",
      reason: "ai_request_error",
      model,
    });

    return json({
      answer: getFallbackAnswer(latestUserMessage),
      source: "local",
    });
  }
};

export const config = {
  path: "/api/chat",
  rateLimit: {
    windowLimit: 30,
    windowSize: 180,
    aggregateBy: ["domain", "ip"],
  },
};
