const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// The main rounded icons that were cyan-500
// w-8 h-8 flex items-center justify-center text-cyan-500 bg-cyan-500/10 border border-cyan-500/20
// They are now green. Let's make the main icon yellow.
code = code.replace(/text-green-500 bg-green-500\/10 border border-green-500\/20/g, 'text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.2)]');

// Sidebar highlights
// currently: text-green-600 dark:text-green-400
// we can change to text-yellow-600 dark:text-yellow-400 for selected categories
// wait, we replaced emerald with green, so it might be text-green-600 now.
code = code.replace(/text-green-600 dark:text-green-400/g, 'text-yellow-600 dark:text-yellow-400');
code = code.replace(/bg-green-50 dark:bg-green-500\/10(?! border-green-100)/g, 'bg-yellow-50 dark:bg-yellow-500/10'); // exclude if there is border-green-100 nearby to avoid weird mixes
// Actually let's just make the selected category use yellow:
code = code.replace(/bg-green-50 dark:bg-green-500\/10 text-yellow-600/g, 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600');
code = code.replace(/border-green-500\/30 shadow-\[0_0_10px_rgba\(34,197,94,0\.1\)\]/g, 'border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.1)]'); // yellow shadow

// Button in bottom "Limpar busca" / "Resetar Parâmetros"
// mt-8 px-8 py-3.5 bg-green-600 dark:bg-green-600 text-yellow-500 rounded-lg...
code = code.replace(/bg-green-600 dark:bg-green-600/g, 'bg-green-600 dark:bg-green-500');

// Header title "SISTEMA LESTE"
// <span className="text-green-500">LESTE</span> -> Make it yellow
code = code.replace(/text-green-500">LESTE<\/span>/g, 'text-yellow-500">LESTE</span>');

// Let's change the background pulses to yellow
code = code.replace(/bg-green-500 opacity-20 dark:opacity-20 blur-\[100px\]/g, 'bg-yellow-500 opacity-20 dark:opacity-20 blur-[100px]');

fs.writeFileSync('app/page.tsx', code);
console.log('done');
