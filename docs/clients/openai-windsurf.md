# OpenAI & Windsurf (and other MCP clients)

Mindy is a standard **Streamable HTTP** MCP server, so any compliant client works. The universal config is just the endpoint:

```json
{
  "mcpServers": {
    "mindy": {
      "url": "https://mcp.getmindy.ai/mcp"
    }
  }
}
```

- **Windsurf** — add under Cascade's MCP settings, then complete the browser sign-in on first call.
- **OpenAI / custom agents** — if your framework speaks MCP, register the server URL and let it discover tools. For fully headless agents with no browser, authenticate with an [API key](../authentication.md) via the `Authorization: Bearer` header.

Tool schemas are discovered at connect time — you don't hand-wire them.
