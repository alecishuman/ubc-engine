"use client";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RightArrow from "@mui/icons-material/ArrowForward";
import Link from "next/link";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full max-w-[600px] flex flex-col relative justify-center items-center">
      <SearchIcon color="disabled" className="absolute left-4" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ask a question..."
        className="w-full border border-[var(--secondary-text)] pr-4 py-3 px-12 rounded-full focus:outline-none shadow-md shadow-orange-200"
      />
      <Link
        className="bg-[var(--secondary-text)] text-white py-1 px-1 rounded-full absolute right-2"
        href="/chat"
      >
        <RightArrow />
      </Link>
    </div>
  );
}
