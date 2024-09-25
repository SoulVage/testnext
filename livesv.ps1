# Launch Visual Studio Code with the project folder
& "C:\Program Files\Microsoft VS Code\Code.exe" "C:\Users\Admin\Desktop\8-Game Shop Project 2024.08.24"

# Pause to make sure VS Code is opened
Start-Sleep -Seconds 10

# Run Live Server using the VS Code command line interface
code --command "extension.liveServer.goOnline"

# Wait a few seconds to ensure Live Server is up and running
Start-Sleep -Seconds 5

# Open the default web browser with the URL of the live server
Start-Process "http://localhost:5500"

# Play the notification sound
$player = New-Object System.Media.SoundPlayer
$player.SoundLocation = "C:\Users\Admin\Desktop\8-Game Shop Project 2024.08.24\ntf.wav"
$player.PlaySync()

# Display a notification
[void][System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")
[System.Windows.Forms.MessageBox]::Show("Website is running", "Notification")
