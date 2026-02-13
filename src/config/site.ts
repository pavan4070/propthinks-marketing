export const siteConfig = {
  name: 'PropThinks',
  tagline: 'Find. Move. Live.',
  description: 'Find verified properties for rent in Andhra Pradesh. Professional property management by PropThinks.',
  url: 'https://www.propthinks.com',
  authUrl: 'https://app.propthinks.com',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  markets: [
    { name: 'Nellore', slug: 'nellore' },
    { name: 'Guntur', slug: 'guntur' },
    { name: 'Vijayawada', slug: 'vijayawada' },
    { name: 'Tirupati', slug: 'tirupati' },
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

/**
 * City hero images for marketing pages (Unsplash)
 */
export const cityImages: Record<CitySlug, string> = {
  nellore: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80',
  guntur: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  vijayawada: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  tirupati: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80',
};
