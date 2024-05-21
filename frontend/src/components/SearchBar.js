import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RightArrow from "@mui/icons-material/ArrowForward";
import Link from "next/link";

export default function SearchBar({ icon, expand }) {
  const [value, setValue] = useState("");

  const textAreaRef = useRef(null);
  useEffect(() => {
    if (textAreaRef && expand) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  return (
    <div className="w-[80%] max-w-[700px] flex flex-col relative justify-center items-center">
      <SearchIcon color="disabled" className="absolute left-4" />

      <textarea
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="ask ubc engine..."
        ref={textAreaRef}
        rows={1}
        className="search-bar w-full max-h-[50vh] border border-[var(--secondary-text)] px-12 py-3 rounded-[24px] shadow-md shadow-orange-200"
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
