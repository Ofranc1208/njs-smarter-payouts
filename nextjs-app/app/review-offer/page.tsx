'use client';

import Link from 'next/link';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function ReviewOffer() {
  return (
    <>
      <Head>
        <title>Review & Finalize Your Offer | SmarterPayouts</title>
        <meta name="description" content="Review and finalize your structured settlement offer with SmarterPayouts. Secure, digital, and fully compliant process—step by step." />
        <meta name="keywords" content="structured settlement, review offer, finalize, digital signing, compliance, secure" />
      </Head>
      {/* HERO SECTION */}
      <section className="how-fast-hero p-4 rounded mb-4 d-flex align-items-center justify-content-center" style={{
        background: "linear-gradient(90deg, #e9f9f1 60%, #fbc23322 100%)",
        boxShadow: "0 4px 24px rgba(9,180,77,0.08)",
        minHeight: '180px'
      }}>
        <div className="text-center w-100">
          <h1 className="fw-bold mb-2 text-success" style={{ fontSize: "2.2rem", letterSpacing: "-1px" }}>
            Review & Finalize Your Offer
          </h1>
          <div className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
            We guide you through every step—securely, digitally, and with full compliance for your state.
          </div>
          <Link href="/pricing-calculator" className="btn btn-success btn-lg mt-2">
            Get Your Instant Offer
          </Link>
        </div>
      </section>
      <div className="section-divider"></div>
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 text-center">
            {/* Step 1 */}
            <div className="col-md-3 col-sm-6">
              <div className="card-steps h-100 p-4 rounded shadow-sm blog-article-enhanced bg-white d-flex flex-column justify-content-between">
                <div style={{ fontSize: '2rem', color: '#4caf50' }} role="img" aria-label="Disclosures">📄</div>
                <div className="step-number badge bg-success mb-2" style={{ fontSize: '1rem' }}>Step 1</div>
                <h5 className="mt-2">Receive Disclosures</h5>
                <p>We'll send your state-specific disclosure forms to review — each state has different rules.</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="col-md-3 col-sm-6">
              <div className="card-steps h-100 p-4 rounded shadow-sm blog-article-enhanced bg-white d-flex flex-column justify-content-between">
                <div style={{ fontSize: '2rem', color: '#2196f3' }} role="img" aria-label="DocuSign">🖊️</div>
                <div className="step-number badge bg-primary mb-2" style={{ fontSize: '1rem' }}>Step 2</div>
                <h5 className="mt-2">Sign via DocuSign</h5>
                <p>After reviewing, sign your documents using DocuSign — secure and fully digital.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="col-md-3 col-sm-6">
              <div className="card-steps h-100 p-4 rounded shadow-sm blog-article-enhanced bg-white d-flex flex-column justify-content-between">
                <div style={{ fontSize: '2rem', color: '#ff9800' }} role="img" aria-label="Final Contract">📑</div>
                <div className="step-number badge bg-warning text-dark mb-2" style={{ fontSize: '1rem' }}>Step 3</div>
                <h5 className="mt-2">Final Contract</h5>
                <p>We prepare your final contract. Some states (like California) require a 3–10 day wait before this step.</p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="col-md-3 col-sm-6">
              <div className="card-steps h-100 p-4 rounded shadow-sm blog-article-enhanced bg-white d-flex flex-column justify-content-between">
                <div style={{ fontSize: '2rem', color: '#9c27b0' }} role="img" aria-label="Notarization">🧾</div>
                <div className="step-number badge text-white mb-2" style={{ fontSize: '1rem', backgroundColor: '#9c27b0' }}>Step 4</div>
                <h5 className="mt-2">Notarization</h5>
                <p>We'll schedule a licensed notary to complete the paperwork — online or in person at your convenience.</p>
              </div>
            </div>
          </div>
          <div className="section-divider"></div>
          <div className="text-center mt-4">
                          <span
                  className="badge bg-success bg-opacity-10 text-success p-2"
                  style={{
                    fontSize: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    margin: '0 auto',
                    verticalAlign: 'middle',
                  }}
                >
                  <span
                    role="img"
                    aria-label="Compliance"
                    style={{ fontSize: '1.2rem', marginRight: '0.4rem' }}
                  >
                    ✅
                  </span>
                  100% State & Federal Compliant
                </span>

          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-md-8">
              <blockquote className="blockquote text-center">
                <p className="mb-0">
                  "The SmarterPayouts team made the paperwork and process so easy. I felt safe and informed every step of the way!"
                </p>
                <footer className="blockquote-footer mt-2">A. Johnson, California</footer>
              </blockquote>
            </div>
          </div>
          <div className="section-divider"></div>
          {/* FAQ SECTION */}
          <div className="blog-article-enhanced p-4 bg-white rounded shadow-sm mt-5">
            <h2 className="fw-bold text-success mb-3">Review Offer FAQ</h2>
            <details className="mb-3">
              <summary className="fw-bold">Is the review process secure?</summary>
              <div className="mt-2 text-muted">Yes. All documents are handled securely and digitally, with full compliance for your state.</div>
            </details>
            <details className="mb-3">
              <summary className="fw-bold">How long does it take to finalize?</summary>
              <div className="mt-2 text-muted">Most reviews and signings are completed within a few days, depending on your state's requirements.</div>
            </details>
            <details>
              <summary className="fw-bold">Can I ask questions before signing?</summary>
              <div className="mt-2 text-muted">Absolutely! Our team is here to answer any questions and make sure you're comfortable before you sign.</div>
            </details>
          </div>
          <div className="text-center mt-4">
            <Link href="/faqs" className="btn btn-outline-success">Need Help? Read our FAQs</Link>
          </div>
        </div>
      </section>
      <div className="hero-buttons text-center mb-5">
        <Link href="/pricing-calculator" className="cta-button primary">
          Get Your Instant Offer
        </Link>
      </div>
      <Footer />
    </>
  );
}
