const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// deduplicate classes
code = code.replace(/(\b\w+(?:-\w+)*(?::\w+(?:-\w+)*)*\b)(?:\s+\1)+/g, '$1');
code = code.replace(/(\b\w+(?:-\w+)*(?::\w+(?:-\w+)*)*\b)(?:\s+\1)+/g, '$1');

// fix specific weird ones
code = code.replace(/dark:bg-slate-900\/10/g, 'dark:bg-slate-800/10');
code = code.replace(/dark:border-slate-400 dark:border-slate-600\/20/g, 'dark:border-slate-700/50');
code = code.replace(/dark:text-slate-200 dark:text-white\/70/g, 'dark:text-white/70');
code = code.replace(/dark:text-white dark:hover:text-slate-800/g, 'dark:text-white dark:hover:text-slate-300');
code = code.replace(/dark:hover:bg-slate-100 dark:bg-slate-900\/30/g, 'dark:hover:bg-slate-800/50');
code = code.replace(/dark:text-slate-200 dark:text-slate-200/g, 'dark:text-slate-200');
code = code.replace(/dark:border-slate-300 dark:border-slate-700\/50/g, 'dark:border-slate-700/50');
code = code.replace(/dark:border-slate-300 dark:border-slate-700\/30/g, 'dark:border-slate-700/30');

// Fix green/yellow leftover text in placeholder
code = code.replace(/placeholder-green-800/g, 'placeholder-slate-600');

fs.writeFileSync('app/page.tsx', code);
