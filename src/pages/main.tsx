import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) router.replace("/login");
  }, [router]);

  return (
    <main style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <h1>Main</h1>
      <p>You are logged in.</p>
    </main>
  );
}
