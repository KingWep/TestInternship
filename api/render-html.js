import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { shopCode } = req.query;
  
  const apiDomain = "https://onlineapi.chomnenhapp.com"; 
  let shopName = shopCode; 
  let logoUrl = '/images/chomnenh.png';
  let bioShop = 'Full-featured e-commerce storefront...';

  try {
    // 🚨 កែតម្រូវ៖ ត្រូវតែបញ្ជូន shopCode ទៅឱ្យ API ជាដាច់ខាត
    const apiUrl = `${apiDomain}/api/settings?shop_code=${shopCode}`; 
    const apiResponse = await fetch(apiUrl);
    
    if (apiResponse.ok) {
      const result = await apiResponse.json();
      
      if (result.data && result.data.setting) {
        const setting = result.data.setting;
        
        // 🚨 កែតម្រូវ៖ លុប "|| shopCode" ចេញ ដើម្បីផ្ទៀងផ្ទាត់ឱ្យបានត្រឹមត្រូវ
        if (setting.shop_code === shopCode) {
          shopName = setting.shop_name;
          
          if (setting.logo) {
            logoUrl = `${apiDomain}${setting.logo}`;
          }
          
          if (setting.bio_shop) {
            bioShop = setting.bio_shop;
          }
        }
      }
    }
  } catch (error) {
    console.error("មិនអាចទាញទិន្នន័យពី API:", error);
  }

  // Log មើលលទ្ធផលពិតប្រាកដ (អ្នកអាចឆែកមើលក្នុង Vercel Logs)
  console.log("=== ព័ត៌មានហាងសម្រាប់ការបង្កើត App (HTML) ===");
  console.log("👉 ឈ្មោះហាង (App Name):", shopName);
  console.log("👉 តំណភ្ជាប់ Logo (Logo URL):", logoUrl);
  console.log("===================================");

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