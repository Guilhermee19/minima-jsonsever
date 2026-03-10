@echo off
echo 🔐 Gerando certificados SSL auto-assinados...

REM Verificar se openssl está disponível
where openssl >nul 2>nul
if errorlevel 1 (
    echo ❌ OpenSSL não encontrado. 
    echo 📥 Instale via: choco install openssl
    echo       ou via: https://slproweb.com/products/Win32OpenSSL.html
    echo.
    echo 🔄 Alternativamente, use ngrok: npm run tunnel
    pause
    exit /b 1
)

REM Criar certificados SSL
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=BR/ST=SP/L=Sao Paulo/O=Dev/OU=Dev/CN=localhost"

if errorlevel 1 (
    echo ❌ Erro ao criar certificados
    pause
    exit /b 1
)

echo.
echo ✅ Certificados criados: key.pem e cert.pem
echo ⚠️  ATENÇÃO: Certificados auto-assinados podem gerar avisos no navegador
echo.
echo 🚀 Para usar HTTPS, execute:
echo    npm run start:https
echo    ou
echo    npm run dev:https
echo.
pause