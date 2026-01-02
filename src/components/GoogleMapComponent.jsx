import { GoogleMap, LoadScript, Marker, Polyline, Circle, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 21.1458,
  lng: 79.0882,
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};

function GoogleMapComponent({ currentLocation, destination, selectedRoute, heatmapZones, allRoutes = [] }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const destinationKey = destination ? `${destination.lat}-${destination.lng}` : 'none';

  const center = currentLocation 
    ? { lat: currentLocation.lat, lng: currentLocation.lng } 
    : defaultCenter;

  const getRouteColor = (safetyScore) => {
    if (safetyScore >= 8) return '#10B981';
    if (safetyScore >= 6) return '#F59E0B';
    return '#EF4444';
  };

  const getPathCoordinates = (path) => {
    if (!path) return [];
    return path.map(coord => ({ lat: coord[0], lng: coord[1] }));
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={['places']}>
      <GoogleMap
        key={destinationKey}
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        options={mapOptions}
      >
        {heatmapZones && heatmapZones.map((zone) => (
          <Circle
            key={zone.id}
            center={{ lat: zone.center[0], lng: zone.center[1] }}
            radius={zone.radius}
            options={{
              fillColor: zone.color,
              fillOpacity: zone.opacity,
              strokeColor: zone.color,
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
            onClick={() => setSelectedMarker(zone)}
          />
        ))}

        {selectedMarker && selectedMarker.factors && (
          <InfoWindow
            position={{ lat: selectedMarker.center[0], lng: selectedMarker.center[1] }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2">
              <p className="font-bold text-sm">{selectedMarker.riskLevel.toUpperCase()} RISK</p>
              <ul className="mt-1 text-xs">
                {selectedMarker.factors.map((factor, idx) => (
                  <li key={idx}>• {factor}</li>
                ))}
              </ul>
            </div>
          </InfoWindow>
        )}

        {currentLocation && (
          <Marker
            position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: { width: 40, height: 40 },
            }}
            title="Current Location"
            onClick={() => setSelectedMarker({ 
              type: 'current', 
              position: currentLocation,
              name: currentLocation.name 
            })}
          />
        )}

        {selectedMarker && selectedMarker.type === 'current' && (
          <InfoWindow
            position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2">
              <p className="font-bold text-sm">📍 Current Location</p>
              <p className="text-xs">{currentLocation.name}</p>
            </div>
          </InfoWindow>
        )}

        {destination && (
          <Marker
            position={{ lat: destination.lat, lng: destination.lng }}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: { width: 40, height: 40 },
            }}
            title="Destination"
            onClick={() => setSelectedMarker({ 
              type: 'destination', 
              position: destination,
              name: destination.name 
            })}
          />
        )}

        {selectedMarker && selectedMarker.type === 'destination' && (
          <InfoWindow
            position={{ lat: destination.lat, lng: destination.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2">
              <p className="font-bold text-sm">🎯 Destination</p>
              <p className="text-xs">{destination.name}</p>
            </div>
          </InfoWindow>
        )}

        {allRoutes && allRoutes.length > 0 && allRoutes.map((route, index) => (
          <Polyline
            key={`${destinationKey}-${route.id}-${index}`}
            path={getPathCoordinates(route.path)}
            options={{
              strokeColor: route.color || getRouteColor(route.safetyScore),
              strokeOpacity: selectedRoute?.id === route.id ? 1 : 0.5,
              strokeWeight: selectedRoute?.id === route.id ? 7 : 4,
              zIndex: selectedRoute?.id === route.id ? 10 : 1,
            }}
          />
        ))}

        {selectedRoute && selectedRoute.path && (!allRoutes || allRoutes.length === 0) && (
          <Polyline
            path={getPathCoordinates(selectedRoute.path)}
            options={{
              strokeColor: selectedRoute.color || getRouteColor(selectedRoute.safetyScore),
              strokeOpacity: 0.9,
              strokeWeight: 6,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapComponent;
