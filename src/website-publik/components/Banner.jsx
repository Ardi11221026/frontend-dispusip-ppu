import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bannerStorage } from '../../shared/utils/bannerStorage';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides] = useState(() => bannerStorage.getAll());

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    if (!slides.length) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (!slides.length) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides.length) {
    return (
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-900 to-emerald-800">
        <div className="flex h-[280px] w-full items-center justify-center sm:h-[360px] lg:h-[460px]">
          <p className="text-sm font-semibold text-white/90 sm:text-base">Banner belum tersedia</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-900 to-emerald-800">
      <div className="relative h-[300px] w-full sm:h-[420px] lg:h-[560px] xl:h-[640px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="px-4 text-center">
                <p className="text-xs font-semibold text-white sm:text-sm md:text-lg">Selamat Datang di Website</p>
                <h2 className="text-xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl uppercase">Dinas Perpustakaan<br />Dan Arsip</h2>
                <p className="mt-2 text-sm font-semibold text-white sm:text-base md:text-lg">Kabupaten Penajam Paser Utara</p>
              </div>
            </div>
          </div>
        ))}

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 transition duration-200 hover:bg-orange-500 sm:left-4 sm:p-2"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="text-gray-900 sm:h-8 sm:w-8" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 transition duration-200 hover:bg-orange-500 sm:right-4 sm:p-2"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="text-gray-900 sm:h-8 sm:w-8" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-4 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition duration-300 sm:h-3 sm:w-3 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
