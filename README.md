# Mindy MCP

**Federal-contracting intelligence as tools any AI agent can call — on any platform.**

Mindy exposes live federal procurement data — plus hand-verified rosters you can't get from any public API — as credit-metered tools over the [Model Context Protocol](https://modelcontextprotocol.io). It's an HTTP endpoint: point Claude, Cursor, a backend service, or your own agent at it and it can search open solicitations, size up incumbents, price a bid, extract a compliance matrix, and pull the named contracting officer — grounded in real data, every time.

This repo is for **developers building on Mindy** from whatever stack they're on. It teaches the model, documents the tools, and shows the patterns. The server itself is proprietary — this is how you *use* it.

```
Endpoint:  https://mcp.getmindy.ai/mcp
Transport: Streamable HTTP
Auth:      OAuth 2.1 (any MCP client) · API key (headless / your own backend)
```

---

## Start here

New to Mindy? Read in this order — the first two are the *why*, not just the *how*:

1. **[Concepts](docs/concepts.md)** — the mental model. What Mindy is, the federal-contracting objects every tool operates on, and the three properties (grounded, metered, stateless) that shape how you build. ~5 min, and the rest of the repo makes sense after it.
2. **[Building on Mindy](docs/building.md)** — how to compose the tools from any platform: the two auth paths, the lifecycle, the four composition patterns, and the integration house style.
3. **[Tool catalog](docs/tools.md)** — an orientation map of the tool groups. The authoritative live list + prices: **[getmindy.ai/mcp/tools](https://getmindy.ai/mcp/tools)**.
4. **[Grounding contract](docs/grounding.md)** — why Mindy tells you when it found nothing instead of inventing an answer, and how to preserve that through your layer.
5. **[Fidelity audit](AUDIT.md)** — the no-mislead standard, and the independent re-test behind it.

## Why build on Mindy

Developers buy infrastructure. Here's the infrastructure:

- **15+ live federal & proprietary sources, one interface.** SAM.gov, USASpending, GSA CALC, SEC EDGAR, Grants.gov, the Federal Register, a 167K-row contacts directory, a 317K-recipient warehouse — merged, deduped, and DoDAAC-anchored so a sub-agency returns *its* opportunities, not the whole-department firehose.
- **Determinations, not just rows.** Mindy applies the GovCon reasoning on top of the data — "is this a supportable set-aside," "who's the likely incumbent," "what should you charge" — so you build on conclusions, not raw records.
- **It never makes things up — and that's audited.** Every tool returns a machine-readable `_meta.grounded` flag: `grounded: false` means "we found nothing," not a plausible sentence. The no-fabrication rule is enforced by an automated test on every deploy and independently re-tested against raw federal records. → [docs/grounding.md](docs/grounding.md) · [AUDIT.md](AUDIT.md)
- **A moat you can't rebuild.** The roster tools sit on hand-verified data — SBLO contacts at primes, the OSBP directory by command — assembled by hand, not scraped. They're access-gated (an authenticated subscriber account, to stop bulk extraction). No public API tells you *who to call to team* on a subcontract.
- **Honest billing.** Metered per successful call; a failed call costs **0 credits**. First connect grants **100 free credits**. → [docs/credits.md](docs/credits.md)

## Connect

**Any MCP client, any platform** (Claude Desktop, Cursor, Windsurf, Cline, Claude Code…) — the config is just the endpoint:

```json
{
  "mcpServers": {
    "mindy": {
      "url": "https://mcp.getmindy.ai/mcp"
    }
  }
}
```

In Claude Desktop: **Settings → Connectors → Add custom connector**, paste the endpoint, **Connect → sign in → Allow**. Other clients take the same URL in their MCP config. First connect opens a browser sign-in and drops 100 free credits — no key to paste. This OAuth flow is what lists Mindy in Anthropic's connector directory; it's standard MCP, so it works in every compliant client, not just Claude.

**Headless / your own backend** — grab an API key at **Account → API keys** and authenticate over HTTP instead of the browser. See [examples/python](examples/python) or [examples/typescript](examples/typescript).

## What's in the catalog

**50+ tools** live and moving, grouped by what a bidder is trying to do. The authoritative, correctly-priced list is **[getmindy.ai/mcp/tools](https://getmindy.ai/mcp/tools)** (live from `listMcpTools()`) / `/api/mcp/catalog`. The map in [docs/tools.md](docs/tools.md) is orientation only.

| Group | Does what | Sample tools |
|---|---|---|
| **Opportunity Discovery** | Find the work — open, upcoming, expiring | `search_sam_opportunities`, `get_expiring_contracts`, `get_agency_forecasts` |
| **Competitive Intelligence** | Size up the field | `get_contractor_profile`, `find_predecessor_award`, `get_incumbent_financials` |
| **Market, Pricing & Positioning** | Shape the bid | `get_pricing_intel`, `assess_market_depth`, `get_keyword_coverage` |
| **Agency & Award Intelligence** | Know the buyer | `get_agency_intel`, `get_agency_spending_detail`, `get_award_detail` |
| **Contacts & Events** | Who to talk to, where to show up | `search_federal_contacts`, `search_federal_events` |
| **Proposal Pipeline** | Decide → build → de-risk | `evaluate_bid_decision`, `extract_compliance_matrix`, `referee_proposal_compliance` |
| **Solicitation Documents** | Get the docs out | `get_solicitation_documents`, `extract_statement_of_work` |
| **Curated Rosters** 🔒 | Hand-verified contact data (access-gated) | `get_sblo_contact`, `lookup_federal_osbp` |

Tool schemas, the full list, and prices are self-describing over MCP and published live at [getmindy.ai/mcp/tools](https://getmindy.ai/mcp/tools). **Never rely on a tool count or credit price transcribed into a static doc** — read the live catalog. This repo deliberately carries no per-tool prices for that reason.

## Examples

- [Python headless quickstart](examples/python/quickstart.py) · [TypeScript headless quickstart](examples/typescript/quickstart.ts)
- [Recipe: "Should I bid this?" in one chain](examples/recipes/bid-decision.md) — the composition pattern most integrations start from, including the additive-integration house style.

## Interactive client setup (appendix)

Using Mindy by hand inside a client rather than building on it? Per-client walkthroughs live in [docs/clients/](docs/clients) — Claude Desktop, Cursor, Claude Code, Windsurf/OpenAI. For most builders the universal config above is all you need.

## What this repo is / isn't

- **Is:** the mental model, tool catalog, auth docs, and runnable examples for building on the live Mindy MCP server, from any stack.
- **Isn't:** the server source. Mindy's data pipelines and rosters are proprietary — this repo is how you *use* them, not a copy of them.

## Support

- Issues & tool requests → open an issue, or email `support@getmindy.ai`
- Security → `security@getmindy.ai`
- Status, changes → [CHANGELOG.md](CHANGELOG.md)

## License

Documentation and example code in this repo are MIT-licensed (see [LICENSE](LICENSE)). The Mindy MCP service, its data, and its rosters are proprietary and governed by the terms at getmindy.ai.

---

*Mindy · GovCon Giants AI · `mcp.getmindy.ai`*
