import Link from "next/link";
import styles from "./styles.module.css";

type LoginFormProps = {
  email: string;
  setEmail: (x: string) => void;
  password: string;
  setPassword: (x: string) => void;
  onFormSubmit: () => void;
  error?: string | null;
  loading?: boolean;
  emailError?: string;
  passwordError?: string;
  isFormValid: boolean;
};

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onFormSubmit,
  error,
  loading,
  emailError,
  passwordError,
  isFormValid,
}: LoginFormProps) => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Login</h1>

      <div className={styles.form}>
        {error ? <div className={styles.error}>{error}</div> : null}

        <div className={styles.field}>
          <div className={styles.fieldTitle}>Email</div>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="Enter your email"
          />
          {emailError ? (
            <div className={styles.fieldError}>{emailError}</div>
          ) : null}
        </div>

        <div className={styles.field}>
          <div className={styles.fieldTitle}>Password</div>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Enter your password"
          />
          {passwordError ? (
            <div className={styles.fieldError}>{passwordError}</div>
          ) : null}
        </div>

        <button
          className={styles.button}
          onClick={onFormSubmit}
          disabled={loading || !isFormValid}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className={styles.redirect}>
          Don’t have an account?{" "}
          <Link href="/register" className={styles.link}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
