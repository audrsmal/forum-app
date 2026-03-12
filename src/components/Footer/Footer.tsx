import styles from "./styles.module.css";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <div className={styles.logo}>Forum</div>
            <p className={styles.description}>
              A place to ask questions, share ideas, and debate everything from
              politics to cooking.
            </p>
          </div>

          <div className={styles.column}>
            <div className={styles.columnTitle}>Explore</div>
            <a href="/main">Topics</a>
            <a href="/main">Latest Questions</a>
            <a href="/main">Unanswered</a>
          </div>

          <div className={styles.column}>
            <div className={styles.columnTitle}>Community</div>
            <a href="#">Guidelines</a>
            <a href="#">Help</a>
            <a href="#">Contact</a>
          </div>

          <div className={styles.column}>
            <div className={styles.columnTitle}>Follow us</div>

            <div className={styles.socials}>
              <a href="#" className={`${styles.social} ${styles.instagram}`}>
                <Instagram size={18} />
              </a>

              <a href="#" className={`${styles.social} ${styles.facebook}`}>
                <Facebook size={18} />
              </a>

              <a href="#" className={`${styles.social} ${styles.twitter}`}>
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          © {year} Forum. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
