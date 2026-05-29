import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const galleryImages = [
  { src: '/items/pictures/dish-04.jpg', alt: 'מגש גבינות מפואר', span: 'col-span-1 row-span-1' },
  { src: '/items/pictures/dish-05.jpg', alt: 'מגש ירקות טרי', span: 'col-span-1 row-span-1' },
  { src: '/items/pictures/dish-14.jpg', alt: 'סלטים ומנות צבעוניות', span: 'col-span-1 md:col-span-2 row-span-1' },
  { src: '/items/pictures/dish-20.jpg', alt: 'מאפים מסורתיים', span: 'col-span-1 row-span-1' },
  { src: '/items/pictures/dish-22.jpg', alt: 'קרואסונים ממולאים', span: 'col-span-1 row-span-1' },
  { src: '/items/pictures/dish-06.jpg', alt: 'שולחן ערוך לאירוע', span: 'col-span-1 row-span-1' },
  { src: '/items/pictures/dish-11.jpg', alt: 'מגשי אירוח מפוארים', span: 'col-span-1 row-span-1' },
  { src: '/items/pictures/dish-24.jpg', alt: 'מנות מיוחדות', span: 'col-span-1 md:col-span-2 row-span-1' },
  { src: '/items/pictures/dish-30.jpg', alt: 'הגשה אסתטית', span: 'col-span-1 row-span-1' },
  { src: '/items/pictures/dish-09.jpg', alt: 'שולחן מתוק', span: 'col-span-1 row-span-1' },
];

export default function Gallery() {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <section id="gallery" ref={ref} className="py-40 md:py-64 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-gold" />
            <span className="text-gold font-semibold text-lg tracking-wider">מהמטבח שלנו</span>
            <div className="w-10 h-[2px] bg-gold" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand">
            גלריה
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxIndex(i)}
              className={`${img.span} relative rounded-xl overflow-hidden cursor-pointer group ${
                isVisible ? `animate-scaleIn delay-${((i % 4) + 1) * 100}` : 'opacity-0'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-48 md:h-64 object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/40 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 left-6 w-10 h-10 bg-white/10 hover:bg-white/20 focus:ring-2 focus:ring-gold focus:outline-none rounded-full flex items-center justify-center text-white text-2xl transition-colors"
            aria-label="סגור"
          >
            ✕
          </button>

          {/* Prev Button (Right side in RTL) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 focus:ring-2 focus:ring-gold focus:outline-none rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="הקודם"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl animate-scaleIn object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Button (Left side in RTL) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 focus:ring-2 focus:ring-gold focus:outline-none rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="הבא"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
