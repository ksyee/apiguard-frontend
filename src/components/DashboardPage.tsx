"use client"

import { Activity, CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, AlertCircle, Sun, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const responseTimeData = [
  { time: '00:00', value: 245 },
  { time: '02:00', value: 223 },
  { time: '04:00', value: 189 },
  { time: '06:00', value: 267 },
  { time: '08:00', value: 312 },
  { time: '10:00', value: 289 },
  { time: '12:00', value: 428 },
  { time: '14:00', value: 456 },
  { time: '16:00', value: 395 },
  { time: '18:00', value: 334 },
  { time: '20:00', value: 267 },
  { time: '22:00', value: 198 },
];

const uptimeData = [
  { time: '00:00', up: 47, down: 0 },
  { time: '04:00', up: 47, down: 0 },
  { time: '08:00', up: 46, down: 1 },
  { time: '12:00', up: 45, down: 2 },
  { time: '16:00', up: 46, down: 1 },
  { time: '20:00', up: 47, down: 0 },
];

const recentAlerts = [
  { id: 1, endpoint: 'API Gateway - Production', status: 'down', time: '2 min ago', severity: 'critical' },
  { id: 2, endpoint: 'User Service - Staging', status: 'slow', time: '15 min ago', severity: 'warning' },
  { id: 3, endpoint: 'Payment API - Production', status: 'recovered', time: '1 hr ago', severity: 'success' },
  { id: 4, endpoint: 'Auth Service - Production', status: 'down', time: '3 hrs ago', severity: 'critical' },
  { id: 5, endpoint: 'Notification Service', status: 'slow', time: '5 hrs ago', severity: 'warning' },
  { id: 6, endpoint: 'Analytics API', status: 'recovered', time: '6 hrs ago', severity: 'success' },
];

export function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === 'dark' || theme === 'system');

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="transition-colors">
      {/* Header with Dark Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className={`text-2xl sm:text-3xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Real-time API monitoring overview</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : ''}
        >
          {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
          {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Total Endpoints */}
        <motion.div 
          className={`p-6 rounded-xl border transition-shadow ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-300 shadow-sm hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <Activity className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="flex items-center gap-1 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">12%</span>
            </div>
          </div>
          <div className={`text-3xl mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>47</div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Endpoints</div>
        </motion.div>

        {/* Endpoints Up */}
        <motion.div 
          className={`p-6 rounded-xl border transition-shadow ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-300 shadow-sm hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-green-500/10' : 'bg-green-50'}`}>
              <CheckCircle className={`h-6 w-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <div className="flex items-center gap-1 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">2.3%</span>
            </div>
          </div>
          <div className={`text-3xl mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>45</div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Endpoints Up (95.7%)</div>
        </motion.div>

        {/* Endpoints Down */}
        <motion.div 
          className={`p-6 rounded-xl border transition-shadow ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-300 shadow-sm hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-red-500/10' : 'bg-red-50'}`}>
              <XCircle className={`h-6 w-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <div className="flex items-center gap-1 text-red-500">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm">1%</span>
            </div>
          </div>
          <div className={`text-3xl mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2</div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Endpoints Down</div>
        </motion.div>

        {/* Avg Response Time */}
        <motion.div 
          className={`p-6 rounded-xl border transition-shadow ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-300 shadow-sm hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-cyan-500/10' : 'bg-cyan-50'}`}>
              <Clock className={`h-6 w-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
            </div>
            <div className="flex items-center gap-1 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">8.5%</span>
            </div>
          </div>
          <div className={`text-3xl mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>284ms</div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Response Time</div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Response Time */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Card className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}`}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Response Time Trends (24h)
                </CardTitle>
              </CardHeader>
              <CardContent className={`${isDarkMode ? 'bg-gradient-to-br from-cyan-950/30 to-blue-950/30' : 'bg-gray-50'} rounded-lg p-4`}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={responseTimeData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="time" 
                      stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: isDarkMode ? '#ffffff' : '#000000'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#06b6d4" 
                      strokeWidth={2}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Secondary Chart - Uptime */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <Card className={`mt-6 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}`}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Endpoint Status Over Time
                </CardTitle>
              </CardHeader>
              <CardContent className={`${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-950' : 'bg-gray-50'} rounded-lg p-4`}>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={uptimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="time" 
                      stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: isDarkMode ? '#ffffff' : '#000000'
                      }}
                    />
                    <Line type="monotone" dataKey="up" stroke="#10b981" strokeWidth={2} name="Up" />
                    <Line type="monotone" dataKey="down" stroke="#ef4444" strokeWidth={2} name="Down" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Alerts Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}`}>
            <CardHeader>
              <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {recentAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg border ${
                      isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 ${
                        alert.severity === 'critical' ? 'text-red-500' :
                        alert.severity === 'warning' ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {alert.endpoint}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={alert.status === 'down' ? 'destructive' : 'outline'}
                            className={
                              alert.status === 'down' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                              alert.status === 'slow' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                              'bg-green-500/10 text-green-500 border-green-500/20'
                            }
                          >
                            {alert.status.toUpperCase()}
                          </Badge>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {alert.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}