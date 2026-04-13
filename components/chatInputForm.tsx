import React, { useState } from 'react'
import StopChatIcon from "./gptIcons/stopChatIcon";
import TextareaAutosize from "react-textarea-autosize";
import InputButton from "./gptIcons/inputButton";
import { ChatStatus } from 'ai';

interface ChatInputFormProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  sendMessage: (message: { text: string }) => void;
  isInBottom: boolean;
  status: ChatStatus
}

export function ChatInputForm({ scrollRef, sendMessage, isInBottom, status }: ChatInputFormProps) {
  const [input, setInput] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage({ text: input });
        setInput('');
        scrollRef.current?.scrollTo({
          top: scrollRef.current?.scrollHeight,
        })
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 13 && e.shiftKey) {
          return;
        }

        if (e.keyCode === 13) {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
          scrollRef.current?.scrollTo({
            top: scrollRef.current?.scrollHeight,
          })
        }
      }}
      className="relative flex flex-col justify-center items-center gap-2 mb-2 px-4"
    >
      {isInBottom && (
        <button
          onClick={() =>
            scrollRef.current?.scrollTo({
              top: scrollRef.current?.scrollHeight,
            })
          }
          type="button"
          className="absolute top-[-3rem] rounded-full bg-[#212121] border border-zinc-700 z-[10]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="m-1 text-token-text-primary"
          >
            <path
              d="M17 13L12 18L7 13M12 6L12 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      )}

      <div className="relative flex items-center w-full gap-2 max-w-[48rem] mx-auto">
        <TextareaAutosize
          placeholder="Message ChatTPG..."
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 rounded-2xl bg-transparent border border-[#424242] px-4 py-[14px] outline-none resize-none pr-14"
        />
        {status === "streaming" || status === "submitted" ? (
          <StopChatIcon stop={stop} />
        ) : (
          <InputButton input={input} />
        )}
      </div>
      <p className="text-xs text-zinc-300 text-center">
        ChatTPG can make mistakes. Consider checking important information.
      </p>
    </form>
  )
}
