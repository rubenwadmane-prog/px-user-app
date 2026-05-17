import { useState } from 'react'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Type, Eye, Save, Settings } from 'lucide-react'

export default function Editor() {
  const [content, setContent] = useState('Start typing your document here...')
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({ pageSize: 'A4', orientation: 'Portrait', margin: 'Normal', font: 'Inter' })

  return (
    <div>
      <div className="top-bar">
        <h1>Editor ✏️</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-sm btn-secondary" onClick={() => setShowSettings(!showSettings)}>
            <Settings size={16} />
          </button>
          <button className="btn btn-sm btn-primary"><Eye size={16} /> Preview</button>
        </div>
      </div>

      {showSettings && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title">Page Settings</div>
          <div className="setting-row">
            <span className="setting-label">Page Size</span>
            <select className="select" style={{ width: 'auto', padding: '6px 28px 6px 10px' }}
              value={settings.pageSize} onChange={e => setSettings({ ...settings, pageSize: e.target.value })}>
              <option>A4</option><option>A3</option><option>Letter</option><option>Legal</option>
            </select>
          </div>
          <div className="setting-row">
            <span className="setting-label">Orientation</span>
            <select className="select" style={{ width: 'auto', padding: '6px 28px 6px 10px' }}
              value={settings.orientation} onChange={e => setSettings({ ...settings, orientation: e.target.value })}>
              <option>Portrait</option><option>Landscape</option>
            </select>
          </div>
          <div className="setting-row">
            <span className="setting-label">Margins</span>
            <select className="select" style={{ width: 'auto', padding: '6px 28px 6px 10px' }}
              value={settings.margin} onChange={e => setSettings({ ...settings, margin: e.target.value })}>
              <option>Normal</option><option>Narrow</option><option>Wide</option>
            </select>
          </div>
          <div className="setting-row">
            <span className="setting-label">Font</span>
            <select className="select" style={{ width: 'auto', padding: '6px 28px 6px 10px' }}
              value={settings.font} onChange={e => setSettings({ ...settings, font: e.target.value })}>
              <option>Inter</option><option>Times New Roman</option><option>Arial</option><option>Courier New</option>
            </select>
          </div>
        </div>
      )}

      <div className="editor-toolbar">
        <button className="toolbar-btn"><Bold size={16} /></button>
        <button className="toolbar-btn"><Italic size={16} /></button>
        <button className="toolbar-btn"><Underline size={16} /></button>
        <div className="toolbar-divider" />
        <button className="toolbar-btn active"><AlignLeft size={16} /></button>
        <button className="toolbar-btn"><AlignCenter size={16} /></button>
        <button className="toolbar-btn"><AlignRight size={16} /></button>
        <div className="toolbar-divider" />
        <button className="toolbar-btn"><List size={16} /></button>
        <button className="toolbar-btn"><ListOrdered size={16} /></button>
        <div className="toolbar-divider" />
        <button className="toolbar-btn"><Type size={16} /></button>
      </div>

      <div className="editor-area" contentEditable suppressContentEditableWarning
        style={{ fontFamily: settings.font }}
        onInput={e => setContent(e.currentTarget.textContent)}>
        {content}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button className="btn btn-secondary" style={{ flex: 1 }}><Save size={16} /> Save</button>
        <button className="btn btn-primary" style={{ flex: 1 }}><Eye size={16} /> Preview & Print</button>
      </div>
    </div>
  )
}
