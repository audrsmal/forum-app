import { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./styles.module.css";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};

export default PageTemplate;
