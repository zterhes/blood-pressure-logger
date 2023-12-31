"use client";

import Auth from "@/components/Auth";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <Auth>{children}</Auth>
        </NextUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
