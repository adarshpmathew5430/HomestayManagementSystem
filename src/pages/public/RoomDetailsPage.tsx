import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, Bed, Maximize2, Wifi, AirVent, Tv, UtensilsCrossed, Car, Wind, Home, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getRoom } from '../../services/api';
import { Skeleton } from '../../components/common/Skeleton';
import type { Room } from '../../data/mockData';

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi': Wifi, 'AC': AirVent, 'TV': Tv, 'Breakfast': UtensilsCrossed, 'Parking': Car, 'Balcony': Wind, 'Kitchen': Home,
};

const houseRules = [
  'Check-in: 2:00 PM – 10:00 PM',
  'Check-out: before 11:00 AM',
  'No smoking on the property',
  'No pets allowed',
  'Quiet hours: 10:00 PM – 8:00 AM',
  'Maximum 2 guests (as stated)',
];

export function RoomDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const today = new Date().toISOString().split('T')[0];

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 0;

  const subtotal = nights * (room?.pricePerNight ?? 0);
  const taxes = Math.round(subtotal * 0.15);
  const total = subtotal + taxes;

  useEffect(() => {
    getRoom(Number(id)).then(data => { setRoom(data); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-6 w-24 mb-6" />
      <Skeleton className="h-80 w-full mb-4" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <Skeleton className="h-64" />
      </div>
    </div>
  );

  if (!room) return (
    <div className="text-center py-20"><p className="text-stone-500">Room not found.</p></div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <button onClick={() => navigate('/rooms')} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Rooms
      </button>

      {/* Image gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8 rounded-2xl overflow-hidden h-72 md:h-96">
        <div className="md:col-span-2 cursor-pointer" onClick={() => setLightbox(activeImage)}>
          <img src={room.images[activeImage]} alt={room.name} className="w-full h-full object-cover" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-2">
          {room.images.slice(1, 3).map((img, i) => (
            <div key={i} className="overflow-hidden cursor-pointer" onClick={() => { setActiveImage(i + 1); setLightbox(i + 1); }}>
              <img src={img} alt={`View ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails mobile */}
      <div className="flex gap-2 mb-8 md:hidden overflow-x-auto pb-1">
        {room.images.map((img, i) => (
          <button key={i} onClick={() => setActiveImage(i)} className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${i === activeImage ? 'border-amber-600' : 'border-transparent'}`}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="font-display text-3xl font-bold text-stone-900">{room.name}</h1>
              <span className="bg-amber-50 text-amber-700 text-sm font-semibold px-3 py-1 rounded-full shrink-0">{room.type}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-stone-500 text-sm">
              <span className="flex items-center gap-1"><Star size={14} className="text-amber-500" fill="currentColor" />{room.rating} ({room.reviews} reviews)</span>
              <span className="flex items-center gap-1"><Maximize2 size={14} />{room.size}</span>
              <span className="flex items-center gap-1"><Users size={14} />Up to {room.capacity} guests</span>
              <span className="flex items-center gap-1"><Bed size={14} />{room.beds}</span>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-stone-900 text-lg mb-3">About this room</h2>
            <p className="text-stone-600 leading-relaxed">{room.description}</p>
          </div>

          <div>
            <h2 className="font-semibold text-stone-900 text-lg mb-4">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {room.amenities.map(a => {
                const Icon = amenityIcons[a] ?? Wifi;
                return (
                  <div key={a} className="flex items-center gap-3 bg-stone-50 rounded-xl p-3">
                    <Icon size={16} className="text-amber-700" />
                    <span className="text-sm text-stone-700">{a}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-stone-900 text-lg mb-3">House Rules</h2>
            <ul className="space-y-2">
              {houseRules.map((rule, i) => (
                <li key={i} className="text-stone-600 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full shrink-0" />{rule}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-stone-900 text-lg mb-3">Cancellation Policy</h2>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-900">
              Free cancellation up to 48 hours before check-in. Cancellations within 48 hours will be charged one night's stay.
            </div>
          </div>
        </div>

        {/* Right: booking card (sticky on desktop) */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-white border border-stone-200 rounded-2xl shadow-md p-6">
            <div className="flex items-baseline gap-1 mb-5">
              <span className="font-display text-2xl font-bold text-stone-900">RM {room.pricePerNight.toLocaleString()}</span>
              <span className="text-stone-400 text-sm">/night</span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Check-in</label>
                <input type="date" min={today} value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Check-out</label>
                <input type="date" min={checkIn || today} value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Guests</label>
                <select value={guests} onChange={e => setGuests(Number(e.target.value))} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600">
                  {Array.from({ length: room.capacity }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                </select>
              </div>
            </div>

            {nights > 0 && (
              <div className="border-t border-stone-100 pt-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>RM {room.pricePerNight.toLocaleString()} × {nights} nights</span>
                  <span>RM {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Taxes (15%)</span>
                  <span>RM {taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-100 text-base">
                  <span>Total</span>
                  <span>RM {total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => navigate(`/booking?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)}
              disabled={room.status !== 'available'}
              className="w-full bg-amber-700 hover:bg-amber-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {room.status !== 'available' ? `Room ${room.status}` : 'Reserve Room'}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-stone-900/90 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white" onClick={() => setLightbox(null)}><X size={24} /></button>
          <button className="absolute left-4 text-white" onClick={e => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }}><ChevronLeft size={32} /></button>
          <img src={room.images[lightbox]} alt="" className="max-h-[85vh] max-w-full rounded-xl" onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 text-white" onClick={e => { e.stopPropagation(); setLightbox(Math.min(room.images.length - 1, lightbox + 1)); }}><ChevronRight size={32} /></button>
        </div>
      )}
    </div>
  );
}
