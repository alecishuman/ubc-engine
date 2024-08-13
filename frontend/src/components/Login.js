import Link from "next/link";
import { useAuth } from "@/context/auth";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const { loading, setLoading } = useAuth();
  const login = () => {
    setLoading(true);
  };
  return (
    <Link
      href="/login"
      className="bg-[var(--secondary-text)] px-5 py-3 rounded-lg text-white text-center font-semibold"
      onClick={login}
    >
      {loading ? (
        <CircularProgress size={20} sx={{ color: "white" }} />
      ) : (
        "login"
      )}
    </Link>
  );
}
