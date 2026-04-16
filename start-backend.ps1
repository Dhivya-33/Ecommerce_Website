# Start Backend Script

Write-Host "=== Starting ShopWave Backend ===" -ForegroundColor Cyan
Write-Host ""

Set-Location backend

# Check if Maven is available
$mvnAvailable = $false
try {
    mvn -version | Out-Null
    $mvnAvailable = $true
} catch {
    Write-Host "Maven not found, using Maven Wrapper..." -ForegroundColor Yellow
}

Write-Host "Building and starting Spring Boot application..." -ForegroundColor Yellow
Write-Host ""

if ($mvnAvailable) {
    mvn spring-boot:run
} else {
    if (Test-Path "mvnw.cmd") {
        .\mvnw.cmd spring-boot:run
    } else {
        Write-Host "Error: Neither Maven nor Maven Wrapper found!" -ForegroundColor Red
        Write-Host "Please install Maven from: https://maven.apache.org/download.cgi" -ForegroundColor Yellow
        exit 1
    }
}
