---
name: polymarket-stream-monitor
intent-category: polymarket-read
description: >
  Real-time WebSocket monitor for Polymarket markets. Streams live orderbook
  snapshots, price changes, and trade activity. Activate when the user wants
  to watch, monitor, or stream a specific market in real-time.
---

# Polymarket Stream Monitor 📡

## When to Activate
- User asks to "watch", "monitor", or "stream" a market
- User asks for "live" or "real-time" data
- User wants to track price movements as they happen

## Workflow

### Step 1: Identify the Market
If the user provides a market name (not a token ID), use `polymarket_search`
to find it. Extract the token/asset IDs from the market details.

If the user provides a hex token ID (0x...) or a decimal ID, use it directly.

### Step 2: Get Baseline Snapshot
Use `polymarket_price` to get the current state before streaming:
- Current price (Yes/No)
- Best bid / best ask / spread
- 24h volume

### Step 3: Stream Events
Use `polymarket_stream` with the appropriate event type:

| Event Type | Use Case |
|------------|----------|
| `orderbook` | Full bid/ask book snapshots |
| `prices` | Price changes only (lightweight) |
| `last_trade` | Individual trade executions |
| `midpoints` | Calculated fair-value midpoints |

**`max_events` guidelines:**
- Quick check: `3–5` events
- Extended monitoring: `10–20` events

### Step 4: Summarize
After collecting events, summarize:
- **Direction:** Price moved up / down / stable
- **Spread:** Tightening or widening
- **Activity:** Notable large orders or trades
- **Trend:** Any clear momentum building

## Tools to Use
| Tool | Purpose |
|------|---------|
| `polymarket_search` | Find market by name |
| `polymarket_price` | Baseline snapshot |
| `polymarket_stream` | Live WebSocket data |

## Output Format
Present streaming results with context:
```
📡 LIVE MONITOR: [market question]
Baseline: Yes $0.65 / No $0.35 | Spread: $0.02

Event 1: PRICE | Asset: ... | Price: 0.66 | Side: BUY
Event 2: BOOK  | Best Bid: 0.65 | Best Ask: 0.67 | Levels: 12/8
...

Summary: Price trending UP (+1.5%) over 5 events. Spread stable.
```
