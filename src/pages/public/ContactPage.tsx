import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { showToast } from '../../components/common/Toast';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '123 Forest Lane, Tanah Rata\nCameron Highlands, Pahang 39200' },
  { icon: Phone, label: 'Phone', value: '+60 9-555 1234' },
  { icon: Mail, label: 'Email', value: 'hello@greenhaven.my' },
  { icon: Clock, label: 'Check-in / Check-out', value: 'Check-in: 2:00 PM\nCheck-out: 11:00 AM' },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    showToast('Message sent! We\'ll get back to you within 24 hours.', 'success');
    setForm({ name: '', email: '', phone: '', message: '' });
    setSending(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">Get In Touch</p>
        <h1 className="font-display text-4xl font-bold text-stone-900">Contact Us</h1>
        <p className="text-stone-500 mt-2 max-w-lg mx-auto">Have questions? We're happy to help plan your perfect stay.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-6">
          {contactInfo.map(info => (
            <div key={info.label} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                <info.icon size={18} className="text-amber-700" />
              </div>
              <div>
                <div className="font-semibold text-stone-800 text-sm mb-1">{info.label}</div>
                <div className="text-stone-600 text-sm whitespace-pre-line">{info.value}</div>
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div className="bg-stone-100 rounded-2xl h-52 flex items-center justify-center">
            <div className="text-center text-stone-400">
              <MapPin size={32} className="mx-auto mb-2 text-amber-600" />
              <p className="text-sm text-stone-500 font-medium">Cameron Highlands, Pahang</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sm:p-8">
          <h2 className="font-semibold text-stone-900 text-lg mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Name *</label>
              <input
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Phone</label>
              <input
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
                placeholder="+60 12-345 6789"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Message *</label>
              <textarea
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                rows={5}
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Send size={16} />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
