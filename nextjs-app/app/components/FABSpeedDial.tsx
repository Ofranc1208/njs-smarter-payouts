'use client';

import { useState, useEffect, useRef } from 'react';

export default function FABSpeedDial() {
  const [isOpen, setIsOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement | null>(null);

  const toggleFAB = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const closeFAB = () => setIsOpen(false);

  const openChatFunction = () => {
    alert('💬 Live chat launching soon!');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        closeFAB();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      ref={fabRef}
      className={`fab-speed-dial ${isOpen ? 'open' : ''}`}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'flex-end',
        gap: '16px'
      }}
    >
      {/* Main FAB Button */}
      <button
        className="fab-main"
        aria-label="Open contact options"
        aria-expanded={isOpen}
        onClick={toggleFAB}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#198754', // Bootstrap success color
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: isOpen ? 'rotate(45deg)' : 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = isOpen ? 'rotate(45deg)' : 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isOpen ? 'rotate(45deg)' : 'none';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        }}
      >
        <span style={{ fontSize: '24px' }}>❓</span>
      </button>

      {/* FAB Items Container */}
      <div 
        className="fab-items"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
          marginBottom: '8px'
        }}
      >
        {/* Call Option */}
        <a 
          href="tel:+1-800-555-1234" 
          className="fab-item fab-call" 
          aria-label="Call Us"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'white',
            padding: '12px 16px',
            borderRadius: '28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textDecoration: 'none',
            color: '#333',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            width: 'fit-content'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
        >
          <span style={{ fontSize: '20px' }}>📞</span>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Let's Talk</span>
        </a>

        {/* Email Option */}
        <a 
          href="/contact" 
          className="fab-item fab-contact" 
          aria-label="Email Us"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'white',
            padding: '12px 16px',
            borderRadius: '28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textDecoration: 'none',
            color: '#333',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            width: 'fit-content'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
        >
          <span style={{ fontSize: '20px' }}>✉️</span>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Email Us</span>
        </a>

        {/* Chat Option */}
        <button 
          onClick={openChatFunction} 
          className="fab-item fab-chat" 
          aria-label="Chat Now"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'white',
            padding: '12px 16px',
            borderRadius: '28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer',
            color: '#333',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            width: 'fit-content'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
        >
          <span style={{ fontSize: '20px' }}>💬</span>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Let's Chat</span>
        </button>
      </div>
    </div>
  );
}
