'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

import PromoBanner from './PromoBanner';

const menuDropdownItems = [
  { name: 'Main Menu', href: '/menu/main' },
  { name: 'Daily Specials', href: '/menu/daily' },
  { name: 'Seasonal Specials', href: '/menu/seasonal' },
  { name: 'Brunch Menu', href: '/menu/brunch' },
  { name: 'Kids Menu', href: '/menu/kids' },
];

const drinksDropdownItems = [
  { name: 'Spirits & Cocktails', href: '/drinks?tab=Cocktails+%26+Spirits' },
  { name: 'Beer', href: '/drinks?tab=Beer' },
  { name: 'Wine', href: '/drinks?tab=Wine' },
  { name: 'Seasonal', href: '/drinks?tab=Seasonal+Drinks' },
];

import { PromoBannerData } from '@/lib/wordpress';

export default function Navbar({ bannerData }: { bannerData: PromoBannerData | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [drinksDropdownOpen, setDrinksDropdownOpen] = useState(false);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const [mobileDrinksExpanded, setMobileDrinksExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const drinksDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuDropdownOpen(false);
      }
      if (drinksDropdownRef.current && !drinksDropdownRef.current.contains(e.target as Node)) {
        setDrinksDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Drinks', href: '/drinks' },
    { name: 'Happenings', href: '/happenings' },
    { name: 'Live Music', href: '/livemusic' },
    { name: 'Private Events', href: '/private-events' },
    { name: 'Gallery', href: '/gallery' },
  ];

  const linkStyle = {
    fontWeight: '600' as const,
    fontSize: '0.95rem',
    letterSpacing: '0.5px',
    transition: 'var(--transition)',
    color: 'var(--white)',
    position: 'relative' as const,
    paddingBottom: '4px'
  };

  return (
    <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      <PromoBanner data={bannerData} />
      <nav
        className="glass-nav"
        style={{
          position: 'relative',
          background: scrolled ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.98)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(5px)',
          transition: 'all 0.4s ease'
        }}
      >
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold', fontSize: '1.4rem', color: 'var(--white)', letterSpacing: '2px', fontFamily: 'var(--font-serif)' }}>
          <img src="/logo.png" alt="Crabby Al's Logo" style={{ height: '65px', width: 'auto' }} />
          <span style={{ textTransform: 'uppercase' }}>CRABBY AL&apos;S</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-menu">
          {/* Home link */}
          <Link href="/" style={linkStyle}>
            Home
            {pathname === '/' && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--accent)', borderRadius: '2px' }} />
            )}
          </Link>

          {/* Menu dropdown */}
          <div
            ref={dropdownRef}
            onMouseEnter={() => setMenuDropdownOpen(true)}
            onMouseLeave={() => setMenuDropdownOpen(false)}
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <Link
              href="/menu"
              style={{ ...linkStyle, cursor: 'pointer' }}
            >
              Menu
              {pathname === '/menu' && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--accent)', borderRadius: '2px' }} />
              )}
            </Link>

            {/* Dropdown panel */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              paddingTop: '0.75rem',
              opacity: menuDropdownOpen ? 1 : 0,
              pointerEvents: menuDropdownOpen ? 'auto' : 'none',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              zIndex: 100
            }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                padding: '0.5rem 0',
                minWidth: '200px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {menuDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuDropdownOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.7rem 1.25rem',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'background 0.15s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Drinks dropdown */}
          <div
            ref={drinksDropdownRef}
            onMouseEnter={() => setDrinksDropdownOpen(true)}
            onMouseLeave={() => setDrinksDropdownOpen(false)}
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <Link
              href="/drinks"
              style={{ ...linkStyle, cursor: 'pointer' }}
            >
              Drinks
              {pathname === '/drinks' && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--accent)', borderRadius: '2px' }} />
              )}
            </Link>

            {/* Dropdown panel */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              paddingTop: '0.75rem',
              opacity: drinksDropdownOpen ? 1 : 0,
              pointerEvents: drinksDropdownOpen ? 'auto' : 'none',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              zIndex: 100
            }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                padding: '0.5rem 0',
                minWidth: '200px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {drinksDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setDrinksDropdownOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.7rem 1.25rem',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'background 0.15s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Rest of nav links (skip Drinks since it has its own dropdown) */}
          {navLinks.slice(1).filter(link => link.name !== 'Drinks').map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} style={linkStyle}>
                {link.name}
                {isActive && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--accent)', borderRadius: '2px' }} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', color: 'white', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} className="mobile-toggle">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--header-height)',
          left: 0,
          width: '100%',
          background: scrolled ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.98)',
          backdropFilter: 'blur(30px)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Link href="/" onClick={() => setIsOpen(false)} style={{ color: 'white', fontWeight: '600', fontSize: '1.1rem' }}>
            Home
          </Link>

          {/* Mobile Menu dropdown */}
          <div>
            <button
              onClick={() => setMobileMenuExpanded(!mobileMenuExpanded)}
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '1.1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                width: '100%',
                textAlign: 'left'
              }}
            >
              Menu
            </button>
            {mobileMenuExpanded && (
              <div style={{
                paddingLeft: '1rem',
                marginTop: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                borderLeft: '2px solid rgba(255,255,255,0.15)'
              }}>
                {menuDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => { setIsOpen(false); setMobileMenuExpanded(false); }}
                    style={{ color: 'rgba(255,255,255,0.85)', fontWeight: '500', fontSize: '1rem' }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Drinks dropdown */}
          <div>
            <button
              onClick={() => setMobileDrinksExpanded(!mobileDrinksExpanded)}
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '1.1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                width: '100%',
                textAlign: 'left'
              }}
            >
              Drinks
            </button>
            {mobileDrinksExpanded && (
              <div style={{
                paddingLeft: '1rem',
                marginTop: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                borderLeft: '2px solid rgba(255,255,255,0.15)'
              }}>
                {drinksDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => { setIsOpen(false); setMobileDrinksExpanded(false); }}
                    style={{ color: 'rgba(255,255,255,0.85)', fontWeight: '500', fontSize: '1rem' }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).filter(link => link.name !== 'Drinks').map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{ color: 'white', fontWeight: '600', fontSize: '1.1rem' }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
    </header>
  );
}
