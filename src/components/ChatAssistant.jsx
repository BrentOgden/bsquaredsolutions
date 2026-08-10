import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  IoCallOutline,
  IoChatbubbleEllipsesOutline,
  IoClose,
  IoMailOutline,
  IoSend,
} from "react-icons/io5";
import {
  BUSINESS_CONTACT,
  CHAT_SUGGESTIONS,
  getFallbackAnswer,
} from "../data/chatKnowledge";

const SESSION_AI_REQUEST_LIMIT = 20;
const SESSION_AI_REQUESTS_KEY = "bsquared_chat_ai_requests";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I can help with B Squared Solutions services, pricing, timelines, SEO, templates, and maintenance. What can I help you with?",
};

function getStoredAiRequestCount() {
  if (typeof window === "undefined") return 0;

  try {
    const stored = Number(window.sessionStorage.getItem(SESSION_AI_REQUESTS_KEY));
    return Number.isFinite(stored) && stored > 0 ? stored : 0;
  } catch {
    return 0;
  }
}

function storeAiRequestCount(count) {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(SESSION_AI_REQUESTS_KEY, String(count));
  } catch {
    // Chat remains usable even when sessionStorage is unavailable.
  }
}

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-[#3d86ca] text-white rounded-br-md"
            : "bg-white text-slate-800 rounded-bl-md ring-1 ring-slate-200"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [aiRequestCount, setAiRequestCount] = useState(getStoredAiRequestCount);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, sending]);

  const addLocalAnswer = (text) => {
    setMessages((current) => [
      ...current,
      { role: "assistant", content: getFallbackAnswer(text) },
    ]);
  };

  const sendMessage = async (value) => {
    const text = String(value || "").trim();
    if (!text || sending) return;

    const userMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setSending(true);

    if (aiRequestCount >= SESSION_AI_REQUEST_LIMIT) {
      addLocalAnswer(text);
      setSending(false);
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.role === "user" || message.role === "assistant")
            .slice(-8),
        }),
      });

      if (!response.ok) throw new Error("Chat service unavailable");

      const data = await response.json();
      const answer = String(data?.answer || "").trim();
      if (!answer) throw new Error("Empty chat response");

      if (data?.source === "ai") {
        setAiRequestCount((current) => {
          const nextCount = Math.min(current + 1, SESSION_AI_REQUEST_LIMIT);
          storeAiRequestCount(nextCount);
          return nextCount;
        });
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: answer },
      ]);
    } catch {
      addLocalAnswer(text);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[120] sm:bottom-6 sm:right-6">
      {open ? (
        <section
          role="dialog"
          aria-label="B Squared Solutions chat assistant"
          className="mb-3 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2.5rem)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-white/20 bg-slate-950 shadow-2xl"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-[#0B3E73] via-[#145DA0] to-[#3D86CA] px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
                <IoChatbubbleEllipsesOutline className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">B Squared Assistant</p>
                <p className="text-xs text-white/80">Ask about services, pricing & support</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-white/85 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <IoClose className="h-6 w-6" />
            </button>
          </div>

          <div
            ref={messagesRef}
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <MessageBubble key={`${message.role}-${index}`} message={message} />
            ))}

            {messages.length === 1 ? (
              <div className="grid gap-2 pt-1">
                {CHAT_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-[#3d86ca] hover:text-[#145DA0]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}

            {sending ? (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-slate-500 ring-1 ring-slate-200">
                  Thinking…
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-slate-200 bg-white px-4 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={BUSINESS_CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                <IoCallOutline className="h-4 w-4" />
                Call
              </a>
              <a
                href={BUSINESS_CONTACT.emailHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                <IoMailOutline className="h-4 w-4" />
                Email
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-4">
            <div className="flex items-end gap-2 rounded-2xl border border-slate-300 bg-white p-2 focus-within:border-[#3d86ca] focus-within:ring-2 focus-within:ring-[#3d86ca]/15">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit(event);
                  }
                }}
                rows={1}
                maxLength={600}
                placeholder="Ask a question…"
                className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#3d86ca] text-white transition hover:bg-[#145DA0] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <IoSend className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-slate-500">
              <span>For custom quotes or urgent questions, contact us directly.</span>
              <Link to="/contact" onClick={() => setOpen(false)} className="font-semibold text-[#145DA0] hover:underline">
                Contact
              </Link>
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#145DA0] to-[#3D86CA] text-white shadow-xl ring-1 ring-white/30 transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#3d86ca]/30"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
      >
        {open ? <IoClose className="h-7 w-7" /> : <IoChatbubbleEllipsesOutline className="h-7 w-7" />}
      </button>
    </div>
  );
}
