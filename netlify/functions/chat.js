import {
  BUSINESS_KNOWLEDGE,
  getFallbackAnswer,
} from "../../src/data/chatKnowledge.js";

const SYSTEM_PROMPT = `You are the website assistant for B Squared Solutions.

Use only the approved business information below. Be concise, friendly, and useful. Never invent prices, discounts, guarantees, timelines, availability, policies, or capabilities. If the answer is uncertain, custom, contractual, billing-related, or scheduling-related, direct the visitor to call 720-549-4203 or email info@bsquaredsolutions.io. When relevant, point visitors to /packages/, /products/, /templates/, /portfolio/, /faq/, or /contact/.

${BUSINESS_KNOWLEDGE}`;

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
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

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON" });
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
    return json(400, { error: "A user message is required" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    logChatEvent({
      source: "local",
      reason: "missing_api_key",
    });

    return json(200, {
      answer: getFallbackAnswer(latestUserMessage),
      source: "local",
    });
  }

  const model = process.env.OPENAI_MODEL || "gpt-5-mini";

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
        max_output_tokens: 250,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with ${response.status}`);
    }

    const data = await response.json();
    const answer = extractOutputText(data);
    const usage = data?.usage || {};

    logChatEvent({
      source: answer ? "ai" : "local",
      reason: answer ? "completed" : "empty_ai_output",
      model,
      inputTokens: usage.input_tokens ?? null,
      cachedInputTokens: usage.input_tokens_details?.cached_tokens ?? null,
      outputTokens: usage.output_tokens ?? null,
      reasoningTokens: usage.output_tokens_details?.reasoning_tokens ?? null,
      totalTokens: usage.total_tokens ?? null,
    });

    return json(200, {
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

    return json(200, {
      answer: getFallbackAnswer(latestUserMessage),
      source: "local",
    });
  }
};

export const config = {
  path: "/.netlify/functions/chat",
  rateLimit: {
    windowLimit: 30,
    windowSize: 600,
    aggregateBy: ["domain", "ip"],
  },
};
