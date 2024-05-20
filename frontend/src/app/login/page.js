"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";

export default function LoginPage() {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <form className="flex flex-col items-center justify-center gap-2 w-[90%] max-w-[450px] p-10 border border-[var(--secondary-text)] rounded-2xl bg-[var(--secondary-bg)] relative">
        <Link href="/" className="absolute right-6 top-6">
          <HomeIcon sx={{ fontSize: 30, color: "var(--secondary-text)" }} />
        </Link>
        <div className="text-3xl font-semibold">login</div>
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
        <button className="bg-[var(--secondary-text)] text-white px-4 py-2 rounded-md mt-4">
          login
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
