"use client";
import SearchBar from "@/components/SearchBar";
import React, { useState, useEffect } from "react";

export default function ChatPage() {
  const [links, setLinks] = useState([
    { name: "Google", url: "https://www.google.com" },
    { name: "Wikipedia", url: "https://www.wikipedia.com" },
    { name: "Material UI", url: "https://mui.com/material-ui/icons/" },
  ]);

  const [relatedQuestions, setRelatedQuestions] = useState([
    "This is a random question I want to ask",
    "What is another question that I could ask you?",
    "This is the third question.",
  ]);

  return (
    <div className="w-full h-[100vh] flex flex-row">
      <div className="flex flex-col w-full md:w-[70%] justify-center items-center">
        <div className="fixed w-[inherit] flex justify-center bottom-8">
          <SearchBar icon={false} expand={true} />
        </div>
      </div>
      <div className="w-[30%] h-full flex flex-col gap-4 px-8 py-10 bg-[var(--secondary-bg)] text-[var(--primary-text)] max-md:hidden">
        <div className="text-2xl font-semibold">Related Links</div>
        <div className="flex flex-col gap-2 w-full">
          {links.map((link, index) => (
            <div className="w-full">
              <div className="font-medium">
                {index + 1}. {link.name}:
              </div>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="underline text-sm text-blue-500 hover:text-[var(--primary-text)]"
              >
                {link.url}
              </a>
            </div>
          ))}
        </div>
        <div className="text-2xl font-semibold mt-4">Related Searches</div>
        <div className="flex flex-col gap-4 w-full">
          {relatedQuestions.map((question, index) => (
            <div className="w-full border border-[var(--primary-text)] bg-[var(--primary-bg)] px-3 py-4 rounded-lg">
              {index + 1}. {question}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
