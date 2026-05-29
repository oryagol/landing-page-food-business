import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Story() {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section id="story" ref={ref} className="py-40 md:py-64 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image Side */}
          <div className={`relative w-4/5 mx-auto ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/items/pictures/story.jpg"
                alt="הסיפור של מקור האוכל והקינוחים"
                loading="lazy"
                className="w-full h-[360px] md:h-[440px] object-cover bg-[#f8f6f0] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand/5 rounded-2xl -z-10" />
          </div>

          {/* Text Side */}
          <div className={`${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-gold" />
              <span className="text-gold font-semibold text-lg tracking-wider">קצת עלינו</span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand mb-8 leading-tight">
              הסיפור שלנו
            </h2>

            <div className="space-y-5 text-charcoal-light text-lg leading-relaxed">
              <p>
                מקור האוכל והקינוחים נולד מתוך אהבה אמיתית לבישול ולאירוח. אנחנו מאמינים שכל אירוע מתחיל מהטעם - חומרי גלם טריים, מתכונים שעוברים מדור לדור, ותשוקה שמורגשת בכל ביס.
              </p>
              <p>
                אצלנו, כל מגש מוכן בעבודת יד, עם תשומת לב לכל פרט - מבחירת חומרי הגלם הטריים ביותר, דרך הבישול בתשוקה, ועד ההגשה האסתטית שתגרום לאורחים שלכם לא להפסיק להחמיא.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-gold/20" style={{ marginTop: '20px' }}>
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-brand">5.0</div>
                <div className="text-xs text-charcoal-light mt-1">⭐ דירוג בגוגל</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-brand">100%</div>
                <div className="text-xs text-charcoal-light mt-1">שביעות רצון</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-brand">❤️</div>
                <div className="text-xs text-charcoal-light mt-1">עם הלב</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
