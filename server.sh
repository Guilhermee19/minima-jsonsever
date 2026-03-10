#!/bin/bash

# Script para gerenciar o Minima JSON Server no PM2

APP_NAME="minima-jsonserver"
PORT=3003

echo "🚀 Gerenciador do Minima JSON Server"
echo "======================================="

case "$1" in
  start)
    echo "💡 Iniciando servidor em produção na porta $PORT..."
    npm run pm2:start
    ;;
  start:dev)
    echo "💡 Iniciando servidor em desenvolvimento na porta $PORT..."
    npm run pm2:start:dev
    ;;
  stop)
    echo "⏹️  Parando servidor..."
    npm run pm2:stop
    ;;
  restart)
    echo "🔄 Reiniciando servidor..."
    npm run pm2:restart
    ;;
  logs)
    echo "📝 Visualizando logs..."
    npm run pm2:logs
    ;;
  status)
    echo "📊 Status do servidor..."
    npm run pm2:status
    ;;
  delete)
    echo "🗑️  Removendo processo do PM2..."
    npm run pm2:delete
    ;;
  test)
    echo "🧪 Testando conexão com o servidor..."
    if curl -s http://localhost:$PORT >/dev/null; then
      echo "✅ Servidor está rodando na porta $PORT"
      echo "🌐 Acesse: http://localhost:$PORT"
    else
      echo "❌ Servidor não está respondendo na porta $PORT"
    fi
    ;;
  *)
    echo "Uso: $0 {start|start:dev|stop|restart|logs|status|delete|test}"
    echo ""
    echo "Comandos:"
    echo "  start     - Iniciar em produção"
    echo "  start:dev - Iniciar em desenvolvimento"
    echo "  stop      - Parar servidor"
    echo "  restart   - Reiniciar servidor"
    echo "  logs      - Ver logs em tempo real"
    echo "  status    - Ver status dos processos"
    echo "  delete    - Remover do PM2"
    echo "  test      - Testar se o servidor está funcionando"
    echo ""
    echo "Exemplo:"
    echo "  $0 start     # Inicia o servidor em produção"
    echo "  $0 logs      # Mostra os logs"
    echo "  $0 test      # Testa a conexão"
    exit 1
    ;;
esac