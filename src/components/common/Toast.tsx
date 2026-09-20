import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X, AlertCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

let toastListeners: ((toast: ToastMessage) => void)[] = [];
let toastCounter = 0;

export function showToast(message: string, type: ToastType = 'success') {
  toastListeners.forEach(fn => fn({ id: ++toastCounter, type, message }));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (t: ToastMessage) => {
      setToasts(prev => [...prev, t]);
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 4000);
    };
    toastListeners.push(handler);
    return () => { toastListeners = toastListeners.filter(fn => fn !== handler); };
  }, []);

  const icons = { success: CheckCircle, error: XCircle, info: AlertCircle };
  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-amber-50 border-amber-200 text-amber-800',
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => {
        const Icon = icons[toast.type];
        return (
          <div key={toast.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg pointer-events-auto transition-all ${colors[toast.type]}`}>
            <Icon size={16} />
            <span className="text-sm font-medium">{toast.message}</span>
            <button onClick={() => setToasts(prev => prev.filter(x => x.id !== toast.id))} className="ml-1 opacity-60 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
