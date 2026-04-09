//import Navbar from "./components/Navbar"
import SummaryCard from "./components/SummaryCard"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./page/Dashboard"
import Transactions from "./page/Transactions"
import Insights from "./page/Insights"
import { useApp } from "./context/AppContext"


function App() {
  const {page, sidebarOpen}=useApp()

  return (
    <div className="min-h-screen">

      <Sidebar />
      <Header />
      <main className={`transition-all duration-300 p-4 md:p-8 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`} style={{paddingTop:"5rem"}}>
        {page === "dashboard" && <Dashboard />}
        {page === "transactions" && <Transactions />}

        {page==="insights" && <Insights />}
      
      
      </main>
    </div>
  )
}

export default App