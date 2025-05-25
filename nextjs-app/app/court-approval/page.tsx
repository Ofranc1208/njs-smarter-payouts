import Head from 'next/head';
import Link from 'next/link';

export default function CourtApproval() {
  return (
    <>
      <Head>
        <title>Court Approval Process | SmarterPayouts - Structured Settlement Experts</title>
        <meta
          name="description"
          content="Learn how the structured settlement court approval process works. SmarterPayouts guides you through every step, ensuring compliance, security, and peace of mind."
        />
        <meta
          name="keywords"
          content="structured settlement, court approval, legal process, judge, hearing, payout, compliance"
        />
        <meta property="og:title" content="Court Approval Process | SmarterPayouts" />
        <meta
          property="og:description"
          content="Learn how the structured settlement court approval process works. SmarterPayouts guides you through every step, ensuring compliance, security, and peace of mind."
        />
        <meta property="og:type" content="website" />
      </Head>
      {/* HERO SECTION */}
      <section className="how-fast-hero p-4 rounded mb-4 d-flex align-items-center justify-content-center" style={{
        background: "linear-gradient(90deg, #e9f9f1 60%, #fbc23322 100%)",
        boxShadow: "0 4px 24px rgba(9,180,77,0.08)",
        minHeight: '180px'
      }}>
        <div className="text-center w-100">
          <h1 className="fw-bold mb-2 text-success" style={{ fontSize: "2.2rem", letterSpacing: "-1px" }}>
            How the Structured Settlement Court Approval Process Works
          </h1>
          <div className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
            We make the court approval process simple, transparent, and stress-free. Our team guides you every step of the way.
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
                <div style={{ fontSize: '2rem' }} role="img" aria-label="File the Petition">📝</div>
                <div className="step-number badge bg-success mb-2" style={{ fontSize: '1rem' }}>Step 1</div>
                <h5 className="mt-2">File the Petition</h5>
                <p>Once you accept your offer, we file a legal petition with your state court to begin the approval process.</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="col-md-3 col-sm-6">
              <div className="card-steps h-100 p-4 rounded shadow-sm blog-article-enhanced bg-white d-flex flex-column justify-content-between">
                <div style={{ fontSize: '2rem' }} role="img" aria-label="Judge Reviews">👨‍⚖️</div>
                <div className="step-number badge bg-primary mb-2" style={{ fontSize: '1rem' }}>Step 2</div>
                <h5 className="mt-2">Judge Reviews</h5>
                <p>A judge reviews your paperwork, makes sure the offer is in your best interest, and ensures legal compliance.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="col-md-3 col-sm-6">
              <div className="card-steps h-100 p-4 rounded shadow-sm blog-article-enhanced bg-white d-flex flex-column justify-content-between">
                <div style={{ fontSize: '2rem' }} role="img" aria-label="Court Hearing">🏛️</div>
                <div className="step-number badge bg-warning text-dark mb-2" style={{ fontSize: '1rem' }}>Step 3</div>
                <h5 className="mt-2">Court Hearing</h5>
                <p>Some states require a brief hearing. You may join by phone, Zoom, or in person. We'll walk you through everything.</p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="col-md-3 col-sm-6">
              <div className="card-steps h-100 p-4 rounded shadow-sm blog-article-enhanced bg-white d-flex flex-column justify-content-between" style={{ backgroundColor: '#c9f5d7' }}>
                <div style={{ fontSize: '2rem' }} role="img" aria-label="Approval">✅</div>
                <div className="step-number badge bg-success mb-2" style={{ fontSize: '1rem' }}>Step 4</div>
                <h5 className="mt-2 text-success">Approval</h5>
                <p>Once approved, your Early Payout is typically released within 5–7 business days. If requirements aren't met, it may take longer.</p>
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
                  style={{ fontSize: '0.8rem', marginRight: '0.4rem' }}
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
                  "I was nervous about the court process, but SmarterPayouts explained everything and made it easy. The judge even commented on how well-prepared I was!"
                </p>
                <footer className="blockquote-footer mt-2">M. Lee, Florida</footer>
              </blockquote>
            </div>
          </div>
          <div className="section-divider"></div>
          {/* FAQ SECTION */}
          <div className="blog-article-enhanced p-4 bg-white rounded shadow-sm mt-5">
            <h2 className="fw-bold text-success mb-3">Court Approval FAQ</h2>
            <details className="mb-3">
              <summary className="fw-bold">Do I have to appear in court?</summary>
              <div className="mt-2 text-muted">In some states, yes. You may be able to appear by phone or Zoom. We'll prepare you for what to expect.</div>
            </details>
            <details className="mb-3">
              <summary className="fw-bold">How long does court approval take?</summary>
              <div className="mt-2 text-muted">Most approvals are completed in 3–6 weeks, depending on your state and court schedule.</div>
            </details>
            <details>
              <summary className="fw-bold">What if the judge has questions?</summary>
              <div className="mt-2 text-muted">Our team will help you prepare and answer any questions. The process is designed to protect you.</div>
            </details>
          </div>
          <div className="text-center mt-4">
            <Link href="/faqs" className="btn btn-outline-success">Have Questions? Read our Court Approval FAQs</Link>
          </div>
        </div>
      </section>
      <div className="hero-buttons text-center mb-5">
        <Link href="/pricing-calculator" className="cta-button primary">
          Get Your Instant Offer
        </Link>
      </div>
    </>
  );
}
