import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import LoginForm from "../../components/LoginForm/LoginForm";
import { loginApi } from "../../api/auth";
import { api } from "../../api/axios";

const userTokenKey = "token";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateJwt = async () => {
    const token = Cookies.get(userTokenKey);
    if (!token) return;

    try {
      await api.get("/users/me");
      router.push("/main");
    } catch {
      Cookies.remove(userTokenKey);
    }
  };

  useEffect(() => {
    validateJwt();
  }, []);

  const onFormSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await loginApi(email, password);

      Cookies.set(userTokenKey, response.token, { expires: 1 / 96 });

      router.push("/main");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onFormSubmit={onFormSubmit}
      loading={loading}
      error={error}
    />
  );
}
