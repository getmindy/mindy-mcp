# Quickstart

Get from zero to your first grounded federal-data call in about three minutes. This is the *interactive* path — using Mindy inside a client.

> **Building Mindy into your own product?** Start with [concepts.md](concepts.md) then [building.md](building.md) instead — this page is for hands-on use, that path is for integration.

## 1. Add the server to your client

Any MCP client that supports **remote (HTTP) servers** works. Configuration is the same shape everywhere — a name and the endpoint:

```json
{
  "mcpServers": {
    "mindy": {
      "url": "https://mcp.getmindy.ai/mcp"
    }
  }
}
```

Per-client instructions (where the config file lives, how to enable it):

- [Claude Desktop](clients/claude-desktop.md)
- [Cursor](clients/cursor.md)
- [Claude Code](clients/claude-code.md)
- [OpenAI & Windsurf](clients/openai-windsurf.md)

## 2. Sign in

The first time your client calls a Mindy tool, it opens a browser to `getmindy.ai/mcp`. Sign in once. **100 free credits** land on that first connect — roughly one full evaluation.

No key to copy, no secret to store. (For headless/CI where there's no browser, use an [API key](authentication.md) instead.)

## 3. Call a tool

Ask your agent something a contractor would ask. For example:

> "Search SAM for open IT staffing opportunities set aside for small business."

That routes to `search_sam_opportunities` and returns live, currently-open solicitations. One credit, debited only because it succeeded.

Try a chain next:

> "For notice ABC123 — who's the likely incumbent, and is this a supportable small-business set-aside?"

That's `find_predecessor_award` + `assess_market_depth` — the start of a real bid/no-bid workup. See [examples/recipes/bid-decision.md](../examples/recipes/bid-decision.md) for the full pattern.

## 4. Check what you spent

`get_balance` is always free. Ask "what's my Mindy credit balance?" any time.

---

**Next:** [Authentication](authentication.md) · [Tool catalog](tools.md) · [Credits](credits.md) · [Grounding contract](grounding.md)
