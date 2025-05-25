import Head from 'next/head';
import Link from 'next/link';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | SmarterPayouts</title>
        <meta name="description" content="Read the terms and conditions for using SmarterPayouts. Clear, fair, and user-focused policies for your peace of mind." />
      </Head>
      {/* HERO SECTION */}
      <section className="how-fast-hero p-4 rounded mb-4 d-flex align-items-center justify-content-center" style={{
        background: "linear-gradient(90deg, #e9f9f1 60%, #fbc23322 100%)",
        boxShadow: "0 4px 24px rgba(9,180,77,0.08)",
        minHeight: '180px'
      }}>
        <div className="text-center w-100">
          <h1 className="fw-bold mb-2 text-success" style={{ fontSize: "2.2rem", letterSpacing: "-1px" }}>
            Terms and Conditions
          </h1>
          <div className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
            Please read these terms before using SmarterPayouts.
          </div>
        </div>
      </section>
      <div className="section-divider"></div>
      <section className="container py-5">
        <div className="blog-article-enhanced p-4 bg-white rounded shadow-sm">
          <h2 className="fw-bold text-success mb-3">Our Terms of Service</h2>
          <h3 className="mt-4">1. Acceptance of Terms</h3>
          <p>By using the SmarterPayouts website and services, you agree to these terms and conditions. If you do not agree, please do not use our site.</p>
          <h3 className="mt-4">2. Use of the Website</h3>
          <ul>
            <li>You must be at least 18 years old to use our services.</li>
            <li>Do not use our site for unlawful or prohibited purposes.</li>
            <li>Information provided must be accurate and not misleading.</li>
          </ul>
          <h3 className="mt-4">3. Intellectual Property</h3>
          <ul>
            <li>All content, trademarks, and logos are the property of SmarterPayouts or its licensors.</li>
            <li>You may not copy, reproduce, or distribute content without permission.</li>
          </ul>
          <h3 className="mt-4">4. Disclaimers & Limitations</h3>
          <ul>
            <li>Information on this site is for general purposes only and not legal or financial advice.</li>
            <li>We do our best to keep information accurate but do not guarantee completeness or timeliness.</li>
            <li>SmarterPayouts is not liable for any damages arising from use of the site or services.</li>
          </ul>
          <h3 className="mt-4">5. User Responsibilities</h3>
          <ul>
            <li>Keep your login and personal information secure.</li>
            <li>Do not attempt to disrupt or harm the website or other users.</li>
          </ul>
          <h3 className="mt-4">6. Changes to Terms</h3>
          <p>We may update these terms at any time. Changes will be posted on this page with a new effective date. Continued use of the site means you accept the new terms.</p>
          <h3 className="mt-4">7. Contact</h3>
          <p>If you have questions about these terms, contact us at <a href="mailto:support@smarterpayouts.com">support@smarterpayouts.com</a>.</p>
        </div>
        <div className="section-divider"></div>
        {/* FAQ SECTION */}
        <div className="blog-article-enhanced p-4 bg-white rounded shadow-sm mt-5">
          <h2 className="fw-bold text-success mb-3">Terms & Conditions FAQ</h2>
          <details className="mb-3">
            <summary className="fw-bold">Can I use your content on my own site?</summary>
            <div className="mt-2 text-muted">No. All content is protected and may not be reused without written permission.</div>
          </details>
          <details className="mb-3">
            <summary className="fw-bold">How will I know if the terms change?</summary>
            <div className="mt-2 text-muted">We post updates on this page. Please check back regularly for the latest version.</div>
          </details>
          <details>
            <summary className="fw-bold">Who can I contact with questions?</summary>
            <div className="mt-2 text-muted">Email support@smarterpayouts.com and our team will be happy to help.</div>
          </details>
        </div>
      </section>
    </>
  );
} 