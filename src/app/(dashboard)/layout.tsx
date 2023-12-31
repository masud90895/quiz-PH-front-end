import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar/DashboardSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard-Quizzes",
  description: "Quizzes is a quiz app built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-slate-200 flex h-screen">
          {/* <!-- /Sidebar --> */}
          <DashboardSidebar />
          <div className="flex h-full w-full flex-col">
            {/* <!-- Navbar --> */}
            <DashboardNavbar />
            {/* <!-- /Navbar --> */}
            {/* <!-- Main --> */}
            <div className="h-full overflow-hidden p-3">
              <main
                id="dashboard-main"
                className="h-[calc(100vh-10rem)] overflow-auto px-4 py-5 bg-white rounded-lg shadow-md"
              >
                {children}
              </main>
            </div>
            {/* <!-- /Main --> */}
          </div>
        </div>
      </body>
    </html>
  );
}
