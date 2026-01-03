import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation as NavIcon, Shield, AlertTriangle, Map, FileWarning, Phone, ChevronDown } from 'lucide-react';
import GoogleMapComponent from '../components/GoogleMapComponent';
import RouteCard from '../components/RouteCard';
import { currentLocation, destinations, routesByDestination } from '../data/routesData';

function HomePage({ setSelectedRoute, setSelectedDestination }) {
  const navigate = useNavigate();
  const [localDestination, setLocalDestination] = useState(null);
  const [showRoutes, setShowRoutes] = useState(false);
  const [activeRoute, setActiveRoute] = useState('safest');


  const currentRoutes = localDestination ? routesByDestination[localDestination.id] : null;
  

  const destinationObj = localDestination ? {
    lat: localDestination.lat,
    lng: localDestination.lng,
    name: localDestination.name,
  } : null;


  const allRoutes = (showRoutes && currentRoutes) ? [
    currentRoutes.safest,
    currentRoutes.moderate,
    currentRoutes.shortest,
  ] : [];

  const handleDestinationChange = (e) => {
    const destId = e.target.value;
    if (destId) {
      const dest = destinations.find(d => d.id === destId);
      setLocalDestination(dest);
      setSelectedDestination(dest);
      setShowRoutes(false);
      setActiveRoute('safest');
    } else {
      setLocalDestination(null);
      setSelectedDestination(null);
      setShowRoutes(false);
    }
  };

  const handleFindRoutes = () => {
    if (localDestination) {
      setShowRoutes(true);
    }
  };

  const handleRouteSelect = (routeId) => {
    setActiveRoute(routeId);
    if (currentRoutes) {
      setSelectedRoute(currentRoutes[routeId]);
    }
  };

  const handleStartNavigation = () => {
    if (activeRoute && currentRoutes) {
      setSelectedRoute(currentRoutes[activeRoute]);
      navigate('/route-preview');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">

      <header className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SafeNav</h1>
              <p className="text-xs text-gray-500">Women Safety Navigation</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/sos')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            SOS
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-4">

        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Plan Your Safe Journey</h2>
          <div className="grid md:grid-cols-2 gap-3">

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">From (Your Location)</p>
                <p className="font-medium text-gray-900">{currentLocation.name}</p>
              </div>
            </div>
            

            <div className="relative">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors">
                <MapPin className="w-4 h-4 text-red-500" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">To</p>
                  <select
                    value={localDestination?.id || ''}
                    onChange={handleDestinationChange}
                    className="w-full bg-transparent font-medium text-gray-900 outline-none cursor-pointer appearance-none"
                  >
                    <option value="">Select destination...</option>
                    {destinations.map((dest) => (
                      <option key={dest.id} value={dest.id}>
                        {dest.name}
                      </option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          <button 
            onClick={handleFindRoutes}
            disabled={!localDestination}
            className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              localDestination 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Shield className="w-5 h-5" />
            {showRoutes ? 'Routes Shown Below' : 'Find Safe Routes'}
          </button>
        </div>


        <div className="grid lg:grid-cols-3 gap-4">

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-3 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Map className="w-4 h-4 text-purple-600" />
                  Live Map - Nagpur
                </h3>
              </div>
              <div className="h-[400px] relative">
                <GoogleMapComponent 
                  key={localDestination?.id || 'default'}
                  currentLocation={currentLocation}
                  destination={showRoutes ? destinationObj : null}
                  selectedRoute={showRoutes && currentRoutes ? currentRoutes[activeRoute] : null}
                  allRoutes={allRoutes}
                />
              </div>
              <div className="p-3 bg-gray-50 border-t">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span> Safe
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Moderate
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span> Risky
                    </span>
                  </div>
                  <span className="text-gray-500">Zoom to explore</span>
                </div>
              </div>
            </div>
          </div>


          <div className="space-y-4">

            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigate('/heatmap')}
                  className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center"
                >
                  <Map className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Safety Map</p>
                </button>
                <button 
                  onClick={() => navigate('/report')}
                  className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-center"
                >
                  <FileWarning className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Report Area</p>
                </button>
                <button 
                  onClick={() => navigate('/sos')}
                  className="p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-center col-span-2"
                >
                  <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Emergency SOS</p>
                </button>
              </div>
            </div>


            <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl shadow-lg p-4 text-white">
              <h3 className="font-semibold mb-2">💡 Safety Tip</h3>
              <p className="text-sm opacity-90">
                Always share your live location with trusted contacts when traveling at night.
              </p>
            </div>


            {showRoutes && currentRoutes && activeRoute && (
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Selected Route</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-purple-600">{currentRoutes[activeRoute].name}</p>
                    <p className="text-sm text-gray-500">{currentRoutes[activeRoute].distance} • {currentRoutes[activeRoute].duration}</p>
                  </div>
                  <div className={`text-2xl font-bold ${
                    currentRoutes[activeRoute].safetyScore >= 8 ? 'text-green-500' :
                    currentRoutes[activeRoute].safetyScore >= 6 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {currentRoutes[activeRoute].safetyScore}/10
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


        {showRoutes && currentRoutes && (
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Available Routes</h2>
                <p className="text-sm text-gray-600">To {localDestination?.name} - Safety prioritized</p>
              </div>
              <button 
                onClick={handleStartNavigation}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center gap-2"
              >
                <NavIcon className="w-5 h-5" />
                Start Navigation
              </button>
            </div>


            <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Route Colors:</span>
              <span className="flex items-center gap-1">
                <span className="w-4 h-1 bg-green-500 rounded"></span>
                <span className="text-xs text-gray-600">Safest</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-4 h-1 bg-orange-500 rounded"></span>
                <span className="text-xs text-gray-600">Balanced</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-4 h-1 bg-red-500 rounded"></span>
                <span className="text-xs text-gray-600">Shortest</span>
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">

              <RouteCard 
                route={currentRoutes.safest}
                isActive={activeRoute === 'safest'}
                isRecommended={true}
                onClick={() => handleRouteSelect('safest')}
              />


              <RouteCard 
                route={currentRoutes.moderate}
                isActive={activeRoute === 'moderate'}
                onClick={() => handleRouteSelect('moderate')}
              />


              <div className="relative">
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Risk</span>
                  </div>
                </div>
                <RouteCard 
                  route={currentRoutes.shortest}
                  isActive={activeRoute === 'shortest'}
                  onClick={() => handleRouteSelect('shortest')}
                />
              </div>
            </div>


            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2">How Safety Score Works</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="font-bold text-blue-600">25%</p>
                  <p className="text-gray-600 text-xs">Lighting</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="font-bold text-blue-600">20%</p>
                  <p className="text-gray-600 text-xs">Crowd</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="font-bold text-blue-600">15%</p>
                  <p className="text-gray-600 text-xs">Time</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="font-bold text-blue-600">20%</p>
                  <p className="text-gray-600 text-xs">Area Risk</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="font-bold text-blue-600">20%</p>
                  <p className="text-gray-600 text-xs">Reports</p>
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="text-center py-4 text-sm text-gray-500">
          <p>🛡️ "We don't predict crime. We reduce risk."</p>
          <p className="mt-1">Powered by community safety data</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
