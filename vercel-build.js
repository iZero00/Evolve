#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build para Vercel...');

try {
  // Verificar se estamos no ambiente da Vercel
  const isVercel = process.env.VERCEL === '1';
  console.log(`🌐 Ambiente: ${isVercel ? 'Vercel' : 'Local'}`);

  // Executar build do Evolve
  console.log('📦 Construindo Evolve...');
  execSync('npm run evolve', { stdio: 'inherit' });

  // Executar build do CSS
  console.log('🎨 Construindo CSS...');
  try {
    execSync('npm run evolve-less', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Tentando com comando Windows...');
    execSync('npm run evolve-less-win', { stdio: 'inherit' });
  }

  // Executar build da Wiki
  console.log('📚 Construindo Wiki...');
  execSync('npm run wiki', { stdio: 'inherit' });

  // Executar build do CSS da Wiki
  console.log('🎨 Construindo CSS da Wiki...');
  try {
    execSync('npm run wiki-less', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Tentando com comando Windows...');
    execSync('npm run wiki-less-win', { stdio: 'inherit' });
  }

  // Verificar se os arquivos foram criados
  const requiredFiles = [
    'evolve/evolve.js',
    'evolve/evolve.css',
    'wiki/wiki.js',
    'wiki/wiki.css',
    'index.html'
  ];

  console.log('✅ Verificando arquivos gerados...');
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} - OK`);
    } else {
      console.error(`❌ ${file} - FALTANDO`);
      process.exit(1);
    }
  });

  // Criar arquivo de status para a Vercel
  const statusInfo = {
    buildTime: new Date().toISOString(),
    version: '1.4.8',
    platform: 'vercel',
    files: requiredFiles.filter(file => fs.existsSync(file)),
    buildSuccess: true
  };

  fs.writeFileSync('build-status.json', JSON.stringify(statusInfo, null, 2));
  console.log('📊 Status do build salvo em build-status.json');

  console.log('🎉 Build concluído com sucesso!');
  console.log('📁 Arquivos prontos para deploy:');
  console.log('   - index.html (Jogo Principal)');
  console.log('   - wiki.html (Wiki do Jogo)');
  console.log('   - save.html (Sistema de Save)');
  console.log('   - modern-demo.html (Design Moderno)');

} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}
