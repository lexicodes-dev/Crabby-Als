'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { getBandScheduleImage } from '@/lib/wordpress';

export default function EventsPage() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [posterUrl, setPosterUrl] = useState<string | null>(null);
    const [loadingPoster, setLoadingPoster] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        getBandScheduleImage().then((url) => {
            if (url) setPosterUrl(url);
            setLoadingPoster(false);
        });
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST", 
                body: formData
            });

            if (response.ok) {
                setFormSubmitted(true);
                form.reset();
            } else {
                console.error("Form submission failed");
            }
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#000000', color: 'white' }}>
            {/* Hero Section */}
            <div style={{
                height: '60vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: 'url("/pics/live music.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 20%',
                    zIndex: 0
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)',
                    zIndex: 1
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, width: '100%', height: '25vh',
                    background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
                    zIndex: 2
                }}></div>

                <div style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '4.5rem',
                        marginBottom: '0.5rem',
                        color: 'white',
                        opacity: 0.85,
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '4px'
                    }}>
                        Live Music Every Weekend
                    </h1>
                    <p style={{
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        color: 'var(--accent)',
                        margin: '0 0 1.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '8px'
                    }}>
                        8PM TO MIDNIGHT
                    </p>
                    <div style={{ width: '100px', height: '4px', background: 'white', margin: '0 auto' }}></div>
                </div>
            </div>

            <div style={{ padding: '4rem 0 6rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* Poster Section (Centered) */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 2vw', marginBottom: '4rem' }}>
                    {loadingPoster ? (
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>Loading band schedule...</p>
                    ) : (
                        <div style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '1rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                            maxWidth: '1000px', // Prevents it from getting too enormously wide on giant screens
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img
                                src={posterUrl || "/feb-poster.png"}
                                alt="Upcoming Schedule"
                                style={{ 
                                    maxWidth: '100%', 
                                    height: 'auto', 
                                    display: 'block', 
                                    borderRadius: '8px' 
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Red Separator Line */}
                <div style={{
                    width: '80%',
                    maxWidth: '800px',
                    height: '2px',
                    background: 'var(--accent)', // The red accent color
                    marginBottom: '4rem'
                }}></div>

                {/* Right column — Band Booking Form, centered */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 4vw' }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                        width: '100%',
                        maxWidth: '620px',
                    }}>
                        <div style={{ padding: '2rem 2.2rem', textAlign: 'center' }}>
                            <h2 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '2.2rem',
                                color: 'var(--accent)',
                                marginBottom: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2px'
                            }}>
                                Band Bookings
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', margin: '0 auto 1rem' }}>
                                Interested in playing at Crabby Al&apos;s? Fill out the form below and our booking team will get in touch with you.
                            </p>

                            {!formSubmitted ? (
                                <form
                                    onSubmit={handleFormSubmit}
                                    style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem', textAlign: 'left' }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Band Name</label>
                                        <input required type="text" name="band-name" placeholder="Enter your band name" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.85rem', borderRadius: '8px', color: 'white', outline: 'none', fontSize: '0.9rem' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Email</label>
                                        <input required type="email" name="email" placeholder="your@email.com" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.85rem', borderRadius: '8px', color: 'white', outline: 'none', fontSize: '0.9rem' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Requested Rate</label>
                                        <input required type="text" name="rate" placeholder="e.g. $500 / 3 hours" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.85rem', borderRadius: '8px', color: 'white', outline: 'none', fontSize: '0.9rem' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Genres</label>
                                        <input required type="text" name="genres" placeholder="e.g. Rock, Blues, Jazz" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.85rem', borderRadius: '8px', color: 'white', outline: 'none', fontSize: '0.9rem' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: 'span 2' }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Samples of Music (Links)</label>
                                        <input required type="text" name="samples" placeholder="Link to Spotify, YouTube, SoundCloud, etc." style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.85rem', borderRadius: '8px', color: 'white', outline: 'none', fontSize: '0.9rem' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: 'span 2' }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Availability</label>
                                        <textarea required name="availability" rows={2} placeholder="Indicate when you are interested in playing..." style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.85rem', borderRadius: '8px', color: 'white', outline: 'none', resize: 'none', fontSize: '0.9rem' }} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            style={{ width: '100%', padding: '1.1rem', background: 'var(--accent)', color: 'black', border: 'none', borderRadius: '8px', fontWeight: '800', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', transition: 'transform 0.2s ease, filter 0.2s ease', opacity: isSubmitting ? 0.7 : 1 }}
                                            onMouseEnter={(e) => { if (!isSubmitting) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.1)'; } }}
                                            onMouseLeave={(e) => { if (!isSubmitting) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; } }}
                                        >
                                            <Send size={18} /> {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                                    <CheckCircle size={60} color="var(--accent)" />
                                    <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', margin: 0 }}>Inquiry Sent!</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', margin: 0 }}>
                                        Thank you for your interest. We&apos;ll review your music and get back to you soon.
                                    </p>
                                    <button onClick={() => setFormSubmitted(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.8rem 2rem', borderRadius: '50px', cursor: 'pointer', marginTop: '1rem' }}>
                                        Send Another
                                    </button>
                                </div>
                            )}

                            <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                                *This form is specifically for band inquiries, not reservations.
                            </p>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @media (max-width: 768px) {
                        form { grid-template-columns: 1fr !important; }
                        form > div { grid-column: span 1 !important; }
                    }
                `}</style>
            </div>
        </div>
    );
}
