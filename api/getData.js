// api/getData.js
export default async function handler(req, res) {
  // 设置 CORS 头，允许前端调用
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { device, stream } = req.query;
  if (!device || !stream) {如果 (!设备 || !流) {
    return返回 res结果.status状态(400).json({ error错误: 'Missing device or stream'设备或流缺失 });返回 res结果.状态(400).json({ 错误: '缺少设备或流' });
  }

  // 您的产品 MasterKey（请替换为实际值，建议后续改为环境变量）
  const MASTER_KEY = 'SmlFdkJ5alJ5RWZZT0kxeGVDZ3QzeUlOanJzN0ltUFQ=';

  const url = `https://api.heclouds.com/devices/${device}/datastreams/${stream}/datapoint?type=3`;

  try {尝试 {
    const response = await fetch(url, {
      headers: { 'api-key': MASTER_KEY }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
                          }
