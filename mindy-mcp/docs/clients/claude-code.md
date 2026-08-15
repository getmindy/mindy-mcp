# Claude Code

Add Mindy as a remote MCP server:

```bash
claude mcp add --transport http mindy https://mcp.getmindy.ai/mcp
```

The first tool call triggers browser OAuth at `getmindy.ai/mcp`; 100 free credits land on connect.

Verify:

```bash
claude mcp list
```

Then ask Claude Code to call a tool, e.g. *"Use Mindy to find contracts expiring in NAICS 236220 in the next 6 months."*

For CI / non-interactive environments, use an [API key](../authentication.md) instead of the browser flow.
