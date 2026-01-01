export const trustedContacts = [
  {
    id: 1,
    name: 'Mom',
    phone: '+91 98765 43210',
    relation: 'Mother',
    avatar: '👩',
    isFavorite: true,
    sharingActive: false,
  },
  {
    id: 2,
    name: 'Priya',
    phone: '+91 98765 43211',
    relation: 'Best Friend',
    avatar: '👧',
    isFavorite: true,
    sharingActive: false,
  },
  {
    id: 3,
    name: 'Rohit (Brother)',
    phone: '+91 98765 43212',
    relation: 'Brother',
    avatar: '👦',
    isFavorite: true,
    sharingActive: false,
  },
];

export const safePlaces = [
  {
    id: 1,
    name: 'Sitabuldi Police Station',
    type: 'police',
    distance: '0.8 km',
    coordinates: [21.1470, 79.0890],
    phone: '100',
    open24x7: true,
  },
  {
    id: 2,
    name: 'Orange City Hospital',
    type: 'hospital',
    distance: '1.2 km',
    coordinates: [21.1490, 79.0950],
    phone: '1066',
    open24x7: true,
  },
  {
    id: 3,
    name: '24/7 Medical Store',
    type: 'store',
    distance: '0.5 km',
    coordinates: [21.1462, 79.0888],
    phone: '+91 98765 00000',
    open24x7: true,
  },
  {
    id: 4,
    name: 'Cafe Coffee Day (Public Place)',
    type: 'cafe',
    distance: '0.3 km',
    coordinates: [21.1468, 79.0895],
    phone: '+91 98765 00001',
    open24x7: false,
    openUntil: '11:00 PM',
  },
];

export const emergencyNumbers = [
  { name: 'Police', number: '100', icon: '🚓' },
  { name: 'Women Helpline', number: '1091', icon: '🆘' },
  { name: 'Ambulance', number: '102', icon: '🚑' },
  { name: 'National Emergency', number: '112', icon: '📞' },
];
