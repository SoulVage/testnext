@echo off
cd /d "C:\Users\Admin\Desktop\8-Game Shop Project 2024.08.24"
start "" "C:\Program Files\Microsoft VS Code\Code.exe" .
timeout /t 10 /nobreak
start "" live-server
timeout /t 5 /nobreak
start "" "http://localhost:8080"
powershell -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('Website is running', 'Notification')"
