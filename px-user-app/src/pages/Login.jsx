import { useState } from 'react'
import { LogIn, ChevronRight } from 'lucide-react'

export default function Login({ onLogin }) {
  const [step, setStep] = useState('login') // login | setup
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '', branch: '', rollNo: '' })

  const handleLogin = (e) => {
    e.preventDefault()
    if (form.name && form.email) setStep('setup')
  }

  const handleSetup = (e) => {
    e.preventDefault()
    onLogin({ ...form, initials: form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) })
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
          <form onSubmit={handleLogin}>
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
