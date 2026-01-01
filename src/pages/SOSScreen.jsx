import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, Shield, CheckCircle, AlertCircle, Hospital, Store, Navigation } from 'lucide-react';
import { safePlaces, emergencyNumbers, trustedContacts } from '../data/contactsData';

function SOSScreen() {
  const navigate = useNavigate();
  const [sosActivated, setSosActivated] = useState(false);

  const handleActivateSOS = () => {
    setSosActivated(true);

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-danger to-danger-light">

      <header className="bg-white bg-opacity-10 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-8 h-8" />
            Emergency SOS
          </h1>
          {!sosActivated && (
            <button 
              onClick={() => navigate(-1)} 
              className="text-white bg-white bg-opacity-20 px-4 py-2 rounded-lg font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </header>

      <div className="p-6 space-y-6">
        {!sosActivated ? (
          <>

            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
              <div className="w-32 h-32 bg-danger bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <AlertCircle className="w-20 h-20 text-danger" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Emergency Assistance
              </h2>
              <p className="text-gray-600 mb-8">
                Activating SOS will:
              </p>

              <div className="space-y-3 text-left mb-8">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-safe flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Share Your Location</p>
                    <p className="text-xs text-gray-600">Sent to all trusted contacts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-safe flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Send Route Information</p>
                    <p className="text-xs text-gray-600">Current and planned route details</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-safe flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Show Nearby Help</p>
                    <p className="text-xs text-gray-600">Police, hospitals, safe places</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleActivateSOS}
                className="w-full bg-danger text-white py-5 rounded-xl font-bold text-xl hover:bg-opacity-90 transition-all transform hover:scale-[1.02] shadow-xl"
              >
                🆘 ACTIVATE SOS
              </button>
            </div>


            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Call</h3>
              <div className="grid grid-cols-2 gap-3">
                {emergencyNumbers.map((emergency) => (
                  <a
                    key={emergency.number}
                    href={`tel:${emergency.number}`}
                    className="p-4 bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl text-center hover:opacity-90 transition-all"
                  >
                    <div className="text-3xl mb-2">{emergency.icon}</div>
                    <p className="text-sm font-semibold">{emergency.name}</p>
                    <p className="text-lg font-bold">{emergency.number}</p>
                  </a>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="w-24 h-24 bg-safe bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-16 h-16 text-safe" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                SOS Activated
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Your emergency alert has been sent
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-4 bg-safe bg-opacity-10 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-safe" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Location Shared</p>
                    <p className="text-sm text-gray-600">Sent to 3 trusted contacts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-safe bg-opacity-10 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-safe" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Route Info Shared</p>
                    <p className="text-sm text-gray-600">Current and planned route</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-safe bg-opacity-10 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-safe" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Continuous Tracking</p>
                    <p className="text-sm text-gray-600">Live updates every 30 seconds</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-bold text-gray-900 mb-3">Notified Contacts:</h4>
                <div className="space-y-2">
                  {trustedContacts.filter(c => c.isFavorite).map((contact) => (
                    <div key={contact.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{contact.avatar}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.phone}</p>
                      </div>
                      <a href={`tel:${contact.phone}`} className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark">
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-danger" />
                Nearby Safe Places
              </h3>
              <div className="space-y-3">
                {safePlaces.map((place) => (
                  <div key={place.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        place.type === 'police' ? 'bg-blue-100' :
                        place.type === 'hospital' ? 'bg-red-100' :
                        'bg-green-100'
                      }`}>
                        {place.type === 'police' && <Shield className="w-5 h-5 text-blue-600" />}
                        {place.type === 'hospital' && <Hospital className="w-5 h-5 text-red-600" />}
                        {place.type === 'store' && <Store className="w-5 h-5 text-green-600" />}
                        {place.type === 'cafe' && <Store className="w-5 h-5 text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{place.name}</p>
                        <p className="text-sm text-gray-600">{place.distance}</p>
                        {place.open24x7 && (
                          <span className="inline-block mt-1 text-xs bg-safe text-white px-2 py-1 rounded-full">
                            24x7 Open
                          </span>
                        )}
                      </div>
                      <button className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark">
                        <Navigation className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => navigate('/')}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SOSScreen;
