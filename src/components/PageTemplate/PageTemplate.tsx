import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./styles.module.css";
import { clearAuthSession, isSessionExpired } from "../../utils/auth";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSessionExpired()) {
        clearAuthSession();

        if (router.pathname !== "/login" && router.pathname !== "/register") {
          router.push("/login");
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default PageTemplate;
