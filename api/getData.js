// api/getData.js
module.exports = async (req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // 获取查询参数
  const { device, stream } = req.query;
  if (!device || !stream) {
    return res.status(400).json({ error: 'Missing device or stream' });
  }

  // 产品 MasterKey（请替换为您的实际密钥）
  const MASTER_KEY = 'C8vpPw9p4YnncYVJ5eVvo+kfNaPxJdVf3wkl9SlXTYs=';

  // OneNET API URL（支持设备名称）
  const url = `https://api.heclouds.com/devices/${encodeURIComponent(device)}/datastreams/${encodeURIComponent(stream)}/datapoint?type=3`;

  try {
    const response = await fetch(url, {
      headers: { 'api-key': MASTER_KEY }
    });
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: `OneNET error: ${response.status}`, details: errorText });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};
