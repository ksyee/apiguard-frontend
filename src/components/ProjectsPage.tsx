"use client"

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Globe, Settings } from "lucide-react";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'Main production services for online store',
    endpoints: 12,
    uptime: 99.8,
    avgResponseTime: 234,
    status: 'healthy',
    environment: 'production'
  },
  {
    id: 2,
    name: 'Mobile App Backend',
    description: 'API services for iOS and Android apps',
    endpoints: 8,
    uptime: 100,
    avgResponseTime: 189,
    status: 'healthy',
    environment: 'production'
  },
  {
    id: 3,
    name: 'Payment Gateway',
    description: 'Payment processing and billing services',
    endpoints: 6,
    uptime: 95.2,
    avgResponseTime: 456,
    status: 'warning',
    environment: 'production'
  },
  {
    id: 4,
    name: 'Analytics Service',
    description: 'Data analytics and reporting APIs',
    endpoints: 5,
    uptime: 98.5,
    avgResponseTime: 312,
    status: 'healthy',
    environment: 'staging'
  },
  {
    id: 5,
    name: 'Auth Service',
    description: 'Authentication and authorization',
    endpoints: 4,
    uptime: 99.9,
    avgResponseTime: 145,
    status: 'healthy',
    environment: 'production'
  },
  {
    id: 6,
    name: 'Notification Service',
    description: 'Email and push notification delivery',
    endpoints: 7,
    uptime: 97.3,
    avgResponseTime: 289,
    status: 'healthy',
    environment: 'staging'
  },
];

export function ProjectsPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === 'dark' || theme === 'system');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Projects</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Manage your API monitoring projects</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
          >
            <Card 
              className={`transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700' 
                  : 'bg-white border-gray-300 shadow-sm hover:shadow-lg'
              }`}
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Environment</span>
                  <Badge variant={project.environment === 'production' ? 'default' : 'secondary'}>
                    {project.environment}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Endpoints</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{project.endpoints}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Uptime</span>
                  <span className={`${project.uptime >= 99 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {project.uptime}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Response</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{project.avgResponseTime}ms</span>
                </div>

                <div className={`pt-2 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <Badge variant={project.status === 'healthy' ? 'outline' : 'default'} className="w-full justify-center">
                    {project.status === 'healthy' ? '✓ All Systems Operational' : '⚠ Needs Attention'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}