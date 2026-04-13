"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import SidebarGPTlogo from "./gptIcons/sidebarGPTlogo";
import NewChatPencilIcon from "./gptIcons/newChatPencilIcon";
import UserNewChatsRow from "./userNewChatsRow";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useOpenSideBar } from "@/utils/zustand";
import Image from "next/image";

type SidebarRowProp = {
  user: {
    id: string;
    externalUserId: string;
    username: string;
    profile: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  userNewChat:
  | {
    id: string;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
  | null;
};

export default function SidebarRow({ user, userNewChat }: SidebarRowProp) {
  const isOpenSidebar = useOpenSideBar((state) => state.isOpen);

  return (
    <div
      className={cn(
        "sidebarContainer flex flex-col fixed inset-y-0 w-[16rem] bg-[#171717] pb-3 z-[103] duration-200 overflow-hidden",
        isOpenSidebar ? "md:w-0 w-[16rem]" : "md:w-[16rem] w-[0]"
      )}
    >
      <div className="sidebar flex-1 pt-[.9rem] pl-3 pr-2 mr-1 overflow-x-hidden">
        <Link
          href="/"
          className="sticky top-0 z-[50] flex items-center justify-between p-1 hover:bg-[#212121] bg-[#171717] rounded-lg py-[6px] px-2"
        >
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={800}
              height={950}
              className="rounded-full w-8"
            />

            <h1 className="flex items-center gap-2">
              <span className="font-medium text-sm whitespace-nowrap">
                New chat
              </span>
            </h1>
          </div>

          <button>
            <NewChatPencilIcon />
          </button>
        </Link>

        <div className="mt-6">
          <UserNewChatsRow userNewChat={userNewChat} />
        </div>
      </div>

      <div className="pt-4 px-3">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-[#212121] p-2 rounded-lg">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <p className="text-sm whitespace-nowrap">{user?.username}</p>
        </div>
      </div>
    </div>
  );
}
