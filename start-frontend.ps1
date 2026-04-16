# Start Frontend Script

Write-Host "=== Starting ShopWave Frontend ===" -ForegroundColor Cyan
Write-Host ""

Set-Location frontend

# Check if Python is available
try {
    python --version | Out-Null
    Write-Host "Starting HTTP server on port 5500..." -ForegroundColor Yellow
    Write-Host "Frontend will be available at: http://localhost:5500" -ForegroundColor Green
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    python -m http.server 5500
} catch {
    Write-Host "Error: Python not found!" -ForegroundColor Red
    Write-Host "Please install Python from: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Alternative: Use Node.js http-server" -ForegroundColor Yellow
    Write-Host "  npm install -g http-server" -ForegroundColor Gray
    Write-Host "  http-server -p 5500" -ForegroundColor Gray
    exit 1
}
