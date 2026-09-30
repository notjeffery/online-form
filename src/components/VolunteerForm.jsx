import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import orgLogo from '../assets/org-logo.png'
import './ApplicationForm.css'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const OVERSIZE_MESSAGE = 'This file is over 5MB. Please email it to support@householdresilience.org instead.'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function VolunteerForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [stateRegion, setStateRegion] = useState('')
  const [areaOfInterest, setAreaOfInterest] = useState('')

  const [availabilityDays, setAvailabilityDays] = useState([])
  const [availabilityTime, setAvailabilityTime] = useState('')

  const [volunteerType, setVolunteerType] = useState('')

  const [skillsExperience, setSkillsExperience] = useState('')
  const [motivation, setMotivation] = useState('')

  const [emergencyContactName, setEmergencyContactName] = useState('')
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('')

  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState(false)

  const [resumeFile, setResumeFile] = useState(null)
  const [resumeError, setResumeError] = useState('')

  const [signatureName, setSignatureName] = useState('')
  const [signatureDate, setSignatureDate] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function toggleDay(day) {
    setAvailabilityDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  function handleResumeChange(e) {
    const file = e.target.files[0] || null
    if (file && file.size > MAX_FILE_SIZE) {
      setResumeError(OVERSIZE_MESSAGE)
      setResumeFile(null)
      return
    }
    setResumeError('')
    setResumeFile(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')
    setSubmitting(true)

    try {
      const volunteerId = crypto.randomUUID()
      let resumeUrl = null

      if (resumeFile) {
        const filePath = `${volunteerId}/resume-${resumeFile.name}`
        const { error: uploadError } = await supabase.storage
          .from('volunteer-documents')
          .upload(filePath, resumeFile)

        if (uploadError) throw uploadError
        resumeUrl = filePath
      }

      const { error: insertError } = await supabase.from('volunteers').insert([{
        id: volunteerId,
        full_name: fullName,
        email,
        phone,
        city,
        state_region: stateRegion,
        area_of_interest: areaOfInterest,
        availability_days: availabilityDays,
        availability_time: availabilityTime,
        volunteer_type: volunteerType,
        skills_experience: skillsExperience,
        motivation,
        emergency_contact_name: emergencyContactName,
        emergency_contact_phone: emergencyContactPhone,
        background_check_consent: backgroundCheckConsent,
        resume_url: resumeUrl,
        signature_name: signatureName,
        signature_date: signatureDate || null,
      }])

      if (insertError) throw insertError

      setSubmitted(true)
    } catch (err) {
      console.error('Volunteer submission failed:', err.message)
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
            <h3 className="section-header" style={{ borderBottom: 'none' }}>Thank You!</h3>
            <p className="section-note">
              Your volunteer application has been received. Our volunteer coordinator will reach
              out to you soon regarding next steps.
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
        <h2 className="fund-title">Volunteer Application</h2>
        <p className="fund-subtitle">Join us in supporting households in need</p>
      </header>

      <main className="form-container">
        <section className="intro-text">
          <p>
            Thank you for your interest in volunteering with The Household Resilience Initiative.
            Please complete the form below and a member of our team will follow up with you.
          </p>
        </section>

        <form onSubmit={handleSubmit}>
          {/* CONTACT INFORMATION */}
          <section className="form-section">
            <h3 className="section-header">Contact Information</h3>

            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="stateRegion">State / Region</label>
                <input
                  type="text"
                  id="stateRegion"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          {/* AREA OF INTEREST */}
          <section className="form-section">
            <h3 className="section-header">Area of Interest</h3>
            <p className="section-note">Which area would you most like to support?</p>

            <div className="field">
              <select
                id="areaOfInterest"
                value={areaOfInterest}
                onChange={(e) => setAreaOfInterest(e.target.value)}
                required
              >
                <option value="">Select an area</option>
                <option value="community_outreach">Community Outreach</option>
                <option value="fundraising_events">Fundraising & Events</option>
                <option value="administrative_support">Administrative Support</option>
                <option value="application_review">Application Review Support</option>
                <option value="warehouse_distribution">Warehouse / Distribution</option>
                <option value="marketing_communications">Marketing & Communications</option>
                <option value="other">Other</option>
              </select>
            </div>
          </section>

          {/* AVAILABILITY */}
          <section className="form-section">
            <h3 className="section-header">Availability</h3>
            <p className="section-note">Select all days you're generally available.</p>

            <div className="field checkbox-grid">
              {DAYS.map((day) => (
                <label className="radio-option" key={day}>
                  <input
                    type="checkbox"
                    checked={availabilityDays.includes(day)}
                    onChange={() => toggleDay(day)}
                  />
                  {day}
                </label>
              ))}
            </div>

            <div className="field">
              <label>Preferred time of day</label>
              <div className="radio-row">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="availabilityTime"
                    value="morning"
                    checked={availabilityTime === 'morning'}
                    onChange={(e) => setAvailabilityTime(e.target.value)}
                  />
                  Morning
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="availabilityTime"
                    value="afternoon"
                    checked={availabilityTime === 'afternoon'}
                    onChange={(e) => setAvailabilityTime(e.target.value)}
                  />
                  Afternoon
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="availabilityTime"
                    value="evening"
                    checked={availabilityTime === 'evening'}
                    onChange={(e) => setAvailabilityTime(e.target.value)}
                  />
                  Evening
                </label>
              </div>
            </div>
          </section>

          {/* VOLUNTEER TYPE */}
          <section className="form-section">
            <h3 className="section-header">Volunteer Type</h3>
            <p className="section-note">Are you looking to volunteer, or are you interested in a paid position?</p>

            <div className="field">
              <div className="radio-row">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="volunteerType"
                    value="unpaid"
                    checked={volunteerType === 'unpaid'}
                    onChange={(e) => setVolunteerType(e.target.value)}
                    required
                  />
                  Unpaid Volunteer
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="volunteerType"
                    value="paid"
                    checked={volunteerType === 'paid'}
                    onChange={(e) => setVolunteerType(e.target.value)}
                  />
                  Interested in a Paid Position
                </label>
              </div>
            </div>
          </section>

          {/* EXPERIENCE & MOTIVATION */}
          <section className="form-section">
            <h3 className="section-header">Experience & Motivation</h3>

            <div className="field">
              <label htmlFor="skillsExperience">Relevant skills or experience (optional)</label>
              <textarea
                id="skillsExperience"
                rows={3}
                value={skillsExperience}
                onChange={(e) => setSkillsExperience(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="motivation">Why would you like to volunteer with us? (optional)</label>
              <textarea
                id="motivation"
                rows={3}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="resumeFile">Upload resume/CV (optional, max 5MB)</label>
              <input
                type="file"
                id="resumeFile"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
              />
              {resumeError && <p className="field-error">{resumeError}</p>}
            </div>
          </section>

          {/* EMERGENCY CONTACT */}
          <section className="form-section">
            <h3 className="section-header">Emergency Contact</h3>

            <div className="field-row">
              <div className="field">
                <label htmlFor="emergencyContactName">Contact Name</label>
                <input
                  type="text"
                  id="emergencyContactName"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="emergencyContactPhone">Contact Phone</label>
                <input
                  type="tel"
                  id="emergencyContactPhone"
                  value={emergencyContactPhone}
                  onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          {/* BACKGROUND CHECK & CERTIFICATION */}
          <section className="form-section">
            <h3 className="section-header">Background Check & Certification</h3>
            <p className="section-note">
              Some volunteer roles, especially those involving direct contact with applicants or
              their households, require a background check as a standard safety precaution.
            </p>

            <div className="field">
              <label className="radio-option">
                <input
                  type="checkbox"
                  checked={backgroundCheckConsent}
                  onChange={(e) => setBackgroundCheckConsent(e.target.checked)}
                />
                I consent to a background check if required for my volunteer role.
              </label>
            </div>

            <p className="section-note">By signing below, I certify that the information provided above is accurate.</p>

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
            {submitting ? 'Submitting...' : 'Submit Volunteer Application'}
          </button>
        </form>

        <footer className="page-footer">
          <p className="footer-org">
            THE HOUSEHOLD RESILIENCE INITIATIVE &nbsp;·&nbsp; Stronger Homes. Resilient Communities. Lasting Hope.
          </p>
        </footer>
      </main>
    </div>
  )
}