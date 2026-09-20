import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Leaf } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-stone-900 text-lg leading-tight">
              Green<span className="text-amber-700">Haven</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-amber-700 bg-amber-50' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/my-bookings" className="text-sm text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors">
              My Bookings
            </Link>
            <button
              onClick={() => navigate('/rooms')}
              className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              Book Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded-lg hover:bg-stone-50" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'text-amber-700 bg-amber-50' : 'text-stone-600'}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <hr className="my-2 border-stone-100" />
          <Link to="/my-bookings" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm text-stone-600">My Bookings</Link>
          <Link to="/rooms" onClick={() => setMenuOpen(false)} className="bg-amber-700 text-white text-sm font-medium px-3 py-2.5 rounded-xl text-center">Book Now</Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                <Leaf size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">GreenHaven Homestay</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              A peaceful retreat nestled in nature. Experience warm hospitality, comfortable rooms, and unforgettable moments.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map(l => <li key={l.to}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>123 Forest Lane, Cameron Highlands</li>
              <li>Pahang, Malaysia 39200</li>
              <li>+60 9-555 1234</li>
              <li>hello@greenhaven.my</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-stone-800 text-sm text-stone-500 text-center">
          © 2026 GreenHaven Homestay. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
