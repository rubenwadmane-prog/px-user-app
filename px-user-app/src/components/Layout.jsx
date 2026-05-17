import { useNavigate, useLocation } from 'react-router-dom'
import { Home, FolderOpen, FileText, Printer, Clock } from 'lucide-react'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/library', icon: FolderOpen, label: 'Library' },
  { path: '/converter', icon: FileText, label: 'Convert' },
  { path: '/print', icon: Printer, label: 'Print' },
  { path: '/history', icon: Clock, label: 'History' },
]

export default function Layout({ children, user, onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="app-layout">
      <div className="app-content">
        {children}
      </div>
      <nav className="bottom-nav">
        {navItems.map(item => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
