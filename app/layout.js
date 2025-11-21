import './globals.css';
import { Inter } from 'next/font/google';
import FlameCursor from '@/components/FlameCursor'; // <--- IMPORT THIS

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Surya Portfolio',
  description: 'Video Editor & Graphic Designer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <FlameCursor /> {/* <--- ADD THIS */}
        {children}
      </body>
    </html>
  );
}