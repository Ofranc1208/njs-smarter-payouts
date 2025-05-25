import React, { Suspense } from 'react';
import LumpSumClientComponent from './LumpSumClientComponent';

export default function LumpSumCalculatorPageWrapper() {
  return (
    <Suspense fallback={<div>Loading Calculator...</div>}>
      <LumpSumClientComponent />
    </Suspense>
  );
}
