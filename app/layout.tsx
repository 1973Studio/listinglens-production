import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Listing Lens - AI-Powered Marketplace Analysis',
  description: 'One screenshot. Instant answers. Get comprehensive buyer intelligence for any marketplace listing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* CRITICAL: This script MUST run before page renders to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var darkMode = localStorage.getItem('darkMode');
                  if (darkMode === 'true') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
