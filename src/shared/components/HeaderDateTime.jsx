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
      <div className={`inline-flex flex-col items-start rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 shadow-sm ${className}`.trim()}>
        <div className="flex items-center gap-1 text-[10px] text-slate-700">
          <CalendarDays size={12} className="text-blue-700" />
          <span className="max-w-[170px] truncate">{capitalizeFirst(dateFormatter.format(now))}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-1 font-mono text-xs font-semibold text-slate-900">
          <Clock3 size={12} className="text-emerald-700" />
          <span>{timeFormatter.format(now)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-start rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm ${className}`.trim()}>
      <div className="flex items-center gap-2 text-xs text-slate-700 xl:text-sm">
        <CalendarDays size={16} className="text-blue-700" />
        <span className="whitespace-nowrap">{capitalizeFirst(dateFormatter.format(now))}</span>
      </div>
      <div className="mt-1 flex items-center gap-2 font-mono text-sm font-semibold text-slate-900">
        <Clock3 size={16} className="text-emerald-700" />
        <span>{timeFormatter.format(now)}</span>
      </div>
    </div>
  );
}