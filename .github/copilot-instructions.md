# SafeNav - Women Safety Navigation System

## Architecture Overview

React 19 + Vite SPA with client-side routing. Safety-focused navigation app that prioritizes route safety scores over travel time.

### Key Data Flow
```
routesData.js → HomePage (route selection) → RoutePreview (safety breakdown) → Navigation (live tracking)
heatmapData.js → HeatmapView (day/night risk visualization)
contactsData.js → SOSScreen + Navigation (emergency contacts & safe places)
```

### Core Components
- **Pages** (`src/pages/`): Full-screen views with their own routing
- **Components** (`src/components/`): Reusable UI - `GoogleMapComponent` handles all map rendering
- **Data** (`src/data/`): Static mock data simulating backend responses

## Safety Score System

Routes have a **Safety Score (0-10)** calculated from 5 weighted factors:
- Lighting (25%), Crowd Density (20%), Time of Day (15%), Area Risk (20%), Community Reports (20%)

Color conventions used consistently across UI:
- `#10B981` (green/`safe`) - Score ≥ 8
- `#F59E0B` (orange/`warning`) - Score 6-7.9  
- `#EF4444` (red/`danger`) - Score < 6

## Development

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
npm run lint     # ESLint check
```

## Code Patterns

### Route Data Structure
Each destination has 3 route variants in `routesByDestination`:
```javascript
{
  safest: { safetyScore: 9.2, path: [[lat, lng], ...], highlights: [], warnings: [], avoidedRisks: [] },
  moderate: { safetyScore: 7.5, ... },
  shortest: { safetyScore: 5.5, ... }
}
```

### Heatmap Zones
Day/night variations stored separately - risk levels change with time:
```javascript
heatmapZones.day[].riskLevel  // 'low' | 'medium' | 'high'
heatmapZones.night[].riskLevel // Same zone, different risk at night
```

### State Management
App-level state in `App.jsx` passed via props:
- `selectedRoute` - Currently chosen route object
- `isNavigating` / `locationSharing` - Navigation session state

### Custom Tailwind Colors
Use semantic color tokens defined in `tailwind.config.js`:
- `primary` / `primary-dark` - Brand purple (#8B5CF6)
- `safe` / `safe-light` - Safety green
- `warning` / `warning-light` - Caution orange
- `danger` / `danger-light` - Risk/SOS red

## Map Integration

Uses `@react-google-maps/api` with `GoogleMapComponent` as the single map wrapper. Key props:
- `currentLocation` - Blue marker (user position)
- `destination` - Red marker (target)
- `selectedRoute` / `allRoutes` - Polylines with safety-based colors
- `heatmapZones` - Circle overlays for risk visualization

**Note**: Google Maps API key is in `GoogleMapComponent.jsx` - replace for production.

## Adding New Features

- **New destination**: Add to `destinations` array + corresponding `routesByDestination` entry
- **New safe place type**: Extend `safePlaces` in `contactsData.js`, add icon in `SOSScreen.jsx`
- **New risk zone**: Add to both `day` and `night` arrays in `heatmapData.js`
