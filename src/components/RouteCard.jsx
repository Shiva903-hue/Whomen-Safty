import { Shield, Clock, Navigation, CheckCircle, AlertTriangle } from 'lucide-react';

function RouteCard({ route, isActive, isRecommended, onClick }) {
  const getSafetyColor = (score) => {
    if (score >= 8) return 'text-safe bg-safe-light';
    if (score >= 6) return 'text-warning bg-warning-light';
    return 'text-danger bg-danger-light';
  };

  const getSafetyLabel = (score) => {
    if (score >= 8) return 'Very Safe';
    if (score >= 6) return 'Moderate';
    return 'Risky';
  };

  return (
    <div 
      onClick={onClick}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all transform
        ${isActive ? 'bg-primary bg-opacity-10 border-2 border-primary shadow-lg scale-[1.02]' : 'bg-white border border-gray-200 hover:shadow-md'}
        ${isRecommended ? 'ring-2 ring-primary ring-opacity-50' : ''}
      `}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-4">
          <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
            <Shield className="w-3 h-3" />
            RECOMMENDED
          </span>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-bold text-lg ${isActive ? 'text-primary' : 'text-gray-900'}`}>
              {route.name}
            </h3>
            {isActive && <CheckCircle className="w-5 h-5 text-primary" />}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Navigation className="w-4 h-4" />
              <span>{route.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{route.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Safety Score:</span>
            <div className={`px-3 py-1 rounded-full font-bold text-sm ${getSafetyColor(route.safetyScore)}`}>
              {route.safetyScore}/10 - {getSafetyLabel(route.safetyScore)}
            </div>
          </div>

          {route.highlights && route.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {route.highlights.map((highlight, idx) => (
                <span key={idx} className="text-xs bg-safe-light text-safe px-2 py-1 rounded-full">
                  ✓ {highlight}
                </span>
              ))}
            </div>
          )}

          {route.avoidedRisks && route.avoidedRisks.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-600 font-medium mb-1">Avoided:</p>
              <div className="flex flex-wrap gap-1">
                {route.avoidedRisks.map((risk, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {risk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {route.warnings && route.warnings.length > 0 && (
            <div className="mt-2 flex items-start gap-2 p-2 bg-warning-light rounded-lg">
              <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-1">
                {route.warnings.map((warning, idx) => (
                  <span key={idx} className="text-xs text-warning font-medium">
                    {warning}{idx < route.warnings.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RouteCard;
