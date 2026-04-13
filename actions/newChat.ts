"use server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewChat(messages: any) {
  const user = await getUser();

  const userContent = messages[messages.length - 2];
  const aiContent = messages[messages.length - 1];

  const userContentText = userContent?.parts?.find((p: any) => p.type === 'text')?.text || '';
  const aiContentText = aiContent?.parts?.find((p: any) => p.type === 'text')?.text || '';

  const data = await db.$transaction(async (tx) => {
    const newChat = await tx.newChat.create({
      data: {
        userId: user?.id as string,
        title: userContentText,
      }
    })

    await db.chats.create({
      data: {
        id: userContent?.id,
        userId: user?.id as string,
        role: userContent?.role,
        content: userContentText,
        newChatId: newChat.id,
      }
    })

    await db.chats.create({
      data: {
        id: aiContent.id,
        userId: user?.id as string,
        role: aiContent.role,
        content: aiContentText,
        newChatId: newChat.id,
      }
    })

    return newChat;
  })

  revalidatePath("/");
  redirect(`/c/${data.id}`);
}
