import Link from "next/link";
import styles from "./styles.module.css";

type RegisterFormProps = {
  name: string;
  setName: (x: string) => void;
  email: string;
  setEmail: (x: string) => void;
  password: string;
  setPassword: (x: string) => void;
  onFormSubmit: () => void;
  error?: string | null;
  loading?: boolean;
};

const RegisterForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  onFormSubmit,
  error,
  loading,
}: RegisterFormProps) => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Register</h1>

      <div className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.field}>
          <div className={styles.fieldTitle}>Name</div>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className={styles.field}>
          <div className={styles.fieldTitle}>Email</div>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className={styles.field}>
          <div className={styles.fieldTitle}>Password</div>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <button
          className={styles.button}
          onClick={onFormSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <div className={styles.redirect}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
