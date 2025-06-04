export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://krafthammer.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  res.json({
    success: true,
    message: 'CORS test passed',
    timestamp: new Date().toISOString()
  });
};
