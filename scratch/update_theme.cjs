// const fs = require('fs');
// const path = require('path');

// const tailwindPath = path.join(__dirname, '../tailwind.config.js');
// let tailwindConfig = fs.readFileSync(tailwindPath, 'utf8');

// // Add brand colors
// if (!tailwindConfig.includes('brand: {')) {
//   tailwindConfig = tailwindConfig.replace(
//     /colors: \{/,
//     `colors: {\n        brand: {\n          navy: '#0B132B',\n          gold: '#D4AF37',\n          silver: '#94A3B8',\n        },`
//   );
//   fs.writeFileSync(tailwindPath, tailwindConfig);
// }

// const componentsDir = path.join(__dirname, '../src/global/feature/overview/components');
// const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

// const replacements = [
//   // Backgrounds
//   [/bg-white/g, 'bg-brand-navy/50'],
//   [/bg-gray-50/g, 'bg-brand-navy'],
//   [/bg-slate-50/g, 'bg-brand-navy'],
//   // Gradients
//   [/from-gray-50 to-white/g, 'from-brand-navy to-[#060B19]'],
//   [/from-blue-600 to-indigo-600/g, 'from-brand-gold to-yellow-200'],
//   // Text colors
//   [/text-gray-900/g, 'text-white'],
//   [/text-gray-800/g, 'text-white'],
//   [/text-gray-600/g, 'text-brand-silver'],
//   [/text-gray-500/g, 'text-brand-silver'],
//   [/text-slate-600/g, 'text-brand-silver'],
//   [/text-blue-600/g, 'text-brand-gold'],
//   [/text-blue-700/g, 'text-brand-gold'],
//   [/text-blue-500/g, 'text-brand-gold'],
//   // Background colors
//   [/bg-blue-600/g, 'bg-brand-gold text-brand-navy'],
//   [/bg-blue-500/g, 'bg-brand-gold'],
//   [/bg-blue-700/g, 'bg-yellow-600'],
//   [/bg-blue-50/g, 'bg-brand-gold/10'],
//   [/bg-blue-100/g, 'bg-brand-gold/20'],
//   // Borders
//   [/border-gray-100/g, 'border-white/10'],
//   [/border-gray-200/g, 'border-white/10'],
//   [/border-slate-100/g, 'border-white/10'],
//   [/border-slate-200/g, 'border-white/10'],
//   [/border-blue-100/g, 'border-brand-gold/20'],
//   [/border-blue-200/g, 'border-brand-gold/30'],
//   // Hovers
//   [/hover:bg-blue-700/g, 'hover:bg-yellow-500'],
//   [/hover:bg-blue-50/g, 'hover:bg-brand-gold/10'],
//   [/hover:bg-gray-50/g, 'hover:bg-white/5'],
//   [/hover:border-gray-300/g, 'hover:border-brand-gold/50'],
//   // Shadows
//   [/shadow-blue-500\/30/g, 'shadow-brand-gold/20'],
//   [/shadow-blue-500\/20/g, 'shadow-brand-gold/10'],
// ];

// files.forEach(file => {
//   const filePath = path.join(componentsDir, file);
//   let content = fs.readFileSync(filePath, 'utf8');
  
//   // Custom replace for 'bg-brand-gold text-brand-navy text-white' issue
//   // The first replace adds 'text-brand-navy', so we might have conflicting text colors.
  
//   replacements.forEach(([regex, replacement]) => {
//     content = content.replace(regex, replacement);
//   });
  
//   // Cleanup artifacts
//   content = content.replace(/text-brand-navy text-white/g, 'text-brand-navy');
//   content = content.replace(/bg-brand-navy\/50 border/g, 'bg-brand-navy border'); // for cards
  
//   fs.writeFileSync(filePath, content);
// });

// // Update GlobalPage.jsx
// const globalPagePath = path.join(__dirname, '../src/global/feature/overview/GlobalPage.jsx');
// let globalPageContent = fs.readFileSync(globalPagePath, 'utf8');
// globalPageContent = globalPageContent.replace(/bg-white/g, 'bg-brand-navy');
// globalPageContent = globalPageContent.replace(/text-gray-900/g, 'text-white');
// fs.writeFileSync(globalPagePath, globalPageContent);

// console.log('Update complete');
