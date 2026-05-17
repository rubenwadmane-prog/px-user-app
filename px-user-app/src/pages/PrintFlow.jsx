import { useState, useEffect } from 'react'
import { QrCode, Printer, CheckCircle, CreditCard, Loader, FileText, Settings } from 'lucide-react'

const steps = [
  { id: 1, icon: QrCode, label: 'Scan Kiosk QR', desc: 'Point your camera at the kiosk' },
  { id: 2, icon: Settings, label: 'Print Settings', desc: 'B&W / Color, copies, sides' },
  { id: 3, icon: CreditCard, label: 'Pay via UPI', desc: 'Razorpay secure payment' },
  { id: 4, icon: Printer, label: 'Printing', desc: 'Your document is printing' },
  { id: 5, icon: CheckCircle, label: 'Done!', desc: 'Collect your prints' },
]

export default function PrintFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [settings, setSettings] = useState({ color: false, copies: 1, sides: 'single', pages: 48 })

  const pricePerPage = settings.color ? 5 : 2
  const totalPages = settings.pages * settings.copies * (settings.sides === 'double' ? 1 : 1)
  const total = totalPages * pricePerPage

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  return (
    <div>
      <div className="top-bar">
        <h1>Print 🖨️</h1>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 24 }}>
        {steps.map((step, i) => (
          <div key={step.id}>
            <div className="status-step">
              <div className={`status-dot ${i < currentStep ? 'done' : i === currentStep ? 'active' : 'pending'}`}>
                <step.icon size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: i <= currentStep ? 'var(--text)' : 'var(--text-muted)' }}>{step.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{step.desc}</div>
              </div>
              {i < currentStep && <span className="badge badge-success" style={{ marginLeft: 'auto' }}>Done</span>}
            </div>
            {i < steps.length - 1 && <div className="status-line" />}
          </div>
        ))}
      </div>

      {/* Step 0: Scan QR */}
      {currentStep === 0 && (
        <div className="card" style={{ textAlign: 'center' }}>
          <QrCode size={80} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ marginBottom: 4 }}>Scan Kiosk QR Code</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>
            Point your camera at the QR code on the PX Kiosk machine
          </p>
          <button className="btn btn-primary btn-full btn-lg" onClick={handleNext}>
            <QrCode size={18} /> Simulate Scan
          </button>
        </div>
      )}

      {/* Step 1: Print Settings */}
      {currentStep === 1 && (
        <div className="card">
          <div className="card-title">Print Settings</div>
          <div className="toggle-wrap">
            <span>Color Printing</span>
            <div className={`toggle ${settings.color ? 'active' : ''}`}
              onClick={() => setSettings({ ...settings, color: !settings.color })} />
          </div>
          <div className="setting-row">
            <span className="setting-label">Copies</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="btn btn-sm btn-outline"
                onClick={() => setSettings({ ...settings, copies: Math.max(1, settings.copies - 1) })}>−</button>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', minWidth: 24, textAlign: 'center' }}>{settings.copies}</span>
              <button className="btn btn-sm btn-outline"
                onClick={() => setSettings({ ...settings, copies: settings.copies + 1 })}>+</button>
            </div>
          </div>
          <div className="setting-row">
            <span className="setting-label">Sides</span>
            <div className="tabs" style={{ margin: 0, width: 'auto' }}>
              <button className={`tab ${settings.sides === 'single' ? 'active' : ''}`}
                onClick={() => setSettings({ ...settings, sides: 'single' })}>Single</button>
              <button className={`tab ${settings.sides === 'double' ? 'active' : ''}`}
                onClick={() => setSettings({ ...settings, sides: 'double' })}>Double</button>
            </div>
          </div>

          <div className="price-card">
            <div className="price-label">Total Price</div>
            <div className="price-amount">₹ {total}</div>
            <div className="price-breakdown">{totalPages} pages × ₹{pricePerPage}/{settings.color ? 'color' : 'B&W'} page</div>
          </div>

          <button className="btn btn-primary btn-full btn-lg" onClick={handleNext}>
            <CreditCard size={18} /> Pay ₹{total}
          </button>
        </div>
      )}

      {/* Step 2: Payment */}
      {currentStep === 2 && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>💳</div>
          <h3>Processing Payment</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '8px 0 20px' }}>
            Razorpay UPI payment of ₹{total}
          </p>
          <div className="progress-bar" style={{ marginBottom: 20 }}>
            <div className="progress-fill" style={{ width: '100%', animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%' }}></div>
          </div>
          <button className="btn btn-success btn-full btn-lg" onClick={handleNext}>
            <CheckCircle size={18} /> Payment Successful
          </button>
        </div>
      )}

      {/* Step 3: Printing */}
      {currentStep === 3 && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🖨️</div>
          <h3>Printing in Progress</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '8px 0 20px' }}>
            Your documents are being printed
          </p>
          <div className="progress-bar" style={{ marginBottom: 12 }}>
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>36 / 48 pages printed</p>
          <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 20 }} onClick={handleNext}>
            Complete
          </button>
        </div>
      )}

      {/* Step 4: Done */}
      {currentStep === 4 && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>🎉</div>
          <h3 style={{ fontSize: '1.2rem' }}>Print Complete!</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '8px 0' }}>
            Collect your documents from the kiosk tray
          </p>
          <div className="card" style={{ margin: '20px 0', background: 'var(--bg-secondary)' }}>
            <div className="setting-row"><span>Pages</span><span style={{ fontWeight: 700 }}>{totalPages}</span></div>
            <div className="setting-row"><span>Amount</span><span style={{ fontWeight: 700, color: 'var(--accent)' }}>₹{total}</span></div>
          </div>
          <button className="btn btn-primary btn-full btn-lg" onClick={() => setCurrentStep(0)}>
            Print More
          </button>
        </div>
      )}
    </div>
  )
}
