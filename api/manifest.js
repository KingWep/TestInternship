export default function handler(req, res) {
  const { shop_code } = req.query;

  if (!shop_code) {
    return res.status(400).json({ error: "Missing shop_code" });
  }

  const manifest = {
    id: `/${shop_code}`,
    name: `Chomnenh - ${shop_code}`,
    short_name: shop_code,
    start_url: `/${shop_code}`,
    scope: `/${shop_code}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.status(200).json(manifest);
}
