# Building on Mindy from any platform

Mindy is platform-neutral by design — it's an HTTP MCP endpoint. Anywhere that speaks MCP, or anywhere that can make an authenticated HTTP call, can build on it. This page is the spine for developers embedding Mindy in *their own* product, on *their own* stack.

If you just want to use Mindy interactively inside a client, you don't need this page — see [quickstart.md](quickstart.md).

## Two paths, by how your code runs

| Your context | Auth | Status |
|---|---|---|
| **An MCP client with a human present** — Claude Desktop, Cursor, Windsurf, Cline, Claude Code, any OAuth-capable MCP client | OAuth 2.1 (browser sign-in) | **Live everywhere.** This is the same flow that lists Mindy in Anthropic's connector directory — it's not Claude-specific; any compliant client works. |
| **Programmatic / headless** — your backend, a cron job, an agent framework with no browser, CI | API key + `Authorization: Bearer` over HTTP | **Live.** Grab a key at Account → API keys (getmindy.ai/mcp/account?section=keys). |

The takeaway: **"any platform" is already true for interactive use** across every MCP client, not just Claude. The API-key path — also live — extends that to pure-backend code with no human in the loop.

## The lifecycle (every integration)

```
connect  →  grant  →  call  →  refill
  │          │         │         │
  │          │         │         └─ Plus / Scale plans; exactly-once accounting
  │          │         └─ metered, atomic; debits only on success, failed = 0
  │          └─ 100 free credits, once, on first connect
  └─ OAuth (browser) or API key (HTTP)
```

Nothing is stateful. Every call stands alone, which is what lets you compose freely.

## Composition patterns

The catalog is primitives; the value is in the chains. Four shapes cover most of what people build:

**Fan-out, then decide** — discovery into per-item analysis.
```
search_sam_opportunities  →  (for each notice_id)  find_predecessor_award  →  evaluate_bid_decision
```

**Enrich a known entity** — start with a name, end with a dossier.
```
lookup_sam_entity  →  get_contractor_award_history  →  get_incumbent_financials
```

**Document pipeline** — a notice into a de-risked proposal skeleton.
```
notice_id  →  extract_compliance_matrix  →  build_proposal_structure  →  scan_proposal_compliance  →  referee_proposal_compliance
```

**Guard the expensive tools** — the heaviest scans and the composite reports sit at the top price tiers, so gate them behind a cheaper check.
```
cheap filter (assess_market_depth)  →  only if worth it  →  find_capable_contractors (a top-tier scan)
```
Read live prices from [getmindy.ai/mcp/tools](https://getmindy.ai/mcp/tools) before wiring an automated flow — don't assume a number.

Worked end-to-end version with prompts and grounded-miss handling: [examples/recipes/bid-decision.md](../examples/recipes/bid-decision.md).

## Know which half of the pipeline you're calling

The proposal tools split into **analysis** (requirement harvest, outline, DQ scan, referee) and **drafting** (narrative generation). Both are on the surface. The analysis tools run cleanly on inputs you pass. The drafting tools produce their best, evidence-woven output when they can reach a logged-in user's private past-performance Vault — which an external agent won't have, so expect grounded-but-generic drafts when you call them headless. See [concepts.md](concepts.md).

## The house style — build additive, not terminal

This is the one design choice we ask you to copy. When your product surfaces a Mindy answer to an end user, return the answer **and** a link back to the opportunity on Mindy:

> Bid recommendation: **Pursue** (7/10). Likely incumbent: Acme Corp (72%).
> → Open it on the map: `https://getmindy.ai/opportunity-map?opp=<notice_id>`

That link takes the raw `notice_id` the tools return as the `opp=` param — no slug construction. A pure in-place answer ends the user's journey in your window. An answer-plus-doorway keeps them connected to the live market — which is better for the contractor (they see the whole picture, not one reply) and better for you (a live source beats a frozen answer). Additive integrations compound; terminal ones don't.

## If the connection fails

Two causes account for most first-connect failures:

- **Wrong transport.** Mindy is **Streamable HTTP** — not stdio. A stdio-configured client won't connect.
- **Wrong endpoint.** Use `https://mcp.getmindy.ai/mcp`. The retired `getmindy.ai/mcp/mcp` form fails specifically at the OAuth handshake, because the metadata resource must match byte-for-byte.

## Handling grounded misses

Every tool can return `_meta.grounded: false`. In a built integration that's a *feature* — surface "no current match" honestly:

- `find_predecessor_award` grounded:false → no clear incumbent. That's a signal (greenfield / genuinely new), not a failure.
- `get_incumbent_financials` "no filing" → the firm is likely private. Report it; don't guess revenue.

Never let a downstream model paper over a miss with a plausible sentence. → [grounding.md](grounding.md)

---

**Next:** [Authentication](authentication.md) · [Examples](../examples) · [Tool catalog](tools.md)
