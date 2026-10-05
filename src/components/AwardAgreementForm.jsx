import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import orgLogo from '../assets/org-logo.png'
import elizabethSignature from '../assets/elizabeth-signature.png'
import './ApplicationForm.css'

export default function AwardAgreementForm() {
  // Award details
  const [awardReference, setAwardReference] = useState('HRF-93883620')
  const [recipientName, setRecipientName] = useState('')
  const [approvedCategory, setApprovedCategory] = useState('')
  const [approvedAmount, setApprovedAmount] = useState('')
  const [authorizedUse, setAuthorizedUse] = useState('')

  // Recipient particulars
  const [fullLegalName, setFullLegalName] = useState('')
  const [residentialAddress, setResidentialAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [amountAllocated, setAmountAllocated] = useState('')

  // Guarantor particulars
  const [guarantorFullName, setGuarantorFullName] = useState('')
  const [guarantorRelationship, setGuarantorRelationship] = useState('')
  const [guarantorAddress, setGuarantorAddress] = useState('')
  const [guarantorPhone, setGuarantorPhone] = useState('')

  // Legal disclaimer
  const [disclaimerSignature, setDisclaimerSignature] = useState('')
  const [disclaimerDate, setDisclaimerDate] = useState('')
  const [disclaimerPrintedName, setDisclaimerPrintedName] = useState('')

  // Final acknowledgement
  const [agreementAccepted, setAgreementAccepted] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const [signatureDate, setSignatureDate] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')
    setSubmitting(true)

    try {
      const { error: insertError } = await supabase
        .from('award_agreements')
        .insert([
          {
            // Award details
            award_reference: awardReference,
            recipient_name: recipientName,
            approved_category: approvedCategory,
            approved_amount: approvedAmount
              ? Number(approvedAmount)
              : null,
            authorized_use: authorizedUse,

            // Recipient particulars
            full_legal_name: fullLegalName,
            residential_address: residentialAddress,
            phone_number: phoneNumber,
            email_address: emailAddress,
            amount_allocated: amountAllocated
              ? Number(amountAllocated)
              : null,

            // Guarantor particulars
            guarantor_full_name: guarantorFullName,
            guarantor_relationship: guarantorRelationship,
            guarantor_address: guarantorAddress,
            guarantor_phone: guarantorPhone,

            // Legal disclaimer
            disclaimer_signature: disclaimerSignature,
            disclaimer_date: disclaimerDate || null,
            disclaimer_printed_name: disclaimerPrintedName,

            // Final acknowledgement
            agreement_accepted: agreementAccepted,
            signature_name: signatureName,
            signature_date: signatureDate || null,
          },
        ])

      if (insertError) {
        throw insertError
      }

      setSubmitted(true)
    } catch (err) {
      console.error(
        'Award agreement submission failed:',
        err
      )

      setSubmitError(
        'Something went wrong submitting this agreement. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="page">
        <header className="header">
          <img
            className="org-logo"
            src={orgLogo}
            alt="The Household Resilience Initiative"
          />

          <h1 className="org-name">
            THE HOUSEHOLD
            <br />
            RESILIENCE INITIATIVE
          </h1>
        </header>

        <main className="form-container">
          <section
            className="form-section"
            style={{ textAlign: 'center' }}
          >
            <h3
              className="section-header"
              style={{ borderBottom: 'none' }}
            >
              Agreement Received
            </h3>

            <p className="section-note">
              Thank you — your signed agreement has been recorded.
              Our team will follow up with next steps regarding
              disbursement.
            </p>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="header">
        <img
          className="org-logo"
          src={orgLogo}
          alt="The Household Resilience Initiative"
        />

        <h1 className="org-name">
          THE HOUSEHOLD
          <br />
          RESILIENCE INITIATIVE
        </h1>

        <p className="tagline">
          STRONGER HOMES &nbsp;·&nbsp; RESILIENT COMMUNITIES
          &nbsp;·&nbsp; LASTING HOPE
        </p>

        <hr className="header-rule" />

        <h2 className="fund-title">
          Household Resilience Fund
        </h2>

        <p className="fund-subtitle">
          AWARD APPROVAL, USE-OF-FUNDS &amp; RECIPIENT AGREEMENT
        </p>
      </header>

      <main className="form-container">

        {/* INTRODUCTION / OPENING INFORMATION */}
        <div className="intro-text">
          <p>
            Program: Household Assistance / Emergency Household Support
          </p>

          <p>
            Award Reference No.: {awardReference}
          </p>

          <p>
            The purpose of this assistance is to provide eligible
            households experiencing financial hardship with support
            toward approved essential household expenses.
          </p>

          <p>
            The Recipient agrees that the awarded funds will be used
            solely for the authorized purpose identified by HRI and
            will not be knowingly diverted, transferred, exchanged,
            or otherwise used for an unrelated purpose.
          </p>

          <p>
            The approved assistance is provided for the specific
            household need(s), expense(s), or purpose(s) identified
            in the Recipient’s approval documentation. The Recipient
            shall not materially change the purpose of the award or
            apply the funds toward a different expense without prior
            written authorization from HRI.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* AWARD DETAILS */}
          <section className="form-section">
            <h3 className="section-header">
              Award Details
            </h3>

            <div className="field">
              <label htmlFor="recipientName">
                Recipient Full Name
              </label>

              <input
                type="text"
                id="recipientName"
                value={recipientName}
                onChange={(e) =>
                  setRecipientName(e.target.value)
                }
                required
              />
            </div>

            <div className="field">
              <label htmlFor="approvedCategory">
                Approved Assistance Category
              </label>

              <select
                id="approvedCategory"
                value={approvedCategory}
                onChange={(e) =>
                  setApprovedCategory(e.target.value)
                }
                required
              >
                <option value="">
                  Select a category
                </option>

                <option value="housing_shelter">
                  Housing / Shelter
                </option>

                <option value="utilities">
                  Utilities
                </option>

                <option value="medical_prescription">
                  Medical / Prescription
                </option>

                <option value="childcare_education">
                  Childcare / Education
                </option>

                <option value="essential_living_costs">
                  Essential Living Costs
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="approvedAmount">
                Approved Amount
              </label>

              <input
                type="number"
                id="approvedAmount"
                value={approvedAmount}
                onChange={(e) =>
                  setApprovedAmount(e.target.value)
                }
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="authorizedUse">
                Authorized Use of Funds
              </label>

              <textarea
                id="authorizedUse"
                value={authorizedUse}
                onChange={(e) =>
                  setAuthorizedUse(e.target.value)
                }
                rows="3"
                required
              />
            </div>
          </section>

          {/* TERMS OF APPROVAL */}
          <section className="form-section">
            <h3 className="section-header">
              Terms of Approval
            </h3>

            <ul className="certification-list">
              <li>
                The Recipient acknowledges that acceptance of the award
                constitutes acceptance of the terms and conditions of
                this Agreement.
              </li>

              <li>
                Legal Authority: This approval is issued under the
                authority vested in this agency by the relevant
                household assistance legislation, administrative codes,
                and implementing regulations currently in force.
              </li>

              <li>
                Purpose: The funds are designated strictly for approved
                household-related expenses (including but not limited
                to shelter, utilities, essential living costs, or other
                eligible needs as defined by program guidelines).
              </li>

              <li>
                Disbursement: Payment shall be issued by donors in
                accordance with standard agency procedures and
                authorized method. Recipients retain the right to
                inquire regarding the precise method and timeline of
                disbursement.
              </li>

              <li>
                Rights of Recipients: You retain all rights afforded
                under the applicable acts, including the right to
                request a fair hearing or administrative review, and
                the right to confidentiality of your case information
                as protected by law.
              </li>

              <li>
                Obligations: Acceptance of these benefits constitutes
                acknowledgment of the duty to use funds solely for the
                authorized purposes and to report any material change
                in circumstances that may affect eligibility, as
                required by law.
              </li>

              <li>
                Duration / Finality: This approval is effective as of
                the date of this letter and remains subject to any
                subsequent audits, verifications, or lawful adjustments
                authorized under the governing acts.
              </li>
            </ul>
          </section>

          {/* RECIPIENT ACKNOWLEDGEMENT */}
          <section className="form-section">
            <h3 className="section-header">
              RECIPIENT ACKNOWLEDGEMENT, DECLARATION &amp; UNDERTAKING
            </h3>

            <p className="section-note">
              (To be completed, signed, and returned by each recipient
              before receipt of funds)
            </p>

            <p className="section-note">
              I, the undersigned recipient, hereby solemnly declare,
              acknowledge, and undertake as follows under penalty of law:
            </p>

            <ol>

              {/* PERSONAL PARTICULARS */}
              <li>
                <strong>
                  Personal Particulars of Recipient
                </strong>{' '}
                (to be completed by the recipient):

                <ul>

                  <li>
                    <div className="field">
                      <label htmlFor="fullLegalName">
                        Full Legal Name:
                      </label>

                      <input
                        type="text"
                        id="fullLegalName"
                        value={fullLegalName}
                        onChange={(e) =>
                          setFullLegalName(e.target.value)
                        }
                        required
                      />
                    </div>
                  </li>

                  <li>
                    <div className="field">
                      <label htmlFor="residentialAddress">
                        Current Residential Address:
                      </label>

                      <textarea
                        id="residentialAddress"
                        value={residentialAddress}
                        onChange={(e) =>
                          setResidentialAddress(e.target.value)
                        }
                        rows="3"
                        required
                      />
                    </div>
                  </li>

                  <li>
                    <div className="field">
                      <label htmlFor="phoneNumber">
                        Telephone / Mobile Number:
                      </label>

                      <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) =>
                          setPhoneNumber(e.target.value)
                        }
                        required
                      />
                    </div>
                  </li>

                  <li>
                    <div className="field">
                      <label htmlFor="emailAddress">
                        Email Address (if any):
                      </label>

                      <input
                        type="email"
                        id="emailAddress"
                        value={emailAddress}
                        onChange={(e) =>
                          setEmailAddress(e.target.value)
                        }
                      />
                    </div>
                  </li>

                  <li>
                    <div className="field">
                      <label htmlFor="amountAllocated">
                        Amount Allocated to Me under this Authorization:
                      </label>

                      <input
                        type="number"
                        id="amountAllocated"
                        value={amountAllocated}
                        onChange={(e) =>
                          setAmountAllocated(e.target.value)
                        }
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </li>

                </ul>
              </li>

              {/* GUARANTOR PARTICULARS */}
              <li>
                <strong>
                  Guarantor Particulars
                </strong>{' '}
                (to be completed by the recipient):

                <p>
                  I hereby nominate the following person as my
                  Guarantor, who shall be jointly and severally liable
                  with me for any breach, misuse, or recovery of the
                  funds:
                </p>

                <ul>

                  <li>
                    <div className="field">
                      <label htmlFor="guarantorFullName">
                        Full Legal Name of Guarantor:
                      </label>

                      <input
                        type="text"
                        id="guarantorFullName"
                        value={guarantorFullName}
                        onChange={(e) =>
                          setGuarantorFullName(e.target.value)
                        }
                        required
                      />
                    </div>
                  </li>

                  <li>
                    <div className="field">
                      <label htmlFor="guarantorRelationship">
                        Relationship to Recipient:
                      </label>

                      <input
                        type="text"
                        id="guarantorRelationship"
                        value={guarantorRelationship}
                        onChange={(e) =>
                          setGuarantorRelationship(e.target.value)
                        }
                        required
                      />
                    </div>
                  </li>

                  <li>
                    <div className="field">
                      <label htmlFor="guarantorAddress">
                        Guarantor's Residential Address:
                      </label>

                      <textarea
                        id="guarantorAddress"
                        value={guarantorAddress}
                        onChange={(e) =>
                          setGuarantorAddress(e.target.value)
                        }
                        rows="3"
                        required
                      />
                    </div>
                  </li>

                  <li>
                    <div className="field">
                      <label htmlFor="guarantorPhone">
                        Guarantor's Telephone / Mobile Number:
                      </label>

                      <input
                        type="tel"
                        id="guarantorPhone"
                        value={guarantorPhone}
                        onChange={(e) =>
                          setGuarantorPhone(e.target.value)
                        }
                        required
                      />
                    </div>
                  </li>

                </ul>
              </li>

            </ol>
          </section>

          {/* LEGAL DISCLAIMER */}
          <section className="form-section">
            <h3 className="section-header">
              LEGAL DISCLAIMER – FAILURE TO REMIT FUNDING AS ALLOCATED
            </h3>

            <p className="section-note">
              By accepting, receiving, or otherwise dealing with the
              funds/resources that have been shared and allocated under
              this arrangement, the recipient(s) expressly acknowledge
              and agree to the following.
            </p>

            <p className="section-note">
              I understand and expressly agree that:
            </p>

            <div className="legal-disclaimer">

              <p>
                <strong>A.</strong> The information provided above is
                true, complete, and accurate. Any false statement,
                misrepresentation, or omission constitutes a material
                breach and may render me liable to criminal prosecution
                under applicable fraud, false declaration, or related
                statutes.
              </p>

              <p>
                <strong>B.</strong> The funds received are strictly for
                approved household assistance purposes. Any diversion,
                misuse, conversion, or unauthorized expenditure of the
                funds shall constitute a breach of this agreement and of
                the governing program rules.
              </p>

              <p>
                <strong>C.</strong> In the event of any breach, default,
                misuse, or failure to comply with the terms of this
                authorization and acknowledgment, I (and my nominated
                Guarantor) shall be jointly and severally liable for the
                full recovery of the amount received, together with any
                interest, costs, and penalties as provided by law.
              </p>

              <p>
                <strong>D.</strong> I hereby authorize this agency, its
                agents, and any competent law enforcement authority to
                use the personal details, address, and Guarantor
                particulars provided herein for the purpose of locating
                me, serving legal process, and enforcing recovery or
                prosecution.
              </p>

              <p>
                <strong>E.</strong> I waive no rights afforded to me by
                law, but I expressly consent to the use of the information
                supplied for enforcement purposes should a breach occur.
              </p>

            </div>

            <div className="field">
              <label htmlFor="disclaimerSignature">
                Signature of Recipient:
              </label>

              <input
                type="text"
                id="disclaimerSignature"
                value={disclaimerSignature}
                onChange={(e) =>
                  setDisclaimerSignature(e.target.value)
                }
                required
              />
            </div>

            <div className="field-row">

              <div className="field">
                <label htmlFor="disclaimerDate">
                  Date:
                </label>

                <input
                  type="date"
                  id="disclaimerDate"
                  value={disclaimerDate}
                  onChange={(e) =>
                    setDisclaimerDate(e.target.value)
                  }
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="disclaimerPrintedName">
                  Printed Name of Recipient:
                </label>

                <input
                  type="text"
                  id="disclaimerPrintedName"
                  value={disclaimerPrintedName}
                  onChange={(e) =>
                    setDisclaimerPrintedName(e.target.value)
                  }
                  required
                />
              </div>

            </div>

            {/* AUTHORIZED SIGNATORY */}
            <p
              className="section-note"
              style={{ marginBottom: '4px' }}
            >
              <strong>
                Issued under official authority.
              </strong>
            </p>

            <div
              className="authorized-signatory"
              style={{
                marginTop: '8px',
                lineHeight: '1.15',
              }}
            >

              <div
                className="signature-line"
                style={{ marginBottom: '2px' }}
              >
                <span>Signature:</span>
              </div>

              <img
                src={elizabethSignature}
                alt="Authorized signature"
                style={{
                  display: 'block',
                  width: '220px',
                  height: 'auto',
                  margin: '0 0 2px 55px',
                }}
              />

              <p
                className="signatory-name"
                style={{ margin: '0' }}
              >
                <strong>
                  ELIZABETH MCSWAIN
                </strong>
              </p>

              <p
                className="signatory-title"
                style={{ margin: '0' }}
              >
                Authorized Signatory / Fiscal Officer
              </p>

              <p
                className="signatory-department"
                style={{ margin: '0' }}
              >
                Finance Department
              </p>

              <p
                className="signatory-organization"
                style={{ margin: '0' }}
              >
                Household Resilience Initiative
              </p>

            </div>

            <p className="section-note">
              <strong>cc:</strong> Finance / Case File / Records /
              Legal &amp; Enforcement Division
            </p>
          </section>

          {/* RECIPIENT ACKNOWLEDGMENT */}
          <section className="form-section">
            <h3 className="section-header">
              Recipient Acknowledgment
            </h3>

            <p className="section-note">
              By signing below, I confirm that I have read and
              understood the terms of this award and agree to use
              the funds as described above.
            </p>

            {/* MOVED FROM NOTICE OF RIGHTS AND CONTINUING OBLIGATIONS */}
            <p className="section-note">
              You retain all rights under the applicable acts and
              regulations, including the right to administrative review
              or fair hearing within prescribed time limits. However,
              acceptance of the funds and completion of this acknowledgment
              bind you to the obligations stated herein. Failure to provide
              accurate particulars or any subsequent breach may result in
              civil recovery proceedings and/or referral to law enforcement
              for investigation and prosecution as authorized by law.
            </p>

            <p className="section-note">
              This letter, together with the completed acknowledgment,
              constitutes official notice, authorization, and binding
              undertaking.
            </p>

            <p className="section-note">
              Please complete the acknowledgment section in full, sign
              where indicated, and return a copy to this office. Retain
              the original for your records.
            </p>

            <div className="field">
              <label className="radio-option">

                <input
                  type="checkbox"
                  checked={agreementAccepted}
                  onChange={(e) =>
                    setAgreementAccepted(e.target.checked)
                  }
                  required
                />

                I accept the terms of this award.

              </label>
            </div>

            <div className="field-row">

              <div className="field">
                <label htmlFor="signatureName">
                  Signature (type full name)
                </label>

                <input
                  type="text"
                  id="signatureName"
                  value={signatureName}
                  onChange={(e) =>
                    setSignatureName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="signatureDate">
                  Date
                </label>

                <input
                  type="date"
                  id="signatureDate"
                  value={signatureDate}
                  onChange={(e) =>
                    setSignatureDate(e.target.value)
                  }
                  required
                />
              </div>

            </div>
          </section>

          {/* ERROR */}
          {submitError && (
            <p className="submit-error">
              {submitError}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
          >
            {submitting
              ? 'Submitting...'
              : 'Submit Agreement'}
          </button>

        </form>

        {/* FOOTER */}
        <footer className="page-footer">
          <p className="footer-org">
            THE HOUSEHOLD RESILIENCE INITIATIVE &nbsp;·&nbsp;
            Stronger Homes. Resilient Communities. Lasting Hope.
          </p>

          <p className="footer-confidentiality">
            This document is confidential and intended solely for the
            named recipient. All information is protected under
            applicable privacy standards.
          </p>
        </footer>

      </main>
    </div>
  )
}