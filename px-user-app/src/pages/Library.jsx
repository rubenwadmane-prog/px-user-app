import { useState } from 'react'
import { Upload, FileText, GripVertical, Trash2, Printer, Plus } from 'lucide-react'

const initialDocs = [
  { id: 1, name: 'Lab_Experiment_7.pdf', pages: 4, size: '1.2 MB', color: '#E17055' },
  { id: 2, name: 'DSA_Assignment_3.pdf', pages: 12, size: '3.4 MB', color: '#6C5CE7' },
  { id: 3, name: 'Physics_Notes.pdf', pages: 8, size: '2.1 MB', color: '#00B894' },
  { id: 4, name: 'Project_Report.pdf', pages: 24, size: '5.8 MB', color: '#0984E3' },
]

export default function Library() {
  const [docs, setDocs] = useState(initialDocs)
  const [tab, setTab] = useState('all')
  const [dragId, setDragId] = useState(null)

  const handleRemove = (id) => setDocs(docs.filter(d => d.id !== id))

  const handleDragStart = (id) => setDragId(id)
  const handleDragOver = (e) => e.preventDefault()
  const handleDrop = (targetId) => {
    if (!dragId || dragId === targetId) return
    const fromIndex = docs.findIndex(d => d.id === dragId)
    const toIndex = docs.findIndex(d => d.id === targetId)
    const updated = [...docs]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, moved)
    setDocs(updated)
    setDragId(null)
  }

  return (
    <div>
      <div className="top-bar">
        <h1>Library 📂</h1>
        <button className="btn btn-sm btn-primary"><Plus size={16} /> Add</button>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>All Docs</button>
        <button className={`tab ${tab === 'queue' ? 'active' : ''}`} onClick={() => setTab('queue')}>Print Queue</button>
      </div>

      {tab === 'all' && (
        <>
          <div className="upload-zone" onClick={() => document.getElementById('file-input')?.click()}>
            <Upload />
            <h3>Upload Documents</h3>
            <p>Tap to upload PDF, DOCX, PPT, or images</p>
            <input id="file-input" type="file" hidden multiple accept=".pdf,.docx,.pptx,.jpg,.png" />
          </div>

          <div className="section-header" style={{ marginTop: 20 }}>
            <h2>All Documents ({docs.length})</h2>
          </div>
          <div className="doc-list">
            {docs.map(doc => (
              <div key={doc.id} className="doc-item"
                draggable onDragStart={() => handleDragStart(doc.id)}
                onDragOver={handleDragOver} onDrop={() => handleDrop(doc.id)}
              >
                <GripVertical size={16} color="var(--text-muted)" style={{ cursor: 'grab' }} />
                <div className="doc-icon" style={{ background: `${doc.color}15`, color: doc.color }}>
                  <FileText size={20} />
                </div>
                <div className="doc-info">
                  <h4>{doc.name}</h4>
                  <p>{doc.pages} pages · {doc.size}</p>
                </div>
                <button className="btn btn-icon btn-danger" onClick={() => handleRemove(doc.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'queue' && (
        <>
          <div className="card" style={{ marginBottom: 16, textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              🖨️ Your queue is ready! Scan a kiosk QR to fire print.
            </p>
            <div style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0', color: 'var(--primary)' }}>
              {docs.length} docs
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {docs.reduce((a, d) => a + d.pages, 0)} total pages
            </p>
          </div>
          <div className="doc-list">
            {docs.map((doc, i) => (
              <div key={doc.id} className="doc-item">
                <span className="badge badge-primary" style={{ minWidth: 28, justifyContent: 'center' }}>#{i + 1}</span>
                <div className="doc-info">
                  <h4>{doc.name}</h4>
                  <p>{doc.pages} pages</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 20 }}>
            <Printer size={18} /> Ready to Print
          </button>
        </>
      )}
    </div>
  )
}
