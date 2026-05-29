import { useState, useEffect, useCallback, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const reviews = [
  {
    name: 'תהל מיכאל',
    rating: 5,
    text: 'כשאיכות ושירות נפגשים קורים קסמים מיוחדים. אוכל של בית, מנחם, מחבק, טעים והכי חשוב, מגיע נקי ואסטתי. אני יודעת מאיפה אני ממשיכה להזמין בפעם הבאה ❤️.',
  },
  {
    name: 'יערית זוהר',
    rating: 5,
    text: 'ממליצה בחום! לקחנו את השירות עבור יום ההולדת של בעלי, והכול היה פשוט טעים! שירות מצויין! ניראות מדהימה! לא הפסיקו להחמיא! מחכה לפעם הבאה 🍽️🤍.',
  },
  {
    name: 'רעות לאון',
    rating: 5,
    text: 'שירות מדהים! אוכל טריי וסופר טעים.',
  },
  {
    name: 'מור ועקנין',
    rating: 5,
    text: 'אוכל טעיםםםם באמות ונקי הכל בשפע שירות מקסים וכשררר 🙏.',
  },
  {
    name: 'שלומית קווז',
    rating: 5,
    text: 'ממליצה בחום האוכל שלהם ממש טעים ♥️.',
  },
  {
    name: 'רועי ישראל זהר',
    rating: 5,
    text: 'טעים, נקי ואיכותית, כדאי כדאי כדאי👌',
  },
  {
    name: 'גלעד יגול',
    rating: 5,
    text: 'תענוג! כל שישי חובה להזמין ממנה. טעים מלא בשפע ושירות אישי ונעים.',
  },
];

export default function Reviews() {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const diff = touchStart.current - touchEnd.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swiped left -> next slide
        setActive((prev) => (prev + 1) % reviews.length);
      } else {
        // Swiped right -> prev slide
        setActive((prev) => (prev - 1 + reviews.length) % reviews.length);
      }
    }

    touchStart.current = 0;
    touchEnd.current = 0;
  };

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % reviews.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section id="reviews" ref={ref} className="py-40 md:py-64 bg-brand relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-20 left-20 w-60 h-60 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-white rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-gold" />
            <span className="text-gold font-semibold text-lg tracking-wider">מה הלקוחות אומרים</span>
            <div className="w-10 h-[2px] bg-gold" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
            המלצות
          </h2>
          <p className="text-white/60 mt-3 text-sm">דירוג ממוצע 5.0 ⭐ מתוך 5 כוכבים בגוגל</p>
        </div>

        <div
          className={`${isVisible ? 'animate-fadeInUp delay-200' : 'opacity-0'} mt-12`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Active Review */}
          <div className="min-h-[160px] md:min-h-[180px] py-6 md:py-8 flex items-center justify-center">
            <div key={active} className="text-center animate-fadeIn">
              <p className="text-white/90 text-xl md:text-2xl leading-relaxed font-light max-w-3xl mx-auto mb-8">
                {reviews[active].text}
              </p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(reviews[active].rating)].map((_, i) => (
                  <span key={i} className="text-gold text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gold font-bold text-lg">{reviews[active].name}</p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active
                    ? 'w-8 h-3 bg-gold'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`ביקורת ${i + 1}`}
              />
            ))}
          </div>

          {/* Google Reviews Link */}
          <div className="text-center" style={{ marginTop: '45px' }}>
            <a
              href="https://www.google.com/search?q=google+%D7%91%D7%99%D7%A7%D7%95%D7%A8%D7%95%D7%AA+%D7%9E%D7%A7%D7%95%D7%A8+%D7%94%D7%9E%D7%96%D7%95%D7%9F+%D7%95%D7%94%D7%90%D7%95%D7%9B%D7%9C"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-gold text-sm transition-colors duration-300 border border-white/20 hover:border-gold/40 px-10 py-4 md:px-14 md:py-5 rounded-full"
            >
              <span>לכל הביקורות שלנו בגוגל</span>
              <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
