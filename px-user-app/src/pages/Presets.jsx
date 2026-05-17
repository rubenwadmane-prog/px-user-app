import { useState } from 'react'
import { BookOpen, Plus, Check } from 'lucide-react'

export default function Presets({ user }) {
  const [added, setAdded] = useState({})

  const frontPages = [
    { id: 1, title: 'Lab Manual Front Page', college: user?.college || 'AISSMS IOIT', color: '#6C5CE7' },
    { id: 2, title: 'Assignment Front Page', college: user?.college || 'AISSMS IOIT', color: '#E17055' },
    { id: 3, title: 'Project Report Cover', college: user?.college || 'AISSMS IOIT', color: '#00B894' },
    { id: 4, title: 'Practical File Cover', college: user?.college || 'AISSMS IOIT', color: '#0984E3' },
  ]

  const handleAdd = (id) => {
    setAdded({ ...added, [id]: true })
    setTimeout(() => setAdded({ ...added, [id]: false }), 2000)
  }

  return (
    <div>
      <div className="top-bar">
        <h1>Presets 🎓</h1>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Your Info (auto-filled)</div>
        <div className="setting-row">
          <span className="setting-label">Name</span>
          <span className="setting-value">{user?.name || 'Student'}</span>
        </div>
        <div className="setting-row">
          <span className="setting-label">Roll No</span>
          <span className="setting-value">{user?.rollNo || '—'}</span>
        </div>
        <div className="setting-row">
          <span className="setting-label">Branch</span>
          <span className="setting-value">{user?.branch || '—'}</span>
        </div>
        <div className="setting-row">
          <span className="setting-label">College</span>
          <span className="setting-value">{user?.college || '—'}</span>
        </div>
      </div>

      <div className="section-header">
        <h2>Front Page Templates</h2>
      </div>

      <div className="doc-list">
        {frontPages.map(fp => (
          <div key={fp.id} className="doc-item">
            <div className="doc-icon" style={{ background: `${fp.color}15`, color: fp.color }}>
              <BookOpen size={20} />
            </div>
            <div className="doc-info">
              <h4>{fp.title}</h4>
              <p>{fp.college} · {user?.branch || 'Your Branch'}</p>
            </div>
            <button className={`btn btn-sm ${added[fp.id] ? 'btn-success' : 'btn-primary'}`}
              onClick={() => handleAdd(fp.id)}>
              {added[fp.id] ? <Check size={14} /> : <Plus size={14} />}
              {added[fp.id] ? 'Added!' : 'Add'}
            </button>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 24 }}>
        Templates are pre-filled with your name, roll no & branch. One tap to add to your print queue.
      </p>
    </div>
  )
}
