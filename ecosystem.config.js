module.exports = {
  apps: [
    {
      name: "minima-jsonserver",
      script: "./index.js",
      instances: "max", // número de instâncias, ou 'max' para máximo de CPUs disponíveis
      exec_mode: "cluster", // modo de execução: 'fork' ou 'cluster'
      watch: false, // desabilitado para produção (use true apenas em desenvolvimento)
      max_memory_restart: "1G", // reinicia se usar mais que 1GB de RAM
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      // Configurações de ambiente padrão (desenvolvimento)
      env: {
        NODE_ENV: "development",
        PORT: 3003,
        HOST: "localhost"
      },
      // Configurações de produção
      env_production: {
        NODE_ENV: "production",
        PORT: 3003,
        HOST: "0.0.0.0"
      },
      // Configurações de teste
      env_test: {
        NODE_ENV: "test",
        PORT: 3003,
        HOST: "localhost"
      }
    }
  ],
  
  // Configurações globais do PM2
  deploy: {
    production: {
      user: "deploy",
      host: ["your-server.com"],
      ref: "origin/master",
      repo: "git@github.com:your-username/minima-jsonserver.git",
      path: "/var/www/production",
      "pre-deploy-local": "",
      "post-deploy": "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": ""
    }
  }
};