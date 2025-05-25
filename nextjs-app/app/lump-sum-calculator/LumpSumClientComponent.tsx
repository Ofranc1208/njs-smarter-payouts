'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RATE_SPREADS, AMOUNT_ADJUSTMENTS, BASE_DISCOUNT_RATE } from '../utils/npvConfig';

interface Payment {
  amount: string;
  lumpSumDate: string;
}

interface FormData {
  payments: Payment[];
}

const LumpSumCalculatorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFormData = searchParams.get('formData')
    ? JSON.parse(decodeURIComponent(searchParams.get('formData')!))
    : { payments: [{ amount: '', lumpSumDate: '' }] };

  const [numberOfPayments, setNumberOfPayments] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [calculationResult, setCalculationResult] = useState(null);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const currentPayments = formData.payments;
    const newPayments: Payment[] = [];
    for (let i = 0; i < numberOfPayments; i++) {
      newPayments.push(currentPayments[i] || { amount: '', lumpSumDate: '' });
    }
    setFormData((prev: FormData) => ({ ...prev, payments: newPayments }));
  }, [numberOfPayments]);

  const calculateSingleLumpSumNPV = ({
    amount,
    lumpSumDate,
    annualRate,
    presentValueDate,
  }: {
    amount: string | number;
    lumpSumDate: string;
    annualRate: number;
    presentValueDate?: Date;
  }) => {
    const pvDate = presentValueDate ? new Date(presentValueDate) : new Date();
    pvDate.setHours(0, 0, 0, 0);

    console.log('Lump Sum Calculation Inputs (calculateLumpSumNPV):', {
      amount,
      lumpSumDate,
      annualRate,
      presentValueDate: pvDate,
    });

    const lumpDate = new Date(lumpSumDate);
    lumpDate.setHours(0, 0, 0, 0);

    console.log('Lump Sum Dates (calculateLumpSumNPV):', {
      lumpDate: lumpDate.getTime(),
      pvDate: pvDate.getTime(),
    });

    const yearsDiff = lumpDate.getFullYear() - pvDate.getFullYear();
    const monthsDiff = lumpDate.getMonth() - pvDate.getMonth();
    const daysDiff = lumpDate.getDate() - pvDate.getDate();
    const monthsFromPVDate = yearsDiff * 12 + monthsDiff + daysDiff / 30.44;

    console.log('Months from Present Value Date (calculateLumpSumNPV):', monthsFromPVDate);

    if (monthsFromPVDate < 0) {
      console.log('Lump sum date is before present value date (calculateLumpSumNPV).');
      return { npv: parseFloat(amount.toString()), payments: 0 };
    }

    const periodicRate = annualRate / 12;
    const discountFactor = Math.pow(1 + periodicRate, monthsFromPVDate);
    const baseNpv = parseFloat(amount.toString()) / discountFactor;

    const minRate = annualRate + RATE_SPREADS.min;
    const maxRate = annualRate + RATE_SPREADS.max;
    const minDiscountFactor = Math.pow(1 + minRate / 12, monthsFromPVDate);
    const maxDiscountFactor = Math.pow(1 + maxRate / 12, monthsFromPVDate);
    const minNpvBeforeAdjustment = parseFloat(amount.toString()) / minDiscountFactor;
    const maxNpvBeforeAdjustment = parseFloat(amount.toString()) / maxDiscountFactor;

    const roundUp100 = (val: number) => Math.ceil((val - 0.001) / 100) * 100;

    return {
      npv: parseFloat(baseNpv.toFixed(2)),
      minOffer: Math.max(0, roundUp100(minNpvBeforeAdjustment - AMOUNT_ADJUSTMENTS.min)),
      maxOffer: Math.max(0, roundUp100(maxNpvBeforeAdjustment - AMOUNT_ADJUSTMENTS.max)),
      payments: 1,
    };
  };

  const calculateTotalNPVForRate = (annualRate: number) => {
    let total = 0;
    formData.payments.forEach((payment: Payment) => {
      const result = calculateSingleLumpSumNPV({
        amount: parseFloat(payment.amount),
        lumpSumDate: payment.lumpSumDate,
        annualRate,
      });
      total += result.npv;
    });
    return total;
  };

  const handleLumpSumCalculate = () => {
    setErrors({});
    const currentErrors: { [key: string]: string } = {};

    formData.payments.forEach((payment: Payment, index: number) => {
      const amountValue = payment.amount;
      const parsedAmount = parseFloat(amountValue);

      if (!amountValue || isNaN(parsedAmount) || parsedAmount <= 0) {
        currentErrors[`payment-${index}-amount`] = 'Please enter a valid positive Amount.';
      } else {
        const amountString = String(amountValue);
        const decimalIndex = amountString.indexOf('.');
        const wholePart = decimalIndex === -1 ? amountString : amountString.substring(0, decimalIndex);
        if (wholePart.length > 7) {
          currentErrors[`payment-${index}-amount`] = 'Amount cannot exceed 7 digits.';
        }
      }

      if (!payment.lumpSumDate) {
        currentErrors[`payment-${index}-date`] = 'Please enter a Payment Date.';
      }
    });

    if (Object.keys(currentErrors).length > 0) {
      console.error('Validation Errors:', currentErrors);
      setError('Please fix the errors in the form.');
      setErrors(currentErrors);
      return;
    }

    try {
      const baseRate = BASE_DISCOUNT_RATE;
      const totalNpv = calculateTotalNPVForRate(baseRate);
      const totalMin = calculateTotalNPVForRate(baseRate + RATE_SPREADS.min);
      const totalMax = calculateTotalNPVForRate(baseRate + RATE_SPREADS.max);
      const roundUp100 = (val: number) => Math.ceil((val - 0.001) / 100) * 100;

      const result = {
        npv: parseFloat(totalNpv.toFixed(2)),
        minOffer: roundUp100(Math.max(0, totalMin - AMOUNT_ADJUSTMENTS.min)),
        maxOffer: roundUp100(Math.max(0, totalMax - AMOUNT_ADJUSTMENTS.max)),
      };

      console.log('Lump Sum Calculation Result (to pass):', result);

      const encoded = encodeURIComponent(JSON.stringify(result));
      router.push(`/pricing-calculator?result=${encoded}`);
    } catch (err) {
      console.error('Lump Sum Calculation Error:', err);
      setError('An error occurred during calculation.');
    }
  };

  return (
    <>
      <div className="container py-5">
        <h1 className="mb-4 text-success fw-bold text-center">Lump Sum Calculator</h1>

        <div className="calculator-section mb-4">
          <label htmlFor="numberOfPayments" className="form-label calculator-label">Number of Lump Sum Payments (1–10)</label>
          <input
            id="numberOfPayments"
            type="number"
            value={numberOfPayments}
            onChange={(e) => setNumberOfPayments(Math.max(1, Math.min(10, parseInt(e.target.value))))}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            min={1}
            max={10}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>

        <div className="mt-4">
          {(Number(numberOfPayments) >= 1 && Number(numberOfPayments) <= 10) ? (
            formData.payments.map((payment, index) => (
              <div key={index} className="calculator-section border p-4 mb-4 rounded bg-light">
                <h5 className="mb-3">Payment {index + 1}</h5>
                <div className="mb-3">
                  <label htmlFor={`payment-${index}-amount`} className="form-label calculator-label">Payment Amount ($)</label>
                  <input
                    id={`payment-${index}-amount`}
                    type="text"
                    inputMode="decimal"
                    className={`form-control ${errors[`payment-${index}-amount`] ? 'is-invalid' : ''}`}
                    value={payment.amount}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const filteredValue = rawValue
                        .replace(/[^\d.]/g, '')
                        .replace(/^(\d*\.\d{0,2}).*$/, '$1');
                      const updated = [...formData.payments];
                      updated[index].amount = filteredValue;
                      setFormData({ ...formData, payments: updated });
                    }}
                  />
                  {errors[`payment-${index}-amount`] && (
                    <div className="invalid-feedback">{errors[`payment-${index}-amount`]}</div>
                  )}
                </div>
                <label htmlFor={`payment-${index}-date`} className="form-label calculator-label">Payment Date</label>
                <input
                  id={`payment-${index}-date`}
                  type="date"
                  className={`form-control ${errors[`payment-${index}-date`] ? 'is-invalid' : ''}`}
                  value={payment.lumpSumDate}
                  onChange={(e) => {
                    const updated = [...formData.payments];
                    updated[index].lumpSumDate = e.target.value;
                    setFormData({ ...formData, payments: updated });
                  }}
                />
                {errors[`payment-${index}-date`] && (
                  <div className="invalid-feedback">{errors[`payment-${index}-date`]}</div>
                )}
              </div>
            ))
          ) : (
            <div className="text-danger text-center my-3">
              Please input up to 10 lump sum payments.
            </div>
          )}
        </div>

        {(Number(numberOfPayments) >= 1 && Number(numberOfPayments) <= 10) && error && (
          <p className="text-danger text-center mt-3">{error}</p>
        )}

        <div className="text-center mt-4">
          <button className="btn btn-success btn-lg" onClick={handleLumpSumCalculate}>
            Calculate Lump Sum
          </button>
        </div>
      </div>
    </>
  );
};

export default LumpSumCalculatorPage;

