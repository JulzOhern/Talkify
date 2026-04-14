import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "New chat",
  description: "A modern AI chat assistant inspired by advanced conversational AI. Ask questions, get answers, and chat with an intelligent assistant in real time.",
  keywords: [
    "AI chat",
    "chatbot",
    "AI assistant",
    "conversational AI",
    "chat interface",
    "AI tools",
    "smart assistant",
    "next.js chatbot"
  ],
  authors: [{ name: "Julius Hernandez", /* url: "https://yourwebsite.com" */ }],
  creator: "Julius Hernandez",
  /* publisher: "Your Brand", */
  openGraph: {
    title: "New chat",
    description: "A modern AI chat assistant inspired by advanced conversational AI. Ask questions, get answers, and chat with an intelligent assistant in real time.",
    /* url: "https://yourwebsite.com", */
    siteName: "AI Chat Assistant",
    /* images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Chat Assistant Preview",
      },
    ], */
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New chat",
    description: "A modern AI chat assistant inspired by advanced conversational AI. Ask questions, get answers, and chat with an intelligent assistant in real time.",
    /* creator: "@yourhandle", */
    /* images: ["https://yourwebsite.com/og-image.jpg"], */
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#212121] text-white">{children}</body>
      </html>
    </ClerkProvider>
  );
}
