import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Activity, Shield, Zap, Search, TrendingUp, Clock } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-mono text-xl font-semibold text-foreground">LogStream</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/logs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Logs
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#metrics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Metrics
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              The complete platform for distributed logs.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl text-pretty">
              Your team's toolkit to stop configuring and start innovating. Securely collect, monitor, and analyze logs
              from any source with real-time insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/logs">Explore Logs</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-mono">Live Stream</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2 bg-secondary rounded border-l-2 border-primary">
                    <span className="text-muted-foreground">[INFO]</span>{" "}
                    <span className="text-foreground">Request processed in 45ms</span>
                  </div>
                  <div className="p-2 bg-secondary rounded border-l-2 border-chart-2">
                    <span className="text-muted-foreground">[SUCCESS]</span>{" "}
                    <span className="text-foreground">Database connection established</span>
                  </div>
                  <div className="p-2 bg-secondary rounded border-l-2 border-chart-3">
                    <span className="text-muted-foreground">[WARN]</span>{" "}
                    <span className="text-foreground">High memory usage detected</span>
                  </div>
                  <div className="p-2 bg-secondary rounded border-l-2 border-primary">
                    <span className="text-muted-foreground">[INFO]</span>{" "}
                    <span className="text-foreground">Cache hit rate: 94.2%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="metrics" className="border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            <Card className="p-8 bg-card border-0 rounded-none">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">50%</div>
                <div className="text-sm text-muted-foreground">faster incident detection</div>
              </div>
            </Card>
            <Card className="p-8 bg-card border-0 rounded-none">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">15min</div>
                <div className="text-sm text-muted-foreground">MTTR reduced from 45 mins</div>
              </div>
            </Card>
            <Card className="p-8 bg-card border-0 rounded-none">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">30%</div>
                <div className="text-sm text-muted-foreground">fewer deployment errors</div>
              </div>
            </Card>
            <Card className="p-8 bg-card border-0 rounded-none">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">secure log transmission</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-sm text-primary">
              <Zap className="h-4 w-4" />
              <span className="font-medium">Real-Time Monitoring</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
              Faster detection. Better resolution.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              The platform for rapid incident response. Let your team focus on shipping features instead of managing
              infrastructure with automated log collection, built-in alerting, and integrated analysis.
            </p>
          </div>
          <div className="grid gap-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Advanced Search</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Query logs with powerful filters, regex patterns, and time-based searches. Find exactly what you
                    need in milliseconds.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">TLS Encryption</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    End-to-end encrypted log transmission with TLS 1.3. Your data stays secure from source to storage.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">ML-Based Anomaly Detection</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Automatically detect unusual patterns and potential issues before they become critical incidents.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Real-Time Streaming</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Watch logs flow in real-time with sub-second latency. Never miss a critical event.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">What's Next</h2>
              <p className="text-lg text-muted-foreground">Upcoming features and improvements</p>
            </div>
            <div className="space-y-4">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Search className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">ElasticSearch Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Add log search with ElasticSearch and OpenSearch support for advanced querying capabilities.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">Anomaly Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Implement ML-based error clustering to automatically identify and group similar issues.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">Multi-Tenant Dashboards</h3>
                    <p className="text-sm text-muted-foreground">
                      Support team-specific dashboards with custom views and permissions for better collaboration.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to transform your log monitoring?
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Join teams already using LogStream to detect incidents faster and resolve issues in minutes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard">Start Monitoring</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/logs">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <span className="font-mono text-sm text-muted-foreground">LogStream</span>
            </div>
            <p className="text-sm text-muted-foreground">Distributed log monitoring for modern teams</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
