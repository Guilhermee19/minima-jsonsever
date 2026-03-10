#!/bin/bash

echo "🔐 Gerando certificados SSL auto-assinados..."

# Criar configuração SSL
cat > ssl.conf << 'EOF'
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C=BR
ST=SP
L=Sao Paulo
O=Dev
OU=Dev
CN=localhost

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = *.ngrok.io
IP.1 = 127.0.0.1
IP.2 = 62.171.172.35
EOF

# Criar certificados SSL auto-assinados
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes \
  -config ssl.conf -extensions v3_req

# Limpar arquivo temporário
rm ssl.conf

echo "✅ Certificados criados: key.pem e cert.pem"
echo "🌐 Certificado válido para: localhost, 127.0.0.1, 62.171.172.35"
echo "⚠️  ATENÇÃO: Certificados auto-assinados podem gerar avisos no navegador"

echo "🚀 Para usar HTTPS, execute:"
echo "   npm run start:https"
echo "   ou"
echo "   npm run dev:https"