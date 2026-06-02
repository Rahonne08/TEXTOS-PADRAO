const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Replace Navbar logo and Title
code = code.replace(
  /<div className="w-8 h-8 flex items-center justify-center text-yellow-500 bg-green-600\/10 border border-yellow-400\/20 rounded-lg shadow-\[0_0_15px_rgba\(34,197,94,0\.2\)\]">\s*<Zap className="w-5 h-5" \/>\s*<\/div>\s*<span className="font-bold text-lg tracking-tight text-slate-800 dark:text-yellow-50">SISTEMA <span className="text-yellow-500">LESTE<\/span><\/span>/g,
  `<img src="https://images.vexels.com/media/users/3/152348/isolated/preview/e292f8cec7eae5f8f4f25bcc36cfe5f5-logo-da-selecao-brasileira-de-futebol.png" alt="Logo CBF" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,223,0,0.4)]" />
              <span className="font-black text-lg tracking-tight text-slate-800 dark:text-white uppercase drop-shadow-md">Textos <span className="text-green-600 dark:text-yellow-400">Campeões</span></span>`
);

// Add footer watermark inside the main content area (at the bottom of the right panel)
const footerCode = `          {/* Footer watermark */}
          <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-green-900/30 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-yellow-400/60 font-medium">
            <div className="flex items-center gap-2">
              <img src="https://images.vexels.com/media/users/3/152348/isolated/preview/e292f8cec7eae5f8f4f25bcc36cfe5f5-logo-da-selecao-brasileira-de-futebol.png" alt="CBF" className="w-6 h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              <span>🏆 Inspirado na paixão do futebol brasileiro</span>
            </div>
            <span>🇧🇷 Brasil rumo ao Hexa</span>
          </div>
        </div>
      </main>`;

code = code.replace(/        <\/div>\s*<\/main>/, footerCode);

fs.writeFileSync('app/page.tsx', code);
console.log('done refining layout');
