"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Database,
  Cpu,
  HardDrive,
} from "lucide-react"
import {
  Line,
  LineChart,
  Area,
  AreaChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate realistic time-series data
function generateTimeSeriesData(points: number, baseValue: number, variance: number) {
  const now = Date.now()
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(now - (points - i) * 60000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    value: Math.max(0, baseValue + (Math.random() - 0.5) * variance),
  }))
}

// Generate log volume data
function generateLogVolumeData() {
  const now = Date.now()
  return Array.from({ length: 24 }, (_, i) => ({
    time: new Date(now - (24 - i) * 3600000).toLocaleTimeString("en-US", { hour: "2-digit" }),
    info: Math.floor(Math.random() * 5000 + 3000),
    warn: Math.floor(Math.random() * 1000 + 500),
    error: Math.floor(Math.random() * 200 + 50),
  }))
}

export default function DashboardPage() {
  const [requestData, setRequestData] = useState(generateTimeSeriesData(30, 2500, 800))
  const [responseTimeData, setResponseTimeData] = useState(generateTimeSeriesData(30, 150, 60))
  const [logVolumeData, setLogVolumeData] = useState(generateLogVolumeData())
  const [currentTime, setCurrentTime] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRequestData((prev) => {
        const newData = [...prev.slice(1)]
        newData.push({
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          value: Math.max(0, 2500 + (Math.random() - 0.5) * 800),
        })
        return newData
      })

      setResponseTimeData((prev) => {
        const newData = [...prev.slice(1)]
        newData.push({
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          value: Math.max(0, 150 + (Math.random() - 0.5) * 60),
        })
        return newData
      })

      setCurrentTime(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const stats = {
    totalRequests: 289234,
    avgResponseTime: 152,
    errorRate: 0.2,
    uptime: 99.98,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-mono text-xl font-semibold text-foreground">LogStream</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-foreground font-medium px-3 py-2 rounded-md bg-secondary">
                Dashboard
              </Link>
              <Link
                href="/logs"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                Logs
              </Link>
              <Link
                href="/settings"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Live</span>
            </div>
            <Button variant="outline" size="sm">
              Production
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Observability</h1>
          <p className="text-muted-foreground">
            Last updated:{" "}
            {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-muted-foreground">Total Requests</CardDescription>
              <CardTitle className="text-3xl font-bold text-foreground">
                {stats.totalRequests.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-chart-2" />
                <span className="text-chart-2">+12.5%</span>
                <span className="text-muted-foreground">vs last hour</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-muted-foreground">Avg Response Time</CardDescription>
              <CardTitle className="text-3xl font-bold text-foreground">{stats.avgResponseTime}ms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-chart-2" />
                <span className="text-chart-2">-8.3%</span>
                <span className="text-muted-foreground">vs last hour</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-muted-foreground">Error Rate</CardDescription>
              <CardTitle className="text-3xl font-bold text-foreground">{stats.errorRate}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-chart-2" />
                <span className="text-chart-2">Healthy</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-muted-foreground">Uptime</CardDescription>
              <CardTitle className="text-3xl font-bold text-foreground">{stats.uptime}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-chart-2" />
                <span className="text-muted-foreground">Last 30 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Request Volume Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Request Volume</CardTitle>
              <CardDescription className="text-muted-foreground">Requests per minute (last 30 minutes)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Requests",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={requestData}>
                    <defs>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-1))"
                      fill="url(#colorRequests)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Response Time Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Response Time</CardTitle>
              <CardDescription className="text-muted-foreground">
                Average response time in ms (last 30 minutes)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Response Time",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Log Volume by Severity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Log Volume by Severity</CardTitle>
              <CardDescription className="text-muted-foreground">Logs per hour (last 24 hours)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  info: {
                    label: "Info",
                    color: "hsl(var(--chart-1))",
                  },
                  warn: {
                    label: "Warning",
                    color: "hsl(var(--chart-3))",
                  },
                  error: {
                    label: "Error",
                    color: "hsl(var(--destructive))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={logVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="info" stackId="a" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="warn" stackId="a" fill="hsl(var(--chart-3))" />
                    <Bar dataKey="error" stackId="a" fill="hsl(var(--destructive))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* System Resources */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">System Resources</CardTitle>
              <CardDescription className="text-muted-foreground">Current resource utilization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">CPU Usage</span>
                  </div>
                  <span className="font-mono text-foreground">42.3%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-1" style={{ width: "42.3%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">Memory Usage</span>
                  </div>
                  <span className="font-mono text-foreground">68.7%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-2" style={{ width: "68.7%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">Disk Usage</span>
                  </div>
                  <span className="font-mono text-foreground">54.1%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-3" style={{ width: "54.1%" }} />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Active Connections</div>
                    <div className="text-2xl font-bold text-foreground">1,247</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Queue Size</div>
                    <div className="text-2xl font-bold text-foreground">23</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Alerts</CardTitle>
            <CardDescription className="text-muted-foreground">
              Latest system notifications and warnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                <AlertTriangle className="h-5 w-5 text-chart-3 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium text-foreground">High memory usage detected</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">2 min ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Memory usage exceeded 80% threshold on production-server-03
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium text-foreground">Deployment successful</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">15 min ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Version 2.4.1 deployed to production environment</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                <Activity className="h-5 w-5 text-chart-1 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium text-foreground">Traffic spike detected</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">1 hour ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Request volume increased by 45% in the last hour</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
