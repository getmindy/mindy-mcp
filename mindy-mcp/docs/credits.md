# Credits

Mindy is pay-as-you-go. You pay for calls that succeed, and nothing else.

## The rules

- **100 free credits** on first connect — a one-time welcome grant. Can't be farmed (gated on "no balance yet").
- **Metered per successful call.** Balance is checked, the tool runs, credits debit **only on success**.
- **A failed call costs 0.** Timeouts, no-match, errors — all free.
- **Exactly-once accounting.** Every grant and debit is ledgered; it can't double-charge.

## Pricing — read it live, never transcribe it

Prices are **tiered** — currently **8 price points: 0 / 5 / 10 / 15 / 20 / 40 / 100 / 200 credits.** `get_balance` is the only 0-credit tool; the heaviest composite reports sit at the top of the scale.

**Do not rely on a per-tool price written in any static document — including this repo.** Prices change, and a transcribed number is wrong the moment it drifts. Read the current price for any tool from:

- **[getmindy.ai/mcp/tools](https://getmindy.ai/mcp/tools)** — renders live from `listMcpTools()`
- **`/api/mcp/catalog`** — for programmatic access

## The onboarding hazard worth knowing

Because the top tiers run to 100–200 credits, a **single heavy call can consume most or all of a new user's 100-credit welcome grant** — a full market report is a one-call example. If you're building an onboarding flow, signpost the expensive tools and steer new users to cheap discovery calls first, so their first session ends with a result and a balance rather than an empty wallet.

## Refills

Subscribe to a credit plan (monthly or annual) to refill; plans carry a recurring allowance. Manage plans at getmindy.ai. Check your balance any time with `get_balance` — always free.
