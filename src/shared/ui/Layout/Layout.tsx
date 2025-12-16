import { type PropsWithChildren } from 'react';

import { Footer, Header } from '@/shared';

import './Layout.scss';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='layout'>
      <Header />
      <main className='layout__main'>{children}</main>
      <Footer />
    </div>
  );
};
