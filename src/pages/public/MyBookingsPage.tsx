import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, X, ChevronRight, BookOpen } from 'lucide-react';
import { getBookings, cancelBooking } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Skeleton } from '../../components/common/Skeleton';
import { showToast } from '../../components/common/Toast';
import type { Booking } from '../../data/mockData';

export function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    getBookings().then(data => { setBookings(data); setLoading(false); });
  }, []);

  const handleCancel = async (booking: Booking) => {
    if (!confirm('Cancel this booking?')) return;
    setCancelling(true);
    await cancelBooking(booking.id);
    showToast('Booking cancelled successfully.', 'info');
    setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'cancelled' } : b));
    setSelected(null);
    setCancelling(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-1">My Bookings</h1>
        <p className="text-stone-500 text-sm">View and manage your reservations.</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-100">
          <BookOpen size={48} className="mx-auto mb-4 text-stone-300" />
          <h3 className="font-semibold text-stone-700 mb-2">No bookings yet</h3>
          <p className="text-stone-400 text-sm mb-6">Your reservations will appear here.</p>
          <button onClick={() => navigate('/rooms')} className="bg-amber-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium">Browse Rooms</button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map(b => (
            <div
              key={b.id}
              onClick={() => setSelected(b)}
              className="bg-white rounded-2xl border border-stone-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-stone-900 text-sm">{b.id}</span>
                  <StatusBadge status={b.status} />
                </div>
                <p className="font-medium text-stone-800">{b.roomName}</p>
                <div className="flex items-center gap-1 text-stone-500 text-xs mt-1">
                  <CalendarDays size={11} />
                  {b.checkIn} → {b.checkOut} · {b.guests} guests · {b.nights} nights
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="font-bold text-stone-900">RM {b.total.toLocaleString()}</div>
                  <StatusBadge status={b.paymentStatus} />
                </div>
                <ChevronRight size={16} className="text-stone-400" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-stone-900/30" onClick={() => setSelected(null)} />
          <div className="relative ml-auto w-full max-w-md bg-white h-full overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <h2 className="font-semibold text-stone-900">{selected.id}</h2>
              <button onClick={() => setSelected(null)}><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-2">
                <StatusBadge status={selected.status} />
                <StatusBadge status={selected.paymentStatus} />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['Room', selected.roomName],
                  ['Room No.', selected.roomNumber],
                  ['Check-in', selected.checkIn],
                  ['Check-out', selected.checkOut],
                  ['Guests', String(selected.guests)],
                  ['Nights', String(selected.nights)],
                ].map(([label, value]) => (
                  <div key={label} className="bg-stone-50 rounded-xl p-3">
                    <div className="text-xs text-stone-400 mb-0.5">{label}</div>
                    <div className="font-medium text-stone-900">{value}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-100 pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-600"><span>RM {selected.pricePerNight.toLocaleString()} × {selected.nights} nights</span><span>RM {(selected.pricePerNight * selected.nights).toLocaleString()}</span></div>
                <div className="flex justify-between text-stone-600"><span>Taxes</span><span>RM {selected.taxes.toLocaleString()}</span></div>
                <div className="flex justify-between font-bold text-stone-900 border-t border-stone-100 pt-2"><span>Total</span><span>RM {selected.total.toLocaleString()}</span></div>
              </div>
              {selected.specialRequests && (
                <div className="bg-amber-50 rounded-xl p-3 text-sm">
                  <div className="text-amber-700 font-medium mb-1">Special Requests</div>
                  <div className="text-stone-700">{selected.specialRequests}</div>
                </div>
              )}
              {(selected.status === 'confirmed' || selected.status === 'pending') && (
                <button
                  onClick={() => handleCancel(selected)}
                  disabled={cancelling}
                  className="w-full mt-2 border border-red-200 text-red-600 hover:bg-red-50 font-medium py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Booking'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
