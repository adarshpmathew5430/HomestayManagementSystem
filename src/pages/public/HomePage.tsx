import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, Car, UtensilsCrossed, Star, MapPin, ArrowRight, ChevronRight, Leaf, Shield, Heart } from 'lucide-react';
import { getRooms } from '../../services/api';
import { RoomCard } from '../../components/common/RoomCard';
import { RoomCardSkeleton } from '../../components/common/Skeleton';
import type { Room } from '../../data/mockData';
import { UNSPLASH } from '../../data/mockData';
import { mockReviews } from '../../data/mockData';

const features = [
  { icon: Heart, title: 'Comfortable Rooms', desc: 'Thoughtfully designed spaces that feel like home' },
  { icon: Wifi, title: 'Free Wi-Fi', desc: 'Stay connected throughout your stay' },
  { icon: Car, title: 'Free Parking', desc: 'Secure on-site parking at no extra cost' },
  { icon: UtensilsCrossed, title: 'Breakfast Included', desc: 'Start your day with a fresh home-cooked breakfast' },
];

function BookingSearchBox() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-3 items-end">
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Check-in</label>
        <input
          type="date"
          min={today}
          value={checkIn}
          onChange={e => setCheckIn(e.target.value)}
          className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
        />
      </div>
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Check-out</label>
        <input
          type="date"
          min={checkIn || today}
          value={checkOut}
          onChange={e => setCheckOut(e.target.value)}
          className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
        />
      </div>
      <div className="w-full sm:w-32">
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Guests</label>
        <select
          value={guests}
          onChange={e => setGuests(e.target.value)}
          className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
        >
          {[1,2,3,4].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
        </select>
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors whitespace-nowrap"
      >
        Search Rooms
      </button>
    </form>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRooms().then(data => { setRooms(data.slice(0, 3)); setLoading(false); });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <img
          src={UNSPLASH.property[0]}
          alt="GreenHaven Homestay aerial view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/30 to-stone-900/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf size={14} className="text-amber-400" />
            <span className="text-amber-300 text-sm font-medium tracking-widest uppercase">Cameron Highlands, Malaysia</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            Stay. Relax.<br />Feel at Home.
          </h1>
          <p className="text-stone-200 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
            Experience a peaceful stay surrounded by comfort and nature.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-16 pb-8 z-10">
          <div className="max-w-4xl mx-auto">
            <BookingSearchBox />
          </div>
        </div>
      </section>

      {/* Why Stay With Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">Our Promise</p>
          <h2 className="font-display text-4xl font-bold text-stone-900">Why Stay With Us?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <f.icon size={22} className="text-amber-700" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-1">{f.title}</h3>
              <p className="text-stone-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Room Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">Accommodations</p>
            <h2 className="font-display text-4xl font-bold text-stone-900">Explore Our Rooms</h2>
          </div>
          <button onClick={() => navigate('/rooms')} className="hidden sm:flex items-center gap-1 text-amber-700 hover:text-amber-800 text-sm font-medium">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? Array.from({ length: 3 }).map((_, i) => <RoomCardSkeleton key={i} />) : rooms.map(r => <RoomCard key={r.id} room={r} />)}
        </div>
        <button onClick={() => navigate('/rooms')} className="sm:hidden mt-6 w-full bg-amber-700 text-white py-3 rounded-xl font-medium">View All Rooms</button>
      </section>

      {/* Experience section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <img src={UNSPLASH.property[1]} alt="Homestay experience" className="w-full h-96 object-cover rounded-2xl" />
            <div className="absolute -bottom-4 -right-4 bg-amber-700 text-white rounded-2xl p-5 text-center shadow-lg hidden sm:block">
              <div className="font-display text-3xl font-bold">12+</div>
              <div className="text-xs font-medium text-amber-200 mt-1">Years of Hospitality</div>
            </div>
          </div>
          <div>
            <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="font-display text-4xl font-bold text-stone-900 mb-5">Experience Our Homestay</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Nestled in the cool highlands, GreenHaven began as a family dream — to share the tranquility and beauty of Cameron Highlands with guests from around the world.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              Every detail, from the handpicked furnishings to the farm-fresh breakfasts, reflects our commitment to genuine, heartfelt hospitality.
            </p>
            <button onClick={() => navigate('/about')} className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-medium px-6 py-3 rounded-xl transition-colors">
              Our Story <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">Moments</p>
          <h2 className="font-display text-4xl font-bold text-stone-900">A Glimpse of Paradise</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[UNSPLASH.rooms[0], UNSPLASH.rooms[2], UNSPLASH.nature[0], UNSPLASH.food[0]].map((url, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-2xl group cursor-pointer" onClick={() => navigate('/gallery')}>
              <img src={url} alt={`Gallery ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button onClick={() => navigate('/gallery')} className="text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 mx-auto">
            View Full Gallery <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-stone-900/5 -mx-0">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="font-display text-4xl font-bold text-stone-900">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReviews.filter(r => r.status === 'approved').slice(0,3).map(r => (
              <div key={r.id} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={14} className="text-amber-500" fill="currentColor" />)}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4 italic">"{r.comment}"</p>
                <div>
                  <div className="font-semibold text-stone-900 text-sm">{r.guestName}</div>
                  <div className="text-stone-400 text-xs">{r.roomName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">Find Us</p>
          <h2 className="font-display text-4xl font-bold text-stone-900">Our Location</h2>
        </div>
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
          <div className="h-64 bg-stone-100 flex items-center justify-center">
            <div className="text-center text-stone-400">
              <MapPin size={40} className="mx-auto mb-3 text-amber-600" />
              <p className="font-medium text-stone-600">123 Forest Lane, Cameron Highlands</p>
              <p className="text-sm">Pahang, Malaysia 39200</p>
            </div>
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-stone-600 text-sm"><MapPin size={16} className="text-amber-700" />123 Forest Lane, Cameron Highlands, Pahang</div>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-amber-700 hover:text-amber-800 text-sm font-medium">Get Directions →</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-700">
        <div className="text-center px-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Ready for a Relaxing Stay?</h2>
          <p className="text-amber-100 mb-8 text-lg max-w-md mx-auto">Book your escape to nature today. Rates from RM 2,200/night.</p>
          <button onClick={() => navigate('/rooms')} className="bg-white text-amber-800 hover:bg-amber-50 font-semibold px-8 py-4 rounded-xl text-lg transition-colors inline-flex items-center gap-2">
            Book Your Stay <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
