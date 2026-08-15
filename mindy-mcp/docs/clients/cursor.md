# Cursor

1. Create `.cursor/mcp.json` in your project (or `~/.cursor/mcp.json` for all projects):

```json
{
  "mcpServers": {
    "mindy": {
      "url": "https://mcp.getmindy.ai/mcp"
    }
  }
}
```

2. Save, then open **Settings → MCP** and confirm `mindy` shows connected (green).
3. First tool call opens the browser sign-in; 100 free credits land.
4. Test in the agent: *"List open SAM opportunities for NAICS 541512."*

For headless use inside CI, swap the browser flow for an [API key](../authentication.md).
