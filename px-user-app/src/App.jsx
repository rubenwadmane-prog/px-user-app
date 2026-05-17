import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Library from './pages/Library.jsx'
import Converter from './pages/Converter.jsx'
import Editor from './pages/Editor.jsx'
import AIWriter from './pages/AIWriter.jsx'
import Presets from './pages/Presets.jsx'
import PrintFlow from './pages/PrintFlow.jsx'
import History from './pages/History.jsx'

export default function App() {
  const [user, setUser] = useState(null)

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />
  }

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={() => setUser(null)}>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/library" element={<Library />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/ai-writer" element={<AIWriter />} />
          <Route path="/presets" element={<Presets user={user} />} />
          <Route path="/print" element={<PrintFlow />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
