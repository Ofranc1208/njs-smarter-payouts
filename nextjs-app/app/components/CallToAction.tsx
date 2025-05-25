'use client';

import Link from 'next/link';

export default function CallToAction() {
  return (
    <div className="hero-buttons text-center my-4">
      <Link href="/pricing-calculator" className="btn btn-success btn-lg">
        Get Your Instant Offer
      </Link>
    </div>
  );
}
