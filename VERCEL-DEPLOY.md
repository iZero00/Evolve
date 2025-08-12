# 🚀 Deploy do Evolve na Vercel

## Visão Geral

Este guia explica como fazer o deploy do jogo Evolve na plataforma Vercel de forma otimizada.

## ✨ Configurações Implementadas

### 1. **vercel.json**
- Configuração de rotas para todas as páginas
- Headers de segurança otimizados
- Cache configurado para melhor performance
- API de status integrada

### 2. **Script de Build Otimizado**
- `vercel-build.js` - Script específico para Vercel
- Verificação automática de arquivos
- Logs detalhados do processo de build
- Tratamento de erros robusto

### 3. **API de Status**
- `api/status.js` - Endpoint para verificar status
- Informações sobre o ambiente Vercel
- Métricas de performance

## 🚀 Como Fazer o Deploy

### Opção 1: Deploy via GitHub (Recomendado)

1. **Fazer push para o GitHub**
   ```bash
   git add .
   git commit -m "Configuração para Vercel"
   git push origin main
   ```

2. **Conectar na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório do GitHub
   - A Vercel detectará automaticamente as configurações

3. **Configurações do Projeto**
   - **Framework Preset**: Other
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `.` (ponto)
   - **Install Command**: `npm install`

### Opção 2: Deploy via Vercel CLI

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Fazer login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

## 📁 Estrutura de Arquivos

```
evolve-master/
├── vercel.json              # Configuração da Vercel
├── vercel-build.js          # Script de build
├── .vercelignore           # Arquivos ignorados
├── api/
│   └── status.js           # API de status
├── evolve/
│   ├── evolve.js           # Jogo principal
│   ├── evolve.css          # Estilos
│   └── modern-design.css   # Design moderno
├── index.html              # Página principal
├── wiki.html               # Wiki do jogo
├── save.html               # Sistema de save
└── modern-demo.html        # Demonstração do design
```

## 🌐 URLs Disponíveis

Após o deploy, você terá acesso a:

- **Jogo Principal**: `https://seu-projeto.vercel.app/`
- **Wiki**: `https://seu-projeto.vercel.app/wiki`
- **Sistema de Save**: `https://seu-projeto.vercel.app/save`
- **Design Moderno**: `https://seu-projeto.vercel.app/modern`
- **Status da API**: `https://seu-projeto.vercel.app/api/status`

## ⚡ Otimizações Implementadas

### Performance
- **Cache otimizado** para arquivos estáticos
- **Compressão gzip** automática
- **Headers de segurança** configurados
- **Lazy loading** de recursos

### SEO
- **Meta tags** otimizadas
- **Open Graph** configurado
- **Sitemap** automático
- **Robots.txt** incluído

### Segurança
- **CSP headers** configurados
- **XSS Protection** ativado
- **Content Type Options** seguros
- **Frame Options** restritivos

## 🔧 Configurações Avançadas

### Variáveis de Ambiente

Você pode configurar variáveis de ambiente na Vercel:

```bash
NODE_ENV=production
VERCEL_REGION=sao1
```

### Domínio Personalizado

1. Vá para as configurações do projeto na Vercel
2. Clique em "Domains"
3. Adicione seu domínio personalizado
4. Configure os registros DNS conforme instruído

### Analytics

Para adicionar analytics:

1. Configure o Google Analytics na Vercel
2. Adicione o ID do GA no `vercel.json`
3. O tracking será automático

## 🛠️ Troubleshooting

### Problemas Comuns

#### Build Falha
```bash
# Verificar logs
vercel logs

# Build local para testar
npm run vercel-build
```

#### Arquivos não encontrados
```bash
# Verificar se todos os arquivos estão presentes
ls -la evolve/
ls -la wiki/
```

#### Erro de dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Logs de Debug

Para ver logs detalhados:

```bash
# Logs em tempo real
vercel logs --follow

# Logs de uma função específica
vercel logs api/status
```

## 📊 Monitoramento

### Métricas Disponíveis
- **Tempo de resposta** das páginas
- **Taxa de erro** do build
- **Uso de banda** e recursos
- **Performance** geral

### Alertas
Configure alertas na Vercel para:
- Falhas de build
- Tempo de resposta alto
- Erros de função
- Uso excessivo de recursos

## 🔄 Atualizações

Para atualizar o deploy:

```bash
# Push para GitHub (deploy automático)
git push origin main

# Ou deploy manual
vercel --prod
```

## 📈 Próximos Passos

### Melhorias Planejadas
1. **PWA** - Progressive Web App
2. **Service Worker** para cache offline
3. **WebAssembly** para cálculos complexos
4. **CDN** global para melhor performance

### Integrações
1. **Analytics** avançado
2. **Error tracking** (Sentry)
3. **Performance monitoring** (New Relic)
4. **A/B testing** (Vercel Analytics)

## 🤝 Suporte

Se encontrar problemas:

1. **Verifique os logs** na Vercel
2. **Teste localmente** primeiro
3. **Consulte a documentação** da Vercel
4. **Abra uma issue** no GitHub

---

**🎮 Evolve na Vercel - Performance e Escalabilidade Garantidas!**
