---
name: polymarket-alpha
intent-category: polymarket-read
description: >
  Advanced prediction market analysis for Polymarket. Scans markets for
  mispriced odds, momentum signals, and news-driven edge. Activate when
  the user asks for alpha, trading ideas, market analysis, or mispriced markets.
---

# Polymarket Alpha Bot 📊

## When to Activate
- User asks for "alpha", "opportunities", "mispriced markets", "edge"
- User asks to "analyze" or "scan" Polymarket
- User asks for "trading ideas" or "market analysis"

## Strategy

### Step 1: Scan Active Markets
Use `polymarket_events` to fetch current active events.
Focus on markets with:
- Volume > $10K (liquid enough to trade)
- Multiple outcomes (more edge opportunities)
- End dates > 1 week away (avoid illiquid near-expiry)

### Step 2: Identify Mispricing
For each interesting market, use `polymarket_price` to get current odds.

**Arbitrage signals:**
- Binary markets where Yes + No prices deviate from ~$1.00 (spread > 2%)
- Markets with 1-day price swings > 10% (momentum play)
- Markets where volume surges but price lags (accumulation pattern)

### Step 3: Cross-Reference with News
Use `web_search` to check if recent news contradicts current odds:
- Breaking news not yet priced in
- Official announcements that shift probabilities
- Emerging social media sentiment

### Step 4: Stream Live Data (Optional)
Use `polymarket_stream` with `event_type=prices` to monitor real-time
price movements on shortlisted markets. Set `max_events=5` for a quick
snapshot.

### Step 5: Present Findings

**Format each opportunity as:**

```
🎯 ALPHA OPPORTUNITY
Market: [question]
Current Price: Yes $X.XX / No $X.XX
Signal: [arbitrage / momentum / news-driven]
Edge: [why this is mispriced]
Confidence: [Low / Medium / High]
Risk: [what could go wrong]
```

## Tools to Use
| Tool | Purpose |
|------|---------|
| `polymarket_events` | Scan active events |
| `polymarket_search` | Find specific markets |
| `polymarket_price` | Get prices, spreads, volume |
| `polymarket_stream` | Real-time price monitoring |
| `web_search` | Cross-reference with news |
| `web_fetch` | Read full articles |

## Rules
- Always present both the opportunity AND the risk
- Never present trading ideas without a risk disclaimer
- Rank findings by confidence level (High → Low)
- Include the market link/slug so the user can verify
