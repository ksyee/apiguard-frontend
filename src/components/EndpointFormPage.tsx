"use client"

import { useRouter, useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface EndpointFormPageProps {
  isEdit?: boolean;
}

export function EndpointFormPage({ isEdit = false }: EndpointFormPageProps) {
  const router = useRouter();
  const params = useParams();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [headers, setHeaders] = useState([{ key: 'Content-Type', value: 'application/json' }]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === 'dark' || theme === 'system');

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleBack = () => {
    if (isEdit) {
      router.push(`/projects/${params.id}/endpoints/${params.endpointId}`);
    } else {
      router.push(`/projects/${params.id}`);
    }
  };

  const inputStyles = isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : '';
  const labelStyles = isDarkMode ? 'text-gray-300' : '';

  return (
    <div className="space-y-6 max-w-4xl">
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

      <div>
        <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isEdit ? 'Edit Endpoint' : 'New Endpoint'}</h1>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Configure your API endpoint for monitoring</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
          <CardHeader>
            <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={labelStyles}>Endpoint Name</Label>
              <Input id="name" placeholder="e.g., Get Products" defaultValue={isEdit ? "Get Products" : ""} className={inputStyles} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url" className={labelStyles}>URL</Label>
              <Input 
                id="url" 
                placeholder="https://api.example.com/v1/endpoint" 
                defaultValue={isEdit ? "https://api.example.com/v1/products" : ""}
                className={inputStyles}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="method" className={labelStyles}>HTTP Method</Label>
                <Select defaultValue={isEdit ? "GET" : undefined}>
                  <SelectTrigger id="method" className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <SelectItem value="GET" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>GET</SelectItem>
                    <SelectItem value="POST" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>POST</SelectItem>
                    <SelectItem value="PUT" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>PUT</SelectItem>
                    <SelectItem value="PATCH" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>PATCH</SelectItem>
                    <SelectItem value="DELETE" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expected-status" className={labelStyles}>Expected Status Code</Label>
                <Input id="expected-status" placeholder="200" defaultValue={isEdit ? "200" : ""} className={inputStyles} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Headers</CardTitle>
              <Button variant="outline" size="sm" onClick={addHeader} className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : ''}>
                <Plus className="h-4 w-4 mr-2" />
                Add Header
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {headers.map((header, index) => (
              <div key={index} className="flex gap-3">
                <Input placeholder="Header name" defaultValue={header.key} className={`flex-1 ${inputStyles}`} />
                <Input placeholder="Header value" defaultValue={header.value} className={`flex-1 ${inputStyles}`} />
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeHeader(index)}
                  disabled={headers.length === 1}
                  className={isDarkMode ? 'hover:bg-gray-800' : ''}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ))}
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
            <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Request Body</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder='{"key": "value"}' 
              rows={6}
              className={`font-mono text-sm ${inputStyles}`}
            />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300 shadow-sm'}>
          <CardHeader>
            <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Monitoring Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interval" className={labelStyles}>Check Interval (seconds)</Label>
                <Input id="interval" type="number" placeholder="60" defaultValue={isEdit ? "60" : ""} className={inputStyles} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout" className={labelStyles}>Timeout (seconds)</Label>
                <Input id="timeout" type="number" placeholder="30" defaultValue={isEdit ? "30" : ""} className={inputStyles} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-response-time" className={labelStyles}>Max Response Time (ms)</Label>
              <Input id="max-response-time" type="number" placeholder="1000" defaultValue={isEdit ? "2000" : ""} className={inputStyles} />
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Alert if response time exceeds this value</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex gap-3">
        <Button className="flex-1">
          {isEdit ? 'Update Endpoint' : 'Create Endpoint'}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleBack}
          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : ''}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

