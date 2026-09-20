import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { mockCustomers, mockBookings } from '../../data/mockData';
import type { Customer } from '../../data/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';

export function CustomersPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = mockCustomers.filter(c => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  const customerBookings = selected ? mockBookings.filter(b => b.guestEmail === selected.email) : [];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">Customers</h1>

      <div className="bg-white rounded-2xl border border-stone-100 p-4 mb-5">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 max-w-sm" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-stone-400 text-xs border-b border-stone-100 bg-stone-50/50">
              <th className="text-left px-5 py-3 font-medium">Customer</th>
              <th className="text-left px-5 py-3 font-medium">Email</th>
              <th className="text-left px-5 py-3 font-medium">Phone</th>
              <th className="text-left px-5 py-3 font-medium">Bookings</th>
              <th className="text-left px-5 py-3 font-medium">Total Spent</th>
              <th className="text-left px-5 py-3 font-medium">Last Stay</th>
            </tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} onClick={() => setSelected(c)} className="border-b border-stone-50 hover:bg-stone-50/50 cursor-pointer transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-medium text-stone-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-stone-500">{c.email}</td>
                  <td className="px-5 py-3.5 text-stone-500">{c.phone}</td>
                  <td className="px-5 py-3.5 text-stone-700">{c.bookings}</td>
                  <td className="px-5 py-3.5 font-medium">RM {c.totalSpent.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-stone-500">{c.lastStay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-stone-900/30" onClick={() => setSelected(null)} />
          <div className="relative ml-auto w-full max-w-md bg-white h-full overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <h2 className="font-semibold text-stone-900">Customer Details</h2>
              <button onClick={() => setSelected(null)}><X size={18} /></button>
            </div>
            <div className="p-5 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center text-xl font-bold">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-lg">{selected.name}</div>
                  <div className="text-stone-500 text-sm">{selected.address}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['Email', selected.email],
                  ['Phone', selected.phone],
                  ['Bookings', String(selected.bookings)],
                  ['Total Spent', `RM ${selected.totalSpent.toLocaleString()}`],
                  ['Last Stay', selected.lastStay],
                ].map(([k, v]) => (
                  <div key={k} className={`bg-stone-50 rounded-xl p-3 ${k === 'Email' ? 'col-span-2' : ''}`}>
                    <div className="text-xs text-stone-400">{k}</div>
                    <div className="font-medium text-stone-900 mt-0.5">{v}</div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-stone-700 text-sm mb-2">Booking History</h3>
                <div className="space-y-2">
                  {customerBookings.length === 0 ? (
                    <p className="text-stone-400 text-sm">No bookings found.</p>
                  ) : customerBookings.map(b => (
                    <div key={b.id} className="bg-stone-50 rounded-xl p-3 text-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-stone-900">{b.roomName}</div>
                          <div className="text-stone-400 text-xs">{b.checkIn} → {b.checkOut}</div>
                        </div>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="font-semibold text-amber-700 text-sm mt-1">RM {b.total.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
