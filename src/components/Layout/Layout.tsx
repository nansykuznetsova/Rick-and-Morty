import { type PropsWithChildren } from 'react';

import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';

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
