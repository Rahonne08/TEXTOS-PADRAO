const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Replace emerald (the green we just made) to a solid green for World Cup.
code = code.replace(/emerald/g, 'green');

// Let's replace some specific elements with yellow to give the World cup feel.
// For example, replace some green borders with yellow
code = code.replace(/border-green-500/g, 'border-yellow-400');
code = code.replace(/border-green-400/g, 'border-yellow-400');

// Some text to yellow
code = code.replace(/text-green-400/g, 'text-yellow-400');
code = code.replace(/text-green-50/g, 'text-yellow-50');
code = code.replace(/text-green-300/g, 'text-yellow-300');

// Hover background to yellow
code = code.replace(/hover:bg-green-400/g, 'hover:bg-yellow-500');
code = code.replace(/hover:text-green-200/g, 'hover:text-yellow-200');

fs.writeFileSync('app/page.tsx', code);
console.log('done');
