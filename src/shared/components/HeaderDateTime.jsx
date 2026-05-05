import { useEffect, useState } from 'react';
import { CalendarDays, Clock3 } from 'lucide-react';

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const capitalizeFirst = (value) => value.charAt(0).toUpperCase() + value.slice(1);

export default function HeaderDateTime({ compact = false, className = '' }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();

    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 shadow-sm ${className}`.trim()}>
        <Clock3 size={14} className="text-emerald-700" />
        <span className="font-mono text-xs font-semibold text-slate-900">{timeFormatter.format(now)}</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm ${className}`.trim()}>
      <div className="hidden items-center gap-2 text-sm text-slate-700 2xl:flex">
        <CalendarDays size={16} className="text-blue-700" />
        <span className="whitespace-nowrap">{capitalizeFirst(dateFormatter.format(now))}</span>
      </div>
      <div className="hidden h-7 w-px bg-slate-200 2xl:block" />
      <div className="flex items-center gap-2 font-mono text-sm font-semibold text-slate-900">
        <Clock3 size={16} className="text-emerald-700" />
        <span>{timeFormatter.format(now)}</span>
      </div>
    </div>
  );
}