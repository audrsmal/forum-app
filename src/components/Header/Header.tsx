import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();
  const token = Cookies.get("token");

  const logout = () => {
    Cookies.remove("token");
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
        {!token ? (
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
