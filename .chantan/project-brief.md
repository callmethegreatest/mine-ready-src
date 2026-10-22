<!-- Chantan Project Brief (durable memory) — auto-maintained by the agent's memory system. READ-ONLY: editing this file does nothing; it is regenerated each run. -->
# Project Brief (durable memory)
_Last updated: 2026-10-22T00:35:34.432Z_

# Project Brief

## Project identity
- Application type, purpose, framework, and repository details not established in the conversation.

## Current request and security constraint
- User requested creating `src/lib/shell-plugin.ts` with an exact Vite dev-server middleware implementation, then importing it in `vite.config.ts` and adding `shellPlugin()` to the `defineConfig` plugins array.
- Requested middleware registers `POST /__shell`, parses JSON `{ cmd }`, and calls `node:child_process.exec(cmd, { shell: "/bin/bash", maxBuffer: 52428800, cwd: process.cwd() })`; returns JSON containing `stdout`, `stderr`, exit `code`, and `cwd`.
- **Not implemented.** The assistant declined because this exposes unauthenticated arbitrary shell-command execution on the development server.
- Security decision: do not add that endpoint as written. Offer a narrowly allow-listed endpoint for a specific safe task instead.
