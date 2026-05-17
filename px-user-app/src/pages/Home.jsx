import { useNavigate } from 'react-router-dom'
import { FileText, Wand2, Printer, BookOpen, QrCode, FolderOpen, FileUp, Clock } from 'lucide-react'

const quickActions = [
  { icon: FileUp, label: 'Upload', desc: 'Add documents', color: '#6C5CE7', path: '/library' },
  { icon: Wand2, label: 'AI Writer', desc: 'Generate docs', color: '#E17055', path: '/ai-writer' },
  { icon: FileText, label: 'Convert', desc: 'PDF tools', color: '#00B894', path: '/converter' },
  { icon: BookOpen, label: 'Editor', desc: 'Edit & format', color: '#0984E3', path: '/editor' },
  { icon: QrCode, label: 'Scan & Print', desc: 'At kiosk', color: '#FDCB6E', path: '/print' },
  { icon: FolderOpen, label: 'Presets', desc: 'Front pages', color: '#A29BFE', path: '/presets' },
]

const recentDocs = [
  { name: 'Lab_Experiment_7.pdf', pages: 4, time: '2 hrs ago', color: '#E17055' },
  { name: 'DSA_Assignment_3.pdf', pages: 12, time: '5 hrs ago', color: '#6C5CE7' },
  { name: 'Physics_Notes.pdf', pages: 8, time: 'Yesterday', color: '#00B894' },
]

export default function Home({ user }) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="top-bar">
        <div>
          <h1>Hey, {user.name?.split(' ')[0]} 👋</h1>
        </div>
        <div className="top-bar-avatar">{user.initials}</div>
      </div>

      <div className="credits-banner">
        <div className="label">Print Credits</div>
        <div className="amount">₹ 120.00</div>
        <div className="sub">~ 60 B&W pages remaining</div>
      </div>

      <div className="section-header">
        <h2>Quick Actions</h2>
      </div>
      <div className="action-grid">
        {quickActions.map(a => (
          <div key={a.label} className="action-card" onClick={() => navigate(a.path)}>
            <div className="action-icon" style={{ background: a.color }}>
              <a.icon />
            </div>
            <h3>{a.label}</h3>
            <p>{a.desc}</p>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>Recent Documents</h2>
        <button onClick={() => navigate('/library')}>See all</button>
      </div>
      <div className="doc-list">
        {recentDocs.map((doc, i) => (
          <div key={i} className="doc-item" onClick={() => navigate('/library')}>
            <div className="doc-icon" style={{ background: `${doc.color}15`, color: doc.color }}>
              <FileText size={20} />
            </div>
            <div className="doc-info">
              <h4>{doc.name}</h4>
              <p>{doc.pages} pages · {doc.time}</p>
            </div>
            <span className="badge badge-primary">{doc.pages}p</span>
          </div>
        ))}
      </div>
    </div>
  )
}
