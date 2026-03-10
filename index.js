const jsonServer = require('json-server');
const https = require('https');
const fs = require('fs');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Configuração de CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const httpsPort = process.env.HTTPS_PORT || 443;

server.use(middlewares);
server.use(router);

// Para produção - use certificados SSL reais
const certDir = path.join(__dirname, 'certs');
const certPath = path.join(certDir, 'server.crt');
const keyPath = path.join(certDir, 'server.key');

// Verifica se os certificados existem
if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
  console.error('\x1b[1;31m[ERRO] Certificados SSL não encontrados!\x1b[0m');
  console.error('\x1b[1;33mPara produção, coloque os certificados em:\x1b[0m');
  console.error(`  - ${certPath}`);
  console.error(`  - ${keyPath}`);
  process.exit(1);
}

try {
  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };

  https.createServer(options, server).listen(httpsPort, () => {
    console.log(`\x1b[1;32m[PRODUÇÃO] JSON Server HTTPS rodando na porta ${httpsPort}\x1b[0m`);
    console.log(`\x1b[1;34m[URL] https://seudominio.com:${httpsPort}\x1b[0m`);
    console.log(`\x1b[1;33m[INFO] CORS habilitado para todas as origens\x1b[0m`);
    console.log(`\x1b[1;36m[ENV] NODE_ENV: ${process.env.NODE_ENV || 'production'}\x1b[0m`);
  });
} catch (error) {
  console.error(`\x1b[1;31m[ERRO] Falha ao iniciar HTTPS: ${error.message}\x1b[0m`);
  process.exit(1);
}