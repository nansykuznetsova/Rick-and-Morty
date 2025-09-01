import { type ReactNode } from "react";
import {Header} from "../components/Header/Header.tsx";
import {Footer} from "../components/Footer/Footer.tsx";
import "./Layout.css";

type LayoutProps = {
    children: ReactNode;
};

export const Layout= ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <Header/>
            <main className="main">{children}</main>
            <Footer/>
        </div>
    )
}