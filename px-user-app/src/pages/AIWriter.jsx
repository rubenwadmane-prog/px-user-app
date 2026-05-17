import { useState } from 'react'
import { Wand2, ArrowLeft, Sparkles, Download, FileText } from 'lucide-react'

const generators = [
  { emoji: '🧪', label: 'Lab Experiment', desc: 'Generate complete lab manual entries', color: '#E17055' },
  { emoji: '📝', label: 'Assignment', desc: 'Structured answers with formatting', color: '#6C5CE7' },
  { emoji: '📊', label: 'Report', desc: 'Technical & project reports', color: '#0984E3' },
  { emoji: '📖', label: 'Notes', desc: 'Concise, exam-ready notes', color: '#00B894' },
  { emoji: '🔍', label: 'Case Study', desc: 'Detailed analysis documents', color: '#FDCB6E' },
  { emoji: '💡', label: 'Proposal', desc: 'Project & research proposals', color: '#A29BFE' },
]

export default function AIWriter() {
  const [selected, setSelected] = useState(null)
  const [topic, setTopic] = useState('')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState('')

  const handleGenerate = () => {
    if (!topic) return
    setGenerating(true)
    setResult('')
    const sampleText = `# ${selected.label}: ${topic}\n\n## Introduction\nThis ${selected.label.toLowerCase()} covers the fundamentals of ${topic}, providing a comprehensive overview suitable for academic purposes.\n\n## Objective\nTo understand and analyze the key concepts related to ${topic}.\n\n## Theory\n${topic} is a significant area of study that encompasses various principles and methodologies. The underlying concepts form the foundation for advanced research and practical applications.\n\n## Procedure\n1. Research the core principles of ${topic}\n2. Analyze existing literature and case studies\n3. Document findings with proper citations\n4. Draw conclusions based on evidence\n\n## Conclusion\nThis study provides valuable insights into ${topic} and its applications in the field.`
    
    let i = 0
    const interval = setInterval(() => {
      setResult(sampleText.slice(0, i))
      i += 3
      if (i >= sampleText.length) {
        clearInterval(interval)
        setGenerating(false)
        setResult(sampleText)
      }
    }, 15)
  }

  return (
    <div>
      <div className="top-bar">
        <h1>AI Writer ✨</h1>
      </div>

      {!selected ? (
        <>
          <div className="card" style={{ marginBottom: 20, background: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)', color: '#fff', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Sparkles size={20} />
              <span style={{ fontWeight: 700 }}>Powered by AI</span>
            </div>
            <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Generate print-ready academic documents in seconds. Just pick a type and enter your topic.</p>
          </div>
          <div className="ai-grid">
            {generators.map(g => (
              <div key={g.label} className="ai-card" onClick={() => setSelected(g)}>
                <span className="ai-emoji">{g.emoji}</span>
                <h3>{g.label}</h3>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <button className="btn btn-sm btn-secondary" onClick={() => { setSelected(null); setResult(''); setTopic('') }} style={{ marginBottom: 16 }}>
            <ArrowLeft size={16} /> Back
          </button>

          <div className="card" style={{ marginBottom: 16, textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem' }}>{selected.emoji}</span>
            <h2 style={{ marginTop: 8, fontSize: '1.1rem' }}>{selected.label} Generator</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{selected.desc}</p>
          </div>

          <div className="input-group">
            <label>Topic / Title</label>
            <input className="input" placeholder="e.g. Binary Search Tree Implementation"
              value={topic} onChange={e => setTopic(e.target.value)} />
          </div>

          <button className="btn btn-primary btn-full btn-lg" onClick={handleGenerate} disabled={generating || !topic}>
            <Wand2 size={18} /> {generating ? 'Generating...' : 'Generate'}
          </button>

          {result && (
            <div style={{ marginTop: 20 }}>
              <div className="card" style={{ whiteSpace: 'pre-wrap', fontSize: '0.88rem', lineHeight: 1.7, maxHeight: 400, overflowY: 'auto' }}>
                {result}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button className="btn btn-secondary" style={{ flex: 1 }}><Download size={16} /> Save PDF</button>
                <button className="btn btn-primary" style={{ flex: 1 }}><FileText size={16} /> Add to Queue</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
