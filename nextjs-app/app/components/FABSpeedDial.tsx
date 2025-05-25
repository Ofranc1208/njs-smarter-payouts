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
    >
      <button
        className="fab-main"
        aria-label="Open contact options"
        aria-expanded={isOpen}
        onClick={toggleFAB}
      >
        <img src="https://cdn-icons-png.flaticon.com/512/545/545705.png" alt="Question Icon" className="fab-main-icon" width="24" height="24" />
        <span>Questions</span>
      </button>

      <div className="fab-items">
        <a href="tel:+1-800-555-1234" className="fab-item fab-call" aria-label="Call Us">
          <span className="fab-icon">
            <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="Phone Icon" width="24" height="24" />
          </span>
          <span className="fab-text">Let's Talk</span>
        </a>

        <a href="/contact" className="fab-item fab-contact" aria-label="Email Us">
          <span className="fab-icon">
            <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Email Icon" width="24" height="24" />
          </span>
          <span className="fab-text">Email Us</span>
        </a>

        <button onClick={openChatFunction} className="fab-item fab-chat" aria-label="Chat Now">
          <span className="fab-icon">
            <img src="https://cdn-icons-png.flaticon.com/512/2462/2462719.png" alt="Chat Icon" width="24" height="24" />
          </span>
          <span className="fab-text">Let's Chat</span>
        </button>
      </div>
    </div>
  );
}
