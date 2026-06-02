const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const targetBackground = `    <div className="h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-yellow-50 font-sans selection:bg-green-200/50 dark:selection:bg-green-600/30 flex overflow-hidden transition-colors duration-500 relative">
      {/* Sci-fi Energy Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#22c55e1a_1px,transparent_1px),linear-gradient(to_bottom,#22c55e1a_1px,transparent_1px)]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-600 opacity-20 dark:opacity-20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-yellow-400/10 dark:bg-yellow-500/10 blur-[120px] animate-pulse-slow"></div>
      </div>`;

const replacementBackground = `    <div className="h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-blue-500 dark:from-green-900 dark:via-yellow-800 dark:to-blue-900 text-slate-900 dark:text-yellow-50 font-sans selection:bg-green-200/50 dark:selection:bg-green-600/30 flex overflow-hidden transition-colors duration-500 relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-40 dark:opacity-20 mix-blend-multiply dark:mix-blend-overlay">
        <img src="https://images.vexels.com/media/users/3/152348/isolated/preview/e292f8cec7eae5f8f4f25bcc36cfe5f5-logo-da-selecao-brasileira-de-futebol.png" alt="Brazil CBF Logo" className="w-[120vw] md:w-[70vw] object-cover sm:object-contain drop-shadow-2xl blur-[2px]" />
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-blue-500 opacity-30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-yellow-500 opacity-20 blur-[150px] animate-pulse-slow"></div>
      </div>`;

if (code.includes(targetBackground)) {
    code = code.replace(targetBackground, replacementBackground);
    fs.writeFileSync('app/page.tsx', code);
    console.log('done - matched multiline text');
} else {
    console.log('could not find target text');
}
