'use client';

import React from 'react';

interface TestimonialProps {
  text: string;
  author: string;
}

const Testimonial = ({ text, author }: TestimonialProps) => (
  <div className="col">
    <div className="card p-3 h-100">
      <p>{`“${text}”`}</p>
      <h6 className="mt-2">— {author}</h6>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">What Our Clients Say</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <Testimonial text="Everything was fast and smooth. They were transparent and helpful." author="Jamie L." />
          <Testimonial text="No personal info needed to get started. That made me feel safe." author="Daniel K." />
          <Testimonial text="Court approval sounded scary, but they handled everything." author="Alexis M." />
        </div>
      </div>
    </section>
  );
}
