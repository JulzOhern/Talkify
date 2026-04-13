import React from "react";
import GptHomeIcon from "./gptIcons/gptHomeIcon";
import Image from "next/image";

export default function HomeForm({ append }: any) {
  const chatSuggestion = [
    {
      title: "Show me a code snippet",
      message: "of a website's sticky header",
    },
    {
      title: "Come up with concepts",
      message: "for a retro-style arcade game",
    },
    {
      title: "Plan a tour",
      message: "for achitectural photography in Barcelona",
    },
    {
      title: "Create a workout plan",
      message: "for resistance training",
    },
  ];

  return (
    <div className="flex flex-col relative flex-1 overflow-auto">
      <div className="flex flex-col gap-4 justify-center items-center flex-1 mx-auto max-w-[48rem] w-full">
        <Image
          src="/logo.png"
          alt="Logo"
          width={800}
          height={950}
          objectFit="cover"
          className="rounded-full w-24"
        />
        <h1 className="text-xl font-bold">How can I help you today?</h1>
      </div>

      <div className="flex gap-2 mx-auto max-w-[50rem] w-full text-sm mb-4">
        <div className="flex flex-col gap-2 flex-1 ml-6 sm:mr-0 mr-6">
          {chatSuggestion.slice(0, 2).map((item, index) => (
            <div
              onClick={() =>
                append({
                  role: "user",
                  content: `${item.title} ${item.message}`,
                })
              }
              key={index}
              className="relative flex items-center border hover:bg-[#2f2f2f] group/show cursor-pointer border-zinc-700 py-3 px-4 rounded-xl"
            >
              <div className="flex-1 overflow-clip">
                <h1 className="line-clamp-1 font-semibold">{item.title}</h1>
                <p className="line-clamp-1 text-zinc-500 font-medium">
                  {item.message}
                </p>
              </div>

              <button
                className="absolute right-4 bg-[#212121] text-white p-1 rounded-lg group-hover/show:visible invisible"
                data-testid="send-button"
              >
                <span className="" data-state="closed">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 11L12 6L17 11M12 18V7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="hidden sm:flex flex-col gap-2 flex-1 mr-6">
          {chatSuggestion.slice(2, 4).map((item, index) => (
            <div
              onClick={() =>
                append({
                  role: "user",
                  content: `${item.title} ${item.message}`,
                })
              }
              key={index}
              className="relative flex items-center border hover:bg-[#2f2f2f] group/show cursor-pointer border-zinc-700 py-3 px-4 rounded-xl"
            >
              <div className="flex-1 overflow-clip">
                <h1 className="line-clamp-1 font-semibold">{item.title}</h1>
                <p className="line-clamp-1 text-zinc-500 font-medium">
                  {item.message}
                </p>
              </div>

              <button
                className="absolute right-4 bg-[#212121] text-white p-1 rounded-lg group-hover/show:visible invisible"
                data-testid="send-button"
              >
                <span className="" data-state="closed">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 11L12 6L17 11M12 18V7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
