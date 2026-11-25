$port = 3016
$env:TEST_URL = "http://localhost:$port"

$server = Start-Process node -ArgumentList 'node_modules/next/dist/bin/next', 'start', '-p', "$port" -PassThru -NoNewWindow
try {
    $ready = $false
    Write-Host "Waiting for Next.js server to start on port $port..."
    for ($i = 0; $i -lt 30; $i++) {
        Start-Sleep -Seconds 1
        try {
            $res = Invoke-WebRequest -Uri "http://localhost:$port" -UseBasicParsing -TimeoutSec 2
            if ($res.StatusCode -eq 200) {
                $ready = $true
                break
            }
        }
        catch {
            # Still starting
        }
    }

    if ($ready) {
        Write-Host "Server is ready on port $port! Running Playwright iOS mechanics suite..."
        node scripts/verify-ios-suite.mjs
    }
    else {
        Write-Error "Server did not respond with 200 OK within 30 seconds."
    }
}
finally {
    Write-Host "Stopping Next.js server process..."
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
    Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" | Where-Object { $_.CommandLine -like "*next*start*3016*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
    Write-Host "Cleanup completed."
}
