// Deno OpenAI-Compatible API Proxy for Dolphin AI

export {};

// ============================================================================
// i18n 国际化支持
// ============================================================================

type Language = "zh-CN" | "en-US" | "ja-JP";

interface I18nText {
  // Navigation
  home: string;
  docs: string;
  playground: string;
  deploy: string;
  dashboard: string;

  // Homepage
  homeTitle: string;
  homeDesc: string;
  statusTitle: string;
  apiEndpoint: string;
  model: string;
  apiKey: string;
  quickStart: string;
  viewDocs: string;
  onlineTest: string;
  deployNow: string;
  viewStats: string;
  docsCardDesc: string;
  playgroundCardDesc: string;
  deployCardDesc: string;
  dashboardCardDesc: string;

  // Docs page
  docsTitle: string;
  docsSubtitle: string;

  // Playground
  playgroundTitle: string;
  playgroundDesc: string;
  playgroundSubtitle: string;
  requestConfig: string;
  temperature: string;
  maxTokens: string;
  enableStream: string;
  system: string;
  systemPlaceholder: string;
  systemDesc: string;
  message: string;
  messagePlaceholder: string;
  messageDesc: string;
  sendBtn: string;
  sending: string;
  clearBtn: string;
  responseTitle: string;
  responseContent: string;
  copy: string;
  copied: string;
  emptyTitle: string;
  emptyDesc: string;
  loadingTitle: string;
  loadingDesc: string;
  errorTitle: string;
  errorEmpty: string;
  duration: string;
  status: string;
  examplesTitle: string;
  exampleSimple: string;
  exampleSimpleDesc: string;
  exampleMulti: string;
  exampleMultiDesc: string;
  exampleSummary: string;
  exampleSummaryDesc: string;
  exampleCode: string;
  exampleCodeDesc: string;

  // Deploy
  deployTitle: string;
  deployDesc: string;
  deploySubtitle: string;
  deployQuick: string;
  deployGithub: string;
  deployStep1: string;
  deployStep2: string;
  deployStep3: string;
  deployStep4: string;
  deployStep5: string;
  deployStep6: string;
  deployCli: string;
  deployCliDesc: string;
  deployEnv: string;
  deployEnvVar: string;
  deployEnvDesc: string;
  deployEnvDefault: string;
  deployLocal: string;

  // Dashboard
  dashboardTitle: string;
  dashboardDesc: string;
  dashboardSubtitle: string;
  dashboardOverview: string;
  dashboardTotalReq: string;
  dashboardSuccess: string;
  dashboardAvgTime: string;
  dashboardUptime: string;
  dashboardTopModels: string;
  dashboardRecentReq: string;
  dashboardTime: string;
  dashboardMethod: string;
  dashboardPath: string;
  dashboardStatus: string;
  dashboardDuration: string;
  dashboardModel: string;
  dashboardNoData: string;
  dashboardSuccessReq: string;
  dashboardFailedReq: string;
  dashboardApiCalls: string;
  dashboardRealTimeMonitor: string;
  dashboardApiStats: string;
  dashboardChatCompletions: string;
  dashboardModelsQuery: string;
  dashboardStreamingReq: string;
  dashboardNonStreamingReq: string;
  dashboardPerformance: string;
  dashboardAvgResponse: string;
  dashboardFastestResponse: string;
  dashboardSlowestResponse: string;
  dashboardSuccessRate: string;
  dashboardSystemInfo: string;
  dashboardRuntime: string;
  dashboardLastRequest: string;
  dashboardStreamRatio: string;
  dashboardModelsCount: string;
  dashboardHistoryTrend: string;
  dashboardHistoryLast1h: string;
  dashboardNoHistoryData: string;
  dashboardNoHistoryDesc: string;
  dashboardTopModelsTop3: string;
  dashboardRealTime: string;
  dashboardAutoRefresh: string;
  dashboardEmptyRequest: string;
  dashboardPaginationTotal: string;
  dashboardPaginationRecords: string;
  dashboardPaginationPage: string;
  dashboardPaginationPerPage: string;
  dashboardPrevPage: string;
  dashboardNextPage: string;
  dashboardChartTotalReq: string;
  dashboardChartSuccessRate: string;
  dashboardChartAvgTime: string;
  dashboardChartReqCount: string;
  dashboardChartResponseTime: string;

  // Docs page additional fields
  docsOverview: string;
  docsOverviewDesc: string;
  docsBaseUrl: string;
  docsAuth: string;
  docsAuthDesc: string;
  docsApiEndpoints: string;
  docsGetModels: string;
  docsGetModelsDesc: string;
  docsPostChat: string;
  docsPostChatDesc: string;
  docsRequestParams: string;
  docsParamModel: string;
  docsParamModelDesc: string;
  docsParamMessages: string;
  docsParamMessagesDesc: string;
  docsParamStream: string;
  docsParamStreamDesc: string;
  docsRequestExample: string;
  docsTemplateTypes: string;
  docsTemplateDesc: string;
  docsTemplateLogical: string;
  docsTemplateLogicalDesc: string;
  docsTemplateSummary: string;
  docsTemplateSummaryDesc: string;
  docsTemplateCodeBeginner: string;
  docsTemplateCodeBeginnerDesc: string;
  docsTemplateCodeAdvanced: string;
  docsTemplateCodeAdvancedDesc: string;
  docsIntegration: string;
  docsPythonSDK: string;
  docsJavaScriptSDK: string;
  docsRequired: string;
  docsOptional: string;

  // Deploy page additional fields
  deployMethodGithub: string;
  deployMethodCli: string;
  deployEnvVarName: string;
  deployEnvDescription: string;
  deployEnvDefaultValue: string;
  deployOtherVars: string;
  deployCurrentAddr: string;
  deployRunning: string;
  deployCreateFile: string;
  deployCreateFileDesc: string;
  deployLogin: string;
  deployLoginDesc: string;
  deployCreateProject: string;
  deployCreateProjectDesc: string;
  deployConfigEnv: string;
  deployConfigEnvDesc: string;
  deployComplete: string;
  deployCompleteDesc: string;
  deployEnvConfig: string;
  deployKeyRecommend: string;
  deployKeyDesc: string;
  deployKeyDefault: string;
  deployKeySuggestion: string;
  deployModelNameVar: string;
  deployModelNameDesc: string;
  deployTemplateDesc: string;
  deployDebugDesc: string;
  deployStreamDesc: string;
  deployDashboardDesc: string;
  deployUsageTitle: string;
  deployUsageDesc: string;
  deployUsageNote: string;
  deployTipNote: string;
  deployTipTitle: string;
  deployTip1: string;
  deployTip2: string;
  deployTip3: string;
  deployTip4: string;
  deployTip5: string;
  deployToDenoBtn: string;

  // Common
  poweredBy: string;
  backHome: string;
  github: string;
  discussion: string;
  exampleMessage: string;
  exampleMessageLong: string;
}

const translations: Record<Language, I18nText> = {
  "zh-CN": {
    home: "首页",
    docs: "文档",
    playground: "Playground",
    deploy: "部署",
    dashboard: "Dashboard",
    homeTitle: "Dolphin AI API 代理",
    homeDesc: "OpenAI 兼容的 Dolphin AI API 服务",
    statusTitle: "服务状态",
    apiEndpoint: "API 端点",
    model: "模型",
    apiKey: "API 密钥",
    quickStart: "快速开始",
    viewDocs: "查看完整 API 文档",
    onlineTest: "在线测试 API",
    deployNow: "一键部署",
    viewStats: "查看统计数据",
    docsCardDesc: "完整的 API 使用文档和示例",
    playgroundCardDesc: "在线测试 API 请求和响应",
    deployCardDesc: "快速部署到 Deno Deploy",
    dashboardCardDesc: "实时监控和统计信息",
    docsTitle: "API 文档",
    docsSubtitle: "完整的使用指南和代码示例",
    playgroundTitle: "Playground",
    playgroundDesc: "在线测试 Dolphin AI API",
    playgroundSubtitle: "在线测试 API",
    requestConfig: "请求配置",
    temperature: "Temperature",
    maxTokens: "Max Tokens",
    enableStream: "启用流式响应",
    system: "System (可选)",
    systemPlaceholder: "你是一个乐于助人的AI助手...",
    systemDesc: "系统提示词，用于设定角色和行为",
    message: "Message",
    messagePlaceholder: "输入你的问题...",
    messageDesc: "用户消息内容",
    sendBtn: "🚀 发送请求",
    sending: "⏳ 请求中...",
    clearBtn: "🗑️ 清空响应",
    responseTitle: "响应结果",
    responseContent: "响应内容",
    copy: "📋 复制",
    copied: "✅ 已复制",
    emptyTitle: "等待请求",
    emptyDesc: "配置参数后点击\"发送请求\"开始测试",
    loadingTitle: "正在请求中...",
    loadingDesc: "请稍候",
    errorTitle: "请求失败",
    errorEmpty: "请输入消息内容",
    duration: "耗时",
    status: "状态",
    examplesTitle: "示例",
    exampleSimple: "简单对话",
    exampleSimpleDesc: "单轮对话示例",
    exampleMulti: "多轮对话",
    exampleMultiDesc: "包含历史记录的对话",
    exampleSummary: "内容总结",
    exampleSummaryDesc: "使用 summary 模板",
    exampleCode: "代码生成",
    exampleCodeDesc: "使用 code-advanced 模板",
    deployTitle: "部署指南",
    deployDesc: "一键部署到 Deno Deploy",
    deploySubtitle: "一键部署到 Deno Deploy",
    deployQuick: "快速部署",
    deployGithub: "方式一：GitHub 自动部署",
    deployStep1: "Fork 本项目到你的 GitHub",
    deployStep2: "访问 Deno Deploy",
    deployStep3: "创建新项目，选择你的 GitHub 仓库",
    deployStep4: "设置入口文件（参考项目 README）",
    deployStep5: "配置环境变量",
    deployStep6: "部署完成！",
    deployCli: "命令行部署",
    deployCliDesc: "使用 deployctl 进行部署：",
    deployEnv: "环境变量配置",
    deployEnvVar: "变量名",
    deployEnvDesc: "说明",
    deployEnvDefault: "默认值",
    deployLocal: "本地运行",
    dashboardTitle: "Dashboard",
    dashboardDesc: "实时监控和统计",
    dashboardSubtitle: "实时监控和统计",
    dashboardOverview: "概览",
    dashboardTotalReq: "总请求数",
    dashboardSuccess: "成功率",
    dashboardAvgTime: "平均响应时间",
    dashboardUptime: "运行时间",
    dashboardTopModels: "热门模型",
    dashboardRecentReq: "最近请求",
    dashboardTime: "时间",
    dashboardMethod: "方法",
    dashboardPath: "路径",
    dashboardStatus: "状态码",
    dashboardDuration: "耗时",
    dashboardModel: "模型",
    dashboardNoData: "暂无请求记录",
    dashboardSuccessReq: "成功请求",
    dashboardFailedReq: "失败请求",
    dashboardApiCalls: "API 调用",
    dashboardRealTimeMonitor: "实时监控 API 请求和性能统计",
    dashboardApiStats: "API 统计",
    dashboardChatCompletions: "Chat Completions",
    dashboardModelsQuery: "Models 查询",
    dashboardStreamingReq: "流式请求",
    dashboardNonStreamingReq: "非流式请求",
    dashboardPerformance: "性能指标",
    dashboardAvgResponse: "平均响应",
    dashboardFastestResponse: "最快响应",
    dashboardSlowestResponse: "最慢响应",
    dashboardSuccessRate: "成功率",
    dashboardSystemInfo: "系统信息",
    dashboardRuntime: "运行时长",
    dashboardLastRequest: "最后请求",
    dashboardStreamRatio: "流式/非流式",
    dashboardModelsCount: "Models 调用",
    dashboardHistoryTrend: "历史趋势",
    dashboardHistoryLast1h: "历史趋势（最近1小时）",
    dashboardNoHistoryData: "暂无历史数据",
    dashboardNoHistoryDesc: "系统每分钟记录一次数据，请稍后查看",
    dashboardTopModelsTop3: "热门模型 Top 3",
    dashboardRealTime: "实时请求",
    dashboardAutoRefresh: "自动刷新（每5秒）",
    dashboardEmptyRequest: "暂无请求记录",
    dashboardPaginationTotal: "共",
    dashboardPaginationRecords: "条记录，第",
    dashboardPaginationPage: "页",
    dashboardPaginationPerPage: "每页:",
    dashboardPrevPage: "上一页",
    dashboardNextPage: "下一页",
    dashboardChartTotalReq: "总请求数",
    dashboardChartSuccessRate: "成功率(%)",
    dashboardChartAvgTime: "平均响应时间(ms)",
    dashboardChartReqCount: "请求数 / 成功率",
    dashboardChartResponseTime: "响应时间(ms)",
    docsOverview: "概述",
    docsOverviewDesc: "Dphn2Api 是一个为 Dolphin AI 提供 OpenAI 兼容 API 接口的代理服务器。",
    docsBaseUrl: "基础 URL",
    docsAuth: "身份验证",
    docsAuthDesc: "所有 API 请求都需要在请求头中包含 Bearer Token：",
    docsApiEndpoints: "API 端点",
    docsGetModels: "获取可用模型列表",
    docsGetModelsDesc: "获取可用模型列表",
    docsPostChat: "创建聊天完成（支持流式和非流式）",
    docsPostChatDesc: "创建聊天完成（支持流式和非流式）",
    docsRequestParams: "请求参数",
    docsParamModel: "string, 必需 - 模型名称 (如",
    docsParamModelDesc: "string, 必需 - 模型名称 (如",
    docsParamMessages: "array, 必需 - 消息列表",
    docsParamMessagesDesc: "array, 必需 - 消息列表",
    docsParamStream: "boolean, 可选 - 是否流式响应（默认:",
    docsParamStreamDesc: "boolean, 可选 - 是否流式响应（默认:",
    docsRequestExample: "请求示例",
    docsTemplateTypes: "模板类型",
    docsTemplateDesc: "Dolphin AI 支持以下模板类型（通过环境变量 DPHN_DEFAULT_TEMPLATE 配置）：",
    docsTemplateLogical: "逻辑推理（默认）",
    docsTemplateLogicalDesc: "逻辑推理（默认）",
    docsTemplateSummary: "内容总结",
    docsTemplateSummaryDesc: "内容总结",
    docsTemplateCodeBeginner: "代码入门",
    docsTemplateCodeBeginnerDesc: "代码入门",
    docsTemplateCodeAdvanced: "高级编程",
    docsTemplateCodeAdvancedDesc: "高级编程",
    docsIntegration: "集成示例",
    docsPythonSDK: "Python (OpenAI SDK)",
    docsJavaScriptSDK: "JavaScript (Node.js)",
    docsRequired: "必需",
    docsOptional: "可选",
    deployMethodGithub: "方式一：GitHub 自动部署",
    deployMethodCli: "命令行部署",
    deployEnvVarName: "变量名",
    deployEnvDescription: "说明",
    deployEnvDefaultValue: "默认值",
    deployOtherVars: "其他可选变量",
    deployCurrentAddr: "当前部署地址",
    deployRunning: "已部署并运行中",
    deployCreateFile: "创建 dphn2api.ts 文件",
    deployCreateFileDesc: "复制完整的 dphn2api.ts 代码到你的项目",
    deployLogin: "登录 Deno Deploy",
    deployLoginDesc: "访问",
    deployCreateProject: "创建新项目",
    deployCreateProjectDesc: "点击 \"New Project\"，选择你的仓库，入口文件选择",
    deployConfigEnv: "配置环境变量",
    deployConfigEnvDesc: "在项目设置中添加环境变量（见下方说明）",
    deployComplete: "部署完成！",
    deployCompleteDesc: "Deno Deploy 会自动部署，几秒钟后即可访问",
    deployEnvConfig: "环境变量配置",
    deployKeyRecommend: "推荐设置",
    deployKeyDesc: "客户端调用 API 时需要的密钥。",
    deployKeyDefault: "默认值：",
    deployKeySuggestion: "建议设置为复杂的随机字符串，例如：",
    deployModelNameVar: "模型显示名称（默认：Dolphin 24B）",
    deployModelNameDesc: "模型显示名称（默认：Dolphin 24B）",
    deployTemplateDesc: "默认模板（默认：logical）",
    deployDebugDesc: "调试模式（默认：false，生产环境建议关闭）",
    deployStreamDesc: "默认流式响应（默认：true）",
    deployDashboardDesc: "启用 Dashboard（默认：true）",
    deployUsageTitle: "使用示例",
    deployUsageDesc: "部署完成后，使用以下代码调用 API：",
    deployUsageNote: "确保使用你在环境变量中设置的 DPHN_DEFAULT_KEY 作为 api_key",
    deployTipNote: "提示：",
    deployTipTitle: "小贴士",
    deployTip1: "Deno Deploy 提供免费额度，适合个人使用",
    deployTip2: "每次 git push 后会自动重新部署",
    deployTip3: "支持自定义域名（在项目设置中配置）",
    deployTip4: "生产环境建议关闭 DEBUG_MODE 以减少日志输出",
    deployTip5: "可在 Deno Deploy 控制台查看实时日志和监控",
    deployToDenoBtn: "立即部署到 Deno Deploy",
    poweredBy: "Powered by",
    backHome: "返回首页",
    github: "GitHub",
    discussion: "交流反馈",
    exampleMessage: "你好",
    exampleMessageLong: "你好，请介绍一下你自己",
  },
  "en-US": {
    home: "Home",
    docs: "Docs",
    playground: "Playground",
    deploy: "Deploy",
    dashboard: "Dashboard",
    homeTitle: "Dolphin AI API Proxy",
    homeDesc: "OpenAI-Compatible Dolphin AI API Service",
    statusTitle: "Service Status",
    apiEndpoint: "API Endpoint",
    model: "Model",
    apiKey: "API Key",
    quickStart: "Quick Start",
    viewDocs: "View Full API Documentation",
    onlineTest: "Test API Online",
    deployNow: "Deploy Now",
    viewStats: "View Statistics",
    docsCardDesc: "Complete API documentation and examples",
    playgroundCardDesc: "Test API requests and responses online",
    deployCardDesc: "Quick deploy to Deno Deploy",
    dashboardCardDesc: "Real-time monitoring and statistics",
    docsTitle: "API Documentation",
    docsSubtitle: "Complete usage guide and code examples",
    playgroundTitle: "Playground",
    playgroundDesc: "Test Dolphin AI API Online",
    playgroundSubtitle: "Test API Online",
    requestConfig: "Request Configuration",
    temperature: "Temperature",
    maxTokens: "Max Tokens",
    enableStream: "Enable Streaming",
    system: "System (Optional)",
    systemPlaceholder: "You are a helpful AI assistant...",
    systemDesc: "System prompt for setting role and behavior",
    message: "Message",
    messagePlaceholder: "Enter your question...",
    messageDesc: "User message content",
    sendBtn: "🚀 Send Request",
    sending: "⏳ Sending...",
    clearBtn: "🗑️ Clear Response",
    responseTitle: "Response Result",
    responseContent: "Response Content",
    copy: "📋 Copy",
    copied: "✅ Copied",
    emptyTitle: "Waiting for Request",
    emptyDesc: "Configure parameters and click 'Send Request' to test",
    loadingTitle: "Requesting...",
    loadingDesc: "Please wait",
    errorTitle: "Request Failed",
    errorEmpty: "Please enter message content",
    duration: "Duration",
    status: "Status",
    examplesTitle: "Examples",
    exampleSimple: "Simple Chat",
    exampleSimpleDesc: "Single-turn conversation example",
    exampleMulti: "Multi-turn Chat",
    exampleMultiDesc: "Conversation with history",
    exampleSummary: "Content Summary",
    exampleSummaryDesc: "Using summary template",
    exampleCode: "Code Generation",
    exampleCodeDesc: "Using code-advanced template",
    deployTitle: "Deployment Guide",
    deployDesc: "Deploy to Deno Deploy with one click",
    deploySubtitle: "Deploy to Deno Deploy with one click",
    deployQuick: "Quick Deploy",
    deployGithub: "Option 1: GitHub Auto Deploy",
    deployStep1: "Fork this project to your GitHub",
    deployStep2: "Visit Deno Deploy",
    deployStep3: "Create new project, select your GitHub repository",
    deployStep4: "Set entry file (refer to project README)",
    deployStep5: "Configure environment variables",
    deployStep6: "Deploy complete!",
    deployCli: "Command Line Deploy",
    deployCliDesc: "Deploy using deployctl:",
    deployEnv: "Environment Variables",
    deployEnvVar: "Variable",
    deployEnvDesc: "Description",
    deployEnvDefault: "Default",
    deployLocal: "Local Run",
    dashboardTitle: "Dashboard",
    dashboardDesc: "Real-time monitoring and statistics",
    dashboardSubtitle: "Real-time monitoring and statistics",
    dashboardOverview: "Overview",
    dashboardTotalReq: "Total Requests",
    dashboardSuccess: "Success Rate",
    dashboardAvgTime: "Avg Response Time",
    dashboardUptime: "Uptime",
    dashboardTopModels: "Top Models",
    dashboardRecentReq: "Recent Requests",
    dashboardTime: "Time",
    dashboardMethod: "Method",
    dashboardPath: "Path",
    dashboardStatus: "Status",
    dashboardDuration: "Duration",
    dashboardModel: "Model",
    dashboardNoData: "No requests yet",
    dashboardSuccessReq: "Successful Requests",
    dashboardFailedReq: "Failed Requests",
    dashboardApiCalls: "API Calls",
    dashboardRealTimeMonitor: "Real-time API request and performance monitoring",
    dashboardApiStats: "API Statistics",
    dashboardChatCompletions: "Chat Completions",
    dashboardModelsQuery: "Models Query",
    dashboardStreamingReq: "Streaming Requests",
    dashboardNonStreamingReq: "Non-Streaming Requests",
    dashboardPerformance: "Performance Metrics",
    dashboardAvgResponse: "Avg Response",
    dashboardFastestResponse: "Fastest Response",
    dashboardSlowestResponse: "Slowest Response",
    dashboardSuccessRate: "Success Rate",
    dashboardSystemInfo: "System Info",
    dashboardRuntime: "Runtime",
    dashboardLastRequest: "Last Request",
    dashboardStreamRatio: "Streaming/Non-Streaming",
    dashboardModelsCount: "Models Calls",
    dashboardHistoryTrend: "History Trend",
    dashboardHistoryLast1h: "History Trend (Last 1 Hour)",
    dashboardNoHistoryData: "No historical data available",
    dashboardNoHistoryDesc: "Data is recorded every minute, please check back later",
    dashboardTopModelsTop3: "Top 3 Popular Models",
    dashboardRealTime: "Real-time Requests",
    dashboardAutoRefresh: "Auto Refresh (Every 5s)",
    dashboardEmptyRequest: "No request records",
    dashboardPaginationTotal: "Total",
    dashboardPaginationRecords: "records, Page",
    dashboardPaginationPage: "",
    dashboardPaginationPerPage: "Per page:",
    dashboardPrevPage: "Previous",
    dashboardNextPage: "Next",
    dashboardChartTotalReq: "Total Requests",
    dashboardChartSuccessRate: "Success Rate(%)",
    dashboardChartAvgTime: "Avg Response Time(ms)",
    dashboardChartReqCount: "Requests / Success Rate",
    dashboardChartResponseTime: "Response Time(ms)",
    docsOverview: "Overview",
    docsOverviewDesc: "Dphn2Api is a proxy server providing OpenAI-compatible API interface for Dolphin AI.",
    docsBaseUrl: "Base URL",
    docsAuth: "Authentication",
    docsAuthDesc: "All API requests must include a Bearer Token in the request header:",
    docsApiEndpoints: "API Endpoints",
    docsGetModels: "Get available models list",
    docsGetModelsDesc: "Get available models list",
    docsPostChat: "Create chat completion (supports streaming and non-streaming)",
    docsPostChatDesc: "Create chat completion (supports streaming and non-streaming)",
    docsRequestParams: "Request Parameters",
    docsParamModel: "string, required - Model name (e.g.",
    docsParamModelDesc: "string, required - Model name (e.g.",
    docsParamMessages: "array, required - Message list",
    docsParamMessagesDesc: "array, required - Message list",
    docsParamStream: "boolean, optional - Enable streaming (default:",
    docsParamStreamDesc: "boolean, optional - Enable streaming (default:",
    docsRequestExample: "Request Example",
    docsTemplateTypes: "Template Types",
    docsTemplateDesc: "Dolphin AI supports the following template types (configured via DPHN_DEFAULT_TEMPLATE environment variable):",
    docsTemplateLogical: "Logical reasoning (default)",
    docsTemplateLogicalDesc: "Logical reasoning (default)",
    docsTemplateSummary: "Content summary",
    docsTemplateSummaryDesc: "Content summary",
    docsTemplateCodeBeginner: "Code beginner",
    docsTemplateCodeBeginnerDesc: "Code beginner",
    docsTemplateCodeAdvanced: "Advanced programming",
    docsTemplateCodeAdvancedDesc: "Advanced programming",
    docsIntegration: "Integration Examples",
    docsPythonSDK: "Python (OpenAI SDK)",
    docsJavaScriptSDK: "JavaScript (Node.js)",
    docsRequired: "required",
    docsOptional: "optional",
    deployMethodGithub: "Method 1: GitHub Auto Deploy",
    deployMethodCli: "Command Line Deploy",
    deployEnvVarName: "Variable",
    deployEnvDescription: "Description",
    deployEnvDefaultValue: "Default",
    deployOtherVars: "Other Optional Variables",
    deployCurrentAddr: "Current Deployment Address",
    deployRunning: "Deployed and running",
    deployCreateFile: "Create dphn2api.ts file",
    deployCreateFileDesc: "Copy the complete dphn2api.ts code to your project",
    deployLogin: "Login to Deno Deploy",
    deployLoginDesc: "Visit",
    deployCreateProject: "Create new project",
    deployCreateProjectDesc: "Click \"New Project\", select your repository, choose entry file",
    deployConfigEnv: "Configure environment variables",
    deployConfigEnvDesc: "Add environment variables in project settings (see below)",
    deployComplete: "Deployment complete!",
    deployCompleteDesc: "Deno Deploy will automatically deploy, accessible in seconds",
    deployEnvConfig: "Environment Variables Configuration",
    deployKeyRecommend: "Recommended",
    deployKeyDesc: "API key required when clients call the API.",
    deployKeyDefault: "Default:",
    deployKeySuggestion: "Recommended to set a complex random string, e.g.:",
    deployModelNameVar: "Model display name (default: Dolphin 24B)",
    deployModelNameDesc: "Model display name (default: Dolphin 24B)",
    deployTemplateDesc: "Default template (default: logical)",
    deployDebugDesc: "Debug mode (default: false, recommended to disable in production)",
    deployStreamDesc: "Default streaming response (default: true)",
    deployDashboardDesc: "Enable Dashboard (default: true)",
    deployUsageTitle: "Usage Example",
    deployUsageDesc: "After deployment, use the following code to call the API:",
    deployUsageNote: "Make sure to use the DPHN_DEFAULT_KEY set in environment variables as api_key",
    deployTipNote: "Note:",
    deployTipTitle: "Tips",
    deployTip1: "Deno Deploy provides free tier, suitable for personal use",
    deployTip2: "Automatically redeploys after each git push",
    deployTip3: "Supports custom domains (configure in project settings)",
    deployTip4: "Recommended to disable DEBUG_MODE in production to reduce log output",
    deployTip5: "View real-time logs and monitoring in Deno Deploy console",
    deployToDenoBtn: "Deploy to Deno Deploy Now",
    poweredBy: "Powered by",
    backHome: "Back to Home",
    github: "GitHub",
    discussion: "Discussion & Feedback",
    exampleMessage: "Hello",
    exampleMessageLong: "Hello, please introduce yourself",
  },
  "ja-JP": {
    home: "ホーム",
    docs: "ドキュメント",
    playground: "Playground",
    deploy: "デプロイ",
    dashboard: "Dashboard",
    homeTitle: "Dolphin AI APIプロキシ",
    homeDesc: "OpenAI互換のDolphin AIサービス",
    statusTitle: "サービスステータス",
    apiEndpoint: "APIエンドポイント",
    model: "モデル",
    apiKey: "APIキー",
    quickStart: "クイックスタート",
    viewDocs: "完全なAPIドキュメントを表示",
    onlineTest: "APIをオンラインでテスト",
    deployNow: "今すぐデプロイ",
    viewStats: "統計を表示",
    docsCardDesc: "完全なAPIドキュメントとサンプル",
    playgroundCardDesc: "APIリクエストとレスポンスをオンラインでテスト",
    deployCardDesc: "Deno Deployに素早くデプロイ",
    dashboardCardDesc: "リアルタイム監視と統計情報",
    docsTitle: "APIドキュメント",
    docsSubtitle: "完全な使用ガイドとコード例",
    playgroundTitle: "Playground",
    playgroundDesc: "Dolphin AI APIをオンラインでテスト",
    playgroundSubtitle: "APIをオンラインでテスト",
    requestConfig: "リクエスト設定",
    temperature: "Temperature",
    maxTokens: "Max Tokens",
    enableStream: "ストリーミングを有効化",
    system: "System（オプション）",
    systemPlaceholder: "あなたは親切なAIアシスタントです...",
    systemDesc: "役割と動作を設定するシステムプロンプト",
    message: "Message",
    messagePlaceholder: "質問を入力してください...",
    messageDesc: "ユーザーメッセージの内容",
    sendBtn: "🚀 リクエスト送信",
    sending: "⏳ 送信中...",
    clearBtn: "🗑️ レスポンスをクリア",
    responseTitle: "レスポンス結果",
    responseContent: "レスポンス内容",
    copy: "📋 コピー",
    copied: "✅ コピーしました",
    emptyTitle: "リクエスト待機中",
    emptyDesc: "パラメータを設定して「リクエスト送信」をクリックしてテスト開始",
    loadingTitle: "リクエスト中...",
    loadingDesc: "お待ちください",
    errorTitle: "リクエスト失敗",
    errorEmpty: "メッセージ内容を入力してください",
    duration: "所要時間",
    status: "ステータス",
    examplesTitle: "サンプル",
    exampleSimple: "シンプルな会話",
    exampleSimpleDesc: "シングルターン会話の例",
    exampleMulti: "マルチターン会話",
    exampleMultiDesc: "履歴付きの会話",
    exampleSummary: "コンテンツ要約",
    exampleSummaryDesc: "要約テンプレートを使用",
    exampleCode: "コード生成",
    exampleCodeDesc: "code-advancedテンプレートを使用",
    deployTitle: "デプロイガイド",
    deployDesc: "ワンクリックでDeno Deployにデプロイ",
    deploySubtitle: "ワンクリックでDeno Deployにデプロイ",
    deployQuick: "クイックデプロイ",
    deployGithub: "方法1：GitHub自動デプロイ",
    deployStep1: "このプロジェクトをあなたのGitHubにフォーク",
    deployStep2: "Deno Deployにアクセス",
    deployStep3: "新しいプロジェクトを作成し、GitHubリポジトリを選択",
    deployStep4: "エントリーファイルを設定（プロジェクトのREADMEを参照）",
    deployStep5: "環境変数を設定",
    deployStep6: "デプロイ完了！",
    deployCli: "コマンドラインでデプロイ",
    deployCliDesc: "deployctlを使用してデプロイ：",
    deployEnv: "環境変数設定",
    deployEnvVar: "変数名",
    deployEnvDesc: "説明",
    deployEnvDefault: "デフォルト値",
    deployLocal: "ローカル実行",
    dashboardTitle: "Dashboard",
    dashboardDesc: "リアルタイム監視と統計",
    dashboardSubtitle: "リアルタイム監視と統計",
    dashboardOverview: "概要",
    dashboardTotalReq: "総リクエスト数",
    dashboardSuccess: "成功率",
    dashboardAvgTime: "平均レスポンス時間",
    dashboardUptime: "稼働時間",
    dashboardTopModels: "人気モデル",
    dashboardRecentReq: "最近のリクエスト",
    dashboardTime: "時間",
    dashboardMethod: "メソッド",
    dashboardPath: "パス",
    dashboardStatus: "ステータス",
    dashboardDuration: "所要時間",
    dashboardModel: "モデル",
    dashboardNoData: "まだリクエストがありません",
    dashboardSuccessReq: "成功リクエスト",
    dashboardFailedReq: "失敗リクエスト",
    dashboardApiCalls: "API呼び出し",
    dashboardRealTimeMonitor: "リアルタイムAPIリクエストとパフォーマンス監視",
    dashboardApiStats: "API統計",
    dashboardChatCompletions: "チャット補完",
    dashboardModelsQuery: "モデルクエリ",
    dashboardStreamingReq: "ストリーミングリクエスト",
    dashboardNonStreamingReq: "非ストリーミングリクエスト",
    dashboardPerformance: "パフォーマンス指標",
    dashboardAvgResponse: "平均レスポンス",
    dashboardFastestResponse: "最速レスポンス",
    dashboardSlowestResponse: "最遅レスポンス",
    dashboardSuccessRate: "成功率",
    dashboardSystemInfo: "システム情報",
    dashboardRuntime: "稼働時間",
    dashboardLastRequest: "最後のリクエスト",
    dashboardStreamRatio: "ストリーミング/非ストリーミング",
    dashboardModelsCount: "モデル呼び出し",
    dashboardHistoryTrend: "履歴トレンド",
    dashboardHistoryLast1h: "履歴トレンド（最近1時間）",
    dashboardNoHistoryData: "履歴データがありません",
    dashboardNoHistoryDesc: "システムは毎分データを記録します。後でご確認ください",
    dashboardTopModelsTop3: "人気モデルTop 3",
    dashboardRealTime: "リアルタイムリクエスト",
    dashboardAutoRefresh: "自動更新（5秒ごと）",
    dashboardEmptyRequest: "リクエスト記録がありません",
    dashboardPaginationTotal: "合計",
    dashboardPaginationRecords: "件、ページ",
    dashboardPaginationPage: "",
    dashboardPaginationPerPage: "ページあたり:",
    dashboardPrevPage: "前へ",
    dashboardNextPage: "次へ",
    dashboardChartTotalReq: "総リクエスト数",
    dashboardChartSuccessRate: "成功率(%)",
    dashboardChartAvgTime: "平均レスポンス時間(ms)",
    dashboardChartReqCount: "リクエスト数 / 成功率",
    dashboardChartResponseTime: "レスポンス時間(ms)",
    docsOverview: "概要",
    docsOverviewDesc: "Dphn2ApiはDolphin AI向けにOpenAI互換APIインターフェースを提供するプロキシサーバーです。",
    docsBaseUrl: "ベースURL",
    docsAuth: "認証",
    docsAuthDesc: "すべてのAPIリクエストにはリクエストヘッダーにBearer Tokenを含める必要があります：",
    docsApiEndpoints: "APIエンドポイント",
    docsGetModels: "利用可能なモデルリストを取得",
    docsGetModelsDesc: "利用可能なモデルリストを取得",
    docsPostChat: "チャット完了を作成（ストリーミングと非ストリーミングに対応）",
    docsPostChatDesc: "チャット完了を作成（ストリーミングと非ストリーミングに対応）",
    docsRequestParams: "リクエストパラメータ",
    docsParamModel: "string, 必須 - モデル名（例：",
    docsParamModelDesc: "string, 必須 - モデル名（例：",
    docsParamMessages: "array, 必須 - メッセージリスト",
    docsParamMessagesDesc: "array, 必須 - メッセージリスト",
    docsParamStream: "boolean, オプション - ストリーミングを有効化（デフォルト：",
    docsParamStreamDesc: "boolean, オプション - ストリーミングを有効化（デフォルト：",
    docsRequestExample: "リクエスト例",
    docsTemplateTypes: "テンプレートタイプ",
    docsTemplateDesc: "Dolphin AIは以下のテンプレートタイプをサポートしています（環境変数DPHN_DEFAULT_TEMPLATEで設定）：",
    docsTemplateLogical: "論理的推論（デフォルト）",
    docsTemplateLogicalDesc: "論理的推論（デフォルト）",
    docsTemplateSummary: "コンテンツ要約",
    docsTemplateSummaryDesc: "コンテンツ要約",
    docsTemplateCodeBeginner: "コード初心者",
    docsTemplateCodeBeginnerDesc: "コード初心者",
    docsTemplateCodeAdvanced: "高度なプログラミング",
    docsTemplateCodeAdvancedDesc: "高度なプログラミング",
    docsIntegration: "統合例",
    docsPythonSDK: "Python (OpenAI SDK)",
    docsJavaScriptSDK: "JavaScript (Node.js)",
    docsRequired: "必須",
    docsOptional: "オプション",
    deployMethodGithub: "方法1：GitHub自動デプロイ",
    deployMethodCli: "コマンドラインでデプロイ",
    deployEnvVarName: "変数名",
    deployEnvDescription: "説明",
    deployEnvDefaultValue: "デフォルト値",
    deployOtherVars: "その他のオプション変数",
    deployCurrentAddr: "現在のデプロイアドレス",
    deployRunning: "デプロイ済みで実行中",
    deployCreateFile: "dphn2api.tsファイルを作成",
    deployCreateFileDesc: "完全なdphn2api.tsコードをプロジェクトにコピー",
    deployLogin: "Deno Deployにログイン",
    deployLoginDesc: "アクセス",
    deployCreateProject: "新しいプロジェクトを作成",
    deployCreateProjectDesc: "「New Project」をクリックし、リポジトリを選択、エントリーファイルを選択",
    deployConfigEnv: "環境変数を設定",
    deployConfigEnvDesc: "プロジェクト設定で環境変数を追加（下記参照）",
    deployComplete: "デプロイ完了！",
    deployCompleteDesc: "Deno Deployが自動的にデプロイし、数秒でアクセス可能",
    deployEnvConfig: "環境変数設定",
    deployKeyRecommend: "推奨",
    deployKeyDesc: "クライアントがAPIを呼び出す際に必要なキー。",
    deployKeyDefault: "デフォルト：",
    deployKeySuggestion: "複雑なランダム文字列に設定することを推奨、例：",
    deployModelNameVar: "モデル表示名（デフォルト：Dolphin 24B）",
    deployModelNameDesc: "モデル表示名（デフォルト：Dolphin 24B）",
    deployTemplateDesc: "デフォルトテンプレート（デフォルト：logical）",
    deployDebugDesc: "デバッグモード（デフォルト：false、本番環境では無効化推奨）",
    deployStreamDesc: "デフォルトストリーミングレスポンス（デフォルト：true）",
    deployDashboardDesc: "Dashboardを有効化（デフォルト：true）",
    deployUsageTitle: "使用例",
    deployUsageDesc: "デプロイ後、以下のコードでAPIを呼び出します：",
    deployUsageNote: "環境変数で設定したDPHN_DEFAULT_KEYをapi_keyとして使用してください",
    deployTipNote: "ヒント：",
    deployTipTitle: "小ヒント",
    deployTip1: "Deno Deployは無料枠を提供しており、個人利用に適しています",
    deployTip2: "git pushするたびに自動的に再デプロイされます",
    deployTip3: "カスタムドメインをサポート（プロジェクト設定で構成）",
    deployTip4: "本番環境ではDEBUG_MODEを無効にしてログ出力を減らすことを推奨",
    deployTip5: "Deno Deployコンソールでリアルタイムログと監視を確認できます",
    deployToDenoBtn: "今すぐDeno Deployにデプロイ",
    poweredBy: "Powered by",
    backHome: "ホームに戻る",
    github: "GitHub",
    discussion: "フィードバック",
    exampleMessage: "こんにちは",
    exampleMessageLong: "こんにちは、自己紹介をお願いします",
  },
};

function getTranslations(lang: Language = "zh-CN"): I18nText {
  return translations[lang] || translations["zh-CN"];
}

function detectLanguage(acceptLanguage: string): Language {
  if (acceptLanguage.includes("en")) return "en-US";
  if (acceptLanguage.includes("ja")) return "ja-JP";
  if (acceptLanguage.includes("zh")) return "zh-CN";
  return "zh-CN";
}

// ============================================================================
// SEO 配置
// ============================================================================

const SEO_CONFIG = {
  title: "Dphn2Api - Dolphin AI OpenAI兼容API代理",
  description: "Dolphin AI 的 OpenAI 兼容 API 代理服务，支持多种模型和流式响应",
  keywords: "Dolphin AI,OpenAI,API,Proxy,AI,GPT,Deno,TypeScript,24B,Logical,Summary,Code",
  author: "Dphn2Api",
  ogImage: "",
};

function getSeoMeta(pageTitle: string, pageDesc: string, currentUrl: string, lang: Language = "zh-CN"): string {
  const title = `${pageTitle} - ${SEO_CONFIG.title}`;
  const description = pageDesc || SEO_CONFIG.description;

  return `
    <!-- SEO Meta Tags -->
    <meta name="description" content="${description}">
    <meta name="keywords" content="${SEO_CONFIG.keywords}">
    <meta name="author" content="${SEO_CONFIG.author}">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${currentUrl}">
    ${SEO_CONFIG.ogImage ? `<meta property="og:image" content="${SEO_CONFIG.ogImage}">` : ""}
    <meta property="og:locale" content="${lang}">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    ${SEO_CONFIG.ogImage ? `<meta name="twitter:image" content="${SEO_CONFIG.ogImage}">` : ""}

    <!-- Additional SEO -->
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${currentUrl}">
  `;
}

function getLanguageSwitcher(currentLang: Language = "zh-CN"): string {
  return `
    <div class="lang-switcher">
        <select id="langSelect" onchange="window.location.href='?lang='+this.value">
            <option value="zh-CN" ${currentLang === "zh-CN" ? "selected" : ""}>🇨🇳 中文</option>
            <option value="en-US" ${currentLang === "en-US" ? "selected" : ""}>🇺🇸 English</option>
            <option value="ja-JP" ${currentLang === "ja-JP" ? "selected" : ""}>🇯🇵 日本語</option>
        </select>
    </div>
  `;
}

// ============================================================================
// 页面生成函数
// ============================================================================

function getHomePage(lang: Language, t: I18nText, currentUrl: string): string {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.homeTitle} - Dphn2Api</title>
    ${getSeoMeta(t.homeTitle, t.homeDesc, currentUrl, lang)}
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
        }
        /* Language Switcher */
        .lang-switcher {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        .lang-switcher select {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
    ${getLanguageSwitcher(lang)}

    <div class="container mx-auto px-4 py-12 max-w-4xl">
        <!-- Header -->
        <div class="text-center mb-12 animate-fade-in">
            <div class="text-7xl mb-4">🐬</div>
            <h1 class="text-5xl font-bold text-white mb-3 drop-shadow-lg">Dphn2Api</h1>
            <p class="text-xl text-blue-100">${t.homeDesc}</p>
        </div>

        <!-- Status Card -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl animate-fade-in">
            <h2 class="text-2xl font-bold text-white mb-6">${t.statusTitle}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center">
                    <div class="text-white/80 mb-2">${t.apiEndpoint}</div>
                    <div class="text-white font-mono text-sm break-all">/v1/chat/completions</div>
                </div>
                <div class="text-center">
                    <div class="text-white/80 mb-2">${t.model}</div>
                    <div class="text-white font-mono text-sm">${MODEL_NAME}</div>
                </div>
                <div class="text-center">
                    <div class="text-white/80 mb-2">${t.apiKey}</div>
                    <div class="text-white font-mono text-sm">${DEFAULT_KEY}</div>
                </div>
            </div>
        </div>

        <!-- Quick Start -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl animate-fade-in">
            <h2 class="text-2xl font-bold text-white mb-6">${t.quickStart}</h2>
            <div class="grid md:grid-cols-2 gap-4">
                <a href="/docs?lang=${lang}" class="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition">
                    <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">📖</div>
                    <h3 class="text-white text-xl font-bold mb-2">${t.docs}</h3>
                    <p class="text-blue-100 text-sm">${t.docsCardDesc}</p>
                </a>
                <a href="/playground?lang=${lang}" class="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition">
                    <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">🎮</div>
                    <h3 class="text-white text-xl font-bold mb-2">${t.playground}</h3>
                    <p class="text-blue-100 text-sm">${t.playgroundCardDesc}</p>
                </a>
                <a href="/deploy?lang=${lang}" class="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition">
                    <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">🚀</div>
                    <h3 class="text-white text-xl font-bold mb-2">${t.deploy}</h3>
                    <p class="text-blue-100 text-sm">${t.deployCardDesc}</p>
                </a>
                <a href="/dashboard?lang=${lang}" class="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition">
                    <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">📊</div>
                    <h3 class="text-white text-xl font-bold mb-2">${t.dashboard}</h3>
                    <p class="text-blue-100 text-sm">${t.dashboardCardDesc}</p>
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center text-white/60 text-sm">
            <p>${t.poweredBy} <span class="font-semibold text-white">Deno 🦕</span> | <a href="https://linux.do/t/topic/1002983/1" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:underline">💬 ${t.discussion}</a> | <a href="https://github.com/dext7r/ZtoApi/blob/main/deno/dphn/dphn2api.ts" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:underline">⭐ ${t.github}</a></p>
        </div>
    </div>
</body>
</html>`;
}

function getDocsPage(lang: Language, t: I18nText, currentUrl: string): string {
  const seoMeta = getSeoMeta(t.docsTitle, t.docsSubtitle, currentUrl, lang);
  const langSwitcher = getLanguageSwitcher(lang);

  // 插入 SEO meta 标签和语言切换器
  let html = apiDocsHTML
    .replace('<html lang="zh-CN">', `<html lang="${lang}">`)
    .replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    ${seoMeta}`
    )
    .replace('<body class="bg-gray-50">', `<body class="bg-gray-50">\n${langSwitcher}`)
    // Navigation
    .replace('<a href="/" class="text-gray-600 hover:text-blue-600 transition">首页</a>', `<a href="/?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.home}</a>`)
    .replace('<a href="/docs" class="text-blue-600 font-semibold">文档</a>', `<a href="/docs?lang=${lang}" class="text-blue-600 font-semibold">${t.docs}</a>`)
    .replace('<a href="/playground" class="text-gray-600 hover:text-blue-600 transition">Playground</a>', `<a href="/playground?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.playground}</a>`)
    .replace('<a href="/deploy" class="text-gray-600 hover:text-blue-600 transition">部署</a>', `<a href="/deploy?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.deploy}</a>`)
    .replace('<a href="/dashboard" class="text-gray-600 hover:text-blue-600 transition">Dashboard</a>', `<a href="/dashboard?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.dashboard}</a>`)
    // Page title
    .replace('<h1 class="text-4xl font-bold text-gray-900 mb-3">📖 API Documentation</h1>', `<h1 class="text-4xl font-bold text-gray-900 mb-3">📖 ${t.docsTitle}</h1>`)
    .replace('<p class="text-gray-600">OpenAI 兼容的 API 接口文档</p>', `<p class="text-gray-600">${t.docsSubtitle}</p>`)
    // Overview section
    .replace('<h2 class="text-2xl font-bold text-gray-900 mb-4">概述</h2>', `<h2 class="text-2xl font-bold text-gray-900 mb-4">${t.docsOverview}</h2>`)
    .replace('<p class="text-gray-700 mb-4">Dphn2Api 是一个为 Dolphin AI 提供 OpenAI 兼容 API 接口的代理服务器。</p>', `<p class="text-gray-700 mb-4">${t.docsOverviewDesc}</p>`)
    .replace('<p class="text-sm text-gray-600 mb-2">基础 URL</p>', `<p class="text-sm text-gray-600 mb-2">${t.docsBaseUrl}</p>`)
    // Authentication section
    .replace('<h2 class="text-2xl font-bold text-gray-900 mb-4">🔐 身份验证</h2>', `<h2 class="text-2xl font-bold text-gray-900 mb-4">🔐 ${t.docsAuth}</h2>`)
    .replace('<p class="text-gray-700 mb-4">所有 API 请求都需要在请求头中包含 Bearer Token：</p>', `<p class="text-gray-700 mb-4">${t.docsAuthDesc}</p>`)
    // API Endpoints section
    .replace('<h2 class="text-2xl font-bold text-gray-900 mb-6">🔌 API 端点</h2>', `<h2 class="text-2xl font-bold text-gray-900 mb-6">🔌 ${t.docsApiEndpoints}</h2>`)
    .replace('<p class="text-gray-700 mb-3">获取可用模型列表</p>', `<p class="text-gray-700 mb-3">${t.docsGetModelsDesc}</p>`)
    .replace('<p class="text-gray-700 mb-4">创建聊天完成（支持流式和非流式）</p>', `<p class="text-gray-700 mb-4">${t.docsPostChatDesc}</p>`)
    // Request parameters
    .replace('<h4 class="font-semibold text-gray-900 mb-3">请求参数</h4>', `<h4 class="font-semibold text-gray-900 mb-3">${t.docsRequestParams}</h4>`)
    .replace('string, 必需 - 模型名称 (如', `${t.docsParamModel}`)
    .replace('array, 必需 - 消息列表', `${t.docsParamMessages}`)
    .replace('boolean, 可选 - 是否流式响应（默认:', `${t.docsParamStream}`)
    // Request example
    .replace('<h4 class="font-semibold text-gray-900 mb-3">请求示例</h4>', `<h4 class="font-semibold text-gray-900 mb-3">${t.docsRequestExample}</h4>`)
    // Template types
    .replace('<h4 class="font-semibold text-gray-900 mb-3">模板类型</h4>', `<h4 class="font-semibold text-gray-900 mb-3">${t.docsTemplateTypes}</h4>`)
    .replace('<p class="text-gray-700 mb-3">Dolphin AI 支持以下模板类型（通过环境变量 DPHN_DEFAULT_TEMPLATE 配置）：</p>', `<p class="text-gray-700 mb-3">${t.docsTemplateDesc}</p>`)
    .replace('<p class="text-xs text-gray-600 mt-1">逻辑推理（默认）</p>', `<p class="text-xs text-gray-600 mt-1">${t.docsTemplateLogicalDesc}</p>`)
    .replace('<p class="text-xs text-gray-600 mt-1">内容总结</p>', `<p class="text-xs text-gray-600 mt-1">${t.docsTemplateSummaryDesc}</p>`)
    .replace('<p class="text-xs text-gray-600 mt-1">代码入门</p>', `<p class="text-xs text-gray-600 mt-1">${t.docsTemplateCodeBeginnerDesc}</p>`)
    .replace('<p class="text-xs text-gray-600 mt-1">高级编程</p>', `<p class="text-xs text-gray-600 mt-1">${t.docsTemplateCodeAdvancedDesc}</p>`)
    // Integration examples
    .replace('<h2 class="text-2xl font-bold text-gray-900 mb-4">💡 集成示例</h2>', `<h2 class="text-2xl font-bold text-gray-900 mb-4">💡 ${t.docsIntegration}</h2>`)
    .replace('<h3 class="text-lg font-semibold text-gray-800 mb-3">Python (OpenAI SDK)</h3>', `<h3 class="text-lg font-semibold text-gray-800 mb-3">${t.docsPythonSDK}</h3>`)
    .replace('<h3 class="text-lg font-semibold text-gray-800 mb-3">JavaScript (Node.js)</h3>', `<h3 class="text-lg font-semibold text-gray-800 mb-3">${t.docsJavaScriptSDK}</h3>`)
    // Replace example messages
    .replaceAll('"你好"', `"${t.exampleMessage}"`)
    // Footer
    .replace('Powered by', t.poweredBy)
    .replace('<a href="/" class="text-blue-600 hover:underline">返回首页</a>', `<a href="/?lang=${lang}" class="text-blue-600 hover:underline">${t.backHome}</a>`)
    .replace('💬 交流反馈', `💬 ${t.discussion}`)
    .replace('⭐ GitHub', `⭐ ${t.github}`);

  return html;
}

function getPlaygroundPage(lang: Language, t: I18nText, currentUrl: string): string {
  const seoMeta = getSeoMeta(t.playgroundTitle, t.playgroundSubtitle, currentUrl, lang);
  const langSwitcher = getLanguageSwitcher(lang);

  let html = playgroundHTML
    .replace('<html lang="zh-CN">', `<html lang="${lang}">`)
    .replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    ${seoMeta}`
    )
    .replace('<body class="bg-gray-50">', `<body class="bg-gray-50">\n${langSwitcher}`)
    .replace(/<a href="\/" class="text-gray-600 hover:text-blue-600 transition">首页<\/a>/, `<a href="/?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.home}</a>`)
    .replace(/<a href="\/docs" class="text-gray-600 hover:text-blue-600 transition">文档<\/a>/, `<a href="/docs?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.docs}</a>`)
    .replace(/<a href="\/playground" class="text-blue-600 font-semibold">Playground<\/a>/, `<a href="/playground?lang=${lang}" class="text-blue-600 font-semibold">${t.playground}</a>`)
    .replace(/<a href="\/deploy" class="text-gray-600 hover:text-blue-600 transition">部署<\/a>/, `<a href="/deploy?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.deploy}</a>`)
    .replace(/<a href="\/dashboard" class="text-gray-600 hover:text-blue-600 transition">Dashboard<\/a>/, `<a href="/dashboard?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.dashboard}</a>`)
    // Page title and subtitle
    .replace('<h1 class="text-4xl font-bold text-gray-900 mb-3">🎮 Playground</h1>', `<h1 class="text-4xl font-bold text-gray-900 mb-3">🎮 ${t.playgroundTitle}</h1>`)
    .replace('<p class="text-gray-600">在线测试 Dolphin AI API 请求和响应</p>', `<p class="text-gray-600">${t.playgroundSubtitle}</p>`)
    // Request config section
    .replace('<span class="text-2xl mr-2">📤</span> 请求配置', `<span class="text-2xl mr-2">📤</span> ${t.requestConfig}`)
    .replace('<label class="block text-sm font-medium text-gray-700 mb-2">模型</label>', `<label class="block text-sm font-medium text-gray-700 mb-2">${t.model}</label>`)
    // Form labels and placeholders
    .replace('placeholder="你是一个乐于助人的AI助手..."', `placeholder="${t.systemPlaceholder}"`)
    .replace('placeholder="输入你的问题..."', `placeholder="${t.messagePlaceholder}"`)
    // Buttons
    .replace('🚀 发送请求', t.sendBtn)
    .replace('🗑️ 清空响应', t.clearBtn)
    // Response section
    .replace('<span class="text-2xl mr-2">📥</span> 响应结果', `<span class="text-2xl mr-2">📥</span> ${t.responseTitle}`)
    .replace('<label class="block text-sm font-medium text-gray-700">响应内容</label>', `<label class="block text-sm font-medium text-gray-700">${t.responseContent}</label>`)
    .replace('📋 复制', t.copy)
    .replace('✅ 已复制', t.copied)
    // Response states
    .replace('<p class="text-lg font-medium mb-2">等待请求</p>', `<p class="text-lg font-medium mb-2">${t.emptyTitle}</p>`)
    .replace('<p class="text-sm">配置参数后点击"发送请求"开始测试</p>', `<p class="text-sm">${t.emptyDesc}</p>`)
    .replace('<p class="text-gray-600 font-medium">正在请求中...</p>', `<p class="text-gray-600 font-medium">${t.loadingTitle}</p>`)
    .replace('<p class="text-gray-400 text-sm mt-1">请稍候</p>', `<p class="text-gray-400 text-sm mt-1">${t.loadingDesc}</p>`)
    .replace('<p class="text-lg font-medium mb-2">请求失败</p>', `<p class="text-lg font-medium mb-2">${t.errorTitle}</p>`)
    // Stats
    .replace('<p class="text-xs text-gray-600">耗时</p>', `<p class="text-xs text-gray-600">${t.duration}</p>`)
    .replace('<p class="text-xs text-gray-600">状态</p>', `<p class="text-xs text-gray-600">${t.status}</p>`)
    // Examples
    .replace(/<h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">\s*<span class="text-2xl mr-2">💡<\/span> 示例/, `<h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">\n                <span class="text-2xl mr-2">💡</span> ${t.examplesTitle}`)
    .replace('<p class="font-semibold text-gray-900">简单对话</p>', `<p class="font-semibold text-gray-900">${t.exampleSimple}</p>`)
    .replace('<p class="text-sm text-gray-600">单轮对话示例</p>', `<p class="text-sm text-gray-600">${t.exampleSimpleDesc}</p>`)
    .replace('<p class="font-semibold text-gray-900">多轮对话</p>', `<p class="font-semibold text-gray-900">${t.exampleMulti}</p>`)
    .replace('<p class="text-sm text-gray-600">包含历史记录的对话</p>', `<p class="text-sm text-gray-600">${t.exampleMultiDesc}</p>`)
    .replace('<p class="font-semibold text-gray-900">内容总结</p>', `<p class="font-semibold text-gray-900">${t.exampleSummary}</p>`)
    .replace('<p class="text-sm text-gray-600">使用 summary 模板</p>', `<p class="text-sm text-gray-600">${t.exampleSummaryDesc}</p>`)
    .replace('<p class="font-semibold text-gray-900">代码生成</p>', `<p class="font-semibold text-gray-900">${t.exampleCode}</p>`)
    .replace('<p class="text-sm text-gray-600">使用 code-advanced 模板</p>', `<p class="text-sm text-gray-600">${t.exampleCodeDesc}</p>`)
    // Replace example messages in textarea and JavaScript
    .replace('>你好，请介绍一下你自己</textarea>', `>${t.exampleMessageLong}</textarea>`)
    .replaceAll("'你好,请介绍一下你自己'", `'${t.exampleMessageLong}'`)
    // Footer
    .replace('Powered by', t.poweredBy)
    .replace('<a href="/" class="text-blue-600 hover:underline">返回首页</a>', `<a href="/?lang=${lang}" class="text-blue-600 hover:underline">${t.backHome}</a>`)
    .replace('💬 交流反馈', `💬 ${t.discussion}`)
    .replace('⭐ GitHub', `⭐ ${t.github}`);

  return html;
}

function getDeployPage(lang: Language, t: I18nText, currentUrl: string): string {
  const seoMeta = getSeoMeta(t.deployTitle, t.deploySubtitle, currentUrl, lang);
  const langSwitcher = getLanguageSwitcher(lang);

  let html = deployHTML
    .replace('<html lang="zh-CN">', `<html lang="${lang}">`)
    .replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    ${seoMeta}`
    )
    .replace('<body class="bg-gray-50">', `<body class="bg-gray-50">\n${langSwitcher}`)
    // Navigation
    .replace(/<a href="\/" class="text-gray-600 hover:text-blue-600 transition">首页<\/a>/, `<a href="/?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.home}</a>`)
    .replace(/<a href="\/docs" class="text-gray-600 hover:text-blue-600 transition">文档<\/a>/, `<a href="/docs?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.docs}</a>`)
    .replace(/<a href="\/playground" class="text-gray-600 hover:text-blue-600 transition">Playground<\/a>/, `<a href="/playground?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.playground}</a>`)
    .replace(/<a href="\/deploy" class="text-blue-600 font-semibold">部署<\/a>/, `<a href="/deploy?lang=${lang}" class="text-blue-600 font-semibold">${t.deploy}</a>`)
    .replace(/<a href="\/dashboard" class="text-gray-600 hover:text-blue-600 transition">Dashboard<\/a>/, `<a href="/dashboard?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.dashboard}</a>`)
    // Page title
    .replace('<h1 class="text-4xl font-bold text-gray-900 mb-3">🚀 Deno Deploy 部署指南</h1>', `<h1 class="text-4xl font-bold text-gray-900 mb-3">🚀 ${t.deployTitle}</h1>`)
    .replace('<p class="text-gray-600">快速部署到 Deno Deploy 平台</p>', `<p class="text-gray-600">${t.deploySubtitle}</p>`)
    // Current deployment section
    .replace('<h2 class="text-2xl font-bold mb-2">当前部署地址</h2>', `<h2 class="text-2xl font-bold mb-2">${t.deployCurrentAddr}</h2>`)
    .replace('<p class="text-white/80">✅ 已部署并运行中</p>', `<p class="text-white/80">✅ ${t.deployRunning}</p>`)
    // Quick start section
    .replace('<span class="mr-3">⚡</span> 快速开始', `<span class="mr-3">⚡</span> ${t.quickStart}`)
    .replace('<h3 class="font-semibold text-gray-900 mb-2">创建 dphn2api.ts 文件</h3>', `<h3 class="font-semibold text-gray-900 mb-2">${t.deployCreateFile}</h3>`)
    .replace('<p class="text-gray-600">复制完整的 dphn2api.ts 代码到你的项目</p>', `<p class="text-gray-600">${t.deployCreateFileDesc}</p>`)
    .replace('<h3 class="font-semibold text-gray-900 mb-2">登录 Deno Deploy</h3>', `<h3 class="font-semibold text-gray-900 mb-2">${t.deployLogin}</h3>`)
    .replace('<p class="text-gray-600 mb-2">访问', `<p class="text-gray-600 mb-2">${t.deployLoginDesc}`)
    .replace('并使用 GitHub 账号登录</p>', `${lang === "zh-CN" ? "并使用 GitHub 账号登录" : lang === "en-US" ? " and login with GitHub account" : " でGitHubアカウントでログイン"}</p>`)
    .replace('<h3 class="font-semibold text-gray-900 mb-2">创建新项目</h3>', `<h3 class="font-semibold text-gray-900 mb-2">${t.deployCreateProject}</h3>`)
    .replace('点击 "New Project"，选择你的仓库，入口文件选择', `${t.deployCreateProjectDesc}`)
    .replace('<h3 class="font-semibold text-gray-900 mb-2">配置环境变量</h3>', `<h3 class="font-semibold text-gray-900 mb-2">${t.deployConfigEnv}</h3>`)
    .replace('<p class="text-gray-600">在项目设置中添加环境变量（见下方说明）</p>', `<p class="text-gray-600">${t.deployConfigEnvDesc}</p>`)
    .replace('<h3 class="font-semibold text-gray-900 mb-2">部署完成！</h3>', `<h3 class="font-semibold text-gray-900 mb-2">${t.deployComplete}</h3>`)
    .replace('<p class="text-gray-600">Deno Deploy 会自动部署，几秒钟后即可访问</p>', `<p class="text-gray-600">${t.deployCompleteDesc}</p>`)
    // Environment variables section
    .replace('<span class="mr-3">🔐</span> 环境变量配置', `<span class="mr-3">🔐</span> ${t.deployEnvConfig}`)
    .replace('<span class="text-blue-600 text-sm">(推荐设置)</span>', `<span class="text-blue-600 text-sm">(${t.deployKeyRecommend})</span>`)
    .replace('<p class="text-gray-700 mb-2">客户端调用 API 时需要的密钥。</p>', `<p class="text-gray-700 mb-2">${t.deployKeyDesc}</p>`)
    .replace('<p class="text-sm text-gray-600 mb-1">默认值：', `<p class="text-sm text-gray-600 mb-1">${t.deployKeyDefault}`)
    .replace('🔒 建议设置为复杂的随机字符串，例如：', `🔒 ${t.deployKeySuggestion}`)
    // Other variables
    .replace('<h3 class="font-bold text-gray-900 mb-3">其他可选变量</h3>', `<h3 class="font-bold text-gray-900 mb-3">${t.deployOtherVars}</h3>`)
    .replace('- 模型显示名称（默认：Dolphin 24B）', `- ${t.deployModelNameDesc}`)
    .replace('<span class="text-gray-600 ml-2">- 默认模板（默认：logical）</span>', `<span class="text-gray-600 ml-2">- ${t.deployTemplateDesc}</span>`)
    .replace('<span class="text-gray-600 ml-2">- 调试模式（默认：false，生产环境建议关闭）</span>', `<span class="text-gray-600 ml-2">- ${t.deployDebugDesc}</span>`)
    .replace('<span class="text-gray-600 ml-2">- 默认流式响应（默认：true）</span>', `<span class="text-gray-600 ml-2">- ${t.deployStreamDesc}</span>`)
    .replace('<span class="text-gray-600 ml-2">- 启用 Dashboard（默认：true）</span>', `<span class="text-gray-600 ml-2">- ${t.deployDashboardDesc}</span>`)
    // Usage example section
    .replace('<span class="mr-3">💻</span> 使用示例', `<span class="mr-3">💻</span> ${t.deployUsageTitle}`)
    .replace('<p class="text-gray-700 mb-4">部署完成后，使用以下代码调用 API：</p>', `<p class="text-gray-700 mb-4">${t.deployUsageDesc}</p>`)
    .replace(/<strong>提示：<\/strong> 确保使用你在环境变量中设置的 <code class="bg-white px-2 py-1 rounded">DPHN_DEFAULT_KEY<\/code> 作为 api_key/, `<strong>${t.deployTipNote}</strong> ${t.deployUsageNote}`)
    // Tips section
    .replace('<span class="text-2xl mr-2">💡</span> 小贴士', `<span class="text-2xl mr-2">💡</span> ${t.deployTipTitle}`)
    .replace('<span>Deno Deploy 提供免费额度，适合个人使用</span>', `<span>${t.deployTip1}</span>`)
    .replace('<span>每次 git push 后会自动重新部署</span>', `<span>${t.deployTip2}</span>`)
    .replace('<span>支持自定义域名（在项目设置中配置）</span>', `<span>${t.deployTip3}</span>`)
    .replace('<span>生产环境建议关闭 DEBUG_MODE 以减少日志输出</span>', `<span>${t.deployTip4}</span>`)
    .replace('<span>可在 Deno Deploy 控制台查看实时日志和监控</span>', `<span>${t.deployTip5}</span>`)
    // Replace example messages
    .replaceAll('"你好"', `"${t.exampleMessage}"`)
    // Deploy button
    .replace('立即部署到 Deno Deploy', t.deployToDenoBtn)
    .replace('<a href="/" class="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg transition">\n                返回首页\n            </a>', `<a href="/?lang=${lang}" class="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg transition">\n                ${t.backHome}\n            </a>`)
    // Footer - using replaceAll to catch all occurrences in footer
    .replace('Powered by', t.poweredBy)
    .replaceAll('<a href="/" class="text-blue-600 hover:underline">返回首页</a>', `<a href="/?lang=${lang}" class="text-blue-600 hover:underline">${t.backHome}</a>`)
    .replace('💬 交流反馈', `💬 ${t.discussion}`)
    .replace('⭐ GitHub', `⭐ ${t.github}`);

  return html;
}

function getDashboardPage(lang: Language, t: I18nText, currentUrl: string): string {
  const seoMeta = getSeoMeta(t.dashboardTitle, t.dashboardSubtitle, currentUrl, lang);
  const langSwitcher = getLanguageSwitcher(lang);

  let html = dashboardHTML
    .replace('<html lang="zh-CN">', `<html lang="${lang}">`)
    .replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    ${seoMeta}`
    )
    .replace('<body class="bg-gray-50 min-h-screen">', `<body class="bg-gray-50 min-h-screen">\n${langSwitcher}`)
    // Navigation
    .replace(/<a href="\/" class="text-gray-600 hover:text-blue-600 transition">首页<\/a>/, `<a href="/?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.home}</a>`)
    .replace(/<a href="\/docs" class="text-gray-600 hover:text-blue-600 transition">文档<\/a>/, `<a href="/docs?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.docs}</a>`)
    .replace(/<a href="\/playground" class="text-gray-600 hover:text-blue-600 transition">Playground<\/a>/, `<a href="/playground?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.playground}</a>`)
    .replace(/<a href="\/deploy" class="text-gray-600 hover:text-blue-600 transition">部署<\/a>/, `<a href="/deploy?lang=${lang}" class="text-gray-600 hover:text-blue-600 transition">${t.deploy}</a>`)
    .replace(/<a href="\/dashboard" class="text-blue-600 font-semibold">Dashboard<\/a>/, `<a href="/dashboard?lang=${lang}" class="text-blue-600 font-semibold">${t.dashboard}</a>`)
    // Page title
    .replace('<h1 class="text-4xl font-bold text-gray-900 mb-3">📊 Dashboard</h1>', `<h1 class="text-4xl font-bold text-gray-900 mb-3">📊 ${t.dashboardTitle}</h1>`)
    .replace('<p class="text-gray-600">实时监控 API 请求和性能统计</p>', `<p class="text-gray-600">${t.dashboardRealTimeMonitor}</p>`)
    // Stats cards
    .replace('<p class="text-gray-600 text-sm mb-1">总请求数</p>', `<p class="text-gray-600 text-sm mb-1">${t.dashboardTotalReq}</p>`)
    .replace('<p class="text-gray-600 text-sm mb-1">成功请求</p>', `<p class="text-gray-600 text-sm mb-1">${t.dashboardSuccessReq}</p>`)
    .replace('<p class="text-gray-600 text-sm mb-1">失败请求</p>', `<p class="text-gray-600 text-sm mb-1">${t.dashboardFailedReq}</p>`)
    .replace('<p class="text-gray-600 text-sm mb-1">平均响应时间</p>', `<p class="text-gray-600 text-sm mb-1">${t.dashboardAvgTime}</p>`)
    .replace('<p class="text-gray-600 text-sm mb-1">API 调用</p>', `<p class="text-gray-600 text-sm mb-1">${t.dashboardApiCalls}</p>`)
    // API Stats section
    .replace('<span class="text-2xl mr-2">🎯</span> API 统计', `<span class="text-2xl mr-2">🎯</span> ${t.dashboardApiStats}`)
    .replace('<span class="text-gray-600 text-sm">Chat Completions</span>', `<span class="text-gray-600 text-sm">${t.dashboardChatCompletions}</span>`)
    .replace('<span class="text-gray-600 text-sm">Models 查询</span>', `<span class="text-gray-600 text-sm">${t.dashboardModelsQuery}</span>`)
    .replace('<span class="text-gray-600 text-sm">流式请求</span>', `<span class="text-gray-600 text-sm">${t.dashboardStreamingReq}</span>`)
    .replace('<span class="text-gray-600 text-sm">非流式请求</span>', `<span class="text-gray-600 text-sm">${t.dashboardNonStreamingReq}</span>`)
    // Performance section
    .replace('<span class="text-2xl mr-2">⚡</span> 性能指标', `<span class="text-2xl mr-2">⚡</span> ${t.dashboardPerformance}`)
    .replace('<span class="text-gray-600 text-sm">平均响应</span>', `<span class="text-gray-600 text-sm">${t.dashboardAvgResponse}</span>`)
    .replace('<span class="text-gray-600 text-sm">最快响应</span>', `<span class="text-gray-600 text-sm">${t.dashboardFastestResponse}</span>`)
    .replace('<span class="text-gray-600 text-sm">最慢响应</span>', `<span class="text-gray-600 text-sm">${t.dashboardSlowestResponse}</span>`)
    .replace('<span class="text-gray-600 text-sm">成功率</span>', `<span class="text-gray-600 text-sm">${t.dashboardSuccessRate}</span>`)
    // System Info section
    .replace('<span class="text-2xl mr-2">📊</span> 系统信息', `<span class="text-2xl mr-2">📊</span> ${t.dashboardSystemInfo}`)
    .replace('<span class="text-gray-600 text-sm">运行时长</span>', `<span class="text-gray-600 text-sm">${t.dashboardRuntime}</span>`)
    .replace('<span class="text-gray-600 text-sm">最后请求</span>', `<span class="text-gray-600 text-sm">${t.dashboardLastRequest}</span>`)
    .replace('<span class="text-gray-600 text-sm">流式/非流式</span>', `<span class="text-gray-600 text-sm">${t.dashboardStreamRatio}</span>`)
    .replace('<span class="text-gray-600 text-sm">Models 调用</span>', `<span class="text-gray-600 text-sm">${t.dashboardModelsCount}</span>`)
    // History chart
    .replace('<span class="text-2xl mr-2">📈</span> 历史趋势（最近1小时）', `<span class="text-2xl mr-2">📈</span> ${t.dashboardHistoryLast1h}`)
    .replace('<p class="text-gray-500 text-lg mb-2">暂无历史数据</p>', `<p class="text-gray-500 text-lg mb-2">${t.dashboardNoHistoryData}</p>`)
    .replace('<p class="text-gray-400 text-sm">系统每分钟记录一次数据，请稍后查看</p>', `<p class="text-gray-400 text-sm">${t.dashboardNoHistoryDesc}</p>`)
    // Top Models
    .replace('<span class="text-2xl mr-2">🏆</span> 热门模型 Top 3', `<span class="text-2xl mr-2">🏆</span> ${t.dashboardTopModelsTop3}`)
    .replace('<p class="text-gray-500 text-sm">暂无数据</p>', `<p class="text-gray-500 text-sm">${t.dashboardNoData}</p>`)
    // Real-time Requests table
    .replace('<h2 class="text-xl font-bold text-gray-900">🔔 实时请求</h2>', `<h2 class="text-xl font-bold text-gray-900">🔔 ${t.dashboardRealTime}</h2>`)
    .replace('<span class="text-sm text-gray-500">自动刷新（每5秒）</span>', `<span class="text-sm text-gray-500">${t.dashboardAutoRefresh}</span>`)
    .replace('<th class="text-left py-3 px-4 text-gray-700 font-semibold">时间</th>', `<th class="text-left py-3 px-4 text-gray-700 font-semibold">${t.dashboardTime}</th>`)
    .replace('<th class="text-left py-3 px-4 text-gray-700 font-semibold">方法</th>', `<th class="text-left py-3 px-4 text-gray-700 font-semibold">${t.dashboardMethod}</th>`)
    .replace('<th class="text-left py-3 px-4 text-gray-700 font-semibold">路径</th>', `<th class="text-left py-3 px-4 text-gray-700 font-semibold">${t.dashboardPath}</th>`)
    .replace('<th class="text-left py-3 px-4 text-gray-700 font-semibold">模型</th>', `<th class="text-left py-3 px-4 text-gray-700 font-semibold">${t.dashboardModel}</th>`)
    .replace('<th class="text-left py-3 px-4 text-gray-700 font-semibold">状态</th>', `<th class="text-left py-3 px-4 text-gray-700 font-semibold">${t.dashboardStatus}</th>`)
    .replace('<th class="text-left py-3 px-4 text-gray-700 font-semibold">耗时</th>', `<th class="text-left py-3 px-4 text-gray-700 font-semibold">${t.dashboardDuration}</th>`)
    .replace('<div id="empty" class="text-center py-8 text-gray-500 hidden">\n                暂无请求记录\n            </div>', `<div id="empty" class="text-center py-8 text-gray-500 hidden">\n                ${t.dashboardEmptyRequest}\n            </div>`)
    // Pagination
    .replace('共 <span id="total-requests">0</span> 条记录，第 <span id="current-page">1</span> / <span id="total-pages">1</span> 页', `${t.dashboardPaginationTotal} <span id="total-requests">0</span> ${t.dashboardPaginationRecords} <span id="current-page">1</span> / <span id="total-pages">1</span> ${t.dashboardPaginationPage}`)
    .replace('<span class="text-sm text-gray-600">每页:</span>', `<span class="text-sm text-gray-600">${t.dashboardPaginationPerPage}</span>`)
    .replace('<button id="prev-page" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed">上一页</button>', `<button id="prev-page" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed">${t.dashboardPrevPage}</button>`)
    .replace('<button id="next-page" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed">下一页</button>', `<button id="next-page" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed">${t.dashboardNextPage}</button>`)
    // Chart legend in JavaScript
    .replace("data: ['总请求数', '成功率(%)', '平均响应时间(ms)']", `data: ['${t.dashboardChartTotalReq}', '${t.dashboardChartSuccessRate}', '${t.dashboardChartAvgTime}']`)
    .replace("name: '请求数 / 成功率',", `name: '${t.dashboardChartReqCount}',`)
    .replace("name: '响应时间(ms)',", `name: '${t.dashboardChartResponseTime}',`)
    // Footer
    .replace('Powered by', t.poweredBy)
    .replace('<a href="/" class="text-blue-600 hover:underline">返回首页</a>', `<a href="/?lang=${lang}" class="text-blue-600 hover:underline">${t.backHome}</a>`)
    .replace('💬 交流反馈', `💬 ${t.discussion}`)
    .replace('⭐ GitHub', `⭐ ${t.github}`);

  return html;
}

// ============================================================================
// Config variables from environment
// ============================================================================

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
  let requestModel: string | undefined; // 用于在错误处理中记录模型

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
    requestModel = openAIReq.model; // 保存模型名称用于错误记录
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
    recordRequest("POST", "/v1/chat/completions", 500, duration, userAgent, requestModel);

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
            <div class="grid md:grid-cols-5 gap-6 mb-8">
                <a href="/docs" class="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in animate-delay-2">
                    <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">📖</div>
                    <h3 class="text-white text-xl font-bold mb-2">API 文档</h3>
                    <p class="text-blue-100 text-sm">完整的使用文档和代码示例</p>
                </a>

                <a href="/payload" class="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in animate-delay-3">
                    <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">🎮</div>
                    <h3 class="text-white text-xl font-bold mb-2">Playground</h3>
                    <p class="text-blue-100 text-sm">在线测试 API 请求和响应</p>
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
    <style>
        /* Language Switcher */
        .lang-switcher {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        .lang-switcher select {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(200, 200, 200, 0.5);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
                    <span class="text-2xl">🐬</span>
                    <span class="text-xl font-bold">Dphn2Api</span>
                </a>
                <div class="flex space-x-6">
                    <a href="/" class="text-gray-600 hover:text-blue-600 transition">首页</a>
                    <a href="/docs" class="text-blue-600 font-semibold">文档</a>
                    <a href="/playground" class="text-gray-600 hover:text-blue-600 transition">Playground</a>
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
            <p>Powered by <span class="font-semibold">Deno 🦕</span> | <a href="/" class="text-blue-600 hover:underline">返回首页</a> | <a href="https://linux.do/t/topic/1002983/1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">💬 交流反馈</a> | <a href="https://github.com/dext7r/ZtoApi/blob/main/deno/dphn/dphn2api.ts" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">⭐ GitHub</a></p>
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
    <style>
        /* Language Switcher */
        .lang-switcher {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        .lang-switcher select {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(200, 200, 200, 0.5);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <nav class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
                    <span class="text-2xl">🐬</span>
                    <span class="text-xl font-bold">Dphn2Api</span>
                </a>
                <div class="flex space-x-6">
                    <a href="/" class="text-gray-600 hover:text-blue-600 transition">首页</a>
                    <a href="/docs" class="text-gray-600 hover:text-blue-600 transition">文档</a>
                    <a href="/playground" class="text-gray-600 hover:text-blue-600 transition">Playground</a>
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
            <div id="history-empty" class="hidden text-center py-20">
                <div class="text-6xl mb-4">📊</div>
                <p class="text-gray-500 text-lg mb-2">暂无历史数据</p>
                <p class="text-gray-400 text-sm">系统每分钟记录一次数据，请稍后查看</p>
            </div>
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
            <p>Powered by <span class="font-semibold">Deno 🦕</span> | <a href="/" class="text-blue-600 hover:underline">返回首页</a> | <a href="https://linux.do/t/topic/1002983/1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">💬 交流反馈</a> | <a href="https://github.com/dext7r/ZtoApi/blob/main/deno/dphn/dphn2api.ts" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">⭐ GitHub</a></p>
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

                const chartElement = document.getElementById('history-chart');
                const emptyElement = document.getElementById('history-empty');

                if (!data.data || data.data.length === 0) {
                    // 显示空状态，隐藏图表
                    chartElement.style.display = 'none';
                    emptyElement.classList.remove('hidden');
                    return;
                }

                // 隐藏空状态，显示图表
                chartElement.style.display = 'block';
                emptyElement.classList.add('hidden');

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

// Playground test page HTML
const playgroundHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playground - Dphn2Api</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Marked.js for Markdown parsing -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <!-- Highlight.js for code syntax highlighting -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/styles/github.min.css">
    <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/highlight.min.js"></script>
    <style>
        /* Language Switcher */
        .lang-switcher {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        .lang-switcher select {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(200, 200, 200, 0.5);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        #response {
            line-height: 1.6;
        }
        #response h1, #response h2, #response h3 {
            font-weight: bold;
            margin-top: 1em;
            margin-bottom: 0.5em;
        }
        #response h1 { font-size: 1.5em; }
        #response h2 { font-size: 1.3em; }
        #response h3 { font-size: 1.1em; }
        #response p { margin-bottom: 0.8em; }
        #response ul, #response ol { margin-left: 1.5em; margin-bottom: 0.8em; }
        #response li { margin-bottom: 0.3em; }
        #response pre {
            background: #f6f8fa;
            padding: 1em;
            border-radius: 0.375rem;
            overflow-x: auto;
            margin-bottom: 1em;
        }
        #response code {
            background: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 0.25rem;
            font-size: 0.9em;
        }
        #response pre code {
            background: transparent;
            padding: 0;
        }
        #response blockquote {
            border-left: 4px solid #ddd;
            padding-left: 1em;
            margin: 1em 0;
            color: #666;
        }
        #response a {
            color: #3b82f6;
            text-decoration: underline;
        }
    </style>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
                    <span class="text-2xl">🐬</span>
                    <span class="text-xl font-bold">Dphn2Api</span>
                </a>
                <div class="flex items-center space-x-6">
                    <a href="/" class="text-gray-600 hover:text-blue-600 transition">首页</a>
                    <a href="/docs" class="text-gray-600 hover:text-blue-600 transition">文档</a>
                    <a href="/playground" class="text-blue-600 font-semibold">Playground</a>
                    <a href="/deploy" class="text-gray-600 hover:text-blue-600 transition">部署</a>
                    <a href="/dashboard" class="text-gray-600 hover:text-blue-600 transition">Dashboard</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mx-auto px-4 py-8 max-w-7xl">
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-3">🎮 Playground</h1>
            <p class="text-gray-600">在线测试 Dolphin AI API 请求和响应</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Request Panel -->
            <div class="bg-white rounded-xl shadow-sm border p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span class="text-2xl mr-2">📤</span> 请求配置
                </h2>

                <!-- API Key -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <input type="text" id="apiKey" value="${DEFAULT_KEY}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="sk-your-key">
                </div>

                <!-- Model Selection -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">模型</label>
                    <select id="model" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="Dolphin 24B">Dolphin 24B (默认)</option>
                        <option value="Dolphin 24B-logical">Dolphin 24B-logical</option>
                        <option value="Dolphin 24B-summary">Dolphin 24B-summary</option>
                        <option value="Dolphin 24B-code-beginner">Dolphin 24B-code-beginner</option>
                        <option value="Dolphin 24B-code-advanced">Dolphin 24B-code-advanced</option>
                    </select>
                </div>

                <!-- Parameters Row -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
                        <input type="number" id="temperature" min="0" max="2" step="0.1" value="0.7"
                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                               placeholder="0.7">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Max Tokens</label>
                        <input type="number" id="maxTokens" min="1" max="4096" step="1" value="2048"
                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                               placeholder="2048">
                    </div>
                </div>

                <!-- Stream -->
                <div class="mb-4">
                    <label class="flex items-center">
                        <input type="checkbox" id="stream" checked class="mr-2">
                        <span class="text-sm font-medium text-gray-700">启用流式响应</span>
                    </label>
                </div>

                <!-- System Message -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">System (可选)</label>
                    <textarea id="system" rows="3"
                              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder="你是一个乐于助人的AI助手..."></textarea>
                    <p class="text-xs text-gray-500 mt-1">系统提示词，用于设定角色和行为</p>
                </div>

                <!-- User Message -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea id="message" rows="6"
                              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder="输入你的问题...">你好，请介绍一下你自己</textarea>
                    <p class="text-xs text-gray-500 mt-1">用户消息内容</p>
                </div>

                <!-- Send Button -->
                <button id="sendBtn"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                    🚀 发送请求
                </button>

                <!-- Clear Button -->
                <button id="clearBtn"
                        class="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition">
                    🗑️ 清空响应
                </button>
            </div>

            <!-- Response Panel -->
            <div class="bg-white rounded-xl shadow-sm border p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span class="text-2xl mr-2">📥</span> 响应结果
                </h2>

                <!-- Status -->
                <div id="status" class="mb-4 p-3 bg-gray-100 rounded-lg hidden">
                    <span class="font-mono text-sm"></span>
                </div>

                <!-- Response -->
                <div class="mb-4">
                    <div class="flex items-center justify-between mb-2">
                        <label class="block text-sm font-medium text-gray-700">响应内容</label>
                        <button id="copyBtn" class="text-xs text-blue-600 hover:text-blue-700 hidden">📋 复制</button>
                    </div>
                    <div id="response"
                         class="w-full h-96 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm overflow-auto">
                        <!-- Empty state -->
                        <div id="emptyState" class="flex flex-col items-center justify-center h-full text-gray-400">
                            <div class="text-6xl mb-4">💬</div>
                            <p class="text-lg font-medium mb-2">等待请求</p>
                            <p class="text-sm">配置参数后点击"发送请求"开始测试</p>
                        </div>
                        <!-- Loading state -->
                        <div id="loadingState" class="hidden flex-col items-center justify-center h-full">
                            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                            <p class="text-gray-600 font-medium">正在请求中...</p>
                            <p class="text-gray-400 text-sm mt-1">请稍候</p>
                        </div>
                        <!-- Error state -->
                        <div id="errorState" class="hidden flex-col items-center justify-center h-full text-red-600">
                            <div class="text-6xl mb-4">❌</div>
                            <p class="text-lg font-medium mb-2">请求失败</p>
                            <p id="errorMessage" class="text-sm text-gray-600 text-center px-4"></p>
                        </div>
                        <!-- Content area -->
                        <div id="contentArea" class="hidden"></div>
                    </div>
                </div>

                <!-- Stats -->
                <div id="stats" class="grid grid-cols-2 gap-3 hidden">
                    <div class="bg-blue-50 p-3 rounded-lg">
                        <p class="text-xs text-gray-600">耗时</p>
                        <p id="duration" class="text-lg font-bold text-blue-600">-</p>
                    </div>
                    <div class="bg-green-50 p-3 rounded-lg">
                        <p class="text-xs text-gray-600">状态</p>
                        <p id="statusCode" class="text-lg font-bold text-green-600">-</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Request/Response Examples -->
        <div class="mt-8 bg-white rounded-xl shadow-sm border p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span class="text-2xl mr-2">💡</span> 示例
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button class="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition example-btn"
                        data-example="simple">
                    <p class="font-semibold text-gray-900">简单对话</p>
                    <p class="text-sm text-gray-600">单轮对话示例</p>
                </button>
                <button class="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition example-btn"
                        data-example="multi">
                    <p class="font-semibold text-gray-900">多轮对话</p>
                    <p class="text-sm text-gray-600">包含历史记录的对话</p>
                </button>
                <button class="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition example-btn"
                        data-example="summary">
                    <p class="font-semibold text-gray-900">内容总结</p>
                    <p class="text-sm text-gray-600">使用 summary 模板</p>
                </button>
                <button class="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition example-btn"
                        data-example="code">
                    <p class="font-semibold text-gray-900">代码生成</p>
                    <p class="text-sm text-gray-600">使用 code-advanced 模板</p>
                </button>
            </div>
        </div>
    </div>

    <footer class="bg-white border-t mt-12 py-6">
        <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>Powered by <span class="font-semibold">Deno 🦕</span> | <a href="/" class="text-blue-600 hover:underline">返回首页</a> | <a href="https://linux.do/t/topic/1002983/1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">💬 交流反馈</a> | <a href="https://github.com/dext7r/ZtoApi/blob/main/deno/dphn/dphn2api.ts" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">⭐ GitHub</a></p>
        </div>
    </footer>

    <script>
        const examples = {
            simple: {
                model: 'Dolphin 24B',
                system: '',
                message: '你好,请介绍一下你自己'
            },
            multi: {
                model: 'Dolphin 24B-logical',
                system: '你是一个专业的教育助手，擅长用简单的语言解释复杂概念。',
                message: '什么是机器学习？'
            },
            summary: {
                model: 'Dolphin 24B-summary',
                system: '',
                message: '请总结以下内容：人工智能（AI）是计算机科学的一个分支，致力于创建能够执行通常需要人类智能的任务的系统。这包括学习、推理、问题解决、感知和语言理解等能力。'
            },
            code: {
                model: 'Dolphin 24B-code-advanced',
                system: '你是一个专业的编程助手，提供清晰、高效的代码示例。',
                message: '用 Python 写一个快速排序算法，并添加详细注释'
            }
        };

        const sendBtn = document.getElementById('sendBtn');
        const clearBtn = document.getElementById('clearBtn');
        const copyBtn = document.getElementById('copyBtn');
        const responseDiv = document.getElementById('response');
        const statusDiv = document.getElementById('status');
        const statsDiv = document.getElementById('stats');
        const emptyState = document.getElementById('emptyState');
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const contentArea = document.getElementById('contentArea');
        const errorMessage = document.getElementById('errorMessage');

        // Show specific state
        function showState(state) {
            emptyState.classList.add('hidden');
            loadingState.classList.add('hidden');
            errorState.classList.add('hidden');
            contentArea.classList.add('hidden');

            emptyState.classList.remove('flex');
            loadingState.classList.remove('flex');
            errorState.classList.remove('flex');

            if (state === 'empty') {
                emptyState.classList.remove('hidden');
                emptyState.classList.add('flex');
            } else if (state === 'loading') {
                loadingState.classList.remove('hidden');
                loadingState.classList.add('flex');
            } else if (state === 'error') {
                errorState.classList.remove('hidden');
                errorState.classList.add('flex');
            } else if (state === 'content') {
                contentArea.classList.remove('hidden');
            }
        }

        // Example buttons
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const example = examples[btn.dataset.example];
                document.getElementById('model').value = example.model;
                document.getElementById('system').value = example.system;
                document.getElementById('message').value = example.message;
            });
        });

        // Send request
        sendBtn.addEventListener('click', async () => {
            const apiKey = document.getElementById('apiKey').value;
            const model = document.getElementById('model').value;
            const stream = document.getElementById('stream').checked;
            const temperature = parseFloat(document.getElementById('temperature').value);
            const maxTokens = parseInt(document.getElementById('maxTokens').value);
            const systemText = document.getElementById('system').value.trim();
            const messageText = document.getElementById('message').value.trim();

            if (!messageText) {
                showState('error');
                errorMessage.textContent = '请输入消息内容';
                return;
            }

            // Build messages array
            const messages = [];
            if (systemText) {
                messages.push({ role: 'system', content: systemText });
            }
            messages.push({ role: 'user', content: messageText });

            sendBtn.disabled = true;
            sendBtn.textContent = '⏳ 请求中...';
            showState('loading');
            statusDiv.classList.add('hidden');
            statsDiv.classList.add('hidden');
            copyBtn.classList.add('hidden');

            const startTime = Date.now();

            try {
                const requestBody = { model, messages, stream };

                // Add optional parameters
                if (temperature !== 0.7) requestBody.temperature = temperature;
                if (maxTokens !== 2048) requestBody.max_tokens = maxTokens;

                const response = await fetch('/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': \`Bearer \${apiKey}\`
                    },
                    body: JSON.stringify(requestBody)
                });

                const duration = Date.now() - startTime;

                // Show status
                statusDiv.classList.remove('hidden');
                statusDiv.querySelector('span').textContent = \`HTTP \${response.status} \${response.statusText}\`;
                statusDiv.className = \`mb-4 p-3 rounded-lg \${response.ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}\`;

                // Show stats
                statsDiv.classList.remove('hidden');
                document.getElementById('duration').textContent = duration + 'ms';
                document.getElementById('statusCode').textContent = response.status;

                if (stream && response.ok) {
                    // Handle streaming response with Markdown rendering
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let fullText = '';

                    showState('content');

                    // Configure marked for better rendering
                    marked.setOptions({
                        breaks: true,
                        gfm: true,
                        highlight: function(code, lang) {
                            if (lang && hljs.getLanguage(lang)) {
                                try {
                                    return hljs.highlight(code, { language: lang }).value;
                                } catch (e) {}
                            }
                            return hljs.highlightAuto(code).value;
                        }
                    });

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value);
                        const lines = chunk.split('\\n');

                        for (const line of lines) {
                            if (line.startsWith('data: ')) {
                                const data = line.slice(6);
                                if (data === '[DONE]') continue;

                                try {
                                    const json = JSON.parse(data);
                                    const content = json.choices[0]?.delta?.content || '';
                                    fullText += content;
                                    // Render as Markdown
                                    contentArea.innerHTML = marked.parse(fullText);
                                    // Apply syntax highlighting
                                    contentArea.querySelectorAll('pre code').forEach(block => {
                                        hljs.highlightElement(block);
                                    });
                                } catch (e) {
                                    // Ignore parse errors
                                }
                            }
                        }
                    }

                    copyBtn.classList.remove('hidden');
                } else {
                    // Handle non-streaming response with Markdown rendering
                    const data = await response.json();
                    if (data.choices && data.choices[0]?.message?.content) {
                        showState('content');
                        // Render response content as Markdown
                        const content = data.choices[0].message.content;
                        marked.setOptions({
                            breaks: true,
                            gfm: true,
                            highlight: function(code, lang) {
                                if (lang && hljs.getLanguage(lang)) {
                                    try {
                                        return hljs.highlight(code, { language: lang }).value;
                                    } catch (e) {}
                                }
                                return hljs.highlightAuto(code).value;
                            }
                        });
                        contentArea.innerHTML = marked.parse(content);
                        contentArea.querySelectorAll('pre code').forEach(block => {
                            hljs.highlightElement(block);
                        });
                    } else {
                        // Show raw JSON for errors or unexpected responses
                        showState('content');
                        contentArea.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    }
                    copyBtn.classList.remove('hidden');
                }
            } catch (error) {
                showState('error');
                errorMessage.textContent = error.message;
                statusDiv.classList.remove('hidden');
                statusDiv.className = 'mb-4 p-3 rounded-lg bg-red-100 text-red-700';
                statusDiv.querySelector('span').textContent = 'Error: ' + error.message;
            } finally {
                sendBtn.disabled = false;
                sendBtn.textContent = '🚀 发送请求';
            }
        });

        // Clear response
        clearBtn.addEventListener('click', () => {
            showState('empty');
            statusDiv.classList.add('hidden');
            statsDiv.classList.add('hidden');
            copyBtn.classList.add('hidden');
        });

        // Copy response (copy plain text, not HTML)
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(contentArea.innerText);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ 已复制';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });

        // Support Enter key to send (Ctrl+Enter in textarea)
        document.getElementById('message').addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                sendBtn.click();
            }
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
    <style>
        /* Language Switcher */
        .lang-switcher {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        .lang-switcher select {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(200, 200, 200, 0.5);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
                    <span class="text-2xl">🐬</span>
                    <span class="text-xl font-bold">Dphn2Api</span>
                </a>
                <div class="flex space-x-6">
                    <a href="/" class="text-gray-600 hover:text-blue-600 transition">首页</a>
                    <a href="/docs" class="text-gray-600 hover:text-blue-600 transition">文档</a>
                    <a href="/playground" class="text-gray-600 hover:text-blue-600 transition">Playground</a>
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
            <p>Powered by <span class="font-semibold">Deno 🦕</span> | <a href="/" class="text-blue-600 hover:underline">返回首页</a> | <a href="https://linux.do/t/topic/1002983/1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">💬 交流反馈</a> | <a href="https://github.com/dext7r/ZtoApi/blob/main/deno/dphn/dphn2api.ts" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">⭐ GitHub</a></p>
        </div>
    </footer>
</body>
</html>`;

// Main request handler
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  debugLog(`${req.method} ${path}`);

  // 检测语言：优先使用 URL 参数，其次使用浏览器语言
  const urlLang = url.searchParams.get("lang") as Language | null;
  const acceptLang = req.headers.get("Accept-Language") || "";
  const lang: Language = (urlLang && ["zh-CN", "en-US", "ja-JP"].includes(urlLang))
    ? urlLang as Language
    : detectLanguage(acceptLang);
  const t = getTranslations(lang);

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
    return new Response(getHomePage(lang, t, url.toString()), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // API docs
  if (path === "/docs") {
    return new Response(getDocsPage(lang, t, url.toString()), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Playground test page
  if (path === "/payload" || path === "/playground") {
    return new Response(getPlaygroundPage(lang, t, url.toString()), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Deploy guide
  if (path === "/deploy") {
    return new Response(getDeployPage(lang, t, url.toString()), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Dashboard
  if (DASHBOARD_ENABLED && path === "/dashboard") {
    return new Response(getDashboardPage(lang, t, url.toString()), {
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
