import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import RegisterForm from "../../components/RegisterForm/RegisterForm";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import { registerApi } from "../../api/auth";
import { api } from "../../api/axios";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validation";

const userTokenKey = "token";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameError = useMemo(() => validateName(name), [name]);
  const emailError = useMemo(() => validateEmail(email), [email]);
  const passwordError = useMemo(() => validatePassword(password), [password]);

  const isFormValid =
    !!name.trim() &&
    !!email.trim() &&
    !!password.trim() &&
    !nameError &&
    !emailError &&
    !passwordError;

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
    if (!isFormValid) return;

    setError(null);
    setLoading(true);

    try {
      const response = await registerApi(
        name.trim(),
        email.trim().toLowerCase(),
        password,
      );

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
    <PageTemplate>
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
        nameError={nameError}
        emailError={emailError}
        passwordError={passwordError}
        isFormValid={isFormValid}
      />
    </PageTemplate>
  );
}
