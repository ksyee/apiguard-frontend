"use client"

import { useRouter, useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Play, Edit } from "lucide-react";
import { Badge } from "./ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const responseTimeData = [
  { time: '10:00', value: 234 },
  { time: '10:30', value: 245 },
  { time: '11:00', value: 189 },
  { time: '11:30', value: 267 },
  { time: '12:00', value: 312 },
  { time: '12:30', value: 289 },
  { time: '13:00', value: 234 },
  { time: '13:30', value: 198 },
];

const uptimeData = [
  { name: 'Success', value: 1432 },
  { name: 'Failed', value: 23 },
];

const COLORS = ['#10b981', '#ef4444'];

const recentChecks = [
  { id: 1, timestamp: '2024-11-07 14:23:45', status: 200, responseTime: 234, result: 'success' },
  { id: 2, timestamp: '2024-11-07 14:22:45', status: 200, responseTime: 245, result: 'success' },
  { id: 3, timestamp: '2024-11-07 14:21:45', status: 500, responseTime: 0, result: 'failed' },
  { id: 4, timestamp: '2024-11-07 14:20:45', status: 200, responseTime: 189, result: 'success' },
  { id: 5, timestamp: '2024-11-07 14:19:45', status: 200, responseTime: 267, result: 'success' },
  { id: 6, timestamp: '2024-11-07 14:18:45', status: 200, responseTime: 223, result: 'success' },
];

export function EndpointDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === 'dark' || theme === 'system');

  const successRate = ((uptimeData[0].value / (uptimeData[0].value + uptimeData[1].value)) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push(`/projects/${params.id}`)}
          className={isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900'}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-3xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Get Products</h1>
            <Badge className="bg-blue-100 text-blue-700">GET</Badge>
            <Badge variant="outline" className="border-green-500 text-green-700">UP</Badge>
          </div>
          <p className={`mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>https://api.example.com/v1/products</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Last checked: 30 seconds ago</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className={`gap-2 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : ''}`}>
            <Play className="h-4 w-4" />
            Test Now
          </Button>
          <Button className="gap-2" onClick={() => router.push(`/projects/${params.id}/endpoints/${params.endpointId}/edit`)}>
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
          <CardContent className="pt-6">
            <div className="text-2xl text-green-600 mb-1">{successRate}%</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Success Rate</div>
          </CardContent>
        </Card>
        <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
          <CardContent className="pt-6">
            <div className={`text-2xl mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>234ms</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Response Time</div>
          </CardContent>
        </Card>
        <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
          <CardContent className="pt-6">
            <div className={`text-2xl mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1,455</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Checks</div>
          </CardContent>
        </Card>
        <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
          <CardContent className="pt-6">
            <div className={`text-2xl mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>60s</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Check Interval</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
            <CardHeader>
              <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Response Time Trend</CardTitle>
            </CardHeader>
            <CardContent className={isDarkMode ? 'bg-gray-900' : ''}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
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
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
            <CardHeader>
              <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Success vs Failed</CardTitle>
            </CardHeader>
            <CardContent className={isDarkMode ? 'bg-gray-900' : ''}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={uptimeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {uptimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                      border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: isDarkMode ? '#ffffff' : '#000000'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Checks Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
          <CardHeader>
            <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Recent Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? 'border-gray-800 border-b' : 'border-b'}>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Timestamp</th>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status Code</th>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Response Time</th>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {recentChecks.map((check) => (
                    <tr key={check.id} className={`border-b ${isDarkMode ? 'border-gray-800 hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                      <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{check.timestamp}</td>
                      <td className="py-3 px-4">
                        <Badge variant={check.status === 200 ? 'outline' : 'destructive'} className={isDarkMode && check.status === 200 ? 'border-green-500/50 text-green-400' : ''}>
                          {check.status}
                        </Badge>
                      </td>
                      <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{check.responseTime}ms</td>
                      <td className="py-3 px-4">
                        <Badge variant={check.result === 'success' ? 'outline' : 'destructive'} className={isDarkMode && check.result === 'success' ? 'border-green-500/50 text-green-400' : ''}>
                          {check.result}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

