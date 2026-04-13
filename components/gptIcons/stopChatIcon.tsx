import React from "react";

export default function StopChatIcon({ stop }: { stop: any }) {
  return (
    <>
      <div onClick={() => stop()}>
        <div className="flex h-full flex-row items-center justify-center gap-3">
          <button
            type="button"
            className="rounded-full border-2 p-1 border-gray-200"
            aria-label="Stop generating"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="text-token-text-primary"
              height="18"
              width="18"
            >
              <path
                d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"
                strokeWidth="0"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
