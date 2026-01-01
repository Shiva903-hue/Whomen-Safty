import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle, Send } from 'lucide-react';
import { reportReasons } from '../data/communityData';

function ReportUnsafe() {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [location] = useState('Current Location (Auto-detected)');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedReason) {
      setSubmitted(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-safe bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-safe" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Report Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for contributing to community safety. Your anonymous report helps others stay safe.
          </p>
          <div className="text-sm text-gray-600 space-y-2">
            <p>✓ Report will be verified</p>
            <p>✓ Area marked for review</p>
            <p>✓ Community notified</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="p-4 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Report Unsafe Area</h1>
            <p className="text-xs text-gray-600">Help keep the community safe</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-2xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <label className="block font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Location
          </label>
          <div className="p-4 bg-purple-100 rounded-lg border border-purple-300">
            <p className="text-sm font-medium text-gray-900">{location}</p>
            <p className="text-xs text-gray-600 mt-1">Coordinates: 21.1458, 79.0882 (Nagpur)</p>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            📍 Location auto-detected. You can adjust on the map if needed.
          </p>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-6">
          <label className="block font-semibold text-gray-900 mb-4">
            What makes this area unsafe?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {reportReasons.map((reason) => (
              <button
                key={reason.value}
                type="button"
                onClick={() => setSelectedReason(reason.value)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedReason === reason.value
                    ? 'border-primary bg-primary bg-opacity-10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{reason.icon}</div>
                <p className="text-sm font-semibold text-gray-900">{reason.label}</p>
              </button>
            ))}
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-6">
          <label className="block font-semibold text-gray-900 mb-3">
            Additional Details (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share more details about what makes this area unsafe..."
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
            rows="4"
          />
          <p className="text-xs text-gray-600 mt-2">
            Your report is <strong>100% anonymous</strong>
          </p>
        </div>


        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 text-sm mb-2">Why report?</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Helps other women avoid risky areas</li>
            <li>• Improves route safety recommendations</li>
            <li>• Community-driven safety intelligence</li>
            <li>• Completely anonymous submission</li>
          </ul>
        </div>


        <button
          type="submit"
          disabled={!selectedReason}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
            selectedReason
              ? 'bg-primary text-white hover:bg-primary-dark transform hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-6 h-6" />
          Submit Anonymous Report
        </button>

        <p className="text-center text-xs text-gray-600">
          Your report will be reviewed and verified before affecting route recommendations
        </p>
      </form>
    </div>
  );
}

export default ReportUnsafe;
