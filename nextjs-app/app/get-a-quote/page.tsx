import Head from 'next/head';
import Link from 'next/link';

export default function GetAQuote() {
  return (
    <>
      <Head>
        <title>Get a Quote | SmarterPayouts - Structured Settlement Experts</title>
        <meta
          name="description"
          content="Get a fast, no-obligation cash quote for your structured settlement. Use our online calculator or talk to a real expert—no personal info required!"
        />
        <meta
          name="keywords"
          content="structured settlement, get a quote, cash offer, online calculator, no personal info, instant quote, payout"
        />
        <meta property="og:title" content="Get a Quote | SmarterPayouts" />
        <meta
          property="og:description"
          content="Get a fast, no-obligation cash quote for your structured settlement. Use our online calculator or talk to a real expert—no personal info required!"
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
            Get Your Free, No-Obligation Quote
          </h1>
          <div className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
            SmarterPayouts makes it easy to see your options—no personal info, no pressure, just answers.
          </div>
          <Link href="/pricing-calculator" className="btn btn-success btn-lg mt-2">
            Get Your Instant Offer
          </Link>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* OPTIONS SECTION */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {/* Option 1: Online Calculator */}
            <div className="col-md-6">
              <Link
                href="/pricing-calculator"
                className="text-decoration-none text-dark"
                aria-label="Use our online calculator to get a quote"
              >
                <div
                  className="card-steps p-4 rounded shadow-sm blog-article-enhanced h-100 hover-shadow position-relative"
                  style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                >
                  <div
                    className="position-absolute top-0 end-0 m-3"
                    style={{ fontSize: '2rem' }}
                    role="img"
                    aria-label="Calculator"
                  >
                    🧮
                  </div>
                  <h5 className="text-success fw-bold mb-3">Option 1: Online Calculator</h5>
                  <p className="fw-bold mb-1">Fast, Private, and Secure</p>
                  <p className="text-muted">
                    Enter basic payment details—no personal info or credit check required. See your potential cash offer in seconds.
                  </p>
                  <div className="text-end mt-3">
                    <span className="badge bg-success bg-opacity-10 text-success fw-semibold">
                      No Personal Info Needed
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Option 2: Talk to Us */}
            <div className="col-md-6">
              <a
                href="tel:+18005551234"
                className="text-decoration-none text-dark"
                aria-label="Call to get a quote from a representative"
              >
                <div
                  className="card-steps p-4 rounded shadow-sm blog-article-enhanced h-100 hover-shadow position-relative"
                  style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                >
                  <div
                    className="position-absolute top-0 end-0 m-3"
                    style={{ fontSize: '2rem' }}
                    role="img"
                    aria-label="Phone"
                  >
                    📞
                  </div>
                  <h5 className="text-success fw-bold mb-3">Option 2: Talk to Us</h5>
                  <p className="fw-bold mb-1">Speak with a Real Expert</p>
                  <p className="text-muted">
                    Chat or call our client relations representative for a quote—no personal information needed.
                  </p>
                  <p className="text-muted">
                    If your payments are life contingent, we'll ask a few quick health questions.
                  </p>
                  <div className="text-end mt-3">
                    <span className="badge bg-success bg-opacity-10 text-success fw-semibold">
                      No Personal Info Needed
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* FAQ SECTION */}
      <section className="container mb-5">
        <div className="blog-article-enhanced p-4 bg-white rounded shadow-sm">
          <h2 className="fw-bold text-success mb-3">Quote FAQ</h2>
          <div>
            <details className="mb-3">
              <summary className="fw-bold">Do I need to provide personal information?</summary>
              <div className="mt-2 text-muted">No. Our online calculator and phone quotes do not require sensitive personal information or a credit check.</div>
            </details>
            <details className="mb-3">
              <summary className="fw-bold">How fast will I get my quote?</summary>
              <div className="mt-2 text-muted">Online quotes are instant. Phone quotes are provided during your call or chat session.</div>
            </details>
            <details className="mb-3">
              <summary className="fw-bold">Is there any obligation or pressure?</summary>
              <div className="mt-2 text-muted">Never. All quotes are free, confidential, and come with no obligation or sales pressure.</div>
            </details>
            <details>
              <summary className="fw-bold">What if I have a unique situation?</summary>
              <div className="mt-2 text-muted">Our experts can handle complex cases and will walk you through your options step by step.</div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
