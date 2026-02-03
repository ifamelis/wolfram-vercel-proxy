// redeploy trigger
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { input } = req.body || {};
  if (!input) {
    return res.status(400).json({ error: "Missing input" });
  }

  const appid = process.env.WOLFRAM_APPID;
  if (!appid) {
    return res.status(500).json({ error: "Missing WOLFRAM_APPID" });
  }

  const url =
    "https://api.wolframalpha.com/v2/query" +
    `?input=${encodeURIComponent(input)}` +
    `&appid=${appid}` +
    "&output=json";

  const r = await fetch(url);
  const data = await r.json();
  return res.status(200).json(data);
}
