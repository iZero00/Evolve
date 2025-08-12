#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Iniciando Evolve - Servidor Otimizado');
console.log('==========================================');

// Verificar se as dependências estão instaladas
function checkDependencies() {
    const packageJson = require('./package.json');
    const nodeModules = path.join(__dirname, 'node_modules');
    
    if (!fs.existsSync(nodeModules)) {
        console.log('📦 Instalando dependências...');
        return new Promise((resolve, reject) => {
            const install = spawn('npm', ['install'], { stdio: 'inherit' });
            install.on('close', (code) => {
                if (code === 0) {
                    console.log('✅ Dependências instaladas com sucesso!');
                    resolve();
                } else {
                    reject(new Error('Falha ao instalar dependências'));
                }
            });
        });
    }
    return Promise.resolve();
}

// Função para iniciar o servidor
function startServer() {
    console.log('🌐 Iniciando servidor na porta 4400...');
    
    const server = spawn('npm', ['run', 'serve'], { 
        stdio: 'inherit',
        shell: true 
    });
    
    server.on('error', (error) => {
        console.error('❌ Erro ao iniciar servidor:', error.message);
        process.exit(1);
    });
    
    server.on('close', (code) => {
        if (code !== 0) {
            console.error(`❌ Servidor encerrado com código ${code}`);
        }
    });
    
    // Tratamento de sinais para encerramento limpo
    process.on('SIGINT', () => {
        console.log('\n🛑 Encerrando servidor...');
        server.kill('SIGINT');
        process.exit(0);
    });
    
    process.on('SIGTERM', () => {
        console.log('\n🛑 Encerrando servidor...');
        server.kill('SIGTERM');
        process.exit(0);
    });
}

// Função principal
async function main() {
    try {
        await checkDependencies();
        
        // Aguardar um momento para garantir que tudo está pronto
        setTimeout(() => {
            startServer();
        }, 1000);
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
        process.exit(1);
    }
}

// Executar função principal
main();
