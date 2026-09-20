import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { mockRooms } from '../../data/mockData';
import type { Room, RoomStatus } from '../../data/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';
import { showToast } from '../../components/common/Toast';

const AMENITY_OPTIONS = ['Wi-Fi', 'AC', 'TV', 'Breakfast', 'Parking', 'Balcony', 'Kitchen'];

function RoomForm({ room, onClose }: { room?: Room; onClose: () => void }) {
  const [form, setForm] = useState({
    name: room?.name || '',
    roomNumber: room?.roomNumber || '',
    type: room?.type || 'Standard',
    description: room?.description || '',
    pricePerNight: room?.pricePerNight || 2000,
    capacity: room?.capacity || 2,
    beds: room?.beds || '1 Queen Bed',
    size: room?.size || '220 sq.ft',
    amenities: room?.amenities || [],
    status: room?.status || 'available',
  });

  const toggleAmenity = (a: string) =>
    setForm(p => ({ ...p, amenities: p.amenities.includes(a) ? p.amenities.filter(x => x !== a) : [...p.amenities, a] }));

  const handleSave = () => {
    showToast(`Room ${room ? 'updated' : 'created'} successfully.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-stone-900/40" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-lg bg-white h-full overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <h2 className="font-semibold text-stone-900">{room ? 'Edit Room' : 'Add New Room'}</h2>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Room Number</label>
              <input value={form.roomNumber} onChange={e => setForm(p => ({ ...p, roomNumber: e.target.value }))} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Room Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30">
                {['Standard', 'Deluxe', 'Family', 'Premium'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Room Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 resize-none" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Price/Night</label>
              <input type="number" value={form.pricePerNight} onChange={e => setForm(p => ({ ...p, pricePerNight: Number(e.target.value) }))} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Capacity</label>
              <input type="number" min={1} max={6} value={form.capacity} onChange={e => setForm(p => ({ ...p, capacity: Number(e.target.value) }))} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as RoomStatus }))} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30">
                {['available', 'occupied', 'maintenance', 'blocked'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map(a => (
                <button key={a} onClick={() => toggleAmenity(a)} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${form.amenities.includes(a) ? 'bg-amber-700 text-white border-amber-700' : 'text-stone-600 border-stone-200 hover:border-stone-300'}`}>{a}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 border border-stone-200 text-stone-700 py-2.5 rounded-xl text-sm font-medium">Cancel</button>
            <button onClick={handleSave} className="flex-1 bg-amber-700 text-white py-2.5 rounded-xl text-sm font-semibold">Save Room</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoomsAdminPage() {
  const [rooms] = useState(mockRooms);
  const [formRoom, setFormRoom] = useState<Room | null | 'new'>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-stone-900">Rooms</h1>
        <button onClick={() => setFormRoom('new')} className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus size={16} /> Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
            <div className="relative h-44">
              <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3">
                <StatusBadge status={room.status} />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="font-semibold text-stone-900">{room.name}</div>
                  <div className="text-stone-400 text-xs">Room {room.roomNumber} · {room.type}</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <Star size={11} fill="currentColor" />{room.rating}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-50">
                <span className="font-bold text-stone-900">RM {room.pricePerNight.toLocaleString()}<span className="text-stone-400 font-normal text-xs">/night</span></span>
                <div className="flex gap-2">
                  <button onClick={() => setFormRoom(room)} className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"><Edit2 size={14} /></button>
                  <button onClick={() => showToast(`Room ${room.roomNumber} deleted`, 'info')} className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {formRoom && <RoomForm room={formRoom === 'new' ? undefined : formRoom} onClose={() => setFormRoom(null)} />}
    </div>
  );
}
