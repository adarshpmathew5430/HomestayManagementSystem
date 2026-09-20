import { Leaf, Heart, Shield, Award, MapPin } from 'lucide-react';
import { UNSPLASH } from '../../data/mockData';

const whyUs = [
  { icon: Heart, title: 'Genuine Hospitality', desc: 'We treat every guest like family, going above and beyond to make your stay special.' },
  { icon: Leaf, title: 'Nature Connection', desc: 'Set amid lush highland greenery, we offer an authentic connection with the natural world.' },
  { icon: Shield, title: 'Safe & Comfortable', desc: 'Your safety and comfort are our top priorities, maintained to the highest standards.' },
  { icon: Award, title: 'Award-Winning Stay', desc: 'Recognized for exceptional hospitality by TripAdvisor and Airbnb for five consecutive years.' },
];

const amenities = ['High-Speed Wi-Fi', 'Daily Housekeeping', 'Farm Breakfast', 'BBQ Area', 'Garden Lounge', 'Fireplace', 'Library Corner', 'Secure Parking', 'Tour Arrangements', 'Airport Transfers'];

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 flex items-center overflow-hidden">
        <img src={UNSPLASH.property[0]} alt="GreenHaven" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-stone-900/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-amber-300 text-sm font-semibold uppercase tracking-widest mb-2">Our Story</p>
          <h1 className="font-display text-5xl font-bold">About GreenHaven</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-3">Our Beginning</p>
            <h2 className="font-display text-4xl font-bold text-stone-900 mb-6">A Family Dream, Shared With the World</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              GreenHaven Homestay began in 2014 when the Lim family — passionate about the natural beauty of Cameron Highlands — decided to open their highland home to travelers seeking an authentic, peaceful escape from city life.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              What started as two guest rooms has grown into a curated collection of five uniquely designed accommodations, each reflecting the warmth and character of the highlands we call home.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Every breakfast is cooked fresh. Every room is tended with care. Every guest is welcomed like a friend. That has never changed — and it never will.
            </p>
          </div>
          <div className="relative">
            <img src={UNSPLASH.property[1]} alt="Our property" className="w-full h-96 object-cover rounded-2xl" />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg">
              <div className="font-display text-3xl font-bold text-amber-700">12+</div>
              <div className="text-stone-600 text-sm">Years of Hospitality</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">The GreenHaven Difference</p>
            <h2 className="font-display text-4xl font-bold text-stone-900">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(w => (
              <div key={w.title} className="bg-white rounded-2xl p-6 border border-stone-100">
                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                  <w.icon size={20} className="text-amber-700" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{w.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-3">Where to Find Us</p>
            <h2 className="font-display text-4xl font-bold text-stone-900 mb-6">Our Location</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Situated at 1,500m above sea level in Cameron Highlands, Pahang, GreenHaven offers cool highland air, stunning tea plantation views, and easy access to hiking trails, strawberry farms, and local markets.
            </p>
            <div className="flex items-start gap-3 text-stone-700">
              <MapPin size={18} className="text-amber-700 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">123 Forest Lane, Tanah Rata</div>
                <div className="text-stone-500 text-sm">Cameron Highlands, Pahang 39200, Malaysia</div>
              </div>
            </div>
          </div>
          <div className="bg-stone-100 rounded-2xl h-80 flex items-center justify-center">
            <div className="text-center text-stone-400">
              <MapPin size={36} className="mx-auto mb-3 text-amber-600" />
              <p className="font-medium text-stone-600">Cameron Highlands</p>
              <p className="text-sm">1,500m above sea level</p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-200 text-sm font-semibold uppercase tracking-widest mb-3">What's Included</p>
          <h2 className="font-display text-4xl font-bold text-white mb-10">Property Amenities</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {amenities.map(a => (
              <span key={a} className="bg-amber-800/40 text-amber-100 text-sm px-4 py-2 rounded-full border border-amber-600/40">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
