'use client';

import { Facebook, Instagram, Phone, Mail, MapPin, Anchor } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const headerStyle = {
        fontFamily: 'var(--font-serif)',
        fontSize: '1.5rem',
        borderBottom: '2px solid var(--accent)',
        display: 'inline-block',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem',
        lineHeight: '1.2'
    };

    return (
        <footer style={{ background: '#111111', color: 'white', padding: '4rem 0 2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    {/* Column 1: Connect With Us */}
                    <div className="connect-column">
                        <h3 style={headerStyle}>Connect With Us</h3>
                        <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem' }}>
                            <Link href="https://www.facebook.com/share/1ATP46ueWb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ color: 'white', background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', display: 'flex', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-3px)' }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                                <Facebook size={22} />
                            </Link>
                            <Link href="https://www.instagram.com/crabby_als?igsh=bzRrazZvbTh6c3g0" target="_blank" rel="noopener noreferrer" style={{ color: 'white', background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', display: 'flex', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-3px)' }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                                <Instagram size={22} />
                            </Link>
                        </div>
                    </div>



                    {/* Column 3: Contact Us */}
                    <div>
                        <h3 style={headerStyle}>Contact Us</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', opacity: 0.8 }}>
                                <MapPin size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                                <span>157 East Main Street,<br />Thomaston, CT 06787</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.8 }}>
                                <Phone size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                                <a href="tel:8602834177" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'white'}>(860) 283-4177</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Hours */}
                    <div>
                        <h3 style={headerStyle}>Hours</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.8 }}>
                            <li><strong style={{ color: 'var(--accent)' }}>Sun - Thu:</strong></li>
                            <li>Kitchen: 11:00 AM - 10:00 PM</li>
                            <li>Bar: 11:00 AM - 1:00 AM</li>
                            <li style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--accent)' }}>Fri - Sat:</strong></li>
                            <li>Kitchen: 11:00 AM - 11:00 PM</li>
                            <li>Bar: 11:00 AM - 2:00 AM</li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} Crabby Al&apos;s Seafood Restaurant. All rights reserved.
                </div>
            </div>

            <style jsx>{`
                .connect-column {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                @media (max-width: 768px) {
                    .connect-column {
                        align-items: flex-start;
                    }
                }
            `}</style>
        </footer>
    );
}
