"use server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/user";

export async function createChats(messages: any, chatId: string | undefined) {
  const user = await getUser();

  const userContent = messages[messages.length - 2];
  const aiContent = messages[messages.length - 1];

  const userContentText = userContent?.parts?.find((p: any) => p.type === 'text')?.text || '';
  const aiContentText = aiContent?.parts?.find((p: any) => p.type === 'text')?.text || '';

  await db.$transaction(async (tx) => {
    await tx.chats.create({
      data: {
        id: userContent?.id,
        userId: user?.id as string,
        newChatId: chatId as string,
        role: userContent?.role,
        content: userContentText,
      }
    })

    await tx.chats.create({
      data: {
        id: aiContent?.id,
        userId: user?.id as string,
        newChatId: chatId as string,
        role: aiContent?.role,
        content: aiContentText,
      }
    })
  })
}
