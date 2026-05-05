import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * PageBanner - Reusable page header banner
 * @param {string} title - Page title displayed in the center
 * @param {Array} breadcrumbs - Array of { label, href } objects. Last item is current page (bold, no link).
 *
 * Example:
 * breadcrumbs={[
 *   { label: 'Beranda', href: '/' },
 *   { label: 'Profil', href: '#' },
 *   { label: 'Kelembagaan' },
 * ]}
 */
export default function PageBanner({ title, breadcrumbs = [] }) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-green-700 via-teal-600 to-blue-700">
      {/* Decorative building watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/banner/pusip1.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'luminosity',
        }}
      />

      {/* Decorative geometric shapes - left */}
      <div className="pointer-events-none absolute -left-8 top-0 h-full w-40 opacity-20">
        <div className="absolute left-0 top-0 h-24 w-24 rotate-45 bg-green-400" />
        <div className="absolute left-8 top-12 h-32 w-32 rotate-12 bg-blue-500" />
        <div className="absolute left-2 bottom-0 h-20 w-20 -rotate-12 bg-teal-400" />
      </div>

      {/* Decorative geometric shapes - right */}
      <div className="pointer-events-none absolute -right-8 top-0 h-full w-40 opacity-20">
        <div className="absolute right-0 top-0 h-28 w-28 -rotate-45 bg-blue-400" />
        <div className="absolute right-8 top-10 h-36 w-36 -rotate-12 bg-blue-600" />
        <div className="absolute right-2 bottom-0 h-20 w-20 rotate-12 bg-blue-300" />
      </div>

      {/* Wave bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 40"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-10 text-center sm:py-14">
        <h1 className="text-2xl font-bold text-white drop-shadow sm:text-4xl font-poppins">
          {title}
        </h1>

        {breadcrumbs.length > 0 && (
          <nav className="mt-3 flex items-center gap-1 text-xs text-white/80 font-poppins flex-wrap justify-center sm:text-sm">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <span key={index} className="flex items-center gap-1">
                  {index > 0 && (
                    <ChevronRight size={14} className="text-white/60" />
                  )}
                  {isLast ? (
                    <span className="font-bold text-white">{crumb.label}</span>
                  ) : (
                    <Link
                      to={crumb.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>
        )}
      </div>
    </section>
  );
}
