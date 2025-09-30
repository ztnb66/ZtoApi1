// Deno OpenAI-Compatible API Proxy for Z.ai GLM-4.5

// Config variables from environment
const UPSTREAM_URL = Deno.env.get("UPSTREAM_URL") || "https://chat.z.ai/api/chat/completions";
const DEFAULT_KEY = Deno.env.get("DEFAULT_KEY") || "sk-your-key";
const ZAI_TOKEN = Deno.env.get("ZAI_TOKEN") || "";
const MODEL_NAME = Deno.env.get("MODEL_NAME") || "GLM-4.5";
const PORT = parseInt(Deno.env.get("PORT") || "9090");
const DEBUG_MODE = Deno.env.get("DEBUG_MODE") === "true" || true;
const DEFAULT_STREAM = Deno.env.get("DEFAULT_STREAM") !== "false";
const DASHBOARD_ENABLED = Deno.env.get("DASHBOARD_ENABLED") !== "false";
const ENABLE_THINKING = Deno.env.get("ENABLE_THINKING") === "true";

// Browser headers for upstream requests
const X_FE_VERSION = "prod-fe-1.0.70";
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 Edg/139.0.0.0";
const SEC_CH_UA = '"Not;A=Brand";v="99", "Microsoft Edge";v="139", "Chromium";v="139"';
const SEC_CH_UA_MOB = "?0";
const SEC_CH_UA_PLAT = '"Windows"';
const ORIGIN_BASE = "https://chat.z.ai";

// Anonymous token enabled
const ANON_TOKEN_ENABLED = true;

// Thinking tags mode
const THINK_TAGS_MODE = "strip"; // strip | think | raw

// Request statistics
interface RequestStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  lastRequestTime: Date;
  averageResponseTime: number; // in milliseconds
}

interface LiveRequest {
  id: string;
  timestamp: Date;
  method: string;
  path: string;
  status: number;
  duration: number; // in milliseconds
  userAgent: string;
}

// Global stats
const stats: RequestStats = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  lastRequestTime: new Date(),
  averageResponseTime: 0,
};

const liveRequests: LiveRequest[] = [];

// OpenAI request/response types
interface Message {
  role: string;
  content: string;
}

interface OpenAIRequest {
  model: string;
  messages: Message[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  enable_thinking?: boolean;
}

interface UpstreamRequest {
  stream: boolean;
  model: string;
  messages: Message[];
  params: Record<string, unknown>;
  features: Record<string, unknown>;
  background_tasks?: Record<string, boolean>;
  chat_id?: string;
  id?: string;
  mcp_servers?: string[];
  model_item?: {
    id: string;
    name: string;
    owned_by: string;
  };
  tool_servers?: string[];
  variables?: Record<string, string>;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage?: Usage;
}

interface Choice {
  index: number;
  message?: Message;
  delta?: Delta;
  finish_reason?: string;
}

interface Delta {
  role?: string;
  content?: string;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface UpstreamData {
  type?: string;
  data: {
    delta_content: string;
    phase: string;
    done: boolean;
    usage?: Usage;
    error?: UpstreamError;
    data?: {
      error?: UpstreamError;
    };
  };
  error?: UpstreamError;
}

interface UpstreamError {
  detail: string;
  code: number;
}

interface Model {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

// Debug logger
function debugLog(...args: unknown[]) {
  if (DEBUG_MODE) {
    console.log("[DEBUG]", ...args);
  }
}

// Record request stats
function recordRequestStats(startTime: number, _path: string, status: number) {
  const duration = Date.now() - startTime;

  stats.totalRequests++;
  stats.lastRequestTime = new Date();

  if (status >= 200 && status < 300) {
    stats.successfulRequests++;
  } else {
    stats.failedRequests++;
  }

  // Update average response time
  if (stats.totalRequests > 0) {
    const totalDuration = stats.averageResponseTime * (stats.totalRequests - 1) + duration;
    stats.averageResponseTime = totalDuration / stats.totalRequests;
  } else {
    stats.averageResponseTime = duration;
  }
}

// Add live request
function addLiveRequest(
  method: string,
  path: string,
  status: number,
  duration: number,
  _clientIP: string,
  userAgent: string,
) {
  const request: LiveRequest = {
    id: `${Date.now()}${Math.random()}`,
    timestamp: new Date(),
    method,
    path,
    status,
    duration,
    userAgent,
  };

  liveRequests.push(request);

  // Keep only last 100 requests
  if (liveRequests.length > 100) {
    liveRequests.shift();
  }
}

// Get client IP
function getClientIP(req: Request): string {
  const xff = req.headers.get("X-Forwarded-For");
  if (xff) {
    const ips = xff.split(",");
    if (ips.length > 0) {
      return ips[0].trim();
    }
  }

  const xri = req.headers.get("X-Real-IP");
  if (xri) {
    return xri;
  }

  return "unknown";
}

// Get anonymous token
async function getAnonymousToken(): Promise<string> {
  try {
    const response = await fetch(`${ORIGIN_BASE}/api/v1/auths/`, {
      method: "GET",
      headers: {
        "User-Agent": BROWSER_UA,
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "X-FE-Version": X_FE_VERSION,
        "sec-ch-ua": SEC_CH_UA,
        "sec-ch-ua-mobile": SEC_CH_UA_MOB,
        "sec-ch-ua-platform": SEC_CH_UA_PLAT,
        "Origin": ORIGIN_BASE,
        "Referer": `${ORIGIN_BASE}/`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get anon token: ${response.status}`);
    }

    const data = await response.json();
    if (!data.token) {
      throw new Error("Empty token in response");
    }

    return data.token;
  } catch (error) {
    debugLog("Anonymous token error:", error);
    throw error;
  }
}

// Transform thinking content
function transformThinking(s: string): string {
  // Remove <summary>…</summary>
  s = s.replace(/<summary>.*?<\/summary>/gs, "");
  // Clean up custom tags
  s = s.replace(/<\/thinking>/g, "");
  s = s.replace(/<Full>/g, "");
  s = s.replace(/<\/Full>/g, "");
  s = s.trim();

  switch (THINK_TAGS_MODE) {
    case "think":
      s = s.replace(/<details[^>]*>/g, "<think>");
      s = s.replace(/<\/details>/g, "</think>");
      break;
    case "strip":
      s = s.replace(/<details[^>]*>/g, "");
      s = s.replace(/<\/details>/g, "");
      break;
  }

  // Remove "> " prefix
  s = s.replace(/^> /, "");
  s = s.replace(/\n> /g, "\n");

  return s.trim();
}

// Call upstream API
async function callUpstream(
  upstreamReq: UpstreamRequest,
  chatID: string,
  authToken: string,
): Promise<Response> {
  debugLog("Calling upstream:", UPSTREAM_URL);

  const response = await fetch(UPSTREAM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream",
      "User-Agent": BROWSER_UA,
      "Authorization": `Bearer ${authToken}`,
      "Accept-Language": "zh-CN",
      "sec-ch-ua": SEC_CH_UA,
      "sec-ch-ua-mobile": SEC_CH_UA_MOB,
      "sec-ch-ua-platform": SEC_CH_UA_PLAT,
      "X-FE-Version": X_FE_VERSION,
      "Origin": ORIGIN_BASE,
      "Referer": `${ORIGIN_BASE}/c/${chatID}`,
    },
    body: JSON.stringify(upstreamReq),
  });

  debugLog("Upstream response status:", response.status);
  return response;
}

// Handle stream response
async function handleStreamResponse(
  upstreamReq: UpstreamRequest,
  chatID: string,
  authToken: string,
  startTime: number,
  path: string,
  clientIP: string,
  userAgent: string,
): Promise<Response> {
  debugLog("Handling stream response, chat_id:", chatID);

  const upstreamResp = await callUpstream(upstreamReq, chatID, authToken);

  if (!upstreamResp.ok) {
    debugLog("Upstream error status:", upstreamResp.status);
    const duration = Date.now() - startTime;
    recordRequestStats(startTime, path, 502);
    addLiveRequest("POST", path, 502, duration, clientIP, userAgent);
    return new Response("Upstream error", { status: 502 });
  }

  const encoder = new TextEncoder();
  let isFirstChunk = true;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const reader = upstreamResp.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        // Send first chunk with role
        if (isFirstChunk) {
          const firstChunk: OpenAIResponse = {
            id: `chatcmpl-${Date.now()}`,
            object: "chat.completion.chunk",
            created: Math.floor(Date.now() / 1000),
            model: MODEL_NAME,
            choices: [{
              index: 0,
              delta: { role: "assistant" },
            }],
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(firstChunk)}\n\n`));
          isFirstChunk = false;
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;

            const dataStr = line.substring(6);
            if (!dataStr) continue;

            try {
              const upstreamData: UpstreamData = JSON.parse(dataStr);

              // Check for errors
              if (
                upstreamData.error || upstreamData.data?.error ||
                upstreamData.data?.data?.error
              ) {
                debugLog("Upstream error detected");
                const endChunk: OpenAIResponse = {
                  id: `chatcmpl-${Date.now()}`,
                  object: "chat.completion.chunk",
                  created: Math.floor(Date.now() / 1000),
                  model: MODEL_NAME,
                  choices: [{
                    index: 0,
                    delta: {},
                    finish_reason: "stop",
                  }],
                };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(endChunk)}\n\n`));
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                break;
              }

              // Process content
              if (upstreamData.data.delta_content) {
                let out = upstreamData.data.delta_content;
                if (upstreamData.data.phase === "thinking") {
                  out = transformThinking(out);
                }

                if (out) {
                  const chunk: OpenAIResponse = {
                    id: `chatcmpl-${Date.now()}`,
                    object: "chat.completion.chunk",
                    created: Math.floor(Date.now() / 1000),
                    model: MODEL_NAME,
                    choices: [{
                      index: 0,
                      delta: { content: out },
                    }],
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                }
              }

              // Check if done
              if (upstreamData.data.done || upstreamData.data.phase === "done") {
                debugLog("Stream done");
                const endChunk: OpenAIResponse = {
                  id: `chatcmpl-${Date.now()}`,
                  object: "chat.completion.chunk",
                  created: Math.floor(Date.now() / 1000),
                  model: MODEL_NAME,
                  choices: [{
                    index: 0,
                    delta: {},
                    finish_reason: "stop",
                  }],
                };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(endChunk)}\n\n`));
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                break;
              }
            } catch (e) {
              debugLog("Parse error:", e);
            }
          }
        }

        controller.close();

        // Record stats
        const duration = Date.now() - startTime;
        recordRequestStats(startTime, path, 200);
        addLiveRequest("POST", path, 200, duration, clientIP, userAgent);
      } catch (error) {
        debugLog("Stream error:", error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// Handle non-stream response
async function handleNonStreamResponse(
  upstreamReq: UpstreamRequest,
  chatID: string,
  authToken: string,
  startTime: number,
  path: string,
  clientIP: string,
  userAgent: string,
): Promise<Response> {
  debugLog("Handling non-stream response, chat_id:", chatID);

  const upstreamResp = await callUpstream(upstreamReq, chatID, authToken);

  if (!upstreamResp.ok) {
    debugLog("Upstream error status:", upstreamResp.status);
    const duration = Date.now() - startTime;
    recordRequestStats(startTime, path, 502);
    addLiveRequest("POST", path, 502, duration, clientIP, userAgent);
    return new Response("Upstream error", { status: 502 });
  }

  const reader = upstreamResp.body?.getReader();
  if (!reader) {
    return new Response("No response body", { status: 502 });
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let fullContent = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;

      const dataStr = line.substring(6);
      if (!dataStr) continue;

      try {
        const upstreamData: UpstreamData = JSON.parse(dataStr);

        if (upstreamData.data.delta_content) {
          let out = upstreamData.data.delta_content;
          if (upstreamData.data.phase === "thinking") {
            out = transformThinking(out);
          }
          if (out) {
            fullContent += out;
          }
        }

        if (upstreamData.data.done || upstreamData.data.phase === "done") {
          break;
        }
      } catch (e) {
        debugLog("Parse error:", e);
      }
    }
  }

  const response: OpenAIResponse = {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: MODEL_NAME,
    choices: [{
      index: 0,
      message: {
        role: "assistant",
        content: fullContent,
      },
      finish_reason: "stop",
    }],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    },
  };

  const duration = Date.now() - startTime;
  recordRequestStats(startTime, path, 200);
  addLiveRequest("POST", path, 200, duration, clientIP, userAgent);

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// CORS headers
function setCORSHeaders(headers: Headers) {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Allow-Credentials", "true");
}

// Handle models endpoint
function handleModels(_req: Request): Response {
  const response = {
    object: "list",
    data: [{
      id: MODEL_NAME,
      object: "model",
      created: Math.floor(Date.now() / 1000),
      owned_by: "z.ai",
    }],
  };

  const headers = new Headers({ "Content-Type": "application/json" });
  setCORSHeaders(headers);

  return new Response(JSON.stringify(response), { status: 200, headers });
}

// Handle chat completions
async function handleChatCompletions(req: Request): Promise<Response> {
  const startTime = Date.now();
  const url = new URL(req.url);
  const path = url.pathname;
  const clientIP = getClientIP(req);
  const userAgent = req.headers.get("User-Agent") || "";

  debugLog("Received chat completions request");

  // Verify API key
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    debugLog("Missing or invalid Authorization header");
    const duration = Date.now() - startTime;
    recordRequestStats(startTime, path, 401);
    addLiveRequest("POST", path, 401, duration, clientIP, userAgent);
    return new Response("Missing or invalid Authorization header", { status: 401 });
  }

  const apiKey = authHeader.substring(7);
  if (apiKey !== DEFAULT_KEY) {
    debugLog("Invalid API key:", apiKey);
    const duration = Date.now() - startTime;
    recordRequestStats(startTime, path, 401);
    addLiveRequest("POST", path, 401, duration, clientIP, userAgent);
    return new Response("Invalid API key", { status: 401 });
  }

  debugLog("API key verified");

  // Parse request
  let body: OpenAIRequest;
  try {
    body = await req.json();
  } catch (e) {
    debugLog("JSON parse error:", e);
    const duration = Date.now() - startTime;
    recordRequestStats(startTime, path, 400);
    addLiveRequest("POST", path, 400, duration, clientIP, userAgent);
    return new Response("Invalid JSON", { status: 400 });
  }

  // Set default stream if not specified
  if (body.stream === undefined) {
    body.stream = DEFAULT_STREAM;
    debugLog("Using default stream value:", DEFAULT_STREAM);
  }

  debugLog(
    `Request parsed - model: ${body.model}, stream: ${body.stream}, messages: ${body.messages.length}`,
  );

  // Generate chat IDs
  const chatID = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const msgID = `${Date.now()}`;

  // Determine thinking setting
  const enableThinking = body.enable_thinking !== undefined
    ? body.enable_thinking
    : ENABLE_THINKING;
  debugLog("Enable thinking:", enableThinking);

  // Build upstream request
  const upstreamReq: UpstreamRequest = {
    stream: true,
    chat_id: chatID,
    id: msgID,
    model: "0727-360B-API",
    messages: body.messages,
    params: {},
    features: {
      enable_thinking: enableThinking,
    },
    background_tasks: {
      title_generation: false,
      tags_generation: false,
    },
    mcp_servers: [],
    model_item: {
      id: "0727-360B-API",
      name: "GLM-4.5",
      owned_by: "openai",
    },
    tool_servers: [],
    variables: {
      "{{USER_NAME}}": "User",
      "{{USER_LOCATION}}": "Unknown",
      "{{CURRENT_DATETIME}}": new Date().toISOString().replace("T", " ").substring(0, 19),
    },
  };

  // Get auth token
  let authToken = ZAI_TOKEN;
  if (ANON_TOKEN_ENABLED) {
    try {
      authToken = await getAnonymousToken();
      debugLog("Anonymous token obtained:", authToken.substring(0, 10) + "...");
    } catch (e) {
      debugLog("Failed to get anonymous token, using fixed token:", e);
    }
  }

  // Call upstream
  if (body.stream) {
    return await handleStreamResponse(
      upstreamReq,
      chatID,
      authToken,
      startTime,
      path,
      clientIP,
      userAgent,
    );
  } else {
    return await handleNonStreamResponse(
      upstreamReq,
      chatID,
      authToken,
      startTime,
      path,
      clientIP,
      userAgent,
    );
  }
}

// Dashboard HTML
const dashboardHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API调用看板</title>
    <style>
        body { font-family: sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { text-align: center; color: #333; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .stat-card { background: #f8f9fa; border-radius: 6px; padding: 15px; text-align: center; }
        .stat-value { font-size: 24px; font-weight: bold; color: #007bff; }
        .stat-label { font-size: 14px; color: #6c757d; margin-top: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; }
        .status-success { color: #28a745; }
        .status-error { color: #dc3545; }
    </style>
</head>
<body>
    <div class="container">
        <h1>API调用看板</h1>
        <div class="stats">
            <div class="stat-card"><div class="stat-value" id="total">0</div><div class="stat-label">总请求数</div></div>
            <div class="stat-card"><div class="stat-value" id="success">0</div><div class="stat-label">成功请求</div></div>
            <div class="stat-card"><div class="stat-value" id="failed">0</div><div class="stat-label">失败请求</div></div>
            <div class="stat-card"><div class="stat-value" id="avgtime">0ms</div><div class="stat-label">平均响应时间</div></div>
        </div>
        <h2>实时请求</h2>
        <table>
            <thead><tr><th>时间</th><th>方法</th><th>路径</th><th>状态</th><th>耗时</th></tr></thead>
            <tbody id="requests"></tbody>
        </table>
        <p style="text-align: center; color: #6c757d; margin-top: 20px;">数据每5秒自动刷新</p>
    </div>
    <script>
        async function update() {
            const statsRes = await fetch('/dashboard/stats');
            const stats = await statsRes.json();
            document.getElementById('total').textContent = stats.totalRequests;
            document.getElementById('success').textContent = stats.successfulRequests;
            document.getElementById('failed').textContent = stats.failedRequests;
            document.getElementById('avgtime').textContent = Math.round(stats.averageResponseTime) + 'ms';

            const reqsRes = await fetch('/dashboard/requests');
            const reqs = await reqsRes.json();
            const tbody = document.getElementById('requests');
            tbody.innerHTML = '';
            reqs.slice().reverse().forEach(r => {
                const row = tbody.insertRow();
                row.innerHTML = \`<td>\${new Date(r.timestamp).toLocaleTimeString()}</td>
                    <td>\${r.method}</td><td>\${r.path}</td>
                    <td class="\${r.status >= 200 && r.status < 300 ? 'status-success' : 'status-error'}">\${r.status}</td>
                    <td>\${r.duration}ms</td>\`;
            });
        }
        update();
        setInterval(update, 5000);
    </script>
</body>
</html>`;

// API docs HTML (simplified)
const apiDocsHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZtoApi API文档</title>
    <style>
        body { font-family: sans-serif; margin: 20px; background: #f5f5f5; line-height: 1.6; }
        .container { max-width: 1000px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; }
        h1 { text-align: center; color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        h2 { color: #007bff; margin-top: 30px; }
        .endpoint { background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #007bff; }
        code { background: #e9ecef; padding: 2px 6px; border-radius: 3px; }
        pre { background: #f8f9fa; padding: 15px; border-radius: 6px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>ZtoApi API文档</h1>
        <h2>概述</h2>
        <p>OpenAI兼容的API代理服务器，用于Z.ai GLM-4.5模型。</p>
        <p><strong>基础URL:</strong> <code>http://localhost:${PORT}/v1</code></p>

        <h2>身份验证</h2>
        <p>在请求头中包含API密钥：</p>
        <pre>Authorization: Bearer ${DEFAULT_KEY}</pre>

        <h2>端点</h2>
        <div class="endpoint">
            <h3>GET /v1/models</h3>
            <p>获取可用模型列表</p>
        </div>

        <div class="endpoint">
            <h3>POST /v1/chat/completions</h3>
            <p>创建聊天完成</p>
            <p>参数:</p>
            <ul>
                <li><code>model</code> (string, 必需): 模型名称</li>
                <li><code>messages</code> (array, 必需): 消息列表</li>
                <li><code>stream</code> (boolean, 可选): 是否流式响应，默认 ${DEFAULT_STREAM}</li>
                <li><code>enable_thinking</code> (boolean, 可选): 是否启用思考功能</li>
            </ul>
        </div>

        <h2>示例</h2>
        <pre>
curl -X POST http://localhost:${PORT}/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${DEFAULT_KEY}" \\
  -d '{
    "model": "${MODEL_NAME}",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": false
  }'
        </pre>
    </div>
</body>
</html>`;

// Main request handler
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  // CORS preflight
  if (req.method === "OPTIONS") {
    const headers = new Headers();
    setCORSHeaders(headers);
    return new Response(null, { status: 200, headers });
  }

  // Routes
  if (path === "/v1/models" && req.method === "GET") {
    return handleModels(req);
  }

  if (path === "/v1/chat/completions" && req.method === "POST") {
    return await handleChatCompletions(req);
  }

  if (path === "/docs" && req.method === "GET") {
    return new Response(apiDocsHTML, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (DASHBOARD_ENABLED) {
    if (path === "/dashboard" && req.method === "GET") {
      return new Response(dashboardHTML, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    if (path === "/dashboard/stats" && req.method === "GET") {
      return new Response(JSON.stringify(stats), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/dashboard/requests" && req.method === "GET") {
      return new Response(JSON.stringify(liveRequests), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Not Found", { status: 404 });
}

// Start server
console.log(`🚀 ZtoApi (Deno) starting on port ${PORT}`);
console.log(`📦 Model: ${MODEL_NAME}`);
console.log(`🌐 Upstream: ${UPSTREAM_URL}`);
console.log(`🐛 Debug mode: ${DEBUG_MODE}`);
console.log(`🌊 Default stream: ${DEFAULT_STREAM}`);
console.log(`📊 Dashboard enabled: ${DASHBOARD_ENABLED}`);
console.log(`🧠 Thinking enabled: ${ENABLE_THINKING}`);
if (DASHBOARD_ENABLED) {
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
}
console.log(`📖 API Docs: http://localhost:${PORT}/docs`);

Deno.serve({ port: PORT }, handler);
