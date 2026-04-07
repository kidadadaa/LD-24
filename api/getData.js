// api/getData.js
module.exports = async function handler(req, res) {
  // 设置 CORS 头，允许前端跨域调用
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { device, stream } = req.query;
  if (!device || !stream) {
    return res.status(400).json({ error: 'Missing device or stream' });
  }

  // 产品 MasterKey（请替换为您的实际密钥）
  const MASTER_KEY = 'C8vpPw9p4YnncYVJ5eVvo+kfNaPxJdVf3wkl9SlXTYs=';

  const url = `https://api.heclouds.com/devices/${device}/datastreams/${stream}/datapoint?type=3`;

  try {
    const response = await fetch(url, {
      headers: { 'api-key': MASTER_KEY }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
