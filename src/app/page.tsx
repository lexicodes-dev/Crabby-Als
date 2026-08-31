'use client';

import HeroSection from '@/components/HeroSection';
import { Utensils, Music, Calendar, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const weeklySchedule = [
    {
      day: "Tuesday",
      title: "Taco Tuesdays",
      description: "Join us for our legendary taco specials all day long!",
      icon: <Utensils size={32} color="var(--accent)" />,
      time: "All Day"
    },
    {
      day: "Wednesday",
      title: "Karaoke Night",
      description: "Take the stage and show us what you've got!",
      icon: <Music size={32} color="var(--accent)" />,
      time: "Starts at 7 PM"
    },
    {
      day: "Thursday",
      title: "Trivia & Raw Bar",
      description: "Fresh oysters and claims at our Raw Bar from 5–9 PM, followed by Trivia Night at 7 PM. The perfect Thursday pair!",
      icon: <Calendar size={32} color="var(--accent)" />,
      time: "Raw Bar 5-9 PM | Trivia @ 7 PM"
    },
    {
      day: "Fri & Sat",
      title: "Live Bands",
      description: "The best local bands and artists live on our stage.",
      icon: <Music size={32} color="var(--accent)" />,
      time: "Starts at 8 PM"
    },
    {
      day: "Sunday",
      title: "Sunday Sports",
      description: "Join us for all the big games on Sunday.",
      icon: <Utensils size={32} color="var(--accent)" />,
      time: "Sports All Day"
    }
  ];



  return (
    <>

      <HeroSection />

      {/* Subtitle Section */}
      <section style={{ background: '#0a0a0a', padding: '5.5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <p className="hero-blurb" style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.35rem', lineHeight: '1.9', margin: 0 }}>
            Located on East Main Street, Crabby Al&apos;s serves up delicious food, cold drinks, live entertainment, and a beautiful outdoor patio to enjoy it all — dinner, drinks, and a great time.
          </p>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .hero-blurb { font-size: 0.95rem !important; line-height: 1.7 !important; }
            section:has(.hero-blurb) { padding: 3rem 0 !important; }
          }
        `}</style>
      </section>

      {/* Our Menu Section */}

      <section className="section" style={{ background: 'var(--white)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '0' }}>Our Menu</h2>
          </div>

          <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Food Card */}
            <Link href="/menu" className="menu-card" style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '4/3', borderRadius: '8px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
              <img
                src="/pics/crabby lobsta.png"
                alt="Food Menu"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              {/* Dark overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
              {/* Text */}
              <div style={{ position: 'absolute', bottom: '1.75rem', left: '1.75rem' }}>
                <h3 style={{ color: 'white', fontSize: '1.8rem', fontFamily: 'var(--font-serif)', margin: '0 0 0.2rem' }}>Food</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', margin: '0 0 1rem', fontSize: '0.9rem' }}>Seafood, American Classics &amp; More</p>
                <span className="see-more-btn" style={{
                  display: 'inline-block',
                  padding: '0.45rem 1.4rem',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  letterSpacing: '0.3px',
                  transition: 'all 0.3s ease'
                }}>See more</span>
              </div>
            </Link>

            {/* Drinks Card */}
            <Link href="/drinks" className="menu-card" style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '4/3', borderRadius: '8px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
              <img
                src="/pics/cheers.jpeg"
                alt="Drinks Menu"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              {/* Dark overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
              {/* Text */}
              <div style={{ position: 'absolute', bottom: '1.75rem', left: '1.75rem' }}>
                <h3 style={{ color: 'white', fontSize: '1.8rem', fontFamily: 'var(--font-serif)', margin: '0 0 0.2rem' }}>Drinks</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', margin: '0 0 1rem', fontSize: '0.9rem' }}>Amazing Cocktails &amp; More</p>
                <span className="see-more-btn" style={{
                  display: 'inline-block',
                  padding: '0.45rem 1.4rem',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  letterSpacing: '0.3px',
                  transition: 'all 0.3s ease'
                }}>See more</span>
              </div>
            </Link>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .menu-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
            .menu-card { aspect-ratio: 3/2 !important; }
          }
        `}</style>
      </section>


      {/* Weekly Entertainment Section */}
      <section className="section" style={{ background: '#000000', color: 'white', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>The Weekly Catch</h2>
            <div style={{ width: '80px', height: '4px', background: 'var(--accent)', margin: '0 auto' }}></div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {weeklySchedule.map((item, index) => {
              const isTacoTuesday = item.title === "Taco Tuesdays";
              const isKaraoke = item.title === "Karaoke Night";
              const isRawBar = item.title === "Trivia & Raw Bar";
              const isSunday = item.day === "Sunday";
              const isBands = item.title === "Live Bands";
              const imagePath = `/images/${item.title.toLowerCase().replace(/\s+/g, '_')}.png`;

              return (
                <div key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    transition: 'all 0.3s ease',
                    minHeight: '130px',
                    width: '100%',
                    position: 'relative'
                  }}
                  className="entertainment-horizontal-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.6)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  {/* Day Badge - Consistent Top Left */}
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    padding: '0.2rem 0.8rem',
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--accent)',
                    borderRadius: '50px',
                    fontWeight: '800',
                    fontSize: '0.7rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(255, 165, 2, 0.4)',
                    zIndex: 10
                  }}>
                    {item.day}
                  </div>

                  {/* Image Area */}
                  <div style={{
                    width: '30%',
                    minWidth: '180px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <img
                      src={isTacoTuesday ? "/pics/tacosss.png" : isKaraoke ? "/pics/crabsong.png" : isRawBar ? "/pics/rawbar.png" : isSunday ? "/pics/sunday.png" : isBands ? "/pics/crabby band.png" : imagePath}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.9,
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Content Area */}
                  <div style={{
                    padding: '1.5rem 2rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'left',
                    alignItems: 'flex-start'
                  }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      color: 'white',
                      fontFamily: 'var(--font-serif)',
                      marginBottom: '0.15rem',
                      lineHeight: '1.2'
                    }}>
                      {item.title}
                    </h3>

                    <div style={{
                      color: 'var(--accent)',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      marginBottom: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      letterSpacing: '0.5px'
                    }}>
                      <Clock size={14} />
                      {item.time}
                    </div>

                    <p style={{
                      opacity: 0.75,
                      fontSize: '0.95rem',
                      lineHeight: '1.4',
                      color: 'white',
                      maxWidth: '600px',
                      margin: 0
                    }}>
                      {item.description}
                    </p>
                  </div>

                  <style jsx>{`
                    @media (max-width: 768px) {
                      .entertainment-horizontal-card {
                        flex-direction: column !important;
                      }
                      .entertainment-horizontal-card > div:nth-child(2) { /* This is now the Image Area */
                        width: 100% !important;
                        height: 150px !important;
                        border-right: none !important;
                        border-left: none !important;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                      }
                      .entertainment-horizontal-card > div:last-child {
                        text-align: left !important;
                        align-items: flex-start !important;
                        padding: 1.5rem !important;
                      }
                    }
                  `}</style>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="section" style={{ background: 'var(--white)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>Visit Us</h2>
            <div style={{ width: '80px', height: '4px', background: 'var(--accent)', margin: '0 auto' }}></div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'start'
          }}>
            {/* Contact Info & Hours */}
            <div style={{ display: 'grid', gap: '3rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--primary)' }}>Contact Information</h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <MapPin color="var(--accent)" size={24} style={{ flexShrink: 0 }} />
                    <div>
                      <p style={{ fontWeight: 700, margin: 0 }}>Crabby Al&apos;s</p>
                      <p style={{ opacity: 0.8, margin: 0 }}>157 East Main Street</p>
                      <p style={{ opacity: 0.8, margin: 0 }}>Thomaston, CT 06787</p>
                      <p style={{ opacity: 0.8, margin: 0 }}>US</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Phone color="var(--accent)" size={24} style={{ flexShrink: 0 }} />
                    <div>
                      <p style={{ fontWeight: 700, margin: 0 }}>(860) 283-4177</p>
                      <p style={{ fontSize: '0.85rem', opacity: 0.7, margin: 0, fontStyle: 'italic' }}>Please call for reservations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--primary)' }}>Business Hours</h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div style={{ background: 'var(--background)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                    <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Sunday – Thursday</p>
                    <p style={{ margin: 0, opacity: 0.9 }}>Bar: 11:00am – 1:00am</p>
                    <p style={{ margin: 0, opacity: 0.9 }}>Kitchen closes at 10:00pm</p>
                  </div>
                  <div style={{ background: 'var(--background)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                    <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Friday & Saturday</p>
                    <p style={{ margin: 0, opacity: 0.9 }}>Bar: 11:00am – 2:00am</p>
                    <p style={{ margin: 0, opacity: 0.9 }}>Kitchen closes at 11:00pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map & Directions */}
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div style={{
                height: '400px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.1)'
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.336465476313!2d-73.078426023385!3d41.670068971265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7eb5a5a5a5a5b%3A0x5a5a5a5a5a5a5a5a!2s157%20E%20Main%20St%2C%20Thomaston%2C%20CT%2006787%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <a
                href="https://www.google.com/maps/dir//157+E+Main+St,+Thomaston,+CT+06787"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  padding: '1.2rem',
                  borderRadius: '50px',
                  textDecoration: 'none'
                }}
              >
                <Navigation size={20} />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section >
    </>
  );
}
