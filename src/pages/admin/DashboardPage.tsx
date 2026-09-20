import { useState, useEffect } from 'react';
import { BookOpen, LogIn, LogOut, BedDouble, TrendingUp, DollarSign, Plus, Calendar } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDashboardStats } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Skeleton } from '../../components/common/Skeleton';
import { mockDashboardStats, mockBookings } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<typeof mockDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(s => { setStats(s); setLoading(false); });
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const summaryCards = stats ? [
    { label: 'Total Bookings', value: stats.totalBookings, icon: BookOpen, trend: '+8%', color: 'bg-blue-50 text-blue-700' },
    { label: "Today's Check-ins", value: stats.todayCheckIns, icon: LogIn, trend: '+2', color: 'bg-green-50 text-green-700' },
    { label: "Today's Check-outs", value: stats.todayCheckOuts, icon: LogOut, trend: '', color: 'bg-orange-50 text-orange-700' },
    { label: 'Available Rooms', value: stats.availableRooms, icon: BedDouble, trend: '', color: 'bg-purple-50 text-purple-700' },
    { label: 'Occupancy Rate', value: `${stats.occupancyRate}%`, icon: TrendingUp, trend: '+5%', color: 'bg-amber-50 text-amber-700' },
    { label: 'Monthly Revenue', value: `RM ${stats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, trend: '+12%', color: 'bg-emerald-50 text-emerald-700' },
  ] : [];

  const recentBookings = mockBookings.slice(0, 5);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-900">{greeting()}, Admin</h1>
          <p className="text-stone-500 text-sm mt-0.5">{new Date().toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Summary cards */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {summaryCards.map(card => (
            <div key={card.label} className="bg-white rounded-2xl border border-stone-100 p-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                <card.icon size={16} />
              </div>
              <div className="font-bold text-stone-900 text-lg leading-tight">{card.value}</div>
              <div className="text-stone-500 text-xs mt-0.5">{card.label}</div>
              {card.trend && <div className="text-green-600 text-xs font-medium mt-1">{card.trend} vs last month</div>}
            </div>
          ))}
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-stone-100 p-5">
          <h2 className="font-semibold text-stone-900 mb-4">Revenue Overview</h2>
          {stats ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={stats.revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b45309" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#b45309" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ece8" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} tickFormatter={v => `RM${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: any) => [`RM ${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: '1px solid #e8e0d4', fontSize: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#b45309" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : <Skeleton className="h-52" />}
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-5">
          <h2 className="font-semibold text-stone-900 mb-4">Monthly Bookings</h2>
          {stats ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.bookingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ece8" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e8e0d4', fontSize: '12px' }} />
                <Bar dataKey="bookings" fill="#b45309" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <Skeleton className="h-52" />}
        </div>
      </div>

      {/* Recent bookings + Quick actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
            <h2 className="font-semibold text-stone-900">Recent Bookings</h2>
            <button onClick={() => navigate('/admin/bookings')} className="text-amber-700 hover:text-amber-800 text-xs font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-stone-400 text-xs border-b border-stone-100">
                <th className="text-left px-5 py-3 font-medium">Booking ID</th>
                <th className="text-left px-5 py-3 font-medium">Guest</th>
                <th className="text-left px-5 py-3 font-medium">Room</th>
                <th className="text-left px-5 py-3 font-medium">Check-in</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr></thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-stone-600">{b.id}</td>
                    <td className="px-5 py-3.5 font-medium text-stone-900">{b.guestName}</td>
                    <td className="px-5 py-3.5 text-stone-600">{b.roomNumber}</td>
                    <td className="px-5 py-3.5 text-stone-500">{b.checkIn}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-stone-100 p-5">
          <h2 className="font-semibold text-stone-900 mb-4">Quick Actions</h2>
          <div className="space-y-2.5">
            {[
              { label: 'Add Booking', icon: Plus, path: '/admin/bookings' },
              { label: 'Add Room', icon: BedDouble, path: '/admin/rooms' },
              { label: 'View Calendar', icon: Calendar, path: '/admin/calendar' },
            ].map(action => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="w-full flex items-center gap-3 px-4 py-3 border border-stone-200 rounded-xl hover:bg-amber-50 hover:border-amber-200 text-stone-700 hover:text-amber-700 text-sm font-medium transition-colors"
              >
                <action.icon size={16} className="text-amber-600" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
