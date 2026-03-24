"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════
   CrabbyBot Chat UI
   Premium dark-themed chat interface
   ═══════════════════════════════════════════════ */

// ── Types ──────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: Date;
}

// ── Icons (inline SVG) ─────────────────────────

const Icons = {
  plus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
  ),
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
  ),
  compass: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
  ),
  book: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
  send: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m22 2-7 20-4-9-9-4z" /><path d="m22 2-11 11" /></svg>
  ),
  copy: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
  ),
  retry: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
  ),
  attach: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
  ),
  sidebar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /></svg>
  ),
  menu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
  ),
  globe: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
  ),
  code: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  ),
  brain: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M19.938 10.5a4 4 0 0 1 .585.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M19.967 17.484A4 4 0 0 1 18 18" /></svg>
  ),
  wallet: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" /><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" /></svg>
  ),
  share: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></svg>
  ),
  dots: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
  ),
  edit: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
  ),
  bell: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
  ),
};

// ── Sample Data ────────────────────────────────

const SAMPLE_CHATS: ChatSession[] = [
  { id: "1", title: "Polymarket Election Analysis", lastMessage: "The latest odds show...", updatedAt: new Date() },
  { id: "2", title: "Portfolio Rebalancing Strategy", lastMessage: "Based on current allocations...", updatedAt: new Date(Date.now() - 3600000) },
  { id: "3", title: "ETH Price Prediction Model", lastMessage: "Running the multi-agent simulation...", updatedAt: new Date(Date.now() - 7200000) },
  { id: "4", title: "Smart Contract Audit Notes", lastMessage: "The reentrancy check passed...", updatedAt: new Date(Date.now() - 86400000) },
  { id: "5", title: "Daily Alpha Research Brief", lastMessage: "Today's market movers include...", updatedAt: new Date(Date.now() - 172800000) },
  { id: "6", title: "Token Launch Risk Assessment", lastMessage: "RugCheck score: 85/100...", updatedAt: new Date(Date.now() - 259200000) },
  { id: "7", title: "Trading Bot Configuration", lastMessage: "Max bet updated to $10...", updatedAt: new Date(Date.now() - 345600000) },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Show me the top trending Polymarket markets right now.",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "2",
    role: "assistant",
    content: `Here are the **top trending Polymarket markets** right now:

| # | Market | Volume | Yes Price |
|---|--------|--------|-----------|
| 1 | Will BTC hit $150k before July? | $2.4M | 32¢ |
| 2 | US Recession in 2026? | $1.8M | 28¢ |
| 3 | Next Fed Rate Decision | $1.2M | 65¢ |
| 4 | Ethereum ETF Inflows > $1B | $890K | 71¢ |
| 5 | AI Regulation Bill 2026 | $650K | 44¢ |

The BTC $150k market has seen **heavy buying on the Yes side** in the last 4 hours. Want me to dig deeper into any of these?`,
    timestamp: new Date(Date.now() - 90000),
  },
  {
    id: "3",
    role: "user",
    content: "Yes, analyze the BTC market. Also show me how to query it with the API.",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "4",
    role: "assistant",
    content: `## BTC $150k Market Analysis

**Market ID:** \`0x8f3a...7d2e\`
**Current Price:** Yes 32¢ / No 68¢
**24h Volume:** $412K (+180%)
**Open Interest:** $2.4M

### Sentiment Breakdown
The sharp price move from 18¢ → 32¢ correlates with the recent ETF inflow data. Whale wallets (>$10K positions) have increased their Yes exposure by 47%.

### API Query Example

\`\`\`python
import requests

# Fetch market data from Polymarket CLOB API
response = requests.get(
    "https://clob.polymarket.com/markets/0x8f3a7d2e",
    headers={"Accept": "application/json"}
)

market = response.json()
yes_price = market["outcomePrices"][0]
no_price = market["outcomePrices"][1]
volume = market["volume"]
print("Yes:", yes_price, "No:", no_price, "Volume:", volume)
\`\`\`

### My Take
At 32¢, this is pricing in roughly a **32% probability**. Given the current macro tailwinds and ETF momentum, I'd rate this as **slightly undervalued** (my model estimates ~38%). However, the July deadline is tight.

Want me to set up a price alert or place a position?`,
    timestamp: new Date(Date.now() - 30000),
  },
];

// ── Helpers ────────────────────────────────────

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ── Code Block Component ───────────────────────

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="chat-code-block my-3">
      <div className="chat-code-header">
        <span className="uppercase tracking-wider font-medium">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[rgba(240,230,211,0.06)] transition-colors text-text-secondary"
        >
          {copied ? Icons.check : Icons.copy}
          <span>{copied ? "Copied!" : "Copy code"}</span>
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

// ── Message Renderer ───────────────────────────

function MessageContent({ content }: { content: string }) {
  const parts: React.ReactNode[] = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Text before code block
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`} dangerouslySetInnerHTML={{
          __html: renderMarkdownInline(content.slice(lastIndex, match.index))
        }} />
      );
    }
    // Code block
    parts.push(
      <CodeBlock key={`code-${match.index}`} language={match[1] || "text"} code={match[2].trim()} />
    );
    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last code block
  if (lastIndex < content.length) {
    parts.push(
      <span key={`text-${lastIndex}`} dangerouslySetInnerHTML={{
        __html: renderMarkdownInline(content.slice(lastIndex))
      }} />
    );
  }

  return <div className="whitespace-pre-wrap leading-relaxed">{parts}</div>;
}

function renderMarkdownInline(text: string): string {
  return text
    // Headers
    .replace(/^### (.+)$/gm, '<span class="block text-text-primary font-semibold mt-4 mb-1 text-sm">$1</span>')
    .replace(/^## (.+)$/gm, '<span class="block text-text-primary font-bold mt-5 mb-2 text-base">$1</span>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[rgba(240,230,211,0.06)] text-accent text-[13px] font-mono">$1</code>')
    // Table rendering
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split("|").filter(c => c.trim());
      if (cells.every(c => /^[\s-:]+$/.test(c))) return ""; // separator row
      const isHeader = cells.some(c => c.trim().startsWith("#"));
      const tag = isHeader ? "th" : "td";
      const cellsHtml = cells
        .map(c => `<${tag} class="px-3 py-2 border-b border-border text-left text-sm">${c.trim()}</${tag}>`)
        .join("");
      return `<tr class="hover:bg-[rgba(240,230,211,0.02)]">${cellsHtml}</tr>`;
    })
    // Wrap consecutive table rows
    .replace(/((<tr[^>]*>.*<\/tr>\s*)+)/g, '<table class="w-full my-3 border-collapse">$1</table>');
}

// ── Typing Indicator ───────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-message-in">
      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-sm">🦀</span>
      </div>
      <div className="bg-bg-elevated rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex gap-1.5">
          <span className="typing-dot w-2 h-2 rounded-full bg-text-muted"></span>
          <span className="typing-dot w-2 h-2 rounded-full bg-text-muted"></span>
          <span className="typing-dot w-2 h-2 rounded-full bg-text-muted"></span>
        </div>
      </div>
    </div>
  );
}

// ── Main Chat Page ─────────────────────────────

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeChat, setActiveChat] = useState("1");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate assistant response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm processing your request. In a production environment, this would connect to the CrabbyBot Rust backend via WebSocket for real-time streaming responses.\n\nFor now, this is a UI demonstration of the chat interface. 🦀",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  }, [input]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleCopyMessage = useCallback((id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const actionChips = [
    { icon: Icons.chart, label: "Polymarket", color: "text-accent" },
    { icon: Icons.globe, label: "Web Search", color: "text-text-secondary" },
    { icon: Icons.code, label: "Code", color: "text-text-secondary" },
    { icon: Icons.brain, label: "Research", color: "text-text-secondary" },
    { icon: Icons.wallet, label: "Wallet", color: "text-text-secondary" },
  ];

  return (
    <div className="flex h-screen bg-bg-dark overflow-hidden">
      {/* ═══════ SIDEBAR ═══════ */}
      <aside
        className={`
          flex flex-col bg-bg-card border-r border-border
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${sidebarOpen ? "w-[260px] min-w-[260px]" : "w-0 min-w-0 overflow-hidden"}
        `}
      >
        {/* Logo + Menu */}
        <div className="flex items-center justify-between px-4 h-[60px] flex-shrink-0">
          <a href="/" className="flex items-center gap-2 font-bold text-text-primary text-sm">
            <Image src="/logo.png" alt="CrabbyBot" width={28} height={28} className="rounded-lg" />
            <span>CrabbyBot</span>
          </a>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted"
            aria-label="Close sidebar"
          >
            {Icons.menu}
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-3 mb-2">
          <button
            className="w-full flex items-center justify-center gap-2 h-10 rounded-xl
              bg-accent hover:bg-accent-hover text-white font-semibold text-sm
              transition-all duration-200 hover:shadow-[0_0_20px_rgba(232,93,42,0.3)]"
          >
            {Icons.plus}
            <span>New Chat</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-2 space-y-0.5 mb-4">
          {[
            { icon: Icons.compass, label: "Explore" },
            { icon: Icons.chart, label: "Polymarket" },
            { icon: Icons.book, label: "Library", badge: "12" },
            { icon: Icons.settings, label: "Settings" },
          ].map(({ icon, label, badge }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                text-text-secondary hover:text-text-primary hover:bg-bg-elevated
                transition-colors duration-150"
            >
              {icon}
              <span>{label}</span>
              {badge && (
                <span className="ml-auto text-xs bg-bg-elevated px-2 py-0.5 rounded-full text-text-muted">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Divider + Chat History */}
        <div className="px-4 mb-2">
          <span className="text-[11px] uppercase tracking-widest text-text-muted font-medium">Chats</span>
        </div>
        <div className="flex-1 overflow-y-auto chat-scroll px-2 space-y-0.5">
          {SAMPLE_CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`
                w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors duration-150
                ${activeChat === chat.id
                  ? "bg-bg-elevated text-text-primary border-l-2 border-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50"
                }
              `}
            >
              <div className="truncate">{chat.title}</div>
            </button>
          ))}
        </div>

        {/* Bottom User Area */}
        <div className="flex items-center gap-3 px-4 py-3 border-t border-border flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-sm">🦀</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-text-primary truncate">User</div>
            <div className="text-xs text-text-muted">Free plan</div>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted">
            {Icons.bell}
          </button>
          <button className="p-1.5 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted">
            {Icons.settings}
          </button>
        </div>
      </aside>

      {/* ═══════ MAIN CHAT AREA ═══════ */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Title Bar */}
        <header className="flex items-center justify-between px-4 lg:px-6 h-[60px] border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted mr-1"
                aria-label="Open sidebar"
              >
                {Icons.sidebar}
              </button>
            )}
            <h1 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <span className="text-base">🦀</span>
              Polymarket Election Analysis
              <button className="p-1 rounded hover:bg-bg-elevated transition-colors text-text-muted">
                {Icons.edit}
              </button>
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-bg-elevated transition-colors text-text-secondary text-sm">
              {Icons.share}
              <span>Share</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted">
              {Icons.settings}
            </button>
            <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted">
              {Icons.dots}
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto chat-scroll px-4 lg:px-0">
          <div className="max-w-[780px] mx-auto py-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex animate-message-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                    <span className="text-sm">🦀</span>
                  </div>
                )}

                <div
                  className={`
                    group max-w-[85%] relative
                    ${msg.role === "user"
                      ? "bg-bg-elevated rounded-2xl rounded-br-md px-4 py-3"
                      : "flex-1"
                    }
                  `}
                >
                  <div className={msg.role === "user" ? "text-sm text-text-primary" : "text-sm text-text-secondary"}>
                    <MessageContent content={msg.content} />
                  </div>

                  {/* Action bar */}
                  <div
                    className={`
                      flex items-center gap-2 mt-2 text-text-muted
                      ${msg.role === "user" ? "justify-end" : "justify-start"}
                    `}
                  >
                    <span className="text-[11px]">{formatTime(msg.timestamp)}</span>
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded
                        hover:bg-bg-elevated transition-colors opacity-0 group-hover:opacity-100"
                    >
                      {copiedId === msg.id ? Icons.check : Icons.copy}
                      <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                    </button>
                    {msg.role === "assistant" && (
                      <button className="flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded
                        hover:bg-bg-elevated transition-colors opacity-0 group-hover:opacity-100">
                        {Icons.retry}
                        <span>Retry</span>
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1 ml-3">
                    <span className="text-xs font-bold text-white">U</span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-border px-4 lg:px-0">
          <div className="max-w-[780px] mx-auto py-3">
            {/* Input Box */}
            <div className="relative bg-bg-elevated border border-border rounded-2xl focus-within:border-accent/40 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                rows={1}
                className="w-full bg-transparent resize-none px-4 pt-3 pb-12 text-sm text-text-primary
                  placeholder:text-text-muted outline-none min-h-[48px] max-h-[160px]"
              />

              {/* Bottom bar inside input */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2">
                {/* Action chips */}
                <div className="flex items-center gap-1">
                  {actionChips.map(({ icon, label, color }) => (
                    <button
                      key={label}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium
                        ${color} hover:bg-[rgba(240,230,211,0.06)] transition-colors whitespace-nowrap`}
                    >
                      {icon}
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Send + Attach */}
                <div className="flex items-center gap-1.5">
                  <button className="p-2 rounded-lg hover:bg-bg-card transition-colors text-text-muted">
                    {Icons.attach}
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={`p-2 rounded-lg transition-all duration-200
                      ${input.trim()
                        ? "bg-accent text-white hover:bg-accent-hover shadow-[0_0_12px_rgba(232,93,42,0.25)]"
                        : "bg-bg-card text-text-muted cursor-not-allowed"
                      }`}
                  >
                    {Icons.send}
                  </button>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-[11px] text-text-muted mt-2">
              CrabbyBot can make mistakes. Verify important information independently.
            </p>
          </div>
        </div>
      </main>

      {/* ═══════ RIGHT RAIL ═══════ */}
      <aside className="hidden xl:flex flex-col items-center w-12 border-l border-border py-3 gap-2 flex-shrink-0">
        <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted" title="Sidebar">
          {Icons.sidebar}
        </button>
        <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted" title="Tools">
          {Icons.settings}
        </button>
        <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors text-accent" title="Agent">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
        </button>
        <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted" title="Wallet">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
        </button>
        <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted" title="Tasks">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
        </button>
        <div className="flex-1" />
        <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted" title="Help">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
        </button>
      </aside>
    </div>
  );
}
