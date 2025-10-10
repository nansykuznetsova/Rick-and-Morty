import { type PropsWithChildren } from 'react';

import { Footer, Header } from '@/components';

import './Layout.css';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='layout'>
      <Header />
      <main className='layout__main'>{children}</main>
      <Footer />
    </div>
  );
};
