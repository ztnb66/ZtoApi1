@echo off
REM ZtoApi Deno 启动脚本 (Windows)

echo ======================================
echo     ZtoApi Deno 启动脚本
echo ======================================
echo.

REM 检查 Deno 是否安装
where deno >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 错误: 未找到 Deno
    echo 请访问 https://deno.land/#installation 安装 Deno
    pause
    exit /b 1
)

echo [OK] 找到 Deno
deno --version
echo.

REM 配置文件路径（按优先级）
set ENV_FILE=
if exist .env.local (
    set ENV_FILE=.env.local
) else if exist .env (
    set ENV_FILE=.env
) else if exist config.env (
    set ENV_FILE=config.env
)

REM 加载环境变量
if defined ENV_FILE (
    echo [OK] 找到配置文件: %ENV_FILE%
    for /f "usebackq tokens=*" %%a in ("%ENV_FILE%") do (
        set %%a
    )
    echo [OK] 已加载环境变量
) else (
    echo [警告] 未找到配置文件，使用默认配置
)

echo.
echo 配置信息:
echo   - 端口: %PORT%
echo   - 模型: %MODEL_NAME%
echo   - 调试模式: %DEBUG_MODE%
echo   - 默认流式: %DEFAULT_STREAM%
echo   - Dashboard: %DASHBOARD_ENABLED%
echo   - 思考功能: %ENABLE_THINKING%
echo.

echo 正在启动 ZtoApi (Deno)...
echo.

deno run --allow-net --allow-env --allow-read main.ts

pause
