import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Login from './pages/Login'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AppLayout } from './layouts/AppLayout'
import { EmployeesPage } from './features/employees/pages/EmployeesPage'

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            <motion.div {...pageTransition}>
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <AppLayout>
                <motion.div {...pageTransition}>
                  <EmployeesPage />
                </motion.div>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="*" element={<Navigate to="/employees" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
