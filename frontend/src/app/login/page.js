"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import HomeIcon from "@mui/icons-material/Home";
import { CircularProgress } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [warningText, setWarningText] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setWarningText("");
    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target[0].value,
        password: e.target[1].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          if (data.error === "Invalid credentials") {
            setWarningText("Invalid credentials");
          }
        } else {
          router.push("/chat");
        }
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <form
        onSubmit={onLogin}
        className="flex flex-col items-center justify-center gap-2 w-[90%] max-w-[450px] p-10 border border-[var(--secondary-text)] rounded-2xl bg-[var(--secondary-bg)] relative"
      >
        <Link href="/" className="absolute right-6 top-6">
          <HomeIcon sx={{ fontSize: 30, color: "var(--secondary-text)" }} />
        </Link>
        <div className="text-3xl font-semibold text-[var(--secondary-text)]">
          login
        </div>
        <div className="w-full mt-2 text-[var(--secondary-text)] font-semibold">
          email:
        </div>
        <input
          type="email"
          placeholder="email"
          className="border border-[var(--secondary-text)] rounded-md px-4 py-2 w-full"
        ></input>
        <div className="w-full text-[var(--secondary-text)] font-semibold mt-1">
          password:
        </div>
        <input
          type="password"
          placeholder="password"
          className="border border-[var(--secondary-text)] text-sm rounded-md px-4 py-2 w-full"
        ></input>
        {warningText && (
          <div className="text-red-500 text-sm">*{warningText}*</div>
        )}
        <div className="w-full flex flex-start">
          <Link href="/password-reset" className="text-xs underline">
            forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="bg-[var(--secondary-text)] text-white w-20 h-10 rounded-md mt-4"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "login"
          )}
        </button>
        <div className="text-sm">
          don't have an account?{" "}
          <Link href="/signup" className="underline text-[var(--primary-text)]">
            signup
          </Link>{" "}
        </div>
      </form>
    </div>
  );
}
