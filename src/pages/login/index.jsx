import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import ProtectedImage from "@/components/utilities/ProtectedImage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/role/admin/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } else {
      setError(data.message || "Login gagal");
    }
  };

  return (
    <div className="flex justify-center items-center flex-wrap h-screen p3 m-3">
      <form onSubmit={handleLogin}>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <ProtectedImage
          src="/favicon/F2.png"
          alt="MekarJS"
          className="w-32 animate-spin360 m-5"
        />
        <input
          type="email"
          placeholder="Email"
          className="text-black/50 w-full p-2 border border-black/15 rounded-xl bg-background mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="text-black/50 w-full p-2 border border-black/15 rounded-xl bg-background mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button
          type="submit"
          className="w-full bg-primary text-black p-5 rounded-full hover:bg-primary/75"
        >
          Login
        </button>
        <br />
        <div className="text-center">
          <Link href={"/"} className="text-black/75 text-xs text-center mt-5">Kembali ke Beranda</Link>
        </div>
      </form>
    </div>
  );
}
