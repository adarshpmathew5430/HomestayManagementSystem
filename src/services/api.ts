import {
  mockRooms,
  mockRoomTypes,
  mockBookings,
  mockCustomers,
  mockPayments,
  mockReviews,
  mockGallery,
  mockDashboardStats,
  type Room,
  type Booking,
  type Customer,
  type Payment,
  type Review,
  type GalleryImage,
  type BookingStatus,
  type PaymentStatus,
} from '../data/mockData';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

// ─── Rooms ───────────────────────────────────────────────
export async function getRooms(filters?: { type?: string; minPrice?: number; maxPrice?: number; capacity?: number; amenities?: string[] }) {
  await delay();
  let rooms = [...mockRooms];
  if (filters?.type) rooms = rooms.filter(r => r.type === filters.type);
  if (filters?.minPrice) rooms = rooms.filter(r => r.pricePerNight >= filters.minPrice!);
  if (filters?.maxPrice) rooms = rooms.filter(r => r.pricePerNight <= filters.maxPrice!);
  if (filters?.capacity) rooms = rooms.filter(r => r.capacity >= filters.capacity!);
  if (filters?.amenities?.length) {
    rooms = rooms.filter(r => filters.amenities!.every(a => r.amenities.includes(a)));
  }
  return rooms;
}

export async function getRoom(id: number): Promise<Room | null> {
  await delay();
  return mockRooms.find(r => r.id === id) ?? null;
}

export async function searchAvailableRooms(checkIn: string, checkOut: string, guests: number): Promise<Room[]> {
  await delay();
  return mockRooms.filter(r => r.status === 'available' && r.capacity >= guests);
}

export async function getRoomTypes() {
  await delay();
  return mockRoomTypes;
}

// ─── Bookings ────────────────────────────────────────────
export async function getBookings(filters?: { status?: BookingStatus; paymentStatus?: PaymentStatus }) {
  await delay();
  let bookings = [...mockBookings];
  if (filters?.status) bookings = bookings.filter(b => b.status === filters.status);
  if (filters?.paymentStatus) bookings = bookings.filter(b => b.paymentStatus === filters.paymentStatus);
  return bookings;
}

export async function getBooking(id: string): Promise<Booking | null> {
  await delay();
  return mockBookings.find(b => b.id === id) ?? null;
}

export async function getMyBookings(email: string): Promise<Booking[]> {
  await delay();
  return mockBookings.filter(b => b.guestEmail === email);
}

export async function createBooking(data: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
  await delay(800);
  const booking: Booking = {
    ...data,
    id: `HS-2026-${String(Math.floor(Math.random() * 900) + 100).padStart(6, '0')}`,
    createdAt: new Date().toISOString(),
  };
  return booking;
}

export async function cancelBooking(id: string): Promise<boolean> {
  await delay();
  return true;
}

// ─── Customers ───────────────────────────────────────────
export async function getCustomers(): Promise<Customer[]> {
  await delay();
  return mockCustomers;
}

export async function getCustomer(id: number): Promise<Customer | null> {
  await delay();
  return mockCustomers.find(c => c.id === id) ?? null;
}

// ─── Payments ────────────────────────────────────────────
export async function getPayments(filters?: { status?: PaymentStatus }): Promise<Payment[]> {
  await delay();
  let payments = [...mockPayments];
  if (filters?.status) payments = payments.filter(p => p.status === filters.status);
  return payments;
}

// ─── Reviews ─────────────────────────────────────────────
export async function getReviews(): Promise<Review[]> {
  await delay();
  return mockReviews;
}

export async function updateReviewStatus(id: number, status: Review['status']): Promise<boolean> {
  await delay();
  return true;
}

// ─── Gallery ─────────────────────────────────────────────
export async function getGallery(category?: string): Promise<GalleryImage[]> {
  await delay();
  if (category) return mockGallery.filter(g => g.category === category);
  return mockGallery;
}

// ─── Dashboard ───────────────────────────────────────────
export async function getDashboardStats() {
  await delay();
  return mockDashboardStats;
}
