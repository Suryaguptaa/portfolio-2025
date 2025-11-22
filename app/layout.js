import './globals.css';
import { Inter, Oswald } from 'next/font/google';
import FlameCursor from '@/components/FlameCursor';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress'; // <--- IMPORT THIS

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata = {
  title: 'Surya Portfolio',
  description: 'Creative Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${oswald.variable} font-sans bg-background text-white`}>
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />        {/* <--- ADD THIS LINE */}
          <div className="grain-overlay"></div>
          <FlameCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}