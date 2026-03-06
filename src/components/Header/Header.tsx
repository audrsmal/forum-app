import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Header() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToken(Cookies.get("token"));
    setIsMounted(true);
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setToken(undefined);
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link className={styles.brand} href="/main">
          Forum
        </Link>
      </div>

      <nav className={styles.nav}>
        {!isMounted ? null : !token ? (
          <>
            <Link className={styles.link} href="/login">
              Login
            </Link>
            <Link className={styles.link} href="/register">
              Register
            </Link>
          </>
        ) : (
          <button className={styles.button} onClick={logout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
