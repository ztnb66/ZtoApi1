#!/bin/bash

# ZtoApi Deno 启动脚本

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}    ZtoApi Deno 启动脚本${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""

# 检查 Deno 是否安装
if ! command -v deno &> /dev/null; then
    echo -e "${RED}错误: 未找到 Deno${NC}"
    echo "请访问 https://deno.land/#installation 安装 Deno"
    exit 1
fi

echo -e "${GREEN}✓${NC} 找到 Deno $(deno --version | head -n 1)"
echo ""

# 配置文件路径（按优先级）
ENV_FILES=(".env.local" ".env" "config.env")
ENV_FILE=""

# 查找可用的配置文件
for file in "${ENV_FILES[@]}"; do
    if [ -f "$file" ]; then
        ENV_FILE="$file"
        echo -e "${GREEN}✓${NC} 找到配置文件: $ENV_FILE"
        break
    fi
done

# 加载环境变量
if [ -n "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
    echo -e "${GREEN}✓${NC} 已加载环境变量"
else
    echo -e "${YELLOW}⚠${NC} 未找到配置文件，使用默认配置"
fi

echo ""
echo "配置信息:"
echo "  - 端口: ${PORT:-9090}"
echo "  - 模型: ${MODEL_NAME:-GLM-4.5}"
echo "  - 调试模式: ${DEBUG_MODE:-true}"
echo "  - 默认流式: ${DEFAULT_STREAM:-true}"
echo "  - Dashboard: ${DASHBOARD_ENABLED:-true}"
echo "  - 思考功能: ${ENABLE_THINKING:-false}"
echo ""

# 检查端口是否被占用
PORT_NUM=${PORT:-9090}
if lsof -Pi :$PORT_NUM -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${RED}✗${NC} 端口 $PORT_NUM 已被占用"
    echo "请修改 PORT 环境变量或停止占用该端口的程序"
    exit 1
fi

echo -e "${GREEN}✓${NC} 端口 $PORT_NUM 可用"
echo ""

# 启动服务
echo -e "${GREEN}正在启动 ZtoApi (Deno)...${NC}"
echo ""

deno run --allow-net --allow-env --allow-read main.ts
