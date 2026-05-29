import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Hero() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen w-full overflow-x-hidden flex items-center justify-center py-32 bg-cover bg-center"
      style={{ backgroundImage: "url('/items/pictures/dish-06.jpg')" }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/items/pictures/dish-06.jpg"
      >
        <source src="/items/videos/video1.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Decorative Gold Border Frame */}
      <div className="absolute inset-6 md:inset-12 border border-gold/20 rounded-lg pointer-events-none" />

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-4xl ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ paddingTop: '60px' }}>


        {/* Main Headline */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-xl">
          להתאהב בטעמים
        </h1>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-[1px] bg-gold/60" />
          <span className="text-gold text-2xl">✦</span>
          <div className="w-12 h-[1px] bg-gold/60" />
        </div>

        {/* Services Tags */}
        <div className="flex flex-wrap justify-center gap-4" style={{ marginBottom: '20px' }}>
          {[
            'קייטרינג לאירועים',
            'מגשי אירוח',
            'מנות לשבתות וחגים',
            'שולחנות שוק',
            'שולחנות מתוקים',
            'סדנת השף הצעיר',
          ].map((service, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center text-white/90 text-lg md:text-xl bg-white/10 backdrop-blur-sm rounded-full border border-white/15 transition-all duration-300 hover:bg-gold/20 hover:border-gold/40 ${isVisible ? `animate-fadeIn delay-${(i + 1) * 100}` : 'opacity-0'
                }`}
              style={{
                paddingTop: '16px',
                paddingBottom: '16px',
                paddingLeft: '36px',
                paddingRight: '36px',
                lineHeight: '1'
              }}
            >
              {service}
            </span>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className={`mb-2 ${isVisible ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            למה לבחור בנו?
          </h3>
          <div className="inline-block bg-black/15 backdrop-blur-md rounded-2xl border border-white/5 px-12 py-8 md:px-20 md:py-12 text-right">
            <ul className="space-y-3 text-white/70 text-base md:text-lg leading-relaxed">
              <li>💚 אוכל ביתי עם טעם של פעם</li>
              <li>💚 טריות ללא פשרות</li>
              <li>💚 יחס אישי וליווי מלא</li>
              <li>💚 מחירים הוגנים ונוחים</li>
              <li>💚 ניסיון באירועים פרטיים ועסקיים</li>
              <li>💚 התאמה מלאה לתקציב ולסגנון האירוע</li>
            </ul>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-4 md:h-6 w-full" aria-hidden="true"></div>

        {/* CTA Button */}
        <div className="w-full">
          <a
            id="hero-cta"
            href="https://wa.me/972507799833"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-white text-xl font-bold rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-gold/30 hover:-translate-y-1"
            style={{
              paddingTop: '12px',
              paddingBottom: '12px',
              paddingLeft: '32px',
              paddingRight: '32px',
            }}
          >
            <span>הזמנות</span>
            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-white/60 text-base tracking-wider">גללו למטה</span>
        <svg className="w-5 h-5 text-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </section>
  );
}
