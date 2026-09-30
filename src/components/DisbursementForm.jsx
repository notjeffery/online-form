import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import orgLogo from '../assets/org-logo.png'
import './ApplicationForm.css'

export default function DisbursementForm() {
  const [applicationReference, setApplicationReference] = useState('')
  const [applicantName, setApplicantName] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountHolderName, setAccountHolderName] = useState('')
  const [accountType, setAccountType] = useState('')
  const [routingNumber, setRoutingNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('')
  const [authorizationAgreed, setAuthorizationAgreed] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const [signatureDate, setSignatureDate] = useState('')

  const [routingError, setRoutingError] = useState('')
  const [matchError, setMatchError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setRoutingError('')
    setMatchError('')
    setSubmitError('')

    if (!/^\d{9}$/.test(routingNumber)) {
      setRoutingError('Routing number must be exactly 9 digits.')
      return
    }

    if (accountNumber !== confirmAccountNumber) {
      setMatchError('Account numbers do not match.')
      return
    }

    setSubmitting(true)

    try {
      const { error: insertError } = await supabase.from('disbursements').insert([{
        application_reference: applicationReference,
        applicant_name: applicantName,
        bank_name: bankName,
        account_holder_name: accountHolderName,
        account_type: accountType,
        routing_number: routingNumber,
        account_number: accountNumber,
        authorization_agreed: authorizationAgreed,
        signature_name: signatureName,
        signature_date: signatureDate || null,
      }])

      if (insertError) throw insertError

      setSubmitted(true)
    } catch (err) {
      console.error('Disbursement submission failed:', err.message)
      setSubmitError('Something went wrong submitting your information. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="page">
        <header className="header">
          <img className="org-logo" src={orgLogo} alt="The Household Resilience Initiative" />
          <h1 className="org-name">THE HOUSEHOLD<br />RESILIENCE INITIATIVE</h1>
        </header>
        <main className="form-container">
          <section className="form-section" style={{ textAlign: 'center' }}>
            <h3 className="section-header" style={{ borderBottom: 'none' }}>Information Received</h3>
            <p className="section-note">
              Thank you — your direct deposit information has been securely submitted. Our team
              will process your disbursement once everything has been confirmed.
            </p>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="header">
        <img className="org-logo" src={orgLogo} alt="The Household Resilience Initiative" />
        <h1 className="org-name">THE HOUSEHOLD<br />RESILIENCE INITIATIVE</h1>
        <p className="tagline">STRONGER HOMES &nbsp;·&nbsp; RESILIENT COMMUNITIES &nbsp;·&nbsp; LASTING HOPE</p>
        <hr className="header-rule" />
        <h2 className="fund-title">Household Resilience Fund</h2>
        <p className="fund-subtitle">Direct Deposit Authorization</p>
      </header>

      <main className="form-container">
        <section className="intro-text">
          <p>
            Congratulations on your approved application. To issue your assistance by direct
            deposit, please provide your bank account details below.
          </p>
          <p>
            This information is used solely to process your one-time (or recurring, if applicable)
            disbursement and is handled in accordance with our privacy standards.
          </p>
        </section>

        <form onSubmit={handleSubmit}>
          {/* APPLICATION REFERENCE */}
          <section className="form-section">
            <h3 className="section-header">Application Reference</h3>
            <p className="section-note">
              Please enter the reference number or full name used on your original application, so
              we can match this to your approved case.
            </p>

            <div className="field">
              <label htmlFor="applicationReference">Application Reference Number</label>
              <input
                type="text"
                id="applicationReference"
                value={applicationReference}
                onChange={(e) => setApplicationReference(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="applicantName">Applicant Full Legal Name</label>
              <input
                type="text"
                id="applicantName"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                required
              />
            </div>
          </section>

          {/* BANK ACCOUNT DETAILS */}
          <section className="form-section">
            <h3 className="section-header">Bank Account Details</h3>
            <p className="section-note">
              Please provide the account where you'd like your assistance deposited. Double-check
              your account number carefully — an incorrect number can delay your payment.
            </p>

            <div className="field">
              <label htmlFor="bankName">Bank Name</label>
              <input
                type="text"
                id="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="accountHolderName">Name on Account</label>
              <input
                type="text"
                id="accountHolderName"
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Account Type</label>
              <div className="radio-row">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="accountType"
                    value="checking"
                    checked={accountType === 'checking'}
                    onChange={(e) => setAccountType(e.target.value)}
                    required
                  />
                  Checking
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="accountType"
                    value="savings"
                    checked={accountType === 'savings'}
                    onChange={(e) => setAccountType(e.target.value)}
                  />
                  Savings
                </label>
              </div>
            </div>

            <div className="field">
              <label htmlFor="routingNumber">Routing Number (9 digits)</label>
              <input
                type="text"
                id="routingNumber"
                inputMode="numeric"
                maxLength={9}
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, ''))}
                required
              />
              {routingError && <p className="field-error">{routingError}</p>}
            </div>

            <div className="field">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                inputMode="numeric"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="confirmAccountNumber">Confirm Account Number</label>
              <input
                type="text"
                id="confirmAccountNumber"
                inputMode="numeric"
                value={confirmAccountNumber}
                onChange={(e) => setConfirmAccountNumber(e.target.value.replace(/\D/g, ''))}
                required
              />
              {matchError && <p className="field-error">{matchError}</p>}
            </div>
          </section>

          {/* AUTHORIZATION */}
          <section className="form-section">
            <h3 className="section-header">Direct Deposit Authorization</h3>
            <p className="section-note">
              I authorize The Household Resilience Initiative to deposit approved assistance funds
              directly into the bank account provided above via ACH transfer. I certify that I am
              the owner or an authorized signer on this account, and that the information provided
              is accurate. This authorization remains in effect until I notify The Household
              Resilience Initiative in writing to cancel or change it.
            </p>

            <div className="field">
              <label className="radio-option">
                <input
                  type="checkbox"
                  checked={authorizationAgreed}
                  onChange={(e) => setAuthorizationAgreed(e.target.checked)}
                  required
                />
                I authorize this direct deposit as described above.
              </label>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="signatureName">Signature (type full name)</label>
                <input
                  type="text"
                  id="signatureName"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="signatureDate">Date</label>
                <input
                  type="date"
                  id="signatureDate"
                  value={signatureDate}
                  onChange={(e) => setSignatureDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          {submitError && <p className="submit-error">{submitError}</p>}

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Direct Deposit Information'}
          </button>
        </form>

        <footer className="page-footer">
          <p className="footer-org">
            THE HOUSEHOLD RESILIENCE INITIATIVE &nbsp;·&nbsp; Stronger Homes. Resilient Communities. Lasting Hope.
          </p>
          <p className="footer-confidentiality">
            This document is confidential and intended solely for the named applicant. All information is protected under applicable privacy standards.
          </p>
        </footer>
      </main>
    </div>
  )
}