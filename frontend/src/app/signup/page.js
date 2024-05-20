"use client";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import React, { useState, useEffect } from "react";

export default function SignupPage() {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <form className="flex flex-col items-center justify-center gap-2 w-[90%] max-w-[450px] p-10 border border-[var(--primary-text)] rounded-2xl bg-[var(--secondary-bg)] relative">
        <Link href="/" className="absolute right-6 top-6">
          <HomeIcon sx={{ fontSize: 28, color: "var(--primary-text)" }} />
        </Link>
        <div className="text-3xl font-semibold">sign up!</div>
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
        <button className="bg-[var(--primary-text)] text-white px-4 py-2 rounded-md mt-4">
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
