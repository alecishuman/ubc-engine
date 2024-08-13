import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

export default function Signout() {
  const { signout } = useAuth();
  const router = useRouter();
  return (
    <button
      onClick={() => {
        signout();
        router.push("/");
      }}
      className="bg-[var(--primary-text)] px-5 py-3 rounded-lg text-white text-center font-semibold"
    >
      sign out
    </button>
  );
}
