@echo off
echo Starting Toreta FX Blog Admin...
echo server is starting... please wait while the browser opens...

cd /d "c:\Users\maeda\Desktop\FX_HP\toreta-fx-blog"

:: Start the browser targeting the admin URL (wait a bit for server to init)
start "" "http://localhost:4321/keystatic"

:: Start the Astro dev server
npm run dev

pause
