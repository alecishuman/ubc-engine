import Link from "next/link";

export default function Login() {
  return (
    <Link
      href="/signup"
      className="bg-[var(--primary-text)] px-5 py-3 rounded-lg text-white font-semibold"
    >
      sign up
    </Link>
  );
}
