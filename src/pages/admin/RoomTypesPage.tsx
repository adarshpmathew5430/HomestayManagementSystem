import { useState } from 'react';
import { Plus, Edit2 } from 'lucide-react';
import { mockRoomTypes } from '../../data/mockData';
import { showToast } from '../../components/common/Toast';

export function RoomTypesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-stone-900">Room Types</h1>
        <button onClick={() => showToast('Add room type feature coming soon.', 'info')} className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus size={16} /> Add Type
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mockRoomTypes.map(type => (
          <div key={type.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
            <div className="relative h-40">
              <img src={type.image} alt={type.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <div className="font-semibold text-lg">{type.name}</div>
                <div className="text-stone-300 text-sm">{type.roomCount} rooms · Up to {type.capacity} guests</div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-stone-500 text-sm mb-4">{type.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {type.amenities.map(a => (
                  <span key={a} className="text-xs bg-stone-50 text-stone-600 border border-stone-100 px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-stone-50">
                <div>
                  <span className="font-bold text-stone-900 text-lg">RM {type.basePrice.toLocaleString()}</span>
                  <span className="text-stone-400 text-sm">/night</span>
                </div>
                <button onClick={() => showToast('Edit feature coming soon.', 'info')} className="flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700 hover:bg-amber-50 px-3 py-1.5 rounded-xl transition-colors">
                  <Edit2 size={14} /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
