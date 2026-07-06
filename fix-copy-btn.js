const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(
  /"bg-slate-100 dark:bg-slate-900 border-indigo-300 dark:border-indigo-700 text-white scale-110"/g,
  '"bg-indigo-100 dark:bg-indigo-900/40 border-indigo-300 dark:border-indigo-500/50 text-indigo-700 dark:text-indigo-400 scale-110 shadow-[0_0_15px_rgba(99,102,241,0.2)]"'
);

code = code.replace(
  /"bg-slate-50 dark:bg-slate-950 border-slate-200\/50 dark:border-indigo-700\/50 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800\/50 hover:text-indigo-500 hover:border-indigo-300 dark:border-indigo-700 hover:shadow-md"/g,
  '"bg-slate-50 dark:bg-slate-950 border-slate-200/50 dark:border-indigo-700/50 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md"'
);

code = code.replace(
  /<Check className="w-5 h-5" \/>/g,
  '<Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />'
);

fs.writeFileSync('app/page.tsx', code);
