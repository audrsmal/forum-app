import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLogged(!!token);
    setMounted(true);
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setIsLogged(false);
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href={isLogged ? "/main" : "/login"} className={styles.logo}>
          Forum
        </Link>
      </div>

      <nav className={styles.nav}>
        {mounted && isLogged ? (
          <>
            <Link href="/main" className={styles.link}>
              Main
            </Link>

            <button onClick={logout} className={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.link}>
              Login
            </Link>

            <Link href="/register" className={styles.link}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
