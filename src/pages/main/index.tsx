import PageTemplate from "../../components/PageTemplate/PageTemplate";
import TopicCard from "../../components/TopicCard/TopicCard";
import styles from "./styles.module.css";

const topics = [
  { title: "Politics", slug: "politics" },
  { title: "Sports", slug: "sports" },
  { title: "Gaming", slug: "gaming" },
  { title: "Cooking", slug: "cooking" },
  { title: "Everything else", slug: "everything-else" },
];

export default function MainPage() {
  return (
    <PageTemplate>
      <div className={styles.main}>
        <h1 className={styles.title}>Choose a topic</h1>

        <div className={styles.grid}>
          {topics.map((topic) => (
            <TopicCard key={topic.slug} title={topic.title} slug={topic.slug} />
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
