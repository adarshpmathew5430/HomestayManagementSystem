import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Check } from 'lucide-react';
import { getRoom, createBooking } from '../../services/api';
import { showToast } from '../../components/common/Toast';
import type { Room } from '../../data/mockData';

const steps = ['Stay Details', 'Guest Details', 'Review & Confirm'];

interface GuestForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  specialRequests?: string;
}

export function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);

  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [guests, setGuests] = useState(Number(searchParams.get('guests') || 1));
  const roomId = Number(searchParams.get('roomId') || 1);

  const today = new Date().toISOString().split('T')[0];
  const nights = checkIn && checkOut ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 0;
  const subtotal = nights * (room?.pricePerNight ?? 0);
  const taxes = Math.round(subtotal * 0.15);
  const total = subtotal + taxes;

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<GuestForm>();

  useEffect(() => { getRoom(roomId).then(setRoom); }, [roomId]);

  const handleConfirm = async () => {
    if (!room) return;
    setLoading(true);
    try {
      const values = getValues();
      const booking = await createBooking({
        roomId: room.id,
        roomName: room.name,
        roomNumber: room.roomNumber,
        guestId: 0,
        guestName: values.fullName,
        guestEmail: values.email,
        guestPhone: values.phone,
        checkIn,
        checkOut,
        guests,
        nights,
        pricePerNight: room.pricePerNight,
        taxes,
        total,
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'Credit Card',
        specialRequests: values.specialRequests,
      });
      navigate(`/booking-confirmation?id=${booking.id}&room=${room.name}&guest=${values.fullName}&email=${values.email}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&nights=${nights}&total=${total}`);
    } catch {
      showToast('Booking failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-stone-900 mb-8">Complete Your Booking</h1>

      {/* Step indicator */}
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${i < step ? 'bg-amber-700 text-white' : i === step ? 'bg-amber-700 text-white ring-4 ring-amber-100' : 'bg-stone-100 text-stone-400'}`}>
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-xs mt-1 font-medium ${i === step ? 'text-amber-700' : 'text-stone-400'}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < step ? 'bg-amber-700' : 'bg-stone-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 0: Stay Details */}
      {step === 0 && (
        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="font-semibold text-stone-900 text-lg">Stay Details</h2>
          {room && (
            <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-4 mb-2">
              <img src={room.images[0]} alt={room.name} className="w-20 h-16 object-cover rounded-lg shrink-0" />
              <div>
                <div className="font-semibold text-stone-900">{room.name}</div>
                <div className="text-stone-500 text-sm">RM {room.pricePerNight.toLocaleString()}/night</div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Check-in</label>
              <input type="date" min={today} value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Check-out</label>
              <input type="date" min={checkIn || today} value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Guests</label>
              <select value={guests} onChange={e => setGuests(Number(e.target.value))} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30">
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => { if (!checkIn || !checkOut || nights <= 0) { showToast('Please select valid dates', 'error'); return; } setStep(1); }} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-xl mt-4 transition-colors">
            Continue to Guest Details
          </button>
        </div>
      )}

      {/* Step 1: Guest Details */}
      {step === 1 && (
        <form onSubmit={handleSubmit(() => setStep(2))} className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="font-semibold text-stone-900 text-lg">Guest Details</h2>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Full Name *</label>
            <input {...register('fullName', { required: 'Full name is required' })} className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 ${errors.fullName ? 'border-red-400' : 'border-stone-200 focus:border-amber-600'}`} placeholder="Amelia Richardson" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Email *</label>
            <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} type="email" className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 ${errors.email ? 'border-red-400' : 'border-stone-200 focus:border-amber-600'}`} placeholder="amelia@email.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Phone *</label>
            <input {...register('phone', { required: 'Phone is required' })} className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 ${errors.phone ? 'border-red-400' : 'border-stone-200 focus:border-amber-600'}`} placeholder="+60 12-345 6789" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Address</label>
            <input {...register('address')} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600" placeholder="Kuala Lumpur, Malaysia" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Special Requests</label>
            <textarea {...register('specialRequests')} rows={3} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 resize-none" placeholder="Any special requirements or requests..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setStep(0)} className="flex-1 border border-stone-200 text-stone-700 font-semibold py-3 rounded-xl hover:bg-stone-50 transition-colors">Back</button>
            <button type="submit" className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-xl transition-colors">Review Booking</button>
          </div>
        </form>
      )}

      {/* Step 2: Review */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-semibold text-stone-900 text-lg mb-5">Review & Confirm</h2>
          {room && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-4">
                <img src={room.images[0]} alt={room.name} className="w-20 h-16 object-cover rounded-lg shrink-0" />
                <div>
                  <div className="font-semibold text-stone-900">{room.name}</div>
                  <div className="text-stone-500 text-sm">Room {room.roomNumber} · {room.type}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-stone-50 rounded-xl p-3"><div className="text-stone-400 text-xs mb-1">Check-in</div><div className="font-medium">{checkIn}</div></div>
                <div className="bg-stone-50 rounded-xl p-3"><div className="text-stone-400 text-xs mb-1">Check-out</div><div className="font-medium">{checkOut}</div></div>
                <div className="bg-stone-50 rounded-xl p-3"><div className="text-stone-400 text-xs mb-1">Guests</div><div className="font-medium">{guests}</div></div>
                <div className="bg-stone-50 rounded-xl p-3"><div className="text-stone-400 text-xs mb-1">Nights</div><div className="font-medium">{nights}</div></div>
              </div>
              <div className="border-t border-stone-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-stone-600"><span>RM {room.pricePerNight.toLocaleString()} × {nights} nights</span><span>RM {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-stone-600"><span>Taxes (15%)</span><span>RM {taxes.toLocaleString()}</span></div>
                <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-100 text-base"><span>Total</span><span>RM {total.toLocaleString()}</span></div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="flex-1 border border-stone-200 text-stone-700 font-semibold py-3 rounded-xl hover:bg-stone-50 transition-colors">Back</button>
                <button onClick={handleConfirm} disabled={loading} className="flex-1 bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors">
                  {loading ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
