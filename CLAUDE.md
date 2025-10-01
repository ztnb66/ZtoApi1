# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZtoApi is an OpenAI-compatible API proxy for Z.ai GLM-4.5 model. The project exists in two implementations:
- **Go version** (`main.go`) - Original implementation
- **Deno version** (`deno/zai/main.ts`) - Modern TypeScript rewrite with Deno runtime

Both versions provide the same functionality: proxying OpenAI-format API requests to Z.ai's upstream API while handling authentication, streaming, and response transformation.

## Build & Run Commands

### Deno Version (Recommended)

```bash
# Navigate to Deno implementation
cd deno/zai

# Start server (production)
deno task start
# Or: ./start.sh (macOS/Linux)
# Or: start.bat (Windows)

# Development mode with auto-reload
deno task dev

# Cache dependencies
deno task cache

# Direct run with explicit permissions
deno run --allow-net --allow-env --allow-read main.ts
```

### Go Version (Legacy)

```bash
# Run directly
go run main.go

# Or use start scripts
./start.sh          # macOS/Linux
start.bat           # Windows

# Build binary
go build -o ztoapi main.go
```

### Docker

```bash
# Deno version
docker build -f Dockerfile.deno -t zto-api-deno .
docker run -p 9090:9090 -e DEFAULT_KEY=sk-test zto-api-deno

# Go version
docker build -t zto-api .
docker run -p 9090:9090 -e DEFAULT_KEY=sk-test zto-api
```

## Testing the Service

```bash
# Check if server is running
curl http://localhost:9090/v1/models

# Test chat completion (non-streaming)
curl -X POST http://localhost:9090/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-your-key" \
  -d '{"model":"GLM-4.5","messages":[{"role":"user","content":"Hello"}],"stream":false}'

# Test chat completion (streaming)
curl -X POST http://localhost:9090/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-your-key" \
  -d '{"model":"GLM-4.5","messages":[{"role":"user","content":"Hello"}],"stream":true}'
```

## Architecture

### Request Flow

1. **Client Request** → API endpoint (`/v1/chat/completions` or `/v1/models`)
2. **Authentication** → Validate Bearer token against `DEFAULT_KEY`
3. **Token Selection** → Use configured `ZAI_TOKEN` or fetch anonymous token via `getAnonymousToken()`
4. **Request Transformation** → Convert OpenAI format to Z.ai upstream format:
   - Generate chat_id and message_id
   - Add browser-like headers (User-Agent, sec-ch-ua, X-FE-Version, etc.)
   - Set model to `0727-360B-API` (upstream model ID)
   - Configure features (enable_thinking)
   - Add variables (USER_NAME, CURRENT_DATETIME, etc.)
5. **Upstream Call** → POST to `UPSTREAM_URL` with transformed request
6. **Response Processing**:
   - **Streaming**: Parse SSE stream, transform thinking content, emit OpenAI-format chunks
   - **Non-streaming**: Collect full response, transform, return complete OpenAI response
7. **Thinking Content Transformation** (if present):
   - Remove `<summary>` tags
   - Convert `<details>` tags based on `THINK_TAGS_MODE` (strip/think/raw)
   - Clean up markdown quote prefixes (`> `)
8. **Statistics Recording** → Update request stats and live request log

### Key Components

#### Anonymous Token System
When `ZAI_TOKEN` is not configured, the system automatically fetches anonymous tokens from `https://chat.z.ai/api/v1/auths/`. Each request gets a fresh token to avoid shared conversation history.

#### Streaming vs Non-Streaming
- **Streaming**: Uses Server-Sent Events (SSE), sends incremental chunks with `delta.content`
- **Non-streaming**: Buffers entire response, returns single `message.content`

Both modes read from upstream's SSE stream, but handle output differently.

#### Thinking Content Processing
Upstream may return "thinking" phase content wrapped in markdown details/summary tags. The proxy:
1. Detects `phase: "thinking"` in upstream data
2. Applies `transformThinking()` to clean/convert tags
3. Mode controlled by `THINK_TAGS_MODE` constant and `ENABLE_THINKING` env var

#### Dashboard & Monitoring
- `/dashboard` - Real-time stats UI (HTML with auto-refresh)
- `/dashboard/stats` - JSON stats endpoint (total/success/failed requests, avg response time)
- `/dashboard/requests` - JSON recent requests log (last 100)

Controlled by `DASHBOARD_ENABLED` environment variable.

## Environment Configuration

Configuration priority (highest to lowest):
1. Environment variables
2. `.env.local` file
3. `.env` file
4. `config.env` file
5. Default values in code

### Critical Environment Variables

- `ZAI_TOKEN` - Z.ai API token (optional, uses anonymous if empty)
- `DEFAULT_KEY` - API key for client authentication (default: `sk-your-key`)
- `UPSTREAM_URL` - Z.ai upstream endpoint (default: `https://chat.z.ai/api/chat/completions`)
- `MODEL_NAME` - Model name exposed to clients (default: `GLM-4.5`)
- `PORT` - Server port (default: `9090`)
- `DEBUG_MODE` - Enable debug logging (default: `true`)
- `DEFAULT_STREAM` - Default streaming mode when client doesn't specify (default: `true`)
- `ENABLE_THINKING` - Enable thinking content by default (default: `false`)
- `DASHBOARD_ENABLED` - Enable dashboard endpoints (default: `true`)

## Deno-Specific Considerations

### Required Permissions
The Deno version requires these permissions (all specified in deno.json tasks):
- `--allow-net` - HTTP server and upstream API calls (required)
- `--allow-env` - Read environment variables (required)
- `--allow-read` - Read config files like .env.local (optional but recommended)

### Type Safety
All interfaces are fully typed in `deno/zai/main.ts`. Key types:
- `OpenAIRequest/OpenAIResponse` - Client-facing API format
- `UpstreamRequest/UpstreamData` - Z.ai upstream format
- `RequestStats/LiveRequest` - Monitoring data structures

### Web Standards
Uses native Web APIs instead of Node.js APIs:
- `Deno.serve()` for HTTP server
- `ReadableStream` for streaming responses
- `fetch()` for upstream calls
- `TextEncoder/TextDecoder` for stream processing

## Important Implementation Details

### Browser Impersonation
The proxy impersonates a real browser when calling upstream to avoid detection:
- Sends Chrome/Edge User-Agent
- Includes sec-ch-ua headers
- Sets X-FE-Version header (frontend version)
- Uses Origin/Referer with chat.z.ai domain

### Model ID Translation
- Client requests use `MODEL_NAME` (default: "GLM-4.5")
- Upstream requests use hard-coded "0727-360B-API"
- Response model field is set back to `MODEL_NAME`

### Chat Session Management
Each request generates unique IDs:
- `chat_id`: `${timestamp}-${random}` for conversation context
- `id`: `${timestamp}` for message identification
- Both sent to upstream and used in Referer URL

### Error Handling
The proxy detects errors at multiple levels:
1. Top-level `error` field in upstream response
2. Nested `data.error` field
3. Deep nested `data.data.error` field

When error detected, immediately ends stream with finish_reason: "stop".

## File Organization

- `deno/zai/main.ts` - Deno implementation (single file, ~2300 lines)
- `main.go` - Go implementation (single file, ~1800 lines)
- `deno/zai/deno.json` - Deno tasks and compiler config
- `go.mod` - Go module definition (no external dependencies)
- `deno/zai/start.sh/bat` - Deno startup scripts with env loading and port checking
- `start.sh/bat` - Go startup scripts
- `Dockerfile.deno` - Multi-stage Docker build for Deno
- `Dockerfile` - Multi-stage Docker build for Go
- `config.env` - Template for environment configuration
- `deno/zai/README.md` - Deno version documentation
- `README.md` - Original Go version documentation
- `deno/` - Deno implementations directory
  - `template/` - Reusable template for creating new proxies
  - `zai/` - Z.ai GLM-4.5 proxy
  - `dphn/` - Dolphin AI proxy

## When Working on This Codebase

1. **Dual implementations**: Changes should be made to both Go and Deno versions if fixing bugs or adding features
2. **Environment files**: Never commit `.env.local` or `.env` (already in .gitignore)
3. **Port conflicts**: Start scripts check for port availability before starting
4. **Anonymous tokens**: If `ZAI_TOKEN` is empty, each request fetches a new anonymous token - this is intentional for privacy
5. **Thinking mode**: The `THINK_TAGS_MODE` constant in code (not env var) controls how thinking tags are processed (strip/think/raw)
6. **OpenAI compatibility**: Maintain strict OpenAI API format compatibility - this is critical for client integrations
