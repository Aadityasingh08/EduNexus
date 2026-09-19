Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "    EduNexus - AI Operating System for Learning  " -ForegroundColor White
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location -Path $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] Installing dependencies..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
}

Write-Host "[INFO] Starting EduNexus at http://localhost:5173/ ..." -ForegroundColor Green
npm start
