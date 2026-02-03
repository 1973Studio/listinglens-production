import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listing Lens - Don\'t Buy Blind',
  description: 'AI-powered buyer\'s advocate. Screenshot any listing for instant market analysis, red flags, and negotiation tips.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
