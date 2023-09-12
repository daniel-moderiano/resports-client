import * as React from "react";
import styles from "components/Layout/styles/Layout.module.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { Toaster } from "react-hot-toast";

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
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "6px",
            background: "#333",
            color: "#fff",
            padding: "0.75rem 1.25rem",
            fontSize: "0.9rem",
          },
          position: "bottom-right",
        }}
      />
      <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

      <Sidebar
        showSidebar={showSidebar}
        closeSidebar={() => setShowSidebar(false)}
      />

      <div
        className={`${styles.overlay} ${
          showSidebar ? styles.overlayActive : ""
        }`}
        data-testid="overlay"
        onClick={toggleSidebar}
      ></div>

      <div className={styles.content}>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};
