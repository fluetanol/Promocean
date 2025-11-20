// frontend/src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";

export const metadata: Metadata = {
  title: "PromOcean",
  description: "프롬프트를 위한 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>

        {/* Todo: tailwind나 globals.css쪽에서 적용안돼서 방법 찾으면 해결 예정입니다. */}
        {/* Pretendard CDN — 100% 확실하게 적용됨 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-[Pretendard] bg-background text-text" suppressHydrationWarning>
        <SidebarProvider>
          <div className="min-h-screen">
            <Sidebar />
            <div>
            </div>
            <main className="bg-background min-h-screen transition-all duration-300" style={{ marginLeft: 'var(--sidebar-width, 13rem)' }} id="main-content">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
