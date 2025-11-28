import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './theme/ThemeContext.tsx'
import { apolloClient } from './apollo/client'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>,
)
