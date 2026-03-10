#!/bin/bash

echo "🔐 Gerando certificados SSL auto-assinados..."

# Criar certificados SSL auto-assinados
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes \
  -subj "/C=BR/ST=SP/L=Sao Paulo/O=Dev/OU=Dev/CN=localhost"

echo "✅ Certificados criados: key.pem e cert.pem"
echo "⚠️  ATENÇÃO: Certificados auto-assinados podem gerar avisos no navegador"

echo "🚀 Para usar HTTPS, execute:"
echo "   npm run start:https"
echo "   ou"
echo "   npm run dev:https"