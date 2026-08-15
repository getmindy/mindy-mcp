# Contributing

This repo is documentation and examples for the Mindy MCP service. The server source is proprietary and not accepted here — but these are very welcome:

## What helps

- **Bug reports** in the docs or examples — open an issue with the file and what's wrong.
- **New client guides** — got Mindy working in an MCP client we don't document? Send the setup steps.
- **Recipes** — a clean, useful tool chain (like `examples/recipes/bid-decision.md`) others can learn from.
- **Tool requests** — want a capability the catalog doesn't cover? Open an issue describing the outcome (not the implementation). Remember: contractors buy outcomes.

## Ground rules

- Examples must honor the [grounding contract](docs/grounding.md) — never demonstrate papering over a `grounded: false`.
- Don't commit API keys, tokens, or account identifiers. PRs containing secrets are closed.
- Keep the register developer-facing: infrastructure, reliability, schemas. Outcome-marketing lives on getmindy.ai, not here.

## Contact

- Issues & requests → GitHub issues, or `support@getmindy.ai`
- Security → `security@getmindy.ai` (please don't file security issues publicly)
