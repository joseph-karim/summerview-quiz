"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, 
  Users, 
  Settings, 
  Database, 
  FileText, 
  Video, 
  Calendar,
  TrendingUp,
  PieChart,
  Download
} from 'lucide-react'

// Mock data for demo
const mockAnalytics = {
  totalCompletions: 1247,
  conversionRate: 23.5,
  averageTime: 87,
  dropOffPoints: [
    { step: 1, completions: 1000, dropOff: 15 },
    { step: 2, completions: 850, dropOff: 12 },
    { step: 3, completions: 748, dropOff: 18 },
    { step: 4, completions: 614, dropOff: 22 },
    { step: 5, completions: 479, dropOff: 8 },
    { step: 6, completions: 441, dropOff: 5 },
    { step: 7, completions: 419, dropOff: 3 },
    { step: 'Contact', completions: 406, dropOff: 0 }
  ]
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple demo authentication
    if (credentials.username === 'admin' && credentials.password === 'demo123') {
      setIsAuthenticated(true)
    } else {
      alert('Demo credentials: admin / demo123')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Sign in to manage quiz content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter password"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo Credentials:</strong><br />
              Username: admin<br />
              Password: demo123
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PRP Quiz Admin</h1>
                <p className="text-sm text-gray-600">Content Management Dashboard</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Quiz Logic</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center space-x-2">
              <Video className="w-4 h-4" />
              <span>Media</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockAnalytics.totalCompletions}</p>
                    <p className="text-sm text-gray-600">Total Completions</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockAnalytics.conversionRate}%</p>
                    <p className="text-sm text-gray-600">Booking Conversion</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockAnalytics.averageTime}s</p>
                    <p className="text-sm text-gray-600">Avg. Completion Time</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center space-x-2">
                  <PieChart className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">68%</p>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { action: 'Quiz completed', user: 'sarah.m@email.com', result: 'Ideal', time: '2 minutes ago' },
                  { action: 'Booking scheduled', user: 'mike.j@email.com', result: 'Partial', time: '15 minutes ago' },
                  { action: 'Quiz completed', user: 'jade.k@email.com', result: 'Ideal', time: '23 minutes ago' },
                  { action: 'Quiz abandoned', user: 'anonymous', result: 'Step 4', time: '31 minutes ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.action.includes('completed') ? 'bg-green-500' : 
                        activity.action.includes('scheduled') ? 'bg-blue-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{activity.result}</Badge>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Quiz Logic Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quiz Configuration</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Question Management</h3>
                  <div className="space-y-2">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">Step {i + 1}: Question {i + 1}</span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Logic Rules</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3">Current routing logic:</p>
                    <div className="space-y-2 text-xs font-mono bg-white p-3 rounded border">
                      <div>Ideal: diffuse + recent + prevent</div>
                      <div>Partial: any concern + timeline + goals</div>
                      <div>Unfit: advanced loss or unrealistic</div>
                    </div>
                    <Button className="mt-3 w-full" variant="outline">
                      Edit Logic Rules
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Media Library</h2>
                <Button>Upload Media</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'testimonial-sarah.mp4', type: 'Video', size: '15MB' },
                  { name: 'hair-diffuse.jpg', type: 'Image', size: '2MB' },
                  { name: 'timeline-demo.gif', type: 'GIF', size: '8MB' },
                  { name: 'results-before-after.jpg', type: 'Image', size: '3MB' }
                ].map((file, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <Video className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-600">{file.type} • {file.size}</p>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Quiz Funnel Analysis</h2>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
              <div className="space-y-4">
                {mockAnalytics.dropOffPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-sm font-medium">
                      {typeof point.step === 'string' ? point.step : `Step ${point.step}`}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-teal-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(point.completions / 1000) * 100}%` }}
                      >
                        <span className="text-white text-xs font-medium">
                          {point.completions}
                        </span>
                      </div>
                    </div>
                    <div className="w-16 text-sm text-right">
                      {point.dropOff > 0 && (
                        <span className="text-red-600">-{point.dropOff}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Result Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Ideal Candidates</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Partial Fit</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Not a Fit</span>
                    <span className="font-medium">23%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Conversion Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Consultation Bookings</span>
                    <span className="font-medium text-green-600">23.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Guide Downloads</span>
                    <span className="font-medium text-blue-600">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Email Signups</span>
                    <span className="font-medium text-purple-600">89%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Integration Settings</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="wix-booking">Wix Bookings URL</Label>
                  <Input
                    id="wix-booking"
                    placeholder="https://www.wixbookings.com/..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="posthog-key">PostHog API Key</Label>
                  <Input
                    id="posthog-key"
                    placeholder="phc_xxxxxxxxxxxxx"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="webhook-url">Lead Routing Webhook</Label>
                  <Input
                    id="webhook-url"
                    placeholder="https://hooks.zapier.com/..."
                    className="mt-1"
                  />
                </div>
                <Button>Save Settings</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}