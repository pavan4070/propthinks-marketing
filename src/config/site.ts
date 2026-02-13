export const siteConfig = {
  name: 'PropThinks',
  tagline: 'Find. Move. Live.',
  description: 'Find verified properties for rent in Andhra Pradesh. Professional property management by PropThinks.',
  url: 'https://www.propthinks.com',
  authUrl: 'https://app.propthinks.com',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  markets: [
    { name: 'Nellore', slug: 'nellore', propertyCount: 24 },
    { name: 'Guntur', slug: 'guntur', propertyCount: 18 },
    { name: 'Vijayawada', slug: 'vijayawada', propertyCount: 32 },
    { name: 'Tirupati', slug: 'tirupati', propertyCount: 15 },
  ],
  
  contact: {
    email: 'support@propthinks.com',
    phone: '+91 86390 12345',
    whatsapp: '+918639012345',
  },
  
  social: {
    twitter: '@propthinks',
    facebook: 'propthinks',
    instagram: 'propthinks',
  },
};

export const localities = {
  nellore: [
    'Trunk Road',
    'Magunta Layout',
    'Vedayapalem',
    'Balaji Nagar',
    'Muthukur Road',
    'Dargamitta',
    'Stonehouse Pet',
    'Santhapet',
    'Podalakur Road',
  ],
  guntur: [
    'Brodipet',
    'Arundelpet',
    'Lakshmipuram',
    'Pattabhipuram',
    'Syamala Nagar',
    'Gorantla',
    'Nallapadu',
    'Stambalagaruvu',
    'AT Agraharam',
  ],
  vijayawada: [
    'Labbipet',
    'Moghalrajpuram',
    'Benz Circle',
    'Governorpet',
    'Patamata',
    'Gunadala',
    'Gandhinagar',
    'Auto Nagar',
    'Poranki',
  ],
  tirupati: [
    'Alipiri Road',
    'Tirumala Bypass',
    'AIR Bypass',
    'Renigunta Road',
    'Leela Mahal',
    'Korlagunta',
    'Bairagipatteda',
    'RC Road',
    'Balaji Colony',
  ],
};

export type CitySlug = keyof typeof localities;
