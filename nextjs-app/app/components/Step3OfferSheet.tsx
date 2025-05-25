'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { calculateMinMaxNPV } from '../utils/npvCalculations';
import { AMOUNT_ADJUSTMENTS } from '../utils/npvConfig';
import UnlockModal from './UnlockModal';

interface Props {
  calculationResult: any;
  formData: any;
  onBack?: () => void;
}

export default function Step3OfferSheet({ calculationResult, formData, onBack }: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 12000); // 12 seconds

    return () => clearTimeout(timer);
  }, []);

  // Remove ?result=... from the URL after showing the result (for lump sum flow)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.history && window.location.search.includes('result=')) {
      const url = new URL(window.location.href);
      url.searchParams.delete('result');
      window.history.replaceState({}, document.title, url.pathname + url.search);
    }
  }, []);

  const { minOffer, maxOffer, familyProtectionNPV, npv } = calculationResult || {};

  // If minOffer/maxOffer are not present, try to calculate from formData (for legacy/other flows)
  let min = minOffer, max = maxOffer;
  if ((typeof min !== 'number' || typeof max !== 'number') && formData) {
    const minMax = calculateMinMaxNPV({
      amount: formData.amount,
      startDate: formData.startDate,
      endDate: formData.endDate,
      baseRate: parseFloat(formData.discountRate) / 100,
      paymentMode: formData.paymentMode,
      increaseRate: formData.increaseRate,
      minAdjustment: AMOUNT_ADJUSTMENTS.min,
      maxAdjustment: AMOUNT_ADJUSTMENTS.max,
      isLCP: formData.paymentType === 'Life Contingent',
      lcpKeys: formData.lcpAnswers || formData.lcpKeys || []
    });
    min = minMax.minOffer;
    max = minMax.maxOffer;
  }

  const format = (val: number): string =>
    val?.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  let noOfferMessage = 'No offer available.';
  const paymentType = formData?.paymentType || '';
  if (paymentType === 'Guaranteed') noOfferMessage = 'No Guaranteed offer available.';
  else if (paymentType === 'Life Contingent') noOfferMessage = 'No Life Contingent offer available.';
  else if (paymentType === 'Lump Sum') noOfferMessage = 'No Lump Sum offer available.';

  if (!min || !max || isNaN(min) || isNaN(max)) {
    return (
      <div className="calculator text-center p-4">
        <h2 className="text-center mb-3">Early Payout Calculator</h2>
        <p className="text-danger mb-3">⚠️ {noOfferMessage}</p>
        <button className="btn btn-warning w-50" onClick={onBack || (() => router.back())}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="step calculator text-center px-3 py-4">
      

      <div className="bg-white rounded shadow-sm p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h2 className="offer-brand mb-3 text-success fw-bold">🎉 Congratulations</h2>
        <p className="offer-subtitle text-muted mb-4">
          Here's your Early Payout offer.
          <br />
          Funding available in as little as <strong>30 days</strong>.
        </p>

        <ul className="offer-list list-unstyled mb-4">
          {/*
            The Lump Sum Value (npv) is intentionally hidden from users.
            Uncomment the following block if you want to display it again in the future.
          {typeof npv === 'number' && (
            <li className="offer-item d-flex justify-content-between px-3 py-2 border-bottom">
              <span className="offer-label fw-medium">Lump Sum Value</span>
              <span className="offer-value text-primary fw-bold">${format(npv)}</span>
            </li>
          )}
          */}
          <li className="offer-item d-flex justify-content-between px-3 py-2 border-bottom">
            <span className="offer-label fw-medium">Min Offer</span>
            <span className="offer-value text-secondary">${format(min)}</span>
          </li>

          <li className="offer-item d-flex flex-column align-items-center px-3 py-3 border-bottom bg-light rounded mb-2">
            <div className="d-flex align-items-center mb-1">
              <span className="offer-label fw-medium me-2">Max Payout Offer</span>
            </div>
            <span className="offer-value text-success fw-bold" style={{ fontSize: '2rem' }}>
              ${format(max)}
            </span>
            <small className="text-muted mt-1">This is the highest amount you may qualify for.</small>
          </li>

          {typeof familyProtectionNPV === 'number' && (
            <li className="offer-item d-flex justify-content-between px-3 py-2 border-bottom">
              <span className="offer-label fw-medium">Family Benefit</span>
              <span className="offer-value text-muted fw-semibold">${format(familyProtectionNPV)}</span>
            </li>
          )}
        </ul>

        <button className="btn btn-warning w-50" onClick={onBack || (() => router.back())}>
          Back
        </button>

        <div className="offer-footer mt-5 small text-muted">
          <strong>SmarterPayouts LLC</strong>
          <br />
          123 Main Street, Suite 200, Dallas TX 75201
          <br />
          <a href="tel:+18885551234" className="text-reset text-decoration-none">
            1-888-555-1234
          </a>{' '}
          •{' '}
          <a href="mailto:info@smarterpayouts.com" className="text-reset text-decoration-none">
            info@smarterpayouts.com
          </a>
        </div>
      </div>

      {showModal && <UnlockModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
