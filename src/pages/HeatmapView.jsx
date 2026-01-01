import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, MapPin, Menu, X } from 'lucide-react';
import GoogleMapComponent from '../components/GoogleMapComponent';
import { heatmapZones, riskLevels } from '../data/heatmapData';
import { currentLocation } from '../data/routesData';

function HeatmapView() {
  const navigate = useNavigate();
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const zones = heatmapZones[timeOfDay];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">

      <header className="bg-white shadow-sm z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold">Safety Heatmap</h1>
                <p className="text-xs text-gray-600">Community-powered risk zones</p>
              </div>
            </div>

            <div className="flex items-center gap-2">

              <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setTimeOfDay('day')}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                  timeOfDay === 'day' ? 'bg-white shadow-md text-warning' : 'text-gray-600'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-sm font-semibold">Day</span>
              </button>
              <button
                onClick={() => setTimeOfDay('night')}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                  timeOfDay === 'night' ? 'bg-white shadow-md text-primary' : 'text-gray-600'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="text-sm font-semibold">Night</span>
              </button>
              </div>


              <button
                onClick={() => setShowInfoPanel(!showInfoPanel)}
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                title="Risk Level Info"
              >
                {showInfoPanel ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>


          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-safe rounded-full"></div>
              <span className="text-gray-700">Safe</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-gray-700">Moderate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-danger rounded-full"></div>
              <span className="text-gray-700">High Risk</span>
            </div>
          </div>
        </div>
      </header>


      <div className="flex-1 relative">
        <GoogleMapComponent 
          currentLocation={currentLocation}
          heatmapZones={zones}
        />


        {showInfoPanel && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-xl p-4 space-y-3 animate-slideUp">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Risk Levels - {timeOfDay === 'day' ? 'Daytime' : 'Nighttime'}
              </h3>
              <button 
                onClick={() => setShowInfoPanel(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {Object.entries(riskLevels).map(([key, level]) => (
              <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5" 
                  style={{ backgroundColor: level.color }}
                ></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{level.label}</p>
                  <p className="text-xs text-gray-600">{level.description}</p>
                </div>
              </div>
            ))}

            <div className="pt-3 border-t">
              <p className="text-xs text-gray-600 italic">
                💡 <strong>Note:</strong> Safety is dynamic, not static. Risk levels change based on time, lighting, crowd density, and community reports.
              </p>
            </div>
          </div>
        )}
      </div>


      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 text-center">
        <p className="text-sm font-semibold">
          🌟 Powered by community reports & aggregated risk indicators
        </p>
      </div>
    </div>
  );
}

export default HeatmapView;
