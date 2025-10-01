# Deno OpenAI-Compatible API Proxy Collection

本目录包含基于 Deno 运行时的 OpenAI 兼容 API 代理集合。

## 📁 目录结构

```
deno/
├── template/           # 🎯 通用模板（推荐从这里开始）
│   ├── lib/           # 通用库（类型、工具、页面）
│   ├── pages/         # 文档和部署页面
│   ├── main.ts        # 主程序模板
│   └── README.md      # 详细文档
│
├── dphn/              # 🐬 Dolphin AI 代理实现
│   ├── dphn2api.ts    # 完整实现
│   ├── README.md      # 使用文档
│   └── ...
│
├── ztoapi/            # (即将重构为模板形式)
│   └── ...
│
└── TEMPLATE_GUIDE.md  # 📖 模板使用指南
```

## 🚀 快速开始

### 方式一：使用现有实现

如果你想使用 Dolphin AI：

```bash
cd dphn
cp .env.example .env
# 编辑 .env 配置
deno task start
```

### 方式二：创建新的代理

如果你想适配其他 AI 服务：

```bash
cd template
cp -r . ../my-service
cd ../my-service
# 按照 TEMPLATE_GUIDE.md 进行定制
```

## 📚 已实现的代理

| 项目 | 目标服务 | 状态 | 特点 |
|------|---------|------|------|
| **template** | 通用模板 | ✅ 完成 | 可配置框架，包含完整功能 |
| **dphn** | Dolphin AI | ✅ 完成 | 多模板、system 消息转换 |
| **ztoapi** | Z.ai GLM-4.5 | 🔄 待重构 | Thinking 模式、匿名 token |

## 🎯 模板特性

所有基于模板的实现都包含：

### 核心功能
- ✅ OpenAI API 格式兼容
- ✅ 流式和非流式响应
- ✅ 完整的 TypeScript 类型支持
- ✅ 请求认证和验证
- ✅ 错误处理

### 监控统计
- 📊 实时请求统计
- ⚡ 响应时间追踪
- 🔥 热门模型排行
- 📈 成功率分析
- 🕒 运行时长监控

### 美观界面
- 🏠 精美首页（Tailwind CSS）
- 📖 完整 API 文档页
- 🚀 部署指南页
- 📊 实时监控面板
- 📱 响应式设计

### 开发体验
- 🔧 环境变量配置
- 🐛 调试模式支持
- 🔄 热重载开发模式
- 🚢 一键部署脚本

## 🛠️ 技术栈

- **运行时**: Deno 1.30+
- **语言**: TypeScript
- **样式**: Tailwind CSS (CDN)
- **部署**: Deno Deploy / Docker
- **架构**: 单文件部署 + 模块化库

## 📖 文档索引

- **[TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md)** - 如何使用模板创建新代理
- **[template/README.md](./template/README.md)** - 模板详细文档
- **[dphn/README.md](./dphn/README.md)** - Dolphin AI 代理使用文档

## 🔧 从模板创建新代理

### 第 1 步：复制模板

```bash
cd deno
cp -r template my-new-service
cd my-new-service
```

### 第 2 步：配置环境

```bash
cp .env.example .env
```

编辑 `.env`：
```env
SERVICE_NAME=MyService
SERVICE_EMOJI=🎯
UPSTREAM_URL=https://api.yourservice.com/chat
MODEL_NAME=your-model
DEFAULT_KEY=sk-your-key
```

### 第 3 步：定制转换函数

编辑 `main.ts`，实现：
- `transformToUpstream()` - OpenAI → 上游格式
- `transformFromUpstream()` - 上游 → OpenAI 格式
- `transformMessages()` - 消息预处理（可选）
- `getUpstreamHeaders()` - 自定义请求头（可选）

### 第 4 步：运行测试

```bash
deno task dev
```

访问 http://localhost:9090 查看效果！

## 🎨 定制选项

模板支持以下定制：

### 基础配置
- 服务名称和图标
- 端口和调试模式
- API 密钥和模型名称

### 品牌定制
- 页脚文本
- 讨论链接
- GitHub 仓库链接

### 功能开关
- 监控面板启用/禁用
- 流式响应默认设置
- 调试日志输出

### 高级定制
- 自定义页面内容
- 额外的统计指标
- 请求/响应转换逻辑
- 浏览器指纹生成

## 🔐 安全性

模板包含的安全特性：

- ✅ Bearer Token 认证
- ✅ 随机浏览器指纹（防检测）
- ✅ 请求验证和错误处理
- ✅ 环境变量配置（敏感信息不硬编码）

## 🚀 部署选项

### Deno Deploy（推荐）

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

### 传统服务器

```bash
# 使用 PM2
pm2 start "deno task start" --name my-service

# 或使用 systemd
# 创建 systemd service 文件
```

## 📊 性能

模板的性能特点：

- ⚡ 基于 Deno 的高性能运行时
- 🔄 流式响应零延迟转发
- 💾 内存中的统计数据（轻量级）
- 🚀 单文件部署，快速启动

## 🤝 贡献

欢迎贡献新的代理实现或改进模板！

### 提交新代理

1. 在 `deno/` 下创建新目录
2. 基于模板实现
3. 添加 README.md 文档
4. 更新本文件的"已实现的代理"表格
5. 提交 Pull Request

### 改进模板

1. 修改 `template/` 中的文件
2. 更新 `template/README.md` 文档
3. 在 `dphn/` 中验证改动
4. 提交 Pull Request

## 📝 版本历史

- **v2.0** (2024-10) - 创建通用模板系统
- **v1.1** (2024-10) - 重构 dphn2api 使用模块化设计
- **v1.0** (2024-10) - 初始 dphn2api 实现

## 📄 许可证

MIT License

## 🔗 相关链接

- [Deno 官方文档](https://deno.land/)
- [Deno Deploy](https://deno.com/deploy)
- [OpenAI API 参考](https://platform.openai.com/docs/api-reference)
- [项目主仓库](https://github.com/dext7r/ZtoApi)
