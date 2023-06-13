import Header from '@/components/Header/Header';
import './globals.scss';
import { Inter } from 'next/font/google';
import { Providers } from '@/store/provider';

const inter = Inter({ subsets: ['cyrillic'] });

export const metadata = {
  title: 'Сервис мои чеки онлайн',
  description: 'Сервис мои чеки онлайн',
};

export default function RootLayout({ children, ...rest }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
