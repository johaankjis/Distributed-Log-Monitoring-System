"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Bell,
  Database,
  Key,
  Server,
  Shield,
  Users,
  Zap,
  Copy,
  Check,
  AlertCircle,
  Download,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [settings, setSettings] = useState({
    // General
    projectName: "Production Environment",
    retentionDays: "30",
    timezone: "UTC",

    // Alerts
    emailAlerts: true,
    slackAlerts: false,
    errorThreshold: "10",
    responseTimeThreshold: "500",

    // Security
    tlsEnabled: true,
    apiKeyRotation: true,
    ipWhitelist: "",

    // Performance
    batchSize: "100",
    compressionEnabled: true,
    samplingRate: "100",
  })

  const apiKey = "sk_live_1234567890abcdefghijklmnopqrstuvwxyz"

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    })
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
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                Dashboard
              </Link>
              <Link
                href="/logs"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                Logs
              </Link>
              <Link href="/settings" className="text-sm text-foreground font-medium px-3 py-2 rounded-md bg-secondary">
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Production
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your log monitoring configuration and preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="general" className="data-[state=active]:bg-background">
              <Server className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-background">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-background">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-background">
              <Zap className="h-4 w-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-background">
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Project Configuration</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Basic settings for your log monitoring project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName" className="text-foreground">
                    Project Name
                  </Label>
                  <Input
                    id="projectName"
                    value={settings.projectName}
                    onChange={(e) => setSettings({ ...settings, projectName: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retentionDays" className="text-foreground">
                    Log Retention Period
                  </Label>
                  <Select
                    value={settings.retentionDays}
                    onValueChange={(v) => setSettings({ ...settings, retentionDays: v })}
                  >
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">How long to keep logs before automatic deletion</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-foreground">
                    Timezone
                  </Label>
                  <Select value={settings.timezone} onValueChange={(v) => setSettings({ ...settings, timezone: v })}>
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Batch Processing</Label>
                      <p className="text-xs text-muted-foreground">Process logs in batches for better performance</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={settings.batchSize}
                        onChange={(e) => setSettings({ ...settings, batchSize: e.target.value })}
                        className="w-24 bg-background border-border text-foreground"
                      />
                      <span className="text-sm text-muted-foreground">logs/batch</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Compression</Label>
                      <p className="text-xs text-muted-foreground">Enable gzip compression for log transmission</p>
                    </div>
                    <Switch
                      checked={settings.compressionEnabled}
                      onCheckedChange={(v) => setSettings({ ...settings, compressionEnabled: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Sampling Rate</Label>
                      <p className="text-xs text-muted-foreground">Percentage of logs to collect (100% = all logs)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={settings.samplingRate}
                        onChange={(e) => setSettings({ ...settings, samplingRate: e.target.value })}
                        className="w-20 bg-background border-border text-foreground"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </TabsContent>

          {/* Alerts Settings */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Alert Channels</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch
                    checked={settings.emailAlerts}
                    onCheckedChange={(v) => setSettings({ ...settings, emailAlerts: v })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Slack Integration</Label>
                    <p className="text-xs text-muted-foreground">Send alerts to Slack channels</p>
                  </div>
                  <Switch
                    checked={settings.slackAlerts}
                    onCheckedChange={(v) => setSettings({ ...settings, slackAlerts: v })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Alert Thresholds</CardTitle>
                <CardDescription className="text-muted-foreground">Set thresholds for automatic alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="errorThreshold" className="text-foreground">
                    Error Rate Threshold
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="errorThreshold"
                      type="number"
                      value={settings.errorThreshold}
                      onChange={(e) => setSettings({ ...settings, errorThreshold: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">errors/min</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Alert when error rate exceeds this threshold</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responseTimeThreshold" className="text-foreground">
                    Response Time Threshold
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="responseTimeThreshold"
                      type="number"
                      value={settings.responseTimeThreshold}
                      onChange={(e) => setSettings({ ...settings, responseTimeThreshold: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                    <span className="text-sm text-muted-foreground">ms</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Alert when average response time exceeds this value</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">API Keys</CardTitle>
                <CardDescription className="text-muted-foreground">Manage API keys for log ingestion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Production API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      value={apiKey}
                      readOnly
                      className="font-mono text-sm bg-background border-border text-foreground"
                    />
                    <Button variant="outline" size="icon" onClick={handleCopyApiKey}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Use this key to authenticate log submissions</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Automatic Key Rotation</Label>
                    <p className="text-xs text-muted-foreground">Rotate API keys every 90 days</p>
                  </div>
                  <Switch
                    checked={settings.apiKeyRotation}
                    onCheckedChange={(v) => setSettings({ ...settings, apiKeyRotation: v })}
                  />
                </div>

                <div className="pt-4">
                  <Button variant="outline" size="sm">
                    <Key className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Transport Security</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Configure encryption and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label className="text-foreground">TLS Encryption</Label>
                      <Badge variant="outline" className="text-xs border-chart-2 text-chart-2">
                        Enabled
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">All log data is encrypted with TLS 1.3</p>
                  </div>
                  <Switch
                    checked={settings.tlsEnabled}
                    onCheckedChange={(v) => setSettings({ ...settings, tlsEnabled: v })}
                  />
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <Label htmlFor="ipWhitelist" className="text-foreground">
                    IP Whitelist
                  </Label>
                  <Textarea
                    id="ipWhitelist"
                    placeholder="Enter IP addresses (one per line)&#10;192.168.1.1&#10;10.0.0.0/8"
                    value={settings.ipWhitelist}
                    onChange={(e) => setSettings({ ...settings, ipWhitelist: e.target.value })}
                    className="font-mono text-sm bg-background border-border text-foreground min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Only accept logs from these IP addresses (leave empty to allow all)
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Available Integrations</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Connect LogStream with your existing tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">ElasticSearch</div>
                      <div className="text-sm text-muted-foreground">Advanced log search and analytics</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                    Coming Soon
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Slack</div>
                      <div className="text-sm text-muted-foreground">Real-time alerts in Slack channels</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">PagerDuty</div>
                      <div className="text-sm text-muted-foreground">Incident management and on-call alerts</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Datadog</div>
                      <div className="text-sm text-muted-foreground">
                        Forward logs to Datadog for unified monitoring
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Python Agent Setup</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Install the log forwarding agent on your servers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Installation Command</Label>
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <pre className="text-sm font-mono text-foreground overflow-x-auto">pip install logstream-agent</pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Configuration Example</Label>
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <pre className="text-xs font-mono text-foreground overflow-x-auto">
                      {`import logstream

client = logstream.Client(
    api_key="${apiKey}",
    host="logs.logstream.io",
    port=6514,
    tls=True
)

client.send_log(
    level="INFO",
    service="my-app",
    message="Application started"
)`}
                    </pre>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Agent
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Settings */}
          <TabsContent value="team" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Team Members</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage access and permissions for your team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">JD</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">john@example.com</div>
                      <div className="text-sm text-muted-foreground">Owner</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary">
                    Admin
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">SM</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">sarah@example.com</div>
                      <div className="text-sm text-muted-foreground">Developer</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-border text-foreground">
                    Member
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">MK</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">mike@example.com</div>
                      <div className="text-sm text-muted-foreground">DevOps Engineer</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-border text-foreground">
                    Member
                  </Badge>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Invite Team Member
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Access Control</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Configure role-based access permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                    <AlertCircle className="h-5 w-5 text-chart-3 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground mb-1">Multi-tenant dashboards coming soon</div>
                      <p className="text-sm text-muted-foreground">
                        Team-specific dashboards with custom views and permissions will be available in the next
                        release.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
