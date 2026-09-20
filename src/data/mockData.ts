export const UNSPLASH = {
  rooms: [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop&auto=format',
  ],
  property: [
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop&auto=format',
  ],
  nature: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&auto=format',
  ],
  food: [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format',
  ],
};

export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'blocked';
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface Room {
  id: number;
  name: string;
  roomNumber: string;
  type: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  beds: string;
  size: string;
  amenities: string[];
  images: string[];
  status: RoomStatus;
  rating: number;
  reviews: number;
}

export interface RoomType {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  capacity: number;
  amenities: string[];
  image: string;
  roomCount: number;
}

export interface Booking {
  id: string;
  roomId: number;
  roomName: string;
  roomNumber: string;
  guestId: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  pricePerNight: number;
  taxes: number;
  total: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  specialRequests?: string;
  createdAt: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  bookings: number;
  totalSpent: number;
  lastStay: string;
  avatar?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  customerId: number;
  customerName: string;
  amount: number;
  method: string;
  transactionId: string;
  status: PaymentStatus;
  date: string;
}

export interface Review {
  id: number;
  guestName: string;
  guestAvatar?: string;
  rating: number;
  comment: string;
  roomId: number;
  roomName: string;
  date: string;
  status: 'approved' | 'pending' | 'hidden';
}

export interface GalleryImage {
  id: number;
  url: string;
  category: 'Rooms' | 'Property' | 'Nature' | 'Food' | 'Experiences';
  title: string;
  featured: boolean;
}

export const mockRooms: Room[] = [
  {
    id: 1,
    name: 'Deluxe Garden Room',
    roomNumber: '101',
    type: 'Deluxe',
    description: 'A serene room overlooking our lush garden, featuring premium furnishings, a king-size bed, and an en-suite bathroom with rain shower. The perfect retreat for couples seeking peace and comfort.',
    pricePerNight: 3500,
    capacity: 2,
    beds: '1 King Bed',
    size: '320 sq.ft',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Breakfast', 'Parking', 'Balcony'],
    images: [UNSPLASH.rooms[0], UNSPLASH.rooms[1], UNSPLASH.rooms[2]],
    status: 'available',
    rating: 4.8,
    reviews: 47,
  },
  {
    id: 2,
    name: 'Family Hideaway Suite',
    roomNumber: '102',
    type: 'Family',
    description: 'Spacious suite designed for families, with two queen beds, a cozy living area, and a kitchenette. Children will love the garden view and there\'s plenty of space for everyone to relax.',
    pricePerNight: 5500,
    capacity: 4,
    beds: '2 Queen Beds',
    size: '520 sq.ft',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Breakfast', 'Parking', 'Kitchen'],
    images: [UNSPLASH.rooms[1], UNSPLASH.rooms[0], UNSPLASH.rooms[3]],
    status: 'available',
    rating: 4.7,
    reviews: 32,
  },
  {
    id: 3,
    name: 'Premium Treehouse Room',
    roomNumber: '103',
    type: 'Premium',
    description: 'Our most unique offering — a charming treehouse-style room elevated among the trees. Features a private deck, king bed, and panoramic nature views that make every morning magical.',
    pricePerNight: 6500,
    capacity: 2,
    beds: '1 King Bed',
    size: '280 sq.ft',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Breakfast', 'Balcony'],
    images: [UNSPLASH.rooms[2], UNSPLASH.rooms[4], UNSPLASH.rooms[0]],
    status: 'available',
    rating: 4.9,
    reviews: 61,
  },
  {
    id: 4,
    name: 'Standard Comfort Room',
    roomNumber: '104',
    type: 'Standard',
    description: 'A well-appointed standard room offering all the essentials for a comfortable stay. Clean, bright, and thoughtfully furnished with a queen bed and a garden-facing window.',
    pricePerNight: 2200,
    capacity: 2,
    beds: '1 Queen Bed',
    size: '220 sq.ft',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Parking'],
    images: [UNSPLASH.rooms[3], UNSPLASH.rooms[1], UNSPLASH.rooms[2]],
    status: 'occupied',
    rating: 4.5,
    reviews: 28,
  },
  {
    id: 5,
    name: 'Deluxe Forest View Room',
    roomNumber: '105',
    type: 'Deluxe',
    description: 'Wake up to stunning forest views from your private balcony. This deluxe room combines modern comforts with natural surroundings — the ideal base for nature lovers.',
    pricePerNight: 3800,
    capacity: 2,
    beds: '1 King Bed',
    size: '350 sq.ft',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Breakfast', 'Balcony', 'Parking'],
    images: [UNSPLASH.rooms[4], UNSPLASH.rooms[0], UNSPLASH.rooms[1]],
    status: 'available',
    rating: 4.6,
    reviews: 39,
  },
];

export const mockRoomTypes: RoomType[] = [
  {
    id: 1,
    name: 'Standard Room',
    description: 'Comfortable rooms with essential amenities for a relaxing stay.',
    basePrice: 2200,
    capacity: 2,
    amenities: ['Wi-Fi', 'AC', 'TV', 'Parking'],
    image: UNSPLASH.rooms[3],
    roomCount: 3,
  },
  {
    id: 2,
    name: 'Deluxe Room',
    description: 'Upgraded rooms with premium furnishings and garden or forest views.',
    basePrice: 3500,
    capacity: 2,
    amenities: ['Wi-Fi', 'AC', 'TV', 'Breakfast', 'Balcony', 'Parking'],
    image: UNSPLASH.rooms[0],
    roomCount: 4,
  },
  {
    id: 3,
    name: 'Family Suite',
    description: 'Spacious suites designed for families with extra beds and living area.',
    basePrice: 5500,
    capacity: 4,
    amenities: ['Wi-Fi', 'AC', 'TV', 'Breakfast', 'Kitchen', 'Parking'],
    image: UNSPLASH.rooms[1],
    roomCount: 2,
  },
  {
    id: 4,
    name: 'Premium Room',
    description: 'Our finest rooms offering the ultimate homestay experience.',
    basePrice: 6500,
    capacity: 2,
    amenities: ['Wi-Fi', 'AC', 'TV', 'Breakfast', 'Balcony', 'Parking'],
    image: UNSPLASH.rooms[2],
    roomCount: 2,
  },
];

export const mockCustomers: Customer[] = [
  { id: 1, name: 'Amelia Richardson', email: 'amelia.r@email.com', phone: '+60 12-345 6789', address: 'Kuala Lumpur, Malaysia', bookings: 5, totalSpent: 18500, lastStay: '2026-08-20' },
  { id: 2, name: 'James Tan', email: 'jtan@gmail.com', phone: '+60 11-234 5678', address: 'Penang, Malaysia', bookings: 3, totalSpent: 9800, lastStay: '2026-07-15' },
  { id: 3, name: 'Sophie Laurent', email: 'slaurent@email.com', phone: '+33 6 12 34 56 78', address: 'Paris, France', bookings: 1, totalSpent: 6500, lastStay: '2026-09-01' },
  { id: 4, name: 'Daniel Wong', email: 'danielw@email.com', phone: '+65 9123 4567', address: 'Singapore', bookings: 7, totalSpent: 27300, lastStay: '2026-09-10' },
  { id: 5, name: 'Priya Sharma', email: 'priya.s@email.com', phone: '+91 98765 43210', address: 'Mumbai, India', bookings: 2, totalSpent: 8400, lastStay: '2026-06-30' },
  { id: 6, name: 'Liam O\'Brien', email: 'liam.ob@email.com', phone: '+353 85 123 4567', address: 'Dublin, Ireland', bookings: 1, totalSpent: 3500, lastStay: '2026-08-05' },
];

export const mockBookings: Booking[] = [
  {
    id: 'HS-2026-000120',
    roomId: 1,
    roomName: 'Deluxe Garden Room',
    roomNumber: '101',
    guestId: 1,
    guestName: 'Amelia Richardson',
    guestEmail: 'amelia.r@email.com',
    guestPhone: '+60 12-345 6789',
    checkIn: '2026-09-22',
    checkOut: '2026-09-25',
    guests: 2,
    nights: 3,
    pricePerNight: 3500,
    taxes: 1575,
    total: 12075,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    specialRequests: 'Early check-in if possible.',
    createdAt: '2026-09-10T14:30:00Z',
  },
  {
    id: 'HS-2026-000119',
    roomId: 3,
    roomName: 'Premium Treehouse Room',
    roomNumber: '103',
    guestId: 3,
    guestName: 'Sophie Laurent',
    guestEmail: 'slaurent@email.com',
    guestPhone: '+33 6 12 34 56 78',
    checkIn: '2026-09-20',
    checkOut: '2026-09-23',
    guests: 2,
    nights: 3,
    pricePerNight: 6500,
    taxes: 2925,
    total: 22425,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'PayPal',
    createdAt: '2026-09-05T09:15:00Z',
  },
  {
    id: 'HS-2026-000118',
    roomId: 2,
    roomName: 'Family Hideaway Suite',
    roomNumber: '102',
    guestId: 2,
    guestName: 'James Tan',
    guestEmail: 'jtan@gmail.com',
    guestPhone: '+60 11-234 5678',
    checkIn: '2026-09-18',
    checkOut: '2026-09-21',
    guests: 3,
    nights: 3,
    pricePerNight: 5500,
    taxes: 2475,
    total: 18975,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'Bank Transfer',
    createdAt: '2026-09-01T11:00:00Z',
  },
  {
    id: 'HS-2026-000117',
    roomId: 4,
    roomName: 'Standard Comfort Room',
    roomNumber: '104',
    guestId: 5,
    guestName: 'Priya Sharma',
    guestEmail: 'priya.s@email.com',
    guestPhone: '+91 98765 43210',
    checkIn: '2026-09-25',
    checkOut: '2026-09-27',
    guests: 2,
    nights: 2,
    pricePerNight: 2200,
    taxes: 660,
    total: 5060,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Credit Card',
    createdAt: '2026-09-15T16:45:00Z',
  },
  {
    id: 'HS-2026-000116',
    roomId: 5,
    roomName: 'Deluxe Forest View Room',
    roomNumber: '105',
    guestId: 4,
    guestName: 'Daniel Wong',
    guestEmail: 'danielw@email.com',
    guestPhone: '+65 9123 4567',
    checkIn: '2026-10-01',
    checkOut: '2026-10-05',
    guests: 2,
    nights: 4,
    pricePerNight: 3800,
    taxes: 2280,
    total: 17480,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: '2026-09-12T08:30:00Z',
  },
  {
    id: 'HS-2026-000115',
    roomId: 1,
    roomName: 'Deluxe Garden Room',
    roomNumber: '101',
    guestId: 6,
    guestName: 'Liam O\'Brien',
    guestEmail: 'liam.ob@email.com',
    guestPhone: '+353 85 123 4567',
    checkIn: '2026-08-05',
    checkOut: '2026-08-07',
    guests: 1,
    nights: 2,
    pricePerNight: 3500,
    taxes: 1050,
    total: 8050,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'Credit Card',
    createdAt: '2026-07-20T10:00:00Z',
  },
];

export const mockPayments: Payment[] = [
  { id: 'PAY-2026-0120', bookingId: 'HS-2026-000120', customerId: 1, customerName: 'Amelia Richardson', amount: 12075, method: 'Credit Card', transactionId: 'TXN-ABC12345', status: 'paid', date: '2026-09-10T14:30:00Z' },
  { id: 'PAY-2026-0119', bookingId: 'HS-2026-000119', customerId: 3, customerName: 'Sophie Laurent', amount: 22425, method: 'PayPal', transactionId: 'TXN-XYZ98765', status: 'paid', date: '2026-09-05T09:15:00Z' },
  { id: 'PAY-2026-0118', bookingId: 'HS-2026-000118', customerId: 2, customerName: 'James Tan', amount: 18975, method: 'Bank Transfer', transactionId: 'TXN-MNO45678', status: 'paid', date: '2026-09-01T11:00:00Z' },
  { id: 'PAY-2026-0117', bookingId: 'HS-2026-000117', customerId: 5, customerName: 'Priya Sharma', amount: 5060, method: 'Credit Card', transactionId: 'TXN-PQR11111', status: 'pending', date: '2026-09-15T16:45:00Z' },
  { id: 'PAY-2026-0116', bookingId: 'HS-2026-000116', customerId: 4, customerName: 'Daniel Wong', amount: 17480, method: 'Credit Card', transactionId: 'TXN-STU22222', status: 'paid', date: '2026-09-12T08:30:00Z' },
  { id: 'PAY-2026-0115', bookingId: 'HS-2026-000115', customerId: 6, customerName: 'Liam O\'Brien', amount: 8050, method: 'Credit Card', transactionId: 'TXN-VWX33333', status: 'refunded', date: '2026-08-01T10:00:00Z' },
];

export const mockReviews: Review[] = [
  { id: 1, guestName: 'Amelia Richardson', rating: 5, comment: 'Absolutely stunning property! The garden room was exactly as pictured. Waking up to birdsong and fresh air every morning was a treat. Staff were incredibly warm and helpful.', roomId: 1, roomName: 'Deluxe Garden Room', date: '2026-08-25', status: 'approved' },
  { id: 2, guestName: 'James Tan', rating: 5, comment: 'Brought my family here for a weekend getaway and it exceeded all expectations. Kids loved the garden, parents loved the peaceful atmosphere. The breakfast was outstanding.', roomId: 2, roomName: 'Family Hideaway Suite', date: '2026-07-20', status: 'approved' },
  { id: 3, guestName: 'Sophie Laurent', rating: 5, comment: 'The Treehouse Room is something else entirely. Falling asleep to the sound of nature and waking up to mist in the trees — truly unforgettable. Will return next year.', roomId: 3, roomName: 'Premium Treehouse Room', date: '2026-09-05', status: 'approved' },
  { id: 4, guestName: 'Daniel Wong', rating: 4, comment: 'Great location, beautiful surroundings. The room was clean and comfortable. Only minor issue was Wi-Fi signal on the balcony, but the view made up for it entirely.', roomId: 5, roomName: 'Deluxe Forest View Room', date: '2026-08-15', status: 'approved' },
  { id: 5, guestName: 'Priya Sharma', rating: 4, comment: 'Peaceful and well-maintained property. The hospitality was genuine and heartfelt. Looking forward to our next visit with the whole family.', roomId: 4, roomName: 'Standard Comfort Room', date: '2026-07-05', status: 'pending' },
];

export const mockGallery: GalleryImage[] = [
  { id: 1, url: UNSPLASH.rooms[0], category: 'Rooms', title: 'Deluxe Garden Room Interior', featured: true },
  { id: 2, url: UNSPLASH.rooms[1], category: 'Rooms', title: 'Family Suite Living Area', featured: false },
  { id: 3, url: UNSPLASH.rooms[2], category: 'Rooms', title: 'Premium Treehouse Room', featured: true },
  { id: 4, url: UNSPLASH.property[0], category: 'Property', title: 'Main Property Entrance', featured: true },
  { id: 5, url: UNSPLASH.property[1], category: 'Property', title: 'Pool and Garden Area', featured: false },
  { id: 6, url: UNSPLASH.property[2], category: 'Property', title: 'Outdoor Lounge', featured: false },
  { id: 7, url: UNSPLASH.nature[0], category: 'Nature', title: 'Morning Mist in Mountains', featured: false },
  { id: 8, url: UNSPLASH.nature[1], category: 'Nature', title: 'Surrounding Forest', featured: false },
  { id: 9, url: UNSPLASH.food[0], category: 'Food', title: 'Farm Fresh Breakfast', featured: true },
  { id: 10, url: UNSPLASH.food[1], category: 'Food', title: 'Local Cuisine Selection', featured: false },
  { id: 11, url: UNSPLASH.rooms[3], category: 'Rooms', title: 'Standard Room Detail', featured: false },
  { id: 12, url: UNSPLASH.rooms[4], category: 'Rooms', title: 'Forest View Room', featured: false },
];

export const mockDashboardStats = {
  totalBookings: 120,
  todayCheckIns: 3,
  todayCheckOuts: 2,
  availableRooms: 4,
  occupancyRate: 72,
  monthlyRevenue: 142500,
  revenueData: [
    { date: 'Sep 1', revenue: 8500 },
    { date: 'Sep 2', revenue: 12000 },
    { date: 'Sep 3', revenue: 6500 },
    { date: 'Sep 4', revenue: 9800 },
    { date: 'Sep 5', revenue: 15200 },
    { date: 'Sep 6', revenue: 11000 },
    { date: 'Sep 7', revenue: 7400 },
    { date: 'Sep 8', revenue: 13600 },
    { date: 'Sep 9', revenue: 9200 },
    { date: 'Sep 10', revenue: 16800 },
    { date: 'Sep 11', revenue: 14300 },
    { date: 'Sep 12', revenue: 8900 },
    { date: 'Sep 13', revenue: 11500 },
    { date: 'Sep 14', revenue: 17200 },
  ],
  bookingData: [
    { month: 'Apr', bookings: 18 },
    { month: 'May', bookings: 22 },
    { month: 'Jun', bookings: 28 },
    { month: 'Jul', bookings: 35 },
    { month: 'Aug', bookings: 31 },
    { month: 'Sep', bookings: 24 },
  ],
  occupancyData: [
    { month: 'Apr', rate: 58 },
    { month: 'May', rate: 65 },
    { month: 'Jun', rate: 74 },
    { month: 'Jul', rate: 88 },
    { month: 'Aug', rate: 82 },
    { month: 'Sep', rate: 72 },
  ],
};
