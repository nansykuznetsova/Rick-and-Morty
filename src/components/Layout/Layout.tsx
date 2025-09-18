import { type PropsWithChildren } from 'react';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import './Layout.css';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='layout'>
      <Header />
      <main className='main'>{children}</main>
      <Footer />
    </div>
  );
};
