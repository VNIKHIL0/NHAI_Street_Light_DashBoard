# NHAI Smart Lighting Management System 🌟

> **Centralized Automation & Monitoring Dashboard for National Highway Street Lighting**

A modern, real-time dashboard for monitoring and controlling street lighting infrastructure across National Highways. Built for the NHAI Innovation Hackathon 2026.

![Dashboard Preview](https://img.shields.io/badge/Status-Demo%20Ready-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-Next.js%20%7C%20TypeScript%20%7C%20Tailwind-blue)

---

## 🎯 Problem Statement

Street lighting on National Highways currently operates through manual or semi-automatic systems, leading to:
- ❌ Limited real-time monitoring
- ❌ Delayed fault detection
- ❌ Inefficient energy usage
- ❌ Slower maintenance response

**Our Solution**: A centralized, intelligent dashboard that automates monitoring, control, and maintenance of highway lighting systems.

---

## ✨ Key Features

### 📊 **Real-Time Dashboard**
- Live statistics on total lights, active units, and fault detection
- Energy consumption tracking (MWh)
- Carbon footprint reduction metrics

### 🗺️ **Interactive Map Visualization**
- Geographic visualization of all light poles along National Highways
- Color-coded status indicators:
  - 🟢 **Green**: Active/Operational
  - 🔴 **Red**: Faulty/Offline
  - 🟠 **Orange**: Under Maintenance
- Click markers for detailed light information

### 🎛️ **Control Center**
- **Zone-wise Controls**: Turn lights on/off and adjust brightness by highway zones
- **Automation Scheduler**: Pre-configured time-based lighting profiles
- Real-time power consumption monitoring per zone

### 🚨 **Alerts & Maintenance**
- Automated fault detection log with severity levels
- One-click maintenance ticket generation
- Technician assignment workflow

### 🌱 **Environmental Impact Tracking**
- CO₂ emissions saved (tons)
- Equivalent trees planted calculation
- Energy efficiency analytics

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Maps** | React-Leaflet (OpenStreetMap) |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Theme** | next-themes (Dark Mode) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
cd nhai-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
nhai-dashboard/
├── app/
│   ├── page.tsx              # Dashboard Home
│   ├── controls/page.tsx     # Control Center
│   ├── alerts/page.tsx       # Alerts & Maintenance
│   └── layout.tsx            # Root Layout
├── components/
│   ├── dashboard/            # Stats, Charts, Widgets
│   ├── map/                  # Map Components
│   ├── controls/             # Zone Controls, Scheduler
│   ├── alerts/               # Fault Log, Tickets
│   ├── layout/               # Sidebar, Header
│   └── ui/                   # shadcn Components
└── lib/
    └── utils.ts              # Utilities
```

---

## 🏆 Hackathon Deliverables

### ✅ 1. Innovative Technology Solution
- **Real-time monitoring** dashboard with live data visualization
- **Automated scheduling** for energy optimization
- **Intelligent fault detection** with maintenance workflows

### ✅ 2. Feasibility Assessment
- **Technical**: Built on proven, scalable web technologies (Next.js, React)
- **Financial**: Cost-effective frontend solution; backend integration via REST APIs
- **Operational**: Intuitive UI requiring minimal training

### ✅ 3. Comparative Evaluation
| Feature | Manual System | Our Solution |
|---------|---------------|--------------|
| Fault Detection | Hours/Days | Real-time |
| Energy Monitoring | Monthly Reports | Live Dashboard |
| Control Granularity | Zone-level (manual) | Individual light control |
| Maintenance Response | Reactive | Proactive (automated tickets) |

### ✅ 4. Implementation Model
- **Phase 1**: Pilot deployment at 2-3 toll plazas
- **Phase 2**: Expand to full highway corridors (NH-44, NH-48)
- **Phase 3**: Nationwide rollout with IoT sensor integration

### ✅ 5. Pilot Deployment Framework
- Deploy at **selected toll plazas** with existing network infrastructure
- Integrate with IoT sensors (light intensity, power consumption, fault detection)
- 3-month pilot period with performance metrics collection

### ✅ 6. Environmental Benefits
- **Estimated CO₂ Reduction**: 24.5 tons/month (based on 12% energy savings)
- **Carbon Credits Potential**: ~2 credits/month (1 credit = 1 ton CO₂)
- **Equivalent Impact**: Planting 1,200 trees monthly

---

## 🎨 Design Philosophy

- **Dark Mode First**: Optimized for 24/7 monitoring environments
- **Futuristic Aesthetic**: Vibrant cyan/green accents for high-tech feel
- **Responsive**: Desktop-optimized (dashboard use case)
- **Accessible**: High contrast, clear typography

---

## 📊 Mock Data

Currently uses simulated data for demonstration:
- 50 light poles along NH-44 (Delhi region)
- Random fault generation (10% failure rate)
- Hourly energy consumption patterns

**Production Integration**: Replace with REST API calls to IoT backend.

---

## 🔮 Future Enhancements

- [ ] Mobile app for field technicians
- [ ] AI-powered predictive maintenance
- [ ] Weather-based auto-dimming
- [ ] Integration with traffic density sensors
- [ ] Multi-language support (Hindi, regional languages)

---

## 👥 Team

Developed for **NHAI Innovation Hackathon 2026**

---

## 📄 License

This project is a hackathon submission for NHAI. All rights reserved.

---

## 📞 Contact

For queries regarding this submission:
- **Email**: [Your Email]
- **GitHub**: [Your GitHub Profile]

---

**Built with ❤️ for safer, smarter National Highways**
