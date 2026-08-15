# Authentication

Mindy MCP supports two paths. Use the browser flow for interactive clients; use an API key for anything headless.

## OAuth 2.1 (interactive — the default, live everywhere)

For Claude Desktop, Cursor, Claude Code, Windsurf, Cline, and any MCP client with a human at the keyboard. This is the same flow that lists Mindy in Anthropic's connector directory — it's standard MCP, so it works across every compliant client, not just Claude.

1. Add the server (`https://mcp.getmindy.ai/mcp`) to your client.
2. On the first tool call, the client opens `getmindy.ai/mcp` in a browser.
3. Sign in. The client receives its token via the standard OAuth 2.1 authorization-code flow with PKCE — nothing to copy or paste.
4. 100 free credits are granted on first connect.

Tokens refresh automatically. If a client ever loses its grant, the next tool call re-triggers the browser sign-in.

## API key (headless / CI / your own agent)

For backend services, queue workers, scheduled jobs, and agents running without a browser.

Keys are live. Generate one at **Account → API keys** (getmindy.ai/mcp/account?section=keys).

1. Sign in and generate a key at **Account → API keys** (getmindy.ai/mcp/account?section=keys).
2. Provide it to the MCP client or your HTTP layer as a bearer credential:

```
Authorization: Bearer <your-mindy-api-key>
```

`Authorization: Bearer` is the primary header. `X-Mindy-API-Key: <key>` is also accepted as a fallback.

3. Store it as a secret (environment variable, secrets manager) — never commit it. Treat it like any production credential.

See runnable examples: [Python](../examples/python/quickstart.py) · [TypeScript](../examples/typescript/quickstart.ts).

## Which one do I use?

| Situation | Use |
|---|---|
| Building in Claude Desktop / Cursor / Claude Code | OAuth (browser) |
| A cron job that pulls expiring contracts nightly | API key |
| A customer-facing app calling Mindy server-side | API key |
| Trying it out for the first time | OAuth (browser) |

## Security notes

- API keys are per-account and inherit your credit balance — a leaked key spends your credits. Rotate immediately if exposed.
- Mindy never asks you to put a key in a URL or query string. Keys go in the `Authorization` header only.
- Report suspected key compromise to `security@getmindy.ai`.
