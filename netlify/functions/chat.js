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
    return json(200, {
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
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        store: false,
        instructions: SYSTEM_PROMPT,
        input: messages,
        max_output_tokens: 350,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with ${response.status}`);
    }

    const data = await response.json();
    const answer = extractOutputText(data);

    return json(200, {
      answer: answer || getFallbackAnswer(latestUserMessage),
      source: answer ? "ai" : "local",
    });
  } catch (error) {
    console.error("Chat assistant error:", error);
    return json(200, {
      answer: getFallbackAnswer(latestUserMessage),
      source: "local",
    });
  }
};
