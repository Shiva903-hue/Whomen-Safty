import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Navigation, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { safetyFactors } from '../data/routesData';

function RoutePreview({ selectedRoute, setIsNavigating, setLocationSharing }) {
  const navigate = useNavigate();

  if (!selectedRoute) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>No route selected</p>
      </div>
    );
  }

  const handleStart = () => {
    setIsNavigating(true);
    setLocationSharing(true);
    navigate('/navigation');
  };

  const getSafetyColor = (score) => {
    if (score >= 8) return 'text-safe';
    if (score >= 6) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="p-4 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Route Preview</h1>
        </div>
      </header>

      <div className="p-6 space-y-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedRoute.name}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Navigation className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600">Distance</p>
              <p className="text-xl font-bold text-gray-900">{selectedRoute.distance}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600">Duration</p>
              <p className="text-xl font-bold text-gray-900">{selectedRoute.duration}</p>
            </div>
          </div>


          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-700">Safety Score</span>
              <div className={`text-3xl font-bold ${getSafetyColor(selectedRoute.safetyScore)}`}>
                {selectedRoute.safetyScore}/10
              </div>
            </div>
            

            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full ${
                  selectedRoute.safetyScore >= 8 ? 'bg-safe' : 
                  selectedRoute.safetyScore >= 6 ? 'bg-warning' : 'bg-danger'
                }`}
                style={{ width: `${selectedRoute.safetyScore * 10}%` }}
              ></div>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Safety Analysis
          </h3>
          
          <div className="space-y-3">
            {Object.entries(safetyFactors).map(([key, factor]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{factor.description}</p>
                  <p className="text-xs text-gray-600 mt-1">Weight: {(factor.weight * 100).toFixed(0)}%</p>
                </div>
                <CheckCircle className="w-5 h-5 text-safe" />
              </div>
            ))}
          </div>
        </div>


        {selectedRoute.highlights && selectedRoute.highlights.length > 0 && (
          <div className="bg-gradient-to-br from-safe to-safe-light text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Route Highlights
            </h3>
            <ul className="space-y-2">
              {selectedRoute.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}


        {selectedRoute.avoidedRisks && selectedRoute.avoidedRisks.length > 0 && (
          <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Avoided Risky Areas
            </h3>
            <ul className="space-y-2">
              {selectedRoute.avoidedRisks.map((risk, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        )}


        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Auto Location Sharing
              </p>
              <p className="text-xs text-blue-800">
                Your live location will be automatically shared with 3 trusted contacts when you start navigation.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-xl">
        <button 
          onClick={handleStart}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
        >
          <Navigation className="w-6 h-6" />
          Start Safe Navigation
        </button>
      </div>
    </div>
  );
}

export default RoutePreview;
