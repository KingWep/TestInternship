export default async function handler(req, res) {
  const { shop_code } = req.query;

  if (!shop_code || typeof shop_code !== 'string') {
    return res.status(400).json({ error: "Missing shop_code" });
  }

  const apiDomain = "https://onlineapi.chomnenhapp.com";
  let shopName = `Chomnenh - ${shop_code}`;
  let logoUrl = '/images/digitalshop.png';

  try {
    // ហៅ API ដើម្បីទាញទិន្នន័យ Logo (សូមកែ URL បើចាំបាច់)
    const apiUrl = `${apiDomain}/api/settings`;
    const apiResponse = await fetch(apiUrl);
    
    if (apiResponse.ok) {
      const result = await apiResponse.json();
      if (result.success && result.data) {
        const data = result.data;
        shopName = data.shop_name;
        
        if (data.logo) {
          logoUrl = `${apiDomain}${data.logo}`;
        }
      }
    }
  } catch (error) {
    console.error("Manifest: មិនអាចទាញទិន្នន័យពី API:", error);
  }

  const manifest = {
    id: `/${shop_code}/`,
    name: shopName,
    short_name: shopName,
    start_url: `/${shop_code}/`,
    scope: `/${shop_code}/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: logoUrl,
        sizes: "192x192",
        type: "image/png", 
        purpose: "any maskable"
      },
      {
        src: logoUrl,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };

  res.setHeader("Content-Type", "application/json");
  // កំណត់ Cache ត្រឹម 5 នាទីចុះ ដើម្បីឱ្យពេលហាងដូរ Logo វាឆាប់ Update
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  res.status(200).json(manifest);
}