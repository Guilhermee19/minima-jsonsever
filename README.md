# Minima JSON Server

Um servidor JSON simples e eficiente usando **json-server** com gerenciamento de processos via **PM2**.

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- PM2 instalado globalmente
- Git (opcional)

## 🚀 Instalação

### 1. Instalar PM2 globalmente (se ainda não tiver)

```bash
npm install -g pm2
```

### 2. Instalar dependências do projeto

```bash
npm install
```

## 🎯 Como usar

### Desenvolvimento Local

```bash
# Executar em modo de desenvolvimento (com auto-reload)
npm run dev

# Ou executar diretamente
npm start
```

### Produção com PM2

#### Iniciar o servidor

```bash
# Usando npm script
npm run pm2:start

# Ou diretamente com PM2
pm2 start ecosystem.config.js
```

#### Gerenciar o servidor

```bash
# Ver status dos processos
npm run pm2:status
# ou
pm2 status

# Ver logs em tempo real
npm run pm2:logs
# ou
pm2 logs meu-app

# Parar o servidor
npm run pm2:stop
# ou
pm2 stop meu-app

# Reiniciar o servidor
npm run pm2:restart
# ou
pm2 restart meu-app

# Parar e remover da lista de processos
pm2 delete meu-app
```

### Configuração do PM2

O arquivo `ecosystem.config.js` contém as configurações do PM2:

- **Mode cluster**: Aproveita todos os núcleos da CPU
- **Auto-restart**: Reinicia automaticamente em caso de falha
- **Watch mode**: Reinicia quando detecta mudanças nos arquivos
- **Variáveis de ambiente**: Diferentes configs para dev e produção

## 📝 Endpoints da API

O servidor roda por padrão na porta **3000**. Acesse: `http://localhost:3000`

### Endpoints principais:

#### Users
- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Obter usuário por ID
- `POST /users` - Criar novo usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

#### Posts
- `GET /posts` - Listar todos os posts
- `GET /posts/:id` - Obter post por ID
- `POST /posts` - Criar novo post
- `PUT /posts/:id` - Atualizar post
- `DELETE /posts/:id` - Deletar post

#### Categories
- `GET /categories` - Listar todas as categorias
- `GET /categories/:id` - Obter categoria por ID

#### Comments
- `GET /comments` - Listar todos os comentários
- `GET /comments/:id` - Obter comentário por ID

### Consultas avançadas:

```bash
# Filtrar por campo
GET /posts?userId=1
GET /users?role=admin

# Ordenar resultados
GET /posts?_sort=publishedAt&_order=desc

# Paginação
GET /posts?_page=1&_limit=10

# Busca em texto
GET /posts?q=JSON

# Relacionamentos
GET /posts?_expand=user
GET /users?_embed=posts
```

## 🔧 Configuração

### Variáveis de Ambiente

Você pode configurar as seguintes variáveis:

```bash
# Porta do servidor (padrão: 3000)
PORT=3000

# Host do servidor (padrão: 0.0.0.0)
HOST=0.0.0.0

# Ambiente de execução
NODE_ENV=production
```

### Personalizando dados

Edite o arquivo `db.json` para modificar os dados da API. O json-server criará automaticamente endpoints REST para cada coleção no arquivo.

## 📊 Monitoramento

### PM2 Web Interface

Para uma interface web de monitoramento:

```bash
# Instalar pm2-web (opcional)
npm install -g pm2-web

# Executar interface web na porta 9615
pm2-web
```

### Logs

```bash
# Ver logs em tempo real
pm2 logs meu-app

# Ver logs com filtro
pm2 logs meu-app --lines 100

# Arquivos de log estão em:
# ~/.pm2/logs/
```

## 🔒 Segurança em Produção

Para uso em produção, considere:

1. **CORS**: Configurar origins permitidas
2. **Rate Limiting**: Limitar número de requisições
3. **HTTPS**: Usar certificado SSL
4. **Firewall**: Configurar regras de acesso
5. **Monitoring**: Configurar alertas e métricas

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia o servidor |
| `npm run dev` | Modo desenvolvimento com nodemon |
| `npm run pm2:start` | Inicia com PM2 |
| `npm run pm2:stop` | Para o servidor PM2 |
| `npm run pm2:restart` | Reinicia o servidor PM2 |
| `npm run pm2:logs` | Visualiza logs do PM2 |
| `npm run pm2:status` | Status dos processos PM2 |

## 🐛 Troubleshooting

### Problemas comuns:

1. **Porta já em uso**:
   ```bash
   # Verificar o que está usando a porta 3000
   netstat -ano | findstr :3000
   
   # Ou mudar a porta
   set PORT=3001 && npm start
   ```

2. **PM2 não encontrado**:
   ```bash
   # Instalar PM2 globalmente
   npm install -g pm2
   ```

3. **Arquivo db.json não encontrado**:
   ```bash
   # Verificar se o arquivo existe
   ls -la db.json
   ```

## 📚 Documentação

- [JSON Server Documentation](https://github.com/typicode/json-server)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Feito com ❤️ por Guilherme**