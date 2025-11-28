import type { ReactNode } from 'react'
import { useState } from 'react'
import './AppLayout.css'
import { TopNav } from '../components/nav/TopNav'
import { SideNav } from '../components/nav/SideNav'
import { LogoTransitionOverlay } from '../components/overlays/LogoTransitionOverlay'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="shell">
      <LogoTransitionOverlay />
      <TopNav onToggleSidebar={() => setIsSidebarOpen((open) => !open)} />
      <div className="shell-body">
        <SideNav isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen((open) => !open)} />
        <main className="shell-content">{children}</main>
      </div>
    </div>
  )
}


