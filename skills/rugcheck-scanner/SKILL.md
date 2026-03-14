---
name: rugcheck-scanner
intent-category: crypto
description: >
  Scans Solana tokens for rug pull risks. Analyzes token contract,
  liquidity, holder distribution, and metadata to assess safety.
  Activate when user asks about token safety, rug checks, or pastes
  a Solana mint address.
---

# Rug Check Scanner 🔍

## When to Activate
- User asks "is this token safe?" or "rug check"
- User pastes a Solana mint address (base58, ~44 chars)
- User asks about token safety, legitimacy, or risk assessment

## Workflow

### Step 1: Run Rug Check
Use `rugcheck` with the mint address to get the full risk assessment.

### Step 2: Analyze Results
Parse the response for:
- **Risk score** (0–100, higher = riskier)
- **Red flags** (mutable metadata, no LP lock, freeze authority, etc.)
- **Liquidity** (amount in SOL/USDC)
- **Holder concentration** (top 10 holders % of supply)

### Step 3: Research Context (if needed)
If the token looks legitimate but has flags, use `web_search` to check:
- Is there an official website?
- Active community on Twitter/Discord?
- Known team behind the project?

### Step 4: Deliver Verdict

## Output Format

Use a traffic-light rating:

```
🔴 DANGEROUS — Do NOT buy this token
🟡 CAUTION — Elevated risk, proceed carefully
🟢 LIKELY SAFE — Low risk indicators detected

Token: [name] ([symbol])
Mint: [address]
Risk Score: [X/100]

⚠️ Risk Flags:
  - [flag 1]
  - [flag 2]

📊 Liquidity: [amount]
👥 Top 10 Holders: [X]% of supply
🔒 LP Locked: [Yes/No]
❄️ Freeze Authority: [Revoked/Active]
✏️ Mint Authority: [Revoked/Active]
```

## Tools to Use
| Tool | Purpose |
|------|---------|
| `rugcheck` | Token risk analysis |
| `web_search` | Background research |

## Rules
- Always show the risk flags prominently
- Never tell the user a token is "safe" — use "likely safe" with caveats
- If the rug check fails, say so clearly instead of guessing
