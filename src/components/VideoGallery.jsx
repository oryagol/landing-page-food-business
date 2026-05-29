import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const videos = [
  { src: '/items/videos/video2.mp4', title: 'שולחן שוק ליום הולדת' },
  { src: '/items/videos/video3.mp4', title: 'מגשי אירוח להתארגנות כלה' },
  { src: '/items/videos/video4.mp4', title: 'שולחן שוק חלבי' },
  { src: '/items/videos/video5.mp4', title: 'שולחן לברית' },
];

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export default function VideoGallery() {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [lightbox, setLightbox] = useState(null);
  const lightboxVideoRef = useRef(null);

  const handleClose = () => {
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
    setLightbox(null);
  };

  useEffect(() => {
    if (lightbox === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  return (
    <section id="video-gallery" ref={ref} className="py-40 md:py-64 bg-brand-dark relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-48 h-48 border border-gold rounded-full" />
        <div className="absolute bottom-10 right-20 w-32 h-32 border border-gold rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-gold" />
            <span className="text-gold font-semibold text-lg tracking-wider">צפו בנו בפעולה</span>
            <div className="w-10 h-[2px] bg-gold" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
            הכנת שולחנות
          </h2>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {videos.map((video, i) => (
            <VideoCard
              key={i}
              video={video}
              index={i}
              isVisible={isVisible}
              onOpen={() => setLightbox(video)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-6 left-6 w-10 h-10 bg-white/10 hover:bg-white/20 focus:ring-2 focus:ring-gold focus:outline-none rounded-full flex items-center justify-center text-white text-2xl transition-colors z-10"
            aria-label="סגור"
          >
            ✕
          </button>
          <video
            ref={lightboxVideoRef}
            src={lightbox.src}
            controls
            autoPlay
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function VideoCard({ video, index, isVisible, onOpen }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (isTouchDevice()) return;
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice()) return;
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${isVisible ? `animate-scaleIn delay-${(index + 1) * 100}` : 'opacity-0'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Play Icon */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-16 h-16 bg-gold/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
          <svg className="w-7 h-7 text-white mr-[-2px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white font-bold text-lg">{video.title}</p>
      </div>

      {/* Hover Border Glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/40 transition-all duration-500 pointer-events-none" />
    </div>
  );
}
