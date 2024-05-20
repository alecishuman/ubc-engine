"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
  // On load animations
  useEffect(() => {}, []);

  return (
    <div className="w-full h-[100vh] flex flex-col gap-1 justify-center items-center">
      <div className="text-lg">welcome to,</div>
      <div className="name flex items-center text-5xl mb-8 ">
        <div className="font-semibold mr-[4px] text-[var(--primary-text)] tracking-[2px]">
          ubc
        </div>
        <div className="text-[var(--secondary-text)] tracking-[0.5px]">
          engine
        </div>
      </div>
      <SearchBar />
    </div>
  );
}
