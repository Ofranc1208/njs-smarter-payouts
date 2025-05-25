// ========================================
// 🧮 NPV Calculation Config & Adjustments
// ========================================

// 🔢 Base discount rates (can be modified)
export const BASE_DISCOUNT_RATE = 0.085; // For Guaranteed payments
export const BASE_DISCOUNT_RATE_LCP = 0.085; // For Life-Contingent payments
export const BASE_DISCOUNT_RATE_LUMP_SUM_GUARANTEED = 0.085; // Guaranteed Lump Sum
export const BASE_DISCOUNT_RATE_LUMP_SUM_LCP = 0.085; // Life-Contingent Lump Sum

// 📉 Min/Max payout rate spreads
export const RATE_SPREADS: { min: number; max: number } = {
  min: 0.03,
  max: 0.02
};

// 💸 Fixed Amount Adjustments (for min/max payout)
export const AMOUNT_ADJUSTMENTS: { min: number; max: number } = {
  min: 25000,
  max: 15000
};

// 👨‍👩‍👧‍👦 Family Protection Constants
export const FAMILY_PROTECTION_GUARANTEED = 25000;
export const FAMILY_PROTECTION_DISCOUNT_RATE = 0.055;

// 🧬 Adjustment Factors by Profile
export const adjustmentMap: Record<string, number> = {
  // 📊 Weight Category
  'underweight': 0.015,
  'normal': 0,
  'overweight': 0.03,
  'obese': 0.06,
  'severe-obese': 0.09,

  // ⚧️ Gender
  'gender-male': 0,
  'gender-female': -0.01,

  // 📏 Body Frame
  'build-small': -0.005,
  'build-medium': 0,
  'build-tall': 0.005,

  // 🚬 Smoking Status
  'smoke-yes': 0.03,
  'smoke-no': 0,

  // ❤️ Health Profile
  'health-great': -0.015,
  'health-normal': 0,
  'health-fair': 0.025,
  'health-belowfair': 0.04,

  // 💓 Cardiac Condition
  'cardiac-normal': 0,
  'cardiac-medicated': 0.02,
  'cardiac-high': 0.05,
  'cardiac-unsure': 0.03,

  // 🎂 Age Bands
  'age-18-25': 0,
  'age-26-35': 0.01,
  'age-36-45': 0.02,
  'age-46-50': 0.03,
  'age-51-56': 0.045,
  'age-57-65': 0.06
}; 