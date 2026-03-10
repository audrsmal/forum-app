import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import LoginForm from "../../components/LoginForm/LoginForm";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import { loginApi } from "../../api/auth";
import { api } from "../../api/axios";
import { validateEmail } from "../../utils/validation";
import {
  setAuthSession,
  userTokenKey,
  clearAuthSession,
} from "../../utils/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailError = useMemo(() => validateEmail(email), [email]);

  const passwordError = useMemo(() => {
    if (!password) return "";
    return "";
  }, [password]);

  const isFormValid =
    !!email.trim() && !!password.trim() && !emailError && !passwordError;

  const validateJwt = async () => {
    const token = Cookies.get(userTokenKey);
    if (!token) return;

    try {
      await api.get("/users/me");
      router.push("/main");
    } catch {
      clearAuthSession();
    }
  };

  useEffect(() => {
    validateJwt();
  }, []);

  const onFormSubmit = async () => {
    if (!isFormValid) return;

    setError(null);
    setLoading(true);

    try {
      const response = await loginApi(email.trim().toLowerCase(), password);

      setAuthSession(response.token);
      router.push("/main");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTemplate>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onFormSubmit={onFormSubmit}
        loading={loading}
        error={error}
        emailError={emailError}
        passwordError={passwordError}
        isFormValid={isFormValid}
      />
    </PageTemplate>
  );
}
