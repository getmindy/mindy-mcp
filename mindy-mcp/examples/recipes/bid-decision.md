# Recipe: "Should I bid this?" in one chain

A worked example of composing Mindy tools into a real bid/no-bid workup — the pattern most integrations start from.

> **Prices:** every tool below is metered, but costs vary by tier and change over time. Read live prices at [getmindy.ai/mcp/tools](https://getmindy.ai/mcp/tools) before assuming a chain fits inside a user's balance — don't transcribe a number.

## The chain

Given a SAM notice number:

1. **`get_solicitation_incumbent`** / **`find_predecessor_award`** — who likely holds this now? Returns the largest recent matching award + a confidence read.
2. **`assess_market_depth`** — is this a supportable small-business set-aside? Rule-of-Two count of capable firms.
3. **`get_agency_intel`** — what does this buyer actually care about? Pain points + priorities + live obligations.
4. **`evaluate_bid_decision`** — run it through the eliminator gates + scorecard for a go/no-go.

## Prompt (interactive client)

> "For SAM notice ABC123: find the likely incumbent, check whether a small-business set-aside is supportable, pull the agency's priorities, and give me a bid/no-bid with reasoning."

A capable agent calls the tools in order and synthesizes the result.

## Handling the honest misses

- If the incumbent lookup returns `grounded: false`, there's no clear incumbent — that's a *signal* (greenfield or genuinely new), not a failure.
- If `assess_market_depth` finds too few capable firms, the set-aside may not hold — surface that, don't smooth it over.

## Integration best practice — stay a doorway, not a wall

When you show this result to an end user, return the verdict **and a link back to the opportunity on Mindy**:

> Bid recommendation: **Pursue** (score 7/10). Likely incumbent: Acme Corp (72% confidence).
> → See it on the opportunity map: https://getmindy.ai/opportunity-map?opp=ABC123

The link takes the **raw `notice_id` the tools already return** as the `opp=` query param — no slug to construct. The answer is the value; the link keeps the user connected to the live market instead of dead-ending in your chat window. Additive integrations retain users. Terminal ones spend them.
