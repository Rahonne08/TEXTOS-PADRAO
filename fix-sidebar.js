const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(
  /"bg-slate-200 dark:bg-slate-800\/10 text-slate-800 dark:text-slate-200 dark:border-slate-400 dark:border-slate-600\/30 shadow-\[0_0_10px_rgba\(234,179,8,0.1\)\]"/g,
  '"bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 shadow-sm"'
);

code = code.replace(
  /"text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-100 dark:bg-slate-900\/20 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-800 dark:text-slate-200 dark:hover:border-slate-400 dark:border-slate-600\/20"/g,
  '"text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"'
);

fs.writeFileSync('app/page.tsx', code);
