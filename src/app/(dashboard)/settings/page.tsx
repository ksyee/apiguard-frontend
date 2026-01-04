"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Page() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === 'dark' || theme === 'system');

  return (
    <div
      className={
        isDarkMode ? "text-white" : "text-gray-900"
      }
    >
      <h1 className="text-3xl mb-2">Settings</h1>
      <p
        className={
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }
      >
        Configure your account and preferences
      </p>
    </div>
  );
}
