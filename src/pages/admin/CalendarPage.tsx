import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockBookings, mockRooms } from '../../data/mockData';

type View = 'month' | 'week' | 'day';

const COLORS = ['bg-amber-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-rose-500'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function CalendarPage() {
  const today = new Date();
  const [view, setView] = useState<View>('month');
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const { year, month } = current;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = new Date(year, month).toLocaleString('en', { month: 'long', year: 'numeric' });

  const prev = () => setCurrent(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  const next = () => setCurrent(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });

  const getBookingsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockBookings.filter(b => b.checkIn <= dateStr && b.checkOut > dateStr);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-stone-900">Availability Calendar</h1>
        <div className="flex gap-1 bg-stone-100 p-1 rounded-xl">
          {(['month', 'week', 'day'] as View[]).map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${view === v ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}>{v}</button>
          ))}
        </div>
      </div>

      {/* Rooms legend */}
      <div className="flex flex-wrap gap-3 mb-5">
        {mockRooms.map((room, i) => (
          <div key={room.id} className="flex items-center gap-2 text-sm text-stone-600">
            <div className={`w-3 h-3 rounded-full ${COLORS[i % COLORS.length]}`} />
            <span>{room.roomNumber} – {room.name}</span>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {/* Nav */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <button onClick={prev} className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors"><ChevronLeft size={18} /></button>
          <h2 className="font-semibold text-stone-900">{monthName}</h2>
          <button onClick={next} className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors"><ChevronRight size={18} /></button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-stone-100">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs font-semibold text-stone-400 py-2.5">{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[80px] border-b border-r border-stone-50 bg-stone-50/30" />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const dayBookings = getBookingsForDay(day);
            const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
            return (
              <div key={day} className={`min-h-[80px] border-b border-r border-stone-50 p-1.5 ${isToday ? 'bg-amber-50' : 'hover:bg-stone-50'} transition-colors`}>
                <div className={`text-xs font-semibold mb-1 w-5 h-5 flex items-center justify-center rounded-full ${isToday ? 'bg-amber-700 text-white' : 'text-stone-600'}`}>{day}</div>
                <div className="space-y-0.5">
                  {dayBookings.slice(0, 2).map((b, bi) => {
                    const roomIndex = mockRooms.findIndex(r => r.id === b.roomId);
                    return (
                      <div key={b.id} className={`${COLORS[roomIndex % COLORS.length]} text-white text-[10px] px-1.5 py-0.5 rounded-md truncate font-medium`}>
                        {b.roomNumber}: {b.guestName.split(' ')[0]}
                      </div>
                    );
                  })}
                  {dayBookings.length > 2 && <div className="text-[10px] text-stone-400">+{dayBookings.length - 2} more</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming check-ins table */}
      <div className="mt-6 bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100 font-semibold text-stone-900">Upcoming Check-ins</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-stone-400 text-xs border-b border-stone-100 bg-stone-50/50">
              <th className="text-left px-5 py-3 font-medium">Booking ID</th>
              <th className="text-left px-5 py-3 font-medium">Guest</th>
              <th className="text-left px-5 py-3 font-medium">Room</th>
              <th className="text-left px-5 py-3 font-medium">Check-in</th>
              <th className="text-left px-5 py-3 font-medium">Check-out</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
            </tr></thead>
            <tbody>
              {mockBookings.filter(b => b.status === 'confirmed').map(b => (
                <tr key={b.id} className="border-b border-stone-50 hover:bg-stone-50/50">
                  <td className="px-5 py-3 font-mono text-xs text-stone-600">{b.id}</td>
                  <td className="px-5 py-3 font-medium text-stone-900">{b.guestName}</td>
                  <td className="px-5 py-3 text-stone-600">{b.roomName}</td>
                  <td className="px-5 py-3 text-stone-500">{b.checkIn}</td>
                  <td className="px-5 py-3 text-stone-500">{b.checkOut}</td>
                  <td className="px-5 py-3 text-green-700 text-xs font-medium">Confirmed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
