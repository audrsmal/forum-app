import { useEffect, useState } from "react";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import TopicCard from "../../components/TopicCard/TopicCard";
import styles from "./styles.module.css";
import { getTopicStats, TopicStatsType } from "../../api/questions";

const topics = [
  { title: "Politics", slug: "politics" },
  { title: "Sports", slug: "sports" },
  { title: "Gaming", slug: "gaming" },
  { title: "Cooking", slug: "cooking" },
  { title: "Everything else", slug: "everything-else" },
];

export default function MainPage() {
  const [stats, setStats] = useState<TopicStatsType[]>([]);

  const fetchTopicStats = async () => {
    try {
      const response = await getTopicStats();
      setStats(response.topics);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTopicStats();
  }, []);

  const getStatsForTopic = (slug: string) => {
    return stats.find((item) => item.topic === slug);
  };

  return (
    <PageTemplate>
      <div className={styles.main}>
        <h1 className={styles.title}>Choose a topic</h1>

        <div className={styles.grid}>
          {topics.map((topic) => {
            const topicStats = getStatsForTopic(topic.slug);

            return (
              <TopicCard
                key={topic.slug}
                title={topic.title}
                slug={topic.slug}
                questionsCount={topicStats?.questionsCount || 0}
                answersCount={topicStats?.answersCount || 0}
              />
            );
          })}
        </div>
      </div>
    </PageTemplate>
  );
}
