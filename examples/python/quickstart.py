"""
Mindy MCP — headless quickstart (Python)

Calls the Mindy MCP server with an API key, no browser.
Requires: pip install "mcp[cli]"   (the official MCP Python SDK)

Set your key first:
    export MINDY_API_KEY="your-key-here"
"""

import asyncio
import os

from mcp.client.streamable_http import streamablehttp_client
from mcp import ClientSession

MINDY_URL = "https://mcp.getmindy.ai/mcp"
API_KEY = os.environ["MINDY_API_KEY"]


async def main() -> None:
    headers = {"Authorization": f"Bearer {API_KEY}"}

    async with streamablehttp_client(MINDY_URL, headers=headers) as (read, write, _):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # Discover what's available (schemas are self-describing).
            tools = await session.list_tools()
            print(f"{len(tools.tools)} tools available\n")

            # Always-free: check the balance before spending.
            balance = await session.call_tool("get_balance", {})
            print("Balance:", balance.content)

            # A metered call — see getmindy.ai/mcp/tools for the live price.
            result = await session.call_tool(
                "search_sam_opportunities",
                {"keyword": "IT staffing", "set_aside": "SBA"},
            )

            # Honor the grounding contract: check _meta.grounded.
            print("\nResult:", result.content)
            # if the server reports grounded=false, show "no match" —
            # never let a downstream model invent one.


if __name__ == "__main__":
    asyncio.run(main())
