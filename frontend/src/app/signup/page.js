"use client";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [warningText, setWarningText] = useState("");
  const signup = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: e.target[0].value,
        lastName: e.target[1].value,
        email: e.target[2].value,
        password: e.target[3].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          if (data.error === "User already exists") {
            setWarningText("email already exists");
          } else {
            setWarningText("");
          }
        } else {
          router.push("/login");
          setWarningText("");
        }
      });
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <form
        className="flex flex-col items-center justify-center gap-2 w-[90%] max-w-[450px] p-10 border border-[var(--primary-text)] rounded-2xl bg-[var(--secondary-bg)] relative"
        onSubmit={signup}
      >
        <Link href="/" className="absolute right-6 top-6">
          <HomeIcon sx={{ fontSize: 28, color: "var(--primary-text)" }} />
        </Link>
        <div className="text-3xl font-semibold text-[var(--primary-text)]">
          sign up!
        </div>
        <div className="w-full mt-2 font-semibold text-[var(--primary-text)]">
          first name:
        </div>
        <input
          type="text"
          placeholder="first name"
          className="border border-[var(--primary-text)] rounded-md px-4 py-2 w-full"
        ></input>
        <div className="w-full font-semibold mt-1 text-[var(--primary-text)]">
          last name:
        </div>
        <input
          type="text"
          placeholder="last name"
          className="border border-[var(--primary-text)] rounded-md px-4 py-2 w-full"
        ></input>
        <div className="w-full font-semibold mt-1 text-[var(--primary-text)]">
          email:
        </div>
        <input
          type="email"
          placeholder="email"
          className="border border-[var(--primary-text)] rounded-md px-4 py-2 w-full"
        ></input>
        <div className="w-full font-semibold mt-1 text-[var(--primary-text)]">
          password:
        </div>

        <input
          type="password"
          placeholder="password"
          className="border border-[var(--primary-text)] rounded-md px-4 py-2 w-full"
        ></input>
        {warningText && (
          <div className="text-red-500 text-sm">*{warningText}*</div>
        )}
        <button
          className="bg-[var(--primary-text)] text-white px-4 py-2 rounded-md mt-4"
          type="submit"
        >
          sign up
        </button>
        <div className="text-sm">
          already have an account?{" "}
          <Link href="/login" className="underline text-[var(--primary-text)]">
            login
          </Link>{" "}
        </div>
      </form>
    </div>
  );
}
