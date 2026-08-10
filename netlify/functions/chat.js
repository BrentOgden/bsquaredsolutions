import {
  BUSINESS_KNOWLEDGE,
  getFallbackAnswer,
} from "../../src/data/chatKnowledge.js";

const SYSTEM_PROMPT = `You are the website assistant for B Squared Solutions.

Use only the approved business information below. Be concise, friendly, and useful. Never invent prices, discounts, guarantees, timelines, availability, policies, or capabilities. If the answer is uncertain, custom, contractual, billing-related, or scheduling-related, direct the visitor to call 720-549-4203 or email info@bsquaredsolutions.io. When relevant, point visitors to /packages/, /products/, /templates/, /portfolio/, /faq/, or /contact/.

${BUSINESS_KNOWLEDGE}`;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const ipRequestHistory = new Map();

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

function getClientIp(event) {
  const headers = event?.headers || {};
  const netlifyIp = headers["x-nf-client-connection-ip"];
  if (netlifyIp) return netlifyIp;

  const forwardedFor = headers["x-forwarded-for"];
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  return null;
}

function isRateLimited(ip) {
  if (!ip) return false;

  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recentRequests = (ipRequestHistory.get(ip) || []).filter(
    (timestamp) => timestamp > cutoff
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequestHistory.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  ipRequestHistory.set(ip, recentRequests);

  if (ipRequestHistory.size > 500) {
    for (const [storedIp, timestamps] of ipRequestHistory.entries()) {
      const active = timestamps.filter((timestamp) => timestamp > cutoff);
      if (active.length) {
        ipRequestHistory.set(storedIp, active);
      } else {
        ipRequestHistory.delete(storedIp);
      }
    }
  }

  return false;
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

  const clientIp = getClientIp(event);
  if (isRateLimited(clientIp)) {
    logChatEvent({
      source: "local",
      reason: "ip_rate_limit",
      rateLimited: true,
    });

    return json(200, {
      answer: getFallbackAnswer(latestUserMessage),
      source: "local",
      rateLimited: true,
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    logChatEvent({
      source: "local",
      reason: "missing_api_key",
      rateLimited: false,
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
      rateLimited: false,
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
      rateLimited: false,
    });

    return json(200, {
      answer: getFallbackAnswer(latestUserMessage),
      source: "local",
    });
  }
};
