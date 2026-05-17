import { useState } from 'react'
import { LogIn, ChevronRight } from 'lucide-react'
import { auth, googleProvider } from '../firebase.js'
import { signInWithPopup } from 'firebase/auth'

export default function Login({ onLogin }) {
  const [step, setStep] = useState('login') // login | setup
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '', branch: '', rollNo: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      setForm({
        ...form,
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        uid: user.uid,
      })
      setStep('setup')
    } catch (err) {
      console.error(err)
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.')
      } else {
        setError('Google sign-in failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEmailLogin = (e) => {
    e.preventDefault()
    if (form.name && form.email) setStep('setup')
  }

  const handleSetup = (e) => {
    e.preventDefault()
    onLogin({
      ...form,
      initials: form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    })
  }

  return (
    <div className="login-page">
      <div className="login-logo">
        <h1>P<span>X</span> Print</h1>
        <p>Campus printing, simplified</p>
      </div>

      {step === 'login' ? (
        <div className="login-card">
          <h2>Welcome back 👋</h2>

          {/* Google Sign-In Button */}
          <button className="btn-google" onClick={handleGoogleLogin} disabled={loading}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <div className="login-divider">
            <span>or sign in with email</span>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleEmailLogin}>
            <div className="input-group">
              <label>Full Name</label>
              <input className="input" placeholder="Ruben Wadmane" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input className="input" type="email" placeholder="you@college.edu" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input className="input" type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg">
              Continue <ChevronRight size={18} />
            </button>
          </form>
          <div className="login-footer">
            Don't have an account? <a href="#">Sign up</a>
          </div>
        </div>
      ) : (
        <div className="login-card">
          <h2>Set up your profile 🎓</h2>
          {form.photoURL && (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <img src={form.photoURL} alt="Profile" style={{
                width: 64, height: 64, borderRadius: '50%',
                border: '3px solid var(--primary-light)', objectFit: 'cover'
              }} />
              <p style={{ fontWeight: 600, marginTop: 8 }}>{form.name}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{form.email}</p>
            </div>
          )}
          <form onSubmit={handleSetup}>
            <div className="input-group">
              <label>College</label>
              <select className="input select" value={form.college}
                onChange={e => setForm({ ...form, college: e.target.value })} required>
                <option value="">Select your college</option>
                <option>AISSMS IOIT, Pune</option>
                <option>COEP, Pune</option>
                <option>PICT, Pune</option>
                <option>VIT, Pune</option>
                <option>MIT WPU, Pune</option>
                <option>Other</option>
              </select>
            </div>
            <div className="input-group">
              <label>Branch</label>
              <select className="input select" value={form.branch}
                onChange={e => setForm({ ...form, branch: e.target.value })} required>
                <option value="">Select your branch</option>
                <option>Computer Engineering</option>
                <option>IT Engineering</option>
                <option>AI & DS</option>
                <option>Electronics & Telecom</option>
                <option>Mechanical Engineering</option>
                <option>Civil Engineering</option>
              </select>
            </div>
            <div className="input-group">
              <label>Roll Number</label>
              <input className="input" placeholder="e.g. 31345" value={form.rollNo}
                onChange={e => setForm({ ...form, rollNo: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg">
              <LogIn size={18} /> Get Started
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
