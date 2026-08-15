# Tool Catalog

> **The authoritative catalog is live, not this file.**
> **[getmindy.ai/mcp/tools](https://getmindy.ai/mcp/tools)** renders from `listMcpTools()` at runtime, so it can't drift. For programmatic use, read **`/api/mcp/catalog`** (public, no auth, edge-cached ~1h) — it returns the current tool count and every price, so you never have to trust a number typed into a doc. Current surface: **50+ tools** across a handful of credit tiers, from free to the flagship deliverables.
>
> The overview below is an **orientation map of the shape** — what kinds of tools exist and how they group. Example tool names are included **only where verified against the live catalog**; everywhere else, the sentence points you at the live list rather than risk a plausible-but-wrong name. It carries **no per-tool prices** — those move, so read them live.

Every tool returns grounded data with a `_meta.grounded` flag; `grounded: false` means nothing was found, never a fabrication. See [grounding.md](grounding.md) and [../AUDIT.md](../AUDIT.md).

---

## The shape of the catalog

**Opportunity Discovery — *find the work***
Open, upcoming, and expiring federal work. Verified tools: `search_sam_opportunities` (the single most-used tool on the surface), `get_expiring_contracts`, `get_agency_forecasts`. More in this group at the live catalog.

**Competitive Intelligence — *size up the field***
Who holds it now, who else can do it, how strong they are. Verified tool: `get_contractor_profile`. This group also includes the incumbent-lookup for a pasted SAM notice number, contractor award history, and SEC-EDGAR financials — see the live catalog for exact names.

**Market, Pricing & Positioning — *shape the bid***
Price-to-win labor rates, Rule-of-Two set-aside depth, keyword/market coverage, and the buyer vocabulary that wins. Tool names at the live catalog.

**Agency & Award Intelligence — *know the buyer***
Agency priorities and pain points, sub-agency spending, small-business goaling, budget trend, and per-award detail. Tool names at the live catalog.

**Contacts & Events — *who to talk to, where to show up***
Named POCs at a buying office, industry days and matchmaking, and the recurring event calendar. This group also includes a **write-action** tool that adds contacts to the user's *own* connected CRM (not a read) — see the live catalog.

**Proposal Pipeline — *decide → build → de-risk***
Splits in two, and both halves are on the surface. **Analysis** (verified: `extract_compliance_matrix`; plus bid decision, outline, DQ scan, referee) runs on inputs you pass. **Drafting** (verified: `one_click_proposal`, a top-tier call; plus section/full-proposal drafters and export) generates the narrative — best results need a logged-in user's private Vault, so expect grounded-but-generic output headless.

**Solicitation Documents — *get the docs out***
Verified tool: `get_solicitation_documents` (SOW/PWS + attachments as signed URLs). Also a clean SOW-only extractor — see the live catalog.

**Combinations & Reports — *one-shot workups***
Composite tools that chain several primitives in one call — these sit at the top price tiers, so budget for them. Tool names and prices at the live catalog.

**Curated Rosters & Pro**
`get_winning_playbook` is the **Pro-tier tool — access is enforced** (`enforceTiers: true` in prod). `search_podcast_lessons` is live and open (metered, not Pro-gated). Hand-verified contact rosters are access-gated to protect them from bulk extraction. Exact names at the live catalog.

**Account**
`get_balance` — your live balance, the only free (0-credit) tool.

---

*This map is orientation only. The live, authoritative, correctly-priced list is [getmindy.ai/mcp/tools](https://getmindy.ai/mcp/tools) · `/api/mcp/catalog`.*
