"use client";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

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
    </div>
  );
}
