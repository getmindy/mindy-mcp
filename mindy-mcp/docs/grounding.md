# The Grounding Contract

The single most important thing to know before you build on Mindy: **it tells you when it found nothing, instead of inventing an answer.**

## `_meta.grounded`

Every tool response carries a machine-readable flag:

```json
{
  "data": [ ... ],
  "_meta": { "grounded": true }
}
```

- `grounded: true` — the result is backed by data the tool actually retrieved.
- `grounded: false` — nothing was found. The `data` is empty or absent. **This is not an error and not a guess** — it's an honest "no match."

## Why it matters for your integration

Public-data tools that hallucinate a plausible FAR clause or a made-up incumbent are worse than useless in federal contracting — a confident wrong answer costs someone a bid. Mindy is built so you don't have to defend against that:

- You can surface results directly without a second "is this real?" model check.
- `grounded: false` is a clean branch in your code — show "no current match," don't paper over it.
- Confidence-bearing tools (e.g. `find_predecessor_award`, `match_recompete_sow`) return an explicit confidence read rather than a false single answer when the signal is ambiguous.

## The rule for agents

If you're orchestrating Mindy inside an LLM agent, instruct the model: **when `grounded` is false, say so.** Do not let the model fill the gap with a plausible sentence. The honesty is the product — preserve it through your layer.

---

This isn't just a design intention — it's audited. The no-fabrication rule is enforced by an automated test on every deploy and independently re-tested against raw federal data. See [../AUDIT.md](../AUDIT.md).
