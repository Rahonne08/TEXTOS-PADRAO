const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Copy button style
code = code.replace(
  /"bg-white dark:bg-\[#0b1120\] border border-slate-200 dark:border-yellow-400\/30 text-slate-400 dark:text-green-600\/70 group-hover:bg-green-600 dark:group-hover:bg-green-600\/20 group-hover:border-yellow-400 dark:group-hover:border-yellow-400 group-hover:text-white dark:group-hover:text-yellow-50"/g,
  '"bg-white/80 dark:bg-[#002776]/50 border border-slate-200 dark:border-yellow-400/30 text-blue-800 dark:text-green-400 group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-yellow-400 group-hover:border-yellow-400 dark:group-hover:border-yellow-400 group-hover:text-white dark:group-hover:text-[#002776]"'
);
// Make the card borders slightly more sports/stadium looking
code = code.replace(
  /"group bg-white\/70 dark:bg-\[#0b1120\]\/70 backdrop-blur-xl border border-slate-200\/60 dark:border-yellow-400\/30 rounded-2xl p-6 hover:bg-white dark:hover:bg-\[#0f172a\] hover:border-yellow-400\/50 dark:hover:border-yellow-400\/80 hover:shadow-\[0_8px_30px_rgba\(34,197,94,0\.15\)\] dark:hover:shadow-\[0_8px_30px_rgba\(34,197,94,0\.2\)\] transition-all duration-300 flex flex-col relative overflow-hidden"/g,
  '"group bg-white/70 dark:bg-[#002776]/40 backdrop-blur-xl border border-green-600/20 dark:border-yellow-400/30 rounded-2xl p-6 hover:bg-white dark:hover:bg-[#002776]/60 hover:border-green-600 dark:hover:border-yellow-400/80 hover:shadow-[0_8px_30px_rgba(255,223,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(255,223,0,0.2)] transition-all duration-300 flex flex-col relative overflow-hidden"'
);
// Selected category style
code = code.replace(
  /"bg-green-50 dark:bg-green-600\/10 text-green-600 dark:text-yellow-400 dark:border-yellow-400\/30 shadow-\[0_0_10px_rgba\(34,197,94,0\.1\)\]"/g,
  '"bg-gradient-to-r from-green-500/10 to-yellow-400/10 dark:from-green-900/40 dark:to-yellow-700/40 text-green-700 dark:text-yellow-400 border border-green-400/50 dark:border-yellow-400/50 shadow-[0_0_15px_rgba(0,156,59,0.1)]"'
);

// Search input wrapper
code = code.replace(/bg-white\/90 dark:bg-\[#020617\]\/90 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200\/50 dark:border-green-800\/40/g,
 'bg-white/90 dark:bg-[#002776]/60 backdrop-blur-xl rounded-2xl shadow-[0_4px_20px_rgba(0,39,118,0.1)] dark:shadow-[0_4px_20px_rgba(255,223,0,0.1)] border border-blue-600/20 dark:border-yellow-400/40');

fs.writeFileSync('app/page.tsx', code);
console.log('done styles 2');
