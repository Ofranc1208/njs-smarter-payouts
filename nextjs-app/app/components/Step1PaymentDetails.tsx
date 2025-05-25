'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { calculateGuaranteedNPV } from '../utils/npvCalculations';
import { isValidDate } from '../utils/validationHelpers';
import { tooltipDefinitions } from '../utils/tooltipDefinitions';

interface Props {
  formData: any;
  setFormData: (value: any) => void;
  onNext: () => void;
  setCalculationResult: (value: any) => void;
}

export default function Step1PaymentDetails({
  formData,
  setFormData,
  onNext,
  setCalculationResult
}: Props) {
  const [errors, setErrors] = useState<any>({});
  const [tooltipContent, setTooltipContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isAdditionalDetailsCollapsed, setIsAdditionalDetailsCollapsed] = useState(true);
  const router = useRouter();

  const {
    amount,
    startDate,
    endDate,
    paymentMode,
    increaseRate = 0,
    paymentType,
    discountRate
  } = formData;

  const updateField = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove all except digits and decimal
    value = value.replace(/[^\d.]/g, '');
    // Only allow one decimal point
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    // Limit to two decimal places
    if (parts[1]) value = parts[0] + '.' + parts[1].slice(0, 2);
    // Remove leading zeros unless before decimal
    value = value.replace(/^0+(?!\.|$)/, '');
    updateField('amount', value);
  };

  const handleValidate = () => {
    const newErrors: any = {};
    const amt = parseFloat(amount);

    if (isNaN(amt)) {
      newErrors.amount = 'Please enter a valid number for the amount.';
    } else if (amt < 100 || amt > 1000000) {
      newErrors.amount = 'Enter a value between $100 and $1,000,000.';
    }
    if (!validateStartDate(startDate)) {
      newErrors.startDate = 'Start date cannot be in the past (min May 14, 2024)';
    }
    if (!validateEndDateRange(startDate, endDate)) {
      newErrors.endDate = 'End date must be at least 6 months after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!handleValidate()) return;

    if (paymentType === 'Guaranteed') {
      const result = calculateGuaranteedNPV({
        amount: parseFloat(amount),
        startDate,
        endDate,
        discountRate: parseFloat(discountRate),
        paymentMode,
        increaseRate: parseFloat(increaseRate) || 0
      });
      setCalculationResult(result);
    }

    onNext();
  };

  const showInfo = (html: string) => {
    setTooltipContent(html);
    setShowTooltip(true);
  };

  const hideInfo = () => {
    setTooltipContent('');
    setShowTooltip(false);
  };

  useEffect(() => {
    const handler = () => setShowTooltip(false);
    if (showTooltip) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [showTooltip]);

  // Replace validateStartDate and validateEndDateRange with local implementations
  const validateStartDate = (startDate: string) => {
    const minDate = new Date('2024-05-14');
    const sDate = new Date(startDate);
    return isValidDate(sDate) && sDate >= minDate;
  };

  const validateEndDateRange = (startDate: string, endDate: string) => {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    if (!isValidDate(sDate) || !isValidDate(eDate)) return false;
    // At least 6 months apart
    return eDate > sDate && (eDate.getFullYear() - sDate.getFullYear()) * 12 + (eDate.getMonth() - sDate.getMonth()) >= 6;
  };

  return (
    <div className="step step1 calculator">
      {/* Payment Type */}
      <div className="calculator-section">
        <label className="calculator-label">
          Type of Payment
          <span className="what-is-it-trigger" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            showInfo(tooltipDefinitions.paymentType);
          }}>
            ( More Info )
          </span>
        </label>
        <div className="calculator-button-group">
          {['Guaranteed', 'Life Contingent', "I Don't Know"].map(type => (
            <button
              key={type}
              type="button"
              className={`calculator-type-button ${paymentType === type ? 'selected-type' : ''}`}
              onClick={() => updateField('paymentType', type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Mode */}
      <div className="calculator-section">
        <label className="calculator-label">
          Payment Mode
          <span className="what-is-it-trigger" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            showInfo(tooltipDefinitions.paymentMode);
          }}>
            ( More Info )
          </span>
        </label>
        <div className="calculator-button-group">
          {['Monthly', 'Quarterly', 'Semiannually', 'Annually', 'Lump Sum'].map(mode => (
            <button
              key={mode}
              type="button"
              className={`calculator-mode-button ${paymentMode === mode ? 'selected-mode' : ''}`}
              onClick={() => {
                updateField('paymentMode', mode);
                if (mode === 'Lump Sum') {
                  router.push('/lump-sum-calculator');
                }
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Amount */}
      <div className="calculator-section">
        <label className="calculator-label">
          Payment Amount ($)
          <span className="what-is-it-trigger" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            showInfo(tooltipDefinitions.amount);
          }}>
            ( More Info )
          </span>
        </label>
        <input
          type="text"
          min={100}
          max={1000000}
          step={1}
          value={amount}
          onChange={handleAmountChange}
          className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
          onKeyPress={e => {
            // Allow only digits and one decimal point
            if (!/[0-9.]/.test(e.key) || (e.key === '.' && amount.includes('.'))) {
              e.preventDefault();
            }
          }}
          onPaste={e => {
            e.preventDefault();
            let pasted = e.clipboardData.getData('text').replace(/[^\d.]/g, '');
            const parts = pasted.split('.');
            if (parts.length > 2) pasted = parts[0] + '.' + parts.slice(1).join('');
            if (parts[1]) pasted = parts[0] + '.' + parts[1].slice(0, 2);
            pasted = pasted.replace(/^0+(?!\.|$)/, '');
            updateField('amount', pasted);
          }}
        />
        {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
      </div>

      {/* Additional Details Collapsible */}
      <div className="calculator-section-collapsible">
        <h3 className="collapsible-header" onClick={() => setIsAdditionalDetailsCollapsed(!isAdditionalDetailsCollapsed)}>
          Additional Details
          <span className={`collapse-icon ${isAdditionalDetailsCollapsed ? 'collapsed' : ''}`}>▼</span>
        </h3>

        {!isAdditionalDetailsCollapsed && (
          <div className="collapsible-content">
            {/* Annual Increase */}
            <div className="calculator-section">
              <label className="calculator-label">
                Annual Increase (%)
                <span className="what-is-it-trigger" onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  showInfo(tooltipDefinitions.increaseRate);
                }}>
                  ( More Info )
                </span>
              </label>
              <div className="calculator-button-group three-col small-button-group">
                {[0, 1, 2, 3, 4, 5, 6].map(rate => (
                  <button
                    key={rate}
                    type="button"
                    className={`calculator-increase-button ${increaseRate === rate ? 'selected-increase' : ''}`}
                    onClick={() => updateField('increaseRate', rate)}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="calculator-label">
                  Payment Start Date
                  <span className="what-is-it-trigger" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showInfo(tooltipDefinitions.startDate);
                  }}>
                    ( More Info )
                  </span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  min="2024-05-14"
                  onChange={(e) => updateField('startDate', e.target.value)}
                  className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                />
                {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
              </div>
              <div className="col-md-6">
                <label className="calculator-label">
                  Payment End Date
                  <span className="what-is-it-trigger" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showInfo(tooltipDefinitions.endDate);
                  }}>
                    ( More Info )
                  </span>
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => updateField('endDate', e.target.value)}
                  className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                />
                {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="text-center mt-4">
        <button className="btn btn-success btn-lg w-100" onClick={handleContinue}>
          {paymentType === 'Guaranteed' ? 'Calculate' : 'Next'}
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <>
          <div className="what-is-it-overlay" onClick={hideInfo}></div>
          <div className="what-is-it-box" dangerouslySetInnerHTML={{ __html: tooltipContent }} />
        </>
      )}
    </div>
  );
}
