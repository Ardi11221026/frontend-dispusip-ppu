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

export default function HeaderDateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();

    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-slate-700">
        <CalendarDays size={16} className="text-blue-700" />
        <span>{capitalizeFirst(dateFormatter.format(now))}</span>
      </div>
      <div className="h-7 w-px bg-slate-200" />
      <div className="flex items-center gap-2 font-mono text-sm font-semibold text-slate-900">
        <Clock3 size={16} className="text-emerald-700" />
        <span>{timeFormatter.format(now)}</span>
      </div>
    </div>
  );
}