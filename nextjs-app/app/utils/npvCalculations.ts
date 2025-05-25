import {
  adjustmentMap,
  BASE_DISCOUNT_RATE,
  BASE_DISCOUNT_RATE_LCP,
  RATE_SPREADS
} from './npvConfig';

export type PaymentFrequency = 'Monthly' | 'Quarterly' | 'Semiannually' | 'Annually' | 'Lump Sum';

export interface NPVInput {
  amount: number;
  startDate: string;
  endDate: string;
  annualRate: number;
  paymentMode: PaymentFrequency;
  increaseRate?: number;
}

export interface GuaranteedNPVInput {
  amount: number;
  startDate: string;
  endDate: string;
  discountRate: number;
  paymentMode: PaymentFrequency;
  increaseRate?: number;
}

export interface LifeContingentNPVInput {
  amount: number;
  startDate: string;
  endDate: string;
  baseRate?: number;
  lcpKeys: string[];
  paymentMode: PaymentFrequency;
  increaseRate?: number;
}

export interface MinMaxNPVInput {
  amount: number;
  startDate: string;
  endDate: string;
  baseRate?: number;
  paymentMode: PaymentFrequency;
  increaseRate?: number;
  minRateSpread?: number;
  maxRateSpread?: number;
  minAdjustment?: number;
  maxAdjustment?: number;
  isLCP?: boolean;
  lcpKeys?: string[];
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < day) d.setDate(0);
  return d;
}

function calcNPV({
  amount,
  startDate,
  endDate,
  annualRate,
  paymentMode,
  increaseRate = 0
}: NPVInput) {
  const s = new Date(startDate);
  const e = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const freqMap: Record<PaymentFrequency, number> = {
    Monthly: 12,
    Quarterly: 4,
    Semiannually: 2,
    Annually: 1,
    'Lump Sum': 1
  };

  const perYear = freqMap[paymentMode] || 12;
  const gap = 12 / perYear;

  let npv = 0;
  let payment = amount;
  let idx = 0;

  for (let d = new Date(s); d <= e; d = addMonths(d, gap), idx++) {
    const monthsFromToday =
      (d.getFullYear() - today.getFullYear()) * 12 +
      (d.getMonth() - today.getMonth());

    if (monthsFromToday >= 0) {
      const discountFactor = Math.pow(1 + annualRate / 12, monthsFromToday);
      npv += payment / discountFactor;
    }

    if ((idx + 1) % perYear === 0) {
      payment *= 1 + increaseRate / 100;
    }
  }

  return {
    npv: parseFloat(npv.toFixed(2)),
    payments: idx
  };
}

export function calculateGuaranteedNPV({
  amount,
  startDate,
  endDate,
  discountRate,
  paymentMode,
  increaseRate = 0
}: GuaranteedNPVInput) {
  return calcNPV({
    amount,
    startDate,
    endDate,
    annualRate: discountRate / 100,
    paymentMode,
    increaseRate
  });
}

export function calcNPVWithAdjustment({
  amount,
  startDate,
  endDate,
  baseRate = BASE_DISCOUNT_RATE_LCP,
  lcpKeys,
  paymentMode,
  increaseRate = 0
}: LifeContingentNPVInput) {
  const adjRate = baseRate + lcpKeys.reduce((sum, k) => sum + (adjustmentMap[k] || 0), 0);

  const freqMap: Record<string, number> = {
    Monthly: 1,
    Quarterly: 3,
    Semiannually: 6,
    Annually: 12
  };
  const intervalMonths = freqMap[paymentMode] || 1;
  const adjustedEnd = addMonths(new Date(endDate), -intervalMonths);

  return calcNPV({
    amount,
    startDate,
    endDate: adjustedEnd.toISOString(),
    annualRate: adjRate,
    paymentMode,
    increaseRate
  });
}

export function calculateMinMaxNPV({
  amount,
  startDate,
  endDate,
  baseRate = BASE_DISCOUNT_RATE,
  paymentMode,
  increaseRate = 0,
  minRateSpread = RATE_SPREADS.min,
  maxRateSpread = RATE_SPREADS.max,
  minAdjustment = 0,
  maxAdjustment = 0,
  isLCP = false,
  lcpKeys = []
}: MinMaxNPVInput) {
  const adjProfileRate = isLCP
    ? lcpKeys.reduce((sum, k) => sum + (adjustmentMap[k] || 0), 0)
    : 0;

  const minRate = baseRate + adjProfileRate + minRateSpread;
  const maxRate = baseRate + adjProfileRate + maxRateSpread;

  const minResult = calcNPV({
    amount,
    startDate,
    endDate,
    annualRate: minRate,
    paymentMode,
    increaseRate
  });

  const maxResult = calcNPV({
    amount,
    startDate,
    endDate,
    annualRate: maxRate,
    paymentMode,
    increaseRate
  });

  const roundUp100 = (val: number) => Math.ceil((val - 0.001) / 100) * 100;

  return {
    minOffer: Math.max(0, roundUp100(minResult.npv - minAdjustment)),
    maxOffer: Math.max(0, roundUp100(maxResult.npv - maxAdjustment))
  };
} 