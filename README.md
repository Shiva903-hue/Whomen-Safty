# 🛡️ Women Safety Smart Navigation System

> **Hackathon Project - Track 1: Social Impact & Community Empowerment**

A safety-first navigation system designed specifically for women, prioritizing secure routes over fastest routes. Built with React, TailwindCSS, and Leaflet maps.

![Safety First](https://img.shields.io/badge/Safety-First-green)
![React](https://img.shields.io/badge/React-19.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-cyan)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 Problem Statement

Women often travel through unfamiliar or unsafe areas, especially at night. Existing navigation apps optimize for **time and distance**, not **personal safety**. There's no system that:

- ✅ Recommends routes based on risk & environment
- ✅ Automatically keeps trusted contacts informed
- ✅ Reacts intelligently during emergencies or deviations
- ✅ Improves over time via community-reported unsafe areas

---

## 💡 Our Solution

**SafeNav** is a smart navigation app that:

1. **Uses risk-based safety scoring** (not criminal records)
2. **Recommends Safest Route** using location intelligence
3. **Automatically shares live location** with trusted contacts
4. **Provides SOS & nearby safe places**
5. **Improves via community-reported unsafe areas**

### 🌟 Key Principle
> "We don't predict crime. We reduce risk."

---

## ✨ Core Features

### 1. 🗺️ Home / Map Screen
- Interactive map with current location
- **Safety Heatmap** visualization (Red/Yellow/Green zones)
- Destination search
- Three route options:
  - **Safest** (Recommended, highest safety score)
  - **Well-Lit** (Balanced option)
  - **Shortest** (Fastest but may have risks)

### 2. 📊 Safest Route Logic
Each route has a **Safety Score (0-10)** based on:
- 🔦 **Lighting** (25%) - Street light quality
- 👥 **Crowd Density** (20%) - People around
- 🌙 **Time of Day** (15%) - Day vs night impact
- 📍 **Area Risk** (20%) - Aggregated indicators
- 🗣️ **Community Reports** (20%) - User feedback

### 3. 👁️ Route Preview
- Detailed safety score breakdown
- Visual representation of factors
- List of avoided risky areas
- Transparency in decision-making

### 4. 🧭 Live Navigation + Auto Location Sharing
Once navigation starts:
- ✅ Live location **auto-shared** with 3 favorite contacts
- ✅ Contacts see real-time position
- ✅ **SOS button** always visible
- ✅ Active sharing indicator

### 5. ⚠️ Route Deviation Detection (SMART FEATURE)
When user moves away from safest route:
- Alert: *"You moved away from the safest route"*
- Options:
  - **I'm Safe** (dismiss)
  - **Notify Contacts** (auto-alert)
- Shows intelligence, not just tracking

### 6. 🆘 SOS / Emergency Screen
One-tap emergency response:
- ✅ Location sent to all contacts
- ✅ Route info shared
- ✅ **Nearby safe places**:
  - Police station
  - Hospital
  - 24x7 stores
- ✅ Quick call buttons for emergency numbers

### 7. 🌡️ Safety Heatmap View
- Color-coded risk zones:
  - 🟢 **Green** = Safer areas
  - 🟡 **Yellow** = Moderate risk
  - 🔴 **Red** = High risk
- **Day / Night toggle** - risk changes dynamically
- Shows why areas are risky (factors listed)

### 8. 📢 Report Unsafe Area
- **Community-powered** reporting
- Auto-detected location
- Reason selection:
  - Poor lighting
  - No crowd
  - Past incident
  - Suspicious activity
  - Harassment
- **100% anonymous** submission

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 19.2 + Vite |
| **Styling** | TailwindCSS |
| **Routing** | React Router DOM |
| **Maps** | Leaflet + React-Leaflet |
| **Icons** | Lucide React |
| **Data** | JSON (dummy data for prototype) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd women-safety-nav
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173/
   ```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
women-safety-nav/
├── src/
│   ├── components/
│   │   ├── MapComponent.jsx      # Interactive Leaflet map
│   │   └── RouteCard.jsx         # Route option cards
│   ├── pages/
│   │   ├── HomePage.jsx          # Main map & route selection
│   │   ├── RoutePreview.jsx      # Safety score breakdown
│   │   ├── Navigation.jsx        # Live navigation screen
│   │   ├── SOSScreen.jsx         # Emergency SOS
│   │   ├── HeatmapView.jsx       # Safety heatmap
│   │   └── ReportUnsafe.jsx      # Community reporting
│   ├── data/
│   │   ├── routesData.js         # Route & safety scores
│   │   ├── heatmapData.js        # Risk zones
│   │   ├── contactsData.js       # Trusted contacts & safe places
│   │   └── communityData.js      # Community reports
│   ├── App.jsx                   # Main app & routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── DEMO_GUIDE.md                 # Hackathon demo script
└── README.md                     # This file
```

---

## 🎤 For Hackathon Jury

### What Makes This Special?

1. **Safety-First, Not Speed-First**
   - Traditional apps: Fastest route
   - Our app: Safest route (even if longer)

2. **Intelligent, Not Just Tracking**
   - Deviation detection with user choice
   - Context-aware alerts

3. **Community-Powered**
   - Users report unsafe areas
   - System learns and improves
   - No surveillance, just intelligence

4. **Consent-Based Design**
   - Location sharing is opt-in
   - User controls who sees what
   - Privacy-first approach

5. **Ethical Data Usage**
   - No criminal records
   - No police databases
   - Aggregated, public risk indicators only

### Jury-Friendly Statements

> "Safety is dynamic, not static."

> "We prioritize safer routes, not just faster ones."

> "Technology should reduce risk, not increase anxiety."

> "This system empowers women instead of tracking them."

---

## 📊 Social Impact

| Impact Area | Description |
|------------|-------------|
| **Target Users** | 50%+ population (women travelers) |
| **Problem Solved** | Unsafe travel, especially at night |
| **Empowerment** | Community-driven safety intelligence |
| **Scalability** | Can be deployed in any city |
| **Privacy** | No surveillance, consent-based sharing |

---

## 🔮 Future Enhancements

- [ ] Real-time crowd density API integration
- [ ] Weather impact on safety scores
- [ ] Street lighting database integration
- [ ] Public transport safety ratings
- [ ] Voice-guided navigation
- [ ] Multi-language support
- [ ] Smartwatch SOS integration
- [ ] Offline mode with cached tiles

---

## 🛡️ Ethical Considerations

### What We DON'T Do:
❌ Access criminal records  
❌ Use police databases  
❌ Track users without consent  
❌ Guarantee 100% safety  

### What We DO:
✅ Use aggregated risk indicators  
✅ Respect user privacy  
✅ Provide transparent scoring  
✅ Empower through information  
✅ Build community trust  

---

## 📝 License

MIT License - feel free to use, modify, and distribute.

---

## 🤝 Contributing

This is a hackathon prototype. Contributions welcome for:
- Bug fixes
- Feature enhancements
- Documentation improvements
- Accessibility improvements

---

## 👥 Team

Built for **Hackathon 2026** - Track 1: Social Impact & Community Empowerment

---

## 📞 Contact & Support

For questions or demo requests, please reach out via:
- GitHub Issues
- Project Demo: See [DEMO_GUIDE.md](./DEMO_GUIDE.md)

---

## 🎯 Key Takeaway

> "This isn't just a navigation app. It's a movement towards safer, smarter, and more empowering technology for women everywhere."

---

**Made with ❤️ for a safer tomorrow** 🛡️

