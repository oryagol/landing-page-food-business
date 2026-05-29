import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    title: 'קייטרינג לאירועים',
    description: 'חתונות, בר/בת מצוות, ימי הולדת ואירועים מיוחדים — נדאג לכל פרט כדי שתוכלו להנות.',
    image: '/items/pictures/dish-06.jpg',
    icon: '🎉',
  },
  {
    title: 'מגשי אירוח',
    description: 'מגשים מפוארים של גבינות, ירקות, סלטים ומנות — מושלם לכל התכנסות.',
    image: '/items/pictures/dish-04.jpg',
    icon: '🧀',
  },
  {
    title: 'מנות לשבתות וחגים',
    description: 'תבשילים ביתיים, סלטים טריים ומנות מסורתיות שיגרמו לשולחן החג שלכם לזרוח.',
    image: '/items/pictures/dish-14.jpg',
    icon: '🕯️',
  },
  {
    title: 'שולחנות שוק',
    description: 'שולחן שוק עשיר וצבעוני, ערוך בשפע ובאסתטיקה — חוויה קולינרית בלתי נשכחת.',
    image: '/items/pictures/dish-22.jpg',
    icon: '🥐',
  },
  {
    title: 'שולחנות מתוקים',
    description: 'מגוון קינוחים, עוגות, ממתקים ומאפים מעוצבים שיוסיפו מתיקות לכל אירוע.',
    image: '/items/pictures/dish-07.jpg',
    icon: '🍰',
  },
  {
    title: 'סדנת השף הצעיר',
    description: 'סדנה בבישול ואפייה חוויתית לילדים! חוויה מושלמת המתאימה לימי הולדת, מסיבות סיום, ערבי כיתה, ימי גיבוש והחופש הגדול.',
    image: '/items/pictures/dish-31.jpg',
    icon: '👨‍🍳',
  },
];

export default function Services() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="services" ref={ref} className="py-40 md:py-64 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-gold" />
            <span className="text-gold font-semibold text-lg tracking-wider">מה אנחנו מציעים</span>
            <div className="w-10 h-[2px] bg-gold" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand">
            השירותים שלנו
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              isVisible={isVisible}
              delay={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, isVisible, delay }) {
  return (
    <div
      className={`group relative bg-cream rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? `animate-fadeInUp delay-${(delay % 3 + 1) * 100}` : 'opacity-0'
      }`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
        <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl shadow-lg">
          {service.icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-brand mb-3 group-hover:text-gold transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-charcoal-light text-lg leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-l from-gold to-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
    </div>
  );
}
