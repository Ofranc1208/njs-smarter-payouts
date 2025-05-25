'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import '../../styles/UnlockModal.css';

import { auth, db } from '../utils/firebase';
import { signInWithPhoneNumber, ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
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

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier | null;
  }
}

const UnlockModal: React.FC = () => {
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
            'recaptcha-container',
            {
              size: 'invisible',
              callback: (response: any) => {
                console.log('✅ reCAPTCHA solved:', response);
              }
            },
            auth
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
    // Allow +1 at the start if user pastes it
    if (value.startsWith('1') && value.length === 11) {
      value = value.slice(1);
    }
    setPhoneDigits(value.slice(0, 10));
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

      alert('✅ Phone verified!');
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

  return (
    <>
      <div id="recaptcha-container"></div>

      <div className="unlock-modal">
        {step === 'phone' && (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2950/2950655.png"
              className="unlock-image"
              alt="lock icon"
              width="48"
              height="48"
            />
            <h2 className="unlock-title">
              This offer is temporarily <span className="highlight">locked</span>.
            </h2>
            <p className="unlock-text">
              Enter your phone number to unlock your personalized offer and get up to
              <strong> $5,600 in bonus cash</strong> at closing.
            </p>
            <p className="unlock-text">Your quote is reserved for 24 hours. Secure it below:</p>

            <input
              type="tel"
              placeholder="e.g. 5615831280"
              value={phoneDigits}
              onChange={handleInputChange}
              className="phone-input-field"
              disabled={loading}
              maxLength={10}
            />
            {firebaseError && <div className="text-danger small mt-2">{firebaseError}</div>}

            <button 
              onClick={handleSendCode}
              disabled={loading}
              className={loading ? 'loading' : ''}
            >
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <h2 className="unlock-title">Enter Verification Code</h2>
            <p className="unlock-text">We sent a 6-digit code to your phone.</p>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
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
    </>
  );
};

export default UnlockModal;
