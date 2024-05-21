"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

export default function Home() {
  // On load animations

  // typing text
  const engine = "engine";
  const [curEngine, setcurEngine] = useState("engine");
  const [curEngineIndex, setCurEngineIndex] = useState(6);
  const [direction, setDirection] = useState("left");

  useEffect(() => {
    let engineTimeout;
    if (curEngineIndex == 0) {
      setDirection("right");
    }

    if (direction == "left") {
      engineTimeout = setTimeout(() => {
        setcurEngine((prevText) => prevText.slice(0, -1));
        setCurEngineIndex((prevIndex) => prevIndex - 1);
      }, 150);
    } else if (direction == "right" && curEngineIndex < engine.length) {
      engineTimeout = setTimeout(() => {
        setcurEngine((prevText) => prevText + engine[curEngineIndex]);
        setCurEngineIndex((prevIndex) => prevIndex + 1);
      }, 150);
    } else {
      setTimeout(() => {
        setDirection("left");
      }, 3000);
    }

    return () => {
      clearTimeout(engineTimeout);
    };
  }, [curEngineIndex, engine, direction]);

  return (
    <div className="w-full h-[100vh] flex flex-col gap-1 justify-center items-center">
      <div className="text-lg">welcome to,</div>
      <div className="name flex items-center text-5xl mb-8 ">
        <div className="font-semibold mr-[4px] text-[var(--primary-text)] tracking-[2px]">
          ubc
        </div>
        <div className="text-[var(--secondary-text)] tracking-[1px]">
          {curEngine}
          <span className="flashing-cursor text-[var(--secondary-text)]">
            |
          </span>
        </div>
      </div>
      <SearchBar icon={true} expand={false} />
      <div className="mt-10 text-sm mb-1">
        have an account already? or{" "}
        <Link href="/signup" className="underline">
          sign up
        </Link>
      </div>
      <Login />
      {/* <div className="flex flex-row gap-8 mt-12">
        <Login />
        <Signup />
      </div> */}
    </div>
  );
}
