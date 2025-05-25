import Link from 'next/link';
import Head from 'next/head';

export default function Articles() {
  return (
    <>
      <Head>
        <title>Structured Settlement Resources & Articles | SmarterPayouts</title>
        <meta name="description" content="Expert advice, financial insights, and structured settlement tips from SmarterPayouts. Learn about selling, court approval, and getting your cash fast." />
        <meta name="keywords" content="structured settlement, articles, resources, blog, financial tips, payout" />
        <meta property="og:title" content="Structured Settlement Resources & Articles | SmarterPayouts" />
        <meta property="og:description" content="Expert advice, financial insights, and structured settlement tips from SmarterPayouts. Learn about selling, court approval, and getting your cash fast." />
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
            SmarterPayouts Resources
          </h1>
          <div className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
            Expert advice, financial insights, and structured settlement tips — all in one place.
          </div>
          <Link href="/pricing-calculator" className="btn btn-success btn-lg mt-2">
            Get Your Instant Offer
          </Link>
        </div>
      </section>
      <div className="section-divider"></div>
      <section className="container py-5" aria-label="Structured Settlement Resources and Articles">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* BLOG CARD 1 */}
          <div className="col">
            <article className="card h-100 border-0 shadow-sm blog-article-enhanced hover-shadow">
              <img src="/assets/images/court1.jpg" className="card-img-top" alt="Courtroom with judge - Structured Settlements Explained" loading="lazy" />
              <div className="card-body">
                <h5 className="card-title">Structured Settlements <span className="badge bg-success ms-2">Featured</span></h5>
                <p className="card-text">Understand how structured settlements work, their benefits, and key decisions before cashing out.</p>
                <Link href="/blog/structured-settlements" className="btn btn-outline-success btn-sm">Read More</Link>
              </div>
            </article>
          </div>
          {/* BLOG CARD 2 */}
          <div className="col">
            <article className="card h-100 border-0 shadow-sm blog-article-enhanced hover-shadow">
              <img src="/assets/images/sell.jpg" className="card-img-top" alt="Person considering selling settlement - Should You Sell Your Settlement?" loading="lazy" />
              <div className="card-body">
                <h5 className="card-title">Should You Sell Your Structured Settlement?</h5>
                <p className="card-text">Explore when it's smart to sell your payments and what you should watch out for in the process.</p>
                <Link href="/blog/should-you-sell" className="btn btn-outline-success btn-sm">Read More</Link>
              </div>
            </article>
          </div>
          {/* BLOG CARD 3 */}
          <div className="col">
            <article className="card h-100 border-0 shadow-sm blog-article-enhanced hover-shadow">
              <img src="/assets/images/online.jpg" className="card-img-top" alt="Laptop showing online payout - How Fast Is a Settlement Payout?" loading="lazy" />
              <div className="card-body">
                <h5 className="card-title">How Fast Is a Settlement Payout?</h5>
                <p className="card-text">Learn how long it typically takes to receive your payout and how SmarterPayouts speeds up the process.</p>
                <Link href="/blog/how-fast-payout" className="btn btn-outline-success btn-sm">Read More</Link>
              </div>
            </article>
          </div>
        </div>
        <div className="section-divider"></div>
        {/* Testimonial */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <blockquote className="blockquote text-center">
              <p className="mb-0">"The articles helped me understand my options and make the best decision for my family."</p>
              <footer className="blockquote-footer mt-2">D. Nguyen, Illinois</footer>
            </blockquote>
          </div>
        </div>
        <div className="section-divider"></div>
        {/* FAQ SECTION */}
        <div className="blog-article-enhanced p-4 bg-white rounded shadow-sm mt-5">
          <h2 className="fw-bold text-success mb-3">Articles FAQ</h2>
          <details className="mb-3">
            <summary className="fw-bold">How often are new articles published?</summary>
            <div className="mt-2 text-muted">We add new articles and resources every month. Check back often or subscribe to our newsletter for updates.</div>
          </details>
          <details className="mb-3">
            <summary className="fw-bold">Can I request a topic?</summary>
            <div className="mt-2 text-muted">Absolutely! Use our contact form to suggest topics or questions you'd like us to cover.</div>
          </details>
          <details>
            <summary className="fw-bold">Are your articles reviewed by experts?</summary>
            <div className="mt-2 text-muted">Yes. All content is reviewed by structured settlement professionals for accuracy and clarity.</div>
          </details>
        </div>
        <div className="text-center mt-4">
          <Link href="/faqs" className="btn btn-outline-success">Browse All FAQs & Topics</Link>
        </div>
      </section>
      <div className="hero-buttons text-center my-5">
        <Link href="/pricing-calculator" className="cta-button primary">Get Your Instant Offer</Link>
      </div>
    </>
  );
}
