# Configuração de Variáveis de Ambiente

Para que o sistema funcione corretamente, você precisa configurar as seguintes variáveis de ambiente no arquivo `.env`:

## Variáveis Obrigatórias

### Prisma (Banco de Dados)
```env
DATABASE_URL="sua_url_do_banco_de_dados"
```

### Next Auth (Autenticação)
```env
AUTH_SECRET="sua_chave_secreta_para_next_auth"
AUTH_DISCORD_ID="seu_discord_client_id"
AUTH_DISCORD_SECRET="seu_discord_client_secret"
```

### UploadThing (Upload de Imagens)
```env
UPLOADTHING_SECRET="sua_chave_secreta_do_uploadthing"
```

## Como Obter as Chaves

### UploadThing
1. Acesse [uploadthing.com](https://uploadthing.com)
2. Crie uma conta ou faça login
3. Vá para o dashboard
4. Crie um novo projeto
5. Copie a chave secreta fornecida

### Discord OAuth
1. Acesse [Discord Developer Portal](https://discord.com/developers/applications)
2. Crie uma nova aplicação
3. Vá para "OAuth2" > "General"
4. Copie o Client ID e Client Secret

### AUTH_SECRET
Gere uma chave secreta usando:
```bash
openssl rand -base64 32
```

## Exemplo de Arquivo .env
```env
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/fdge_financas"
AUTH_SECRET="sua_chave_secreta_aqui"
AUTH_DISCORD_ID="seu_discord_client_id"
AUTH_DISCORD_SECRET="seu_discord_client_secret"
UPLOADTHING_SECRET="sua_chave_uploadthing"
``` 