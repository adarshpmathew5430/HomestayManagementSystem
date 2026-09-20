import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, CalendarDays, Home, Mail } from 'lucide-react';
import { showToast } from '../../components/common/Toast';

export function BookingConfirmationPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const id = params.get('id') || 'HS-2026-000123';
  const room = params.get('room') || 'Deluxe Garden Room';
  const guest = params.get('guest') || 'Guest';
  const email = params.get('email') || '';
  const checkIn = params.get('checkIn') || '';
  const checkOut = params.get('checkOut') || '';
  const guests = params.get('guests') || '2';
  const nights = params.get('nights') || '2';
  const total = params.get('total') || '0';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 sm:p-12">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-2">Booking Confirmed!</h1>
        <p className="text-stone-500 mb-6">We've sent your booking details to your email.</p>

        <div className="bg-amber-50 border border-amber-100 rounded-xl px-6 py-4 mb-8 inline-block">
          <p className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-1">Booking Reference</p>
          <p className="font-display text-2xl font-bold text-amber-800">{id}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          {[
            { label: 'Room', value: room },
            { label: 'Guest', value: guest },
            { label: 'Check-in', value: checkIn },
            { label: 'Check-out', value: checkOut },
            { label: 'Guests', value: `${guests} guest${Number(guests) !== 1 ? 's' : ''}` },
            { label: 'Nights', value: `${nights} night${Number(nights) !== 1 ? 's' : ''}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-stone-50 rounded-xl p-3">
              <div className="text-xs text-stone-400 mb-0.5">{label}</div>
              <div className="font-medium text-stone-900 text-sm">{value}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-100 pt-4 mb-8">
          <div className="flex justify-between font-bold text-stone-900 text-lg">
            <span>Total Amount</span>
            <span>RM {Number(total).toLocaleString()}</span>
          </div>
        </div>

        {email && (
          <div className="flex items-center justify-center gap-2 text-stone-500 text-sm mb-8 bg-stone-50 rounded-xl p-3">
            <Mail size={14} className="text-amber-700" />
            Confirmation sent to <strong>{email}</strong>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => { showToast('Downloading confirmation...', 'info'); }}
            className="flex-1 flex items-center justify-center gap-2 border border-stone-200 text-stone-700 font-medium py-3 rounded-xl hover:bg-stone-50 transition-colors"
          >
            <Download size={16} /> Download
          </button>
          <button
            onClick={() => navigate('/my-bookings')}
            className="flex-1 flex items-center justify-center gap-2 border border-amber-200 text-amber-700 font-medium py-3 rounded-xl hover:bg-amber-50 transition-colors"
          >
            <CalendarDays size={16} /> My Bookings
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-medium py-3 rounded-xl transition-colors"
          >
            <Home size={16} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
