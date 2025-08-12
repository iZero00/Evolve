export default function handler(req, res) {
  // Configurar CORS para permitir requisições
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Se for uma requisição OPTIONS, retornar apenas os headers
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Retornar status do servidor
  res.status(200).json({
    status: 'online',
    version: '1.4.8',
    platform: 'vercel',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    region: process.env.VERCEL_REGION || 'unknown'
  });
}
