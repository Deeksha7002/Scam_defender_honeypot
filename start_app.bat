@echo off
title Honeypot Launcher
echo ==============================================
echo   Honeypot AI Defense - Startup Script
echo ==============================================

echo [1/3] Starting Backend Server...
start "Honeypot Backend" cmd /k "python backend/main.py"

echo [2/3] Starting Web Frontend...
cd frontend
start "Honeypot Frontend" cmd /k "npm run dev"

echo [3/3] Launching Browser...
timeout /t 5 >nul
start http://localhost:5173

echo.
echo ==============================================
echo   System is running!
echo   Close the opened windows to stop the app.
echo ==============================================
pause
