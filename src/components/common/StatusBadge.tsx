type Status = string;

const statusConfig: Record<string, { label: string; classes: string }> = {
  confirmed: { label: 'Confirmed', classes: 'bg-green-100 text-green-700' },
  pending: { label: 'Pending', classes: 'bg-amber-100 text-amber-700' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-700' },
  completed: { label: 'Completed', classes: 'bg-blue-100 text-blue-700' },
  paid: { label: 'Paid', classes: 'bg-green-100 text-green-700' },
  failed: { label: 'Failed', classes: 'bg-red-100 text-red-700' },
  refunded: { label: 'Refunded', classes: 'bg-purple-100 text-purple-700' },
  available: { label: 'Available', classes: 'bg-green-100 text-green-700' },
  occupied: { label: 'Occupied', classes: 'bg-red-100 text-red-700' },
  maintenance: { label: 'Maintenance', classes: 'bg-orange-100 text-orange-700' },
  blocked: { label: 'Blocked', classes: 'bg-stone-100 text-stone-600' },
  approved: { label: 'Approved', classes: 'bg-green-100 text-green-700' },
  hidden: { label: 'Hidden', classes: 'bg-stone-100 text-stone-600' },
};

export function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status] ?? { label: status, classes: 'bg-stone-100 text-stone-600' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}
