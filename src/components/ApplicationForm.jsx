import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import orgLogo from '../assets/org-logo.png'
import './ApplicationForm.css'

const emptyChild = { name: '', age: '', docType: '' }
const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB
const OVERSIZE_MESSAGE =
  'This file is over 3MB. Please email it to support@householdresilience.org instead, and let us know which section it belongs to.'

export default function ApplicationForm() {
  const [fullName, setFullName] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [situationChanged, setSituationChanged] = useState('')
  const [situationDetails, setSituationDetails] = useState('')

  const [addressDocType, setAddressDocType] = useState('')
  const [addressDocFile, setAddressDocFile] = useState(null)
  const [addressFileError, setAddressFileError] = useState('')
  const [addressSubLabel] = useState('SSN')
  const [addressSubValue, setAddressSubValue] = useState('')

  const [additionalDocType, setAdditionalDocType] = useState('')
  const [additionalDocFile, setAdditionalDocFile] = useState(null)
  const [additionalFileError, setAdditionalFileError] = useState('')

  const [adultsCount, setAdultsCount] = useState('')
  const [childrenCount, setChildrenCount] = useState('')
  const [householdChanged, setHouseholdChanged] = useState('')
  const [householdChangeDetails, setHouseholdChangeDetails] = useState('')

  const [dependentChildren, setDependentChildren] = useState([{ ...emptyChild }])

  const [hardshipDocType, setHardshipDocType] = useState('')
  const [hardshipDocFile, setHardshipDocFile] = useState(null)
  const [hardshipFileError, setHardshipFileError] = useState('')
  const [hardshipDetails, setHardshipDetails] = useState('')

  const [incomeDocType, setIncomeDocType] = useState('')
  const [incomeDocFile, setIncomeDocFile] = useState(null)
  const [incomeFileError, setIncomeFileError] = useState('')

  const [paymentMethod, setPaymentMethod] = useState('')

  const [certificationAgreed, setCertificationAgreed] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const [signatureDate, setSignatureDate] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleFileChange(file, setter, setError) {
    if (file && file.size > MAX_FILE_SIZE) {
      setError(OVERSIZE_MESSAGE)
      setter(null)
      return
    }
    setError('')
    setter(file)
  }

  function updateChild(index, field, value) {
    setDependentChildren((prev) =>
      prev.map((child, i) => (i === index ? { ...child, [field]: value } : child))
    )
  }

  function addChildRow() {
    setDependentChildren((prev) => [...prev, { ...emptyChild }])
  }

  function removeChildRow(index) {
    setDependentChildren((prev) => prev.filter((_, i) => i !== index))
  }

  async function uploadDoc(applicationId, file, label) {
    if (!file) return null
    const filePath = `${applicationId}/${label}-${file.name}`
    const { error } = await supabase.storage
      .from('verification-documents')
      .upload(filePath, file)

    if (error) throw error
    return filePath
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    try {
      const applicationId = crypto.randomUUID()

      const addressDocUrl = await uploadDoc(applicationId, addressDocFile, 'address')
      const additionalDocUrl = await uploadDoc(applicationId, additionalDocFile, 'additional')
      const hardshipDocUrl = await uploadDoc(applicationId, hardshipDocFile, 'hardship')
      const incomeDocUrl = await uploadDoc(applicationId, incomeDocFile, 'income')

      const { error: insertError } = await supabase.from('applications').insert([{
        id: applicationId,
        full_name: fullName,
        current_address: currentAddress,
        phone,
        email,
        situation_changed: situationChanged === 'yes',
        situation_details: situationDetails,
        address_doc_type: addressDocType,
        address_doc_url: addressDocUrl,
        additional_doc_type: additionalDocType,
        additional_doc_url: additionalDocUrl,
        adults_count: adultsCount ? Number(adultsCount) : null,
        children_count: childrenCount ? Number(childrenCount) : null,
        household_changed: householdChanged === 'yes',
        household_change_details: householdChangeDetails,
        dependent_children: dependentChildren,
        hardship_doc_type: hardshipDocType,
        hardship_doc_url: hardshipDocUrl,
        hardship_details: hardshipDetails,
        income_doc_type: incomeDocType,
        income_doc_url: incomeDocUrl,
        payment_method: paymentMethod,
        certification_agreed: certificationAgreed,
        signature_name: signatureName,
        signature_date: signatureDate || null,
      }])

      if (insertError) throw insertError

      setSubmitted(true)
    } catch (err) {
      console.error('Submission failed:', err.message)
      setSubmitError('Something went wrong submitting your application. Please try again.')
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
            <h3 className="section-header" style={{ borderBottom: 'none' }}>Application Received</h3>
            <p className="section-note">
              Thank you — your verification details have been submitted. Our team will follow up
              once your application has been reviewed.
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
        <p className="fund-subtitle">Assistance Selection &amp; Confirmation</p>
      </header>

      <main className="form-container">
        <section className="status-banner">
          <p className="status-badge">✦ SELECTED ✦</p>
        </section>

        <section className="intro-text">
          <p>Thank you for submitting your application to the Household Resilience Initiative.</p>
          <p>
            Your application has progressed to the next stage of our review process. Before a
            final determination can be made, we need a few additional details to help us verify
            the information provided and better understand your household's current needs.
          </p>
        </section>

        <form onSubmit={handleSubmit}>
          {/* APPLICANT INFORMATION REVIEW */}
          <section className="form-section">
            <h3 className="section-header">Applicant Information Review</h3>
            <p className="section-note">
              Please carefully review the information you previously submitted. If any information
              has changed since your original application, please update it below.
            </p>

            <div className="field">
              <label htmlFor="fullName">Full Legal Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="currentAddress">Current Address</label>
              <input
                type="text"
                id="currentAddress"
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label>Has your household situation changed since submitting your application?</label>
              <div className="radio-row">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="situationChanged"
                    value="no"
                    checked={situationChanged === 'no'}
                    onChange={(e) => setSituationChanged(e.target.value)}
                  />
                  No
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="situationChanged"
                    value="yes"
                    checked={situationChanged === 'yes'}
                    onChange={(e) => setSituationChanged(e.target.value)}
                  />
                  Yes
                </label>
              </div>
            </div>

            {situationChanged === 'yes' && (
              <div className="field">
                <label htmlFor="situationDetails">If yes, please explain</label>
                <textarea
                  id="situationDetails"
                  rows={3}
                  value={situationDetails}
                  onChange={(e) => setSituationDetails(e.target.value)}
                />
              </div>
            )}
          </section>

          {/* ADDRESS VERIFICATION */}
          <section className="form-section">
            <h3 className="section-header">Address Verification</h3>
            <p className="section-note">
              Please indicate which document you have available showing your current address,
              dated within the last 60 days, and upload it below.
            </p>

            <div className="field">
              <label htmlFor="addressDocType">Document type</label>
              <select
                id="addressDocType"
                value={addressDocType}
                onChange={(e) => setAddressDocType(e.target.value)}
              >
                <option value="">Select a document type</option>
                <option value="utility_bill">Utility Bill</option>
                <option value="lease_agreement">Lease Agreement</option>
                <option value="mortgage_statement">Mortgage Statement</option>
                <option value="bank_statement">Bank Statement</option>
                <option value="government_correspondence">Government Correspondence</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="addressDocFile">Upload document (max 3MB)</label>
              <input
                type="file"
                id="addressDocFile"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) =>
                  handleFileChange(e.target.files[0] || null, setAddressDocFile, setAddressFileError)
                }
              />
              {addressFileError && <p className="field-error">{addressFileError}</p>}
            </div>

            <div className="subsection">
              <p className="section-note">
                For verification and eligibility purposes only, please provide your Social Security Number. It will be kept confidential and used solely to process your application.
              </p>

              <div className="inline-field">
                <label htmlFor="addressSubValue">{addressSubLabel}</label>
                <input
                  type="number"
                  id="addressSubValue"
                  value={addressSubValue}
                  onChange={(e) => setAddressSubValue(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* NEW / UNNAMED SECTION — same layout as Address Verification, awaiting title + copy */}
          <section className="form-section">
            <h3 className="section-header">Applicant Verification</h3>
            <p className="section-note">
              Please upload one valide government-issued photo identification.
            </p>

            <div className="field">
              <label htmlFor="additionalDocType">Document type</label>
              <select
                id="additionalDocType"
                value={additionalDocType}
                onChange={(e) => setAdditionalDocType(e.target.value)}
              >
                <option value="">Select a document type</option>
                <option value="drivers_license">Driver's License</option>
                <option value="state_identification_card">State Identification Card</option>
                <option value="Passport">Passport</option>
                <option value="permanent_resident_card">Permanent Resident Card</option>
                <option value="military_id">Military ID</option>
                <option value="tribal_identification">Tribal Identification</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="additionalDocFile">Upload document (max 3MB)</label>
              <input
                type="file"
                id="additionalDocFile"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) =>
                  handleFileChange(e.target.files[0] || null, setAdditionalDocFile, setAdditionalFileError)
                }
              />
              {additionalFileError && <p className="field-error">{additionalFileError}</p>}
            </div>
          </section>

          {/* HOUSEHOLD VERIFICATION */}
          <section className="form-section">
            <h3 className="section-header">Household Verification</h3>
            <p className="section-note">Please confirm the number of people currently living in your household.</p>

            <div className="field-row">
              <div className="field">
                <label htmlFor="adultsCount">Adults (18+)</label>
                <input
                  type="number"
                  id="adultsCount"
                  min="0"
                  value={adultsCount}
                  onChange={(e) => setAdultsCount(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="childrenCount">Children (0–17)</label>
                <input
                  type="number"
                  id="childrenCount"
                  min="0"
                  value={childrenCount}
                  onChange={(e) => setChildrenCount(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label>Has your household size changed since applying?</label>
              <div className="radio-row">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="householdChanged"
                    value="yes"
                    checked={householdChanged === 'yes'}
                    onChange={(e) => setHouseholdChanged(e.target.value)}
                  />
                  Yes
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="householdChanged"
                    value="no"
                    checked={householdChanged === 'no'}
                    onChange={(e) => setHouseholdChanged(e.target.value)}
                  />
                  No
                </label>
              </div>
            </div>

            {householdChanged === 'yes' && (
              <div className="field">
                <label htmlFor="householdChangeDetails">If yes, please explain</label>
                <textarea
                  id="householdChangeDetails"
                  rows={3}
                  value={householdChangeDetails}
                  onChange={(e) => setHouseholdChangeDetails(e.target.value)}
                />
              </div>
            )}
          </section>

          {/* DEPENDENT CHILD VERIFICATION */}
          <section className="form-section">
            <h3 className="section-header">Dependent Child Verification</h3>
            <p className="section-note">
              Complete only if you requested additional Child Household Support. Please list each
              dependent child in your application.
            </p>

            {dependentChildren.map((child, index) => (
              <div className="child-block" key={index}>
                <div className="field">
                  <label htmlFor={`childDocType-${index}`}>Document type</label>
                  <select
                    id={`childDocType-${index}`}
                    value={child.docType}
                    onChange={(e) => updateChild(index, 'docType', e.target.value)}
                  >
                    <option value="">Select a document type</option>
                    <option value="birth_certificate">Birth Certificate</option>
                    <option value="school_enrollment_record">School Enrollment Record</option>
                    <option value="medicaid_health_card">Medicaid / Health Card</option>
                    <option value="child_tax_credit_docs">Child Tax Credit / Benefit Docs</option>
                    <option value="court_custody_documentation">Court Custody Documentation</option>
                    <option value="other">Other Official Record</option>
                  </select>
                </div>

                <div className="field-row child-row">
                  <div className="field">
                    <label htmlFor={`childName-${index}`}>Child's Full Name</label>
                    <input
                      type="text"
                      id={`childName-${index}`}
                      value={child.name}
                      onChange={(e) => updateChild(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="field field-narrow">
                    <label htmlFor={`childAge-${index}`}>Age</label>
                    <input
                      type="number"
                      id={`childAge-${index}`}
                      min="0"
                      value={child.age}
                      onChange={(e) => updateChild(index, 'age', e.target.value)}
                    />
                  </div>
                  {dependentChildren.length > 1 && (
                    <button
                      type="button"
                      className="remove-row-btn"
                      onClick={() => removeChildRow(index)}
                      aria-label="Remove this child"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button type="button" className="add-row-btn" onClick={addChildRow}>
              + Add another child
            </button>
          </section>

          {/* FINANCIAL VERIFICATION */}
          <section className="form-section">
            <h3 className="section-header">Financial Verification</h3>
            <p className="section-note">
              Please indicate which document you have available supporting the hardship described
              in your original application, and upload it below.
            </p>

            <div className="field">
              <label htmlFor="hardshipDocType">Document type</label>
              <select
                id="hardshipDocType"
                value={hardshipDocType}
                onChange={(e) => setHardshipDocType(e.target.value)}
              >
                <option value="">Select a document type</option>
                <option value="eviction_notice">Eviction Notice</option>
                <option value="utility_disconnect_notice">Utility Disconnect Notice</option>
                <option value="medical_bill">Medical Bill</option>
                <option value="prescription_invoice">Prescription Invoice</option>
                <option value="repair_estimate">Repair Estimate</option>
                <option value="employer_separation_letter">Employer Separation Letter</option>
                <option value="reduced_hours_notice">Reduced Hours Notice</option>
                <option value="pay_stubs">Pay Stubs</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="hardshipDocFile">Upload document (max 3MB)</label>
              <input
                type="file"
                id="hardshipDocFile"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) =>
                  handleFileChange(e.target.files[0] || null, setHardshipDocFile, setHardshipFileError)
                }
              />
              {hardshipFileError && <p className="field-error">{hardshipFileError}</p>}
            </div>

            <div className="field">
              <label htmlFor="hardshipDetails">Additional details (optional)</label>
              <textarea
                id="hardshipDetails"
                rows={3}
                value={hardshipDetails}
                onChange={(e) => setHardshipDetails(e.target.value)}
              />
            </div>
          </section>

          {/* INCOME VERIFICATION */}
          <section className="form-section">
            <h3 className="section-header">Income Verification</h3>
            <p className="section-note">
              Please indicate which document you have available that verifies your household
              income, and upload it below.
            </p>

            <div className="field">
              <label htmlFor="incomeDocType">Document type</label>
              <select
                id="incomeDocType"
                value={incomeDocType}
                onChange={(e) => setIncomeDocType(e.target.value)}
              >
                <option value="">Select a document type</option>
                <option value="w2">W-2</option>
                <option value="pay_stub">Pay Stub</option>
                <option value="bank_statement">Bank Statement</option>
                <option value="benefits_letter">Benefits Letter</option>
                <option value="unemployment">Unemployment</option>
                <option value="pension">Pension</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="incomeDocFile">Upload document (max 3MB)</label>
              <input
                type="file"
                id="incomeDocFile"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) =>
                  handleFileChange(e.target.files[0] || null, setIncomeDocFile, setIncomeFileError)
                }
              />
              {incomeFileError && <p className="field-error">{incomeFileError}</p>}
            </div>
          </section>

          {/* PAYMENT INFORMATION */}
          <section className="form-section">
            <h3 className="section-header">Payment Information</h3>
            <p className="section-note">
              If your application receives final approval, how should assistance be issued?
            </p>

            <div className="field">
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select a payment method</option>
                <option value="applicant">Direct payment to Applicant</option>
                <option value="landlord">Direct payment to landlord</option>
                <option value="utility_provider">Utility provider</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="grocery_vendor">Grocery Vendor</option>
                <option value="childcare_provider">Childcare Provider</option>
                <option value="educational_institution">Educational Institution</option>
                <option value="other_vendor">Other Vendor</option>
              </select>
            </div>
          </section>

          {/* APPLICANT CERTIFICATION */}
          <section className="form-section">
            <h3 className="section-header">Applicant Certification</h3>
            <p className="section-note">By signing below, I certify that:</p>

            <ul className="certification-list">
              <li>The information provided in my original application remains true and accurate, or I have updated any changes above.</li>
              <li>The documents submitted are authentic and belong to me or my household.</li>
              <li>I understand that the proposed assistance amount is not a final approval and remains subject to successful verification.</li>
              <li>I authorize The Household Resilience Initiative to verify the information provided for the purpose of determining eligibility.</li>
            </ul>

            <div className="field">
              <label className="radio-option">
                <input
                  type="checkbox"
                  checked={certificationAgreed}
                  onChange={(e) => setCertificationAgreed(e.target.checked)}
                  required
                />
                I certify that the above statements are true.
              </label>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="signatureName">Applicant Signature (type full name)</label>
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

          {/* WHAT HAPPENS NEXT */}
          <section className="form-section">
            <h3 className="section-header">What Happens Next?</h3>
            <p className="section-note">
              Once the requested information is received, the Household Resilience Initiative will continue its review. If additional information or documentation is needed, a member of the review team may contact you.
            </p>
            <p className="section-note">
              Once your application has been approved, you will be asked to complete a secure identity verification process through ID.me. This step helps us confirm your identity and protect the integrity of the assistance program. Instructions will be provided to guide you through the verification process.
            </p>
            <p className="section-note">
              Payments will be processed via ACH direct deposit to the vendors account once all required documentation has been received and approved. Please contact our office if you would prefer to pick up a paper check.
            </p>
          </section>

          {submitError && <p className="submit-error">{submitError}</p>}

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        <div className="thank-you-box">
          <p>We appreciate your patience and thank you for allowing us the opportunity to support your household.</p>
        </div>

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