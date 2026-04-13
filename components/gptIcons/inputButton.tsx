import React from "react";

type InputButtonProp = {
  input: string;
};

const InputButton = ({ input }: InputButtonProp) => {
  return (
    <button
      disabled={!input}
      className="rounded-lg border p-0.5 text-black bg-white transition-colors disabled:bg-[#424242] disabled:border-[#424242] disabled:text-zinc-800 md:bottom-3 md:right-3"
      data-testid="send-button"
    >
      <span className="" data-state="closed">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
  );
};

export default InputButton;
