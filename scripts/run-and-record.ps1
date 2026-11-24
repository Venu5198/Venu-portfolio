$server = Start-Process node -ArgumentList 'node_modules/next/dist/bin/next', 'start', '-p', '3000' -PassThru -NoNewWindow
try {
    $ready = $false
    Write-Host "Waiting for Next.js server to start on port 3000..."
    for ($i = 0; $i -lt 30; $i++) {
        Start-Sleep -Seconds 1
        try {
            $res = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 2
            if ($res.StatusCode -eq 200) {
                $ready = $true
                break
            }
        }
        catch {
            # Waiting for server
        }
    }

    if ($ready) {
        Write-Host "Server is ready! Running Playwright walkthrough video recording..."
        node scripts/record-demo.mjs
    }
    else {
        Write-Error "Server did not respond with 200 OK within 30 seconds."
    }
}
finally {
    Write-Host "Stopping Next.js server process..."
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
    Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" | Where-Object { $_.CommandLine -like "*next*start*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
    Write-Host "Server stopped and cleanup complete."
}
