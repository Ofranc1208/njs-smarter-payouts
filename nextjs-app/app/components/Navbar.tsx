"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import '../../styles/Index.css';

const processRoutes = [
  '/get-a-quote',
  '/review-offer',
  '/court-approval',
  '/get-your-cash',
];

export default function Navbar() {
  const pathname = usePathname();
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isInProcessSection = processRoutes.includes(pathname);

  // Close dropdown when navigating
  React.useEffect(() => {
    setDropdownOpen(false);
    setNavbarCollapsed(true);
  }, [pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container d-flex align-items-center justify-content-between">
        <Link href="/main" className="navbar-brand d-flex align-items-center gap-2">
          <Image
            src="/assets/images/placeholder-logo.png"
            alt="SmarterPayouts Logo"
            width={30}
            height={30}
            style={{ height: '30px', width: 'auto' }}
          />
          <span className="fw-bold">SmarterPayouts</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={!navbarCollapsed}
          onClick={() => setNavbarCollapsed((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${!navbarCollapsed ? ' show' : ''}`} id="navbarMain">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/main' ? ' active' : ''}`} href="/main">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/pricing-calculator' ? ' active' : ''}`} href="/pricing-calculator">Early Payout Calculator</Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className={`nav-link dropdown-toggle${isInProcessSection ? ' active text-success fw-bold' : ''}`}
                id="processDropdown"
                role="button"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((open) => !open)}
                style={{ cursor: 'pointer' }}
              >
                Our Process
              </span>
              <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} aria-labelledby="processDropdown">
                <li><Link className="dropdown-item" href="/get-a-quote">Get A Quote</Link></li>
                <li><Link className="dropdown-item" href="/review-offer">Review Offer</Link></li>
                <li><Link className="dropdown-item" href="/court-approval">Court Approval</Link></li>
                <li><Link className="dropdown-item" href="/get-your-cash">Get Your Cash</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/articles' ? ' active' : ''}`} href="/articles">Articles</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/about' ? ' active' : ''}`} href="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/faqs' ? ' active' : ''}`} href="/faqs">FAQs</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/contact' ? ' active' : ''}`} href="/contact">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/privacy' ? ' active' : ''}`} href="/privacy">Privacy</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/terms' ? ' active' : ''}`} href="/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
} 