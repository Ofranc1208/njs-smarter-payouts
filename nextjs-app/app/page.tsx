'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
    const pulse = document.getElementById('pulseText');
    if (pulse) {
      pulse.classList.add('pulse-effect');
    }
  }, []);

  // Hide navbar only on homepage
  useEffect(() => {
    const navbar = document.querySelector('.navbar') as HTMLElement | null;
    if (navbar) {
      navbar.style.display = 'none';
    }
    return () => {
      if (navbar) {
        navbar.style.display = '';
      }
    };
  }, []);

  return (
    <main className="home-main">
      <header>
        {/* Navbar is handled globally */}
      </header>
      <Head>
        <title>SmarterPayouts - Get the Highest Early Payout for Your Future Payments</title>
        <meta
          name="description"
          content="Get the highest early payout for your future payments instantly. No pushy sales calls. No sensitive personal information required. Industry's first online self-quoting platform."
        />
        <meta
          name="keywords"
          content="structured settlement, early payout, cash now, settlement calculator"
        />
        <meta property="og:title" content="SmarterPayouts - Get Your Early Payout Today" />
        <meta
          property="og:description"
          content="Get the highest early payout for your future payments instantly. No pushy sales calls required."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
      </Head>

      {/* ✅ HERO SECTION */}
      <section className="hero">
        <video autoPlay muted loop playsInline preload="metadata" id="bg-video">
          <source src="/assets/videos/promos/counting-cash.mp4" type="video/mp4" />
          <img src="/assets/images/fallback.jpg" alt="Structured Settlement Video Preview" />
        </video>

        <div className="overlay"></div>

        <div className="hero-content text-center">
          <h1 id="pulseText" className="fw-bold text-white display-5">
            Skip the Sales Pitch
          </h1>
          <p></p>
          <h4 className="lead fs-4 fw-semibold text-light mt-3">
          Wonder your settlement’s early payout value?
          </h4>
          <p></p>
          <p className="fs-5 text-light">
          No personal info needed to see your quote.
          </p>

          <p className="fs-5 text-light mt-2">
          You're in control — not the sales team.
          </p>

          <div className="hero-buttons mt-4">
            <Link href="/main" className="cta-button secondary">
              How Our Process Works
            </Link>
            <Link href="/pricing-calculator" className="cta-button primary">
              Early Payout Calculator
            </Link>
          </div>
        </div>
      </section>

     
    </main>
  );
}
