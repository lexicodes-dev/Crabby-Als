'use client';

import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

import { PromoBannerData } from '@/lib/wordpress';

export default function PromoBanner({ data }: { data?: PromoBannerData | null }) {
  const [isDismissed, setIsDismissed] = useState(false);

  // If WordPress data is missing or the banner is turned off, don't render it.
  // Or if the user dismissed it, don't render it.
  if (!data || !data.isActive) return null;
  if (isDismissed) return null;

  const text = data?.text || 'NEW! Banners are here - your new go-to pattern for important announcements';

  return (
    <div style={{
      backgroundColor: 'var(--accent)', // Using the crab red accent color from the theme
      color: 'white',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1001,
      fontFamily: 'var(--font-main)',
      fontSize: '0.9rem',
      fontWeight: '600',
      textAlign: 'center',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1rem' }}>{text}</span>
      </div>
      
      <button 
        onClick={() => setIsDismissed(true)}
        style={{
          position: 'absolute',
          right: '16px',
          color: 'white',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        aria-label="Close banner"
      >
        <X size={20} />
      </button>
    </div>
  );
}
