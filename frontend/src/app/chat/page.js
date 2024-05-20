"use client";
import SearchBar from "@/components/SearchBar";
import React, { useState, useEffect } from "react";

export default function ChatPage() {
  return (
    <div className="w-full h-[100vh] flex flex-col gap-1 justify-center items-center">
      <div className="fixed w-full flex justify-center bottom-8">
        <SearchBar icon={false} expand={true} />
      </div>
    </div>
  );
}
