import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | SmarterPayouts</title>
        <meta name="description" content="Learn how SmarterPayouts protects your privacy and handles your information. Transparent, secure, and user-focused policies." />
      </Head>
      {/* HERO SECTION */}
      <section className="how-fast-hero p-4 rounded mb-4 d-flex align-items-center justify-content-center" style={{
        background: "linear-gradient(90deg, #e9f9f1 60%, #fbc23322 100%)",
        boxShadow: "0 4px 24px rgba(9,180,77,0.08)",
        minHeight: '180px'
      }}>
        <div className="text-center w-100">
          <h1 className="fw-bold mb-2 text-success" style={{ fontSize: "2.2rem", letterSpacing: "-1px" }}>
            Privacy Policy
          </h1>
          <div className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
            Your privacy matters. Learn how we protect your information at SmarterPayouts.
          </div>
        </div>
      </section>
      <div className="section-divider"></div>
      <section className="container py-5">
        <div className="blog-article-enhanced p-4 bg-white rounded shadow-sm">
          <h2 className="fw-bold text-success mb-3">Our Commitment to Your Privacy</h2>
          <p>
            SmarterPayouts is committed to protecting your privacy and ensuring your personal information is handled securely and transparently. This Privacy Policy explains what information we collect, how we use it, and your rights as a user of our website and services.
          </p>
          <h3 className="mt-4">Information We Collect</h3>
          <ul>
            <li><strong>Information you provide:</strong> Name, email, and details you submit via forms or calculators.</li>
            <li><strong>Automatic data:</strong> IP address, browser type, device info, and usage data collected via cookies and analytics tools.</li>
          </ul>
          <h3 className="mt-4">How We Use Your Information</h3>
          <ul>
            <li>To provide quotes, respond to inquiries, and deliver services you request.</li>
            <li>To improve our website, user experience, and customer support.</li>
            <li>To comply with legal obligations and prevent fraud.</li>
          </ul>
          <h3 className="mt-4">How We Protect Your Data</h3>
          <ul>
            <li>We use industry-standard encryption and security measures.</li>
            <li>We never sell or rent your personal information.</li>
            <li>Access to your data is limited to authorized team members only.</li>
          </ul>
          <h3 className="mt-4">Cookies & Analytics</h3>
          <p>
            We use cookies and analytics tools (like Google Analytics) to understand how visitors use our site. You can control cookie preferences in your browser settings.
          </p>
          <h3 className="mt-4">Your Rights</h3>
          <ul>
            <li>You can request, update, or delete your personal information at any time.</li>
            <li>Contact us at <a href="mailto:support@smarterpayouts.com">support@smarterpayouts.com</a> for privacy requests.</li>
          </ul>
          <h3 className="mt-4">Policy Updates</h3>
          <p>
            We may update this policy from time to time. Changes will be posted on this page with a new effective date.
          </p>
        </div>
        <div className="section-divider"></div>
        {/* FAQ SECTION */}
        <div className="blog-article-enhanced p-4 bg-white rounded shadow-sm mt-5">
          <h2 className="fw-bold text-success mb-3">Privacy FAQ</h2>
          <details className="mb-3">
            <summary className="fw-bold">Do you sell my information?</summary>
            <div className="mt-2 text-muted">No. We never sell or rent your personal information to third parties.</div>
          </details>
          <details className="mb-3">
            <summary className="fw-bold">How can I update or delete my data?</summary>
            <div className="mt-2 text-muted">Email us at support@smarterpayouts.com and we'll help you with your request.</div>
          </details>
          <details>
            <summary className="fw-bold">Are my quotes confidential?</summary>
            <div className="mt-2 text-muted">Yes. All quotes and communications are handled securely and confidentially.</div>
          </details>
        </div>
      </section>
    </>
  );
} 