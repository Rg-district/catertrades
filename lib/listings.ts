export interface Listing {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  priceLabel: string
  price_label?: string
  location: string
  lat: number
  lng: number
  miles: number
  tags: string[]
  featured?: boolean
  status: 'available' | 'sold' | 'under_offer'
}

export const LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Renault Master Truck — Full Catering Build',
    make: 'Renault',
    model: 'Master Truck',
    year: 2017,
    price: 42000,
    priceLabel: '£42,000',
    location: 'Epping, Essex',
    lat: 51.700,
    lng: 0.113,
    miles: 88000,
    tags: ['LPG Kitchen', '3000W Inverter', 'Twin 40" TVs', 'Fresh MOT'],
    featured: true,
    status: 'available',
  },
  {
    id: '2',
    title: 'Ford Transit Custom — Coffee Bar Build',
    make: 'Ford',
    model: 'Transit Custom',
    year: 2020,
    price: 28500,
    priceLabel: '£28,500',
    location: 'London',
    lat: 51.507,
    lng: -0.127,
    miles: 62000,
    tags: ['Espresso machine', 'Fridge', 'Serving hatch'],
    status: 'available',
  },
  {
    id: '3',
    title: 'Isuzu Grafter — Street Food Truck',
    make: 'Isuzu',
    model: 'Grafter',
    year: 2021,
    price: 55000,
    priceLabel: '£55,000',
    location: 'Manchester',
    lat: 53.480,
    lng: -2.242,
    miles: 35000,
    tags: ['Full kitchen', 'Generator', 'Extraction'],
    status: 'available',
  },
  {
    id: '4',
    title: 'VW Crafter — Mobile Catering Kitchen',
    make: 'Volkswagen',
    model: 'Crafter',
    year: 2019,
    price: 34000,
    priceLabel: '£34,000',
    location: 'Birmingham',
    lat: 52.486,
    lng: -1.890,
    miles: 48000,
    tags: ['6-hob range', 'Extraction', 'Bain marie'],
    status: 'available',
  },
  {
    id: '5',
    title: 'Mercedes Sprinter — Events Catering Unit',
    make: 'Mercedes',
    model: 'Sprinter',
    year: 2018,
    price: 47500,
    priceLabel: '£47,500',
    location: 'Bristol',
    lat: 51.454,
    lng: -2.587,
    miles: 71000,
    tags: ['Gas + Electric', 'Serviced', 'Events spec'],
    status: 'available',
  },
]
