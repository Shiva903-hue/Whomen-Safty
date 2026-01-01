import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import RoutePreview from './pages/RoutePreview';
import Navigation from './pages/Navigation';
import SOSScreen from './pages/SOSScreen';
import HeatmapView from './pages/HeatmapView';
import ReportUnsafe from './pages/ReportUnsafe';
import './App.css';

function App() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                setSelectedRoute={setSelectedRoute}
              />
            } 
          />
          <Route 
            path="/route-preview" 
            element={
              <RoutePreview 
                selectedRoute={selectedRoute}
                setIsNavigating={setIsNavigating}
                setLocationSharing={setLocationSharing}
              />
            } 
          />
          <Route 
            path="/navigation" 
            element={
              <Navigation 
                selectedRoute={selectedRoute}
                isNavigating={isNavigating}
                locationSharing={locationSharing}
              />
            } 
          />
          <Route path="/sos" element={<SOSScreen />} />
          <Route path="/heatmap" element={<HeatmapView />} />
          <Route path="/report" element={<ReportUnsafe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

