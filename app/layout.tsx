import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VoluChat - AI-powered Instagram DM assistant for ambitious online sellers',
  description: 'Turn your Instagram DMs into a 24/7 sales machine with VoluChat. AI automation for Instagram sellers and D2C brands.',
  openGraph: {
    title: 'VoluChat - AI-powered Instagram DM assistant',
    description: 'Turn your Instagram DMs into a 24/7 sales machine with VoluChat.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
