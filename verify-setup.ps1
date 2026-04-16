# ShopWave Setup Verification Script

Write-Host "=== ShopWave Setup Verification ===" -ForegroundColor Cyan
Write-Host ""

# Check Java
Write-Host "Checking Java..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "OK Java found: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR Java not found. Please install Java 21 or higher." -ForegroundColor Red
    Write-Host "  Download from: https://adoptium.net/" -ForegroundColor Yellow
}

Write-Host ""

# Check Maven
Write-Host "Checking Maven..." -ForegroundColor Yellow
try {
    $mvnVersion = mvn -version 2>&1 | Select-String "Apache Maven"
    Write-Host "OK Maven found: $mvnVersion" -ForegroundColor Green
} catch {
    Write-Host "WARN Maven not found. You can use Maven Wrapper instead." -ForegroundColor Yellow
    Write-Host "  Use: .\mvnw.cmd spring-boot:run" -ForegroundColor Cyan
}

Write-Host ""

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "OK Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR Python not found. You will need it to run the frontend." -ForegroundColor Red
    Write-Host "  Download from: https://www.python.org/downloads/" -ForegroundColor Yellow
}

Write-Host ""

# Check if port 8080 is available
Write-Host "Checking if port 8080 is available..." -ForegroundColor Yellow
$port8080 = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
if ($port8080) {
    Write-Host "WARN Port 8080 is already in use!" -ForegroundColor Red
    Write-Host "  Stop the process or change the port in application.properties" -ForegroundColor Yellow
} else {
    Write-Host "OK Port 8080 is available" -ForegroundColor Green
}

Write-Host ""

# Check if port 5500 is available
Write-Host "Checking if port 5500 is available..." -ForegroundColor Yellow
$port5500 = Get-NetTCPConnection -LocalPort 5500 -ErrorAction SilentlyContinue
if ($port5500) {
    Write-Host "WARN Port 5500 is already in use!" -ForegroundColor Red
    Write-Host "  Stop the process or use a different port" -ForegroundColor Yellow
} else {
    Write-Host "OK Port 5500 is available" -ForegroundColor Green
}

Write-Host ""

# Check project structure
Write-Host "Checking project structure..." -ForegroundColor Yellow
$requiredFiles = @(
    "backend/pom.xml",
    "backend/src/main/java/com/shop/ShopApplication.java",
    "backend/src/main/resources/application.properties",
    "frontend/index.html",
    "frontend/css/styles.css",
    "frontend/js/api.js"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  OK $file" -ForegroundColor Green
    } else {
        Write-Host "  ERROR $file missing!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

Write-Host ""

# Summary
Write-Host "=== Summary ===" -ForegroundColor Cyan
if ($allFilesExist) {
    Write-Host "OK All required files are present" -ForegroundColor Green
} else {
    Write-Host "ERROR Some files are missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start backend:  cd backend then mvn spring-boot:run" -ForegroundColor White
Write-Host "2. Start frontend: cd frontend then python -m http.server 5500" -ForegroundColor White
Write-Host "3. Open browser:   http://localhost:5500" -ForegroundColor White
Write-Host ""
