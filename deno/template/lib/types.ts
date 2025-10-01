// Common types for OpenAI-compatible API proxy

// OpenAI request/response types
export interface Message {
  role: string;
  content: string;
}

export interface OpenAIRequest {
  model: string;
  messages: Message[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  [key: string]: unknown; // Allow additional properties
}

export interface OpenAIResponse {
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

// Statistics types
export interface RequestStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  lastRequestTime: Date;
  averageResponseTime: number; // in milliseconds
  apiCallsCount: number; // /v1/chat/completions calls
  modelsCallsCount: number; // /v1/models calls
  streamingRequests: number; // streaming mode requests
  nonStreamingRequests: number; // non-streaming mode requests
  startTime: Date; // server start time
  fastestResponse: number; // fastest response time in ms
  slowestResponse: number; // slowest response time in ms
  modelUsage: Map<string, number>; // model name -> count
}

export interface LiveRequest {
  id: string;
  timestamp: Date;
  method: string;
  path: string;
  status: number;
  duration: number;
  userAgent: string;
  model?: string;
}

// Configuration interface
export interface ProxyConfig {
  // Server settings
  port: number;
  debugMode: boolean;
  defaultStream: boolean;
  dashboardEnabled: boolean;

  // API settings
  upstreamUrl: string;
  defaultKey: string;
  modelName: string;

  // Branding
  serviceName: string;
  serviceEmoji: string;
  footerText: string;
  discussionUrl: string;
  githubRepo: string;

  // Optional features
  enableThinking?: boolean;
  thinkTagsMode?: "strip" | "think" | "raw";
}
