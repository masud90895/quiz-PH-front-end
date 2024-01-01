"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar/DashboardSidebar";
import { getUserDataFromLC } from "@/utils/local-storage";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: any = getUserDataFromLC();
  const router = useRouter();

  if (!user && user?.role !== "admin" && typeof window !== "undefined") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not authorized to access this page!",
    });

    return router.push("/login");
  }

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
