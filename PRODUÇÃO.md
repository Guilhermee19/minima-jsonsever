# 📋 INSTRUÇÕES PARA PRODUÇÃO

## ✅ **SIM, VAI FUNCIONAR EM PRODUÇÃO!**

O JSON Server está configurado para produção com:
- ✅ **HTTPS apenas** (HTTP removido)
- ✅ **CORS habilitado**
- ✅ **PM2 configurado** 
- ✅ **Logs estruturados**
- ✅ **Cluster mode** para performance

---

## 🚀 **COMO SUBIR PARA PRODUÇÃO**

### 1. **Certificados SSL (OBRIGATÓRIO!)**
```bash
# Coloque seus certificados SSL reais em:
./certs/server.crt   # Certificado público
./certs/server.key   # Chave privada

# Para Let's Encrypt:
# cp /etc/letsencrypt/live/seudominio.com/fullchain.pem ./certs/server.crt
# cp /etc/letsencrypt/live/seudominio.com/privkey.pem ./certs/server.key
```

### 2. **Instalar dependências no servidor**
```bash
npm install --production
npm install pm2 -g
```

### 3. **Executar em produção**
```bash
# Modo produção (porta 443)
npm run pm2:prod

# Ou modo desenvolvimento (porta 3443)
npm run pm2:start
```

### 4. **Comandos PM2 úteis**
```bash
npm run pm2:status    # Ver status
npm run pm2:logs      # Ver logs
npm run pm2:restart   # Reiniciar
npm run pm2:stop      # Parar
npm run pm2:monit     # Monitor em tempo real
```

---

## 🛡️ **CONFIGURAÇÕES DE SEGURANÇA**

### Firewall (exemplo Ubuntu)
```bash
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### Nginx Proxy (opcional)
```nginx
server {
    listen 80;
    server_name seudominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name seudominio.com;
    
    ssl_certificate     /path/to/cert.crt;
    ssl_certificate_key /path/to/cert.key;
    
    location / {
        proxy_pass https://localhost:443;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 📊 **MONITORAMENTO**

- **Logs:** `./logs/`
- **Status PM2:** `npm run pm2:status`
- **Monitor:** `npm run pm2:monit`

---

## ⚠️ **CHECKLIST ANTES DO DEPLOY**

- [ ] Certificados SSL válidos colocados em `./certs/`
- [ ] Domínio apontando para o servidor
- [ ] Porta 443 aberta no firewall
- [ ] PM2 instalado globalmente
- [ ] Arquivo `db.json` com dados iniciais
- [ ] Variáveis de ambiente configuradas

---

## 🔧 **TROUBLESHOOTING**

**Erro: Certificados não encontrados**
- Verifique se os arquivos estão em `./certs/server.crt` e `./certs/server.key`

**Erro: Permission denied porta 443**
- Execute com sudo ou mude para porta > 1024

**Erro: CORS**
- Já está configurado para aceitar todas as origens (`*`)