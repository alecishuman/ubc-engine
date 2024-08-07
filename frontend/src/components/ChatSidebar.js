import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

import Login from "@/components/Login";
import Signup from "@/components/Signup";

import RightArrow from "@mui/icons-material/ArrowForward";
import LeftArrow from "@mui/icons-material/ArrowBack";

export default function ChatSidebar({
  menuRef,
  links,
  questions,
  search,
  firstLoading,
}) {
  const router = useRouter();
  const { user, signout } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      fetch("http://localhost:8080/engine/history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setHistory(data.history);
        });
    }
  }, [user]);

  const [historyBar, setHistoryBar] = useState(false);
  const [animateSidebar, setAnimateSidebar] = useState(false);
  const changeSidebar = () => {
    setAnimateSidebar(true);
    setTimeout(() => {
      setAnimateSidebar(false);
      setHistoryBar(!historyBar);
    }, 200);
  };

  const HistoryBar = () => {
    return (
      <div
        className={"bg-[var(--secondary-bg)] ".concat(
          animateSidebar ? "swipe-right" : ""
        )}
      >
        <div className="text-2xl font-semibold mb-2">Recent Searches</div>
        {user ? (
          <div className="flex flex-col gap-4 w-full">
            {history.map((item) => (
              <button className="w-full border border-[var(--primary-text)] bg-[var(--primary-bg)] px-3 py-4 rounded-lg text-start">
                {item.title}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-[var(--primary-text)]">
            Please login to view history
          </div>
        )}
      </div>
    );
  };

  const MainSidebar = () => {
    return (
      <div
        className={"bg-[var(--secondary-bg)] ".concat(
          animateSidebar ? "swipe-right" : ""
        )}
      >
        {links.length > 0 && (
          <div className="text-2xl font-semibold mb-2">Related Links</div>
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
    );
  };

  return (
    <div
      className={`w-full md:w-[30%] h-full absolute right-0 translate-x-[100vw] md:translate-x-[30vw] flex flex-col gap-4 py-10 px-8 bg-[var(--secondary-bg)] text-[var(--primary-text)] transition-all duration-300 z-10`}
      ref={menuRef}
    >
      {user && (
        <button
          className="relative top-[-0.8rem] left-[max(-0.4rem,-0.8vw)] font-semibold text-left flex items-center underline"
          onClick={changeSidebar}
        >
          {historyBar ? (
            <>
              Back <LeftArrow sx={{ fontSize: "14px", marginLeft: "4px" }} />
            </>
          ) : (
            <>
              History{" "}
              <RightArrow sx={{ fontSize: "14px", marginLeft: "4px" }} />
            </>
          )}
        </button>
      )}
      {historyBar ? <HistoryBar /> : <MainSidebar />}

      {!firstLoading && (
        <div className="w-full h-full flex flex-col lg:flex-row justify-end lg:items-end gap-3 bottom-[3vh] ">
          {user ? (
            <button
              onClick={() => {
                signout();
                router.push("/");
              }}
              className="bg-[var(--primary-text)] px-5 py-3 rounded-lg text-white text-center font-semibold"
            >
              sign out
            </button>
          ) : (
            <>
              <Login />
              <Signup />
            </>
          )}
        </div>
      )}
    </div>
  );
}
