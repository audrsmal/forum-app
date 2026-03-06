import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Forum</span>
    </footer>
  );
}
