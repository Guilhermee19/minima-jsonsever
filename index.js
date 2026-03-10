const jsonServer = require('json-server')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Configurações do servidor
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

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

// Iniciar o servidor
server.listen(PORT, HOST, () => {
  console.log(`🚀 JSON Server está rodando em http://${HOST}:${PORT}`)
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`)
  console.log(`📂 Banco de dados: ${path.join(__dirname, 'db.json')}`)
  console.log(`📝 Rotas disponíveis em http://${HOST}:${PORT}`)
})

// Tratamento de erros
process.on('uncaughtException', (error) => {
  console.error('💥 Erro não capturado:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Promise rejeitada não tratada:', reason)
  process.exit(1)
})