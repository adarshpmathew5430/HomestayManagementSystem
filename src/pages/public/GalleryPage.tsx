import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockGallery } from '../../data/mockData';

const categories = ['All', 'Rooms', 'Property', 'Nature', 'Food', 'Experiences'];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === 'All' ? mockGallery : mockGallery.filter(g => g.category === activeCategory);

  const handlePrev = () => setLightbox(prev => prev !== null ? Math.max(0, prev - 1) : null);
  const handleNext = () => setLightbox(prev => prev !== null ? Math.min(filtered.length - 1, prev + 1) : null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">Visual Tour</p>
        <h1 className="font-display text-4xl font-bold text-stone-900">Gallery</h1>
        <p className="text-stone-500 mt-2">A glimpse of life at GreenHaven Homestay.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((img, i) => (
          <div
            key={img.id}
            className="break-inside-avoid overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => setLightbox(i)}
          >
            <div className="relative">
              <img
                src={img.url}
                alt={img.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ aspectRatio: i % 3 === 0 ? '4/5' : '4/3' }}
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-colors flex items-end">
                <div className="p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.title}
                </div>
              </div>
              {img.featured && (
                <div className="absolute top-2 right-2 bg-amber-700 text-white text-xs px-2 py-0.5 rounded-full">Featured</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-stone-900/95 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-stone-300" onClick={() => setLightbox(null)}>
            <X size={24} />
          </button>
          <button className="absolute left-4 text-white hover:text-stone-300 disabled:opacity-30" disabled={lightbox === 0} onClick={e => { e.stopPropagation(); handlePrev(); }}>
            <ChevronLeft size={36} />
          </button>
          <div className="max-h-[85vh] max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox].url} alt={filtered[lightbox].title} className="max-h-[80vh] w-full object-contain rounded-xl" />
            <p className="text-stone-300 text-sm text-center mt-3">{filtered[lightbox].title}</p>
          </div>
          <button className="absolute right-4 text-white hover:text-stone-300 disabled:opacity-30" disabled={lightbox === filtered.length - 1} onClick={e => { e.stopPropagation(); handleNext(); }}>
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
}
