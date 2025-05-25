'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="py-5 text-center" style={{ backgroundColor: '#f9fafb' }}>
      <div className="container">
        <h1 className="display-6 fw-bold text-success mb-3">A Smarter Approach</h1>
        <p className="lead text-muted fs-5 mb-3" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Turn your future structured settlement payments into fast, upfront cash — with zero out-of-pocket cost and a fully court-approved process.
        </p>
        <p className="text-muted" style={{ maxWidth: '680px', margin: '0 auto' }}>
          Our{' '}
          <Link href="/pricing-calculator" className="text-success text-decoration-underline">
            Early Payout Calculator
          </Link>{' '}
          gives you a private, instant quote. No calls, no sales pressure, and no personal data required.
        </p>
      </div>
    </section>
  );
}
