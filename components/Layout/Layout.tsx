import * as React from "react";
import styles from "components/Layout/styles/Layout.module.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={styles.container}>
      <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

      <Sidebar
        showSidebar={showSidebar}
        closeSidebar={() => setShowSidebar(false)}
      />

      <div
        className={`${styles.overlay} ${
          showSidebar ? styles.overlayActive : ""
        }`}
      ></div>

      <div className={styles.content}>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};
