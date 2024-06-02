import Link from "next/link";

export default function Login() {
  return (
    <Link
      href="/login"
      className="bg-[var(--secondary-text)] px-5 py-3 rounded-lg text-white text-center font-semibold"
    >
      login
    </Link>
  );
}
