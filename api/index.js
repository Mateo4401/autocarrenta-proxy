export default async function handler(req, res) {
  const TARGET_API = "http://autocarrenta.runasp.net";

  const url = TARGET_API + req.url.replace("/api", "");

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
      },
      body: ["POST", "PUT", "PATCH"].includes(req.method)
        ? req.body
        : undefined,
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    console.error("PROXY ERROR:", err);
    res.status(500).json({ error: "Proxy failed", detail: err.message });
  }
}

