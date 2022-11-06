import * as React from "react";
import styles from "components/Layout/styles/Layout.module.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};
