"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import SearchBar from "@/components/SearchBar";

import HomeIcon from "@mui/icons-material/Home";
import RightArrow from "@mui/icons-material/ArrowForward";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [responseTyping, setResponseTyping] = useState(false);
  const [typingInterval, setTypingInterval] = useState(null);
  const [pause, setPause] = useState(false);
  const [links, setLinks] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);

  // Hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [firstTimeToggle, setFirstTimeToggle] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    if (menuRef.current) {
      if (menuOpen) {
        menuRef.current.style.transform = `translateX(${menuRef.current.offsetWidth}px)`;
      } else {
        menuRef.current.style.transform = "translateX(0)";
      }
    }
    setFirstTimeToggle(false);
    setMenuOpen(!menuOpen);
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  };

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
        setValue("");
        typingResponse(data.message);
      })
      .catch((error) => {
        setMessages((prev) => [...prev, "An error occurred."]);
        console.error("Error:", error);
      });
  };

  const typingResponse = (res) => {
    const typingSpeed = 30;
    let i = 0;
    setResponseTyping(true);
    setCurrentResponse("");
    if (typingInterval) {
      clearInterval(typingInterval);
    }
    const newTypingInterval = setInterval(() => {
      setCurrentResponse(res.slice(0, i));
      i += 3;
      if (i >= res.length) {
        setMessages((prev) => [...prev, res]);
        setCurrentResponse("");
        clearInterval(newTypingInterval);
        setResponseTyping(false);
        setTypingInterval(null);
        if (firstTimeToggle && window.innerWidth > 768) {
          setTimeout(() => {
            toggleMenu();
          }, 300);
        }
      }
    }, typingSpeed);
    setTypingInterval(newTypingInterval);
  };

  const pauseResponse = () => {
    setResponseTyping(false);
    setMessages((prev) => [...prev, currentResponse]);
    setCurrentResponse("");
    setPause(false);
    clearInterval(typingInterval);
    setTypingInterval(null);
  };

  // Messages
  const messageBottomRef = useRef(null);
  useEffect(() => {
    if (messageBottomRef.current) {
      messageBottomRef.current.scrollTop =
        messageBottomRef.current.scrollHeight;
    }
  }, [messages, currentResponse.length]);

  // Initial search
  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 200);
  }, []);
  const didSearch = useRef(false);
  useEffect(() => {
    if (didSearch.current) return;
    if (searchParams.has("search") && searchParams.get("search").length > 0) {
      search(searchParams.get("search"));
      didSearch.current = true;
    }
  }, []);

  return (
    <div className="w-full h-[100vh] flex flex-row">
      <button
        className={"absolute top-4 right-[max(1rem,2vw)] p-[3px] border-2 border-[var(--primary-text)] rounded-lg z-20 spinning-btn".concat(
          spinning ? " spin" : ""
        )}
        onClick={toggleMenu}
      >
        <MenuIcon sx={{ color: "var(--primary-text)", fontSize: 32 }} />
      </button>
      <div
        className={"flex flex-col w-full justify-center items-center transition-all duration-300".concat(
          menuOpen ? " md:w-[70%]" : ""
        )}
      >
        <Link className="fixed top-[3vh]" href="/">
          <HomeIcon sx={{ color: "var(--primary-text)", fontSize: 32 }} />
        </Link>

        <div
          ref={messageBottomRef}
          className="messages w-4/5 max-w-[700px] h-[85vh] flex flex-col gap-4 pt-4 pb-8"
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
                <div className="bg-[var(--secondary-text)] rounded-lg px-4 py-3 max-w-[70%]">
                  {message}
                </div>
              </div>
            )
          )}
          {currentResponse && (
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-[var(--primary-text)]">
                Engine:
              </div>
              <div className="bg-[var(--primary-bg)] rounded-lg">
                {currentResponse}
              </div>
            </div>
          )}
        </div>

        <div className="absolute w-[inherit] flex justify-center bottom-[4vh] z-10">
          <div className="w-[90%] max-w-[770px] flex flex-col relative justify-center items-center">
            <textarea
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ask ubc engine..."
              ref={textAreaRef}
              rows={1}
              className={
                "search-bar w-full max-h-[50vh] border border-[var(--secondary-text)] pl-4 pr-12 py-3 rounded-[24px] shadow-md shadow-orange-200 disabled:bg-[var(--primary-bg)] disabled:cursor-not-allowed"
              }
              disabled={responseTyping}
            />
            {responseTyping ? (
              <button
                className="text-[var(--secondary-text)] absolute right-2"
                onClick={() => pauseResponse()}
              >
                <StopCircleIcon sx={{ fontSize: "36px" }} />
              </button>
            ) : (
              <button
                className="bg-[var(--secondary-text)] text-white py-1 px-1 rounded-full absolute right-2 hover:bg-[#c28e54]"
                onClick={() => search(value)}
              >
                <RightArrow />
              </button>
            )}
          </div>
        </div>

        <div
          className={"enter-hint fixed w-[inherit] flex justify-center text-[var(--primary-text)] ".concat(
            startedTyping ? "bottom-[1vh] opacity-1" : "bottom-[4vh] opacity-0"
          )}
        >
          <div className="w-[80%] max-w-[700px] flex justify-end gap-1 text-sm max-md:text-xs secondary-font">
            <div className="font-semibold">'Shift + Enter'</div> for new line
          </div>
        </div>
      </div>
      <div
        className={`w-full md:w-[30%] h-full absolute right-0 translate-x-[100vw] md:translate-x-[30vw] flex flex-col gap-4 py-10 px-8 bg-[var(--secondary-bg)] text-[var(--primary-text)] transition-all duration-300  z-10`}
        ref={menuRef}
      >
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
        {!firstLoading && (
          <div className="w-full h-full flex flex-col lg:flex-row justify-end lg:items-end gap-3 bottom-[4vh]">
            <Login />
            <Signup />
          </div>
        )}
      </div>
    </div>
  );
}
