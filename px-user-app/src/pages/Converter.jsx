import { FileText, Image, FileDown, Layers, FileArchive, Upload } from 'lucide-react'
import { useState } from 'react'

const tools = [
  { icon: FileText, label: 'DOCX → PDF', desc: 'Word to PDF', color: '#0984E3', emoji: '📝' },
  { icon: Layers, label: 'PPT → PDF', desc: 'Slides to PDF', color: '#E17055', emoji: '📊' },
  { icon: Image, label: 'Images → PDF', desc: 'JPG/PNG to PDF', color: '#00B894', emoji: '🖼️' },
  { icon: FileDown, label: 'Compress PDF', desc: 'Reduce file size', color: '#6C5CE7', emoji: '📦' },
  { icon: FileArchive, label: 'Merge PDFs', desc: 'Combine files', color: '#FDCB6E', emoji: '🔗' },
]

export default function Converter() {
  const [selected, setSelected] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleConvert = (tool) => {
    setSelected(tool)
  }

  return (
    <div>
      <div className="top-bar">
        <h1>PDF Tools ⚡</h1>
      </div>

      {!selected ? (
        <div className="converter-grid">
          {tools.map(t => (
            <div key={t.label} className="converter-card" onClick={() => handleConvert(t)}>
              <span style={{ fontSize: '2rem' }}>{t.emoji}</span>
              <h3>{t.label}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button className="btn btn-sm btn-secondary" onClick={() => setSelected(null)} style={{ marginBottom: 16 }}>
            ← Back to tools
          </button>
          <div className="card" style={{ textAlign: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: '2.5rem' }}>{selected.emoji}</span>
            <h2 style={{ marginTop: 8, fontSize: '1.1rem' }}>{selected.label}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{selected.desc}</p>
          </div>

          <div className="upload-zone" onClick={() => document.getElementById('convert-input')?.click()}>
            <Upload />
            <h3>Drop your file here</h3>
            <p>or tap to browse</p>
            <input id="convert-input" type="file" hidden />
          </div>

          {uploading && (
            <div className="card" style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Converting...</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>68%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '68%' }}></div>
              </div>
            </div>
          )}

          <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 20 }}
            onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 2000) }}>
            Convert Now
          </button>
        </div>
      )}
    </div>
  )
}
