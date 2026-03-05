import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { registerApi } from "../../api/auth";
import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await registerApi(name, email, password);
      Cookies.set("token", data.token, { expires: 1 / 96 }); // ~15 minutes
      router.push("/main");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Register failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.title}>Register</h1>

      {error && <div className={styles.error}>{error}</div>}

      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

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
          autoComplete="new-password"
          required
        />
      </label>

      <button className={styles.button} disabled={loading} type="submit">
        {loading ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
