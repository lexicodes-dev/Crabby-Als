import React from 'react';
import { Briefcase, FileText, Send, User, Mail, Phone, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Employment | Crabby Al\'s Seafood Restaurant',
  description: 'Join the team at Crabby Al\'s! We are always looking for passionate individuals to join our seafood restaurant family.',
};

export default function EmploymentPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '55vh',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: 'var(--header-height)'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/pics/unnamed.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)'
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '800px'
        }}>
          <h1 style={{
            color: 'var(--white)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'var(--font-serif)',
            marginBottom: '1rem',
            letterSpacing: '2px',
            textShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            We're Hiring!
          </h1>
          <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--accent)', margin: '0 auto' }} />
        </div>
      </section>

      {/* Main Content */}
      <div className="container section" style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Why Work With Us Info */}
          <div>
            <h2 style={{
              color: 'var(--primary)',
              fontFamily: 'var(--font-serif)',
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              position: 'relative',
              display: 'inline-block'
            }}>
              Join Our Family
              <div style={{ position: 'absolute', bottom: '-10px', left: 0, width: '60px', height: '3px', backgroundColor: 'var(--accent)' }} />
            </h2>
            
            <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--foreground)' }}>
              Stop in and fill out an application or contact us at <a href="mailto:Crabbysals@yahoo.com" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Crabbysals@yahoo.com</a> or via <a href="https://www.facebook.com/share/1ATP46ueWb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ color: '#1877F2', textDecoration: 'underline', fontWeight: 'bold' }}>Facebook Messenger</a>. We are looking for individuals ready for a part-time role in a fast-paced restaurant environment!
            </p>
            

          </div>

          {/* Application Form */}
          <div style={{
            backgroundColor: 'var(--white)',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Apply Now</h3>
            
            <form action="https://api.web3forms.com/submit" method="POST" encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ""} />
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <input type="text" name="name" placeholder="John Doe" style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.8rem',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none',
                    fontSize: '1rem',
                    transition: 'border-color 0.2s ease'
                  }} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input type="email" name="email" placeholder="john@example.com" style={{
                      width: '100%',
                      padding: '0.8rem 1rem 0.8rem 2.8rem',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      outline: 'none',
                      fontSize: '1rem'
                    }} required />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Phone</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input type="tel" name="phone" placeholder="(555) 123-4567" style={{
                      width: '100%',
                      padding: '0.8rem 1rem 0.8rem 2.8rem',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      outline: 'none',
                      fontSize: '1rem'
                    }} required />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Message</label>
                <textarea name="message" rows={4} placeholder="Tell us a little bit about yourself and why you'd like to join our team..." style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  outline: 'none',
                  fontSize: '1rem',
                  resize: 'vertical'
                }} required></textarea>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Attach Resume (Optional)</label>
                <input type="file" name="resume" accept=".pdf,.doc,.docx" style={{
                  width: '100%',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  border: '1px dashed #ccc',
                  outline: 'none',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  backgroundColor: '#fafafa'
                }} />
              </div>

              <button type="submit" className="btn-primary" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '1rem',
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem'
              }}>
                Submit Application <Send size={18} />
              </button>
              
              <p style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center', marginTop: '0.5rem' }}>
                By submitting this form, you agree to be contacted regarding employment opportunities.
              </p>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}
