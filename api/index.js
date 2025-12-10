import fetch from "node-fetch";

export default async function handler(req, res) {
  const TARGET_API = "http://autocarrenta.runasp.net";

  // quita /api del inicio y reenvía la ruta completa a tu backend
  const path = req.url.replace("/api", "");
  const url = TARGET_API + path;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
      },
      body: ["POST", "PUT", "PATCH"].includes(req.method)
        ? req.body
        : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy failed", detail: err.message });
  }
}

