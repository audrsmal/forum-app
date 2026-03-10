import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { clearAuthSession } from "../../utils/auth";

export default function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLogged(!!token);
    setMounted(true);
  }, []);

  const confirmLogout = () => {
    clearAuthSession();
    setIsLogged(false);
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <>
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

              <button
                onClick={() => setShowLogoutModal(true)}
                className={styles.button}
              >
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

      {showLogoutModal ? (
        <ConfirmModal
          title="Logout"
          message="Are you sure you want to log out?"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      ) : null}
    </>
  );
}
