import { useState } from 'react';
import { Save } from 'lucide-react';
import { showToast } from '../../components/common/Toast';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-5">
      <h2 className="font-semibold text-stone-900 text-base mb-5 pb-3 border-b border-stone-100">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export function SettingsPage() {
  const [homestay, setHomestay] = useState({
    name: 'GreenHaven Homestay',
    address: '123 Forest Lane, Tanah Rata, Cameron Highlands, Pahang 39200',
    phone: '+60 9-555 1234',
    email: 'hello@greenhaven.my',
  });

  const [booking, setBooking] = useState({
    checkInTime: '14:00',
    checkOutTime: '11:00',
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in.',
  });

  const [payment, setPayment] = useState({ currency: 'MYR', taxRate: 15 });

  const save = () => showToast('Settings saved successfully.', 'success');

  const inputCls = 'w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600';

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-stone-900">Settings</h1>
        <button onClick={save} className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Save size={14} /> Save Changes
        </button>
      </div>

      <Section title="Homestay Information">
        <div className="space-y-4">
          <Field label="Property Name">
            <input value={homestay.name} onChange={e => setHomestay(p => ({ ...p, name: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Address">
            <input value={homestay.address} onChange={e => setHomestay(p => ({ ...p, address: e.target.value }))} className={inputCls} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone">
              <input value={homestay.phone} onChange={e => setHomestay(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
            </Field>
            <Field label="Email">
              <input value={homestay.email} onChange={e => setHomestay(p => ({ ...p, email: e.target.value }))} className={inputCls} />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Booking Settings">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Check-in Time">
              <input type="time" value={booking.checkInTime} onChange={e => setBooking(p => ({ ...p, checkInTime: e.target.value }))} className={inputCls} />
            </Field>
            <Field label="Check-out Time">
              <input type="time" value={booking.checkOutTime} onChange={e => setBooking(p => ({ ...p, checkOutTime: e.target.value }))} className={inputCls} />
            </Field>
          </div>
          <Field label="Cancellation Policy">
            <textarea value={booking.cancellationPolicy} onChange={e => setBooking(p => ({ ...p, cancellationPolicy: e.target.value }))} rows={3} className={`${inputCls} resize-none`} />
          </Field>
        </div>
      </Section>

      <Section title="Payment Settings">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Currency">
            <select value={payment.currency} onChange={e => setPayment(p => ({ ...p, currency: e.target.value }))} className={inputCls}>
              <option>MYR</option>
              <option>USD</option>
              <option>SGD</option>
            </select>
          </Field>
          <Field label="Tax Rate (%)">
            <input type="number" min={0} max={30} value={payment.taxRate} onChange={e => setPayment(p => ({ ...p, taxRate: Number(e.target.value) }))} className={inputCls} />
          </Field>
        </div>
      </Section>

      <Section title="Admin Profile">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold">A</div>
            <div>
              <div className="font-semibold text-stone-900">Admin</div>
              <div className="text-stone-500 text-sm">admin@greenhaven.my</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name"><input defaultValue="Admin" className={inputCls} /></Field>
            <Field label="Email"><input defaultValue="admin@greenhaven.my" className={inputCls} /></Field>
            <Field label="New Password"><input type="password" placeholder="••••••••" className={inputCls} /></Field>
            <Field label="Confirm Password"><input type="password" placeholder="••••••••" className={inputCls} /></Field>
          </div>
        </div>
      </Section>
    </div>
  );
}
