@echo off
title EduNexus - AI Operating System for Learning
color 0B
cls

echo =====================================================================
echo.
echo      ######  ######  #     # #     # ####### #     # #     #  ##### 
echo      #       #     # #     # ##    # #        #   #  #     # #     #
echo      #####   #     # #     # # #   # #####     ###   #     #  ##### 
echo      #       #     # #     # #  #  # #        #   #  #     #       #
echo      ######  ######   #####  #   # # ####### #     #  #####   ##### 
echo.
echo               Your AI Operating System for Learning
echo =====================================================================
echo.

cd /d "%~dp0"

echo [1/2] Checking environment and dependencies...
if not exist "node_modules\" (
    echo [INFO] Installing required dependencies. Please wait a moment...
    call npm install --legacy-peer-deps
)

echo [2/2] Starting EduNexus and launching your default browser...
echo.
echo ---------------------------------------------------------------------
echo  Platform URL: http://localhost:5173/
echo  Press Ctrl+C in this window anytime to stop the server.
echo ---------------------------------------------------------------------
echo.

call npm start

pause
