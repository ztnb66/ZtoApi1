@echo off
chcp 65001 >nul
echo 🚀 启动 OpenAI兼容API代理 for Z.ai GLM-4.5

REM 检查环境变量文件
set ENV_FILE=
if exist ".env.local" (
    set ENV_FILE=.env.local
    echo 📁 使用环境变量文件: .env.local
) else if exist ".env" (
    set ENV_FILE=.env
    echo 📁 使用环境变量文件: .env
) else if exist "config.env" (
    set ENV_FILE=config.env
    echo 📁 使用环境变量文件: config.env
) else (
    echo ⚠️  未找到环境变量文件，使用默认配置
)

REM 加载环境变量
if defined ENV_FILE (
    echo 📋 加载环境变量...
    for /f "tokens=1,2 delims==" %%a in ('type %ENV_FILE% ^| findstr /v "^#"') do (
        set %%a=%%b
    )
    
    REM 显示关键配置
    echo 🔑 API Key: %DEFAULT_KEY%
    echo 🤖 模型名称: %MODEL_NAME%
    echo 🌐 端口: %PORT%
    echo 🐛 调试模式: %DEBUG_MODE%
    echo 🌊 默认流式: %DEFAULT_STREAM%
    
    if not "%ZAI_TOKEN%"=="your_z_ai_token_here" (
        echo ✅ Z.ai Token: 已配置
    ) else (
        echo ⚠️  Z.ai Token: 未配置或使用默认值
    )
)

echo.
echo 🎯 启动服务...
echo 📍 服务地址: http://localhost:%PORT%
echo 📖 Roo CDOE 基础URL: http://localhost:%PORT%/v1
echo 📖 API文档: http://localhost:%PORT%/docs
echo 📊 Dashboard: http://localhost:%PORT%/dashboard
echo.

REM 启动服务
go run main.go
pause
