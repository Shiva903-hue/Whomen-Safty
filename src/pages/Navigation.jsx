import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation as NavIcon, Phone, Shield, Users, AlertTriangle, X, MapPin } from 'lucide-react';
import GoogleMapComponent from '../components/GoogleMapComponent';
import { trustedContacts } from '../data/contactsData';
import { currentLocation, destination } from '../data/routesData';

function Navigation({ selectedRoute, isNavigating, locationSharing }) {
  const navigate = useNavigate();
  const [showDeviation, setShowDeviation] = useState(false);
  const [showSharingPanel, setShowSharingPanel] = useState(false);
  const [showRoutePanel, setShowRoutePanel] = useState(false);
  
  const [contacts] = useState(() => 
    trustedContacts.map(c => ({ ...c, sharingActive: locationSharing }))
  );

  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        setShowDeviation(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  const handleDeviationResponse = (safe) => {
    if (!safe) {
      alert('Contacts have been notified of your deviation!');
    }
    setShowDeviation(false);
  };

  if (!selectedRoute) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>No active navigation</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full w-full">
        <GoogleMapComponent 
          currentLocation={currentLocation}
          destination={destination}
          selectedRoute={selectedRoute}
        />
      </div>

      <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-40 flex items-start justify-between">
        <div className="relative">
          <button
            onClick={() => setShowRoutePanel(!showRoutePanel)}
            className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-safe to-emerald-600 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
            title="Route Info"
          >
            <NavIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-white text-safe text-xs font-bold rounded-full flex items-center justify-center shadow border-2 border-safe">
              {selectedRoute.safetyScore}
            </span>
          </button>

          {showRoutePanel && (
            <div className="absolute top-0 left-14 sm:left-16 w-56 sm:w-64 bg-gradient-to-br from-safe to-emerald-600 text-white rounded-xl shadow-2xl p-3 sm:p-4 animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <NavIcon className="w-4 h-4" />
                  <span className="font-semibold text-sm">{selectedRoute.name}</span>
                </div>
                <button 
                  onClick={() => setShowRoutePanel(false)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-2">
                  <span className="opacity-90">Distance</span>
                  <span className="font-semibold">{selectedRoute.distance}</span>
                </div>
                <div className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-2">
                  <span className="opacity-90">Duration</span>
                  <span className="font-semibold">{selectedRoute.duration}</span>
                </div>
                <div className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-2">
                  <span className="opacity-90">Safety Score</span>
                  <span className="font-bold text-lg">{selectedRoute.safetyScore}/10</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => navigate('/')} 
          className="bg-danger text-white font-bold text-xs sm:text-sm px-4 py-2.5 sm:px-5 sm:py-3 rounded-full hover:bg-danger-light transition-all shadow-xl hover:scale-105"
        >
          End
        </button>
      </div>

      {locationSharing && (
        <div className="absolute top-20 sm:top-24 left-3 sm:left-4 z-40">
          <button
            onClick={() => setShowSharingPanel(!showSharingPanel)}
            className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
            title="Location Sharing Active"
          >
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-safe rounded-full border-2 border-white animate-pulse"></span>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-primary text-xs font-bold rounded-full flex items-center justify-center shadow">
              {contacts.filter(c => c.isFavorite).length}
            </span>
          </button>

          {showSharingPanel && (
            <div className="absolute top-0 left-14 sm:left-16 w-56 sm:w-64 bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl shadow-2xl p-3 sm:p-4 animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-semibold text-sm">Location Sharing</span>
                </div>
                <button 
                  onClick={() => setShowSharingPanel(false)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {contacts.filter(c => c.isFavorite).map((contact) => (
                  <div key={contact.id} className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg p-2">
                    <span className="text-xl">{contact.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold truncate">{contact.name}</p>
                      <p className="text-xs opacity-80 truncate">{contact.phone}</p>
                    </div>
                    <div className="w-2 h-2 bg-safe rounded-full animate-pulse flex-shrink-0"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showDeviation && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-warning bg-opacity-20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-warning" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
              Route Deviation Detected!
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              You've moved away from the safest route. Are you safe?
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => handleDeviationResponse(true)}
                className="w-full bg-safe text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all"
              >
                ✓ I'm Safe
              </button>
              <button 
                onClick={() => handleDeviationResponse(false)}
                className="w-full bg-danger text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Notify Contacts
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute right-3 sm:right-4 bottom-20 sm:bottom-24 z-30 space-y-3">
        <button 
          onClick={() => navigate('/sos')}
          className="p-3 sm:p-4 bg-danger text-white rounded-full shadow-xl hover:bg-opacity-90 transition-all transform hover:scale-110"
          title="Emergency SOS"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <button 
        onClick={() => navigate('/sos')}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-danger text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-2xl hover:bg-danger-light transition-all transform hover:scale-105 font-bold text-sm sm:text-lg"
      >
        🆘 SOS Emergency
      </button>
    </div>
  );
}

export default Navigation;
