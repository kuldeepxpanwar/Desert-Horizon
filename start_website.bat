@echo off
echo ===================================================
echo   Starting Desert Horizon Website...
echo   Please wait a few seconds for it to load.
echo   (Press Ctrl+C to stop the server when done)
echo ===================================================

:: Open the browser automatically
start http://localhost:3000

:: Start the Next.js development server
npm run dev
