export const communityReports = [
  {
    id: 1,
    location: [21.1475, 79.0905],
    locationName: 'Dharampeth Garden Corner',
    reason: 'poor_lighting',
    description: 'Very dark at night, no street lights',
    timestamp: '2 days ago',
    verified: true,
    reportCount: 5,
  },
  {
    id: 2,
    location: [21.1495, 79.0910],
    locationName: 'Construction Site Area',
    reason: 'isolated',
    description: 'Isolated construction area, no crowd',
    timestamp: '1 week ago',
    verified: true,
    reportCount: 8,
  },
  {
    id: 3,
    location: [21.1480, 79.0900],
    locationName: 'Market Back Alley',
    reason: 'incident',
    description: 'Uncomfortable experience reported',
    timestamp: '3 days ago',
    verified: false,
    reportCount: 2,
  },
];

export const reportReasons = [
  { value: 'poor_lighting', label: 'Poor Lighting', icon: '💡' },
  { value: 'isolated', label: 'No Crowd / Isolated', icon: '🏚️' },
  { value: 'incident', label: 'Past Incident', icon: '⚠️' },
  { value: 'suspicious', label: 'Suspicious Activity', icon: '👁️' },
  { value: 'harassment', label: 'Harassment', icon: '🚫' },
  { value: 'other', label: 'Other', icon: '📝' },
];
