'use client';

import React from 'react';
import Link from 'next/link';

type ValueItemProps = {
  emoji: string;
  title: string;
  text: string;
  link: string;
};

const ValueItem: React.FC<ValueItemProps> = ({ emoji, title, text, link }) => (
  <div className="col-md-3 col-sm-6">
    <Link href={link} className="text-decoration-none text-dark">
      <div className="p-4 bg-white shadow rounded h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="fs-2 mb-2">{emoji}</div>
        <h6 className="fw-bold">{title}</h6>
        <p className="text-muted small mb-0">{text}</p>
      </div>
    </Link>
  </div>
);

const ValueProps: React.FC = () => (
  <section className="py-5 bg-light">
    <div className="container">
      <div className="row g-4 justify-content-center text-center">
        <ValueItem emoji="⚡" title="Instant Quotes" text="Skip the wait. Skip the phone tag." link="/getaquote" />
        <ValueItem emoji="🔒" title="100% Private" text="No personal information required." link="/reviewoffer" />
        <ValueItem emoji="⚖️" title="Court Approved" text="A judge approves the offer." link="/courtapproval" />
        <ValueItem emoji="📱" title="Mobile Friendly" text="Available 24/7 on any device." link="/pricingcalculator" />
      </div>
    </div>
  </section>
);

export default ValueProps;
