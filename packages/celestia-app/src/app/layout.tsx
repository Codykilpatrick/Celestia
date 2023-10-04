import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient">
      <Header />
      <div className={inter.className}>{children}</div>
      <Footer />
    </div>
  );
}
