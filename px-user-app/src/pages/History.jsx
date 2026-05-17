import { useState } from 'react'
import { FileText, RotateCcw, TrendingUp } from 'lucide-react'

const historyData = [
  { id: 1, name: 'Lab_Experiment_7.pdf', date: 'May 17, 2026', pages: 4, amount: 8, status: 'completed', color: '#00B894' },
  { id: 2, name: 'DSA_Assignment_3.pdf', date: 'May 16, 2026', pages: 12, amount: 24, status: 'completed', color: '#6C5CE7' },
  { id: 3, name: 'Project_Presentation.pdf', date: 'May 15, 2026', pages: 20, amount: 100, status: 'completed', color: '#E17055' },
  { id: 4, name: 'Physics_Notes.pdf', date: 'May 14, 2026', pages: 8, amount: 16, status: 'completed', color: '#0984E3' },
  { id: 5, name: 'Maths_Practice.pdf', date: 'May 12, 2026', pages: 6, amount: 12, status: 'completed', color: '#FDCB6E' },
]

export default function History() {
  const [items] = useState(historyData)
  const totalSpent = items.reduce((a, i) => a + i.amount, 0)
  const totalPages = items.reduce((a, i) => a + i.pages, 0)

  return (
    <div>
      <div className="top-bar">
        <h1>History 📋</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <TrendingUp size={20} color="var(--primary)" style={{ margin: '0 auto 6px' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>₹{totalSpent}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Total Spent</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <FileText size={20} color="var(--accent)" style={{ margin: '0 auto 6px' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>{totalPages}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pages Printed</div>
        </div>
      </div>

      <div className="section-header">
        <h2>Past Print Jobs</h2>
      </div>

      {items.map(item => (
        <div key={item.id} className="history-item">
          <div className="history-icon" style={{ background: `${item.color}15`, color: item.color }}>
            <FileText size={20} />
          </div>
          <div className="history-info">
            <h4>{item.name}</h4>
            <p>{item.date} · {item.pages} pages</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="history-price">₹{item.amount}</div>
            <button className="btn btn-sm btn-secondary" style={{ marginTop: 4, padding: '4px 8px', fontSize: '0.7rem' }}>
              <RotateCcw size={12} /> Reprint
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
