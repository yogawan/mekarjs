import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  return { isAuthenticated, isLoading };
}