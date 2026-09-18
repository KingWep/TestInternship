import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { shopCode } = req.query; // shopCode នឹងស្មើនឹង "4234dsd"
  
  const apiDomain = "https://onlineapi.chomnenhapp.com"; 
  let shopName = shopCode; // Default
  let logoUrl = '/images/digitalshop.png'; // Default
  let bioShop = 'Full-featured e-commerce storefront...'; // Default

  try {
    // ហៅ API របស់អ្នក ដោយបញ្ចូល shopCode ជា Query បើចាំបាច់
    // បើ API អ្នកត្រូវការបញ្ជូន shopCode សូមដូរទៅតាមជាក់ស្តែង (ឧ: /api/settings?shop_code=${shopCode})
    const apiUrl = `${apiDomain}/api/settings`; 
    const apiResponse = await fetch(apiUrl);
    
    if (apiResponse.ok) {
      const result = await apiResponse.json();
      
      if (result.success && result.data) {
        const data = result.data;
        // ប្រសិនបើ API នេះពិតជារបស់ហាងនេះមែន (ការពារការខុសទិន្នន័យ)
        if (data.shop_code === shopCode || shopCode) {
          shopName = data.shop_name;
          
          // ដោយសារ logo មានទម្រង់ /uploads/... យើងត្រូវថែម Domain ពីមុខឱ្យវា
          if (data.logo) {
            logoUrl = `${apiDomain}${data.logo}`;
          }
          
          if (data.bio_shop) {
            bioShop = data.bio_shop;
          }
        }
      }
    }
  } catch (error) {
    console.error("មិនអាចទាញទិន្នន័យពី API:", error);
  }

  // អាន File HTML
  const filePath = path.join(process.cwd(), 'dist', 'index.html');
  
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    const manifestUrl = `/api/manifest?shop_code=${shopCode}`;

    // បញ្ចូលទិន្នន័យ Dynamic ទៅក្នុង HTML 
    const pwaTags = `
      <link rel="manifest" href="${manifestUrl}" />
      <link rel="apple-touch-icon" href="${logoUrl}" />
      <meta name="apple-mobile-web-app-title" content="${shopName}" />
      <title>${shopName} - Chomnenh</title>
      <meta name="description" content="${bioShop}" />
      <meta property="og:title" content="${shopName} - Chomnenh" />
      <meta property="og:image" content="${logoUrl}" />
    `;

    html = html.replace('</head>', `${pwaTags}</head>`);
    
    html = html.replace('<title>Chomnenh Digital</title>', '');

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);

  } catch (err) {
    res.status(500).send('Error loading page');
  }
}