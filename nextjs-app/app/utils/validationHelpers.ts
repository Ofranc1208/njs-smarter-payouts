// Validation helpers for form fields and calculations

export function isPositiveNumber(value: any): boolean {
  return typeof value === 'number' && isFinite(value) && value > 0;
}

export function isValidDate(value: any): boolean {
  return value instanceof Date && !isNaN(value.getTime());
}

export function isNonEmptyString(value: any): boolean {
  return typeof value === 'string' && value.trim().length > 0;
} 