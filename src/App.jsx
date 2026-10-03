import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ApplicationForm from './components/ApplicationForm'
import DisbursementForm from './components/DisbursementForm'
import VolunteerForm from './components/VolunteerForm'
import AwardAgreementForm from './components/AwardAgreementForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApplicationForm />} />
        <Route path="/disbursement" element={<DisbursementForm />} />
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/award-agreement" element={<AwardAgreementForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App