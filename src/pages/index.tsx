import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    router.replace(token ? "/main" : "/login");
  }, [router]);

  return null;
}
