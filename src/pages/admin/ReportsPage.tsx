import { useState } from 'react';
import { Download } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockDashboardStats } from '../../data/mockData';
import { showToast } from '../../components/common/Toast';

const reports = ['Revenue', 'Bookings', 'Occupancy', 'Room Performance'];

export function ReportsPage() {
  const [activeReport, setActiveReport] = useState('Revenue');
  const [dateRange, setDateRange] = useState({ from: '2026-09-01', to: '2026-09-14' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-stone-900">Reports</h1>
        <button onClick={() => showToast('Exporting data...', 'info')} className="flex items-center gap-2 border border-stone-200 text-stone-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-stone-50 transition-colors">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl border border-stone-100 p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">From</label>
          <input type="date" value={dateRange.from} onChange={e => setDateRange(p => ({ ...p, from: e.target.value }))} className="border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">To</label>
          <input type="date" value={dateRange.to} onChange={e => setDateRange(p => ({ ...p, to: e.target.value }))} className="border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30" />
        </div>
      </div>

      {/* Report tabs */}
      <div className="flex gap-1 bg-stone-100 p-1 rounded-xl w-fit mb-6">
        {reports.map(r => (
          <button key={r} onClick={() => setActiveReport(r)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeReport === r ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}>{r}</button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-stone-100 p-5">
          <h3 className="font-semibold text-stone-900 mb-4">Revenue (Daily)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockDashboardStats.revenueData}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b45309" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#b45309" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece8" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#78716c' }} axisLine={false} tickLine={false} tickFormatter={v => `RM${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`RM ${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: '1px solid #e8e0d4', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="#b45309" strokeWidth={2} fill="url(#grad1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-5">
          <h3 className="font-semibold text-stone-900 mb-4">Monthly Bookings</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockDashboardStats.bookingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece8" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e8e0d4', fontSize: '12px' }} />
              <Bar dataKey="bookings" fill="#92400e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-5 xl:col-span-2">
          <h3 className="font-semibold text-stone-900 mb-4">Occupancy Rate (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockDashboardStats.occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece8" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#78716c' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v: any) => [`${v}%`, 'Occupancy']} contentStyle={{ borderRadius: '12px', border: '1px solid #e8e0d4', fontSize: '12px' }} />
              <Line type="monotone" dataKey="rate" stroke="#b45309" strokeWidth={2.5} dot={{ r: 4, fill: '#b45309' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
