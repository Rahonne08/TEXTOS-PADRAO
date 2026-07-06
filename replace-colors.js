const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// The instruction is to make light mode: white background, black text.
// Dark mode: black background, white text.

// We will replace specific World Cup themes (green, yellow, blue, etc) with neutral slates/blacks/whites.

// Global regex replacements for colors:
code = code.replace(/text-green-\d+/g, 'text-slate-900 dark:text-white');
code = code.replace(/text-yellow-\d+/g, 'text-slate-800 dark:text-slate-200');
code = code.replace(/bg-green-\d+/g, 'bg-slate-100 dark:bg-slate-800');
code = code.replace(/bg-yellow-\d+/g, 'bg-slate-200 dark:bg-slate-700');
code = code.replace(/border-green-\d+/g, 'border-slate-300 dark:border-slate-700');
code = code.replace(/border-yellow-\d+/g, 'border-slate-400 dark:border-slate-600');
code = code.replace(/ring-green-\d+/g, 'ring-slate-400 dark:ring-slate-600');
code = code.replace(/from-green-\d+/g, 'from-slate-100 dark:from-slate-900');
code = code.replace(/to-blue-\d+/g, 'to-slate-200 dark:to-slate-950');
code = code.replace(/to-yellow-\d+/g, 'to-slate-300 dark:to-slate-800');

// Specific HEX replacements
code = code.replace(/bg-\[#002776\]/g, 'bg-slate-900');
code = code.replace(/bg-\[#0b1120\]/g, 'bg-black');
code = code.replace(/bg-\[#020617\]/g, 'bg-black');
code = code.replace(/bg-\[#060b13\]/g, 'bg-black');

// Specific text colors
code = code.replace(/text-blue-\d+/g, 'text-slate-900 dark:text-slate-100');
code = code.replace(/text-slate-\d+/g, 'text-slate-800 dark:text-slate-300');

// Dark mode overrides
code = code.replace(/dark:bg-slate-\d+/g, 'dark:bg-slate-900');
code = code.replace(/dark:text-slate-\d+/g, 'dark:text-slate-200');

// Fix specific styles in Negotiation Table
code = code.replace(/text-slate-800 dark:text-slate-200 dark:text-yellow-50/g, 'text-black dark:text-white');

// Remove football text
code = code.replace(/🏆 Inspirado na paixão do futebol brasileiro/g, 'Textos e Templates');
code = code.replace(/🇧🇷 Brasil rumo ao Hexa/g, 'Sistema de Registros');

// Remove vexels images
code = code.replace(/<img src="https:\/\/images\.vexels\.com.*? \/>/g, '');

fs.writeFileSync('app/page.tsx', code);
