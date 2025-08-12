// Configuração otimizada para o servidor Evolve
const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 4400;

// Middleware de segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://unpkg.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://www.googletagmanager.com"]
        }
    }
}));

// Compressão gzip para melhor performance
app.use(compression());

// Cache estático otimizado
app.use(express.static('.', {
    maxAge: '1d',
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
        if (path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para o design moderno
app.get('/modern', (req, res) => {
    res.sendFile(path.join(__dirname, 'modern-demo.html'));
});

// API para status do servidor
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        version: '1.4.8',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
    });
});

// Middleware de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Middleware 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor Evolve otimizado rodando em http://localhost:${PORT}`);
    console.log(`📱 Design moderno disponível em http://localhost:${PORT}/modern`);
    console.log(`📊 Status do servidor: http://localhost:${PORT}/api/status`);
    console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
});

module.exports = app;
