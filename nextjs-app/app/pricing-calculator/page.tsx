import React, { Suspense } from 'react';
import PricingCalculator from './PricingCalculatorClient';

export default function PricingCalculatorPageWrapper() {
  return (
    <Suspense fallback={<div>Loading calculator...</div>}>
      <PricingCalculator />
    </Suspense>
  );
}
