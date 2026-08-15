# Fidelity Audit

Mindy's tools are held to one standard: **never mislead the user.** A tool returns real, source-verified data or an honest "none found" — never a plausible guess. That's not a marketing line; it's audited, and re-tested by an outside party.

## The standard

Every tool's output is checked against the question: *would this mislead someone who didn't double-check it?* Findings are rated by impact —

- **S1 — decision-changing:** a wrong output could change a bid, a contact, or a teaming call. Fixed first, always.
- **S2:** would be caught on review.
- **S3:** cosmetic.

## How each tool is audited

1. **Oracle-check** — output is compared to its authoritative source, never an AI guess: SEC EDGAR (financials), USASpending & SAM.gov (awards, opportunities, contacts), GSA CALC (pricing), the Federal Register (regulatory).
2. **Fix at the root** — a finding is fixed in the shared library, then confirmed to reach *every* surface (API, app, map) so no duplicate path bypasses the fix.
3. **Independent re-test** — an outside party re-runs the tools and corroborates the fixes against raw federal data. Not a self-check.

## Result (most recent audit)

- Full live tool surface audited to the no-mislead standard.
- All fidelity findings resolved and verified against their named source — including the highest-stakes, decision-changing ones.
- **Zero open failures**, independently re-verified.
- Where a genuine source doesn't exist, the tool says so honestly rather than inventing an answer.

## What this means if you're building on Mindy

The `_meta.grounded` contract ([grounding.md](docs/grounding.md)) isn't a promise you have to take on faith. The no-fabrication rule — real data or an honest "none found" — is **enforced by an automated test on every deploy**, and the tool suite is independently re-tested against the raw federal records. For anything where a confident-but-wrong answer costs a real decision (a bid, a teaming call, a FAR reference), that's the difference between grounded intelligence and generic AI.

*Audit figures reflect the most recent review; the live tool count moves as tools ship, so this document describes the standard and process, not a fixed snapshot.*
