"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Signout from "@/components/Signout";
import { useAuth } from "@/context/auth";

export default function Home() {
  // On load animations

  // Users
  const { user, signout } = useAuth();

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
    <div className="w-full h-[100vh] flex flex-col gap-2 justify-center items-center">
      <div className="text-lg mb-1">welcome to,</div>
      <div className="secondary-font flex items-center text-5xl mb-8">
        <div className="font-semibold mr-[4px] text-[var(--primary-text)] tracking-[1.5px]">
          ubc
        </div>
        <div className="text-[var(--secondary-text)] tracking-[0.5px]">
          {curEngine}
          <span className="flashing-cursor text-[var(--secondary-text)]">
            |
          </span>
        </div>
      </div>
      <SearchBar />
      {user ? (
        <div className="mt-6">
          <Signout />{" "}
        </div>
      ) : (
        <>
          <div className="mt-10 text-sm mb-1">
            have an account already? or{" "}
            <Link href="/signup" className="underline">
              sign up
            </Link>
          </div>
          <Login />
        </>
      )}
    </div>
  );
}
