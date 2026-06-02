const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Change z-40 to z-[60] for Hero Selection wrapper
code = code.replace(/<div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white\/20 dark:bg-\[#002776\]\/80 backdrop-blur-md">/g, 
  '<div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-white/40 dark:bg-[#002776]/90 backdrop-blur-xl">');

// Efeito de confetes discretos ao carregar a página
code = code.replace(
  /animate={{ y: \[0, -10, 0\], rotate: \[0, 5, -5, 0\] }}/g, 
  'animate={{ y: [0, -15, 0], rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}'
);
fs.writeFileSync('app/page.tsx', code);
console.log('done fix');
