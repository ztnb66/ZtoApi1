# OpenAI-Compatible API Proxy Template

🤖 通用的 OpenAI 兼容 API 代理模板，可快速适配各种 AI 服务

## 特性

- ✅ 完整的 TypeScript 类型支持
- ✅ 模块化设计，易于定制
- ✅ 内置统计和监控面板
- ✅ 支持流式和非流式响应
- ✅ 随机浏览器指纹，防检测
- ✅ 精美的 Tailwind CSS 界面
- ✅ 四个预制页面（首页/文档/部署/监控）
- ✅ 一键部署到 Deno Deploy

## 目录结构

```
template/
├── main.ts                    # 主程序（需要定制）
├── deno.json                  # Deno 配置
├── .env.example               # 环境变量模板
├── lib/
│   ├── types.ts               # 通用类型定义
│   ├── utils.ts               # 工具函数集合
│   └── pages.ts               # 页面生成器（首页/监控）
└── pages/
    └── docs-deploy.ts         # 文档和部署页面
```

## 快速开始

### 1. 复制模板

```bash
# 为你的服务创建新目录
cp -r template my-service

cd my-service
```

### 2. 配置环境变量

```bash
cp .env.example .env

# 编辑 .env 文件，设置你的配置
```

### 3. 定制主程序

编辑 `main.ts`，根据你的上游 API 实现以下函数：

```typescript
// 1. 配置基本信息
const CONFIG: ProxyConfig = {
  serviceName: "你的服务名称",
  serviceEmoji: "🐬",
  upstreamUrl: "https://your-upstream-api.com/chat",
  // ... 其他配置
};

// 2. 请求转换（OpenAI 格式 -> 上游格式）
function transformToUpstream(openAIReq: OpenAIRequest): unknown {
  return {
    messages: openAIReq.messages,
    // 添加上游 API 需要的字段
  };
}

// 3. 响应转换（上游格式 -> OpenAI 格式）
function transformFromUpstream(upstreamData: any, requestId: string): any {
  return {
    id: requestId,
    model: CONFIG.modelName,
    choices: [{
      message: {
        content: upstreamData.response // 从上游提取内容
      }
    }]
  };
}

// 4. 消息预处理（可选）
function transformMessages(messages: Message[]): Message[] {
  // 例如：转换 system 消息
  return messages.map(msg => {
    if (msg.role === "system") {
      return { role: "user", content: `[System]: ${msg.content}` };
    }
    return msg;
  });
}

// 5. 自定义请求头（可选）
function getUpstreamHeaders(authToken?: string): Record<string, string> {
  const headers = generateBrowserHeaders(origin);
  // 添加上游 API 需要的特殊 header
  return headers;
}
```

### 4. 运行服务

```bash
# 开发模式（自动重载）
deno task dev

# 生产模式
deno task start
```

访问 http://localhost:9090 查看首页

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `PORT` | 服务端口 | `9090` |
| `DEBUG_MODE` | 调试模式 | `false` |
| `DEFAULT_STREAM` | 默认流式模式 | `true` |
| `DASHBOARD_ENABLED` | 启用监控面板 | `true` |
| `UPSTREAM_URL` | 上游 API 地址 | 必填 |
| `DEFAULT_KEY` | API 密钥 | `sk-your-key` |
| `MODEL_NAME` | 模型名称 | 必填 |
| `SERVICE_NAME` | 服务名称 | `AI2Api` |
| `SERVICE_EMOJI` | 服务图标 | `🤖` |
| `FOOTER_TEXT` | 页脚文本 | `智能对话，触手可及` |
| `DISCUSSION_URL` | 讨论链接 | GitHub discussions |
| `GITHUB_REPO` | GitHub 仓库 | GitHub repo |

## 核心模块说明

### lib/types.ts
定义通用类型：
- `OpenAIRequest/OpenAIResponse` - OpenAI API 格式
- `RequestStats/LiveRequest` - 统计数据类型
- `ProxyConfig` - 配置接口

### lib/utils.ts
通用工具函数：
- `generateBrowserHeaders()` - 随机浏览器指纹
- `recordRequest()` - 记录请求统计
- `formatUptime()` - 格式化运行时长
- `createErrorResponse()` - 创建错误响应
- `verifyAuth()` - 验证认证
- `createSSEData()` / `parseSSELine()` - SSE 处理

### lib/pages.ts
页面生成器：
- `getHomePage()` - 生成首页
- `getDashboardPage()` - 生成监控面板
- `getHtmlHead()` / `getFooter()` - 通用 HTML 组件

### pages/docs-deploy.ts
- `getDocsPage()` - 生成 API 文档页
- `getDeployPage()` - 生成部署指南页

## 实际案例

本项目已成功适配：

1. **ZtoApi** - Z.ai GLM-4.5 代理
   - 位置: `/deno/ztoapi/`
   - 特点: 支持 thinking 模式，匿名 token

2. **Dphn2Api** - Dolphin AI 代理
   - 位置: `/deno/dphn/`
   - 特点: 多模板支持，system 消息转换

## 定制指南

### 添加自定义页面

```typescript
// 在 main.ts 的 handler 中添加
if (path === "/custom") {
  return new Response(getCustomPage(), {
    headers: { "Content-Type": "text/html" },
  });
}
```

### 添加额外的统计

```typescript
// 在 RequestStats 接口中添加字段
interface RequestStats {
  // ... 现有字段
  customMetric: number;
}

// 在 recordRequest 中更新
function recordCustomStats() {
  stats.customMetric++;
}
```

### 修改流式响应解析

```typescript
// 在 handleStreamingResponse 中
const chunk = {
  choices: [{
    delta: {
      // 根据上游 API 的 SSE 格式提取内容
      content: extractContentFromUpstream(parsed)
    }
  }]
};
```

## 部署

### Deno Deploy

```bash
# 安装 deployctl
deno install -Arf jsr:@deno/deployctl

# 部署
deployctl deploy --project=your-project main.ts
```

### Docker

```dockerfile
FROM denoland/deno:alpine

WORKDIR /app
COPY . .

RUN deno cache main.ts

CMD ["deno", "run", "--allow-net", "--allow-env", "main.ts"]
```

## 测试

```bash
# 获取模型列表
curl http://localhost:9090/v1/models \
  -H "Authorization: Bearer sk-your-key"

# 非流式请求
curl -X POST http://localhost:9090/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-your-key" \
  -d '{"model":"your-model","messages":[{"role":"user","content":"Hello"}],"stream":false}'

# 流式请求
curl -N -X POST http://localhost:9090/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-your-key" \
  -d '{"model":"your-model","messages":[{"role":"user","content":"Hello"}],"stream":true}'
```

## 开发建议

1. **先理解数据流**：
   - OpenAI 请求 → `transformToUpstream()` → 上游 API
   - 上游响应 → `transformFromUpstream()` → OpenAI 响应

2. **使用调试模式**：
   - 设置 `DEBUG_MODE=true` 查看请求/响应日志
   - 检查 `transformToUpstream` 和 `transformFromUpstream` 的输出

3. **测试流式和非流式**：
   - 两种模式的响应格式不同
   - 确保正确处理 SSE 格式

4. **保持类型安全**：
   - 使用 TypeScript 类型检查
   - 为自定义字段添加类型定义

## FAQ

**Q: 如何添加认证 token？**
A: 在 `getUpstreamHeaders()` 中添加 `Authorization` header

**Q: 如何处理上游 API 的错误？**
A: 在 `transformFromUpstream()` 中检查错误字段，使用 `createErrorResponse()` 返回

**Q: 如何自定义页面样式？**
A: 编辑 `lib/pages.ts` 中的 HTML 模板，使用 Tailwind CSS 类

**Q: 如何支持多个模型？**
A: 修改 `handleModels()` 返回多个模型，在 `transformToUpstream()` 中映射模型名称

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
