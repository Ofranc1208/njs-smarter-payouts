'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Step1PaymentDetails from '../components/Step1PaymentDetails';
import Step2LifeContingent from '../components/Step2LifeContingent';
import Step3OfferSheet from '../components/Step3OfferSheet';

const PricingCalculator = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(1);
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    paymentType: 'Guaranteed',
    paymentMode: 'Monthly',
    amount: '',
    increaseRate: 0,
    startDate: '',
    endDate: '',
    discountRate: 8.5,
  });

  const goToStep = (newStep: number) => {
    if (newStep === 1) {
      setCalculationResult(null);
    }
    setStep(newStep);
  };

  useEffect(() => {
    const encodedResult = searchParams.get('result');
    if (encodedResult) {
      try {
        const parsed = JSON.parse(decodeURIComponent(encodedResult));
        setCalculationResult(parsed);
        setStep(3);
      } catch (err) {
        console.error('Failed to parse calculation result from query params:', err);
      }
    }
  }, [searchParams]);

  return (
    <>
      <div className="container py-3">
        <h1 className="mb-4 text-success fw-bold text-center">Early Payout Calculator</h1>
        <div className="text-center mb-2">Step {step} of 3</div>
        {step === 1 && (
          <Step1PaymentDetails
            onNext={() => goToStep(formData.paymentType === 'Life Contingent' ? 2 : 3)}
            setCalculationResult={setCalculationResult}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <Step2LifeContingent
            onBack={() => goToStep(1)}
            onNext={() => goToStep(3)}
            formData={formData}
            setFormData={setFormData}
            setCalculationResult={setCalculationResult}
          />
        )}
        {step === 3 && (
          <Step3OfferSheet
            calculationResult={calculationResult}
            formData={formData}
            onBack={() => goToStep(formData.paymentType === 'Life Contingent' ? 2 : 1)}
          />
        )}
      </div>
    </>
  );
};

export default PricingCalculator;
