import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Texto Padrão Atendimento Leste — Outubro Rosa 🎀',
  description: 'Texto Padrão Atendimento Leste - Edição Especial Outubro Rosa: Cuidar de si também é um ato de amor.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ec4899" stroke="%23db2777" stroke-width="1.5"><path d="M12 2C8 2 6 5 6 8c0 4 6 11 6 11s6-7 6-11c0-3-2-6-6-6z"/><circle cx="12" cy="8" r="2.5" fill="%23fce7f3"/></svg>',
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
