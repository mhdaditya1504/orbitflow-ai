import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OrbitFlow AI — MiMo-ready AgentOps Dashboard',
  description: 'Agent workflow monitor and OpenAI-compatible Xiaomi MiMo gateway demo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
