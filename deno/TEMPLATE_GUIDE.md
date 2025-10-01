# 使用通用模板快速创建新的 API 代理

本指南展示如何使用 `deno/template` 快速创建新的 OpenAI 兼容 API 代理。

## 模板结构

```
deno/template/              # 通用模板
├── lib/
│   ├── types.ts           # 通用类型定义
│   ├── utils.ts           # 工具函数（浏览器指纹、统计等）
│   └── pages.ts           # 页面生成器（首页、监控）
├── pages/
│   └── docs-deploy.ts     # 文档和部署页面
├── main.ts                # 主程序模板（需要定制）
├── deno.json              # Deno 配置
├── .env.example           # 环境变量示例
├── start.sh               # 启动脚本
└── README.md              # 详细文档
```

## 成功案例

### 1. ZtoApi (Z.ai GLM-4.5)
**位置**: `deno/ztoapi/`

**特点**:
- 匿名 token 系统
- Thinking 模式支持
- 复杂的 SSE 解析
- 特殊的浏览器指纹（X-FE-Version header）

### 2. Dphn2Api (Dolphin AI)
**位置**: `deno/dphn/`

**特点**:
- 多模板支持 (logical/summary/code)
- System 消息转换
- 简单的 OpenAI 格式对接
- 自定义模型映射

## 快速开始步骤

### 步骤 1: 复制模板

```bash
cd deno
cp -r template my-new-service
cd my-new-service
```

### 步骤 2: 配置基本信息

编辑 `.env` 文件：

```bash
cp .env.example .env
```

```env
SERVICE_NAME=MyService
SERVICE_EMOJI=🎯
UPSTREAM_URL=https://api.myservice.com/chat
MODEL_NAME=my-model-1.0
DEFAULT_KEY=sk-my-key
FOOTER_TEXT=欲买桂花同载酒 终不似 少年游
DISCUSSION_URL=https://github.com/your-repo/discussions
```

### 步骤 3: 实现核心转换函数

编辑 `main.ts`，实现以下关键函数：

#### 3.1 请求转换

```typescript
function transformToUpstream(openAIReq: OpenAIRequest): unknown {
  // 根据上游 API 文档实现
  return {
    messages: openAIReq.messages,
    model: "upstream-model-id",
    // 添加上游需要的其他字段
    temperature: 0.7,
    max_tokens: 2000,
  };
}
```

#### 3.2 响应转换

```typescript
function transformFromUpstream(upstreamData: any, requestId: string): any {
  // 从上游响应中提取内容
  return {
    id: requestId,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: CONFIG.modelName,
    choices: [{
      index: 0,
      message: {
        role: "assistant",
        content: upstreamData.reply || upstreamData.content || "",
      },
      finish_reason: "stop",
    }],
    usage: {
      prompt_tokens: upstreamData.usage?.prompt || 0,
      completion_tokens: upstreamData.usage?.completion || 0,
      total_tokens: upstreamData.usage?.total || 0,
    },
  };
}
```

#### 3.3 消息预处理（可选）

```typescript
function transformMessages(messages: Message[]): Message[] {
  // 示例：转换 system 消息
  return messages.map(msg => {
    if (msg.role === "system") {
      return {
        role: "user",
        content: `[System Instructions]: ${msg.content}`,
      };
    }
    return msg;
  });
}
```

#### 3.4 自定义请求头（可选）

```typescript
function getUpstreamHeaders(authToken?: string): Record<string, string> {
  const origin = new URL(CONFIG.upstreamUrl).origin;
  const headers = generateBrowserHeaders(origin);

  // 添加服务特定的 header
  headers["X-API-Key"] = "your-api-key";
  headers["X-Custom-Header"] = "custom-value";

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
}
```

### 步骤 4: 处理流式响应（如果上游支持）

如果上游 API 使用 SSE，你需要在 `handleStreamingResponse` 中解析：

```typescript
// 在 handleStreamingResponse 的 for 循环中
const parsed = parseSSELine(line);
if (!parsed) continue;

// 根据上游 SSE 格式提取内容
const content = parsed.delta?.content || parsed.content || "";
const finishReason = parsed.finish_reason || null;

const chunk = {
  id: requestId,
  object: "chat.completion.chunk",
  created: Math.floor(Date.now() / 1000),
  model: CONFIG.modelName,
  choices: [{
    index: 0,
    delta: { content },
    finish_reason: finishReason,
  }],
};
```

### 步骤 5: 测试

```bash
# 启动服务
deno task dev

# 测试模型列表
curl http://localhost:9090/v1/models \
  -H "Authorization: Bearer sk-my-key"

# 测试聊天（非流式）
curl -X POST http://localhost:9090/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-my-key" \
  -d '{"model":"my-model-1.0","messages":[{"role":"user","content":"Hello"}],"stream":false}'

# 测试聊天（流式）
curl -N -X POST http://localhost:9090/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-my-key" \
  -d '{"model":"my-model-1.0","messages":[{"role":"user","content":"Hello"}],"stream":true}'
```

## 常见定制场景

### 场景 1: 添加认证 Token

```typescript
function getUpstreamHeaders(authToken?: string): Record<string, string> {
  const headers = generateBrowserHeaders(origin);

  // 方式 1: 从环境变量获取
  const apiKey = Deno.env.get("UPSTREAM_API_KEY");
  headers["Authorization"] = `Bearer ${apiKey}`;

  // 方式 2: 动态获取（如匿名 token）
  const token = await fetchAnonymousToken();
  headers["Authorization"] = `Bearer ${token}`;

  return headers;
}
```

### 场景 2: 多模型支持

```typescript
function mapModelName(openAIModel: string): string {
  const modelMap: Record<string, string> = {
    "gpt-4": "my-service-v4",
    "gpt-3.5-turbo": "my-service-v3",
  };
  return modelMap[openAIModel] || "default-model";
}

function transformToUpstream(openAIReq: OpenAIRequest): unknown {
  return {
    model: mapModelName(openAIReq.model),
    messages: openAIReq.messages,
  };
}
```

### 场景 3: 错误处理

```typescript
function transformFromUpstream(upstreamData: any, requestId: string): any {
  // 检查上游错误
  if (upstreamData.error) {
    throw new Error(upstreamData.error.message);
  }

  // 正常响应处理
  return { /* ... */ };
}
```

### 场景 4: 添加自定义统计

```typescript
// 在 RequestStats 类型中添加字段
interface CustomStats extends RequestStats {
  customMetric: number;
}

// 在处理函数中更新
stats.customMetric = (stats.customMetric || 0) + 1;
```

## 调试技巧

1. **启用调试模式**:
   ```bash
   DEBUG_MODE=true deno task dev
   ```

2. **查看请求/响应**:
   ```typescript
   debugLog(CONFIG.debugMode, "OpenAI Request:", openAIReq);
   debugLog(CONFIG.debugMode, "Upstream Request:", upstreamReq);
   debugLog(CONFIG.debugMode, "Upstream Response:", upstreamData);
   ```

3. **监控面板**:
   访问 http://localhost:9090/dashboard 查看实时统计

## 部署

### Deno Deploy

```bash
deployctl deploy --project=my-service main.ts
```

### Docker

```dockerfile
FROM denoland/deno:alpine
WORKDIR /app
COPY . .
RUN deno cache main.ts
CMD ["deno", "run", "--allow-net", "--allow-env", "main.ts"]
```

## 文件清单

创建新服务后，你应该有：

- ✅ `main.ts` - 已定制的主程序
- ✅ `.env` - 配置文件
- ✅ `deno.json` - Deno 配置
- ✅ `start.sh` - 启动脚本
- ✅ `lib/` - 通用库（无需修改）
- ✅ `pages/` - 页面模板（无需修改）

## 获取帮助

查看模板 README.md 获取完整文档：
- 环境变量说明
- 核心模块详解
- API 参考
- FAQ

## 示例：最小化实现

如果上游 API 完全兼容 OpenAI 格式，你只需：

```typescript
// main.ts 中只需修改配置
const CONFIG: ProxyConfig = {
  upstreamUrl: "https://compatible-api.com/v1/chat/completions",
  // ... 其他配置
};

// 其他函数使用默认实现即可！
```

就这么简单！🎉
