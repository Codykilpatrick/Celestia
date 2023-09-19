import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-12xl bg-violet-dark-1 min-h-screen">
      <div className={inter.className}>{children}</div>
    </div>
  );
}
