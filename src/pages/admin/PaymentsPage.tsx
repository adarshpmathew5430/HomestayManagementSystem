import { useState } from 'react';
import { DollarSign, TrendingUp, Clock, RotateCcw, Search, Download } from 'lucide-react';
import { mockPayments } from '../../data/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';
import { showToast } from '../../components/common/Toast';

export function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const totalRevenue = mockPayments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const pending = mockPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const refunded = mockPayments.filter(p => p.status === 'refunded').reduce((s, p) => s + p.amount, 0);

  const summaryCards = [
    { label: 'Total Revenue', value: `RM ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-50 text-green-700' },
    { label: 'Paid', value: `RM ${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'bg-blue-50 text-blue-700' },
    { label: 'Pending', value: `RM ${pending.toLocaleString()}`, icon: Clock, color: 'bg-amber-50 text-amber-700' },
    { label: 'Refunded', value: `RM ${refunded.toLocaleString()}`, icon: RotateCcw, color: 'bg-red-50 text-red-700' },
  ];

  const filtered = mockPayments.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.id.toLowerCase().includes(q) || p.customerName.toLowerCase().includes(q) || p.bookingId.toLowerCase().includes(q);
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-stone-900">Payments</h1>
        <button onClick={() => showToast('Exporting CSV...', 'info')} className="flex items-center gap-2 border border-stone-200 text-stone-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-stone-50 transition-colors">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map(c => (
          <div key={c.label} className="bg-white rounded-2xl border border-stone-100 p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.color}`}>
              <c.icon size={16} />
            </div>
            <div className="font-bold text-stone-900 text-lg">{c.value}</div>
            <div className="text-stone-500 text-xs">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-stone-100 p-4 mb-5 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search payments..." className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none bg-white">
          <option value="">All Status</option>
          {['paid', 'pending', 'failed', 'refunded'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-stone-400 text-xs border-b border-stone-100 bg-stone-50/50">
              <th className="text-left px-5 py-3 font-medium">Payment ID</th>
              <th className="text-left px-5 py-3 font-medium">Booking ID</th>
              <th className="text-left px-5 py-3 font-medium">Customer</th>
              <th className="text-left px-5 py-3 font-medium">Amount</th>
              <th className="text-left px-5 py-3 font-medium">Method</th>
              <th className="text-left px-5 py-3 font-medium">Transaction ID</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
            </tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-stone-600">{p.id}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-amber-700">{p.bookingId}</td>
                  <td className="px-5 py-3.5 font-medium text-stone-900">{p.customerName}</td>
                  <td className="px-5 py-3.5 font-bold">RM {p.amount.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-stone-500">{p.method}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-stone-400">{p.transactionId}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={p.status} /></td>
                  <td className="px-5 py-3.5 text-stone-400 text-xs">{new Date(p.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
