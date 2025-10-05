# Z.AI 账号批量注册工具

一个基于 Deno 的 Z.AI 账号批量注册管理系统，支持 Web 界面管理、并发注册、实时日志、数据持久化。

## ✨ 功能特性

- 🔐 **登录鉴权**: KV 持久化 Session，防止未授权访问，刷新页面不掉线
- 🚀 **批量注册**: 支持批量并发注册 Z.AI 账号（可配置并发数 1-10）
- ⚡ **并发执行**: 使用 Promise.allSettled 实现真正的异步并发，大幅提升注册速度
- 📊 **实时监控**: SSE 推送实时日志和进度，可视化进度条显示
- 📈 **进度追踪**: 实时显示注册进度、速度（个/分钟）、预计剩余时间（ETA）
- 📝 **账号管理**: 查看、搜索、分页显示、复制、导出注册的账号
- 📤 **批量导入**: 支持 TXT 文件批量导入账号，自动去重
- ⚙️ **高级配置**: 可自定义邮件超时、轮询间隔、注册间隔、并发数、通知等参数
- 💾 **数据持久化**: 使用 Deno KV 存储账号数据和配置，重启不丢失
- 🔔 **友好提示**: Toast 消息提示，优雅的操作反馈
- ⏸️ **任务控制**: 支持停止正在运行的注册任务

## 📋 前置要求

- [Deno](https://deno.land/) >= 1.30.0

## 🚀 快速开始

### 方式1: Web 管理界面（推荐）

```bash
# V2 版本 - 带登录页面和高级设置
deno run --allow-net --unstable-kv zai_register

# 或者使用 V1 版本
deno run --allow-net --unstable-kv zai_web.ts
```

访问: `http://localhost:8001/login`

**默认账号**: `admin` / `123456`

**修改默认账号密码**:
```bash
# 通过环境变量覆盖
export ZAI_USERNAME=your_username
export ZAI_PASSWORD=your_password
deno run --allow-net --unstable-kv zai_register
```

### 方式2: 命令行模式

```bash
# 注册指定数量的账号
deno run --allow-net --unstable-kv zai_register.ts register 10

# 列出所有账号
deno run --allow-net --unstable-kv zai_register.ts list

# 导出账号到文件
deno run --allow-net --unstable-kv zai_register.ts export

# Cron 模式（每小时注册5个账号）
deno run --allow-net --unstable-kv zai_register.ts cron
```

## ⚙️ 高级配置

### PushPlus 通知配置

1. 在 [PushPlus](https://www.pushplus.plus/) 注册并获取 Token
2. 在 Web 界面的"高级设置"中填入 Token
3. 勾选"启用 PushPlus 通知"

### 可配置项

| 配置项 | 说明 | 默认值 | 范围 | 备注 |
|--------|------|--------|------|------|
| 邮件等待超时 | 等待验证邮件的最长时间 | 120秒 | 30-300秒 | 超时后放弃该账号注册 |
| 邮件轮询间隔 | 检查邮箱的时间间隔 | 1秒 | 0.5-10秒 | 建议0.5-2秒，过小可能触发限流 |
| 账号间隔 | 每批次注册完成后的延迟 | 2000毫秒 | 500-10000毫秒 | 批次间的休息时间 |
| 并发数 | 同时注册的账号数量 | 1 | 1-10 | **建议3-5，提升注册效率** |
| API 重试次数 | 请求失败时的重试次数 | 3次 | 1-10次 | 增加成功率 |
| PushPlus Token | 通知服务的 Token | 空 | 任意字符串 | 留空则不发送通知 |

### 并发注册说明

**并发模式**：设置并发数为 N 时，每批次会同时启动 N 个注册任务，等待全部完成后再开始下一批。

**性能对比**：
- 并发数 = 1（顺序执行）：10个账号约需 20-30 分钟
- 并发数 = 3（推荐）：10个账号约需 7-10 分钟
- 并发数 = 5（激进）：10个账号约需 4-6 分钟

**注意事项**：
- ⚠️ 并发数过高可能触发 Z.AI 限流
- ✅ 建议从并发数 3 开始测试
- ✅ 如遇到大量失败，降低并发数

## 📁 数据存储

### Deno KV 数据库

所有数据持久化存储在 Deno KV 中，重启不丢失：

**1. 账号数据**
```typescript
["zai_accounts", timestamp, email] => {
  email: string,
  password: string,
  token: string,
  createdAt: string
}
```

**2. Session 数据**
```typescript
["sessions", sessionId] => {
  createdAt: number
}
// 自动过期时间：24小时
```

**3. 配置数据**
```typescript
["config", "register"] => {
  emailTimeout: number,
  emailCheckInterval: number,
  registerDelay: number,
  retryTimes: number,
  concurrency: number,
  enableNotification: boolean,
  pushplusToken: string
}
```

### 数据位置

- **macOS/Linux**: `~/.local/share/deno/kv/`
- **Windows**: `%USERPROFILE%\.local\share\deno\kv\`

### 账号导入导出

**导出格式**：
```
email----password----jwtToken----sessionToken
```

**支持导入格式**：
1. 完整格式（4段）：`email----password----jwtToken----sessionToken`
2. 简化格式（3段）：`email----password----token`

批量导入时会自动去重（以邮箱为唯一键）。

## 🔧 开发说明

### 项目结构

```
zai/
├── zai_register.ts      # 命令行注册脚本
├── zai_web.ts          # Web 管理界面 V1
├── zai_register       # Web 管理界面 V2（带登录）
└── README.md           # 本文档
```

### 核心流程

1. **生成随机邮箱**: 使用临时邮箱服务的域名（60+个域名池）
2. **发起注册请求**: 调用 `https://chat.z.ai/api/v1/auths/signup`
3. **获取验证邮件**: 轮询临时邮箱 API，可配置轮询间隔
4. **提取验证链接**: 从邮件中解析验证 URL，自动解码 HTML 实体
5. **完成注册**: 调用 `https://chat.z.ai/api/v1/auths/finish_signup`
6. **保存账号**: 存入 Deno KV，包含邮箱、密码、JWT Token、Session Token

### 邮箱验证链接处理

邮件中的 URL 可能包含 HTML 实体编码（如 `&amp;`），系统会自动处理:
- ✅ 支持新版路径: `/auth/verify_email`
- ✅ 支持旧版路径: `/verify_email`
- ✅ 自动解码 HTML 实体: `&amp;` → `&`
- ✅ 解析 URL 参数: token, email, username

### Web 界面功能

**1. 实时日志显示**
- SSE (Server-Sent Events) 实时推送
- 颜色区分不同级别（info/success/error/warning）
- 自动滚动到最新日志
- 支持清空日志

**2. 进度可视化**
- 进度条显示完成百分比
- 实时速度计算（个/分钟）
- ETA（预计剩余时间）智能显示
- 成功/失败统计

**3. 账号列表管理**
- 分页显示（10/20/50/100 可选）
- 搜索过滤（邮箱/密码）
- 一键复制账号/Token
- 批量导出为 TXT
- 批量导入 TXT（自动去重）

**4. 任务控制**
- 启动/停止注册任务
- 实时状态显示（闲置/运行中/已完成）
- 防止重复启动

## 🛡️ 安全建议

- ✅ **修改默认登录密码**（通过环境变量 `ZAI_USERNAME` 和 `ZAI_PASSWORD`）
- ✅ **不要在公网暴露端口**（仅监听 localhost:8001）
- ✅ **定期导出并备份账号数据**（防止 KV 数据丢失）
- ✅ **PushPlus Token 妥善保管**（避免泄露通知权限）
- ✅ **Session 自动过期**（24小时，需重新登录）

## 🚨 常见问题

### 1. Token 401 错误
**问题**: API 调用返回 `"token expired or incorrect"`

**原因**:
- Token 有效期很短（可能只有几分钟到几小时）
- API 端点错误（应使用 `chat.z.ai` 而非 `api.z.ai`）

**解决方案**:
- 使用最新注册的账号 Token
- 确保使用正确的 API 端点：`https://chat.z.ai/api/chat/completions`

### 2. 注册大量失败
**问题**: 成功率很低

**可能原因**:
- 邮箱服务临时故障
- Z.AI 触发限流
- 并发数过高

**解决方案**:
- 降低并发数（从 5 降到 3 或 1）
- 增加"账号间隔"时间（从 2000ms 增加到 5000ms）
- 更换邮箱域名池中的域名

### 3. 页面刷新后退出登录
**问题**: 已修复，现在使用 Deno KV 持久化 Session

**如果仍有问题**:
- 检查浏览器 Cookie 是否被禁用
- 确保 Deno 有权限访问 KV 数据库

### 4. 配置保存后丢失
**问题**: 已修复，现在配置保存在 Deno KV 中

**验证方法**:
- 保存配置后刷新页面，检查是否自动回显

## 🎯 性能优化建议

### 推荐配置（平衡模式）
```
并发数: 3
邮件轮询间隔: 1秒
账号间隔: 2000毫秒
邮件等待超时: 120秒
```
**预期效果**: 100个账号约需 30-40 分钟，成功率 80-90%

### 高速配置（激进模式）
```
并发数: 5
邮件轮询间隔: 0.5秒
账号间隔: 1000毫秒
邮件等待超时: 90秒
```
**预期效果**: 100个账号约需 20-25 分钟，成功率 70-80%

### 稳定配置（保守模式）
```
并发数: 1
邮件轮询间隔: 2秒
账号间隔: 3000毫秒
邮件等待超时: 150秒
```
**预期效果**: 100个账号约需 50-60 分钟，成功率 90-95%

## 📊 技术栈

- **运行时**: Deno 2.0+
- **数据库**: Deno KV (内置)
- **前端**: jQuery + Tailwind CSS
- **实时通信**: Server-Sent Events (SSE)
- **并发模型**: Promise.allSettled
- **通知服务**: PushPlus (可选)

## 🔄 更新日志

### v2.0 (最新)
- ✅ 添加并发注册功能（1-10 可配置）
- ✅ 实现进度条和 ETA 显示
- ✅ Session 和配置持久化到 KV
- ✅ 支持批量导入/导出账号
- ✅ Toast 消息提示
- ✅ 账号列表分页显示
- ✅ 一键复制账号和 Token
- ✅ 邮件轮询间隔可配置

### v1.0
- ✅ 基础注册功能
- ✅ Web 界面和登录鉴权
- ✅ 实时日志推送
- ✅ PushPlus 通知集成

## ⚠️ 免责声明

本工具仅供学习和研究使用，请遵守相关服务的使用条款。使用本工具产生的任何后果由使用者自行承担。

---

**⭐ 如果这个项目对你有帮助，请给个 Star！**
