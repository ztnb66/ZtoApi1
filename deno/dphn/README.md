# Dphn2Api - Dolphin AI OpenAI-Compatible API Proxy

🐬 为 Dolphin AI 提供 OpenAI 兼容的 API 接口

## 功能特性

- ✅ OpenAI API 格式兼容
- ✅ 支持流式和非流式响应
- ✅ 自动转换 system 消息为 user 消息(Dolphin AI 不支持 system 角色)
- ✅ 支持多种模板类型(logical, summary, code-beginner, code-advanced)
- ✅ 实时监控仪表板
- ✅ 完整的 API 文档
- ✅ 一键部署到 Deno Deploy

## 在线服务

🚀 **官方部署**: https://dphn2api.deno.dev

- 主页: https://dphn2api.deno.dev
- API 文档: https://dphn2api.deno.dev/docs
- 监控面板: https://dphn2api.deno.dev/dashboard

## 本地运行

### 前置要求

- [Deno](https://deno.land/) 1.30+

### 启动服务

```bash
# 使用 deno task
deno task start

# 或使用启动脚本
./start.sh

# 或直接运行
deno run --allow-net --allow-env dphn2api.ts

# 或指定环境变量
DPHN_PORT=9091 DPHN_DEFAULT_KEY=your-key deno run --allow-net --allow-env dphn2api.ts
```

### 环境变量配置

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `DPHN_PORT` | 服务端口 | `9091` |
| `DPHN_DEFAULT_KEY` | API 密钥 | `sk-dphn-key` |
| `DPHN_MODEL_NAME` | 模型名称 | `Dolphin 24B` |
| `DPHN_DEFAULT_TEMPLATE` | 默认模板 | `logical` |
| `DPHN_UPSTREAM_URL` | 上游 API 地址 | `https://chat.dphn.ai/api/chat` |
| `DPHN_DEBUG_MODE` | 调试模式 | `true` |
| `DPHN_DEFAULT_STREAM` | 默认流式模式 | `true` |
| `DPHN_DASHBOARD_ENABLED` | 启用仪表板 | `true` |

## API 使用

### 认证

所有请求需要在 Header 中携带 Bearer Token:

```
Authorization: Bearer sk-dphn-key
```

### 端点

#### 获取模型列表

```bash
curl https://dphn2api.deno.dev/v1/models \
  -H "Authorization: Bearer sk-dphn-key"
```

#### 聊天完成(非流式)

```bash
curl -X POST https://dphn2api.deno.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-dphn-key" \
  -d '{
    "model": "Dolphin 24B",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "stream": false
  }'
```

#### 聊天完成(流式)

```bash
curl -N -X POST https://dphn2api.deno.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-dphn-key" \
  -d '{
    "model": "Dolphin 24B",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "stream": true
  }'
```

### 使用 OpenAI SDK

#### Python

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-dphn-key",
    base_url="https://dphn2api.deno.dev/v1"
)

response = client.chat.completions.create(
    model="Dolphin 24B",
    messages=[{"role": "user", "content": "Hello!"}]
)

print(response.choices[0].message.content)
```

#### JavaScript/TypeScript

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'sk-dphn-key',
  baseURL: 'https://dphn2api.deno.dev/v1'
});

const response = await client.chat.completions.create({
  model: 'Dolphin 24B',
  messages: [{ role: 'user', content: 'Hello!' }]
});

console.log(response.choices[0].message.content);
```

## 模板类型

Dolphin AI 支持以下模板类型(通过 `DPHN_DEFAULT_TEMPLATE` 环境变量配置):

- `logical` - 逻辑推理(默认)
- `summary` - 内容总结
- `code-beginner` - 代码入门
- `code-advanced` - 高级编程

## 部署到 Deno Deploy

### 方式一: GitHub 自动部署

1. Fork 本项目
2. 访问 [Deno Deploy](https://dash.deno.com/)
3. 创建新项目,选择 GitHub 仓库
4. 设置入口文件为 `dphn2api.ts`
5. 配置环境变量
6. 部署完成!

### 方式二: deployctl 命令行部署

```bash
# 安装 deployctl
deno install -Arf jsr:@deno/deployctl

# 部署
deployctl deploy --project=dphn2api dphn2api.ts
```

## 注意事项

### System 消息处理

Dolphin AI 不支持 `system` 角色消息。本代理会自动将 system 消息转换为带前缀的 user 消息:

```
system: "You are a helpful assistant"
↓ 转换为 ↓
user: "[System Instructions]: You are a helpful assistant"
```

### 不支持的参数

以下 OpenAI API 参数在代理中会被忽略,因为 Dolphin AI 不支持:

- `temperature`
- `max_tokens`
- `top_p`
- `stream_options`
- `frequency_penalty`
- `presence_penalty`
- 等等...

## 测试

运行测试脚本:

```bash
# 测试本地服务
./test.sh http://localhost:9091

# 测试线上服务
./test.sh https://dphn2api.deno.dev
```

## 监控

访问 `/dashboard` 查看实时监控数据:

### 仪表板功能

**顶部统计卡片** (5个关键指标):
- 📈 总请求数
- ✅ 成功请求
- ❌ 失败请求
- ⚡ 平均响应时间
- 🔌 API 调用次数

**详细统计区** (3个卡片):
- 🎯 **API 统计**: Chat Completions 调用、Models 查询、流式/非流式请求分布
- ⚡ **性能指标**: 平均/最快/最慢响应时间、成功率
- 📊 **系统信息**: 运行时长、最后请求时间、流式/非流式比例、Models 调用统计

**热门模型 Top 3**:
- 🥇🥈🥉 显示最常用的前三个模型及其调用次数

**实时请求表格**:
- 彩色标签显示 HTTP 方法 (GET/POST)
- 状态码高亮显示 (成功=绿色,失败=红色)
- 分页控制 (支持 5/10/20/50/100 条/页)
- 自动刷新 (每 5 秒)

仪表板采用现代卡片式设计,响应式布局,移动端友好。

## 相关项目

- [ZtoApi](https://github.com/dext7r/ZtoApi) - Z.ai GLM-4.5 的 OpenAI 兼容代理
- [Dolphin AI](https://chat.dphn.ai) - Dolphin AI 官方网站

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request!
