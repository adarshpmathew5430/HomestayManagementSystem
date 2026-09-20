import { useState } from 'react';
import { Upload, Trash2, Star } from 'lucide-react';
import { mockGallery } from '../../data/mockData';
import type { GalleryImage } from '../../data/mockData';
import { showToast } from '../../components/common/Toast';

const categories = ['All', 'Rooms', 'Property', 'Nature', 'Food', 'Experiences'] as const;

export function GalleryAdminPage() {
  const [images, setImages] = useState(mockGallery);
  const [category, setCategory] = useState<string>('All');

  const filtered = category === 'All' ? images : images.filter(g => g.category === category);

  const deleteImage = (id: number) => {
    setImages(prev => prev.filter(g => g.id !== id));
    showToast('Image deleted.', 'info');
  };

  const toggleFeatured = (id: number) => {
    setImages(prev => prev.map(g => g.id === id ? { ...g, featured: !g.featured } : g));
    showToast('Featured status updated.', 'success');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-stone-900">Gallery Management</h1>
        <button onClick={() => showToast('Upload feature coming soon.', 'info')} className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Upload size={16} /> Upload Images
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-amber-700 text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'}`}>{cat}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(img => (
          <div key={img.id} className="group bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
            <div className="relative h-44">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              {img.featured && (
                <div className="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> Featured
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="font-medium text-stone-800 text-sm truncate mb-0.5">{img.title}</div>
              <div className="text-stone-400 text-xs mb-3">{img.category}</div>
              <div className="flex gap-2">
                <button onClick={() => toggleFeatured(img.id)} className={`flex-1 text-xs py-1.5 rounded-lg transition-colors ${img.featured ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}`}>
                  {img.featured ? 'Unfeature' : 'Feature'}
                </button>
                <button onClick={() => deleteImage(img.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Upload placeholder */}
        <button onClick={() => showToast('Upload feature coming soon.', 'info')} className="border-2 border-dashed border-stone-200 rounded-2xl h-60 flex flex-col items-center justify-center text-stone-400 hover:border-amber-400 hover:text-amber-600 transition-colors">
          <Upload size={24} className="mb-2" />
          <span className="text-sm font-medium">Add Image</span>
        </button>
      </div>
    </div>
  );
}
