import Link from "next/link";
import styles from "./styles.module.css";

type TopicCardProps = {
  title: string;
  slug: string;
  questionsCount?: number;
  answersCount?: number;
};

const TopicCard = ({
  title,
  slug,
  questionsCount = 0,
  answersCount = 0,
}: TopicCardProps) => {
  return (
    <Link href={`/topic/${slug}`} className={styles.card}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.label}>Topic</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>
            Explore discussions, opinions, questions, and spicy takes in{" "}
            {title.toLowerCase()}.
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{questionsCount}</span>
              <span className={styles.statLabel}>questions</span>
            </div>

            <div className={styles.stat}>
              <span className={styles.statNumber}>{answersCount}</span>
              <span className={styles.statLabel}>answers</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.arrow}>→</div>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
