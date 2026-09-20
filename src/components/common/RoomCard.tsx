import { useNavigate } from 'react-router-dom';
import { Star, Users, Bed, Wifi, AirVent, Tv, UtensilsCrossed, Car, Home, Wind } from 'lucide-react';
import type { Room } from '../../data/mockData';

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi': Wifi,
  'AC': AirVent,
  'TV': Tv,
  'Breakfast': UtensilsCrossed,
  'Parking': Car,
  'Kitchen': Home,
  'Balcony': Wind,
};

export function RoomCard({ room }: { room: Room }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative overflow-hidden h-52">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
          {room.type}
        </div>
        {room.status !== 'available' && (
          <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center">
            <span className="bg-white text-stone-700 text-sm font-medium px-3 py-1 rounded-full capitalize">{room.status}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-stone-900 leading-tight">{room.name}</h3>
          <div className="flex items-center gap-1 shrink-0 text-amber-500">
            <Star size={13} fill="currentColor" />
            <span className="text-xs text-stone-600">{room.rating}</span>
          </div>
        </div>
        <p className="text-stone-500 text-sm mb-3 line-clamp-2">{room.description}</p>
        <div className="flex items-center gap-3 text-stone-500 text-xs mb-3">
          <span className="flex items-center gap-1"><Users size={12} />{room.capacity} guests</span>
          <span className="flex items-center gap-1"><Bed size={12} />{room.beds}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {room.amenities.slice(0, 4).map(a => {
            const Icon = amenityIcons[a];
            return (
              <span key={a} className="flex items-center gap-1 text-xs text-stone-500 bg-stone-50 px-2 py-0.5 rounded-full">
                {Icon && <Icon size={10} />}{a}
              </span>
            );
          })}
          {room.amenities.length > 4 && <span className="text-xs text-stone-400">+{room.amenities.length - 4}</span>}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-stone-900">RM {room.pricePerNight.toLocaleString()}</span>
            <span className="text-stone-400 text-sm">/night</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/rooms/${room.id}`)}
              className="text-sm text-amber-700 border border-amber-200 hover:border-amber-400 px-3 py-1.5 rounded-xl transition-colors"
            >
              View
            </button>
            <button
              onClick={() => navigate(`/booking?roomId=${room.id}`)}
              disabled={room.status !== 'available'}
              className="text-sm bg-amber-700 hover:bg-amber-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-xl transition-colors"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
