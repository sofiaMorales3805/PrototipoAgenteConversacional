import { useState, useRef, useEffect } from 'react'

type Screen = 'login' | 'app'
type NavId = 'dashboard' | 'agente' | 'base' | 'historial' | 'metricas' | 'admin'

// ─── Shared nav items ─────────────────────────────────────────────────────────
const NAV_ITEMS: { id: NavId; label: string; icon: (a: boolean) => JSX.Element }[] = [
  { id: 'dashboard', label: 'Dashboard',                  icon: a => <IcGrid a={a} /> },
  { id: 'agente',    label: 'Agente Conversacional',      icon: a => <IcChat a={a} /> },
  { id: 'base',      label: 'Base de Conocimiento',       icon: a => <IcBook a={a} /> },
  { id: 'historial', label: 'Historial de Consultas',     icon: a => <IcClock a={a} /> },
  { id: 'metricas',  label: 'Métricas y Reportes',        icon: a => <IcChart a={a} /> },
  { id: 'admin',     label: 'Administración de Usuarios', icon: a => <IcUsers a={a} /> },
]

// ─── Icons ───────────────────────────────────────────────────────────────────
function IcGrid({ a }: { a: boolean }) {
  const c = a ? '#60a5fa' : '#94a3b8'
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.4"/></svg>
}
function IcChat({ a }: { a: boolean }) {
  const c = a ? '#60a5fa' : '#94a3b8'
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v6A1.5 1.5 0 0112.5 11H8.5l-2.5 3v-3H3.5A1.5 1.5 0 012 9.5v-6z" stroke={c} strokeWidth="1.4"/></svg>
}
function IcBook({ a }: { a: boolean }) {
  const c = a ? '#60a5fa' : '#94a3b8'
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3h4a2 2 0 012 2v8a2 2 0 00-2-2H3V3z" stroke={c} strokeWidth="1.4"/><path d="M13 3H9a2 2 0 00-2 2v8a2 2 0 012-2h4V3z" stroke={c} strokeWidth="1.4"/></svg>
}
function IcClock({ a }: { a: boolean }) {
  const c = a ? '#60a5fa' : '#94a3b8'
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={c} strokeWidth="1.4"/><path d="M8 4.5v4l2.5 1.5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>
}
function IcChart({ a }: { a: boolean }) {
  const c = a ? '#60a5fa' : '#94a3b8'
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="8.5" width="3" height="6" rx="1" stroke={c} strokeWidth="1.3"/><rect x="6.5" y="4.5" width="3" height="10" rx="1" stroke={c} strokeWidth="1.3"/><rect x="11.5" y="1.5" width="3" height="13" rx="1" stroke={c} strokeWidth="1.3"/></svg>
}
function IcUsers({ a }: { a: boolean }) {
  const c = a ? '#60a5fa' : '#94a3b8'
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="4.5" r="2.5" stroke={c} strokeWidth="1.3"/><path d="M1 13.5C1 11 3.5 9 6 9" stroke={c} strokeWidth="1.3" strokeLinecap="round"/><circle cx="11.5" cy="5.5" r="2" stroke={c} strokeWidth="1.3"/><path d="M10 10.5c.4-.3 1-.5 1.5-.5 2 0 3.5 1.5 3.5 3.5" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, onChange, onLogout, onClose }: { active: NavId; onChange: (id: NavId) => void; onLogout: () => void; onClose?: () => void }) {
  return (
    <aside className="flex flex-col w-56 flex-shrink-0 h-full" style={{ background: 'linear-gradient(180deg,#0c1b3a 0%,#0f2044 100%)' }}>
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        {onClose && (
          <button type="button" onClick={onClose} className="md:hidden mr-1 p-1 rounded-lg hover:bg-white/10 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3l12 12M15 3L3 15" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        )}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(37,99,235,0.25)', border: '1px solid rgba(37,99,235,0.4)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="3" fill="#60a5fa"/>
            <circle cx="10" cy="4"  r="1.5" fill="#60a5fa" fillOpacity=".6"/>
            <circle cx="10" cy="16" r="1.5" fill="#60a5fa" fillOpacity=".6"/>
            <circle cx="4"  cy="10" r="1.5" fill="#60a5fa" fillOpacity=".6"/>
            <circle cx="16" cy="10" r="1.5" fill="#60a5fa" fillOpacity=".6"/>
            <circle cx="5.5" cy="5.5" r="1.2" fill="#be185d" fillOpacity=".7"/>
            <circle cx="14.5" cy="5.5" r="1.2" fill="#be185d" fillOpacity=".7"/>
            <line x1="10" y1="7" x2="10" y2="4" stroke="#60a5fa" strokeWidth="1" strokeOpacity=".5"/>
            <line x1="10" y1="13" x2="10" y2="16" stroke="#60a5fa" strokeWidth="1" strokeOpacity=".5"/>
            <line x1="7" y1="10" x2="4" y2="10" stroke="#60a5fa" strokeWidth="1" strokeOpacity=".5"/>
            <line x1="13" y1="10" x2="16" y2="10" stroke="#60a5fa" strokeWidth="1" strokeOpacity=".5"/>
          </svg>
        </div>
        <div>
          <p className="text-white text-sm font-bold leading-tight">ACT</p>
          <p className="text-xs leading-tight" style={{ color: '#7c98c8' }}>Agente Conversacional</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon }) => {
          const isActive = active === id
          return (
            <button key={id} onClick={() => { onChange(id); onClose?.() }} type="button"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150"
              style={{ background: isActive ? 'rgba(37,99,235,0.18)' : 'transparent', borderLeft: isActive ? '2.5px solid #3b82f6' : '2.5px solid transparent' }}>
              {icon(isActive)}
              <span className="text-sm font-medium leading-tight" style={{ color: isActive ? '#e2eaff' : '#94a3b8' }}>{label}</span>
            </button>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#2563eb,#be185d)' }}>JM</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Jenny Morales</p>
            <p className="text-xs truncate" style={{ color: '#64748b' }}>ID: Admin_JM01</p>
          </div>
        </div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#3b82f6', letterSpacing: '0.1em' }}>Administrador</p>
        <button onClick={onLogout} type="button"
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors hover:bg-white/5" style={{ color: '#64748b' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2H2.5A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H5" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/><path d="M9 4.5L12 7l-3 2.5M12 7H5.5" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

// ─── Top bar ──────────────────────────────────────────────────────────────────
function TopBar({ title, subtitle, onMenuClick }: { title: string; subtitle?: string; onMenuClick?: () => void }) {
  return (
    <header className="flex items-center justify-between px-4 md:px-7 py-3 md:py-4 flex-shrink-0 bg-white" style={{ borderBottom: '1px solid #e2e8f4', boxShadow: '0 1px 4px rgba(15,32,68,0.04)' }}>
      <div className="flex items-center gap-3 min-w-0">
        <button type="button" onClick={onMenuClick} className="md:hidden p-2 rounded-lg hover:bg-slate-50 transition-colors flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h14M2 9h14M2 14h14" stroke="#0f2044" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <div className="min-w-0">
          <h1 className="text-base md:text-xl font-bold tracking-tight truncate" style={{ color: '#0f2044' }}>{title}</h1>
          {subtitle && <p className="text-xs mt-0.5 hidden md:block" style={{ color: '#94a3b8' }}>{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-5">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
          <span className="text-xs font-semibold" style={{ color: '#065f46' }}>Conectado</span>
        </div>
        <button type="button" className="relative p-2 rounded-lg hover:bg-slate-50 transition-colors">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 015 5v3l1.5 2.5H2.5L4 10V7a5 5 0 015-5z" stroke="#64748b" strokeWidth="1.3"/><path d="M7 15a2 2 0 004 0" stroke="#64748b" strokeWidth="1.3"/></svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-600"/>
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#2563eb,#be185d)' }}>JM</div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold leading-tight" style={{ color: '#0f2044' }}>Jenny Morales</p>
            <p className="text-xs leading-tight" style={{ color: '#94a3b8' }}>ID: Admin_JM01</p>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── Network background (login only) ─────────────────────────────────────────
function NetworkBg() {
  const nodes = [
    {x:80,y:120,r:4},{x:200,y:60,r:3},{x:340,y:150,r:5},{x:480,y:80,r:3},{x:600,y:180,r:4},
    {x:720,y:50,r:3},{x:850,y:130,r:5},{x:980,y:70,r:3},{x:1100,y:160,r:4},{x:1220,y:90,r:3},
    {x:60,y:300,r:3},{x:180,y:380,r:4},{x:320,y:320,r:3},{x:460,y:420,r:5},{x:580,y:340,r:3},
    {x:700,y:480,r:4},{x:840,y:360,r:3},{x:960,y:450,r:5},{x:1080,y:320,r:3},{x:1200,y:400,r:4},
    {x:100,y:550,r:4},{x:250,y:600,r:3},{x:400,y:560,r:5},{x:530,y:650,r:3},{x:670,y:580,r:4},
  ]
  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],
    [0,10],[1,11],[2,12],[3,13],[4,14],[5,15],[6,16],[7,17],[8,18],
    [10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],
    [10,20],[11,21],[12,22],[13,23],[14,24],[2,11],[4,15],[7,17],
  ]
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8eef8"/><stop offset="100%" stopColor="#e4ecf7"/>
        </linearGradient>
        <radialGradient id="gw" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity=".07"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#bgG)"/>
      <rect width="1440" height="900" fill="url(#gw)"/>
      {edges.map(([a,b],i) => { const na=nodes[a],nb=nodes[b]; if(!na||!nb) return null; return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="#94afd4" strokeWidth=".7" strokeOpacity=".3"/> })}
      {nodes.map((n,i) => <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={i%7===0?'#be185d':'#2563eb'} fillOpacity={i%7===0?.4:.27}/>)}
    </svg>
  )
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState('jennyMorales@miumg.edu.gt')
  const [pass, setPass] = useState('Telco2026*')
  const [loading, setLoading] = useState(false)
  const [uF, setUF] = useState(false)
  const [pF, setPF] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    setTimeout(() => { setLoading(false); onLogin() }, 1100)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <NetworkBg/>
      <header className="relative z-10 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="block w-2 h-2 rounded-full bg-blue-600"/>
            <span className="block w-1.5 h-1.5 rounded-full bg-pink-700 opacity-80"/>
            <span className="block w-1 h-1 rounded-full bg-blue-400 opacity-60"/>
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color:'#0f2044', letterSpacing:'0.14em' }}>Portal Corporativo</span>
        </div>
        <span className="text-xs" style={{ color:'#64748b' }}>Acceso restringido — uso interno</span>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow:'0 4px 6px -1px rgba(15,32,68,0.06),0 20px 48px -8px rgba(15,32,68,0.14)' }}>
            <div className="h-1 w-full" style={{ background:'linear-gradient(90deg,#0f2044 0%,#2563eb 55%,#be185d 100%)' }}/>
            <div className="px-6 sm:px-10 pt-8 sm:pt-9 pb-8 sm:pb-10">
              <div className="flex flex-col items-center text-center mb-8">
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <rect width="52" height="52" rx="14" fill="#EEF4FF"/>
                  <circle cx="26" cy="26" r="7" fill="none" stroke="#2563eb" strokeWidth="2"/>
                  <circle cx="26" cy="26" r="2.5" fill="#2563eb"/>
                  <circle cx="26" cy="13" r="2.5" fill="#2563eb" fillOpacity=".7"/>
                  <circle cx="26" cy="39" r="2.5" fill="#2563eb" fillOpacity=".7"/>
                  <circle cx="13" cy="26" r="2.5" fill="#2563eb" fillOpacity=".7"/>
                  <circle cx="39" cy="26" r="2.5" fill="#2563eb" fillOpacity=".7"/>
                  <circle cx="17" cy="17" r="2" fill="#be185d" fillOpacity=".8"/>
                  <circle cx="35" cy="17" r="2" fill="#be185d" fillOpacity=".8"/>
                  <line x1="26" y1="19" x2="26" y2="13" stroke="#2563eb" strokeWidth="1.2" strokeOpacity=".5"/>
                  <line x1="26" y1="33" x2="26" y2="39" stroke="#2563eb" strokeWidth="1.2" strokeOpacity=".5"/>
                  <line x1="19" y1="26" x2="13" y2="26" stroke="#2563eb" strokeWidth="1.2" strokeOpacity=".5"/>
                  <line x1="33" y1="26" x2="39" y2="26" stroke="#2563eb" strokeWidth="1.2" strokeOpacity=".5"/>
                  <line x1="21.2" y1="21.2" x2="17" y2="17" stroke="#be185d" strokeWidth="1.2" strokeOpacity=".45"/>
                  <line x1="30.8" y1="21.2" x2="35" y2="17" stroke="#be185d" strokeWidth="1.2" strokeOpacity=".45"/>
                </svg>
                <h1 className="mt-5 text-2xl font-bold tracking-tight" style={{ color:'#0f2044' }}>Agente Conversacional Técnico</h1>
                <p className="mt-2 text-sm leading-relaxed max-w-xs" style={{ color:'#64748b' }}>Sistema interno para consulta y gestión de errores operativos de contratación</p>
              </div>
              <div className="mb-7 flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background:'#e8eef8' }}/>
                <span className="text-xs font-medium tracking-wider uppercase" style={{ color:'#94a3b8' }}>Autenticación</span>
                <div className="flex-1 h-px" style={{ background:'#e8eef8' }}/>
              </div>
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase" style={{ color:'#334155', letterSpacing:'0.06em' }}>Usuario o correo interno</label>
                  <div className="flex items-center gap-2.5 rounded-lg px-3.5 py-3 transition-all duration-150"
                    style={{ border:`1.5px solid ${uF?'#2563eb':'#dde5f0'}`, background:uF?'#f8faff':'#fafbfd', boxShadow:uF?'0 0 0 3px rgba(37,99,235,0.08)':'none' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke={uF?'#2563eb':'#94a3b8'} strokeWidth="1.3"/><path d="M2.5 13.5C2.5 11 5 9 8 9s5.5 2 5.5 4.5" stroke={uF?'#2563eb':'#94a3b8'} strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <input type="text" placeholder="soporte_id o usuario@empresa.com" value={user} onChange={e=>setUser(e.target.value)} onFocus={()=>setUF(true)} onBlur={()=>setUF(false)} className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-300" style={{ color:'#1e293b' }} autoComplete="username"/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase" style={{ color:'#334155', letterSpacing:'0.06em' }}>Contraseña</label>
                  <div className="flex items-center gap-2.5 rounded-lg px-3.5 py-3 transition-all duration-150"
                    style={{ border:`1.5px solid ${pF?'#2563eb':'#dde5f0'}`, background:pF?'#f8faff':'#fafbfd', boxShadow:pF?'0 0 0 3px rgba(37,99,235,0.08)':'none' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="2" stroke={pF?'#2563eb':'#94a3b8'} strokeWidth="1.3"/><path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke={pF?'#2563eb':'#94a3b8'} strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="10.5" r="1" fill={pF?'#2563eb':'#94a3b8'}/></svg>
                    <input type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onFocus={()=>setPF(true)} onBlur={()=>setPF(false)} className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-300" style={{ color:'#1e293b' }} autoComplete="current-password"/>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-lg px-3.5 py-3" style={{ background:'#f0f4ff', border:'1px solid #dde5f7' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0"><circle cx="7" cy="7" r="6" stroke="#2563eb" strokeWidth="1.2"/><rect x="6.3" y="6" width="1.4" height="4.5" rx=".7" fill="#2563eb"/><rect x="6.3" y="3.5" width="1.4" height="1.4" rx=".7" fill="#2563eb"/></svg>
                  <p className="text-xs leading-relaxed" style={{ color:'#3b5bdb' }}>Esta sesión se registrará con fines de auditoría y trazabilidad de acceso.</p>
                </div>
                {/* Demo credentials hint */}
                <div className="rounded-lg px-3.5 py-2.5" style={{ background:'#fafbfd', border:'1px dashed #dde5f0' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color:'#94a3b8' }}>Credenciales de acceso</p>
                  <div className="space-y-0.5">
                    <p className="text-xs font-mono" style={{ color:'#475569' }}>Usuario: <span className="font-semibold" style={{ color:'#2563eb' }}>jennyMorales@miumg.edu.gt</span></p>
                    <p className="text-xs font-mono" style={{ color:'#475569' }}>Contraseña: <span className="font-semibold" style={{ color:'#2563eb' }}>Telco2026*</span></p>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-all duration-200"
                  style={{ background:loading?'#4b6cb7':'linear-gradient(135deg,#0f2044 0%,#1d4ed8 60%,#2563eb 100%)', boxShadow:loading?'none':'0 4px 14px rgba(37,99,235,0.35)', cursor:loading?'not-allowed':'pointer' }}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/><path d="M8 1.5A6.5 6.5 0 0114.5 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      Verificando…
                    </span>
                  ) : 'Iniciar sesión'}
                </button>
              </form>
              <p className="mt-5 text-center text-xs" style={{ color:'#94a3b8' }}>
                ¿Problemas de acceso?{' '}
                <button type="button" className="font-medium hover:underline" style={{ color:'#2563eb' }}>Contactar soporte TI</button>
              </p>
            </div>
            <div className="px-10 py-4 flex items-center justify-between" style={{ background:'#f8fafd', borderTop:'1px solid #e8eef8' }}>
              <span className="text-xs" style={{ color:'#94a3b8' }}>v2.4.1 — Entorno corporativo</span>
              <div className="flex items-center gap-1.5">
                <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400"/>
                <span className="text-xs" style={{ color:'#94a3b8' }}>Sistema operativo</span>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-xs" style={{ color:'#94a3b8' }}>
            Acceso autorizado únicamente para personal interno.<br/>© 2026 — Dirección de Infraestructura y Operaciones Digitales
          </p>
        </div>
      </main>

      <footer className="relative z-10 flex items-center justify-between px-8 py-2.5" style={{ background:'rgba(15,32,68,0.96)' }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5"><span className="block w-1.5 h-1.5 rounded-full bg-emerald-400"/><span className="text-xs text-slate-300">Conexión segura — TLS 1.3</span></div>
          <div className="w-px h-3 bg-slate-600"/>
          <span className="text-xs text-slate-400">Red corporativa interna</span>
        </div>
        <div className="flex items-center gap-3">
          {['Soporte','Política de privacidad','Términos de uso'].map(l => <button key={l} type="button" className="text-xs text-slate-400 hover:text-slate-200 transition-colors">{l}</button>)}
        </div>
      </footer>
    </div>
  )
}

// ─── KPI data ─────────────────────────────────────────────────────────────────
const KPI_DATA = [
  { label:'Consultas realizadas', value:'1,247', delta:'+12% esta semana', up:true, color:'#2563eb',
    icon:<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="#2563eb" strokeWidth="1.4"/><path d="M6 9h6M9 6v6" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { label:'Casos resueltos', value:'892', delta:'94% efectividad', up:true, color:'#059669',
    icon:<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="#059669" strokeWidth="1.4"/><path d="M5.5 9.5l2.5 2.5 5-5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label:'Escalaciones', value:'156', delta:'−4% vs mes anterior', up:false, color:'#be185d',
    icon:<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l2.5 5h5l-4 3.5 1.5 5.5L9 13l-5 3 1.5-5.5L1.5 7h5L9 2z" stroke="#be185d" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
  { label:'Respuestas útiles', value:'89%', delta:'+1.2% satisfacción', up:true, color:'#7c3aed',
    icon:<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 13V6a2 2 0 012-2h10a2 2 0 012 2v7l-3-2H4a2 2 0 01-2-2z" stroke="#7c3aed" strokeWidth="1.4"/><path d="M6 8h6M6 11h4" stroke="#7c3aed" strokeWidth="1.3" strokeLinecap="round"/></svg> },
]

type StatusType = 'Resuelto' | 'Escalado L2' | 'En proceso' | 'Pendiente'
const STATUS_STYLES: Record<StatusType,{bg:string;text:string;dot:string}> = {
  'Resuelto':    {bg:'#ecfdf5',text:'#065f46',dot:'#10b981'},
  'Escalado L2': {bg:'#fff7ed',text:'#92400e',dot:'#f59e0b'},
  'En proceso':  {bg:'#eff6ff',text:'#1e40af',dot:'#3b82f6'},
  'Pendiente':   {bg:'#fdf2f8',text:'#831843',dot:'#be185d'},
}
function StatusPill({ s }: { s: StatusType }) {
  const st = STATUS_STYLES[s]
  return <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background:st.bg,color:st.text }}><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:st.dot }}/>{s}</span>
}

const TABLE_ROWS: {fecha:string;usuario:string;consulta:string;error:string;estado:StatusType}[] = [
  {fecha:'Hace 2 mins', usuario:'Elena Gómez',       consulta:'Falla en aprovisionamiento CRM',      error:'ERR-CONTR-001', estado:'Resuelto'},
  {fecha:'Hace 15 mins',usuario:'Soporte_402 (Tú)',  consulta:'Reenvío de orden detenida',           error:'ERR-CONTR-003', estado:'Resuelto'},
  {fecha:'Hace 1 hora', usuario:'Pedro Pascal',      consulta:'Error validación de cédula',          error:'ERR-CONTR-002', estado:'Escalado L2'},
  {fecha:'Hace 2 horas',usuario:'Ana María Herrera', consulta:'Rechazo flujo de aprovisionamiento',  error:'ERR-CONTR-004', estado:'Resuelto'},
  {fecha:'Hace 4 horas',usuario:'Roberto Díaz',      consulta:'Inconsistencia de datos titular',     error:'ERR-CONTR-001', estado:'En proceso'},
  {fecha:'Hace 5 horas',usuario:'Carmen López',      consulta:'Timeout en activación de línea',      error:'ERR-CONTR-007', estado:'Pendiente'},
  {fecha:'Ayer, 16:42', usuario:'Luis Martínez',     consulta:'Duplicado de contrato detectado',     error:'ERR-CONTR-005', estado:'Escalado L2'},
]

// ─── Dashboard ────────────────────────────────────────────────────────────────
function DashboardView() {
  const [hoverRow, setHoverRow] = useState<number|null>(null)
  return (
    <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color:'#64748b', letterSpacing:'0.1em' }}>Accesos Rápidos Operativos</h2>
        <div className="flex items-center gap-3">
          <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 active:scale-95 transition-all"
            style={{ background:'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow:'0 2px 10px rgba(37,99,235,0.28)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
            Nueva consulta
          </button>
          {['Registrar error','Ver reportes'].map(l => (
            <button key={l} type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 active:scale-95 transition-all"
              style={{ background:'white', border:'1.5px solid #e2e8f4', color:'#334155' }}>{l}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPI_DATA.map((k,i) => (
          <div key={i} className="bg-white rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow" style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.05)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color:'#64748b' }}>{k.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:`${k.color}12` }}>{k.icon}</div>
            </div>
            <span className="text-3xl font-bold tracking-tight" style={{ color:'#0f2044' }}>{k.value}</span>
            <div className="flex items-center gap-1.5">
              {k.up
                ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 9V3M3 6l3-3 3 3" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3v6M3 6l3 3 3-3" stroke="#be185d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              <span className="text-xs font-medium" style={{ color:k.up?'#059669':'#be185d' }}>{k.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl overflow-hidden" style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.05)' }}>
        <div className="flex items-start justify-between px-6 py-4" style={{ borderBottom:'1px solid #f1f5fb' }}>
          <div>
            <h3 className="text-sm font-bold" style={{ color:'#0f2044' }}>Actividad Reciente en el Canal</h3>
            <p className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>Últimas interacciones de soporte técnico sobre contratación</p>
          </div>
          <button type="button" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors" style={{ border:'1px solid #e2e8f4', color:'#64748b' }}>
            Exportar histórico
          </button>
        </div>
        <div className="grid px-6 py-2.5" style={{ gridTemplateColumns:'130px 170px 1fr 120px', borderBottom:'1px solid #f1f5fb', background:'#fafbfd' }}>
          {['Fecha','Usuario','Consulta de Error Técnico','Estado'].map(h => <span key={h} className="text-xs font-semibold uppercase tracking-wider" style={{ color:'#94a3b8', letterSpacing:'0.06em' }}>{h}</span>)}
        </div>
        {TABLE_ROWS.map((row,i) => (
          <div key={i} className="grid px-6 py-3.5 items-center cursor-pointer transition-colors duration-100"
            style={{ gridTemplateColumns:'130px 170px 1fr 120px', borderBottom:i<TABLE_ROWS.length-1?'1px solid #f1f5fb':'none', background:hoverRow===i?'#f8faff':'white' }}
            onMouseEnter={()=>setHoverRow(i)} onMouseLeave={()=>setHoverRow(null)}>
            <span className="text-xs" style={{ color:'#94a3b8' }}>{row.fecha}</span>
            <span className="text-sm font-medium" style={{ color:row.usuario.includes('Tú')?'#2563eb':'#1e293b' }}>{row.usuario}</span>
            <div className="flex items-center gap-2 pr-4">
              <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded" style={{ background:'#f0f4ff', color:'#3b5bdb' }}>{row.error}</span>
              <span className="text-sm" style={{ color:'#334155' }}>— {row.consulta}</span>
            </div>
            <StatusPill s={row.estado}/>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Agente Conversacional ────────────────────────────────────────────────────
type ChatMsg = { role: 'user'|'ai'; text: string; time: string }

const INITIAL_MESSAGES: ChatMsg[] = [
  { role:'user', text:'ERR-CONTR-001 – Orden detenida por inconsistencia de datos', time:'14:32 · Soporte_402' },
]

function AgentView() {
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_MESSAGES)
  const [showResponse, setShowResponse] = useState(true)
  const [input, setInput] = useState('')
  const [querying, setQuerying] = useState(false)
  const [marked, setMarked] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const q = input.trim(); setInput(''); setQuerying(true); setShowResponse(false)
    const now = new Date(); const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')} · Soporte_402`
    setMessages(m => [...m, { role:'user', text:q, time:t }])
    setTimeout(() => { setQuerying(false); setShowResponse(true) }, 1400)
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-4">

          {/* User messages (non-last ones shown as small bubbles) */}
          {messages.slice(0,-1).map((m,i) => (
            <div key={i} className="flex justify-end">
              <div className="max-w-md">
                <div className="rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm font-medium text-white" style={{ background:'linear-gradient(135deg,#1d4ed8,#2563eb)' }}>{m.text}</div>
                <p className="text-right text-xs mt-1" style={{ color:'#94a3b8' }}>{m.time}</p>
              </div>
            </div>
          ))}

          {/* Latest user bubble */}
          {messages.length > 0 && (
            <div className="flex justify-end">
              <div className="max-w-lg">
                <div className="rounded-2xl rounded-tr-sm px-5 py-3 text-sm font-semibold text-white" style={{ background:'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow:'0 2px 10px rgba(37,99,235,0.25)' }}>
                  {messages[messages.length-1].text}
                </div>
                <p className="text-right text-xs mt-1.5" style={{ color:'#94a3b8' }}>{messages[messages.length-1].time}</p>
              </div>
            </div>
          )}

          {/* Querying indicator */}
          {querying && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:'#eff6ff', border:'1.5px solid #bfdbfe' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-pulse"><circle cx="8" cy="8" r="3" fill="#2563eb"/><circle cx="8" cy="3" r="1.5" fill="#2563eb" fillOpacity=".5"/><circle cx="8" cy="13" r="1.5" fill="#2563eb" fillOpacity=".5"/><circle cx="3" cy="8" r="1.5" fill="#2563eb" fillOpacity=".5"/><circle cx="13" cy="8" r="1.5" fill="#2563eb" fillOpacity=".5"/></svg>
              </div>
              <div className="rounded-2xl rounded-tl-sm px-4 py-3" style={{ background:'white', border:'1px solid #e8eef6' }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay:'0ms' }}/>
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay:'150ms' }}/>
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay:'300ms' }}/>
                  <span className="text-xs ml-1" style={{ color:'#94a3b8' }}>Consultando base de conocimiento…</span>
                </div>
              </div>
            </div>
          )}

          {/* AI response card */}
          {showResponse && !querying && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background:'#eff6ff', border:'1.5px solid #bfdbfe' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="#2563eb"/><circle cx="8" cy="3" r="1.5" fill="#2563eb" fillOpacity=".5"/><circle cx="8" cy="13" r="1.5" fill="#2563eb" fillOpacity=".5"/><circle cx="3" cy="8" r="1.5" fill="#2563eb" fillOpacity=".5"/><circle cx="13" cy="8" r="1.5" fill="#2563eb" fillOpacity=".5"/></svg>
              </div>
              <div className="flex-1">
                <div className="rounded-2xl rounded-tl-sm overflow-hidden" style={{ background:'white', border:'1px solid #e8eef6', boxShadow:'0 2px 8px rgba(15,32,68,0.06)' }}>
                  {/* Card header */}
                  <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom:'1px solid #f1f5fb', background:'#fafbfd' }}>
                    <div className="flex items-center gap-2.5">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.8 3.6L14 5.5l-3 2.9.7 4.1L8 10.4l-3.7 2.1.7-4.1L2 5.5l4.2-.9L8 1z" fill="#2563eb" fillOpacity=".9"/></svg>
                      <span className="text-sm font-bold" style={{ color:'#0f2044' }}>Coincidencia Encontrada (94%)</span>
                    </div>
                    <span className="text-xs font-mono font-semibold px-2 py-1 rounded" style={{ background:'#eff6ff', color:'#2563eb' }}>ERR-CONTR-001</span>
                  </div>

                  <div className="px-5 py-4 space-y-4">
                    {/* Causa probable */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'#94a3b8', letterSpacing:'0.08em' }}>Causa Probable</p>
                      <p className="text-sm" style={{ color:'#1e293b' }}>Inconsistencia entre datos del cliente y sistema CRM nacional de telecomunicaciones. El campo de dirección de facturación no coincide con el registro de activación.</p>
                    </div>

                    {/* Validación */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'#94a3b8', letterSpacing:'0.08em' }}>Pasos de Validación</p>
                      <ol className="space-y-1.5">
                        {['Ingrese a la plataforma CRM y localice la orden detenida con el ID de contrato.','Valide los campos de dirección de facturación contra la orden original del cliente.','Verifique el estado del token de activación en el módulo de aprovisionamiento.'].map((s,i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color:'#334155' }}>
                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background:'#eff6ff', color:'#2563eb' }}>{i+1}</span>
                            {s}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Solución */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'#94a3b8', letterSpacing:'0.08em' }}>Pasos de Solución</p>
                      <ol className="space-y-1.5">
                        {['Modifique el estado de la dirección de facturación en el registro del titular (campo: billing_address_status → VALIDATED).','Solicite el reenvío automático del token de activación desde el panel de operaciones.','Monitoree el flujo de aprovisionamiento durante 5 minutos para confirmar la activación.'].map((s,i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color:'#334155' }}>
                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background:'#f0fdf4', color:'#059669' }}>{i+1}</span>
                            {s}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Nivel soporte */}
                    <div className="flex items-center gap-2 pt-1" style={{ borderTop:'1px solid #f1f5fb' }}>
                      <span className="text-xs" style={{ color:'#64748b' }}>Nivel de soporte:</span>
                      <span className="text-xs font-bold" style={{ color:'#2563eb' }}>L1 — Soporte básico</span>
                      <span className="text-xs" style={{ color:'#94a3b8' }}>· Tiempo estimado: 8–12 min</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-3">
                  <button type="button" onClick={()=>setMarked(!marked)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95"
                    style={{ background:marked?'#059669':'linear-gradient(135deg,#1d4ed8,#2563eb)', color:'white', boxShadow:marked?'0 2px 8px rgba(5,150,105,0.3)':'0 2px 8px rgba(37,99,235,0.25)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5l3 3 6-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {marked ? 'Marcado útil' : 'Marcar útil'}
                  </button>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 active:scale-95 transition-all"
                    style={{ background:'white', border:'1.5px solid #e2e8f4', color:'#334155' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l2 4h4l-3.5 3 1.5 4.5L7 10l-4 2.5L4.5 8 1 5h4L7 1z" stroke="#334155" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                    Escalar
                  </button>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 active:scale-95 transition-all"
                    style={{ background:'white', border:'1.5px solid #e2e8f4', color:'#334155' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="2" stroke="#334155" strokeWidth="1.3"/><path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Ver solución completa
                  </button>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div className="px-7 py-4 flex-shrink-0" style={{ borderTop:'1px solid #e2e8f4', background:'white' }}>
          <form onSubmit={handleQuery} className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3" style={{ border:'1.5px solid #dde5f0', background:'#fafbfd' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#94a3b8" strokeWidth="1.3"/><path d="M11 11l3 3" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <input type="text" placeholder="Escriba el código o descripción del error…" value={input} onChange={e=>setInput(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-300" style={{ color:'#1e293b' }}/>
            </div>
            <button type="submit" disabled={querying}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
              style={{ background:querying?'#4b6cb7':'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow:'0 2px 10px rgba(37,99,235,0.3)', cursor:querying?'not-allowed':'pointer' }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7" cy="7" r="3" fill="white"/><circle cx="7" cy="2" r="1.5" fill="white" fillOpacity=".6"/><circle cx="7" cy="12" r="1.5" fill="white" fillOpacity=".6"/><circle cx="2" cy="7" r="1.5" fill="white" fillOpacity=".6"/><circle cx="12" cy="7" r="1.5" fill="white" fillOpacity=".6"/></svg>
              Consultar
            </button>
          </form>
        </div>
      </div>

      {/* Right details panel */}
      <aside className="w-60 flex-shrink-0 flex flex-col" style={{ borderLeft:'1px solid #e2e8f4', background:'#fafbfd' }}>
        <div className="px-5 py-4" style={{ borderBottom:'1px solid #e8eef6' }}>
          <h3 className="text-sm font-bold" style={{ color:'#0f2044' }}>Detalles del Caso Activo</h3>
        </div>
        <div className="px-5 py-5 space-y-5 flex-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'#94a3b8', letterSpacing:'0.08em' }}>Código de Error Consultado</p>
            <span className="text-sm font-bold" style={{ color:'#2563eb' }}>ERR-CONTR-001</span>
          </div>
          <div className="h-px" style={{ background:'#e8eef6' }}/>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'#94a3b8', letterSpacing:'0.08em' }}>Tipo de Solución Sugerida</p>
            <p className="text-sm font-medium" style={{ color:'#1e293b' }}>Aprovisionamiento CRM Manual</p>
          </div>
          <div className="h-px" style={{ background:'#e8eef6' }}/>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'#94a3b8', letterSpacing:'0.08em' }}>Recomendado por IA</p>
            <p className="text-sm leading-relaxed" style={{ color:'#334155' }}>Se detectaron 4 casos idénticos solucionados por L2 en las últimas 24 hrs.</p>
          </div>
          <div className="h-px" style={{ background:'#e8eef6' }}/>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color:'#94a3b8', letterSpacing:'0.08em' }}>Confianza del Modelo</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background:'#e8eef6' }}>
                <div className="h-full rounded-full" style={{ width:'94%', background:'linear-gradient(90deg,#2563eb,#7c3aed)' }}/>
              </div>
              <span className="text-xs font-bold" style={{ color:'#2563eb' }}>94%</span>
            </div>
          </div>
          <div className="h-px" style={{ background:'#e8eef6' }}/>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color:'#94a3b8', letterSpacing:'0.08em' }}>Historial Reciente</p>
            <div className="space-y-1.5">
              {[{c:'ERR-CONTR-003',s:'Resuelto'},{c:'ERR-CONTR-007',s:'En proceso'},{c:'ERR-CONTR-002',s:'Escalado L2'}].map((r,i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-mono" style={{ color:'#64748b' }}>{r.c}</span>
                  <span className="text-xs font-semibold" style={{ color: r.s==='Resuelto'?'#059669': r.s==='Escalado L2'?'#f59e0b':'#3b82f6' }}>{r.s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

// ─── Métricas y Reportes ─────────────────────────────────────────────────────
const MONTHS_DATA = [
  { mes:'Ene', val:312 }, { mes:'Feb', val:278 }, { mes:'Mar', val:415 },
  { mes:'Abr', val:389 }, { mes:'May', val:452 }, { mes:'Jun', val:398 },
  { mes:'Jul', val:501 }, { mes:'Ago', val:467 }, { mes:'Sep', val:423 },
  { mes:'Oct', val:544 }, { mes:'Nov', val:489 }, { mes:'Dic', val:431 },
]

const DONUT_DATA = [
  { label:'ERR-CONTR', val:34, color:'#2563eb' },
  { label:'ERR-PROV',  val:22, color:'#7c3aed' },
  { label:'ERR-ACT',   val:18, color:'#be185d' },
  { label:'ERR-FACT',  val:13, color:'#0891b2' },
  { label:'ERR-PORT',  val:8,  color:'#059669' },
  { label:'Otros',     val:5,  color:'#94a3b8' },
]

const TOP10_DATA = [
  { codigo:'ERR-CONTR-001', desc:'Orden detenida por inconsistencia de datos del titular',    freq:247, ultima:'Hoy, 14:32',      trend:+12 },
  { codigo:'ERR-PROV-003',  desc:'Falla en aprovisionamiento CRM tras cambio de plan',        freq:198, ultima:'Hoy, 11:47',      trend:+5  },
  { codigo:'ERR-ACT-012',   desc:'Timeout en activación de línea móvil post-portabilidad',    freq:164, ultima:'Hoy, 10:03',      trend:-3  },
  { codigo:'ERR-CONTR-002', desc:'Rechazo de flujo por cédula no validada en sistema nacional',freq:141, ultima:'Ayer, 16:58',   trend:+8  },
  { codigo:'ERR-FACT-007',  desc:'Dirección de facturación no coincide con registro CRM',     freq:119, ultima:'Ayer, 15:22',    trend:-7  },
  { codigo:'ERR-CONTR-003', desc:'Reenvío automático de token de activación fallido',          freq:103, ultima:'Ayer, 13:09',   trend:+2  },
  { codigo:'ERR-PORT-007',  desc:'Falla en activación de línea tras portabilidad de operador', freq:89,  ultima:'17 ago, 17:11', trend:-4  },
  { codigo:'ERR-PROV-011',  desc:'Duplicado de contrato detectado en alta de producto adicional',freq:74, ultima:'17 ago, 14:45',trend:+1  },
  { codigo:'ERR-ACT-008',   desc:'Suspensión de línea no ejecutada por error de autorización', freq:61,  ultima:'16 ago, 15:45', trend:-9  },
  { codigo:'ERR-FACT-002',  desc:'Orden de reactivación rechazada por deuda no detectada',     freq:48,  ultima:'16 ago, 13:27', trend:+3  },
]

const TIME_RANGES = ['Últimos 7 días','Últimos 30 días','Últimos 3 meses','Últimos 6 meses','Este año']

function BarChart() {
  const maxVal = Math.max(...MONTHS_DATA.map(d => d.val))
  const chartH = 160
  const barW = 26
  const gap = 18
  const totalW = MONTHS_DATA.length * (barW + gap) - gap

  return (
    <div className="overflow-x-auto">
      <svg width={totalW + 32} height={chartH + 40} className="block mx-auto">
        {/* Y-axis grid lines */}
        {[0,0.25,0.5,0.75,1].map((t,i) => (
          <g key={i}>
            <line x1="0" y1={chartH - t*chartH} x2={totalW+32} y2={chartH - t*chartH}
              stroke="#f1f5fb" strokeWidth="1"/>
            <text x="0" y={chartH - t*chartH - 4} fontSize="9" fill="#94a3b8" textAnchor="start">
              {Math.round(t*maxVal)}
            </text>
          </g>
        ))}

        {MONTHS_DATA.map((d,i) => {
          const x = i * (barW + gap) + 16
          const h = (d.val / maxVal) * chartH
          const isHighest = d.val === maxVal
          return (
            <g key={d.mes}>
              {/* Bar */}
              <rect x={x} y={chartH - h} width={barW} height={h} rx="5"
                fill={isHighest ? 'url(#barAccent)' : 'url(#barDefault)'}/>
              {/* Value label on hover-equivalent: show on max */}
              {isHighest && (
                <text x={x + barW/2} y={chartH - h - 6} fontSize="9" fill="#2563eb" textAnchor="middle" fontWeight="700">
                  {d.val}
                </text>
              )}
              {/* Month label */}
              <text x={x + barW/2} y={chartH + 16} fontSize="10" fill="#94a3b8" textAnchor="middle">{d.mes}</text>
            </g>
          )
        })}

        <defs>
          <linearGradient id="barDefault" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd"/>
            <stop offset="100%" stopColor="#bfdbfe"/>
          </linearGradient>
          <linearGradient id="barAccent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8"/>
            <stop offset="100%" stopColor="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function DonutChart() {
  const total = DONUT_DATA.reduce((s,d) => s + d.val, 0)
  const cx = 90, cy = 90, R = 72, r = 44
  let cumAngle = -Math.PI / 2

  const slices = DONUT_DATA.map(d => {
    const angle = (d.val / total) * 2 * Math.PI
    const startA = cumAngle
    const endA = cumAngle + angle
    cumAngle = endA
    const x1 = cx + R * Math.cos(startA), y1 = cy + R * Math.sin(startA)
    const x2 = cx + R * Math.cos(endA),   y2 = cy + R * Math.sin(endA)
    const ix1 = cx + r * Math.cos(endA),   iy1 = cy + r * Math.sin(endA)
    const ix2 = cx + r * Math.cos(startA), iy2 = cy + r * Math.sin(startA)
    const large = angle > Math.PI ? 1 : 0
    return { ...d, path: `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${r} ${r} 0 ${large} 0 ${ix2} ${iy2} Z` }
  })

  return (
    <div className="flex items-center gap-6">
      <svg width="180" height="180">
        {slices.map((s,i) => (
          <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="2"/>
        ))}
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="22" fontWeight="700" fill="#0f2044">
          {total}%
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#94a3b8">distribución</text>
      </svg>
      <div className="flex flex-col gap-2.5">
        {DONUT_DATA.map(d => (
          <div key={d.label} className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background:d.color }}/>
            <span className="text-xs font-medium" style={{ color:'#334155' }}>{d.label}</span>
            <span className="text-xs font-bold ml-auto pl-4" style={{ color:'#0f2044' }}>{d.val}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MetricasView() {
  const [range, setRange] = useState('Últimos 30 días')
  const [hoverRow, setHoverRow] = useState<number|null>(null)

  const kpis = [
    { label:'Total de consultas', value:'4,098', delta:'+8.4% vs período anterior', up:true,  color:'#2563eb',
      icon:<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h9" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round"/></svg> },
    { label:'Respuestas útiles', value:'89.3%', delta:'+1.2% satisfacción', up:true,  color:'#7c3aed',
      icon:<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 14V8a2 2 0 012-2h10a2 2 0 012 2v6l-3-2H5a2 2 0 01-2-2z" stroke="#7c3aed" strokeWidth="1.5"/><path d="M7 10h6M7 13h4" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    { label:'Casos resueltos', value:'3,241', delta:'79.1% tasa de resolución', up:true,  color:'#059669',
      icon:<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#059669" strokeWidth="1.5"/><path d="M6.5 10.5l2.5 2.5 5-5" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label:'Escalaciones', value:'412', delta:'−4.1% vs mes anterior', up:false, color:'#be185d',
      icon:<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3l2.5 5h5l-4 3.5 1.5 5.5L10 14l-5 3 1.5-5.5L2.5 8h5L10 3z" stroke="#be185d" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
  ]

  return (
    <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-6">

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color:'#94a3b8', letterSpacing:'0.1em' }}>Resumen operativo del período</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Time range selector */}
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-white" style={{ border:'1.5px solid #dde5f0' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2.5" width="12" height="10" rx="2" stroke="#64748b" strokeWidth="1.2"/><path d="M4.5 1v3M9.5 1v3M1 5.5h12" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/></svg>
            <select value={range} onChange={e=>setRange(e.target.value)} className="bg-transparent text-sm font-medium outline-none pr-1" style={{ color:'#334155' }}>
              {TIME_RANGES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <button type="button" className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 active:scale-95 transition-all"
            style={{ background:'white', border:'1.5px solid #e2e8f4', color:'#334155' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v7M4 5.5l3 3 3-3" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.5 10v1.5A1.5 1.5 0 003 13h8a1.5 1.5 0 001.5-1.5V10" stroke="#334155" strokeWidth="1.4" strokeLinecap="round"/></svg>
            Exportar reporte
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k,i) => (
          <div key={i} className="bg-white rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
            style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.05)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color:'#64748b' }}>{k.label}</span>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background:`${k.color}12` }}>{k.icon}</div>
            </div>
            <span className="text-3xl font-bold tracking-tight" style={{ color:'#0f2044' }}>{k.value}</span>
            <div className="flex items-center gap-1.5">
              {k.up
                ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 9V3M3 6l3-3 3 3" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3v6M3 6l3 3 3-3" stroke="#be185d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              <span className="text-xs font-medium" style={{ color:k.up?'#059669':'#be185d' }}>{k.delta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-5 gap-5">

        {/* Bar chart — spans 3 cols */}
        <div className="col-span-3 bg-white rounded-xl overflow-hidden"
          style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.05)' }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom:'1px solid #f1f5fb' }}>
            <div>
              <p className="text-sm font-bold" style={{ color:'#0f2044' }}>Consultas por mes</p>
              <p className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>Volumen mensual de interacciones con el agente IA</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm" style={{ background:'#3b82f6' }}/>
              <span className="text-xs" style={{ color:'#64748b' }}>Consultas totales</span>
              <span className="w-3 h-3 rounded-sm ml-2" style={{ background:'#1d4ed8' }}/>
              <span className="text-xs" style={{ color:'#64748b' }}>Pico máximo</span>
            </div>
          </div>
          <div className="px-5 py-5">
            <BarChart/>
          </div>
        </div>

        {/* Donut chart — spans 2 cols */}
        <div className="col-span-2 bg-white rounded-xl overflow-hidden"
          style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.05)' }}>
          <div className="px-5 py-4" style={{ borderBottom:'1px solid #f1f5fb' }}>
            <p className="text-sm font-bold" style={{ color:'#0f2044' }}>Errores más frecuentes</p>
            <p className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>Distribución por categoría de módulo</p>
          </div>
          <div className="px-5 py-5">
            <DonutChart/>
          </div>
        </div>
      </div>

      {/* Top 10 table */}
      <div className="bg-white rounded-xl overflow-hidden"
        style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.05)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom:'1px solid #f1f5fb' }}>
          <div>
            <p className="text-sm font-bold" style={{ color:'#0f2044' }}>Top 10 errores más consultados</p>
            <p className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>Errores con mayor recurrencia en el período seleccionado · {range}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background:'#eff6ff', color:'#2563eb' }}>
              Actualizado: hoy 14:00
            </span>
          </div>
        </div>

        {/* Col headers */}
        <div className="grid px-6 py-2.5" style={{ gridTemplateColumns:'150px 1fr 110px 160px 90px', borderBottom:'1px solid #f1f5fb', background:'#fafbfd' }}>
          {['Código','Descripción','Frecuencia','Última consulta','Tendencia'].map(h => (
            <span key={h} className="text-xs font-semibold uppercase tracking-wider" style={{ color:'#94a3b8', letterSpacing:'0.06em' }}>{h}</span>
          ))}
        </div>

        {TOP10_DATA.map((row,i) => {
          const freqMax = TOP10_DATA[0].freq
          const barPct = (row.freq / freqMax) * 100
          return (
            <div key={row.codigo}
              className="grid px-6 py-3.5 items-center transition-colors duration-100 cursor-pointer"
              style={{ gridTemplateColumns:'150px 1fr 110px 160px 90px', borderBottom:i<TOP10_DATA.length-1?'1px solid #f1f5fb':'none', background:hoverRow===i?'#f8faff':'white' }}
              onMouseEnter={()=>setHoverRow(i)} onMouseLeave={()=>setHoverRow(null)}>

              {/* Código + rank */}
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: i<3?'#eff6ff':'#f8fafd', color:i<3?'#2563eb':'#94a3b8' }}>{i+1}</span>
                <span className="text-xs font-mono font-semibold" style={{ color:'#2563eb' }}>{row.codigo}</span>
              </div>

              {/* Descripción + barra */}
              <div className="pr-6">
                <p className="text-sm leading-snug mb-1.5" style={{ color:'#334155' }}>{row.desc}</p>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'#e8eef6', width:'80%' }}>
                    <div className="h-full rounded-full" style={{ width:`${barPct}%`, background:'linear-gradient(90deg,#3b82f6,#1d4ed8)' }}/>
                  </div>
                </div>
              </div>

              {/* Frecuencia */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold" style={{ color:'#0f2044' }}>{row.freq}</span>
                <span className="text-xs" style={{ color:'#94a3b8' }}>consultas</span>
              </div>

              {/* Última consulta */}
              <span className="text-sm" style={{ color:'#64748b' }}>{row.ultima}</span>

              {/* Tendencia */}
              <div className="flex items-center gap-1">
                {row.trend > 0
                  ? <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 10V3M3.5 6l3-3 3 3" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 3v7M3.5 7l3 3 3-3" stroke="#be185d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                <span className="text-xs font-semibold" style={{ color:row.trend>0?'#059669':'#be185d' }}>
                  {row.trend>0?'+':''}{row.trend}%
                </span>
              </div>
            </div>
          )
        })}

        {/* Footer */}
        <div className="px-6 py-3.5 flex items-center justify-between" style={{ background:'#fafbfd', borderTop:'1px solid #f1f5fb' }}>
          <span className="text-xs" style={{ color:'#94a3b8' }}>Datos actualizados cada hora · Fuente: motor de consultas ACT v2.4</span>
          <div className="flex items-center gap-3">
            <button type="button" className="text-xs font-medium hover:underline" style={{ color:'#2563eb' }}>Ver reporte completo</button>
            <span style={{ color:'#e2e8f4' }}>·</span>
            <button type="button" className="text-xs font-medium hover:underline" style={{ color:'#2563eb' }}>Exportar CSV</button>
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Historial de Consultas ───────────────────────────────────────────────────
type HistorialRow = {
  id: string; fecha: string; hora: string; usuario: string; rol: string;
  consulta: string; error: string; modulo: string; coincidencia: number; resultado: StatusType
}

const HISTORIAL_DATA: HistorialRow[] = [
  { id:'HC-0241', fecha:'18 ago 2026', hora:'14:32', usuario:'Eduardo Alvear',   rol:'Soporte_402',   consulta:'Orden detenida por inconsistencia de datos del titular',         error:'ERR-CONTR-001', modulo:'Aprovisionamiento', coincidencia:94, resultado:'Resuelto'    },
  { id:'HC-0240', fecha:'18 ago 2026', hora:'13:15', usuario:'Elena Gómez',      rol:'Soporte_311',   consulta:'Falla en activación de línea móvil post-portabilidad',           error:'ERR-PORT-007',  modulo:'Portabilidad',     coincidencia:88, resultado:'Escalado L2' },
  { id:'HC-0239', fecha:'18 ago 2026', hora:'11:47', usuario:'Pedro Pascal',     rol:'Soporte_198',   consulta:'Rechazo de flujo de aprovisionamiento por cédula no validada',   error:'ERR-CONTR-002', modulo:'Validación ID',    coincidencia:91, resultado:'Escalado L2' },
  { id:'HC-0238', fecha:'18 ago 2026', hora:'10:03', usuario:'Ana Herrera',      rol:'Soporte_402',   consulta:'Reenvío automático de token de activación fallido',              error:'ERR-CONTR-003', modulo:'Activación',       coincidencia:97, resultado:'Resuelto'    },
  { id:'HC-0237', fecha:'17 ago 2026', hora:'16:58', usuario:'Roberto Díaz',     rol:'Soporte_215',   consulta:'Error de aprovisionamiento CRM en cambio de plan tarifario',    error:'ERR-CRM-014',   modulo:'CRM',              coincidencia:76, resultado:'En proceso'  },
  { id:'HC-0236', fecha:'17 ago 2026', hora:'15:22', usuario:'Carmen López',     rol:'Soporte_311',   consulta:'Timeout en módulo de activación de servicio de datos',           error:'ERR-CONTR-007', modulo:'Activación',       coincidencia:83, resultado:'Pendiente'   },
  { id:'HC-0235', fecha:'17 ago 2026', hora:'14:09', usuario:'Luis Martínez',    rol:'Soporte_402',   consulta:'Duplicado de contrato detectado en alta de producto adicional',  error:'ERR-CONTR-005', modulo:'Contratos',        coincidencia:89, resultado:'Escalado L2' },
  { id:'HC-0234', fecha:'17 ago 2026', hora:'11:34', usuario:'María Fernández',  rol:'Soporte_198',   consulta:'Inconsistencia en dirección de facturación al migrar 2G a 4G',  error:'ERR-MIG-003',   modulo:'Migración',        coincidencia:92, resultado:'Resuelto'    },
  { id:'HC-0233', fecha:'16 ago 2026', hora:'17:11', usuario:'Carlos Ramos',     rol:'Soporte_215',   consulta:'Suspensión de línea no ejecutada por error de autorización',     error:'ERR-AUTH-009',  modulo:'Autorización',     coincidencia:71, resultado:'Escalado L2' },
  { id:'HC-0232', fecha:'16 ago 2026', hora:'15:45', usuario:'Sandra Vargas',    rol:'Soporte_311',   consulta:'Orden de reactivación rechazada por deuda pendiente no detectada',error:'ERR-CONTR-011', modulo:'Facturación',      coincidencia:85, resultado:'Resuelto'    },
  { id:'HC-0231', fecha:'16 ago 2026', hora:'13:27', usuario:'Diego Torres',     rol:'Soporte_402',   consulta:'Falla en generación de orden en CRM al rescindircontrato',       error:'ERR-CRM-022',   modulo:'CRM',              coincidencia:78, resultado:'En proceso'  },
  { id:'HC-0230', fecha:'16 ago 2026', hora:'10:52', usuario:'Lucía Morales',    rol:'Soporte_198',   consulta:'Validación de elegibilidad de plan fallida para cliente migrado', error:'ERR-ELIG-004',  modulo:'Validación',       coincidencia:66, resultado:'Pendiente'   },
]

const RESULTADO_STYLES: Record<StatusType,{bg:string;text:string;dot:string}> = {
  'Resuelto':    {bg:'#ecfdf5',text:'#065f46',dot:'#10b981'},
  'Escalado L2': {bg:'#fff7ed',text:'#92400e',dot:'#f59e0b'},
  'En proceso':  {bg:'#eff6ff',text:'#1e40af',dot:'#3b82f6'},
  'Pendiente':   {bg:'#fdf2f8',text:'#831843',dot:'#be185d'},
}

function ResultadoPill({ s }: { s: StatusType }) {
  const st = RESULTADO_STYLES[s]
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ background:st.bg, color:st.text }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:st.dot }}/>
      {s}
    </span>
  )
}

function CoincidenceBar({ pct }: { pct: number }) {
  const color = pct >= 90 ? '#059669' : pct >= 75 ? '#2563eb' : '#f59e0b'
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background:'#e8eef6' }}>
        <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, background:color }}/>
      </div>
      <span className="text-xs font-semibold tabular-nums" style={{ color }}>{pct}%</span>
    </div>
  )
}

function FilterInput({ placeholder, icon, value, onChange }: { placeholder:string; icon:JSX.Element; value:string; onChange:(v:string)=>void }) {
  const [focus,setFocus] = useState(false)
  return (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-150"
      style={{ border:`1.5px solid ${focus?'#2563eb':'#dde5f0'}`, background:focus?'#f8faff':'white', boxShadow:focus?'0 0 0 3px rgba(37,99,235,0.08)':'none', minWidth:0 }}>
      <span style={{ color:'#94a3b8', flexShrink:0 }}>{icon}</span>
      <input type="text" placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        className="bg-transparent text-sm outline-none placeholder:text-slate-300 min-w-0 w-full" style={{ color:'#1e293b' }}/>
    </div>
  )
}

const PAGE_SIZE = 8

function HistorialView() {
  const [search, setSearch]     = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterUser, setFilterUser] = useState('')
  const [filterRes,  setFilterRes]  = useState('')
  const [page, setPage]         = useState(1)
  const [hoverRow, setHoverRow] = useState<number|null>(null)

  const filtered = HISTORIAL_DATA.filter(r => {
    const q = search.toLowerCase()
    const matchQ = !q || r.error.toLowerCase().includes(q) || r.usuario.toLowerCase().includes(q) || r.consulta.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
    const matchD = !filterDate || r.fecha.toLowerCase().includes(filterDate.toLowerCase())
    const matchU = !filterUser || r.usuario.toLowerCase().includes(filterUser.toLowerCase()) || r.rol.toLowerCase().includes(filterUser.toLowerCase())
    const matchR = !filterRes || r.resultado === filterRes
    return matchQ && matchD && matchU && matchR
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE)

  const handleFilter = (setter: (v:string)=>void) => (v:string) => { setter(v); setPage(1) }

  const RESULT_OPTIONS: (StatusType|'')[] = ['','Resuelto','Escalado L2','En proceso','Pendiente']

  return (
    <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-5">

      {/* Filters row */}
      <div className="bg-white rounded-xl px-5 py-4 flex items-center gap-3 flex-wrap"
        style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.04)' }}>
        {/* Search */}
        <div className="flex-1 min-w-48">
          <FilterInput placeholder="Buscar por código, usuario, consulta…"
            value={search} onChange={handleFilter(setSearch)}
            icon={<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#94a3b8" strokeWidth="1.3"/><path d="M10.5 10.5l3 3" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>}/>
        </div>

        <div className="w-px h-6" style={{ background:'#e2e8f4' }}/>

        {/* Date filter */}
        <div className="w-44">
          <FilterInput placeholder="Filtrar por fecha…"
            value={filterDate} onChange={handleFilter(setFilterDate)}
            icon={<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2.5" width="12" height="10" rx="2" stroke="#94a3b8" strokeWidth="1.2"/><path d="M4.5 1v3M9.5 1v3M1 5.5h12" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/></svg>}/>
        </div>

        {/* User filter */}
        <div className="w-44">
          <FilterInput placeholder="Filtrar por usuario…"
            value={filterUser} onChange={handleFilter(setFilterUser)}
            icon={<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" stroke="#94a3b8" strokeWidth="1.2"/><path d="M1.5 13C1.5 10.5 4 8.5 7 8.5s5.5 2 5.5 4.5" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/></svg>}/>
        </div>

        {/* Status filter */}
        <div className="w-44">
          <div className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ border:'1.5px solid #dde5f0', background:'white' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#94a3b8" strokeWidth="1.2"/><path d="M4.5 7h5M5.5 5l2 2-2 2" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <select value={filterRes} onChange={e=>{handleFilter(setFilterRes)(e.target.value)}}
              className="bg-transparent text-sm outline-none w-full" style={{ color:filterRes?'#1e293b':'#94a3b8' }}>
              {RESULT_OPTIONS.map(o => <option key={o} value={o}>{o || 'Todos los estados'}</option>)}
            </select>
          </div>
        </div>

        {/* Clear */}
        {(search||filterDate||filterUser||filterRes) && (
          <button type="button" onClick={()=>{setSearch('');setFilterDate('');setFilterUser('');setFilterRes('');setPage(1)}}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"
            style={{ border:'1px solid #e2e8f4', color:'#64748b' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/></svg>
            Limpiar
          </button>
        )}

        <div className="ml-auto flex items-center gap-2 text-xs" style={{ color:'#94a3b8' }}>
          <span className="font-semibold tabular-nums" style={{ color:'#0f2044' }}>{filtered.length}</span> registros encontrados
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden flex-1"
        style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.05)' }}>
        <div className="overflow-x-auto">

        {/* Column headers */}
        <div className="grid px-5 py-3 min-w-[700px]"
          style={{ gridTemplateColumns:'96px 56px 160px 1fr 130px 110px 110px', borderBottom:'1px solid #f1f5fb', background:'#fafbfd' }}>
          {['ID','Hora','Usuario','Consulta / Error','Módulo','Coincidencia','Resultado'].map(h => (
            <span key={h} className="text-xs font-semibold uppercase tracking-wider" style={{ color:'#94a3b8', letterSpacing:'0.06em' }}>{h}</span>
          ))}
        </div>

        {pageRows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#dde5f0" strokeWidth="2"/><path d="M13 20h14M13 14h14M13 26h9" stroke="#dde5f0" strokeWidth="2" strokeLinecap="round"/></svg>
            <p className="text-sm font-medium" style={{ color:'#94a3b8' }}>No se encontraron registros con los filtros aplicados.</p>
            <button type="button" onClick={()=>{setSearch('');setFilterDate('');setFilterUser('');setFilterRes('');setPage(1)}}
              className="text-xs font-semibold" style={{ color:'#2563eb' }}>Limpiar filtros</button>
          </div>
        ) : pageRows.map((row, i) => (
          <div key={row.id}
            className="grid px-5 py-3.5 items-center cursor-pointer transition-colors duration-100"
            style={{ gridTemplateColumns:'96px 56px 160px 1fr 130px 110px 110px', borderBottom:i<pageRows.length-1?'1px solid #f1f5fb':'none', background:hoverRow===i?'#f8faff':'white', minWidth:'700px' }}
            onMouseEnter={()=>setHoverRow(i)} onMouseLeave={()=>setHoverRow(null)}>

            {/* ID */}
            <span className="text-xs font-mono font-semibold" style={{ color:'#64748b' }}>{row.id}</span>

            {/* Hora */}
            <span className="text-xs" style={{ color:'#94a3b8' }}>{row.hora}</span>

            {/* Usuario */}
            <div>
              <p className="text-sm font-medium leading-tight" style={{ color:'#1e293b' }}>{row.usuario}</p>
              <p className="text-xs leading-tight" style={{ color:'#94a3b8' }}>{row.rol}</p>
            </div>

            {/* Consulta + error */}
            <div className="pr-4 min-w-0">
              <p className="text-sm leading-snug truncate" style={{ color:'#334155' }}>{row.consulta}</p>
              <span className="text-xs font-mono font-semibold" style={{ color:'#3b5bdb' }}>{row.error}</span>
            </div>

            {/* Módulo */}
            <span className="text-xs font-medium px-2 py-1 rounded-md inline-block" style={{ background:'#f1f5fb', color:'#475569' }}>{row.modulo}</span>

            {/* Coincidencia */}
            <CoincidenceBar pct={row.coincidencia}/>

            {/* Resultado */}
            <ResultadoPill s={row.resultado}/>
          </div>
        ))}
        </div>{/* end overflow-x-auto */}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between flex-shrink-0">
        <p className="text-xs" style={{ color:'#94a3b8' }}>
          Mostrando{' '}
          <span className="font-semibold" style={{ color:'#334155' }}>{(currentPage-1)*PAGE_SIZE+1}–{Math.min(currentPage*PAGE_SIZE, filtered.length)}</span>
          {' '}de{' '}
          <span className="font-semibold" style={{ color:'#334155' }}>{filtered.length}</span>
          {' '}registros
        </p>

        <div className="flex items-center gap-1.5">
          <button type="button" disabled={currentPage===1} onClick={()=>setPage(p=>p-1)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
            style={{ background:'white', border:'1.5px solid #e2e8f4', color:currentPage===1?'#cbd5e1':'#334155', cursor:currentPage===1?'not-allowed':'pointer' }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 3L5 6.5 8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Anterior
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_,i) => i+1).map(n => (
              <button key={n} type="button" onClick={()=>setPage(n)}
                className="w-8 h-8 rounded-lg text-xs font-semibold transition-all"
                style={{ background:n===currentPage?'linear-gradient(135deg,#1d4ed8,#2563eb)':'white', color:n===currentPage?'white':'#64748b', border:`1.5px solid ${n===currentPage?'transparent':'#e2e8f4'}`, boxShadow:n===currentPage?'0 2px 8px rgba(37,99,235,0.25)':'none' }}>
                {n}
              </button>
            ))}
          </div>

          <button type="button" disabled={currentPage===totalPages} onClick={()=>setPage(p=>p+1)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
            style={{ background:'white', border:'1.5px solid #e2e8f4', color:currentPage===totalPages?'#cbd5e1':'#334155', cursor:currentPage===totalPages?'not-allowed':'pointer' }}>
            Siguiente
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M5 3l3 3.5-3 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs" style={{ color:'#94a3b8' }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.5v4M4 4l2.5 2.5L9 4" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 9.5v1A1.5 1.5 0 002.5 12h8A1.5 1.5 0 0012 10.5v-1" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <button type="button" className="font-medium hover:underline" style={{ color:'#2563eb' }}>Exportar CSV</button>
          <span>·</span>
          <button type="button" className="font-medium hover:underline" style={{ color:'#2563eb' }}>Exportar PDF</button>
        </div>
      </div>
    </div>
  )
}

// ─── Base de Conocimiento ─────────────────────────────────────────────────────
const TIPO_ORDEN_OPTS = ['Seleccione tipo de orden','Activación de servicio','Portabilidad numérica','Cambio de plan tarifario','Suspensión de línea','Reactivación de servicio','Alta de producto adicional','Migración de tecnología (2G→4G)','Rescisión de contrato']
const NIVEL_SOPORTE_OPTS = ['Seleccione nivel','L1 — Soporte básico (agente)','L2 — Soporte técnico especializado','L3 — Ingeniería y plataformas','L4 — Proveedor / fabricante']
const ETAPA_FLUJO_OPTS = ['Seleccione etapa','Recepción y validación de solicitud','Verificación de identidad del titular','Consulta de elegibilidad de plan','Generación de orden en CRM','Aprovisionamiento en red','Activación de línea / servicio','Entrega de credenciales al cliente','Cierre y confirmación de orden']

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold uppercase mb-1.5" style={{ color:'#334155', letterSpacing:'0.06em' }}>
      {text}{required && <span className="ml-1 text-pink-600">*</span>}
    </label>
  )
}

function TextInput({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v:string)=>void }) {
  const [focus, setFocus] = useState(false)
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none placeholder:text-slate-300 transition-all duration-150"
      style={{ border:`1.5px solid ${focus?'#2563eb':'#dde5f0'}`, background:focus?'#f8faff':'#fafbfd', color:'#1e293b', boxShadow:focus?'0 0 0 3px rgba(37,99,235,0.08)':'none' }}
    />
  )
}

function SelectInput({ options, value, onChange }: { options: string[]; value: string; onChange: (v:string)=>void }) {
  const [focus, setFocus] = useState(false)
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all duration-150 appearance-none"
      style={{ border:`1.5px solid ${focus?'#2563eb':'#dde5f0'}`, background:focus?'#f8faff':'#fafbfd', color: value===options[0]?'#94a3b8':'#1e293b', boxShadow:focus?'0 0 0 3px rgba(37,99,235,0.08)':'none', backgroundImage:`url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat:'no-repeat', backgroundPosition:'right 12px center' }}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function TextareaInput({ placeholder, value, onChange, rows = 3 }: { placeholder: string; value: string; onChange: (v:string)=>void; rows?: number }) {
  const [focus, setFocus] = useState(false)
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      rows={rows}
      className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none placeholder:text-slate-300 transition-all duration-150 resize-none"
      style={{ border:`1.5px solid ${focus?'#2563eb':'#dde5f0'}`, background:focus?'#f8faff':'#fafbfd', color:'#1e293b', boxShadow:focus?'0 0 0 3px rgba(37,99,235,0.08)':'none' }}
    />
  )
}

function BaseConocimientoView() {
  const [form, setForm] = useState({
    codigo: '', tipoOrden: TIPO_ORDEN_OPTS[0], nivelSoporte: NIVEL_SOPORTE_OPTS[0],
    etapaFlujo: ETAPA_FLUJO_OPTS[0], descripcion: '', causaProbable: '',
    pasosValidacion: '', pasosSolucion: '', observaciones: '',
  })
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000) }, 1100)
  }

  const handleCancel = () => setForm({
    codigo:'', tipoOrden:TIPO_ORDEN_OPTS[0], nivelSoporte:NIVEL_SOPORTE_OPTS[0],
    etapaFlujo:ETAPA_FLUJO_OPTS[0], descripcion:'', causaProbable:'',
    pasosValidacion:'', pasosSolucion:'', observaciones:'',
  })

  return (
    <div className="flex-1 overflow-y-auto px-7 py-6">

      {/* Success toast */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl"
          style={{ background:'#ecfdf5', border:'1.5px solid #6ee7b7' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="#059669"/><path d="M5.5 9.5l2.5 2.5 5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div>
            <p className="text-sm font-bold" style={{ color:'#065f46' }}>Registro guardado correctamente</p>
            <p className="text-xs" style={{ color:'#059669' }}>El error ha sido añadido a la base de conocimiento.</p>
          </div>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color:'#94a3b8' }}>Base de Conocimiento</span>
            <span style={{ color:'#e2e8f4' }}>/</span>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color:'#2563eb' }}>Nuevo registro</span>
          </div>
          <h2 className="text-lg font-bold" style={{ color:'#0f2044' }}>Registro de Error Operativo</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background:'#f0f4ff', border:'1px solid #dde5f7', color:'#3b5bdb' }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#3b5bdb" strokeWidth="1.2"/><rect x="5.8" y="5.2" width="1.4" height="4" rx=".7" fill="#3b5bdb"/><rect x="5.8" y="3" width="1.4" height="1.4" rx=".7" fill="#3b5bdb"/></svg>
          Los registros serán utilizados para entrenar el modelo IA
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* Main form card */}
        <div className="bg-white rounded-2xl overflow-hidden mb-5" style={{ border:'1px solid #e8eef6', boxShadow:'0 2px 8px rgba(15,32,68,0.06)' }}>

          {/* Card header */}
          <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom:'1px solid #f1f5fb', background:'#fafbfd' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:'#eff6ff' }}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M3 3h5a2 2 0 012 2v8a2 2 0 00-2-2H3V3z" stroke="#2563eb" strokeWidth="1.4"/><path d="M14 3H9a2 2 0 00-2 2v8a2 2 0 012-2h5V3z" stroke="#2563eb" strokeWidth="1.4"/></svg>
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color:'#0f2044' }}>Nuevo Registro en Base de Conocimiento</p>
              <p className="text-xs" style={{ color:'#94a3b8' }}>Documente los errores operativos detectados para entrenar al Agente Conversacional Técnico.</p>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">

            {/* Row 1: Código + Tipo orden */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <FieldLabel text="Código de error" required/>
                <TextInput
                  placeholder="Ej. ERR-CONTR-001"
                  value={form.codigo}
                  onChange={set('codigo')}
                />
                <p className="text-xs mt-1.5" style={{ color:'#94a3b8' }}>Formato: ERR-[MÓDULO]-[NÚM]</p>
              </div>
              <div>
                <FieldLabel text="Tipo de orden" required/>
                <SelectInput options={TIPO_ORDEN_OPTS} value={form.tipoOrden} onChange={set('tipoOrden')}/>
              </div>
            </div>

            {/* Row 2: Nivel soporte + Etapa flujo */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <FieldLabel text="Nivel de soporte" required/>
                <SelectInput options={NIVEL_SOPORTE_OPTS} value={form.nivelSoporte} onChange={set('nivelSoporte')}/>
              </div>
              <div>
                <FieldLabel text="Etapa del flujo de la orden" required/>
                <SelectInput options={ETAPA_FLUJO_OPTS} value={form.etapaFlujo} onChange={set('etapaFlujo')}/>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background:'#e8eef6' }}/>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color:'#94a3b8' }}>Documentación técnica</span>
              <div className="flex-1 h-px" style={{ background:'#e8eef6' }}/>
            </div>

            {/* Descripción */}
            <div>
              <FieldLabel text="Descripción detallada del error" required/>
              <TextareaInput
                rows={3}
                placeholder="Ej. La orden queda detenida en la etapa de aprovisionamiento CRM cuando el campo de dirección de facturación del titular no coincide con los registros del sistema de identidad nacional. El sistema devuelve código de rechazo interno PROV-4023."
                value={form.descripcion}
                onChange={set('descripcion')}
              />
            </div>

            {/* Causa probable */}
            <div>
              <FieldLabel text="Causa probable del error" required/>
              <TextareaInput
                rows={2}
                placeholder="Ej. Inconsistencia entre los datos ingresados por el agente y el registro en la plataforma CRM nacional. Puede originarse por diferencias en el formato del número de identificación o caracteres especiales en la dirección."
                value={form.causaProbable}
                onChange={set('causaProbable')}
              />
            </div>

            {/* Dos columnas: validación + solución */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <FieldLabel text="Pasos recomendados de validación" required/>
                <TextareaInput
                  rows={5}
                  placeholder={"1. Ingresar a la plataforma CRM y localizar la orden por ID de contrato.\n2. Verificar el campo billing_address contra el registro original.\n3. Consultar historial de cambios del titular en el módulo de identidad.\n4. Comparar con la solicitud original firmada por el cliente."}
                  value={form.pasosValidacion}
                  onChange={set('pasosValidacion')}
                />
                <p className="text-xs mt-1.5" style={{ color:'#94a3b8' }}>Liste cada paso en una línea numerada.</p>
              </div>
              <div>
                <FieldLabel text="Pasos recomendados de solución" required/>
                <TextareaInput
                  rows={5}
                  placeholder={"1. Corregir el estado del campo billing_address_status a VALIDATED.\n2. Solicitar reenvío del token de activación desde el panel de operaciones.\n3. Monitorear el flujo de aprovisionamiento por 5 minutos.\n4. Confirmar activación y cerrar la orden con código de resolución RES-OK."}
                  value={form.pasosSolucion}
                  onChange={set('pasosSolucion')}
                />
                <p className="text-xs mt-1.5" style={{ color:'#94a3b8' }}>Liste cada paso en una línea numerada.</p>
              </div>
            </div>

            {/* Observaciones */}
            <div>
              <FieldLabel text="Observaciones técnicas adicionales"/>
              <TextareaInput
                rows={2}
                placeholder="Ej. Este error se presenta con mayor frecuencia en órdenes de portabilidad de operadores externos. Revisar integración con API de validación de identidad versión 3.2. Escalación recomendada al equipo de CRM si persiste tras 2 intentos de corrección."
                value={form.observaciones}
                onChange={set('observaciones')}
              />
            </div>

          </div>

          {/* Card footer / action bar */}
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop:'1px solid #f1f5fb', background:'#fafbfd' }}>
            <div className="flex items-center gap-2 text-xs" style={{ color:'#94a3b8' }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#94a3b8" strokeWidth="1.1"/><path d="M6.5 3.5v3.2l2 1.2" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round"/></svg>
              Último registro guardado: hoy, 13:47 por Soporte_402
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleCancel}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-100 active:scale-95 transition-all"
                style={{ background:'white', border:'1.5px solid #e2e8f4', color:'#64748b' }}>
                Cancelar
              </button>
              <button type="submit" disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all active:scale-95"
                style={{ background:saving?'#4b6cb7':'linear-gradient(135deg,#0f2044 0%,#1d4ed8 60%,#2563eb 100%)', boxShadow:saving?'none':'0 3px 12px rgba(37,99,235,0.32)', cursor:saving?'not-allowed':'pointer' }}>
                {saving ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4"/><path d="M7 1.5A5.5 5.5 0 0112.5 7" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    Guardando…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Guardar error y solución
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info card below */}
        <div className="rounded-xl px-5 py-4 flex items-start gap-3" style={{ background:'#f0f4ff', border:'1px solid #dde5f7' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0"><circle cx="8" cy="8" r="7" stroke="#2563eb" strokeWidth="1.3"/><rect x="7.3" y="7" width="1.4" height="5" rx=".7" fill="#2563eb"/><rect x="7.3" y="4" width="1.4" height="1.4" rx=".7" fill="#2563eb"/></svg>
          <div>
            <p className="text-sm font-semibold" style={{ color:'#1e40af' }}>Uso de los registros</p>
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color:'#3b5bdb' }}>
              Los errores documentados alimentan la base vectorial del Agente Conversacional Técnico. Los registros son revisados por el equipo de IA antes de ser activados. Incluya descripciones detalladas para mejorar la precisión de las respuestas generadas.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

// ─── Administración de Usuarios ───────────────────────────────────────────────
type UserRol = 'Administrador' | 'Soporte L2' | 'Soporte L1'
type UserEstado = 'Activo' | 'Inactivo'

type AdminUser = {
  id: string; nombre: string; email: string; rol: UserRol;
  estado: UserEstado; ultimaConexion: string; iniciales: string; color: string
}

const ADMIN_USERS: AdminUser[] = [
  { id:'USR-001', nombre:'Jenny Morales',    email:'jennyMorales@miumg.edu.gt',  rol:'Administrador', estado:'Activo',   ultimaConexion:'Hoy, 14:32',       iniciales:'JM', color:'linear-gradient(135deg,#2563eb,#be185d)' },
  { id:'USR-002', nombre:'Eduardo Alvear',   email:'e.alvear@corp.telco.gt',       rol:'Soporte L2',    estado:'Activo',   ultimaConexion:'Hoy, 13:15',       iniciales:'EA', color:'linear-gradient(135deg,#0891b2,#2563eb)'  },
  { id:'USR-003', nombre:'Elena Gómez',      email:'e.gomez@corp.telco.gt',        rol:'Soporte L1',    estado:'Activo',   ultimaConexion:'Hoy, 11:47',       iniciales:'EG', color:'linear-gradient(135deg,#059669,#0891b2)'  },
  { id:'USR-004', nombre:'Pedro Pascal',     email:'p.pascal@corp.telco.gt',       rol:'Soporte L2',    estado:'Activo',   ultimaConexion:'Hoy, 10:03',       iniciales:'PP', color:'linear-gradient(135deg,#7c3aed,#2563eb)'  },
  { id:'USR-005', nombre:'Ana Herrera',      email:'a.herrera@corp.telco.gt',      rol:'Soporte L1',    estado:'Activo',   ultimaConexion:'Ayer, 17:22',      iniciales:'AH', color:'linear-gradient(135deg,#be185d,#7c3aed)'  },
  { id:'USR-006', nombre:'Roberto Díaz',     email:'r.diaz@corp.telco.gt',         rol:'Soporte L2',    estado:'Inactivo', ultimaConexion:'15 ago, 09:41',    iniciales:'RD', color:'linear-gradient(135deg,#64748b,#94a3b8)'  },
  { id:'USR-007', nombre:'Carmen López',     email:'c.lopez@corp.telco.gt',        rol:'Soporte L1',    estado:'Activo',   ultimaConexion:'Hoy, 08:55',       iniciales:'CL', color:'linear-gradient(135deg,#0891b2,#059669)'  },
  { id:'USR-008', nombre:'Luis Martínez',    email:'l.martinez@corp.telco.gt',     rol:'Soporte L1',    estado:'Inactivo', ultimaConexion:'10 ago, 14:20',    iniciales:'LM', color:'linear-gradient(135deg,#64748b,#94a3b8)'  },
]

const ROL_STYLES: Record<UserRol,{bg:string;text:string}> = {
  'Administrador': {bg:'#eff6ff',text:'#1d4ed8'},
  'Soporte L2':    {bg:'#f5f3ff',text:'#6d28d9'},
  'Soporte L1':    {bg:'#f0fdf4',text:'#166534'},
}

function AdminView() {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS)
  const [search, setSearch] = useState('')
  const [filterRol, setFilterRol] = useState('')
  const [filterEstado, setFilterEstado] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [hoverRow, setHoverRow] = useState<number|null>(null)
  const [newUser, setNewUser] = useState({ nombre:'', email:'', rol:'Soporte L1' as UserRol })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    const mQ = !q || u.nombre.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q)
    const mR = !filterRol || u.rol === filterRol
    const mE = !filterEstado || u.estado === filterEstado
    return mQ && mR && mE
  })

  const toggleEstado = (id: string) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, estado: u.estado === 'Activo' ? 'Inactivo' : 'Activo' } : u))
    setToast('Estado actualizado correctamente')
    setTimeout(() => setToast(''), 2500)
  }

  const handleNew = (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    setTimeout(() => {
      const initials = newUser.nombre.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()
      setUsers(us => [{
        id:`USR-00${us.length+1}`, nombre:newUser.nombre, email:newUser.email,
        rol:newUser.rol, estado:'Activo', ultimaConexion:'Justo ahora',
        iniciales:initials, color:'linear-gradient(135deg,#2563eb,#7c3aed)'
      }, ...us])
      setSaving(false); setShowModal(false)
      setNewUser({ nombre:'', email:'', rol:'Soporte L1' })
      setToast('Usuario creado correctamente')
      setTimeout(() => setToast(''), 2500)
    }, 900)
  }

  const ROL_OPTS: UserRol[] = ['Administrador','Soporte L2','Soporte L1']
  const EST_OPTS: UserEstado[] = ['Activo','Inactivo']

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-7 py-6 flex flex-col gap-5">

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl"
          style={{ background:'#ecfdf5', border:'1.5px solid #6ee7b7' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="#059669"/><path d="M5.5 9.5l2.5 2.5 5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <p className="text-sm font-semibold" style={{ color:'#065f46' }}>{toast}</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:'rgba(15,32,68,0.45)' }}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom:'1px solid #f1f5fb', background:'#fafbfd' }}>
              <div>
                <p className="text-sm font-bold" style={{ color:'#0f2044' }}>Nuevo usuario</p>
                <p className="text-xs" style={{ color:'#94a3b8' }}>Complete los datos del nuevo colaborador</p>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <form onSubmit={handleNew} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5" style={{ color:'#334155', letterSpacing:'0.06em' }}>Nombre completo <span className="text-pink-600">*</span></label>
                <input required type="text" placeholder="Ej. María Fernández" value={newUser.nombre} onChange={e=>setNewUser(u=>({...u,nombre:e.target.value}))}
                  className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none" style={{ border:'1.5px solid #dde5f0', background:'#fafbfd', color:'#1e293b' }}/>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5" style={{ color:'#334155', letterSpacing:'0.06em' }}>Correo corporativo <span className="text-pink-600">*</span></label>
                <input required type="email" placeholder="usuario@corp.telco.gt" value={newUser.email} onChange={e=>setNewUser(u=>({...u,email:e.target.value}))}
                  className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none" style={{ border:'1.5px solid #dde5f0', background:'#fafbfd', color:'#1e293b' }}/>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5" style={{ color:'#334155', letterSpacing:'0.06em' }}>Rol asignado <span className="text-pink-600">*</span></label>
                <select value={newUser.rol} onChange={e=>setNewUser(u=>({...u,rol:e.target.value as UserRol}))}
                  className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none appearance-none" style={{ border:'1.5px solid #dde5f0', background:'#fafbfd', color:'#1e293b' }}>
                  {ROL_OPTS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={()=>setShowModal(false)} className="flex-1 py-2.5 rounded-lg text-sm font-semibold" style={{ border:'1.5px solid #e2e8f4', color:'#64748b' }}>
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white"
                  style={{ background:'linear-gradient(135deg,#0f2044,#2563eb)', boxShadow:'0 3px 12px rgba(37,99,235,0.3)' }}>
                  {saving ? (
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4"/><path d="M7 1.5A5.5 5.5 0 0112.5 7" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                  {saving ? 'Guardando…' : 'Crear usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold" style={{ color:'#0f2044' }}>Control de Accesos y Roles</h2>
          <p className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>{users.filter(u=>u.estado==='Activo').length} usuarios activos · {users.length} total registrados</p>
        </div>
        <button type="button" onClick={()=>setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white active:scale-95 transition-all"
          style={{ background:'linear-gradient(135deg,#0f2044,#2563eb)', boxShadow:'0 3px 12px rgba(37,99,235,0.3)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Nuevo usuario
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:'Total usuarios', val: users.length.toString(), icon:'👥', color:'#2563eb' },
          { label:'Activos', val: users.filter(u=>u.estado==='Activo').length.toString(), icon:'✅', color:'#059669' },
          { label:'Inactivos', val: users.filter(u=>u.estado==='Inactivo').length.toString(), icon:'⛔', color:'#be185d' },
          { label:'Administradores', val: users.filter(u=>u.rol==='Administrador').length.toString(), icon:'🔐', color:'#7c3aed' },
        ].map((c,i) => (
          <div key={i} className="bg-white rounded-xl px-4 py-4 flex items-center gap-3" style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.04)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background:`${c.color}12` }}>{c.icon}</div>
            <div>
              <p className="text-2xl font-bold" style={{ color:'#0f2044' }}>{c.val}</p>
              <p className="text-xs" style={{ color:'#94a3b8' }}>{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl px-4 py-3 flex flex-wrap items-center gap-3" style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.04)' }}>
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 flex-1 min-w-40" style={{ border:'1.5px solid #dde5f0', background:'#fafbfd' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.2"/><path d="M9.5 9.5l3 3" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <input type="text" placeholder="Buscar nombre, email, ID…" value={search} onChange={e=>setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full placeholder:text-slate-300" style={{ color:'#1e293b' }}/>
        </div>
        <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ border:'1.5px solid #dde5f0', background:'#fafbfd' }}>
          <select value={filterRol} onChange={e=>setFilterRol(e.target.value)} className="bg-transparent text-sm outline-none" style={{ color: filterRol?'#1e293b':'#94a3b8' }}>
            <option value="">Todos los roles</option>
            {ROL_OPTS.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ border:'1.5px solid #dde5f0', background:'#fafbfd' }}>
          <select value={filterEstado} onChange={e=>setFilterEstado(e.target.value)} className="bg-transparent text-sm outline-none" style={{ color: filterEstado?'#1e293b':'#94a3b8' }}>
            <option value="">Todos los estados</option>
            {EST_OPTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {(search||filterRol||filterEstado) && (
          <button type="button" onClick={()=>{setSearch('');setFilterRol('');setFilterEstado('')}}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium" style={{ border:'1px solid #e2e8f4', color:'#64748b' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/></svg>
            Limpiar
          </button>
        )}
        <span className="ml-auto text-xs" style={{ color:'#94a3b8' }}>
          <span className="font-semibold" style={{ color:'#334155' }}>{filtered.length}</span> de {users.length} usuarios
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border:'1px solid #e8eef6', boxShadow:'0 1px 3px rgba(15,32,68,0.05)' }}>
        {/* Desktop column headers */}
        <div className="hidden md:grid px-6 py-3" style={{ gridTemplateColumns:'200px 1fr 140px 90px 160px 120px', borderBottom:'1px solid #f1f5fb', background:'#fafbfd' }}>
          {['Nombre','Email','Rol','Estado','Última conexión','Acciones'].map(h => (
            <span key={h} className="text-xs font-semibold uppercase tracking-wider" style={{ color:'#94a3b8', letterSpacing:'0.06em' }}>{h}</span>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#dde5f0" strokeWidth="2"/><circle cx="20" cy="15" r="5" stroke="#dde5f0" strokeWidth="2"/><path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#dde5f0" strokeWidth="2" strokeLinecap="round"/></svg>
            <p className="text-sm font-medium" style={{ color:'#94a3b8' }}>No se encontraron usuarios con los filtros aplicados.</p>
          </div>
        ) : filtered.map((u, i) => (
          <div key={u.id} onMouseEnter={()=>setHoverRow(i)} onMouseLeave={()=>setHoverRow(null)}
            className="transition-colors duration-100"
            style={{ borderBottom:i<filtered.length-1?'1px solid #f1f5fb':'none', background:hoverRow===i?'#f8faff':'white' }}>

            {/* Desktop row */}
            <div className="hidden md:grid px-6 py-3.5 items-center"
              style={{ gridTemplateColumns:'200px 1fr 140px 90px 160px 120px' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: u.color }}>{u.iniciales}</div>
                <div>
                  <p className="text-sm font-semibold leading-tight" style={{ color:'#0f2044' }}>{u.nombre}</p>
                  <p className="text-xs leading-tight" style={{ color:'#94a3b8' }}>{u.id}</p>
                </div>
              </div>
              <span className="text-sm truncate pr-4" style={{ color:'#64748b' }}>{u.email}</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block" style={{ background:ROL_STYLES[u.rol].bg, color:ROL_STYLES[u.rol].text }}>{u.rol}</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background:u.estado==='Activo'?'#ecfdf5':'#f9fafb', color:u.estado==='Activo'?'#065f46':'#64748b' }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:u.estado==='Activo'?'#10b981':'#cbd5e1' }}/>
                {u.estado}
              </span>
              <span className="text-sm" style={{ color:'#64748b' }}>{u.ultimaConexion}</span>
              <div className="flex items-center gap-2">
                <button type="button" className="text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors" style={{ color:'#2563eb', border:'1px solid #dde5f7' }}>
                  Editar
                </button>
                <button type="button" onClick={()=>toggleEstado(u.id)}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                  style={{ color: u.estado==='Activo'?'#be185d':'#059669', border:`1px solid ${u.estado==='Activo'?'#fce7f3':'#d1fae5'}`, background: u.estado==='Activo'?'#fdf2f8':'#f0fdf4' }}>
                  {u.estado==='Activo' ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            </div>

            {/* Mobile card row */}
            <div className="md:hidden px-4 py-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: u.color }}>{u.iniciales}</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color:'#0f2044' }}>{u.nombre}</p>
                    <p className="text-xs" style={{ color:'#94a3b8' }}>{u.email}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
                  style={{ background:u.estado==='Activo'?'#ecfdf5':'#f9fafb', color:u.estado==='Activo'?'#065f46':'#64748b' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background:u.estado==='Activo'?'#10b981':'#cbd5e1' }}/>
                  {u.estado}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background:ROL_STYLES[u.rol].bg, color:ROL_STYLES[u.rol].text }}>{u.rol}</span>
                <div className="flex items-center gap-2">
                  <button type="button" className="text-xs font-semibold px-2.5 py-1.5 rounded-lg" style={{ color:'#2563eb', border:'1px solid #dde5f7' }}>Editar</button>
                  <button type="button" onClick={()=>toggleEstado(u.id)}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg"
                    style={{ color:u.estado==='Activo'?'#be185d':'#059669', border:`1px solid ${u.estado==='Activo'?'#fce7f3':'#d1fae5'}`, background:u.estado==='Activo'?'#fdf2f8':'#f0fdf4' }}>
                    {u.estado==='Activo' ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="px-6 py-3.5 flex items-center justify-between" style={{ background:'#fafbfd', borderTop:'1px solid #f1f5fb' }}>
          <span className="text-xs" style={{ color:'#94a3b8' }}>Sesiones auditadas · Acceso administrado por Dirección TI</span>
          <button type="button" className="text-xs font-medium hover:underline" style={{ color:'#2563eb' }}>Exportar listado</button>
        </div>
      </div>
    </div>
  )
}

// ─── Placeholder for other views ──────────────────────────────────────────────
function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background:'#eff6ff' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="4" width="9" height="9" rx="2" stroke="#2563eb" strokeWidth="1.6"/><rect x="15" y="4" width="9" height="9" rx="2" stroke="#2563eb" strokeWidth="1.6"/><rect x="4" y="15" width="9" height="9" rx="2" stroke="#be185d" strokeWidth="1.6"/><rect x="15" y="15" width="9" height="9" rx="2" stroke="#be185d" strokeWidth="1.6"/></svg>
        </div>
        <p className="text-sm font-semibold" style={{ color:'#0f2044' }}>{title}</p>
        <p className="text-xs mt-1" style={{ color:'#94a3b8' }}>Esta sección está disponible en la siguiente versión.</p>
      </div>
    </div>
  )
}

// ─── App shell ────────────────────────────────────────────────────────────────
function AppShell({ onLogout }: { onLogout: () => void }) {
  const [nav, setNav] = useState<NavId>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const PAGE_META: Record<NavId,{title:string;subtitle:string}> = {
    dashboard: { title:'Panel de Control General', subtitle:'Lunes, 18 de agosto de 2026 · Turno matutino' },
    agente:    { title:'Asistente IA de Errores Operativos', subtitle:'Consulta inteligente de errores operativos de contratación' },
    base:      { title:'Base de Conocimiento', subtitle:'Repositorio interno de resolución de errores' },
    historial: { title:'Historial de Consultas', subtitle:'Registro de interacciones del equipo de soporte' },
    metricas:  { title:'Métricas y Reportes', subtitle:'Análisis de desempeño operativo' },
    admin:     { title:'Administración de Usuarios', subtitle:'Gestión de accesos y perfiles del sistema' },
  }

  const { title, subtitle } = PAGE_META[nav]

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background:'#f1f5fb', fontFamily:"'Inter',system-ui,sans-serif" }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)}/>
      )}

      {/* Sidebar — fixed on mobile, static on desktop */}
      <div className={`fixed md:static inset-y-0 left-0 z-50 flex-shrink-0 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ width:'224px' }}>
        <Sidebar active={nav} onChange={setNav} onLogout={onLogout} onClose={() => setSidebarOpen(false)}/>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar title={title} subtitle={subtitle} onMenuClick={() => setSidebarOpen(true)}/>
        {nav === 'dashboard' && <DashboardView/>}
        {nav === 'agente'    && <AgentView/>}
        {nav === 'base'      && <BaseConocimientoView/>}
        {nav === 'historial' && <HistorialView/>}
        {nav === 'metricas'  && <MetricasView/>}
        {nav === 'admin'     && <AdminView/>}
        {nav !== 'dashboard' && nav !== 'agente' && nav !== 'base' && nav !== 'historial' && nav !== 'metricas' && nav !== 'admin' && <PlaceholderView title={title}/>}
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>('login')
  return screen === 'login'
    ? <LoginScreen onLogin={() => setScreen('app')}/>
    : <AppShell onLogout={() => setScreen('login')}/>
}
