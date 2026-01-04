"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === 'dark' || theme === 'system');

  const handleLogin = () => {
    router.push('/dashboard');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-black' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        <Card className={`w-full backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-900/90 border-gray-800 shadow-2xl' 
            : 'bg-white/90 border-white/20 shadow-xl'
        }`}>
          <CardHeader className="space-y-3 text-center">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20"
            >
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
            <CardTitle className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome to APIGuard
            </CardTitle>
            <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Monitor your APIs with confidence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : ''}
              />
            </div>

            <Button className="w-full h-11 text-base" onClick={handleLogin}>
              Sign In
            </Button>

            <div className="text-center text-sm">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Don't have an account? </span>
              <Link 
                href="/register"
                className={`font-medium hover:underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

