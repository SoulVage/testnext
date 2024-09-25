# مسیر فایل لاگ اصلی
$mainLogFile = "C:\Users\Admin\Desktop\8-Game Shop Project 2024.08.24\log1.txt"

# مسیر پوشه برای بکاپ‌ها
$backupFolder = "C:\Users\Admin\Desktop\8-Game Shop Project 2024.08.24\Cache_bkp"

# اگر پوشه بکاپ وجود ندارد، آن را ایجاد کنید
if (-not (Test-Path -Path $backupFolder)) {
    New-Item -ItemType Directory -Path $backupFolder
}

# تاریخ و زمان فعلی برای نام فایل و لاگ
$currentTime = Get-Date -Format "yyyyMMdd_HHmmss"

# مسیر فایل لاگ جدید در پوشه بکاپ
$backupLogFile = "$backupFolder\log_$currentTime.txt"

# زمان بوت سیستم
$uptime = (Get-CimInstance -ClassName Win32_OperatingSystem).LastBootUpTime
$uptimeDuration = (Get-Date) - $uptime

# پیام موفقیت‌آمیز بودن اجرا
$statusMessage = "Execution was successful."

# اطلاعات لاگ
$logEntry = "$currentTime - $statusMessage - Uptime: $($uptimeDuration.Days) days, $($uptimeDuration.Hours) hours, $($uptimeDuration.Minutes) minutes"

# افزودن اطلاعات به فایل لاگ اصلی
Add-Content -Path $mainLogFile -Value $logEntry

# ایجاد فایل لاگ جدید در پوشه بکاپ و نوشتن اطلاعات به آن
Set-Content -Path $backupLogFile -Value $logEntry
