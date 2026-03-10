const jsonServer = require('json-server')
const cors = require('cors') 
const path = require('path')
const https = require('https')
const fs = require('fs')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Configurações do servidor
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

// Configurar CORS com pacote específico
server.use(cors({
  origin: true, // Aceita qualquer origem - para desenvolvimento
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true // Permite cookies se necessário
}))

// Middleware para logs personalizados
server.use((req, res, next) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${req.method} ${req.path}`)
  next()
})

// Middlewares padrão (logger, static, cors e no-cache)
server.use(middlewares)

// Middleware para reescrita de rotas (se necessário)
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))

// Usar o router padrão
server.use(router)

// Configuração HTTPS para produção
const useHttps = process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production'
const HTTPS_PORT = process.env.HTTPS_PORT || 3443

if (useHttps) {
  // Função para criar certificados auto-assinados para desenvolvimento
  const createSelfSignedCert = () => {
    const { execSync } = require('child_process')
    
    try {
      // Criar certificado auto-assinado
      execSync(`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"`)
      console.log('✅ Certificados auto-assinados criados com sucesso!')
    } catch (error) {
      console.error('❌ Erro ao criar certificados. Usando HTTP...')
      return false
    }
    return true
  }

  let httpsOptions
  
  try {
    // Tentar carregar certificados existentes
    httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
    }
    console.log('✅ Certificados HTTPS carregados!')
  } catch (error) {
    console.log('📝 Certificados não encontrados, criando novos...')
    if (createSelfSignedCert()) {
      try {
        httpsOptions = {
          key: fs.readFileSync(path.join(__dirname, 'key.pem')),
          cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
        }
      } catch (err) {
        console.error('❌ Falha ao carregar certificados criados. Usando HTTP.')
        httpsOptions = null
      }
    } else {
      httpsOptions = null
    }
  }

  if (httpsOptions) {
    // Iniciar servidor HTTPS
    https.createServer(httpsOptions, server).listen(HTTPS_PORT, HOST, () => {
      console.log(`🔒 JSON Server HTTPS está rodando em https://${HOST}:${HTTPS_PORT}`)
      console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`)
      console.log(`📂 Banco de dados: ${path.join(__dirname, 'db.json')}`)
      console.log(`📝 Rotas disponíveis em https://${HOST}:${HTTPS_PORT}`)
    })
    
    // Também manter HTTP para desenvolvimento
    server.listen(PORT, HOST, () => {
      console.log(`🌐 JSON Server HTTP está rodando em http://${HOST}:${PORT}`)
    })
  } else {
    // Fallback para HTTP se HTTPS falhar
    server.listen(PORT, HOST, () => {
      console.log(`🚀 JSON Server está rodando em http://${HOST}:${PORT} (HTTPS falhou)`)
      console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`)
      console.log(`📂 Banco de dados: ${path.join(__dirname, 'db.json')}`)
      console.log(`📝 Rotas disponíveis em http://${HOST}:${PORT}`)
    })
  }
} else {
  // Iniciar apenas HTTP
  server.listen(PORT, HOST, () => {
    console.log(`🚀 JSON Server está rodando em http://${HOST}:${PORT}`)
    console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`)
    console.log(`📂 Banco de dados: ${path.join(__dirname, 'db.json')}`)
    console.log(`📝 Rotas disponíveis em http://${HOST}:${PORT}`)
  })
}

// Tratamento de erros
process.on('uncaughtException', (error) => {
  console.error('💥 Erro não capturado:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Promise rejeitada não tratada:', reason)
  process.exit(1)
})