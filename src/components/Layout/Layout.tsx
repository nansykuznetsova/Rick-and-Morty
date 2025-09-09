import { type PropsWithChildren } from "react";

import { Header } from "../Header/Header.tsx";
import { Footer } from "../Footer/Footer.tsx";

import "./Layout.css";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};
