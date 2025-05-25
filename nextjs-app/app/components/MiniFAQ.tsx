'use client';

import Link from 'next/link';

const faqData = [
  {
    id: 1,
    question: 'Is it legal to sell my structured settlement?',
    answer: 'Yes — it’s fully legal and regulated. Each case is reviewed and approved by a judge to ensure fairness.',
  },
  {
    id: 2,
    question: 'How do I get a quote?',
    answer: (
      <>
        Just use our{' '}
        <Link href="/pricing-calculator" className="text-success text-decoration-underline">
          Early Payout Calculator
        </Link>{' '}
        — no signup or sensitive data needed.
      </>
    ),
  },
  {
    id: 3,
    question: 'What’s a Structured Settlement Transfer?',
    answer:
      "It's the legal process of converting your future payments into a lump-sum cash payout — often used for urgent needs or financial flexibility.",
  },
  {
    id: 4,
    question: 'How long does court approval take?',
    answer:
      'On average, 30–45 days depending on your state. Our team handles all legal work to keep things smooth and compliant.',
  },
  {
    id: 5,
    question: 'Do I need to hire a lawyer?',
    answer: "No — we take care of all the court filings and documents for you. It's fully managed and court-approved.",
  },
];

export default function MiniFAQ() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h3 className="text-center fw-bold text-success mb-4">Common Questions, Clear Answers</h3>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="accordion" id="miniFAQ">
              {faqData.map(({ id, question, answer }) => (
                <div className="accordion-item" key={id}>
                  <h2 className="accordion-header" id={`faq${id}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#a${id}`}
                    >
                      {question}
                    </button>
                  </h2>
                  <div
                    id={`a${id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#miniFAQ"
                  >
                    <div className="accordion-body text-muted">{answer}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-3">
              <Link href="/faqs" className="btn btn-outline-success">
                See All FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
