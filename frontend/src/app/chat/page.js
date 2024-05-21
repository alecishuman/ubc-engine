"use client";
import React, { useState, useEffect, useRef } from "react";

import SearchBar from "@/components/SearchBar";

import HomeIcon from "@mui/icons-material/Home";
import RightArrow from "@mui/icons-material/ArrowForward";

export default function ChatPage() {
  // Search bar
  const [value, setValue] = useState("");

  const textAreaRef = useRef(null);
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  // Chat messages

  const [messages, setMessages] = useState([
    "Hi! How can I help you today?",
    "I am looking for information on React.",
    "Hi! How can I help you today? i! How can I help you today? iHow can I help you today? i! How can I help you today? i! Howcan I help you today? i! How can I help you today?",
    "I am looking for information on React. Could you help me with that?",
    "Hi! How can I help you today? i! How can I help you today? iHow can I help you today? i! How can I help you today? i! Howcan I help you today? i! How can I help you today?",
    "I am looking for information on React. Could you help me with that?",
    "Hi! How can I help you today? i! How can I help you today? iHow can I help you today? i! How can I help you today? i! Howcan I help you today? i! How can I help you today?",
    "I am looking for information on React. Could you help me with that?",
    "Hi! How can I help you today? i! How can I help you today? iHow can I help you today? i! How can I help you today? i! Howcan I help you today? i! How can I help you today?",
  ]);

  // Response
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
        <HomeIcon
          className="fixed top-[3vh]"
          sx={{ color: "var(--primary-text)", fontSize: 32 }}
        />

        <div className="messages w-4/5 max-w-[700px] h-[85vh] flex flex-col gap-4 py-2">
          {messages.map((message, index) =>
            index % 2 == 0 ? (
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Engine:</div>
                <div className="bg-[var(--primary-bg)] rounded-lg">
                  Hi! How can I help you today? i! How can I help you today? i!
                  How can I help you today? i! How can I help you today? i! How
                  can I help you today? i! How can I help you today?
                </div>
              </div>
            ) : (
              <div key={index} className="flex flex-col gap-2 items-end">
                <div className="font-semibold">You</div>
                <div className="bg-[var(--secondary-text)] rounded-lg p-4 max-w-[70%]">
                  {message}
                </div>
              </div>
            )
          )}
        </div>
        <div className="fixed w-[inherit] flex justify-center bottom-[3vh]">
          <div className="w-[80%] max-w-[700px] flex flex-col relative justify-center items-center">
            <textarea
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="ask ubc engine..."
              ref={textAreaRef}
              rows={1}
              className={
                "search-bar w-full max-h-[50vh] border border-[var(--secondary-text)] pl-4 pr-12 py-3 rounded-[24px] shadow-md shadow-orange-200"
              }
            />
            <button
              className="bg-[var(--secondary-text)] text-white py-1 px-1 rounded-full absolute right-2"
              href="/chat"
            >
              <RightArrow />
            </button>
          </div>
        </div>
      </div>
      <div className="w-[30%] h-full fixed right-0 flex flex-col gap-4 px-8 py-10 bg-[var(--secondary-bg)] text-[var(--primary-text)] max-md:hidden">
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
