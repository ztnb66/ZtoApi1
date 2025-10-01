#!/bin/bash

# Start dphn2api server
# Usage: ./start-dphn.sh

echo "🐬 Starting Dolphin API Proxy..."
echo ""

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    echo "Loading environment from .env"
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if port is already in use
PORT=${DPHN_PORT:-9091}
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port $PORT is already in use!"
    echo "Please stop the existing process or use a different port:"
    echo "  DPHN_PORT=9092 ./start.sh"
    exit 1
fi

# Display configuration
echo "Configuration:"
echo "  Port: ${DPHN_PORT:-9091}"
echo "  API Key: ${DPHN_DEFAULT_KEY:-sk-dphn-key}"
echo "  Model: ${DPHN_MODEL_NAME:-Dolphin 24B}"
echo "  Template: ${DPHN_DEFAULT_TEMPLATE:-logical}"
echo "  Debug: ${DPHN_DEBUG_MODE:-true}"
echo ""

# Start the server
deno run --allow-net --allow-env dphn2api.ts
