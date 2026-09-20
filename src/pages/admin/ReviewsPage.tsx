import { useState } from 'react';
import { Star, CheckCircle, EyeOff, Trash2 } from 'lucide-react';
import { mockReviews } from '../../data/mockData';
import type { Review } from '../../data/mockData';
import { showToast } from '../../components/common/Toast';
import { StatusBadge } from '../../components/common/StatusBadge';

export function ReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);

  const updateStatus = (id: number, status: Review['status']) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    showToast(`Review ${status}.`, 'success');
  };

  const deleteReview = (id: number) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast('Review deleted.', 'info');
  };

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">Reviews</h1>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-stone-100 p-5 mb-6 flex items-center gap-6">
        <div className="text-center">
          <div className="font-display text-4xl font-bold text-stone-900">{avgRating}</div>
          <div className="flex gap-0.5 justify-center my-1">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className={i < Math.round(Number(avgRating)) ? 'text-amber-500' : 'text-stone-200'} fill="currentColor" />)}
          </div>
          <div className="text-stone-400 text-xs">{reviews.length} reviews</div>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5,4,3,2,1].map(stars => {
            const count = reviews.filter(r => r.rating === stars).length;
            const pct = Math.round((count / reviews.length) * 100);
            return (
              <div key={stars} className="flex items-center gap-2 text-xs text-stone-500">
                <span className="w-4 text-right">{stars}</span>
                <Star size={10} className="text-amber-400" fill="currentColor" />
                <div className="flex-1 bg-stone-100 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-stone-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {r.guestName.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-stone-900">{r.guestName}</div>
                  <div className="text-stone-400 text-xs">{r.roomName} · {r.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge status={r.status} />
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={12} className="text-amber-500" fill="currentColor" />)}
                </div>
              </div>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mt-3 italic">"{r.comment}"</p>
            <div className="flex gap-2 mt-4 pt-3 border-t border-stone-50">
              {r.status !== 'approved' && (
                <button onClick={() => updateStatus(r.id, 'approved')} className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors">
                  <CheckCircle size={12} /> Approve
                </button>
              )}
              {r.status !== 'hidden' && (
                <button onClick={() => updateStatus(r.id, 'hidden')} className="flex items-center gap-1.5 text-xs text-stone-600 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors">
                  <EyeOff size={12} /> Hide
                </button>
              )}
              <button onClick={() => deleteReview(r.id)} className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
