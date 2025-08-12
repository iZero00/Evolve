#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Iniciando build simplificado para Vercel...');
console.log(`🌐 Node.js version: ${process.version}`);
console.log(`📦 NPM version: ${execSync('npm --version', { encoding: 'utf8' }).trim()}`);

try {
  // Verificar se estamos no ambiente da Vercel
  const isVercel = process.env.VERCEL === '1';
  console.log(`🌐 Ambiente: ${isVercel ? 'Vercel' : 'Local'}`);

  // Executar build do Evolve
  console.log('📦 Construindo Evolve...');
  execSync('node buildEvolve.js', { stdio: 'inherit' });

  // Executar build da Wiki
  console.log('📚 Construindo Wiki...');
  execSync('node buildWiki.js', { stdio: 'inherit' });

  // Build manual do CSS se necessário
  console.log('🎨 Construindo CSS...');
  try {
    execSync('npx lessc src/evolve.less evolve/evolve.css', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ CSS build falhou, continuando...');
  }

  try {
    execSync('npx lessc src/wiki/wiki.less wiki/wiki.css', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Wiki CSS build falhou, continuando...');
  }

  // Verificar se os arquivos principais foram criados
  const requiredFiles = [
    'evolve/evolve.js',
    'wiki/wiki.js',
    'index.html'
  ];

  console.log('✅ Verificando arquivos gerados...');
  let allFilesExist = true;
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} - OK`);
    } else {
      console.error(`❌ ${file} - FALTANDO`);
      allFilesExist = false;
    }
  });

  if (!allFilesExist) {
    throw new Error('Arquivos essenciais não foram gerados');
  }

  // Criar arquivo de status
  const statusInfo = {
    buildTime: new Date().toISOString(),
    version: '1.4.8',
    platform: 'vercel',
    nodeVersion: process.version,
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

} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}
