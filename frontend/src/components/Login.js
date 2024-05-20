import Link from "next/link";

export default function Login() {
  return (
    <Link
      href="/login"
      className="bg-[var(--secondary-text)] px-5 py-[9px] rounded-lg text-white font-semibold"
    >
      login
    </Link>
  );
}
