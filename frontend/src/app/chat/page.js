"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import SearchBar from "@/components/SearchBar";

import HomeIcon from "@mui/icons-material/Home";
import RightArrow from "@mui/icons-material/ArrowForward";

export default function ChatPage() {
  const [value, setValue] = useState("");

  const [messages, setMessages] = useState([]);
  const [links, setLinks] = useState([]);
  const [questions, setQuestions] = useState([]);

  // Search bar
  const textAreaRef = useRef(null);
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      search(value);
    }
  };

  const [startedTyping, setStartedTyping] = useState(false);
  useEffect(() => {
    if (value.length > 0 && !startedTyping) {
      setStartedTyping(true);
    }
    if (value.length == 0 && startedTyping) {
      setStartedTyping(false);
    }
  }, [value]);

  const search = (message) => {
    setMessages((prev) => [...prev, message]);
    fetch("http://localhost:8080/engine/1")
      .then((response) => response.json())
      .then((data) => {
        setLinks(data.links);
        setQuestions(data.questions);
        setMessages((prev) => [...prev, data.message]);
        setValue("");
      })
      .catch((error) => {
        setMessages((prev) => [...prev, "An error occurred."]);
        console.error("Error:", error);
      });
  };

  // Messages
  const messageBottomRef = useRef(null);
  useEffect(() => {
    if (messageBottomRef) {
      messageBottomRef.current.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="w-full h-[100vh] flex flex-row">
      <div className="flex flex-col w-full md:w-[70%] justify-center items-center">
        <Link className="fixed top-[3vh]" href="/">
          <HomeIcon sx={{ color: "var(--primary-text)", fontSize: 32 }} />
        </Link>

        <div
          ref={messageBottomRef}
          className="messages w-4/5 max-w-[700px] h-[85vh] flex flex-col gap-4 pt-4 pb-6"
        >
          {messages.map((message, index) =>
            index % 2 == 1 ? (
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-[var(--primary-text)]">
                  Engine:
                </div>
                <div className="bg-[var(--primary-bg)] rounded-lg">
                  {message}
                </div>
              </div>
            ) : (
              <div key={index} className="flex flex-col gap-2 items-end">
                <div className="font-semibold text-[var(--primary-text)]">
                  You
                </div>
                <div className="bg-[var(--secondary-text)] rounded-lg p-4 max-w-[70%]">
                  {message}
                </div>
              </div>
            )
          )}
        </div>

        <div className="fixed w-[inherit] flex justify-center bottom-[4vh] z-10">
          <div className="w-[80%] max-w-[700px] flex flex-col relative justify-center items-center">
            <textarea
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ask ubc engine..."
              ref={textAreaRef}
              rows={1}
              className={
                "search-bar w-full max-h-[50vh] border border-[var(--secondary-text)] pl-4 pr-12 py-3 rounded-[24px] shadow-md shadow-orange-200"
              }
            />
            <button
              className="bg-[var(--secondary-text)] text-white py-1 px-1 rounded-full absolute right-2 hover:bg-[#c28e54]"
              onClick={() => search(value)}
            >
              <RightArrow />
            </button>
          </div>
        </div>

        <div
          className={"enter-hint fixed w-[inherit] flex justify-center text-[var(--primary-text)] ".concat(
            startedTyping
              ? "bottom-[1.5vh] opacity-1"
              : "bottom-[4vh] opacity-0"
          )}
        >
          <div className="w-[80%] max-w-[700px] flex justify-end gap-1 text-sm max-md:text-xs secondary-font pr-2">
            <div className="font-semibold">'Shift + Enter'</div> for new line
          </div>
        </div>
      </div>
      <div className="w-[30%] h-full fixed right-0 flex flex-col gap-4 px-8 py-10 bg-[var(--secondary-bg)] text-[var(--primary-text)] max-md:hidden">
        {links.length > 0 && (
          <div className="text-2xl font-semibold">Related Links</div>
        )}
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
        {questions.length > 0 && (
          <div className="text-2xl font-semibold mt-4">Related Searches</div>
        )}
        <div className="flex flex-col gap-4 w-full">
          {questions.map((question, index) => (
            <button
              className="w-full border border-[var(--primary-text)] bg-[var(--primary-bg)] px-3 py-4 rounded-lg text-start"
              onClick={() => search(question)}
            >
              {index + 1}. {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
