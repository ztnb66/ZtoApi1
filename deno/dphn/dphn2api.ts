// Deno OpenAI-Compatible API Proxy for Dolphin AI

export {};

// Config variables from environment
const UPSTREAM_URL = Deno.env.get("DPHN_UPSTREAM_URL") || "https://chat.dphn.ai/api/chat";
const DEFAULT_KEY = Deno.env.get("DPHN_DEFAULT_KEY") || "sk-dphn-key";
const MODEL_NAME = Deno.env.get("DPHN_MODEL_NAME") || "Dolphin 24B";
const PORT = parseInt(Deno.env.get("DPHN_PORT") || "9091");
const DEBUG_MODE = Deno.env.get("DPHN_DEBUG_MODE") === "true";
const DEFAULT_STREAM = Deno.env.get("DPHN_DEFAULT_STREAM") !== "false";
const DASHBOARD_ENABLED = Deno.env.get("DPHN_DASHBOARD_ENABLED") !== "false";
const DEFAULT_TEMPLATE = Deno.env.get("DPHN_DEFAULT_TEMPLATE") || "logical";

const ORIGIN_BASE = "https://chat.dphn.ai";
const MODELS_API = "https://chat.dphn.ai/api/models";

// Request statistics
interface RequestStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  lastRequestTime: Date;
  averageResponseTime: number;
  apiCallsCount: number;
  modelsCallsCount: number;
  streamingRequests: number;
  nonStreamingRequests: number;
  startTime: Date;
  fastestResponse: number;
  slowestResponse: number;
  modelUsage: Map<string, number>;
}

interface LiveRequest {
  id: string;
  timestamp: Date;
  method: string;
  path: string;
  status: number;
  duration: number;
  userAgent: string;
  model?: string;
}

interface HistoryDataPoint {
  timestamp: Date;
  totalRequests: number;
  successRate: number;
  avgResponseTime: number;
}

const stats: RequestStats = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  lastRequestTime: new Date(),
  averageResponseTime: 0,
  apiCallsCount: 0,
  modelsCallsCount: 0,
  streamingRequests: 0,
  nonStreamingRequests: 0,
  startTime: new Date(),
  fastestResponse: Infinity,
  slowestResponse: 0,
  modelUsage: new Map<string, number>(),
};

const liveRequests: LiveRequest[] = [];

// 历史数据记录（每分钟记录一次，最多保留60个数据点，即1小时）
const historyData: HistoryDataPoint[] = [];
const MAX_HISTORY_POINTS = 60;

// 定时记录历史数据（每分钟一次）
setInterval(() => {
  const successRate = stats.totalRequests > 0
    ? (stats.successfulRequests / stats.totalRequests) * 100
    : 0;

  historyData.push({
    timestamp: new Date(),
    totalRequests: stats.totalRequests,
    successRate,
    avgResponseTime: stats.averageResponseTime,
  });

  // 保持数组大小在限制内
  if (historyData.length > MAX_HISTORY_POINTS) {
    historyData.shift();
  }
}, 60000); // 每分钟记录一次

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
  top_p?: number;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: Message;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Dolphin AI upstream request type
interface DolphinRequest {
  messages: Message[];
  model: string;
  template: string;
}

// Debug logging
function debugLog(...args: unknown[]) {
  if (DEBUG_MODE) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}]`, ...args);
  }
}

// Generate browser headers for upstream requests
function generateBrowserHeaders() {
  // Random Chrome version (128-140)
  const chromeVersion = Math.floor(Math.random() * 13) + 128;

  const userAgents = [
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Safari/537.36`,
    `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Safari/537.36`,
    `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Safari/537.36`,
  ];

  const platforms = ['"Windows"', '"macOS"', '"Linux"'];
  const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
  const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

  return {
    "accept": "text/event-stream",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": ORIGIN_BASE,
    "referer": `${ORIGIN_BASE}/`,
    "sec-ch-ua": `"Chromium";v="${chromeVersion}", "Not=A?Brand";v="24", "Google Chrome";v="${chromeVersion}"`,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": randomPlatform,
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": randomUA,
    "priority": "u=1, i",
  };
}

// Map OpenAI model name to Dolphin model ID and extract template suffix
// 验证并映射模型名称
function mapModelName(openAIModel: string): { modelId: string; template: string; error?: string } {
  // 支持的 template 列表（顺序很重要：长的放前面，避免误匹配）
  const validTemplates = ["code-beginner", "code-advanced", "logical", "summary"];

  // 默认结果
  const defaultResult = {
    modelId: "dolphinpod:24B",
    template: DEFAULT_TEMPLATE
  };

  // 检查基础模型名称是否匹配
  const modelLower = openAIModel.toLowerCase();
  const isDolphinModel = modelLower.startsWith("dolphin");

  if (!isDolphinModel) {
    return {
      ...defaultResult,
      error: `不支持的模型 "${openAIModel}"。支持的模型格式：Dolphin 24B 或 Dolphin 24B-{template}`
    };
  }

  // 检查模型名称是否以某个有效的 template 结尾
  for (const template of validTemplates) {
    if (openAIModel.endsWith(`-${template}`)) {
      debugLog(`从模型名称提取 template: ${template}`);
      return {
        modelId: "dolphinpod:24B",
        template: template,
      };
    }
  }

  // 没有找到匹配的 template 后缀，使用默认值
  // 如果模型名称中包含 "-" 但不匹配任何已知 template，返回错误
  if (openAIModel.includes("-")) {
    // 提取用户尝试使用的后缀
    const parts = openAIModel.split("-");
    const attemptedSuffix = parts.slice(1).join("-"); // 重新组合除第一部分外的所有部分

    return {
      ...defaultResult,
      error: `不支持的 template "${attemptedSuffix}"。支持的 templates: ${validTemplates.join(", ")}`
    };
  }

  // 没有后缀，使用默认 template
  return defaultResult;
}

// Record request statistics
function recordRequest(
  method: string,
  path: string,
  status: number,
  duration: number,
  userAgent: string,
  model?: string,
  isStreaming?: boolean,
) {
  stats.totalRequests++;
  stats.lastRequestTime = new Date();

  if (status >= 200 && status < 300) {
    stats.successfulRequests++;
  } else {
    stats.failedRequests++;
  }

  // Update response time stats
  const totalTime = stats.averageResponseTime * (stats.totalRequests - 1) + duration;
  stats.averageResponseTime = totalTime / stats.totalRequests;

  if (duration < stats.fastestResponse) stats.fastestResponse = duration;
  if (duration > stats.slowestResponse) stats.slowestResponse = duration;

  // Track model usage
  if (model) {
    stats.modelUsage.set(model, (stats.modelUsage.get(model) || 0) + 1);
  }

  // Track streaming
  if (isStreaming !== undefined) {
    if (isStreaming) {
      stats.streamingRequests++;
    } else {
      stats.nonStreamingRequests++;
    }
  }

  // Track specific endpoint calls
  if (path.includes("/v1/chat/completions")) {
    stats.apiCallsCount++;
  } else if (path.includes("/v1/models")) {
    stats.modelsCallsCount++;
  }

  // Add to live requests
  liveRequests.push({
    id: crypto.randomUUID(),
    timestamp: new Date(),
    method,
    path,
    status,
    duration,
    userAgent,
    model,
  });

  // Keep only last 100 requests
  if (liveRequests.length > 100) {
    liveRequests.shift();
  }
}

// Handle /v1/models endpoint
async function handleModels(req: Request): Promise<Response> {
  const startTime = Date.now();
  const userAgent = req.headers.get("user-agent") || "unknown";

  try {
    debugLog("Fetching models from:", MODELS_API);

    // Generate random browser headers
    const chromeVersion = Math.floor(Math.random() * 13) + 128;
    const platforms = ['"Windows"', '"macOS"', '"Linux"'];
    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

    const response = await fetch(MODELS_API, {
      headers: {
        "accept": "application/json",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "referer": `${ORIGIN_BASE}/`,
        "sec-ch-ua": `"Chromium";v="${chromeVersion}", "Not=A?Brand";v="24", "Google Chrome";v="${chromeVersion}"`,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": randomPlatform,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Safari/537.36`,
        "priority": "u=1, i",
      },
    });

    const data = await response.json();
    debugLog("Models response:", data);

    // Available templates from Dolphin API
    const templates = ["logical", "summary", "code-beginner", "code-advanced"];

    // Transform to OpenAI format - create model variants for each template
    const modelVariants: any[] = [];

    data.data.forEach((model: { id: string; label: string }) => {
      // Add base model without template suffix
      modelVariants.push({
        id: model.label,
        object: "model",
        created: Math.floor(Date.now() / 1000),
        owned_by: "dolphin-ai",
      });

      // Add model variants with template suffixes
      templates.forEach(template => {
        modelVariants.push({
          id: `${model.label}-${template}`,
          object: "model",
          created: Math.floor(Date.now() / 1000),
          owned_by: "dolphin-ai",
        });
      });
    });

    const openAIModels = {
      object: "list",
      data: modelVariants,
    };

    const duration = Date.now() - startTime;
    recordRequest("GET", "/v1/models", 200, duration, userAgent);

    return new Response(JSON.stringify(openAIModels), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    debugLog("Error fetching models:", error);
    const duration = Date.now() - startTime;
    recordRequest("GET", "/v1/models", 500, duration, userAgent);

    return new Response(
      JSON.stringify({
        error: {
          message: `Failed to fetch models: ${error}`,
          type: "internal_error",
        },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// Handle /v1/chat/completions endpoint
async function handleChatCompletions(req: Request): Promise<Response> {
  const startTime = Date.now();
  const userAgent = req.headers.get("user-agent") || "unknown";

  try {
    // Validate authorization
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const duration = Date.now() - startTime;
      recordRequest("POST", "/v1/chat/completions", 401, duration, userAgent);
      return new Response(
        JSON.stringify({ error: { message: "Missing or invalid authorization header" } }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const apiKey = authHeader.substring(7);
    if (apiKey !== DEFAULT_KEY) {
      const duration = Date.now() - startTime;
      recordRequest("POST", "/v1/chat/completions", 401, duration, userAgent);
      return new Response(
        JSON.stringify({ error: { message: "Invalid API key" } }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Parse request
    const openAIReq: OpenAIRequest = await req.json();
    debugLog("OpenAI request:", JSON.stringify(openAIReq, null, 2));

    const isStreaming = openAIReq.stream ?? DEFAULT_STREAM;

    // Validate and extract modelId and template from model name
    const modelMapping = mapModelName(openAIReq.model);

    // 如果模型验证失败，返回错误
    if (modelMapping.error) {
      const duration = Date.now() - startTime;
      recordRequest("POST", "/v1/chat/completions", 400, duration, userAgent, openAIReq.model);
      return new Response(
        JSON.stringify({
          error: {
            message: modelMapping.error,
            type: "invalid_request_error",
            param: "model",
            code: "model_not_found"
          }
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { modelId, template } = modelMapping;

    // Filter and transform messages for Dolphin AI
    // Dolphin only accepts "user" and "assistant" roles, not "system"
    const transformedMessages = openAIReq.messages.map(msg => {
      if (msg.role === "system") {
        // Convert system message to user message with a prefix
        return {
          role: "user",
          content: `[System Instructions]: ${msg.content}`,
        };
      }
      return {
        role: msg.role,
        content: msg.content,
      };
    });

    // Build upstream request - only include fields that Dolphin supports
    const upstreamReq: DolphinRequest = {
      messages: transformedMessages,
      model: modelId,
      template: template,
    };

    debugLog("Upstream request:", JSON.stringify(upstreamReq, null, 2));

    // Call upstream API
    const upstreamResponse = await fetch(UPSTREAM_URL, {
      method: "POST",
      headers: generateBrowserHeaders(),
      body: JSON.stringify(upstreamReq),
    });

    if (!upstreamResponse.ok) {
      let errorText = "";
      try {
        errorText = await upstreamResponse.text();
      } catch (e) {
        errorText = "Failed to read error response";
      }
      debugLog("Upstream error response:", errorText);
      debugLog("Request that caused error:", JSON.stringify(upstreamReq, null, 2));
      throw new Error(`Upstream API error: ${upstreamResponse.status} ${upstreamResponse.statusText} - ${errorText}`);
    }

    if (isStreaming) {
      // Handle streaming response
      return handleStreamingResponse(upstreamResponse, openAIReq.model, startTime, userAgent);
    } else {
      // Handle non-streaming response
      return await handleNonStreamingResponse(upstreamResponse, openAIReq.model, startTime, userAgent);
    }
  } catch (error) {
    debugLog("Error in chat completions:", error);
    const duration = Date.now() - startTime;
    recordRequest("POST", "/v1/chat/completions", 500, duration, userAgent);

    return new Response(
      JSON.stringify({
        error: {
          message: `Internal server error: ${error}`,
          type: "internal_error",
        },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// Handle streaming response
function handleStreamingResponse(
  upstreamResponse: Response,
  modelName: string,
  startTime: number,
  userAgent: string,
): Response {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let buffer = "";
  let fullContent = "";
  const chatID = `chatcmpl-${Date.now()}`;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const reader = upstreamResponse.body!.getReader();

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Send final chunk
            const finalChunk = {
              id: chatID,
              object: "chat.completion.chunk",
              created: Math.floor(Date.now() / 1000),
              model: modelName,
              choices: [{
                index: 0,
                delta: {},
                finish_reason: "stop",
              }],
            };

            controller.enqueue(encoder.encode(`data: ${JSON.stringify(finalChunk)}\n\n`));
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();

            const duration = Date.now() - startTime;
            recordRequest("POST", "/v1/chat/completions", 200, duration, userAgent, modelName, true);
            debugLog("Streaming completed, total content length:", fullContent.length);
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim() || !line.startsWith("data: ")) continue;

            const data = line.substring(6).trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              debugLog("Upstream SSE data:", parsed);

              // Dolphin AI returns OpenAI-compatible format
              // Extract content from choices[0].delta.content
              if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta) {
                const delta = parsed.choices[0].delta;
                const content = delta.content || "";
                const finishReason = parsed.choices[0].finish_reason;

                if (content) {
                  fullContent += content;
                }

                // Forward the chunk with original model name
                const chunk = {
                  id: parsed.id || chatID,
                  object: "chat.completion.chunk",
                  created: parsed.created || Math.floor(Date.now() / 1000),
                  model: modelName,
                  choices: [{
                    index: 0,
                    delta: delta,
                    finish_reason: finishReason,
                  }],
                };

                controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));

                // If finish_reason is set, we're done
                if (finishReason === "stop") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  controller.close();
                  const duration = Date.now() - startTime;
                  recordRequest("POST", "/v1/chat/completions", 200, duration, userAgent, modelName, true);
                  debugLog("Streaming completed, total content length:", fullContent.length);
                  return;
                }
              }
            } catch (e) {
              debugLog("Failed to parse SSE line:", line, e);
            }
          }
        }
      } catch (error) {
        debugLog("Stream error:", error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

// Handle non-streaming response
async function handleNonStreamingResponse(
  upstreamResponse: Response,
  modelName: string,
  startTime: number,
  userAgent: string,
): Promise<Response> {
  const reader = upstreamResponse.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullContent = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim() || !line.startsWith("data: ")) continue;

        const data = line.substring(6).trim();
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);
          // Extract content from choices[0].delta.content
          if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta) {
            const content = parsed.choices[0].delta.content || "";
            if (content) {
              fullContent += content;
            }
          }
        } catch (e) {
          debugLog("Failed to parse SSE line:", line, e);
        }
      }
    }

    // Build OpenAI response
    const openAIResponse: OpenAIResponse = {
      id: `chatcmpl-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: modelName,
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
        completion_tokens: fullContent.length,
        total_tokens: fullContent.length,
      },
    };

    const duration = Date.now() - startTime;
    recordRequest("POST", "/v1/chat/completions", 200, duration, userAgent, modelName, false);

    return new Response(JSON.stringify(openAIResponse), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    debugLog("Error in non-streaming response:", error);
    const duration = Date.now() - startTime;
    recordRequest("POST", "/v1/chat/completions", 500, duration, userAgent, modelName, false);

    return new Response(
      JSON.stringify({
        error: {
          message: `Failed to process response: ${error}`,
          type: "internal_error",
        },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// Home page HTML
const homeHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dphn2Api - OpenAI兼容API代理</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
        }
        .animate-delay-1 { animation-delay: 0.1s; animation-fill-mode: both; }
        .animate-delay-2 { animation-delay: 0.2s; animation-fill-mode: both; }
        .animate-delay-3 { animation-delay: 0.3s; animation-fill-mode: both; }
        .animate-delay-4 { animation-delay: 0.4s; animation-fill-mode: both; }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800">
    <div class="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div class="max-w-4xl w-full">
            <!-- Header -->
            <div class="text-center mb-12 animate-fade-in">
                <h1 class="text-6xl font-bold text-white mb-4">
                    <span class="inline-block hover:scale-110 transition-transform cursor-pointer">🐬</span>
                    <span class="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Dphn2Api</span>
                </h1>
                <p class="text-xl text-blue-100 mb-2">OpenAI 兼容 API 代理 for Dolphin AI</p>
                <p class="text-sm text-blue-200/80">让 Dolphin AI 模型无缝接入你的应用</p>
            </div>

            <!-- Status Card -->
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl animate-fade-in animate-delay-1">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="text-center group cursor-default">
                        <div class="text-3xl mb-2 group-hover:scale-125 transition-transform">🟢</div>
                        <div class="text-white/60 text-sm mb-1">状态</div>
                        <div class="text-white font-semibold">运行中</div>
                    </div>
                    <div class="text-center group cursor-default">
                        <div class="text-3xl mb-2 group-hover:scale-125 transition-transform">🤖</div>
                        <div class="text-white/60 text-sm mb-1">模型</div>
                        <div class="text-white font-semibold font-mono text-sm">${MODEL_NAME}</div>
                    </div>
                    <div class="text-center group cursor-default">
                        <div class="text-3xl mb-2 group-hover:scale-125 transition-transform">🔌</div>
                        <div class="text-white/60 text-sm mb-1">端口</div>
                        <div class="text-white font-semibold font-mono">${PORT}</div>
                    </div>
                    <div class="text-center group cursor-default">
                        <div class="text-3xl mb-2 group-hover:scale-125 transition-transform">⚡</div>
                        <div class="text-white/60 text-sm mb-1">运行时</div>
                        <div class="text-white font-semibold">Deno</div>
                    </div>
                </div>
            </div>

            <!-- Features Highlight -->
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl animate-fade-in animate-delay-2">
                <h3 class="text-white text-lg font-bold mb-4 flex items-center">
                    <span class="text-2xl mr-2">✨</span> 核心特性
                </h3>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div class="flex items-start space-x-3">
                        <span class="text-green-400 text-xl">✓</span>
                        <div>
                            <p class="text-white font-semibold">OpenAI 格式兼容</p>
                            <p class="text-blue-200/70 text-xs">无缝接入现有应用</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-green-400 text-xl">✓</span>
                        <div>
                            <p class="text-white font-semibold">流式响应支持</p>
                            <p class="text-blue-200/70 text-xs">实时输出更流畅</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-green-400 text-xl">✓</span>
                        <div>
                            <p class="text-white font-semibold">多模板支持</p>
                            <p class="text-blue-200/70 text-xs">logical / summary / code</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-green-400 text-xl">✓</span>
                        <div>
                            <p class="text-white font-semibold">实时监控面板</p>
                            <p class="text-blue-200/70 text-xs">完整的统计和图表</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Cards -->
            <div class="grid md:grid-cols-4 gap-6 mb-8">
                <a href="/docs" class="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in animate-delay-2">
                    <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">📖</div>
                    <h3 class="text-white text-xl font-bold mb-2">API 文档</h3>
                    <p class="text-blue-100 text-sm">完整的使用文档和代码示例</p>
                </a>

                <a href="/deploy" class="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in animate-delay-3">
                    <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
                    <h3 class="text-white text-xl font-bold mb-2">部署指南</h3>
                    <p class="text-blue-100 text-sm">快速部署到 Deno Deploy</p>
                </a>

                <a href="/dashboard" class="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in animate-delay-4">
                    <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">📊</div>
                    <h3 class="text-white text-xl font-bold mb-2">Dashboard</h3>
                    <p class="text-blue-100 text-sm">实时监控和性能统计分析</p>
                </a>

                <a href="/v1/models" class="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in animate-delay-4">
                    <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
                    <h3 class="text-white text-xl font-bold mb-2">模型列表</h3>
                    <p class="text-blue-100 text-sm">查看所有可用的 AI 模型</p>
                </a>
            </div>

            <!-- Quick Start -->
            <div class="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20 shadow-xl animate-fade-in animate-delay-4">
                <h3 class="text-white text-lg font-bold mb-3 flex items-center">
                    <span class="text-2xl mr-2">🚀</span> 快速开始
                </h3>
                <div class="bg-gray-900/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre class="text-green-300">curl -X POST https://dphn2api.deno.dev/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${DEFAULT_KEY}" \\
  -d '{"model":"${MODEL_NAME}","messages":[{"role":"user","content":"Hello!"}]}'</pre>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center text-white/60 text-sm space-y-3 animate-fade-in animate-delay-4">
                <p>Powered by <span class="font-semibold text-white">Deno 🦕</span> | OpenAI Compatible API</p>
                <div class="flex justify-center items-center gap-6 text-xs">
                    <a href="https://chat.dphn.ai" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors flex items-center gap-1">
                        <span>🐬</span> Dolphin AI
                    </a>
                    <span class="text-white/40">|</span>
                    <a href="https://dphn2api.deno.dev" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors flex items-center gap-1">
                        <span>🚀</span> 在线服务
                    </a>
                    <span class="text-white/40">|</span>
                    <a href="https://linux.do/t/topic/1002983" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors flex items-center gap-1">
                        <span>💬</span> 讨论交流
                    </a>
                    <span class="text-white/40">|</span>
                    <a href="https://github.com/dext7r/ZtoApi/blob/main/deno/dphn/dphn2api.ts" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors flex items-center gap-1">
                        <span>⭐</span> GitHub
                    </a>
                </div>
                <p class="text-white/50 text-xs italic pt-2">欲买桂花同载酒 终不似 少年游</p>
            </div>
        </div>
    </div>
</body>
</html>`;

// API docs HTML
const apiDocsHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Documentation - Dphn2Api</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
                    <span class="text-2xl">🐬</span>
                    <span class="text-xl font-bold">Dphn2Api</span>
                </a>
                <div class="flex space-x-4">
                    <a href="/" class="text-gray-600 hover:text-blue-600 transition">首页</a>
                    <a href="/docs" class="text-blue-600 font-semibold">文档</a>
                    <a href="/deploy" class="text-gray-600 hover:text-blue-600 transition">部署</a>
                    <a href="/dashboard" class="text-gray-600 hover:text-blue-600 transition">Dashboard</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mx-auto px-4 py-8 max-w-5xl">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-3">📖 API Documentation</h1>
            <p class="text-gray-600">OpenAI 兼容的 API 接口文档</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border p-8 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">概述</h2>
            <p class="text-gray-700 mb-4">Dphn2Api 是一个为 Dolphin AI 提供 OpenAI 兼容 API 接口的代理服务器。</p>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-sm text-gray-600 mb-2">基础 URL</p>
                <code class="text-blue-700 font-mono text-lg">https://dphn2api.deno.dev/v1</code>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border p-8 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">🔐 身份验证</h2>
            <p class="text-gray-700 mb-4">所有 API 请求都需要在请求头中包含 Bearer Token：</p>
            <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code class="text-green-400 font-mono text-sm">Authorization: Bearer ${DEFAULT_KEY}</code>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border p-8 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">🔌 API 端点</h2>

            <div class="mb-8">
                <div class="flex items-center space-x-3 mb-3">
                    <span class="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold text-sm">GET</span>
                    <code class="text-lg font-mono text-gray-800">/v1/models</code>
                </div>
                <p class="text-gray-700 mb-3">获取可用模型列表</p>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre class="text-green-400 font-mono text-sm">curl https://dphn2api.deno.dev/v1/models \\
  -H "Authorization: Bearer ${DEFAULT_KEY}"</pre>
                </div>
            </div>

            <div>
                <div class="flex items-center space-x-3 mb-3">
                    <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold text-sm">POST</span>
                    <code class="text-lg font-mono text-gray-800">/v1/chat/completions</code>
                </div>
                <p class="text-gray-700 mb-4">创建聊天完成（支持流式和非流式）</p>

                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 class="font-semibold text-gray-900 mb-3">请求参数</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex items-start">
                            <code class="bg-white px-2 py-1 rounded mr-3 text-blue-600 font-mono">model</code>
                            <span class="text-gray-600">string, 必需 - 模型名称 (如 "${MODEL_NAME}")</span>
                        </div>
                        <div class="flex items-start">
                            <code class="bg-white px-2 py-1 rounded mr-3 text-blue-600 font-mono">messages</code>
                            <span class="text-gray-600">array, 必需 - 消息列表</span>
                        </div>
                        <div class="flex items-start">
                            <code class="bg-white px-2 py-1 rounded mr-3 text-blue-600 font-mono">stream</code>
                            <span class="text-gray-600">boolean, 可选 - 是否流式响应（默认: ${DEFAULT_STREAM}）</span>
                        </div>
                    </div>
                </div>

                <h4 class="font-semibold text-gray-900 mb-3">请求示例</h4>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                    <pre class="text-green-400 font-mono text-sm">curl -X POST https://dphn2api.deno.dev/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${DEFAULT_KEY}" \\
  -d '{
    "model": "${MODEL_NAME}",
    "messages": [
      {"role": "user", "content": "你好"}
    ],
    "stream": false
  }'</pre>
                </div>

                <h4 class="font-semibold text-gray-900 mb-3">模板类型</h4>
                <p class="text-gray-700 mb-3">Dolphin AI 支持以下模板类型（通过环境变量 DPHN_DEFAULT_TEMPLATE 配置）：</p>
                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="bg-blue-50 border border-blue-200 rounded p-3">
                        <code class="text-blue-700 font-mono text-sm">logical</code>
                        <p class="text-xs text-gray-600 mt-1">逻辑推理（默认）</p>
                    </div>
                    <div class="bg-blue-50 border border-blue-200 rounded p-3">
                        <code class="text-blue-700 font-mono text-sm">summary</code>
                        <p class="text-xs text-gray-600 mt-1">内容总结</p>
                    </div>
                    <div class="bg-blue-50 border border-blue-200 rounded p-3">
                        <code class="text-blue-700 font-mono text-sm">code-beginner</code>
                        <p class="text-xs text-gray-600 mt-1">代码入门</p>
                    </div>
                    <div class="bg-blue-50 border border-blue-200 rounded p-3">
                        <code class="text-blue-700 font-mono text-sm">code-advanced</code>
                        <p class="text-xs text-gray-600 mt-1">高级编程</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">💡 集成示例</h2>

            <h3 class="text-lg font-semibold text-gray-800 mb-3">Python (OpenAI SDK)</h3>
            <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6">
                <pre class="text-green-400 font-mono text-sm">from openai import OpenAI

client = OpenAI(
    api_key="${DEFAULT_KEY}",
    base_url="https://dphn2api.deno.dev/v1"
)

response = client.chat.completions.create(
    model="${MODEL_NAME}",
    messages=[{"role": "user", "content": "Hello!"}]
)

print(response.choices[0].message.content)</pre>
            </div>

            <h3 class="text-lg font-semibold text-gray-800 mb-3">JavaScript (Node.js)</h3>
            <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 font-mono text-sm">import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: '${DEFAULT_KEY}',
  baseURL: 'https://dphn2api.deno.dev/v1'
});

const response = await client.chat.completions.create({
  model: '${MODEL_NAME}',
  messages: [{ role: 'user', content: 'Hello!' }]
});

console.log(response.choices[0].message.content);</pre>
            </div>
        </div>
    </div>

    <footer class="bg-white border-t mt-12 py-6">
        <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>Powered by <span class="font-semibold">Deno 🦕</span> | <a href="/" class="text-blue-600 hover:underline">返回首页</a> | <a href="https://github.com/dext7r/ZtoApi/blob/main/deno/dphn/dphn2api.ts" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">⭐ GitHub</a></p>
        </div>
    </footer>
</body>
</html>`;

// Dashboard HTML
const dashboardHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Dphn2Api</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
                    <span class="text-2xl">🐬</span>
                    <span class="text-xl font-bold">Dphn2Api</span>
                </a>
                <div class="flex space-x-4">
                    <a href="/" class="text-gray-600 hover:text-blue-600 transition">首页</a>
                    <a href="/docs" class="text-gray-600 hover:text-blue-600 transition">文档</a>
                    <a href="/deploy" class="text-gray-600 hover:text-blue-600 transition">部署</a>
                    <a href="/dashboard" class="text-blue-600 font-semibold">Dashboard</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mx-auto px-4 py-8 max-w-7xl">
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-3">📊 Dashboard</h1>
            <p class="text-gray-600">实时监控 API 请求和性能统计</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">总请求数</p>
                        <p class="text-3xl font-bold text-gray-900" id="total">0</p>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-lg">
                        <span class="text-3xl">📈</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">成功请求</p>
                        <p class="text-3xl font-bold text-green-600" id="success">0</p>
                    </div>
                    <div class="bg-green-100 p-3 rounded-lg">
                        <span class="text-3xl">✅</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">失败请求</p>
                        <p class="text-3xl font-bold text-red-600" id="failed">0</p>
                    </div>
                    <div class="bg-red-100 p-3 rounded-lg">
                        <span class="text-3xl">❌</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">平均响应时间</p>
                        <p class="text-3xl font-bold text-cyan-600" id="avgtime">0ms</p>
                    </div>
                    <div class="bg-cyan-100 p-3 rounded-lg">
                        <span class="text-3xl">⚡</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">API 调用</p>
                        <p class="text-3xl font-bold text-indigo-600" id="apicalls">0</p>
                    </div>
                    <div class="bg-indigo-100 p-3 rounded-lg">
                        <span class="text-3xl">🔌</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detailed Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <!-- API Stats -->
            <div class="bg-white rounded-xl shadow-sm border p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span class="text-2xl mr-2">🎯</span> API 统计
                </h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">Chat Completions</span>
                        <span class="font-bold text-blue-600" id="api-calls">0</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">Models 查询</span>
                        <span class="font-bold text-blue-600" id="models-calls">0</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">流式请求</span>
                        <span class="font-bold text-cyan-600" id="streaming">0</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">非流式请求</span>
                        <span class="font-bold text-cyan-600" id="non-streaming">0</span>
                    </div>
                </div>
            </div>

            <!-- Performance Stats -->
            <div class="bg-white rounded-xl shadow-sm border p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span class="text-2xl mr-2">⚡</span> 性能指标
                </h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">平均响应</span>
                        <span class="font-bold text-cyan-600" id="avg-time-detail">0ms</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">最快响应</span>
                        <span class="font-bold text-green-600" id="fastest">0ms</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">最慢响应</span>
                        <span class="font-bold text-orange-600" id="slowest">0ms</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">成功率</span>
                        <span class="font-bold text-green-600" id="success-rate">0%</span>
                    </div>
                </div>
            </div>

            <!-- System Info -->
            <div class="bg-white rounded-xl shadow-sm border p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span class="text-2xl mr-2">📊</span> 系统信息
                </h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">运行时长</span>
                        <span class="font-bold text-indigo-600" id="uptime">0</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">最后请求</span>
                        <span class="font-bold text-gray-600 text-xs" id="last-request">-</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">流式/非流式</span>
                        <span class="font-bold text-indigo-600 text-xs" id="stream-ratio">0/0</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">Models 调用</span>
                        <span class="font-bold text-indigo-600" id="models-count">0</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- History Charts -->
        <div class="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span class="text-2xl mr-2">📈</span> 历史趋势（最近1小时）
            </h3>
            <div id="history-chart" style="width: 100%; height: 400px;"></div>
        </div>

        <!-- Top Models Card -->
        <div class="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span class="text-2xl mr-2">🏆</span> 热门模型 Top 3
            </h3>
            <div id="top-models" class="space-y-3">
                <p class="text-gray-500 text-sm">暂无数据</p>
            </div>
        </div>

        <!-- Requests Table -->
        <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-gray-900">🔔 实时请求</h2>
                <span class="text-sm text-gray-500">自动刷新（每5秒）</span>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left py-3 px-4 text-gray-700 font-semibold">时间</th>
                            <th class="text-left py-3 px-4 text-gray-700 font-semibold">方法</th>
                            <th class="text-left py-3 px-4 text-gray-700 font-semibold">路径</th>
                            <th class="text-left py-3 px-4 text-gray-700 font-semibold">模型</th>
                            <th class="text-left py-3 px-4 text-gray-700 font-semibold">状态</th>
                            <th class="text-left py-3 px-4 text-gray-700 font-semibold">耗时</th>
                        </tr>
                    </thead>
                    <tbody id="requests" class="divide-y"></tbody>
                </table>
            </div>
            <div id="empty" class="text-center py-8 text-gray-500 hidden">
                暂无请求记录
            </div>
            <!-- Pagination -->
            <div id="pagination" class="mt-4 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="text-sm text-gray-600">
                        共 <span id="total-requests">0</span> 条记录，第 <span id="current-page">1</span> / <span id="total-pages">1</span> 页
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-600">每页:</span>
                        <select id="page-size" class="px-2 py-1 border rounded text-sm">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20" selected>20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button id="prev-page" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed">上一页</button>
                    <button id="next-page" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed">下一页</button>
                </div>
            </div>
        </div>
    </div>

    <footer class="bg-white border-t mt-12 py-6">
        <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>Powered by <span class="font-semibold">Deno 🦕</span> | <a href="/" class="text-blue-600 hover:underline">返回首页</a> | <a href="https://github.com/dext7r/ZtoApi/blob/main/deno/dphn/dphn2api.ts" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">⭐ GitHub</a></p>
        </div>
    </footer>

    <!-- ECharts CDN -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>

    <script>
        let currentPage = 1;
        let pageSize = 20;
        let historyChart = null;

        // 初始化 ECharts
        function initChart() {
            const chartDom = document.getElementById('history-chart');
            historyChart = echarts.init(chartDom);

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: ['总请求数', '成功率(%)', '平均响应时间(ms)']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '请求数 / 成功率',
                        position: 'left'
                    },
                    {
                        type: 'value',
                        name: '响应时间(ms)',
                        position: 'right'
                    }
                ],
                series: [
                    {
                        name: '总请求数',
                        type: 'line',
                        data: [],
                        smooth: true,
                        itemStyle: { color: '#3b82f6' }
                    },
                    {
                        name: '成功率(%)',
                        type: 'line',
                        data: [],
                        smooth: true,
                        itemStyle: { color: '#10b981' }
                    },
                    {
                        name: '平均响应时间(ms)',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [],
                        smooth: true,
                        itemStyle: { color: '#f59e0b' }
                    }
                ]
            };

            historyChart.setOption(option);
        }

        // 更新历史数据图表
        async function updateChart() {
            try {
                const res = await fetch('/dashboard/history');
                const data = await res.json();

                if (!data.data || data.data.length === 0) {
                    return;
                }

                const timestamps = data.data.map(p => {
                    const d = new Date(p.timestamp);
                    return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
                });
                const totalRequests = data.data.map(p => p.totalRequests);
                const successRates = data.data.map(p => p.successRate.toFixed(1));
                const avgTimes = data.data.map(p => Math.round(p.avgResponseTime));

                historyChart.setOption({
                    xAxis: {
                        data: timestamps
                    },
                    series: [
                        { data: totalRequests },
                        { data: successRates },
                        { data: avgTimes }
                    ]
                });
            } catch (error) {
                console.error('Error updating chart:', error);
            }
        }

        async function update() {
            try {
                const statsRes = await fetch('/dashboard/stats');
                const stats = await statsRes.json();

                // Top cards
                document.getElementById('total').textContent = stats.totalRequests;
                document.getElementById('success').textContent = stats.successfulRequests;
                document.getElementById('failed').textContent = stats.failedRequests;
                document.getElementById('avgtime').textContent = Math.round(stats.averageResponseTime) + 'ms';
                document.getElementById('apicalls').textContent = stats.apiCallsCount;

                // API Stats
                document.getElementById('api-calls').textContent = stats.apiCallsCount || 0;
                document.getElementById('models-calls').textContent = stats.modelsCallsCount || 0;
                document.getElementById('streaming').textContent = stats.streamingRequests || 0;
                document.getElementById('non-streaming').textContent = stats.nonStreamingRequests || 0;

                // Performance Stats
                document.getElementById('avg-time-detail').textContent = Math.round(stats.averageResponseTime) + 'ms';
                document.getElementById('fastest').textContent = stats.fastestResponse === Infinity ? '-' : Math.round(stats.fastestResponse) + 'ms';
                document.getElementById('slowest').textContent = stats.slowestResponse === 0 ? '-' : Math.round(stats.slowestResponse) + 'ms';
                const successRate = stats.totalRequests > 0 ? ((stats.successfulRequests / stats.totalRequests) * 100).toFixed(1) : '0';
                document.getElementById('success-rate').textContent = successRate + '%';

                // System Info
                const uptime = Date.now() - new Date(stats.startTime).getTime();
                const hours = Math.floor(uptime / 3600000);
                const minutes = Math.floor((uptime % 3600000) / 60000);
                document.getElementById('uptime').textContent = hours + 'h ' + minutes + 'm';
                document.getElementById('last-request').textContent = stats.lastRequestTime ? new Date(stats.lastRequestTime).toLocaleTimeString() : '-';
                document.getElementById('stream-ratio').textContent = stats.streamingRequests + '/' + stats.nonStreamingRequests;
                document.getElementById('models-count').textContent = stats.modelsCallsCount;

                // Top Models
                const topModelsDiv = document.getElementById('top-models');
                if (stats.topModels && stats.topModels.length > 0) {
                    topModelsDiv.innerHTML = stats.topModels.map((m, i) => \`
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="text-lg">\${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                                <span class="font-mono text-sm text-gray-700">\${m.model}</span>
                            </div>
                            <span class="font-bold text-blue-600">\${m.count}</span>
                        </div>
                    \`).join('');
                } else {
                    topModelsDiv.innerHTML = '<p class="text-gray-500 text-sm">暂无数据</p>';
                }

                // Fetch paginated requests
                const reqsRes = await fetch(\`/dashboard/requests?page=\${currentPage}&pageSize=\${pageSize}\`);
                const data = await reqsRes.json();
                const tbody = document.getElementById('requests');
                const empty = document.getElementById('empty');

                tbody.innerHTML = '';

                if (data.requests.length === 0) {
                    empty.classList.remove('hidden');
                } else {
                    empty.classList.add('hidden');
                    data.requests.forEach(r => {
                        const row = tbody.insertRow();
                        const time = new Date(r.timestamp).toLocaleTimeString();
                        const statusClass = r.status >= 200 && r.status < 300 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
                        const methodClass = r.method === 'GET' ? 'bg-green-100 text-green-700' : r.method === 'POST' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700';
                        const modelDisplay = r.model ? r.model : '-';

                        row.innerHTML = \`
                            <td class="py-3 px-4 text-gray-700">\${time}</td>
                            <td class="py-3 px-4"><span class="\${methodClass} px-2 py-1 rounded text-sm font-mono">\${r.method}</span></td>
                            <td class="py-3 px-4 font-mono text-sm text-gray-600">\${r.path}</td>
                            <td class="py-3 px-4 font-mono text-xs text-gray-600">\${modelDisplay}</td>
                            <td class="py-3 px-4"><span class="\${statusClass} px-2 py-1 rounded font-semibold text-sm">\${r.status}</span></td>
                            <td class="py-3 px-4 text-gray-700">\${r.duration}ms</td>
                        \`;
                    });

                    // Update pagination info
                    document.getElementById('total-requests').textContent = data.total;
                    document.getElementById('current-page').textContent = data.page;
                    document.getElementById('total-pages').textContent = data.totalPages;

                    // Enable/disable pagination buttons
                    document.getElementById('prev-page').disabled = data.page <= 1;
                    document.getElementById('next-page').disabled = data.page >= data.totalPages;
                }

                // 更新图表
                if (historyChart) {
                    updateChart();
                }
            } catch (e) {
                console.error('Update error:', e);
            }
        }

        // 页面加载时初始化
        window.addEventListener('DOMContentLoaded', () => {
            initChart();
            update();
            setInterval(update, 5000);
        });

        // Pagination handlers
        document.getElementById('prev-page').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                update();
            }
        });

        document.getElementById('next-page').addEventListener('click', () => {
            currentPage++;
            update();
        });

        // Page size handler
        document.getElementById('page-size').addEventListener('change', (e) => {
            pageSize = parseInt(e.target.value);
            currentPage = 1; // Reset to first page
            update();
        });
    </script>
</body>
</html>`;

// Deploy guide HTML
const deployHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>部署指南 - Dphn2Api</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
                    <span class="text-2xl">🐬</span>
                    <span class="text-xl font-bold">Dphn2Api</span>
                </a>
                <div class="flex space-x-4">
                    <a href="/" class="text-gray-600 hover:text-blue-600 transition">首页</a>
                    <a href="/docs" class="text-gray-600 hover:text-blue-600 transition">文档</a>
                    <a href="/deploy" class="text-blue-600 font-semibold">部署</a>
                    <a href="/dashboard" class="text-gray-600 hover:text-blue-600 transition">Dashboard</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mx-auto px-4 py-8 max-w-5xl">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-3">🚀 Deno Deploy 部署指南</h1>
            <p class="text-gray-600">快速部署到 Deno Deploy 平台</p>
        </div>

        <!-- Current Deployment -->
        <div class="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 mb-8 text-white">
            <div class="flex items-center space-x-4 mb-4">
                <span class="text-4xl">🌐</span>
                <div>
                    <h2 class="text-2xl font-bold mb-2">当前部署地址</h2>
                    <a href="https://dphn2api.deno.dev" target="_blank" class="text-white/90 hover:text-white underline text-lg font-mono">
                        https://dphn2api.deno.dev
                    </a>
                </div>
            </div>
            <p class="text-white/80">✅ 已部署并运行中</p>
        </div>

        <!-- Quick Start -->
        <div class="bg-white rounded-xl shadow-sm border p-8 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span class="mr-3">⚡</span> 快速开始
            </h2>
            <div class="space-y-4">
                <div class="flex items-start">
                    <span class="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</span>
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900 mb-2">创建 dphn2api.ts 文件</h3>
                        <p class="text-gray-600">复制完整的 dphn2api.ts 代码到你的项目</p>
                    </div>
                </div>

                <div class="flex items-start">
                    <span class="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</span>
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900 mb-2">登录 Deno Deploy</h3>
                        <p class="text-gray-600 mb-2">访问 <a href="https://dash.deno.com" target="_blank" class="text-blue-600 hover:underline">Deno Deploy</a> 并使用 GitHub 账号登录</p>
                    </div>
                </div>

                <div class="flex items-start">
                    <span class="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</span>
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900 mb-2">创建新项目</h3>
                        <p class="text-gray-600">点击 "New Project"，选择你的仓库，入口文件选择 <code class="bg-gray-100 px-2 py-1 rounded font-mono text-sm">dphn2api.ts</code></p>
                    </div>
                </div>

                <div class="flex items-start">
                    <span class="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</span>
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900 mb-2">配置环境变量</h3>
                        <p class="text-gray-600">在项目设置中添加环境变量（见下方说明）</p>
                    </div>
                </div>

                <div class="flex items-start">
                    <span class="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">5</span>
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900 mb-2">部署完成！</h3>
                        <p class="text-gray-600">Deno Deploy 会自动部署，几秒钟后即可访问</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Environment Variables -->
        <div class="bg-white rounded-xl shadow-sm border p-8 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span class="mr-3">🔐</span> 环境变量配置
            </h2>

            <div class="space-y-6">
                <!-- DEFAULT_KEY -->
                <div class="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-lg">
                    <h3 class="font-bold text-gray-900 mb-2 flex items-center">
                        <code class="bg-blue-100 px-2 py-1 rounded mr-2 text-sm">DPHN_DEFAULT_KEY</code>
                        <span class="text-blue-600 text-sm">(推荐设置)</span>
                    </h3>
                    <p class="text-gray-700 mb-2">客户端调用 API 时需要的密钥。</p>
                    <div class="bg-white rounded p-3">
                        <p class="text-sm text-gray-600 mb-1">默认值：<code class="bg-gray-100 px-2 py-1 rounded font-mono">sk-dphn-key</code></p>
                        <p class="text-sm text-blue-700">🔒 建议设置为复杂的随机字符串，例如：<code class="bg-gray-100 px-2 py-1 rounded font-mono text-xs">sk-1a2b3c4d5e6f...</code></p>
                    </div>
                </div>

                <!-- Other Variables -->
                <div class="border-l-4 border-gray-400 bg-gray-50 p-4 rounded-r-lg">
                    <h3 class="font-bold text-gray-900 mb-3">其他可选变量</h3>
                    <div class="space-y-2 text-sm">
                        <div class="bg-white rounded p-2">
                            <code class="text-blue-600 font-mono">DPHN_MODEL_NAME</code>
                            <span class="text-gray-600 ml-2">- 模型显示名称（默认：Dolphin 24B）</span>
                        </div>
                        <div class="bg-white rounded p-2">
                            <code class="text-blue-600 font-mono">DPHN_DEFAULT_TEMPLATE</code>
                            <span class="text-gray-600 ml-2">- 默认模板（默认：logical）</span>
                        </div>
                        <div class="bg-white rounded p-2">
                            <code class="text-blue-600 font-mono">DPHN_DEBUG_MODE</code>
                            <span class="text-gray-600 ml-2">- 调试模式（默认：false，生产环境建议关闭）</span>
                        </div>
                        <div class="bg-white rounded p-2">
                            <code class="text-blue-600 font-mono">DPHN_DEFAULT_STREAM</code>
                            <span class="text-gray-600 ml-2">- 默认流式响应（默认：true）</span>
                        </div>
                        <div class="bg-white rounded p-2">
                            <code class="text-blue-600 font-mono">DPHN_DASHBOARD_ENABLED</code>
                            <span class="text-gray-600 ml-2">- 启用 Dashboard（默认：true）</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Usage Example -->
        <div class="bg-white rounded-xl shadow-sm border p-8 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span class="mr-3">💻</span> 使用示例
            </h2>

            <p class="text-gray-700 mb-4">部署完成后，使用以下代码调用 API：</p>

            <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                <pre class="text-green-400 font-mono text-sm">from openai import OpenAI

client = OpenAI(
    api_key="${DEFAULT_KEY}",
    base_url="https://dphn2api.deno.dev/v1"
)

response = client.chat.completions.create(
    model="${MODEL_NAME}",
    messages=[{"role": "user", "content": "你好"}]
)

print(response.choices[0].message.content)</pre>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-sm text-blue-800">
                    <strong>提示：</strong> 确保使用你在环境变量中设置的 <code class="bg-white px-2 py-1 rounded">DPHN_DEFAULT_KEY</code> 作为 api_key
                </p>
            </div>
        </div>

        <!-- Tips -->
        <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-6">
            <h3 class="font-bold text-gray-900 mb-3 flex items-center">
                <span class="text-2xl mr-2">💡</span> 小贴士
            </h3>
            <ul class="space-y-2 text-gray-700">
                <li class="flex items-start">
                    <span class="text-green-600 mr-2">✓</span>
                    <span>Deno Deploy 提供免费额度，适合个人使用</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-600 mr-2">✓</span>
                    <span>每次 git push 后会自动重新部署</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-600 mr-2">✓</span>
                    <span>支持自定义域名（在项目设置中配置）</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-600 mr-2">✓</span>
                    <span>生产环境建议关闭 DEBUG_MODE 以减少日志输出</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-600 mr-2">✓</span>
                    <span>可在 Deno Deploy 控制台查看实时日志和监控</span>
                </li>
            </ul>
        </div>

        <!-- Actions -->
        <div class="flex justify-center space-x-4">
            <a href="https://dash.deno.com/new" target="_blank" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition">
                立即部署到 Deno Deploy
            </a>
            <a href="/" class="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg transition">
                返回首页
            </a>
        </div>
    </div>

    <footer class="bg-white border-t mt-12 py-6">
        <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>Powered by <span class="font-semibold">Deno 🦕</span> | <a href="/" class="text-blue-600 hover:underline">返回首页</a> | <a href="https://github.com/dext7r/ZtoApi/blob/main/deno/dphn/dphn2api.ts" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">⭐ GitHub</a></p>
        </div>
    </footer>
</body>
</html>`;

// Main request handler
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  debugLog(`${req.method} ${path}`);

  // CORS headers
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Home page
  if (path === "/") {
    return new Response(homeHTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // API docs
  if (path === "/docs") {
    return new Response(apiDocsHTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Deploy guide
  if (path === "/deploy") {
    return new Response(deployHTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Dashboard
  if (DASHBOARD_ENABLED && path === "/dashboard") {
    return new Response(dashboardHTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (DASHBOARD_ENABLED && path === "/dashboard/stats") {
    // Calculate top models
    const topModels = Array.from(stats.modelUsage.entries())
      .map(([model, count]) => ({ model, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return new Response(JSON.stringify({
      totalRequests: stats.totalRequests,
      successfulRequests: stats.successfulRequests,
      failedRequests: stats.failedRequests,
      averageResponseTime: stats.averageResponseTime,
      apiCallsCount: stats.apiCallsCount,
      modelsCallsCount: stats.modelsCallsCount,
      streamingRequests: stats.streamingRequests,
      nonStreamingRequests: stats.nonStreamingRequests,
      startTime: stats.startTime.toISOString(),
      lastRequestTime: stats.lastRequestTime.toISOString(),
      fastestResponse: stats.fastestResponse,
      slowestResponse: stats.slowestResponse,
      topModels: topModels,
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (DASHBOARD_ENABLED && path === "/dashboard/history") {
    return new Response(JSON.stringify({
      data: historyData.map(point => ({
        timestamp: point.timestamp.toISOString(),
        totalRequests: point.totalRequests,
        successRate: point.successRate,
        avgResponseTime: point.avgResponseTime,
      }))
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (DASHBOARD_ENABLED && path === "/dashboard/requests") {
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");
    const allRequests = liveRequests.slice().reverse(); // Most recent first
    const total = allRequests.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const requests = allRequests.slice(start, end);

    return new Response(JSON.stringify({
      requests,
      page,
      pageSize,
      total,
      totalPages,
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // API endpoints
  if (path === "/v1/models") {
    return await handleModels(req);
  }

  if (path === "/v1/chat/completions") {
    return await handleChatCompletions(req);
  }

  // 404
  return new Response("Not Found", { status: 404 });
}

// Start server
console.log(`🐬 Dolphin API Proxy starting...`);
console.log(`📍 Upstream: ${UPSTREAM_URL}`);
console.log(`🔑 API Key: ${DEFAULT_KEY}`);
console.log(`🎯 Model: ${MODEL_NAME}`);
console.log(`📋 Template: ${DEFAULT_TEMPLATE}`);
console.log(`🌊 Stream: ${DEFAULT_STREAM ? "enabled" : "disabled"}`);
console.log(`📊 Dashboard: ${DASHBOARD_ENABLED ? "enabled" : "disabled"}`);

Deno.serve({ port: PORT }, handler);
console.log(`🚀 Server running on http://localhost:${PORT}`);
