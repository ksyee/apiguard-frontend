"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Mail, MessageSquare, Trash2, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";

const alertConfigs = [
  {
    id: 1,
    name: 'Production API Down Alert',
    type: 'email',
    target: 'admin@example.com',
    threshold: 3,
    enabled: true,
  },
  {
    id: 2,
    name: 'Slack Notification',
    type: 'slack',
    target: '#api-monitoring',
    threshold: 2,
    enabled: true,
  },
  {
    id: 3,
    name: 'Critical Endpoint Alert',
    type: 'email',
    target: 'oncall@example.com',
    threshold: 1,
    enabled: false,
  },
];

export function AlertsPage() {
  const [showNewAlertForm, setShowNewAlertForm] = useState(false);
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
          <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Alert Configuration</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Manage notification settings for your endpoints</p>
        </div>
        <Button className="gap-2" onClick={() => setShowNewAlertForm(!showNewAlertForm)}>
          {showNewAlertForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showNewAlertForm ? 'Cancel' : 'New Alert'}
        </Button>
      </div>

      {/* New Alert Form - Only show when button is clicked */}
      <AnimatePresence mode="wait">
        {showNewAlertForm && (
          <motion.div
            key="alert-form"
            initial={{ opacity: 0, y: -20, scale: 0.95, height: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
            exit={{ opacity: 0, y: -20, scale: 0.95, height: 0 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Create New Alert</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="alert-name" className={isDarkMode ? 'text-gray-300' : ''}>Alert Name</Label>
                  <Input 
                    id="alert-name" 
                    placeholder="e.g., Production API Down Alert" 
                    className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : ''}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="alert-type" className={isDarkMode ? 'text-gray-300' : ''}>Alert Type</Label>
                    <Select>
                      <SelectTrigger id="alert-type" className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
                        <SelectItem value="email" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>Email</SelectItem>
                        <SelectItem value="slack" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>Slack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="threshold" className={isDarkMode ? 'text-gray-300' : ''}>Failure Threshold</Label>
                    <Input 
                      id="threshold" 
                      type="number" 
                      placeholder="3" 
                      className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : ''}
                    />
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Alert after N consecutive failures</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target" className={isDarkMode ? 'text-gray-300' : ''}>Target (Email or Slack Channel)</Label>
                  <Input 
                    id="target" 
                    placeholder="admin@example.com or #channel-name" 
                    className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : ''}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setShowNewAlertForm(false)}>Create Alert</Button>
                  <Button variant="outline" onClick={() => setShowNewAlertForm(false)} className={
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : ''
                  }>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert Configs List */}
      <motion.div 
        className="space-y-4"
        layout
        transition={{ 
          layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        }}
      >
        {alertConfigs.map((config, index) => (
          <motion.div
            key={config.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, delay: index * 0.05 },
              y: { duration: 0.3, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isDarkMode ? 'bg-blue-500/10' : 'bg-blue-100'
                    }`}>
                      {config.type === 'email' ? (
                        <Mail className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      ) : (
                        <MessageSquare className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'}>{config.name}</h3>
                        <Badge variant={config.enabled ? 'default' : 'secondary'} className={
                          config.enabled 
                            ? 'bg-black text-white'
                            : isDarkMode ? 'bg-gray-800 text-gray-300' : ''
                        }>
                          {config.enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Alert after {config.threshold} consecutive failures
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${
                          isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : ''
                        }`}>
                          {config.type.toUpperCase()}
                        </Badge>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{config.target}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className={
                    isDarkMode ? 'hover:bg-gray-800' : ''
                  }>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}