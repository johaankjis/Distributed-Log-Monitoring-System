"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  Search,
  Filter,
  Download,
  Play,
  Pause,
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react"

type LogLevel = "INFO" | "WARN" | "ERROR" | "SUCCESS" | "DEBUG"

interface LogEntry {
  id: string
  timestamp: Date
  level: LogLevel
  service: string
  message: string
  metadata?: Record<string, any>
}

// Generate realistic log entries
function generateLogEntry(id: number): LogEntry {
  const levels: LogLevel[] = ["INFO", "WARN", "ERROR", "SUCCESS", "DEBUG"]
  const services = ["api-gateway", "auth-service", "database", "cache", "worker"]
  const messages = [
    "Request processed successfully",
    "Database connection established",
    "Cache hit for key: user_session_",
    "Authentication token validated",
    "High memory usage detected",
    "Rate limit exceeded for IP",
    "Failed to connect to external API",
    "Deployment completed successfully",
    "Background job started",
    "Query executed in 45ms",
    "WebSocket connection opened",
    "File uploaded to storage",
    "Email notification sent",
    "Payment processed successfully",
    "User session expired",
  ]

  const level = levels[Math.floor(Math.random() * levels.length)]
  const service = services[Math.floor(Math.random() * services.length)]
  const message = messages[Math.floor(Math.random() * messages.length)]

  return {
    id: `log-${id}`,
    timestamp: new Date(Date.now() - Math.random() * 3600000),
    level,
    service,
    message: `${message}${Math.random() > 0.7 ? ` ${Math.random().toString(36).substring(7)}` : ""}`,
    metadata:
      Math.random() > 0.5
        ? {
            requestId: Math.random().toString(36).substring(7),
            userId: Math.floor(Math.random() * 10000),
            duration: Math.floor(Math.random() * 500),
          }
        : undefined,
  }
}

function getLevelIcon(level: LogLevel) {
  switch (level) {
    case "INFO":
      return <Info className="h-4 w-4" />
    case "WARN":
      return <AlertTriangle className="h-4 w-4" />
    case "ERROR":
      return <XCircle className="h-4 w-4" />
    case "SUCCESS":
      return <CheckCircle2 className="h-4 w-4" />
    case "DEBUG":
      return <AlertCircle className="h-4 w-4" />
  }
}

function getLevelColor(level: LogLevel) {
  switch (level) {
    case "INFO":
      return "text-chart-1 bg-chart-1/10 border-chart-1/20"
    case "WARN":
      return "text-chart-3 bg-chart-3/10 border-chart-3/20"
    case "ERROR":
      return "text-destructive bg-destructive/10 border-destructive/20"
    case "SUCCESS":
      return "text-chart-2 bg-chart-2/10 border-chart-2/20"
    case "DEBUG":
      return "text-muted-foreground bg-muted border-border"
  }
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>(() => Array.from({ length: 50 }, (_, i) => generateLogEntry(i)))
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>(logs)
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [serviceFilter, setServiceFilter] = useState<string>("all")
  const [isLive, setIsLive] = useState(true)
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)

  // Simulate real-time log streaming
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const newLog = generateLogEntry(Date.now())
      setLogs((prev) => [newLog, ...prev.slice(0, 199)])
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  // Filter logs based on search and filters
  useEffect(() => {
    let filtered = logs

    if (searchQuery) {
      filtered = filtered.filter(
        (log) =>
          log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.service.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (levelFilter !== "all") {
      filtered = filtered.filter((log) => log.level === levelFilter)
    }

    if (serviceFilter !== "all") {
      filtered = filtered.filter((log) => log.service === serviceFilter)
    }

    setFilteredLogs(filtered)
  }, [logs, searchQuery, levelFilter, serviceFilter])

  const services = Array.from(new Set(logs.map((log) => log.service)))
  const levelCounts = logs.reduce(
    (acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1
      return acc
    },
    {} as Record<LogLevel, number>,
  )

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
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                Dashboard
              </Link>
              <Link href="/logs" className="text-sm text-foreground font-medium px-3 py-2 rounded-md bg-secondary">
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
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              Production
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Logs</h1>
          <p className="text-muted-foreground">Real-time log streaming and search</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="p-4 bg-card border-border">
            <div className="text-sm text-muted-foreground mb-1">Total</div>
            <div className="text-2xl font-bold text-foreground">{logs.length}</div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="text-sm text-muted-foreground mb-1">Info</div>
            <div className="text-2xl font-bold text-chart-1">{levelCounts.INFO || 0}</div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="text-sm text-muted-foreground mb-1">Warnings</div>
            <div className="text-2xl font-bold text-chart-3">{levelCounts.WARN || 0}</div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="text-sm text-muted-foreground mb-1">Errors</div>
            <div className="text-2xl font-bold text-destructive">{levelCounts.ERROR || 0}</div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="text-sm text-muted-foreground mb-1">Success</div>
            <div className="text-2xl font-bold text-chart-2">{levelCounts.SUCCESS || 0}</div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 bg-card border-border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs by message or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div>
            <div className="flex gap-2">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[140px] bg-background border-border text-foreground">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="INFO">Info</SelectItem>
                  <SelectItem value="WARN">Warning</SelectItem>
                  <SelectItem value="ERROR">Error</SelectItem>
                  <SelectItem value="SUCCESS">Success</SelectItem>
                  <SelectItem value="DEBUG">Debug</SelectItem>
                </SelectContent>
              </Select>

              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-[160px] bg-background border-border text-foreground">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={isLive ? "default" : "outline"}
                size="icon"
                onClick={() => setIsLive(!isLive)}
                title={isLive ? "Pause streaming" : "Resume streaming"}
              >
                {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {(searchQuery || levelFilter !== "all" || serviceFilter !== "all") && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Showing {filteredLogs.length} of {logs.length} logs
              </span>
              {(searchQuery || levelFilter !== "all" || serviceFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setLevelFilter("all")
                    setServiceFilter("all")
                  }}
                  className="h-6 px-2 text-xs"
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </Card>

        {/* Logs List */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-2">
            {filteredLogs.length === 0 ? (
              <Card className="p-12 bg-card border-border text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No logs found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </Card>
            ) : (
              filteredLogs.map((log) => (
                <Card
                  key={log.id}
                  className={`p-4 bg-card border-border cursor-pointer transition-colors hover:bg-secondary ${
                    selectedLog?.id === log.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedLog(log)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded ${getLevelColor(log.level)}`}>{getLevelIcon(log.level)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className="font-mono text-xs border-border text-foreground">
                          {log.service}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">
                          {log.timestamp.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground font-mono break-words">{log.message}</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Log Details Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card border-border sticky top-24">
              {selectedLog ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Log Details</h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Level</div>
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded ${getLevelColor(selectedLog.level)}`}>
                          {getLevelIcon(selectedLog.level)}
                        </div>
                        <span className="text-sm font-medium text-foreground">{selectedLog.level}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Service</div>
                      <Badge variant="outline" className="font-mono border-border text-foreground">
                        {selectedLog.service}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Timestamp</div>
                      <div className="text-sm font-mono text-foreground">
                        {selectedLog.timestamp.toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Message</div>
                      <div className="text-sm font-mono text-foreground break-words bg-secondary p-3 rounded">
                        {selectedLog.message}
                      </div>
                    </div>

                    {selectedLog.metadata && (
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">Metadata</div>
                        <div className="bg-secondary p-3 rounded">
                          <pre className="text-xs font-mono text-foreground overflow-x-auto">
                            {JSON.stringify(selectedLog.metadata, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Log ID</div>
                      <div className="text-xs font-mono text-muted-foreground">{selectedLog.id}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Log
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-sm font-medium text-foreground mb-2">No log selected</h3>
                  <p className="text-xs text-muted-foreground">Click on a log entry to view details</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
