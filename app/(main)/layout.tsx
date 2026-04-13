import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-[100dvh]">
      <Navbar />
      <Sidebar />
      <Toaster position="top-center" />
      <div className="flex flex-col flex-1 min-h-0">{children}</div>
    </div>
  );
}
