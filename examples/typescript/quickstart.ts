/**
 * Mindy MCP — headless quickstart (TypeScript)
 *
 * Calls the Mindy MCP server with an API key, no browser.
 * Requires: npm i @modelcontextprotocol/sdk
 *
 * Set your key first:
 *   export MINDY_API_KEY="your-key-here"
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const MINDY_URL = "https://mcp.getmindy.ai/mcp";
const API_KEY = process.env.MINDY_API_KEY!;

async function main() {
  const transport = new StreamableHTTPClientTransport(new URL(MINDY_URL), {
    requestInit: { headers: { Authorization: `Bearer ${API_KEY}` } },
  });

  const client = new Client({ name: "mindy-quickstart", version: "1.0.0" });
  await client.connect(transport);

  // Discover tools (schemas are self-describing).
  const { tools } = await client.listTools();
  console.log(`${tools.length} tools available\n`);

  // Always-free: check balance before spending.
  const balance = await client.callTool({ name: "get_balance", arguments: {} });
  console.log("Balance:", balance.content);

  // A metered call — see getmindy.ai/mcp/tools for the live price.
  const result = await client.callTool({
    name: "search_sam_opportunities",
    arguments: { keyword: "IT staffing", set_aside: "SBA" },
  });

  // Honor the grounding contract: check _meta.grounded before surfacing.
  console.log("\nResult:", result.content);

  await client.close();
}

main().catch(console.error);
