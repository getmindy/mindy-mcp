# Claude Desktop

Mindy connects as a **custom connector** with browser sign-in — no config file, no key.

1. **Settings → Connectors → Add custom connector.**
2. Paste the endpoint:

   ```
   https://mcp.getmindy.ai/mcp
   ```

3. Click **Connect → sign in with Mindy → Allow.**
4. 100 free credits land on first connect. Ask Claude to use Mindy — e.g. *"Search SAM for open small-business IT opportunities."*

That's it — add a connector, sign in, done. No key to paste.

> Older Claude Desktop builds that only support a local config file can instead add the same endpoint under `mcpServers` in `claude_desktop_config.json`. The custom-connector flow above is the current path and the one Mindy documents.
