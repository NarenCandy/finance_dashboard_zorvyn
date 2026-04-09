import { Squash as Hamburger } from "hamburger-react"
import { useApp } from "../context/AppContext"

export default function Header() {
  const { role, setRole, page, setSidebarOpen,sidebarOpen, darkMode, toggleDarkMode  } = useApp()

  const titles = { dashboard: "Dashboard", transactions: "Transactions", insights: "Insights" }

  return (
    <header className={`fixed top-0 right-0 h-16 bg-surface-container-lowest z-40 flex items-center justify-between px-6 border-b border-outline-variant/20 transition-all duration-300 ${sidebarOpen ? "left-64" : "left-0"}`}>

      
      <div className="flex items-center gap-3">
        <Hamburger toggled={sidebarOpen} toggle={setSidebarOpen} size={20 } color="#bfc9c4" />
       
      
        <h1 className="font-headline font-bold text-lg text-on-surface">{titles[page]}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30">
          <span className="material-symbols-outlined text-tertiary text-sm">verified_user</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">{role}</span>
        </div>
        <button onClick={toggleDarkMode} className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">{darkMode ? "light_mode" : "dark_mode"}</span>
        </button>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-primary text-on-primary text-xs font-bold px-2 sm:px-3 py-2 rounded-xl cursor-pointer border-none outline-none"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
        <img src="/avatar.png" alt="profile" className="w-8 h-8 rounded-full border-2 border-primary object-cover" />
      </div>
    </header>
  )
}
