import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ApplicationForm from './components/ApplicationForm'
import DisbursementForm from './components/DisbursementForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApplicationForm />} />
        <Route path="/disbursement" element={<DisbursementForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App