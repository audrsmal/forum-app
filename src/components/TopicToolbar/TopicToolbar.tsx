import styles from "./styles.module.css";

type TopicToolbarProps = {
  filter: "all" | "answered" | "unanswered";
  setFilter: (x: "all" | "answered" | "unanswered") => void;
  onAskQuestionClick: () => void;
};

const TopicToolbar = ({
  filter,
  setFilter,
  onAskQuestionClick,
}: TopicToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <button className={styles.askButton} onClick={onAskQuestionClick}>
        Ask question
      </button>

      <div className={styles.filters}>
        <button
          className={filter === "all" ? styles.active : styles.filterButton}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={
            filter === "answered" ? styles.active : styles.filterButton
          }
          onClick={() => setFilter("answered")}
        >
          Answered
        </button>

        <button
          className={
            filter === "unanswered" ? styles.active : styles.filterButton
          }
          onClick={() => setFilter("unanswered")}
        >
          Unanswered
        </button>
      </div>
    </div>
  );
};

export default TopicToolbar;
