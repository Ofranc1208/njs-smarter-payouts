'use client';

import { useState } from 'react';
import { calcNPVWithAdjustment, calculateGuaranteedNPV } from '../utils/npvCalculations';
import { FAMILY_PROTECTION_DISCOUNT_RATE } from '../utils/npvConfig';

interface Question {
  label: string;
  key: string;
  options: { label: string; key: string }[];
}

interface Props {
  onBack: () => void;
  onNext: () => void;
  formData: any;
  setFormData: (data: any) => void;
  setCalculationResult: (result: any) => void;
}

const questions: Question[] = [
  { label: 'Approximate Age', key: 'age', options: [
    { label: '18–25', key: 'age-18-25' },
    { label: '26–35', key: 'age-26-35' },
    { label: '36–45', key: 'age-36-45' },
    { label: '46–50', key: 'age-46-50' },
    { label: '51–56', key: 'age-51-56' },
    { label: '57–65', key: 'age-57-65' }
  ]},
  { label: 'Gender', key: 'gender', options: [
    { label: 'Male', key: 'gender-male' },
    { label: 'Female', key: 'gender-female' }
  ]},
  { label: 'Body Frame', key: 'build', options: [
    { label: 'Small Build', key: 'build-small' },
    { label: 'Medium Build', key: 'build-medium' },
    { label: 'Tall Build', key: 'build-tall' }
  ]},
  { label: 'Weight Overview', key: 'weight', options: [
    { label: 'Underweight', key: 'underweight' },
    { label: 'Normal Weight', key: 'normal' },
    { label: 'Overweight', key: 'overweight' },
    { label: 'Obesity', key: 'obese' },
    { label: 'Severe Obesity', key: 'severe-obese' }
  ]},
  { label: 'Do You Smoke?', key: 'smoke', options: [
    { label: 'Yes', key: 'smoke-yes' },
    { label: 'No', key: 'smoke-no' }
  ]},
  { label: 'Health Profile', key: 'health', options: [
    { label: 'Great', key: 'health-great' },
    { label: 'Normal', key: 'health-normal' },
    { label: 'Fair', key: 'health-fair' },
    { label: 'Below Fair', key: 'health-belowfair' }
  ]},
  { label: 'Cardiac Health', key: 'cardiac', options: [
    { label: 'Normal', key: 'cardiac-normal' },
    { label: 'Medicated', key: 'cardiac-medicated' },
    { label: 'High', key: 'cardiac-high' },
    { label: 'Not Sure', key: 'cardiac-unsure' }
  ]}
];

export default function Step2LifeContingent({
  onBack,
  onNext,
  formData,
  setFormData,
  setCalculationResult
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (groupKey: string, itemKey: string) => {
    const updated = { ...answers, [groupKey]: itemKey };
    setAnswers(updated);
    setFormData((prev) => ({ ...prev, lcpAnswers: Object.values(updated) }));
  };

  const handleCalculate = () => {
    const { amount, startDate, endDate, discountRate, paymentMode, increaseRate } = formData;

    if (!amount || !startDate || !endDate || !discountRate || !paymentMode) {
      alert('❗ Please complete all payment details before continuing.');
      return;
    }

    const lcpKeys = Object.values(answers);
    if (lcpKeys.length < questions.length) {
      alert('⚠️ Please answer all health questions.');
      return;
    }

    try {
      const baseRate = parseFloat(discountRate) / 100;
      const amt = parseFloat(amount);
      const incRate = parseFloat(increaseRate || 0);

      const mainResult = calcNPVWithAdjustment({
        amount: amt,
        startDate,
        endDate,
        baseRate,
        lcpKeys,
        paymentMode,
        increaseRate: incRate
      });

      const nominalRate = FAMILY_PROTECTION_DISCOUNT_RATE;
      const effectiveMonthly = Math.pow(1 + nominalRate, 1 / 12) - 1;
      const effectiveAnnual = Math.pow(1 + effectiveMonthly, 12) - 1;

      const familyResult = calculateGuaranteedNPV({
        amount: amt,
        startDate,
        endDate,
        discountRate: effectiveAnnual * 100,
        paymentMode,
        increaseRate: incRate
      });

      if (!mainResult || typeof mainResult.npv !== 'number') {
        alert('⚠️ Calculation failed: Invalid result.');
        return;
      }

      setCalculationResult({
        ...mainResult,
        familyProtectionNPV: familyResult?.npv || 0,
        amount: amt,
        startDate,
        endDate,
        discountRate,
        paymentMode,
        increaseRate: incRate,
        paymentType: 'Life Contingent',
        lcpKeys
      });

      onNext();
    } catch (err) {
      console.error('❌ Calculation error:', err);
      alert('An error occurred while calculating. Please check your inputs.');
    }
  };

  return (
    <main className="calculator-page">
      <div className="calculator">
        <h2 className="text-center mb-4">Life Contingent Profile</h2>

        {questions.map((q) => (
          <div key={q.key} className="calculator-section lcp-question">
            <label className="calculator-label">{q.label}</label>
            <div className={`calculator-button-group ${q.options.length >= 3 ? 'small-button-group' : ''}`}>
              {q.options.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  className={answers[q.key] === opt.key ? 'selected' : ''}
                  onClick={() => handleSelect(q.key, opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="step2-actions text-center mt-4">
          <button className="btn btn-warning me-2" onClick={onBack}>Back</button>
          <button className="btn btn-success" onClick={handleCalculate}>Calculate</button>
        </div>
      </div>
    </main>
  );
}

