# Interactive client setup (appendix)

These guides are for using Mindy **by hand inside a client**, not for building on it. If you're embedding Mindy in your own product, you don't need these — see [../building.md](../building.md).

For any MCP client, the universal config is just the endpoint:

```json
{ "mcpServers": { "mindy": { "url": "https://mcp.getmindy.ai/mcp" } } }
```

Per-client specifics:

- [Claude Desktop](claude-desktop.md)
- [Cursor](cursor.md)
- [Claude Code](claude-code.md)
- [OpenAI & Windsurf (and other MCP clients)](openai-windsurf.md)
