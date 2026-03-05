import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { loginApi } from "../../api/auth";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginApi(email, password);
      Cookies.set("token", data.token, { expires: 1 / 96 }); // ~15 minutes
      router.push("/main");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.title}>Login</h1>

      {error && <div className={styles.error}>{error}</div>}

      <label className={styles.label}>
        Email
        <input
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
        />
      </label>

      <label className={styles.label}>
        Password
        <input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          required
        />
      </label>

      <button className={styles.button} disabled={loading} type="submit">
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
