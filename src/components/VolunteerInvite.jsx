import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import orgLogo from '../assets/org-logo.png'
import './ApplicationForm.css'

export default function VolunteerInvite() {
  const [accepted, setAccepted] = useState(false)
  const navigate = useNavigate()

  function handleContinue() {
    if (!accepted) return
    navigate('/volunteer/apply')
  }

  return (
    <div className="page">
      <header className="header">
        <img className="org-logo" src={orgLogo} alt="The Household Resilience Initiative" />
        <h1 className="org-name">THE HOUSEHOLD<br />RESILIENCE INITIATIVE</h1>
        <p className="tagline">STRONGER HOMES &nbsp;·&nbsp; RESILIENT COMMUNITIES &nbsp;·&nbsp; LASTING HOPE</p>
        <hr className="header-rule" />
        <h2 className="fund-title">Volunteer Agreement &amp; Invitation</h2>
      </header>

      <main className="form-container">
        <section className="form-section">
          <p className="section-note">Dear Prospective Volunteer,</p>

          <p className="section-note">
            On behalf of the Household Resilience Initiative, I wish to extend our sincere
            appreciation for your willingness to contribute your time, expertise, and dedication to
            our mission. As we expand our operations to deliver critical wrap-around support to
            children, individuals with disabilities, and households navigating challenging
            circumstances, we are delighted to invite you to join our team.
          </p>

          <h3 className="section-header">Roles and Responsibilities</h3>
          <p className="section-note">
            In this compensated volunteer capacity, your primary focus will be the provision of compassionate, structured assistance. Your core placement and responsibilities will include:
          </p>

          <ul className="certification-list">
            <li>
              <strong>Crisis Support Specialist / Case Aide</strong>: Provide compassionate, structured assistance to individuals and families in crisis. Responsibilities include intake, safety planning, budgeting guidance, and referral of clients to emergency resources. Serve as a dependable anchor for children and families, facilitating access to essential services.
            </li>
            <li>
              <strong>Peer Support Specialist</strong>: Leverage lived experience to support individuals navigating mental health, substance use, or recovery journeys. Foster community participation, build trust, and assist clients in accessing resources and peer networks that promote stability and inclusion.
            </li>
            <li>
              <strong>Benefits &amp; Representative Payee Specialist</strong>: Assist clients with benefits applications, intake, and financial navigation. Administer representative payee duties, including budgeting support and ensuring the timely, accurate disbursement of funds to meet client needs.
            </li>
            <li>
              <strong>Grant Compliance Monitor</strong>: Ensure program compliance with grant requirements by tracking documentation, reviewing expenditures, and maintaining accurate records. Support reporting, audits, and adherence to funder guidelines to sustain vital services.
            </li>
          </ul>

          <h3 className="section-header">Commitment and Schedule</h3>
          <p className="section-note">
            To ensure the families we serve receive consistent and dependable care, we request that you commit to a regular, manageable schedule. Your anticipated schedule will remain flexible depending on the task at hand.
          </p>

          <p className="section-note">
            In this unpaid volunteer capacity, your primary focus will be the provision of
            compassionate, structured assistance. Any individual may elect to assume one or more of the
            following roles, each of which carries the responsibilities set forth below:
          </p>

          <ul className="certification-list">
            <li>
              <strong>Family &amp; Youth Support</strong> — Serve as a dependable anchor for
              children and families, facilitating their access to vital resources and services.
              Provide consistent, compassionate presence and guidance to promote stability and
              well-being within the household.
            </li>
            <li>
              <strong>Financial &amp; Resource Navigation</strong> — Assist clients with intake
              processes, budgeting guidance, and the mapping of emergency crisis resources. Support
              individuals and families in identifying and accessing financial assistance programs
              and community resources to address immediate and ongoing needs.
            </li>
            <li>
              <strong>Disability &amp; Accessibility Companionship</strong> — Support individuals
              with physical or developmental disabilities in encouraging community participation
              and inclusion. Foster meaningful engagement, build trust, and promote accessibility
              to ensure clients feel valued, supported, and connected within their communities.
            </li>
          </ul>

          <h3 className="section-header">Commitment and Schedule</h3>
          <p className="section-note">
            To ensure the individuals and families we serve receive consistent and dependable care,
            we request that you commit to a regular, manageable schedule. Your anticipated schedule
            will remain flexible depending on the task at hand.
          </p>

          <h3 className="section-header">Compensation Structure: Job Rate</h3>
          <p className="section-note">
            Your compensation for this position is structured as a job rate per participation. You will be paid a predetermined amount within the range of $350.00 to $550.00 for each activity you participate in, providing help and support to individuals, households, and communities.
          </p>

          <h3 className="section-header">Legal Classification and Rate Compliance</h3>
          <p className="section-note">
            You acknowledge and agree that this Job Rate structure does not classify you as an exempt employee under the Fair Labor Standards Act (FLSA). You are a non-exempt employee entitled to minimum wage and overtime protections under applicable federal and state law.
          </p>

          <p className="section-note">
            Total Job Rate Pay for the Workweek ÷ Total Hours Actually Worked = Effective Hourly Rate
          </p>

          <h3 className="section-header">Payment Schedule</h3>
          <p className="section-note">
            Job Rate payments will be processed on the Company's regular bi-weekly payroll schedule. Payment for a completed activity will be included in the next regularly scheduled payroll cycle following the Company's verification of satisfactory completion.
          </p>

        

          <h3 className="section-header">Organization Policies &amp; Safety Guardrails</h3>
          <p className="section-note">
            Because our team works directly with vulnerable youth and individuals with
            disabilities, all volunteer roles are subject to the following safety protections:
          </p>

          <ul className="certification-list">
            <li>
              <strong>Background Screenings</strong> — You agree to undergo a standard background
              check prior to commencing direct client work.
            </li>
            <li>
              <strong>Financial Boundaries</strong> — You agree to adhere strictly to our
              "No-Touch" cash policy. Volunteers act as advisors and educators; you will never
              directly manage or handle a client's physical cash, bank cards, or personal accounts.
            </li>
            <li>
              <strong>Confidentiality</strong> — You agree to protect the privacy and sensitive
              personal information of all children, families, and individuals served by the
              organization.
            </li>
          </ul>

          <h3 className="section-header">Volunteer Status &amp; Nature of Service</h3>
          <p className="section-note">
            By continuing below, you acknowledge and agree that this relationship is an unpaid
            volunteer agreement. This service does not constitute an employee relationship, and you
            will not receive financial compensation, wages, or employee benefits (such as workers'
            compensation or health insurance) in exchange for your service. You are free to
            conclude your volunteer service with us at any time, and the organization reserves the
            same right.
          </p>

          <p className="section-note">
            We are incredibly excited to welcome you to our growing community. Together, we can
            provide the steady hands and reliable hearts that our neighbors need.
          </p>

          <p className="section-note">Sincerely,<br />The Household Resilience Initiative</p>
        </section>

        <section className="form-section">
          <h3 className="section-header">Volunteer Acceptance &amp; Acknowledgment</h3>
          <p className="section-note">
            I have read, understood, and accept the terms of this unpaid volunteer invitation. I
            look forward to supporting the mission of the organization.
          </p>

          <div className="field">
            <label className="radio-option">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              I accept the terms above and wish to continue to the volunteer application.
            </label>
          </div>

          <button
            type="button"
            className="submit-btn"
            disabled={!accepted}
            onClick={handleContinue}
          >
            Continue to Application
          </button>
        </section>

        <footer className="page-footer">
          <p className="footer-org">
            THE HOUSEHOLD RESILIENCE INITIATIVE &nbsp;·&nbsp; Stronger Homes. Resilient Communities. Lasting Hope.
          </p>
        </footer>
      </main>
    </div>
  )
}