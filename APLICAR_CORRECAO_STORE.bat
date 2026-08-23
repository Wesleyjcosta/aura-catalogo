@echo off
setlocal
cd /d "%~dp0"

if not exist "src\config\store.ts" (
  echo ERRO: execute este arquivo dentro da pasta C:\GitHub\AuraCatalogo
  echo.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$p='src/config/store.ts';" ^
  "$c=Get-Content -Raw -LiteralPath $p;" ^
  "$add='';" ^
  "if($c -notmatch 'export const STORE_WHATSAPP_DISPLAY'){ $add += \"`r`nexport const STORE_WHATSAPP_DISPLAY = '(31) 98340-0829';`r`n\" };" ^
  "if($c -notmatch 'export const STORE_WHATSAPP_URL'){ $add += \"export const STORE_WHATSAPP_URL = ``https://wa.me/${STORE_WHATSAPP}``;`r`n\" };" ^
  "if($c -notmatch 'export const STORE_MAP_URL'){ $add += \"export const STORE_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Galeria%%20Maria%%20Mucci%%2054%%20loja%%20113A%%20Vicosa%%20MG';`r`n\" };" ^
  "if($c -notmatch 'export const STORE_HOURS'){ $add += \"export const STORE_HOURS = 'Segunda a sexta: 9h às 18h30 • Sábado: 9h às 13h';`r`n\" };" ^
  "if($add){ Add-Content -LiteralPath $p -Value $add -Encoding utf8; Write-Host 'CORRECAO APLICADA COM SUCESSO.' -ForegroundColor Green } else { Write-Host 'Os 4 exports ja existem. Nenhuma alteracao necessaria.' -ForegroundColor Yellow }"

echo.
echo Agora abra o GitHub Desktop e confirme que src/config/store.ts aparece em Changes.
echo.
pause
