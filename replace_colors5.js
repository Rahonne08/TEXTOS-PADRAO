const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// The main grid background in dark mode
code = code.replace(/#06b6d41a/g, '#22c55e1a');

// We have cyan hexes left.
// Let's replace some cyan hexes carefully if there are any.
// cyan-500: #06b6d4
// cyan-400: #22d3ee
// cyan-600: #0891b2
code = code.replace(/#06b6d4/g, '#22c55e');
code = code.replace(/#0891b2/g, '#16a34a');

fs.writeFileSync('app/page.tsx', code);
console.log('done');
