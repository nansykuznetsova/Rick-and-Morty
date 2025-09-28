import { type PropsWithChildren } from 'react';

import { Footer } from '@/components';
import { Header } from '@/components';

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
