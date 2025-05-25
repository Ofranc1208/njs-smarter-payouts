import Head from 'next/head';
import Link from 'next/link';

export default function GetYourCash() {
  return (
    <>
      <Head>
        <title>Get Your Cash | SmarterPayouts - Structured Settlement Experts</title>
        <meta
          name="description"
          content="Get your structured settlement cash fast and your way. SmarterPayouts offers direct deposit, check, or in-person delivery—no delays, no hidden fees."
        />
        <meta
          name="keywords"
          content="structured settlement, get cash, payout, direct deposit, check, fast payment, instant payout"
        />
        <meta property="og:title" content="Get Your Cash | SmarterPayouts" />
        <meta
          property="og:description"
          content="Get your structured settlement cash fast and your way. SmarterPayouts offers direct deposit, check, or in-person delivery—no delays, no hidden fees."
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
            Get Your Cash — Your Way
          </h1>
          <div className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
            Choose how you want to receive your structured settlement funds. Fast, secure, and always on your terms.
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
            {/* Direct Deposit */}
            <div className="col-md-4">
              <div className="card-steps h-100 p-4 rounded shadow-sm blog-article-enhanced bg-white d-flex flex-column justify-content-between">
                <div style={{ fontSize: '2rem' }} role="img" aria-label="Direct Deposit">🏦</div>
                <h5 className="mt-2">Direct Deposit</h5>
                <p>Fill out a secure direct deposit form via DocuSign. This is the fastest and most secure option.</p>
              </div>
            </div>
            {/* Paper Check */}
            <div className="col-md-4">
              <div className="card-steps h-100 p-4 rounded shadow-sm blog-article-enhanced bg-white d-flex flex-column justify-content-between">
                <div style={{ fontSize: '2rem' }} role="img" aria-label="Paper Check">✉️</div>
                <h5 className="mt-2">Paper Check</h5>
                <p>Prefer a physical check? We can mail it directly to your home address for your convenience.</p>
              </div>
            </div>
            {/* In-Person Delivery */}
            <div className="col-md-4">
              <div className="card-steps h-100 p-4 rounded shadow-sm blog-article-enhanced bg-white d-flex flex-column justify-content-between">
                <div style={{ fontSize: '2rem' }} role="img" aria-label="In-Person Delivery">🤝</div>
                <h5 className="mt-2">In-Person Delivery</h5>
                <p>In some cases, our funding partner can arrange personal delivery—just ask if you prefer this option.</p>
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
                <p className="mb-0">"I got my money fast and exactly how I wanted it. SmarterPayouts made everything easy and stress-free!"</p>
                <footer className="blockquote-footer mt-2">S. Patel, Georgia</footer>
              </blockquote>
            </div>
          </div>
          <div className="section-divider"></div>
          {/* FAQ SECTION */}
          <div className="blog-article-enhanced p-4 bg-white rounded shadow-sm mt-5">
            <h2 className="fw-bold text-success mb-3">Getting Your Cash FAQ</h2>
            <details className="mb-3">
              <summary className="fw-bold">How fast will I get my money?</summary>
              <div className="mt-2 text-muted">Most payments are released within 5–7 business days after court approval. We'll keep you updated every step of the way.</div>
            </details>
            <details className="mb-3">
              <summary className="fw-bold">Can I choose my payment method?</summary>
              <div className="mt-2 text-muted">Yes! Choose direct deposit, paper check, or in-person delivery—whatever works best for you.</div>
            </details>
            <details>
              <summary className="fw-bold">Are there any fees or delays?</summary>
              <div className="mt-2 text-muted">No hidden fees or unnecessary delays. We pride ourselves on transparency and speed.</div>
            </details>
          </div>
          <div className="text-center mt-4">
            <Link href="/faqs" className="btn btn-outline-success">Questions about your payout? Read our FAQs</Link>
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
