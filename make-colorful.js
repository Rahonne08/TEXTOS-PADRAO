const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Container
code = code.replace(/bg-white dark:bg-black text-black dark:text-white/g, 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100');

// Sidebars & Headers
code = code.replace(/bg-white\/80 dark:bg-black\/80/g, 'bg-white/80 dark:bg-slate-900/80');
code = code.replace(/bg-white\/60 dark:bg-black\/60/g, 'bg-white/60 dark:bg-slate-900/60');
code = code.replace(/bg-white dark:bg-black/g, 'bg-white dark:bg-slate-900');
code = code.replace(/bg-white dark:bg-slate-900\/20/g, 'bg-white dark:bg-slate-800');
code = code.replace(/dark:bg-black/g, 'dark:bg-slate-950');

// Hover states and active states
// Let's add some indigo/violet
code = code.replace(/bg-slate-100 dark:bg-slate-800/g, 'bg-indigo-50 dark:bg-indigo-950/50');
code = code.replace(/bg-slate-200 dark:bg-slate-700/g, 'bg-indigo-100 dark:bg-indigo-900/50');
code = code.replace(/bg-slate-100 dark:bg-slate-900\/30/g, 'bg-indigo-50 dark:bg-indigo-900/20');
code = code.replace(/bg-slate-50 dark:bg-slate-900\/50/g, 'bg-slate-50 dark:bg-slate-900/50');

// Text colors for accents
code = code.replace(/text-slate-800 dark:text-slate-200/g, 'text-slate-700 dark:text-slate-200');
code = code.replace(/text-slate-900 dark:text-slate-100/g, 'text-slate-900 dark:text-slate-100');

// Icon accents
code = code.replace(/text-amber-600 dark:text-amber-400/g, 'text-indigo-600 dark:text-indigo-400');
code = code.replace(/text-amber-800 dark:text-amber-200/g, 'text-indigo-800 dark:text-indigo-200');
code = code.replace(/bg-amber-50 dark:bg-amber-900\/20/g, 'bg-indigo-50 dark:bg-indigo-900/20');
code = code.replace(/border-amber-200 dark:border-amber-900\/50/g, 'border-indigo-200 dark:border-indigo-900/50');

// Rings and borders
code = code.replace(/ring-slate-400 dark:ring-slate-600/g, 'ring-indigo-500/50 dark:ring-indigo-400/50');
code = code.replace(/border-slate-300 dark:border-slate-700/g, 'border-indigo-200 dark:border-indigo-800');
code = code.replace(/border-slate-400 dark:border-slate-600/g, 'border-indigo-300 dark:border-indigo-700');

// Buttons / Headers colorful
// Replace static icons with gradient ones
code = code.replace(/text-slate-800 dark:text-slate-200/g, 'text-slate-700 dark:text-slate-200');

fs.writeFileSync('app/page.tsx', code);
