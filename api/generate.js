// Vercel Serverless Function - 即梦API代理
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '仅支持POST请求' });
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: '缺少prompt参数' });
  const apiKey = process.env.VOLC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: '服务器未配置API Key' });
  try {
    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/images/generations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'doubao-seedream-3-0-t2i', prompt, size: '1080x1920', n: 1, response_format: 'url', watermark: false })
    });
    if (!response.ok) { const errorData = await response.json().catch(()=>({})); return res.status(response.status).json({ error: '图片生成失败', detail: errorData }); }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) { return res.status(500).json({ error: '服务器内部错误', message: err.message }); }
};
