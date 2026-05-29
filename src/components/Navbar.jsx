import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'ראשי', href: '#hero' },
  { label: 'הסיפור שלנו', href: '#story' },
  { label: 'השירותים שלנו', href: '#services' },
  { label: 'גלריה', href: '#gallery' },
  { label: 'המלצות', href: '#reviews' },
  { label: 'צור קשר', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setMobileOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="navbar"
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'top-0 bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'top-4 bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleClick(e, '#hero')} className="flex items-center gap-2">
          <img
            src="/items/pictures/logo.jpeg"
            alt="מקור האוכל והקינוחים"
            className={`rounded-full transition-all duration-500 border-2 border-gold/30 ${
              scrolled ? 'w-16 h-16' : 'w-24 h-24'
            }`}
          />
          <span
            className={`font-heading font-bold transition-all duration-500 ${
              scrolled ? 'text-brand text-xl' : 'text-white text-2xl drop-shadow-lg'
            }`}
          >
            מקור האוכל והקינוחים
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-6" style={{ marginLeft: '120px' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`text-base font-medium transition-all duration-300 hover:text-gold relative
                after:content-[''] after:absolute after:bottom-[-4px] after:right-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full
                ${scrolled ? 'text-charcoal' : 'text-white/90 hover:text-white'}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden flex flex-col gap-1.5 p-2"
          aria-label="תפריט ניווט"
        >
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-charcoal' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-charcoal' : 'bg-white'} ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-charcoal' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div
        className={`xl:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md shadow-xl transition-all duration-400 overflow-hidden ${
          mobileOpen ? 'max-h-[500px] border-t border-gold/20' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-charcoal hover:text-brand font-medium py-2 border-b border-cream-dark/50 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/972507799833"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand text-white text-center py-3 rounded-full font-semibold mt-2 hover:bg-brand-light transition-colors"
          >
            📱 להזמנה
          </a>
        </div>
      </div>
    </nav>
  );
}
