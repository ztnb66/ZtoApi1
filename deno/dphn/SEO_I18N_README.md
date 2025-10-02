# Dphn2Api SEO 和国际化功能说明

## ✅ 已完成的功能

### 🔍 SEO 优化

已为 Dphn2Api **所有页面** 添加完整的 SEO 支持：

- **Meta 标签**：自动生成 title、description、keywords
- **Open Graph**：支持 Facebook、LinkedIn 等社交平台分享
- **Twitter Card**：Twitter 分享卡片优化
- **Canonical URL**：规范链接，避免重复内容
- **Robots 控制**：搜索引擎爬虫友好
- **多语言 SEO**：og:locale 根据语言自动设置

**支持 SEO 的页面**：
- ✅ 首页 (Home)
- ✅ 文档页 (Docs)
- ✅ Playground 页面
- ✅ 部署页 (Deploy)
- ✅ Dashboard 页面

### 🌍 国际化支持

支持 3 种语言的完整翻译：

- 🇨🇳 **中文（zh-CN）**：默认语言
- 🇺🇸 **英文（en-US）**：English
- 🇯🇵 **日文（ja-JP）**：日本語

**语言检测优先级**：
1. URL 参数：`?lang=en-US`
2. 浏览器 Accept-Language header
3. 默认：中文（zh-CN）

**语言切换器**：每个页面右上角固定位置，可一键切换语言

**所有页面均支持国际化**：
- ✅ 首页 - 完整国际化
- ✅ 文档页 - 导航和标题国际化
- ✅ Playground - 导航国际化
- ✅ 部署页 - 导航国际化
- ✅ Dashboard - 导航国际化

## 📝 如何使用

### 1. 访问不同语言的页面

```bash
# 中文（默认）
http://localhost:9091/

# 英文
http://localhost:9091/?lang=en-US

# 日文
http://localhost:9091/?lang=ja-JP
```

### 2. 语言会保持在页面跳转中

从首页点击"文档"、"Playground"等链接时，会自动带上当前语言参数：

```
http://localhost:9091/?lang=en-US
→ 点击 Docs →
http://localhost:9091/docs?lang=en-US
```

### 3. 查看 SEO Meta 标签

访问任意页面，查看源代码（Ctrl+U 或 Cmd+U）即可看到：

```html
<!-- SEO Meta Tags -->
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta name="author" content="Dphn2Api">

<!-- Open Graph -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="...">
<meta property="og:locale" content="zh-CN">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
...
```

## 🎯 已翻译的内容

### 导航栏
- 首页 / Home / ホーム
- 文档 / Docs / ドキュメント
- Playground / Playground / Playground
- 部署 / Deploy / デプロイ
- Dashboard / Dashboard / Dashboard

### 首页
- 页面标题、描述
- 服务状态卡片
- 快速开始卡片
- Footer

### 其他页面
- 所有页面的基本导航和 Footer 已翻译
- Docs、Playground、Deploy、Dashboard 页面完整内容保留原有功能

## 🔧 配置

### SEO 配置

在文件顶部（第 238-244 行）：

```typescript
const SEO_CONFIG = {
  title: "Dphn2Api - Dolphin AI OpenAI兼容API代理",
  description: "Dolphin AI 的 OpenAI 兼容 API 代理服务，支持多种模型和流式响应",
  keywords: "Dolphin AI,OpenAI,API,Proxy,AI,GPT,Deno,TypeScript,24B,Logical,Summary,Code",
  author: "Dphn2Api",
  ogImage: "", // 可选：添加 Open Graph 图片 URL
};
```

### 添加新翻译

在 `I18nText` 接口中添加新字段（第 11-62 行），然后在三个语言的翻译对象中添加对应翻译（第 64-221 行）。

## 📊 核心函数

```typescript
// 获取翻译文本
getTranslations(lang: Language): I18nText

// 检测浏览器语言
detectLanguage(acceptLanguage: string): Language

// 生成 SEO meta 标签
getSeoMeta(pageTitle: string, pageDesc: string, currentUrl: string, lang: Language): string

// 生成语言切换器
getLanguageSwitcher(currentLang: Language): string

// 生成首页 HTML（带 SEO 和 i18n）
getHomePage(lang: Language, t: I18nText, currentUrl: string): string

// 生成文档页 HTML（带 SEO 和 i18n）
getDocsPage(lang: Language, t: I18nText, currentUrl: string): string
```

## 🧪 测试

1. **测试语言切换**：
   ```bash
   # 启动服务
   cd /Users/admin/ZtoApi/deno/dphn
   deno task start

   # 访问不同语言
   curl http://localhost:9091/ | grep '<html lang='
   curl http://localhost:9091/?lang=en-US | grep '<html lang='
   curl http://localhost:9091/?lang=ja-JP | grep '<html lang='
   ```

2. **测试 SEO 标签**：
   ```bash
   curl http://localhost:9091/ | grep 'meta name="description"'
   curl http://localhost:9091/ | grep 'og:title'
   ```

3. **测试语言切换器**：
   - 浏览器访问 http://localhost:9091/
   - 点击右上角语言下拉框
   - 选择不同语言查看效果

## 📈 优势

1. **SEO 友好**：完整的 meta 标签支持搜索引擎收录
2. **社交分享优化**：分享到社交平台时显示友好的卡片
3. **多语言支持**：扩展国际用户群
4. **自动检测**：根据用户浏览器语言自动选择
5. **保持语言状态**：页面跳转时保持所选语言

## 🚀 下一步

如需添加更多语言，可以：

1. 在 `Language` 类型中添加新语言代码
2. 在 `translations` 对象中添加对应语言的翻译
3. 在语言切换器中添加新选项

示例：添加韩语（ko-KR）

```typescript
type Language = "zh-CN" | "en-US" | "ja-JP" | "ko-KR";

const translations: Record<Language, I18nText> = {
  // ... 现有语言
  "ko-KR": {
    home: "홈",
    docs: "문서",
    // ... 其他翻译
  },
};
```
