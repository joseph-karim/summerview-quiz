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
import Image from 'next/image'

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
      <div className="min-h-screen bg-summerview-gray/20 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 border-summerview-gray">
          <div className="text-center mb-8">
            <div className="w-16 h-16 relative mx-auto mb-4">
              <Image
                src="https://static.wixstatic.com/media/edd959_b50bb85146a648cd82548c2db7101568~mv2.jpg"
                alt="Summerview Medical Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-playfair font-bold text-summerview-black">Admin Dashboard</h1>
            <p className="text-summerview-dark-gray font-lato">Sign in to manage quiz content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username" className="font-lato">Username</Label>
              <Input
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter username"
                className="font-lato border-summerview-gray"
              />
            </div>
            <div>
              <Label htmlFor="password" className="font-lato">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter password"
                className="font-lato border-summerview-gray"
              />
            </div>
            <Button type="submit" className="w-full bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white font-poppins">
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-summerview-tan/20 rounded-lg">
            <p className="text-sm text-summerview-brown font-lato">
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
    <div className="min-h-screen bg-summerview-gray/20">
      {/* Header */}
      <header className="bg-summerview-white border-b border-summerview-gray">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative">
                <Image
                  src="https://static.wixstatic.com/media/edd959_b50bb85146a648cd82548c2db7101568~mv2.jpg"
                  alt="Summerview Medical Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-playfair font-bold text-summerview-black">Summerview Medical</h1>
                <p className="text-sm text-summerview-dark-gray font-lato">PRP Quiz Admin Dashboard</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
              className="border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white font-poppins"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-summerview-white border-summerview-gray">
            <TabsTrigger value="overview" className="flex items-center space-x-2 data-[state=active]:bg-summerview-brown data-[state=active]:text-summerview-white font-lato">
              <BarChart className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center space-x-2 data-[state=active]:bg-summerview-brown data-[state=active]:text-summerview-white font-lato">
              <FileText className="w-4 h-4" />
              <span>Quiz Logic</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center space-x-2 data-[state=active]:bg-summerview-brown data-[state=active]:text-summerview-white font-lato">
              <Video className="w-4 h-4" />
              <span>Media</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2 data-[state=active]:bg-summerview-brown data-[state=active]:text-summerview-white font-lato">
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2 data-[state=active]:bg-summerview-brown data-[state=active]:text-summerview-white font-lato">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 border-summerview-gray">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-summerview-teal" />
                  <div>
                    <p className="text-2xl font-bold text-summerview-black font-poppins">{mockAnalytics.totalCompletions}</p>
                    <p className="text-sm text-summerview-dark-gray font-lato">Total Completions</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-summerview-gray">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-8 h-8 text-summerview-brown" />
                  <div>
                    <p className="text-2xl font-bold text-summerview-black font-poppins">{mockAnalytics.conversionRate}%</p>
                    <p className="text-sm text-summerview-dark-gray font-lato">Booking Conversion</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-summerview-gray">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-8 h-8 text-summerview-tan" />
                  <div>
                    <p className="text-2xl font-bold text-summerview-black font-poppins">{mockAnalytics.averageTime}s</p>
                    <p className="text-sm text-summerview-dark-gray font-lato">Avg. Completion Time</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-summerview-gray">
                <div className="flex items-center space-x-2">
                  <PieChart className="w-8 h-8 text-summerview-red" />
                  <div>
                    <p className="text-2xl font-bold text-summerview-black font-poppins">68%</p>
                    <p className="text-sm text-summerview-dark-gray font-lato">Completion Rate</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6 border-summerview-gray">
              <h2 className="text-lg font-semibold text-summerview-black mb-4 font-poppins">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { action: 'Quiz completed', user: 'sarah.m@email.com', result: 'Ideal', time: '2 minutes ago' },
                  { action: 'Booking scheduled', user: 'mike.j@email.com', result: 'Partial', time: '15 minutes ago' },
                  { action: 'Quiz completed', user: 'jade.k@email.com', result: 'Ideal', time: '23 minutes ago' },
                  { action: 'Quiz abandoned', user: 'anonymous', result: 'Step 4', time: '31 minutes ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-summerview-gray/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.action.includes('completed') ? 'bg-summerview-teal' : 
                        activity.action.includes('scheduled') ? 'bg-summerview-brown' : 'bg-summerview-tan'
                      }`} />
                      <div>
                        <p className="font-medium text-summerview-black font-poppins">{activity.action}</p>
                        <p className="text-sm text-summerview-dark-gray font-lato">{activity.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="border-summerview-brown text-summerview-brown">{activity.result}</Badge>
                      <p className="text-xs text-summerview-dark-gray mt-1 font-lato">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Quiz Logic Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <Card className="p-6 border-summerview-gray">
              <h2 className="text-lg font-semibold text-summerview-black mb-4 font-poppins">Quiz Configuration</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-summerview-black mb-3 font-poppins">Question Management</h3>
                  <div className="space-y-2">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-summerview-gray rounded-lg">
                        <span className="font-medium font-lato">Step {i + 1}: Question {i + 1}</span>
                        <Button variant="outline" size="sm" className="border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white">Edit</Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-summerview-black mb-3 font-poppins">Logic Rules</h3>
                  <div className="bg-summerview-gray/30 p-4 rounded-lg">
                    <p className="text-sm text-summerview-dark-gray mb-3 font-lato">Current routing logic:</p>
                    <div className="space-y-2 text-xs font-mono bg-summerview-white p-3 rounded border border-summerview-gray">
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6 border-summerview-gray">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-summerview-black font-poppins">Quiz Funnel Analysis</h2>
                <Button variant="outline" className="border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
              <div className="space-y-4">
                {mockAnalytics.dropOffPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-sm font-medium font-lato">
                      {typeof point.step === 'string' ? point.step : `Step ${point.step}`}
                    </div>
                    <div className="flex-1 bg-summerview-gray rounded-full h-6 relative">
                      <div
                        className="bg-gradient-to-r from-summerview-brown to-summerview-teal h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(point.completions / 1000) * 100}%` }}
                      >
                        <span className="text-summerview-white text-xs font-medium font-lato">
                          {point.completions}
                        </span>
                      </div>
                    </div>
                    <div className="w-16 text-sm text-right">
                      {point.dropOff > 0 && (
                        <span className="text-summerview-red font-lato">-{point.dropOff}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6 border-summerview-gray">
              <h2 className="text-lg font-semibold text-summerview-black mb-4 font-poppins">Integration Settings</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="wix-booking" className="font-lato">Wix Bookings URL</Label>
                  <Input
                    id="wix-booking"
                    placeholder="https://www.wixbookings.com/..."
                    className="mt-1 font-lato border-summerview-gray"
                  />
                </div>
                <div>
                  <Label htmlFor="posthog-key" className="font-lato">PostHog API Key</Label>
                  <Input
                    id="posthog-key"
                    placeholder="phc_xxxxxxxxxxxxx"
                    className="mt-1 font-lato border-summerview-gray"
                  />
                </div>
                <div>
                  <Label htmlFor="webhook-url" className="font-lato">Lead Routing Webhook</Label>
                  <Input
                    id="webhook-url"
                    placeholder="https://hooks.zapier.com/..."
                    className="mt-1 font-lato border-summerview-gray"
                  />
                </div>
                <Button className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white font-poppins">Save Settings</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}