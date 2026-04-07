// api/getData.js
module.exports = async (req, res) => {
  // 设置 CORS 头，允许前端跨域访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // 获取查询参数
  const { device, stream } = req.query;
  if (!device || !stream) {
    return res.status(400).json({ error: 'Missing required parameters: device and stream' });
  }

  // 产品 MasterKey（请替换为您的实际密钥）
  const MASTER_KEY = 'C8vpPw9p4YnncYVJ5eVvo+kfNaPxJdVf3wkl9SlXTYs=';

  // OneNET API URL（支持设备名称作为 device_id）
  const url = `https://api.heclouds.com/devices/${encodeURIComponent(device)}/datastreams/${encodeURIComponent(stream)}/datapoint?type=3`;

  try {
    // 发起请求到 OneNET
    const response = await fetch(url, {
      headers: { 'api-key': MASTER_KEY }
    });

    // 检查响应状态
    if (!response.ok) {
      // 尝试读取错误信息
      const errorText = await response.text();
      return res.status(response.status).json({ error: `OneNET API error: ${response.status}`, details: errorText });
    }

    // 解析 JSON
    const data = await response.json();
    // 直接返回 OneNET 的原始响应
    res.status(200).json(data);
  } catch (err) {
    // 网络或解析错误
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};
