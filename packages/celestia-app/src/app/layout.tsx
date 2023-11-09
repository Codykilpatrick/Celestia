import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-plum-1 min-h-screen pb-8">
      <Header />
      <div className={inter.className}>{children}</div>
    </div>
  );
}
