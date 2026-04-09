import { useApp } from "../context/AppContext"
import { AnimatePresence,motion } from "framer-motion"
const navItems = [
  { label: "Dashboard", icon: "dashboard", page: "dashboard" },
  { label: "Transactions", icon: "receipt_long", page: "transactions" },
  { label: "Insights", icon: "insights", page: "insights" },
]

export default function Sidebar() {
  const { page, setPage, sidebarOpen, setSidebarOpen } = useApp()

  function navigate(p) {
    setPage(p)
    setSidebarOpen(false)
    
  }

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed left-0 top-0 h-screen w-64 bg-surface-container-low flex flex-col py-6 px-4 z-50"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 mb-10">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-xl">account_balance</span>
              </div>
              <div>
                <p className="text-primary font-headline font-bold text-lg leading-none">CashFlow</p>
                <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">Finance</p>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1 flex-1">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.page}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 + idx / 10 }}
                  onClick={() => navigate(item.page)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition-colors
                    ${page === item.page
                      ? "text-primary font-semibold border-l-2 border-primary bg-surface-container-high"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-bright"
                    }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>    </>
  )
}
