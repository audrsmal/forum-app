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
  nameError?: string;
  emailError?: string;
  passwordError?: string;
  isFormValid: boolean;
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
  nameError,
  emailError,
  passwordError,
  isFormValid,
}: RegisterFormProps) => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Register</h1>

      <div className={styles.form}>
        {error ? <div className={styles.error}>{error}</div> : null}

        <div className={styles.field}>
          <div className={styles.fieldTitle}>Name</div>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Enter your name"
          />
          {nameError ? (
            <div className={styles.fieldError}>{nameError}</div>
          ) : null}
        </div>

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
            autoComplete="new-password"
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
