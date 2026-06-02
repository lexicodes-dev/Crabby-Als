'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PromoPopupData } from '@/lib/wordpress';
import Image from 'next/image';

export default function PromoPopup({ data }: { data?: PromoPopupData | null }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true); // Default to true to prevent hydration mismatch on first render

  useEffect(() => {
    // Check session storage to see if user has already dismissed it this session
    const dismissed = sessionStorage.getItem('crabbyPromoDismissed');
    
    if (!dismissed && data && data.isActive) {
      setIsDismissed(false);
      
      // Add a slight delay before showing the popup so it doesn't appear instantly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('crabbyPromoDismissed', 'true');
    // We wait for the animation to finish before removing it from DOM
    setTimeout(() => {
      setIsDismissed(true);
    }, 500);
  };

  if (isDismissed || !data || !data.isActive) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="promo-popup-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="promo-popup-content"
          >
          <button
            onClick={handleDismiss}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
            aria-label="Close popup"
          >
            <X size={14} />
          </button>

          {data.imageUrl && (
            <div style={{ width: '100%', position: 'relative' }}>
              <img 
                src={data.imageUrl} 
                alt="Promo" 
                style={{ width: '100%', height: 'auto', maxHeight: '250px', objectFit: 'cover', display: 'block' }} 
              />
            </div>
          )}

          <div style={{ padding: '20px' }}>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', lineHeight: '1.5' }}>
              {data.text || 'Check out our latest special event!'}
            </p>

            {data.hasButton && (
              <Link href={data.buttonLink || '#'} onClick={handleDismiss} style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: 'var(--accent)',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '6px',
                fontWeight: 'bold',
                textDecoration: 'none',
                transition: 'filter 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
              >
                {data.buttonText || 'Learn More'}
              </Link>
            )}
          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
