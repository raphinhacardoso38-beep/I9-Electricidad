import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, Send, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMPANY, telUrl } from "@/lib/site-config";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "¡Hola! Bienvenido. Somos especialistas en Electricidad, Aire Acondicionado y Albañilería. ¿En qué podemos ayudarte?",
};

const STORAGE_KEY = "sg_chat_history_v1";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Msg[];
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12) }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ??
            `No dispongo de esa información. Puedes llamarnos al ${COMPANY.phone} o escribirnos a ${COMPANY.email}.`,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Lo siento, ha ocurrido un problema. Llámanos al ${COMPANY.phone} o escríbenos a ${COMPANY.email}.`,
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir chat"
        className={cn(
          "fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105 active:scale-95",
          open && "rotate-90",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 flex h-[min(70vh,540px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
          style={{ animation: "float-in 0.25s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Asistente Online</p>
              <p className="truncate text-xs opacity-80">Normalmente respondemos al instante</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-secondary/30 px-3 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}
              >
                {m.role === "assistant" && (
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                )}
                <div
                  className={cn(
                    "max-w-[78%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-card text-card-foreground shadow-soft",
                  )}
                >
                  {m.content}
                </div>
                {m.role === "user" && (
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </span>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1.5 px-2 text-muted-foreground">
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
              </div>
            )}
          </div>

          <div className="border-t border-border bg-card p-2.5">
            <div className="flex items-end gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Escribe tu mensaje..."
                className="flex-1 rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-ring"
              />
              <Button
                size="icon"
                className="h-10 w-10 shrink-0 rounded-xl"
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <a
              href={telUrl}
              className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
            >
              <Phone className="h-3.5 w-3.5" /> ¿Prefieres hablar? {COMPANY.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
