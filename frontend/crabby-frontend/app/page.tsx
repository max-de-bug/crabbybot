"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════
   CrabbyBot Landing Page
   ═══════════════════════════════════════════════ */

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            setTimeout(() => {
              el.classList.add("visible");
            }, parseInt(delay));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ══════ NAVBAR ══════ */}
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 [&.scrolled]:bg-bg-dark/85 [&.scrolled]:backdrop-blur-xl [&.scrolled]:border-b [&.scrolled]:border-border"
      >
        <div className="mx-auto max-w-[1200px] flex items-center justify-between h-[72px]">
          <a href="#" className="flex items-center gap-2.5 font-bold text-text-primary">
            <Image src="/logo.png" alt="CrabbyBot" width={32} height={32} className="rounded-lg" />
            <span>CrabbyBot</span>
          </a>

          <ul className="hidden md:flex gap-8 list-none">
            {["Features", "How It Works", "Screenshots", "Architecture"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://github.com/max-de-bug/CrabbyBot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-text-primary hover:text-accent transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://github.com/max-de-bug/CrabbyBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-hover hover:shadow-[0_8px_32px_var(--accent-glow)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started — It&apos;s Free
            </a>
          </div>
        </div>
      </nav>

      {/* ══════ HERO ══════ */}
      <section className="pt-[140px] pb-24 lg:pb-32 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-5 py-2 bg-bg-elevated border border-border rounded-full text-xs font-medium text-text-secondary mb-8">
              <span className="text-base">🦀</span>
              <span>Open Source · Pure Rust · Self-Hosted</span>
            </div>

            <h1 className="animate-fade-in-up delay-100 font-serif text-[clamp(3.5rem,7vw,6rem)] leading-[1] tracking-tight text-bg-cream mb-6">
              Crypto<br />AI Agent
            </h1>

            <p className="animate-fade-in-up delay-200 text-base lg:text-lg leading-relaxed text-text-secondary mb-8 max-w-[440px]">
              Deep market intelligence, autonomous research, and real-time prediction analysis.
              All powered by one blazing-fast agent.
            </p>

            {/* Proof bar */}
            <div className="animate-fade-in-up delay-300 flex flex-wrap items-center gap-6 py-5 mb-10 border-t border-b border-border">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-text-primary">Pure Rust</span>
                <span className="text-[11px] uppercase tracking-wider text-text-muted">Zero Runtime Deps</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-border" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-text-primary">Sub-ms</span>
                <span className="text-[11px] uppercase tracking-wider text-text-muted">Local Routing</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-border" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-text-primary">★ 4.9</span>
                <span className="text-[11px] uppercase tracking-wider text-text-muted">Developer Score</span>
              </div>
            </div>

            <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <a
                href="https://github.com/max-de-bug/CrabbyBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-hover hover:shadow-[0_8px_32px_var(--accent-glow)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Download — It&apos;s Free
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-text-primary hover:text-accent transition-colors flex items-center gap-1.5 group"
              >
                See How It Works{" "}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>
          </div>

          {/* Right — Agent Card */}
          <div className="animate-fade-in-left delay-200 max-w-[520px] lg:max-w-none">
            <div className="bg-bg-card border border-border rounded-2xl p-7 relative overflow-hidden">
              {/* Top shine */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {/* Header dots */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-[7px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e8b72a]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
                </div>
                <span className="text-[11px] font-medium text-text-muted">CrabbyBot Agent</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-5">
                <button className="px-5 py-2 rounded-full border border-border text-text-secondary text-[11px] font-semibold tracking-wider transition-colors hover:border-border-hover">
                  RESEARCH
                </button>
                <button className="px-5 py-2 rounded-full bg-bg-cream text-text-dark border border-bg-cream text-[11px] font-semibold tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                  PREDICT
                </button>
                <button className="px-5 py-2 rounded-full border border-border text-text-secondary text-[11px] font-semibold tracking-wider transition-colors hover:border-border-hover">
                  DEPLOY
                </button>
              </div>

              {/* Prompt */}
              <div className="bg-bg-cream rounded-xl px-5 py-4 mb-4 flex items-center">
                <span className="text-sm text-text-dark">Analyze Polymarket top movers today</span>
                <span className="w-0.5 h-[18px] bg-accent ml-0.5 animate-cursor-blink" />
              </div>

              {/* Chips */}
              <div className="flex gap-2 flex-wrap mb-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-bg-elevated border border-border rounded-full text-xs font-medium text-text-secondary">
                  <span>🔮</span> Prediction Engine
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-bg-elevated border border-border rounded-full text-xs font-medium text-text-secondary">
                  <span>⚡</span> WebSocket Stream
                </span>
              </div>

              {/* Integration bubbles */}
              <div className="flex gap-3">
                {[
                  { title: "Telegram", icon: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
                  { title: "Discord", icon: "M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.11 13.11 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.076.076 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" },
                  { title: "CLI", icon: "M2 4v16h20V4H2zm2 2h16v12H4V6zm2 2v2h2V8H6zm0 4v2h8v-2H6z" },
                  { title: "Polymarket", icon: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" },
                ].map((item) => (
                  <div
                    key={item.title}
                    title={item.title}
                    className="w-11 h-11 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d={item.icon} />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PROBLEM ══════ */}
      <section className="py-24 lg:py-32 bg-bg-card border-t border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <p className="reveal text-center text-xs font-semibold tracking-[0.12em] uppercase text-accent mb-4">
            The Problem
          </p>
          <h2 className="reveal text-center font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.15] text-text-primary mb-12" data-delay="100">
            Crypto moves at light speed.<br className="hidden sm:block" />Your tools don&apos;t.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📋", title: "Manual Fragmentation", desc: "Copy-pasting between 5 different scanner tools. No unified intelligence layer connecting research to action." },
              { icon: "🕳️", title: "Missed Alpha", desc: "Scrolling through noise at 2am trying to find signals. By the time you find them, they're priced in." },
              { icon: "🤯", title: "Expensive & Isolated", desc: "Paying $200/month for tools that don't talk to each other. No single platform connects prediction, research, and execution." },
              { icon: "🔒", title: "Zero Privacy", desc: "Cloud-hosted SaaS tools see your queries, your keys, your strategies. Your edge is their data." },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal p-8 rounded-2xl border border-border bg-bg-dark hover:border-border-hover hover:-translate-y-1 transition-all duration-300"
                data-delay={String(150 + i * 50)}
              >
                <span className="text-3xl block mb-4">{item.icon}</span>
                <h3 className="text-base font-semibold text-text-primary mb-2.5">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FEATURES ══════ */}
      <section id="features" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <p className="reveal text-center text-xs font-semibold tracking-[0.12em] uppercase text-accent mb-4">
            The Fix
          </p>
          <h2 className="reveal text-center font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.15] text-text-primary mb-12" data-delay="100">
            One agent. Every edge.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🔮", title: "Prediction Market Intelligence", desc: "Native WebSocket integration with Polymarket. Live probability tracking, automated alpha scoring, and actionable prediction reports — streamed in real-time." },
              { icon: "🧠", title: "Autonomous Research Loop", desc: "Schedule daily market briefings, automated trend analysis, and recurring intelligence tasks. CrabbyBot fetches, processes, and summarizes — autonomously." },
              { icon: "📲", title: "Multi-Channel Deployment", desc: "Runs on Telegram, Discord, and CLI simultaneously. Slash commands like /alpha, /portfolio for instant interaction from anywhere." },
              { icon: "🛠️", title: "Extensible Skills System", desc: "Drop a Markdown file into the skills directory and the agent learns new workflows instantly. No redeploy. No downtime. Infinite extensibility." },
              { icon: "⚡", title: "Sub-Millisecond Routing", desc: "Built in pure Rust with zero runtime dependencies. Event-driven architecture with concurrent message processing across all channels." },
              { icon: "🔐", title: "Self-Hosted & Private", desc: "Runs on your server. Your keys never leave your machine. No cloud provider sees your strategies, your portfolio, or your alpha." },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal group p-9 rounded-2xl border border-border bg-bg-card hover:border-border-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                data-delay={String(150 + i * 50)}
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-[52px] h-[52px] rounded-[14px] bg-bg-elevated border border-border flex items-center justify-center mb-5">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-[1.05rem] font-semibold text-text-primary mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SCREENSHOTS ══════ */}
      <section id="screenshots" className="py-24 lg:py-32 bg-bg-card border-t border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <p className="reveal text-center text-xs font-semibold tracking-[0.12em] uppercase text-accent mb-4">
            In Action
          </p>
          <h2 className="reveal text-center font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.15] text-text-primary mb-12" data-delay="100">
            See it working.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large screenshot spanning full width */}
            <div className="reveal md:col-span-2 rounded-2xl overflow-hidden border border-border bg-bg-dark hover:border-border-hover hover:-translate-y-0.5 transition-all duration-300" data-delay="150">
              <div className="px-5 py-4 text-[11px] font-semibold tracking-wider uppercase text-text-muted border-b border-border">
                CLI — Prediction Analysis
              </div>
              <Image
                src="/screenshots/cli.png"
                alt="CrabbyBot CLI running prediction analysis"
                width={1200}
                height={420}
                className="w-full h-auto object-cover object-top max-h-[420px]"
              />
            </div>

            {/* Telegram */}
            <div className="reveal rounded-2xl overflow-hidden border border-border bg-bg-dark hover:border-border-hover hover:-translate-y-0.5 transition-all duration-300" data-delay="200">
              <div className="px-5 py-4 text-[11px] font-semibold tracking-wider uppercase text-text-muted border-b border-border">
                Telegram — /alpha Command
              </div>
              <Image
                src="/screenshots/telegram.png"
                alt="CrabbyBot running in Telegram"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Stream */}
            <div className="reveal rounded-2xl overflow-hidden border border-border bg-bg-dark hover:border-border-hover hover:-translate-y-0.5 transition-all duration-300" data-delay="250">
              <div className="px-5 py-4 text-[11px] font-semibold tracking-wider uppercase text-text-muted border-b border-border">
                Live WebSocket Stream
              </div>
              <Image
                src="/screenshots/stream.png"
                alt="CrabbyBot streaming live Polymarket data"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section id="how-it-works" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <p className="reveal text-center text-xs font-semibold tracking-[0.12em] uppercase text-accent mb-4">
            How It Works
          </p>
          <h2 className="reveal text-center font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.15] text-text-primary mb-12" data-delay="100">
            Three steps. Full autonomy.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Clone & Build", desc: "One command to clone, one to build. The Rust compiler handles the rest. Cross-platform: Windows, Linux, macOS.", code: "cargo build --release" },
              { num: "02", title: "Configure", desc: "Add your LLM API key. Enable channels. Point to your workspace. The onboard wizard handles initial setup.", code: "crabbybot onboard" },
              { num: "03", title: "Launch", desc: "Start the bot and it begins serving Telegram, Discord, and CLI simultaneously. Schedule cron jobs for autonomous research.", code: "crabbybot bot" },
            ].map((step, i) => (
              <div
                key={step.num}
                className="reveal p-10 rounded-2xl border border-border bg-bg-card"
                data-delay={String(150 + i * 100)}
              >
                <div className="font-serif text-5xl text-accent/30 leading-none mb-5">{step.num}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary mb-5">{step.desc}</p>
                <div className="bg-bg-dark border border-border rounded-xl px-5 py-3.5">
                  <code className="text-sm text-accent font-mono bg-transparent p-0">{step.code}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ARCHITECTURE ══════ */}
      <section id="architecture" className="py-24 lg:py-32 bg-bg-card border-t border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="reveal">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-accent mb-4">Architecture</p>
              <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.15] text-text-primary mb-6 text-left">
                Decoupled. Event-driven.<br />Concurrent.
              </h2>
              <p className="text-base leading-relaxed text-text-secondary mb-7">
                Every transport — CLI, Telegram, Discord — feeds into a unified message bus.
                The Agent Bridge routes messages to the Agent Loop, which orchestrates LLM calls
                and tool execution concurrently. Zero bottlenecks.
              </p>
              <ul className="flex flex-col gap-3.5">
                {[
                  "Message Bus for async channel routing",
                  "Agent Loop with LLM Grid failover",
                  "Tool Registry for extensible capabilities",
                  "Session Persistence for conversation memory",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-text-secondary">
                    <span className="text-accent font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Diagram */}
            <div className="reveal" data-delay="200">
              <div className="bg-bg-dark border border-border rounded-2xl p-9 flex flex-col items-center gap-1">
                {/* Transports */}
                <div className="w-full p-5 rounded-xl bg-bg-elevated border border-border text-center">
                  <span className="block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-3">
                    Transports
                  </span>
                  <div className="flex justify-center gap-2 flex-wrap">
                    <span className="px-4 py-1.5 rounded-full border border-border bg-bg-card text-xs font-medium text-text-secondary">CLI</span>
                    <span className="px-4 py-1.5 rounded-full border border-border bg-bg-card text-xs font-medium text-text-secondary">Telegram</span>
                    <span className="px-4 py-1.5 rounded-full border border-border bg-bg-card text-xs font-medium text-text-secondary">Discord</span>
                  </div>
                </div>
                <span className="text-xl text-text-muted py-1">↓</span>

                {/* Message Bus */}
                <div className="w-full p-4 rounded-xl bg-accent/[0.06] border border-accent/20 text-center">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-accent">Message Bus</span>
                </div>
                <span className="text-xl text-text-muted py-1">↓</span>

                {/* Agent Bridge */}
                <div className="w-full p-4 rounded-xl bg-bg-elevated border border-border text-center">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-text-secondary">Agent Bridge</span>
                </div>
                <span className="text-xl text-text-muted py-1">↓</span>

                {/* Agent Loop */}
                <div className="w-full p-5 rounded-xl bg-bg-elevated border border-border text-center">
                  <span className="block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-3">
                    Agent Loop
                  </span>
                  <div className="flex justify-center gap-2 flex-wrap">
                    <span className="px-4 py-1.5 rounded-full border border-accent bg-accent/[0.08] text-xs font-medium text-accent">LLM Grid</span>
                    <span className="px-4 py-1.5 rounded-full border border-accent bg-accent/[0.08] text-xs font-medium text-accent">Tool Registry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="reveal text-center py-20 px-8 lg:px-12 rounded-3xl bg-bg-cream relative overflow-hidden">
            <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(232,93,42,0.12)_0%,transparent_70%)] pointer-events-none" />
            <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.2] text-text-dark mb-4 relative">
              OpenClaw showed the world what<br className="hidden sm:block" /> a self-hosted AI agent could be.
            </h2>
            <p className="text-base text-[#5a5647] mb-9 relative">
              CrabbyBot is what that looks like when it&apos;s built for the trenches.
            </p>
            <div className="mb-5 relative">
              <a
                href="https://github.com/max-de-bug/CrabbyBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-hover hover:shadow-[0_8px_32px_var(--accent-glow)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Get CrabbyBot — Free & Open Source
              </a>
            </div>
            <p className="text-sm text-[#8a8478] relative">Built with 🦀 for the Solana Ecosystem · MIT License</p>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="py-10 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5 font-bold text-sm">
            <Image src="/logo.png" alt="CrabbyBot" width={28} height={28} className="rounded-md" />
            <span>CrabbyBot</span>
          </div>
          <div className="flex gap-7">
            {["GitHub", "Features", "Architecture"].map((link) => (
              <a
                key={link}
                href={link === "GitHub" ? "https://github.com/max-de-bug/CrabbyBot" : `#${link.toLowerCase()}`}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-text-muted">© 2026 CrabbyBot. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
