module.exports = {
  apps: [{
    name: 'json-server-prod',
    script: 'index.js',
    instances: 'max', // utiliza todos os cores disponíveis
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      HTTPS_PORT: 3443
    },
    env_production: {
      NODE_ENV: 'production',
      HTTPS_PORT: 443
    },
    
    // Configurações de monitoramento
    watch: false, // desabilitar em produção
    
    // Configurações de log
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Restart automático
    autorestart: true,
    max_restarts: 5,
    min_uptime: '30s',
    max_memory_restart: '500M',
    restart_delay: 3000,
    
    // Configurações avançadas para produção
    kill_timeout: 5000,
    listen_timeout: 3000,
    
    // Configurações de performance
    node_args: '--max-old-space-size=1024',
    
    // Configurações de erro
    error_file: './logs/error.log',
    combine_logs: true,
    time: true
  }]
};