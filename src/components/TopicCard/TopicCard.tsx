import Link from "next/link";
import styles from "./styles.module.css";

type TopicCardProps = {
  title: string;
  slug: string;
};

const TopicCard = ({ title, slug }: TopicCardProps) => {
  return (
    <Link href={`/topic/${slug}`} className={styles.card}>
      <div className={styles.title}>{title}</div>
    </Link>
  );
};

export default TopicCard;
