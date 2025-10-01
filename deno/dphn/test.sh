#!/bin/bash

# Test dphn2api locally or on deno deploy

BASE_URL="${1:-http://localhost:9091}"

echo "Testing dphn2api at: $BASE_URL"
echo ""

# Test 1: Get models
echo "1. Testing /v1/models endpoint..."
curl -s "$BASE_URL/v1/models" \
  -H "Authorization: Bearer sk-dphn-key" | jq '.'
echo ""

# Test 2: Chat completion (non-streaming)
echo "2. Testing /v1/chat/completions (non-streaming)..."
curl -s "$BASE_URL/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-dphn-key" \
  -d '{
    "model": "Dolphin 24B",
    "messages": [
      {"role": "user", "content": "Say hello in 5 words"}
    ],
    "stream": false
  }' | jq '.'
echo ""

# Test 3: Chat completion with system message (non-streaming)
echo "3. Testing /v1/chat/completions with system message..."
curl -s "$BASE_URL/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-dphn-key" \
  -d '{
    "model": "Dolphin 24B",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant"},
      {"role": "user", "content": "Hi"}
    ],
    "stream": false
  }' | jq '.'
echo ""

# Test 4: Chat completion (streaming)
echo "4. Testing /v1/chat/completions (streaming)..."
curl -N "$BASE_URL/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-dphn-key" \
  -d '{
    "model": "Dolphin 24B",
    "messages": [
      {"role": "user", "content": "Count to 3"}
    ],
    "stream": true
  }'
echo ""
echo ""

echo "Tests completed!"
