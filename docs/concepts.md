# Concepts — the Mindy mental model

Read this once and the whole catalog makes sense. The goal here isn't the API — it's the *model*, so you can build chains the examples don't spell out.

## What Mindy actually is

A **metered intelligence layer over federal-contracting data.** Not a database you query with SQL. Not a chatbot. A set of composable, grounded tools: you bring an agent (or plain HTTP), Mindy brings the data *and* the domain logic on top of it.

The distinction that matters: a raw data API gives you rows. Mindy gives you a *determination* — "is this a supportable small-business set-aside," "who's the likely incumbent," "what should you charge" — grounded in the rows, with the GovCon reasoning already applied.

## The objects you'll work with

Everything in the catalog operates on a handful of federal-contracting primitives. Learn these and tool selection becomes obvious.

- **Opportunity / `notice_id`** — an open solicitation. The `notice_id` is the **join key** across many tools: pass it to `get_solicitation_documents`, `extract_compliance_matrix`, `find_predecessor_award`, `extract_statement_of_work`. If you have a notice_id, most of the pipeline opens up.
- **Contractor / recipient** — a firm that wins federal work, keyed by name or UEI. Feeds `get_contractor_profile`, `get_contractor_award_history`, `get_incumbent_financials`.
- **Agency / buying office** — the buyer. **DoDAAC-anchored**, so a sub-agency (a USACE district, DARPA) resolves to *its* activity, not the whole department's firehose. This is why `search_agency_opps_by_office` returns something usable instead of 295 results.
- **Award / PIID** — one specific contract. `get_award_detail` is the microscope.
- **NAICS / PSC** — the market codes. **Important quirk:** NAICS is *not* a clean partition of the market. A single "obvious" code is often only ~28% of the real spend (that's what `get_keyword_coverage` exists to reveal), and it's *not* a fast lookup key — which is why `find_capable_contractors` is one of the priciest tools: it scans, it doesn't index.
- **Set-aside** — SB / 8(a) / SDVOSB / WOSB / HUBZone. The eligibility lens on almost everything.

## Three properties that shape how you build

**1. Grounded, never fabricated.** Every response carries `_meta.grounded`. `false` means *nothing was found* — not a guess, not an error. Treat it as a clean branch in your code, and if an LLM sits downstream, instruct it to say "no match" rather than invent one. The honesty is the asset; don't let your layer erode it. → [grounding.md](grounding.md)

**2. Metered and atomic.** You pay per *successful* call; a failed call costs 0. Because cost is per-tool and deterministic, you can **budget a chain before you run it** — read live prices from [getmindy.ai/mcp/tools](https://getmindy.ai/mcp/tools), never a transcribed number. → [credits.md](credits.md)

**3. Stateless and composable.** Tools don't remember anything between calls. You pass the output of one as the input to the next — the *chain lives in your code or your agent*, not inside Mindy. This is what makes Mindy a building block instead of an app: you assemble the workflow.

## The boundary — what you build vs. what stays inside Mindy

The pipeline splits in two, and it's worth knowing which half you're calling. The **analysis** tools (`extract_compliance_matrix` → `build_proposal_structure` → `scan_proposal_compliance` → `referee_proposal_compliance`) harvest requirements, shape an outline, and de-risk a draft — they run purely on inputs you pass. The **drafting** tools (`draft_proposal`, `one_click_proposal`, and friends) generate the narrative itself and are also on the surface. Both are callable; the richest results from the drafting tools come when they can reach a logged-in user's private past-performance Vault, which an external agent won't have — so plan for grounded-but-generic output when you call them without it.

---

**Next:** [Building on Mindy](building.md) — how to put these together from any platform · [Tool catalog](tools.md)
