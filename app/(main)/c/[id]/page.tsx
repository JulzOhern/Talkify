import ChatRow from "@/components/chatRow";
import { getNewChat } from "@/lib/newChat";
import { getUser } from "@/lib/user";
import React from "react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const newChat = await getNewChat(id);

  return {
    title: newChat?.title,
    openGraph: {
      title: newChat?.title,
    },
    twitter: {
      title: newChat?.title,
    },
  };
}

export default async function CPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await getUser();
  const newChat = await getNewChat(id);

  return <ChatRow user={user} chatId={id} newChat={newChat} />;
}
