const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Replace the rgba shadow colors for cyan (6,182,212) to green (34,197,94)
code = code.replace(/16,185,129/g, '34,197,94'); // emerald to green
code = code.replace(/6,182,212/g, '34,197,94'); // If any cyan was left in rgba
code = code.replace(/#22d3ee/g, '#22c55e'); // cyan text hex to green
code = code.replace(/#f87171/g, '#ef4444'); // fix red

// Replace some green backgrounds with yellow to make it more 50/50 green and yellow.
// Primary button on Worldcup might look good with yellow background and green text? Or green background and yellow text.
code = code.replace(/bg-green-500/g, 'bg-green-600');
code = code.replace(/bg-green-600 dark:bg-green-600 text-white/g, 'bg-green-600 dark:bg-green-600 text-yellow-500');

fs.writeFileSync('app/page.tsx', code);
console.log('done');
