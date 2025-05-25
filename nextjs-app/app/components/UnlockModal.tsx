'use client';

import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import '../../styles/UnlockModal.css';

import { auth, db, RecaptchaVerifier } from '../utils/firebase';
import { signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formatPhoneNumber = (digits: string): string => {
  if (!digits) return '';
  const cleaned = digits.replace(/\D/g, '');
  if (cleaned.length > 6) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  } else if (cleaned.length > 3) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}`;
  } else {
    return cleaned;
  }
};

// Add type declaration for WebOTP API
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier | null;
    OTPCredential?: any;
  }
}

interface UnlockModalProps {
  onClose?: () => void;
}

// Add this new component for OTP input
const OTPInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}> = ({ value, onChange, disabled }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(value.split('').concat(Array(6 - value.length).fill('')));

  // Handle WebOTP API
  useEffect(() => {
    if ('OTPCredential' in window) {
      const abortController = new AbortController();
      
      // Type assertion for WebOTP API
      (navigator.credentials as any).get({
        otp: { transport: ['sms'] },
        signal: abortController.signal
      }).then((otp: any) => {
        if (otp?.code) {
          onChange(otp.code);
        }
      }).catch((err: any) => {
        // Ignore abort errors
        if (err.name !== 'AbortError') {
          console.warn('WebOTP error:', err);
        }
      });

      return () => abortController.abort();
    }
  }, [onChange]);

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      onChange(pastedData);
      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  // Handle individual input changes
  const handleChange = (index: number, newValue: string) => {
    if (newValue.length > 1) {
      // Handle paste in individual input
      const pastedValue = newValue.replace(/\D/g, '').slice(0, 6);
      onChange(pastedValue);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = newValue.replace(/\D/g, '');
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Auto-focus next input
    if (newValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keydown for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div 
      className="otp-input-container"
      style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        margin: '1rem 0'
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(el: HTMLInputElement | null) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={otp[index] || ''}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          style={{
            width: '40px',
            height: '48px',
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: '600',
            border: '2px solid #dee2e6',
            borderRadius: '8px',
            backgroundColor: disabled ? '#f8f9fa' : 'white',
            transition: 'all 0.2s ease'
          }}
          onFocus={e => e.target.select()}
        />
      ))}
    </div>
  );
};

const UnlockModal: React.FC<UnlockModalProps> = ({ onClose }) => {
  const [phoneDigits, setPhoneDigits] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [loading, setLoading] = useState<boolean>(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  useEffect(() => {
    const setupRecaptcha = async () => {
      if (typeof window === 'undefined' || window.recaptchaVerifier || !auth) return;

      try {
        if (window.location.hostname === 'localhost') {
          let tries = 0;
          const trySetBypass = () => {
            tries++;
            try {
              (auth as any).settings.appVerificationDisabledForTesting = true;
              console.log('🧪 Dev mode reCAPTCHA bypass enabled');
            } catch (e) {
              if (tries < 10) setTimeout(trySetBypass, 200);
              else console.warn('Could not set appVerificationDisabledForTesting:', e);
            }
          };
          trySetBypass();
          return;
        } else {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            {
              size: 'invisible',
              callback: (response: any) => {
                console.log('✅ reCAPTCHA solved:', response);
              }
            }
          );
          await window.recaptchaVerifier.render();
          console.log('✅ reCAPTCHA initialized for non-localhost');
        }

        console.log('✅ reCAPTCHA setup attempt finished');
      } catch (error) {
        console.error('❌ reCAPTCHA init error:', error);
        setRecaptchaError('Could not load verification. Please try again later.');
      }
    };

    setupRecaptcha();

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('1') && value.length === 11) {
      value = value.slice(1);
    }
    value = value.slice(0, 10);
    setPhoneDigits(value);
  };

  const handleSendCode = async () => {
    setLoading(true);
    setFirebaseError(null);

    let fullPhone = phoneDigits;
    if (phoneDigits.length === 10) {
      fullPhone = `+1${phoneDigits}`;
    } else if (phoneDigits.length === 11 && phoneDigits.startsWith('1')) {
      fullPhone = `+${phoneDigits}`;
    } else {
      setFirebaseError('📱 Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }

    let appVerifier: RecaptchaVerifier | undefined = undefined;
    if (!(window.location.hostname === 'localhost' && (auth as any).settings?.appVerificationDisabledForTesting)) {
      appVerifier = window.recaptchaVerifier as RecaptchaVerifier;
    }

    if (!appVerifier) {
      setFirebaseError('Verification system not ready. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setStep('otp');
    } catch (err: any) {
      console.error('❌ Firebase error sending code:', err);
      let errorMessage = 'Failed to send verification code.';
      if (err.code === 'auth/invalid-phone-number') errorMessage = 'Invalid phone number format.';
      if (err.code === 'auth/too-many-requests') errorMessage = 'Too many requests. Try again later.';
      if (err.code === 'auth/argument-error') errorMessage = 'Verification failed. Please try again.';
      setFirebaseError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setFirebaseError(null);
    if (otp.length !== 6) {
      setFirebaseError('⚠️ Enter the 6-digit code sent to your phone');
      setLoading(false);
      return;
    }

    try {
      if (!confirmationResult) throw new Error('No confirmation result available');
      await confirmationResult.confirm(otp);
      setStep('success');

      await addDoc(collection(db, 'verifiedPhones'), {
        phone: `+1${phoneDigits}`,
        timestamp: serverTimestamp()
      });

      if (onClose) {
        setTimeout(onClose, 1500);
      }
    } catch (error: any) {
      console.error('❌ Invalid code:', error);
      let errorMessage = 'Invalid verification code. Try again.';
      if (error.code === 'auth/invalid-verification-code') errorMessage = 'The verification code is invalid.';
      if (error.code === 'auth/code-expired') errorMessage = 'The verification code has expired.';
      setFirebaseError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Scroll lock
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <>
      <div id="recaptcha-container"></div>
      {/* Green-tinted, blurred overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(34,180,85,0.18)', // subtle green
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="unlock-modal"
          style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            maxWidth: '300px',
            width: '100%',
            padding: '2rem 1.5rem',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.25rem',
          }}
        >
          {step === 'phone' && (
            <>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2950/2950655.png"
                className="unlock-image"
                alt="lock icon"
                width="48"
                height="48"
                style={{ marginBottom: '1rem' }}
              />
              <h2 className="unlock-title" style={{ marginBottom: '0.5rem' }}>
                This offer is temporarily <span className="highlight">locked</span>.
              </h2>
              <p className="unlock-text" style={{ marginBottom: '0.5rem' }}>
                Enter your phone number to unlock your personalized offer and get up to
                <strong> $5,600 in bonus cash</strong> at closing.
              </p>
              <p className="unlock-text" style={{ marginBottom: '1rem' }}>
                Your quote is reserved for 24 hours. Secure it below:
              </p>
              <input
                type="tel"
                placeholder="e.g. 561-568-3128"
                value={formatPhoneNumber(phoneDigits)}
                onChange={handleInputChange}
                className="phone-input-field"
                disabled={loading}
                maxLength={12}
                pattern="[0-9-]*"
                inputMode="numeric"
                style={{
                  fontFamily: 'monospace',
                  letterSpacing: '0.5px',
                  width: '100%',
                  textAlign: 'center',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1.5px solid #ccc',
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                }}
                onKeyPress={(e) => {
                  if (!/[\d]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedText = e.clipboardData.getData('text');
                  const cleaned = pastedText.replace(/\D/g, '').slice(0, 10);
                  setPhoneDigits(cleaned);
                }}
              />
              {firebaseError && <div className="text-danger small mt-2" style={{ marginBottom: '0.75rem' }}>{firebaseError}</div>}
              <button
                onClick={handleSendCode}
                disabled={loading}
                className={loading ? 'loading' : ''}
                style={{
                  width: '100%',
                  margin: '1rem 0 0 0',
                  padding: '0.75rem',
                  fontSize: '1.1rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  background: '#22b455',
                  color: 'white',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(34,180,85,0.08)'
                }}
              >
                {loading ? 'Sending...' : 'Send Code'}
              </button>
            </>
          )}

          {step === 'otp' && (
            <>
              <h2 className="unlock-title">Enter Verification Code</h2>
              <p className="unlock-text">
                We sent a 6-digit code to your phone.
                <br />
                <small className="text-muted">
                  (Your browser may auto-fill this for you)
                </small>
              </p>

              <OTPInput
                value={otp}
                onChange={setOtp}
                disabled={loading}
              />
              {firebaseError && <div className="text-danger small mt-2">{firebaseError}</div>}

              <button 
                onClick={handleVerifyCode}
                disabled={loading}
                className={loading ? 'loading' : ''}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </>
          )}

          {step === 'success' && (
            <>
              <h2 className="unlock-title">🎉 Offer Unlocked!</h2>
              <p className="unlock-text">Thank you! Your offer is now fully available.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UnlockModal;
