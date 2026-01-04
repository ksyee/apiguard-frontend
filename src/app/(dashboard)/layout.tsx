"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || theme === "system");

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "bg-gray-950" : "bg-gray-100"}`}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg ${
          isDarkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-900 shadow-md"
        }`}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out`}
      >
        <AppSidebar onMobileClose={() => setIsMobileMenuOpen(false)} />
      </div>

      <main className="flex-1 p-4 md:p-8 md:ml-64 overflow-auto">
        <div className="pt-12 md:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
