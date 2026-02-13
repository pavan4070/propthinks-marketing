import type { Property } from '@/types/property';

// High-quality Unsplash images for Indian apartments
const propertyImages = {
  apartment1: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  apartment2: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  apartment3: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  apartment4: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
  apartment5: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
  house1: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  house2: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80',
  house3: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
  interior1: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80',
  interior2: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
};

// City images for city cards
export const cityImages = {
  nellore: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80',
  guntur: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  vijayawada: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  tirupati: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80',
};

export const mockProperties: Property[] = [
  {
    id: 'PPTH0001',
    title: '2BHK Spacious Apartment',
    description: 'Well-maintained 2BHK apartment with modern amenities. Ideal for small families. Located in a prime area with easy access to schools and hospitals.',
    locality: 'Trunk Road',
    city: 'Nellore',
    state: 'Andhra Pradesh',
    bhk: 2,
    bathrooms: 2,
    area_sqft: 1200,
    rent: 18000,
    deposit: 36000,
    maintenance: 2000,
    furnishing: 'semi-furnished',
    property_type: 'apartment',
    amenities: ['Parking', 'Power Backup', '24/7 Security', 'Lift'],
    images: [propertyImages.apartment1, propertyImages.interior1],
    available_from: 'Immediate',
    posted_date: '2026-01-28',
  },
  {
    id: 'PPTH0002',
    title: '3BHK Independent House',
    description: 'Beautiful independent house with garden. Perfect for families looking for space and privacy. Close to Labbipet main road.',
    locality: 'Labbipet',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    bhk: 3,
    bathrooms: 3,
    area_sqft: 1800,
    rent: 28000,
    deposit: 56000,
    maintenance: 3000,
    furnishing: 'unfurnished',
    property_type: 'house',
    amenities: ['Parking', 'Garden', 'Power Backup', 'Water Tank'],
    images: [propertyImages.house1, propertyImages.interior2],
    available_from: 'Immediate',
    posted_date: '2026-01-25',
  },
  {
    id: 'PPTH0003',
    title: '1BHK Cozy Studio',
    description: 'Compact and cozy 1BHK perfect for bachelors or young professionals. Walking distance to Tirupati railway station.',
    locality: 'Alipiri Road',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    bhk: 1,
    bathrooms: 1,
    area_sqft: 600,
    rent: 12000,
    deposit: 24000,
    maintenance: 1500,
    furnishing: 'furnished',
    property_type: 'apartment',
    amenities: ['Parking', 'Power Backup', 'Security'],
    images: [propertyImages.apartment3],
    available_from: '2026-02-15',
    posted_date: '2026-01-30',
  },
  {
    id: 'PPTH0004',
    title: '2BHK Modern Flat',
    description: 'Newly constructed 2BHK with contemporary design. Gated community with excellent amenities. Family-friendly neighborhood.',
    locality: 'Brodipet',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    bhk: 2,
    bathrooms: 2,
    area_sqft: 1100,
    rent: 22000,
    deposit: 44000,
    maintenance: 2500,
    furnishing: 'semi-furnished',
    property_type: 'apartment',
    amenities: ['Parking', 'Gym', 'Swimming Pool', 'Clubhouse', 'Security'],
    images: [propertyImages.apartment2, propertyImages.apartment4],
    available_from: 'Immediate',
    posted_date: '2026-01-20',
  },
  {
    id: 'PPTH0005',
    title: '3BHK Premium Villa',
    description: 'Luxurious 3BHK villa in a premium gated community. Spacious rooms with attached balconies. Perfect for joint families.',
    locality: 'Moghalrajpuram',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    bhk: 3,
    bathrooms: 4,
    area_sqft: 2200,
    rent: 45000,
    deposit: 90000,
    maintenance: 4000,
    furnishing: 'fully-furnished',
    property_type: 'villa',
    amenities: ['Parking', 'Garden', 'Power Backup', 'Modular Kitchen', 'AC', 'Security'],
    images: [propertyImages.house2, propertyImages.house3],
    available_from: 'Immediate',
    posted_date: '2026-01-15',
  },
  {
    id: 'PPTH0006',
    title: '2BHK Family Apartment',
    description: 'Comfortable 2BHK in a well-established residential area. Near schools, hospitals, and shopping centers.',
    locality: 'Magunta Layout',
    city: 'Nellore',
    state: 'Andhra Pradesh',
    bhk: 2,
    bathrooms: 2,
    area_sqft: 1050,
    rent: 15000,
    deposit: 30000,
    maintenance: 1800,
    furnishing: 'unfurnished',
    property_type: 'apartment',
    amenities: ['Parking', 'Power Backup', 'Security', 'Lift'],
    images: [propertyImages.apartment5],
    available_from: 'Immediate',
    posted_date: '2026-01-22',
  },
  {
    id: 'PPTH0007',
    title: '1BHK Budget Friendly',
    description: 'Affordable 1BHK apartment ideal for students and working professionals. Well-connected location.',
    locality: 'Arundelpet',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    bhk: 1,
    bathrooms: 1,
    area_sqft: 550,
    rent: 9000,
    deposit: 18000,
    maintenance: 1000,
    furnishing: 'unfurnished',
    property_type: 'apartment',
    amenities: ['Parking', 'Power Backup'],
    images: [propertyImages.apartment3],
    available_from: 'Immediate',
    posted_date: '2026-01-18',
  },
  {
    id: 'PPTH0008',
    title: '2BHK Near Temple',
    description: 'Peaceful 2BHK apartment close to Tirumala temple entrance. Ideal for devotees and senior citizens.',
    locality: 'Tirumala Bypass',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    bhk: 2,
    bathrooms: 2,
    area_sqft: 1000,
    rent: 16000,
    deposit: 32000,
    maintenance: 1500,
    furnishing: 'semi-furnished',
    property_type: 'apartment',
    amenities: ['Parking', 'Power Backup', 'Lift', 'Security'],
    images: [propertyImages.apartment4],
    available_from: '2026-02-01',
    posted_date: '2026-01-26',
  },
  {
    id: 'PPTH0009',
    title: '3BHK Benz Circle Flat',
    description: 'Spacious 3BHK in the heart of Vijayawada. Walking distance to Benz Circle. Excellent connectivity.',
    locality: 'Benz Circle',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    bhk: 3,
    bathrooms: 3,
    area_sqft: 1650,
    rent: 35000,
    deposit: 70000,
    maintenance: 3500,
    furnishing: 'semi-furnished',
    property_type: 'apartment',
    amenities: ['Parking', 'Power Backup', 'Gym', 'Security', 'Lift', 'Intercom'],
    images: [propertyImages.apartment2, propertyImages.interior1],
    available_from: 'Immediate',
    posted_date: '2026-01-12',
  },
  {
    id: 'PPTH0010',
    title: '2BHK Vedayapalem Home',
    description: 'Well-ventilated 2BHK in a quiet neighborhood. Perfect for families seeking peace and convenience.',
    locality: 'Vedayapalem',
    city: 'Nellore',
    state: 'Andhra Pradesh',
    bhk: 2,
    bathrooms: 2,
    area_sqft: 1150,
    rent: 14000,
    deposit: 28000,
    maintenance: 1500,
    furnishing: 'unfurnished',
    property_type: 'apartment',
    amenities: ['Parking', 'Power Backup', 'Water Tank'],
    images: [propertyImages.apartment1],
    available_from: 'Immediate',
    posted_date: '2026-01-29',
  },
];

// Helper function to get properties by city
export function getPropertiesByCity(city: string): Property[] {
  return mockProperties.filter(
    (p) => p.city.toLowerCase() === city.toLowerCase()
  );
}

// Helper function to filter properties
export function filterProperties(filters: {
  city?: string;
  bhk?: number;
  minRent?: number;
  maxRent?: number;
  type?: string;
}): Property[] {
  return mockProperties.filter((p) => {
    if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }
    if (filters.bhk && p.bhk !== filters.bhk) {
      return false;
    }
    if (filters.minRent && p.rent < filters.minRent) {
      return false;
    }
    if (filters.maxRent && p.rent > filters.maxRent) {
      return false;
    }
    if (filters.type && p.property_type !== filters.type) {
      return false;
    }
    return true;
  });
}

// Get property by ID
export function getPropertyById(id: string): Property | undefined {
  return mockProperties.find((p) => p.id === id);
}
