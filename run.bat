@echo off
cd /d "C:\Users\Admin\Desktop\8-Game Shop Project 2024.08.24"

:: ثبت اطلاعات به فایل لاگ
start "" powershell -ExecutionPolicy Bypass -File "C:\Users\Admin\Desktop\8-Game Shop Project 2024.08.24\loginfo.ps1"

:: Launch Visual Studio Code with the project folder
start "" "C:\Program Files\Microsoft VS Code\Code.exe" .

:: Pause to make sure VS Code is opened
timeout /t 10 /nobreak

:: Run Live Server
start "" live-server --port=5500 --no-browser --entry-file=index.html

:: Pause to make sure Live Server is up and running
timeout /t 5 /nobreak

:: Open the default web browser with the URL of the live server
start "" "http://localhost:5500"

:: Display a notification
powershell -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('Website is running', 'Notification')"
