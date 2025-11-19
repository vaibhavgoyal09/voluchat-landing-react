import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VoluChat - Your Instagram Growth Assistant | Automate Engagement & Sales',
  description: 'The intelligent assistant for ambitious Instagram sellers. Automate comment responses, capture leads instantly, and grow your sales on autopilot.',
  openGraph: {
    title: 'VoluChat - Your Instagram Growth Assistant',
    description: 'Automate engagement, capture every lead, and grow your Instagram sales effortlessly.',
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
      <head>
        <link rel="icon" href="/voluchat_logo.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
