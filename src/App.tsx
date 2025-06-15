import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'

// Pages
import HomePage from './pages/HomePage'
import QuizStepPage from './pages/QuizStepPage'
import ContactCapturePage from './pages/ContactCapturePage'
import ResultsPage from './pages/ResultsPage'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:step" element={<QuizStepPage />} />
        <Route path="/quiz/contact" element={<ContactCapturePage />} />
        <Route path="/quiz/results/:type" element={<ResultsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App