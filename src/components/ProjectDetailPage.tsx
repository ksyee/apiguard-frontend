"use client"

import { useRouter, useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, ArrowLeft, Play, Edit, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { motion } from "framer-motion";

const endpoints = [
  {
    id: 1,
    name: 'Get Products',
    url: 'https://api.example.com/v1/products',
    method: 'GET',
    status: 'up',
    lastCheck: '30 seconds ago',
    responseTime: 234,
    uptime: 99.9,
    isActive: true,
  },
  {
    id: 2,
    name: 'Create Order',
    url: 'https://api.example.com/v1/orders',
    method: 'POST',
    status: 'up',
    lastCheck: '45 seconds ago',
    responseTime: 456,
    uptime: 99.5,
    isActive: true,
  },
  {
    id: 3,
    name: 'User Authentication',
    url: 'https://api.example.com/v1/auth/login',
    method: 'POST',
    status: 'down',
    lastCheck: '1 minute ago',
    responseTime: 0,
    uptime: 95.2,
    isActive: true,
  },
  {
    id: 4,
    name: 'Get User Profile',
    url: 'https://api.example.com/v1/users/me',
    method: 'GET',
    status: 'up',
    lastCheck: '2 minutes ago',
    responseTime: 189,
    uptime: 100,
    isActive: true,
  },
  {
    id: 5,
    name: 'Update Inventory',
    url: 'https://api.example.com/v1/inventory',
    method: 'PUT',
    status: 'up',
    lastCheck: '3 minutes ago',
    responseTime: 312,
    uptime: 98.8,
    isActive: false,
  },
];

export function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === 'dark' || theme === 'system');

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-700';
      case 'POST': return 'bg-green-100 text-green-700';
      case 'PUT': return 'bg-yellow-100 text-yellow-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleBack = () => {
    router.push('/projects');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBack}
          className={isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900'}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>E-commerce Platform</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Main production services for online store</p>
        </div>
        <Button className="gap-2" onClick={() => router.push(`/projects/${params.id}/endpoints/new`)}>
          <Plus className="h-4 w-4" />
          Add Endpoint
        </Button>
      </div>

      {/* Quick Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
            <CardContent className="pt-6">
              <div className={`text-2xl mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Endpoints</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
            <CardContent className="pt-6">
              <div className="text-2xl text-green-600 mb-1">11</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Up</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
            <CardContent className="pt-6">
              <div className="text-2xl text-red-600 mb-1">1</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Down</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
            <CardContent className="pt-6">
              <div className={`text-2xl mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>298ms</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Response</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Endpoints List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
          <CardHeader>
            <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {endpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05, ease: [0.4, 0, 0.2, 1] }}
                  className={`flex flex-col xl:flex-row xl:items-center justify-between p-4 rounded-lg transition-colors cursor-pointer gap-4 ${
                    isDarkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                  onClick={() => router.push(`/projects/${params.id}/endpoints/${endpoint.id}`)}
                >
                  <div className="flex items-center gap-4 flex-1 w-full xl:w-auto min-w-0">
                    <div className={`w-3 h-3 shrink-0 rounded-full ${endpoint.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className={`truncate font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{endpoint.name}</p>
                        <Badge className={`${getMethodColor(endpoint.method)} text-xs px-2 py-0`}>
                          {endpoint.method}
                        </Badge>
                      </div>
                      <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{endpoint.url}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between xl:justify-end gap-2 sm:gap-6 w-full xl:w-auto overflow-x-auto xl:overflow-visible pb-2 xl:pb-0">
                    <div className="flex items-center gap-4 sm:gap-6 min-w-max">
                      <div className="text-right">
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{endpoint.responseTime}ms</div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>response time</div>
                      </div>

                      <div className="text-right">
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{endpoint.uptime}%</div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>uptime</div>
                      </div>

                      <div className="text-right min-w-[100px] sm:min-w-[120px]">
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{endpoint.lastCheck}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>last check</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 pl-4 border-l border-gray-700/50 ml-2">
                      <Switch 
                        checked={endpoint.isActive}
                        onClick={(e) => e.stopPropagation()}
                      />

                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/projects/${params.id}/endpoints/${endpoint.id}/edit`);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}