"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

export default function PasswordReset() {
  const resetPassword = () => {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
    };
  };

  <div className="w-full h-[100vh] flex flex-col items-center justify-center">
    <form
      onSubmit={resetPassword}
      className="flex flex-col items-center justify-center gap-2 w-[90%] max-w-[450px] p-10 border border-[var(--secondary-text)] rounded-2xl bg-[var(--secondary-bg)] relative"
    >
      <Link href="/login" className="absolute right-6 top-6">
        <HomeIcon sx={{ fontSize: 30, color: "var(--secondary-text)" }} />
      </Link>
      <div className="text-3xl font-semibold text-[var(--secondary-text)]">
        Reset Password
      </div>
      <div className="w-full mt-2 text-[var(--secondary-text)] font-semibold">
        email:
      </div>
      <input
        type="email"
        placeholder="email"
        className="border border-[var(--secondary-text)] rounded-md px-4 py-2 w-full"
      ></input>
      <button
        type="submit"
        className="bg-[var(--secondary-text)] text-white px-4 py-2 rounded-md mt-4"
      >
        login
      </button>
    </form>
  </div>;
}
