@echo off
echo Starting ShopWave Backend...
echo.

REM Check if Maven is available
where mvn >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Using Maven...
    mvn spring-boot:run
) else (
    echo ERROR: Maven not found!
    echo.
    echo Please install Maven from: https://maven.apache.org/download.cgi
    echo Or use your IDE to run the ShopApplication.java file
    pause
)
