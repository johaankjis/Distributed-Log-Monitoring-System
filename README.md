# LogStream - Distributed Log Monitoring System

![LogStream](https://img.shields.io/badge/Next.js-14.2.16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=flat-square&logo=tailwind-css)

**The complete platform for distributed logs.** Your team's toolkit to stop configuring and start innovating. Securely collect, monitor, and analyze logs from any source with real-time insights.

## 🚀 Features

### Core Functionality
- **Real-Time Log Streaming** - Watch logs flow in real-time with sub-second latency
- **Advanced Search & Filtering** - Powerful log search with service and level filtering
- **Interactive Dashboard** - Visual analytics with real-time charts and metrics
- **Multi-Service Support** - Monitor logs from multiple services in one place
- **Smart Alerts** - Configurable alerting system for critical events

### Analytics & Monitoring
- **Live Metrics Dashboard** - Track request rates, response times, and error rates
- **Time-Series Visualization** - Beautiful charts using Recharts library
- **Log Volume Analysis** - Analyze log patterns by severity (INFO, WARN, ERROR)
- **System Performance Monitoring** - CPU, memory, and resource utilization tracking

### Security & Configuration
- **API Key Management** - Secure API key generation and rotation
- **TLS Encryption** - Secure log transmission with TLS support
- **Team Collaboration** - Role-based access control and team member management
- **Integration Support** - Connect with popular monitoring tools (Datadog, Splunk, etc.)

### User Experience
- **Modern UI** - Clean, responsive interface built with shadcn/ui components
- **Dark/Light Mode** - Theme support for comfortable viewing
- **Real-Time Updates** - Live data updates without page refreshes
- **Export Capabilities** - Download logs for offline analysis

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4.1.9](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - High-quality React components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library

### UI Component Libraries
- **Radix UI** - Unstyled, accessible component primitives
  - Dialog, Dropdown, Select, Tabs, Toast, and more
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Tailwind CSS Animate

### Development Tools
- **Font**: [Geist](https://vercel.com/font) - Sans and Mono fonts from Vercel
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) - Web analytics
- **Package Manager**: pnpm

## 📁 Project Structure

```
Distributed-Log-Monitoring-System/
├── app/                      # Next.js App Router pages
│   ├── dashboard/           # Dashboard page with metrics
│   │   └── page.tsx
│   ├── logs/                # Log viewer page
│   │   └── page.tsx
│   ├── settings/            # Settings & configuration page
│   │   └── page.tsx
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout
│   ├── loading.tsx          # Loading state
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   └── theme-provider.tsx   # Theme provider
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── public/                  # Static assets
├── styles/                  # Additional styles
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm/yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Distributed-Log-Monitoring-System.git
   cd Distributed-Log-Monitoring-System
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 📖 Usage

### Landing Page
The landing page (`/`) provides an overview of LogStream features, metrics, and upcoming roadmap items.

### Dashboard (`/dashboard`)
- View real-time system metrics
- Monitor request rates and response times
- Track error rates and uptime
- Visualize log volume by severity level
- Access system resource utilization

### Log Viewer (`/logs`)
- Stream logs in real-time
- Filter by service and log level
- Search through log messages
- View detailed log metadata
- Pause/resume live streaming
- Export logs for analysis

### Settings (`/settings`)
Configure your LogStream instance:
- **General Settings**: Project name, retention, timezone
- **Alerts**: Email/Slack notifications, error thresholds
- **Security**: TLS, API key rotation, IP whitelist
- **Integrations**: Connect with Datadog, Splunk, Grafana
- **Team Management**: Invite members, manage permissions

## 🔧 Configuration

### Python Agent Setup

Install the log forwarding agent on your servers:

```bash
pip install logstream-agent
```

Configure the client:

```python
import logstream

client = logstream.Client(
    api_key="your_api_key_here",
    host="logs.logstream.io",
    port=6514,
    tls=True
)

client.send_log(
    level="INFO",
    service="my-app",
    message="Application started"
)
```

### API Key Management

1. Navigate to Settings → Security
2. Copy your API key from the dashboard
3. Configure it in your application
4. Enable API key rotation for enhanced security

## 🗺️ Roadmap

### Upcoming Features

- **ElasticSearch Integration** - Advanced log search with ElasticSearch and OpenSearch support
- **Anomaly Detection** - ML-based error clustering to automatically identify similar issues
- **Multi-Tenant Dashboards** - Team-specific dashboards with custom views and permissions
- **Enhanced Alerting** - Advanced alert rules with custom conditions
- **Log Aggregation** - Better log grouping and pattern detection
- **Mobile App** - Monitor logs on the go with native mobile apps

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use existing UI components from shadcn/ui
- Maintain consistent code style
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is available for educational and demonstration purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- Fonts by [Vercel](https://vercel.com/font)

## 📞 Support

For questions, issues, or feature requests, please open an issue on GitHub.

---

**LogStream** - Distributed log monitoring for modern teams 🚀
