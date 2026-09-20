import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, ArrowUpDown, BedDouble } from 'lucide-react';
import { getRooms } from '../../services/api';
import { RoomCard } from '../../components/common/RoomCard';
import { RoomCardSkeleton } from '../../components/common/Skeleton';
import type { Room } from '../../data/mockData';

const amenityOptions = ['Wi-Fi', 'AC', 'TV', 'Parking', 'Breakfast', 'Balcony', 'Kitchen'];
const roomTypes = ['Standard', 'Deluxe', 'Family', 'Premium'];
const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low'];

export function RoomsPage() {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [guests, setGuests] = useState(searchParams.get('guests') || '1');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState('Recommended');

  const today = new Date().toISOString().split('T')[0];

  const loadRooms = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getRooms({
        type: selectedType || undefined,
        minPrice: priceRange[0] || undefined,
        maxPrice: priceRange[1] || undefined,
        amenities: selectedAmenities.length ? selectedAmenities : undefined,
      });
      let sorted = [...data];
      if (sort === 'Price: Low to High') sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
      if (sort === 'Price: High to Low') sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
      setRooms(sorted);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRooms(); }, [sort]);

  const toggleAmenity = (a: string) =>
    setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const FilterPanel = () => (
    <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-6">
      <div>
        <h3 className="font-semibold text-stone-800 text-sm mb-3">Room Type</h3>
        <div className="space-y-2">
          <button onClick={() => setSelectedType('')} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!selectedType ? 'bg-amber-50 text-amber-700 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}>All Types</button>
          {roomTypes.map(t => (
            <button key={t} onClick={() => setSelectedType(t)} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${selectedType === t ? 'bg-amber-50 text-amber-700 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-stone-800 text-sm mb-3">Amenities</h3>
        <div className="space-y-2">
          {amenityOptions.map(a => (
            <label key={a} className="flex items-center gap-2 cursor-pointer text-sm text-stone-600">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(a)}
                onChange={() => toggleAmenity(a)}
                className="rounded border-stone-300 text-amber-700 focus:ring-amber-700"
              />
              {a}
            </label>
          ))}
        </div>
      </div>
      <button onClick={loadRooms} className="w-full bg-amber-700 text-white py-2.5 rounded-xl text-sm font-semibold">Apply Filters</button>
      <button onClick={() => { setSelectedType(''); setSelectedAmenities([]); setPriceRange([0, 10000]); }} className="w-full text-stone-500 hover:text-stone-700 text-sm">Clear All</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-stone-900 mb-2">Find Your Perfect Stay</h1>
        <p className="text-stone-500">Browse and filter our rooms to find the perfect match for your retreat.</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Check-in</label>
            <input type="date" min={today} value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600" />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Check-out</label>
            <input type="date" min={checkIn || today} value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600" />
          </div>
          <div className="w-28">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Guests</label>
            <select value={guests} onChange={e => setGuests(e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600">
              {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button onClick={loadRooms} className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
            <Search size={14} /> Search
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-60 shrink-0">
          <FilterPanel />
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Sort + filter toggle */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-stone-500 text-sm">{rooms.length} rooms found</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm text-stone-600 border border-stone-200 px-3 py-1.5 rounded-xl hover:bg-stone-50"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-stone-400" />
                <select value={sort} onChange={e => setSort(e.target.value)} className="text-sm border border-stone-200 rounded-xl px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-600/30 bg-white">
                  {sortOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Mobile filter drawer */}
          {filterOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-stone-900/30" onClick={() => setFilterOpen(false)} />
              <div className="relative ml-auto w-80 bg-stone-50 h-full overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-stone-900">Filters</h2>
                  <button onClick={() => setFilterOpen(false)}><X size={18} /></button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          {/* Room grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Array.from({ length: 4 }).map((_, i) => <RoomCardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-100">
              <p className="text-red-500 font-medium">Failed to load rooms. Please try again.</p>
              <button onClick={loadRooms} className="mt-4 text-amber-700 hover:underline text-sm">Retry</button>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-100">
              <BedDouble size={48} className="mx-auto mb-4 text-stone-300" />
              <h3 className="font-semibold text-stone-700 mb-1">No rooms found</h3>
              <p className="text-stone-400 text-sm">Try adjusting your filters or search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {rooms.map(r => <RoomCard key={r.id} room={r} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
