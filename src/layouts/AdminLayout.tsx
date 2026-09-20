import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, BookOpen, BedDouble, Tag, Users, CreditCard,
  Star, Image, BarChart3, Settings, Menu, X, LogOut, ChevronRight, Leaf,
} from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/bookings', icon: BookOpen, label: 'Bookings' },
  { to: '/admin/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/admin/rooms', icon: BedDouble, label: 'Rooms' },
  { to: '/admin/room-types', icon: Tag, label: 'Room Types' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
  { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { to: '/admin/reviews', icon: Star, label: 'Reviews' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <>
      {open && <div className="fixed inset-0 bg-stone-900/30 z-30 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 w-60 bg-stone-900 flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-600 rounded-md flex items-center justify-center">
              <Leaf size={14} className="text-white" />
            </div>
            <span className="font-display font-semibold text-white text-sm">GreenHaven</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-stone-400 hover:text-white"><X size={16} /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-amber-700 text-white' : 'text-stone-400 hover:text-white hover:bg-stone-800'}`
              }
              onClick={onClose}
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-stone-800 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
            <div>
              <div className="text-white text-sm font-medium">Admin</div>
              <div className="text-stone-500 text-xs">admin@greenhaven.my</div>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 text-stone-400 hover:text-white text-sm px-2 py-1.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <LogOut size={14} />
            Back to Site
          </button>
        </div>
      </aside>
    </>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-stone-100 flex items-center px-4 sm:px-6 gap-4 shrink-0">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-stone-50 text-stone-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <div className="text-sm text-stone-500">
            {new Date().toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
