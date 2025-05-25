'use client';

import Link from 'next/link';

export default function InternalLinks() {
  return (
    <section className="py-4 text-center">
      <div className="container">
        <p className="fw-semibold mb-2">New to structured settlements?</p>
        <p className="text-muted">
          Learn about the full process in our{' '}
          <Link href="/review-offer" className="text-success text-decoration-underline">
            Review Offer Guide
          </Link>{' '}
          or visit{' '}
          <Link href="/court-approval" className="text-success text-decoration-underline">
            Court Approval Process
          </Link>{' '}
          for legal insights.
        </p>
      </div>
    </section>
  );
}
