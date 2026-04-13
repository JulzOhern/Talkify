"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { usePathname } from "next/navigation";
import { createNewChat } from "@/actions/newChat";
import { createChats } from "@/actions/createChat";
import NewChatsRow from "./newChatsRow";
import MessagesRow from "./messagesRow";
import HomeForm from "./homeForm";
import { useOpenSideBar } from "@/utils/zustand";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ChatInputForm } from "./chatInputForm";
import { Chats, NewChat, User } from "@prisma/client";

type ChatRowProp = {
  user: User | null;
  chatId?: string;
  newChat?: (NewChat & { chats: Chats[] }) | null;
};

const ChatRow = ({ user, chatId, newChat }: ChatRowProp) => {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const setOpensidebar = useOpenSideBar((state) => state.setOpenSidebar);
  const isOpenSidebar = useOpenSideBar((state) => state.isOpen);
  const setCloseSidebar = useOpenSideBar((state) => state.setCloseSidebar);
  const [isInBottom, setIsInBottom] = useState(false);
  const scrollToBottomRef = useRef(0);
  const {
    messages,
    status,
    sendMessage,
  } = useChat();
  const pathname = usePathname();

  // Create or update chat logic
  useEffect(() => {
    (async () => {
      if (pathname === "/" && status === "ready" && messages.length !== 0) {
        await createNewChat(messages).catch(() =>
          toast.error("Something went wrong")
        );
      }

      if (
        pathname === `/c/${chatId}` &&
        status === "ready" &&
        messages.length !== 0
      ) {
        await createChats(messages, chatId).catch(() =>
          toast.error("Something went wrong")
        );
      }
    })();
  }, [pathname, status, messages, chatId]);

  // Scroll to bottom logic
  useEffect(() => {
    function handleScroll() {
      if (scrollRef.current) {
        const scrollHeight = scrollRef.current.scrollHeight;
        const clientHeight = scrollRef.current.clientHeight;
        const scrollTop = scrollRef.current.scrollTop;
        const isBottom = scrollHeight - (clientHeight + scrollTop);

        scrollToBottomRef.current = isBottom;
        setIsInBottom(isBottom > 0);
      }
    }

    const scrollReference = scrollRef.current;
    scrollReference?.addEventListener("scroll", handleScroll);
    return () => scrollReference?.removeEventListener("scroll", handleScroll);
  }, [messages]);

  useEffect(() => {
    if (scrollToBottomRef.current <= 0) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
      });
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, []);

  return (
    <div
      className={cn(
        "mainSection flex flex-col duration-200 flex-1 min-h-0",
        isOpenSidebar ? "md:ml-0 ml-[16rem]" : "md:ml-[16rem] ml-0"
      )}
    >
      <button
        type="button"
        onClick={() => setCloseSidebar()}
        className={cn(
          "fixed top-[.9rem] z-[200] group/skew group/bg duration-200 h-[2.2rem] w-[2.2rem] md:hidden flex flex-col items-center justify-center focus:ring-2 ring-white",
          isOpenSidebar ? "ml-[16rem] left-3" : "ml-0 left-[-4rem]"
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon-md"
        >
          <path
            d="M6.34315 6.34338L17.6569 17.6571M17.6569 6.34338L6.34315 17.6571"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>

      {!isOpenSidebar ? (
        <div
          onClick={() => setOpensidebar()}
          className="fixed left-0 inset-y-[46%] z-[200] group/skew group/bg duration-200 h-[3rem] w-[1.5rem] hidden md:flex flex-col items-center justify-center ml-[16rem]"
        >
          <div className="h-[.7rem] w-[.27rem] bg-zinc-400 rounded-t-lg flex items-center duration-100 group-hover/bg:bg-white mb-[-.1rem] group-hover/skew:-skew-x-[15deg]" />
          <div className="h-[.7rem] w-[.27rem] bg-zinc-400 rounded-b-lg flex items-center duration-100 group-hover/bg:bg-white mt-[-.1rem] group-hover/skew:skew-x-[15deg]" />
        </div>
      ) : (
        <div
          onClick={() => setCloseSidebar()}
          className="fixed left-0 inset-y-[46%] z-[200] group/skew group/bg duration-200 h-[3rem] w-[1.5rem] hidden md:flex flex-col items-center justify-center"
        >
          <div className="h-[.7rem] w-[.27rem] bg-zinc-400 rounded-t-lg flex items-center duration-100 group-hover/bg:bg-white mb-[-.1rem] -skew-x-[-15deg] ml-2" />
          <div className="h-[.7rem] w-[.27rem] bg-zinc-400 rounded-b-lg flex items-center duration-100 group-hover/bg:bg-white mt-[-.1rem] skew-x-[-15deg] ml-2" />
        </div>
      )}

      <div className="flex flex-col flex-1 min-h-0">
        {pathname === "/" && messages.length === 0 ? (
          <HomeForm sendMessage={sendMessage} />
        ) : (
          <div
            ref={scrollRef}
            className="relative flex-1 overflow-y-auto min-h-0"
          >
            <div className="mx-auto max-w-[48rem] pt-5">
              <div className="flex flex-col gap-12 px-5 md:px-10 pb-10">
                {pathname === `/c/${chatId}` &&
                  newChat?.chats.length !== 0 &&
                  newChat?.chats.map((m) => (
                    <NewChatsRow key={m.id} m={m} user={user} />
                  ))}

                {messages.map((m) => (
                  <MessagesRow key={m.id} m={m} user={user} />
                ))}

                {status === "submitted" && (
                  <div className="w-3 h-3 rounded-full bg-zinc-400 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <ChatInputForm
        scrollRef={scrollRef}
        sendMessage={sendMessage}
        isInBottom={isInBottom}
        status={status}
      />
    </div>
  );
};

export default ChatRow;
