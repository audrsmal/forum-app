import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { registerApi } from "../../api/auth";
import { api } from "../../api/axios";

const userTokenKey = "token";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await registerApi(name, email, password);

      Cookies.set(userTokenKey, response.token, { expires: 1 / 96 });
      router.push("/main");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Register failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      name={name}
      setName={setName}
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
