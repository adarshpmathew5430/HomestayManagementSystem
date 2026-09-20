import { useState, useEffect } from 'react';
import { Search, Plus, Eye, X, ChevronDown } from 'lucide-react';
import { getBookings } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Skeleton } from '../../components/common/Skeleton';
import { showToast } from '../../components/common/Toast';
import type { Booking, BookingStatus } from '../../data/mockData';

const statuses: BookingStatus[] = ['confirmed', 'pending', 'cancelled', 'completed'];

export function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | ''>('');
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => { getBookings().then(d => { setBookings(d); setLoading(false); }); }, []);

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !q || b.id.toLowerCase().includes(q) || b.guestName.toLowerCase().includes(q) || b.roomName.toLowerCase().includes(q);
    const matchStatus = !statusFilter || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAction = (action: string, booking: Booking) => {
    showToast(`Booking ${booking.id} ${action}`, 'success');
    setSelected(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-stone-900">Bookings</h1>
        <button className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus size={16} /> Add Booking
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-stone-100 p-4 mb-5 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..." className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as BookingStatus | '')} className="border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 bg-white">
          <option value="">All Statuses</option>
          {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-stone-400 text-xs border-b border-stone-100 bg-stone-50/50">
                <th className="text-left px-4 py-3 font-medium">Booking ID</th>
                <th className="text-left px-4 py-3 font-medium">Guest</th>
                <th className="text-left px-4 py-3 font-medium">Room</th>
                <th className="text-left px-4 py-3 font-medium">Check-in</th>
                <th className="text-left px-4 py-3 font-medium">Check-out</th>
                <th className="text-left px-4 py-3 font-medium">Amount</th>
                <th className="text-left px-4 py-3 font-medium">Payment</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-xs text-stone-600">{b.id}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-stone-900">{b.guestName}</div>
                      <div className="text-stone-400 text-xs">{b.guestEmail}</div>
                    </td>
                    <td className="px-4 py-3.5 text-stone-600">{b.roomName}</td>
                    <td className="px-4 py-3.5 text-stone-500">{b.checkIn}</td>
                    <td className="px-4 py-3.5 text-stone-500">{b.checkOut}</td>
                    <td className="px-4 py-3.5 font-medium">RM {b.total.toLocaleString()}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={b.paymentStatus} /></td>
                    <td className="px-4 py-3.5"><StatusBadge status={b.status} /></td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => setSelected(b)} className="text-amber-700 hover:text-amber-800 flex items-center gap-1 text-xs font-medium">
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="px-4 py-12 text-center text-stone-400 text-sm">No bookings found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-stone-900/30" onClick={() => setSelected(null)} />
          <div className="relative ml-auto w-full max-w-md bg-white h-full overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <h2 className="font-semibold text-stone-900">Booking Details</h2>
              <button onClick={() => setSelected(null)}><X size={18} /></button>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <div className="text-xs text-stone-400 mb-1">Reference</div>
                <div className="font-mono font-semibold text-amber-700">{selected.id}</div>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={selected.status} />
                <StatusBadge status={selected.paymentStatus} />
              </div>
              {/* Guest info */}
              <div>
                <h3 className="font-semibold text-stone-700 text-sm mb-2">Guest</h3>
                <div className="space-y-1 text-sm text-stone-600">
                  <div>{selected.guestName}</div>
                  <div>{selected.guestEmail}</div>
                  <div>{selected.guestPhone}</div>
                </div>
              </div>
              {/* Stay info */}
              <div>
                <h3 className="font-semibold text-stone-700 text-sm mb-2">Stay Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    ['Room', selected.roomName],
                    ['Room No.', selected.roomNumber],
                    ['Check-in', selected.checkIn],
                    ['Check-out', selected.checkOut],
                    ['Guests', String(selected.guests)],
                    ['Nights', String(selected.nights)],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-stone-50 rounded-xl p-2.5">
                      <div className="text-xs text-stone-400">{k}</div>
                      <div className="font-medium text-stone-900 mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Payment */}
              <div>
                <h3 className="font-semibold text-stone-700 text-sm mb-2">Payment</h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-stone-600"><span>Room × nights</span><span>RM {(selected.pricePerNight * selected.nights).toLocaleString()}</span></div>
                  <div className="flex justify-between text-stone-600"><span>Taxes</span><span>RM {selected.taxes.toLocaleString()}</span></div>
                  <div className="flex justify-between font-bold text-stone-900 border-t border-stone-100 pt-1.5"><span>Total</span><span>RM {selected.total.toLocaleString()}</span></div>
                  <div className="text-stone-400 text-xs mt-1">Method: {selected.paymentMethod}</div>
                </div>
              </div>
              {selected.specialRequests && (
                <div className="bg-amber-50 rounded-xl p-3 text-sm">
                  <div className="text-amber-700 font-medium mb-1">Special Requests</div>
                  <div className="text-stone-700">{selected.specialRequests}</div>
                </div>
              )}
              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selected.status === 'pending' && (
                  <button onClick={() => handleAction('confirmed', selected)} className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg">Confirm</button>
                )}
                {(selected.status === 'confirmed') && (
                  <button onClick={() => handleAction('checked in', selected)} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg">Check-in</button>
                )}
                {(selected.status === 'confirmed' || selected.status === 'pending') && (
                  <button onClick={() => handleAction('cancelled', selected)} className="border border-red-200 text-red-600 text-xs px-3 py-1.5 rounded-lg">Cancel</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
