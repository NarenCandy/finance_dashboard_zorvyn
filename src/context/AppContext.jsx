import { createContext, useContext, useState , useEffect} from "react"

import {currentUser, transactions,} from "../data/mockData"


import { useMemo } from "react"
const AppContext = createContext()
export function AppProvider({ children }) {
    const [role, setRole] = useState(currentUser.role)
    const [data, setData] = useState(()=>{
        const saved=localStorage.getItem("transactions")
        return saved ? JSON.parse(saved) : transactions
    })
    const [page,setPage]=useState("dashboard")
    const [sidebarOpen,setSidebarOpen]=useState(window.innerWidth >= 1024)
    const [darkMode,setDarkMode]=useState(true)

    const [filters, setFilters]=useState({
        search: "",
        category:"",
        type:""
    })

    const summaryData=useMemo(()=>{
        const totalIncome=data.filter(t=>t.type==="income").reduce((sum,t)=>sum+t.amount,0)
        const totalExpenses=data.filter(t=>t.type==="expense").reduce((sum,t)=>sum+t.amount,0)
        return {totalIncome,totalExpenses, totalBalance: totalIncome-totalExpenses}
    }, [data])

    const categoryData = useMemo(() => {
        const expenses = data.filter(t => t.type === "expense")
        const grouped = {}
        expenses.forEach(t => {
            grouped[t.category] = (grouped[t.category] || 0) + t.amount
        })
        return Object.entries(grouped).map(([category, amount]) => ({ category, amount }))
        }, [data])

    const monthlyData = useMemo(() => {
        const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        const grouped = {}
        data.forEach(t => {
            const month = new Date(t.date).toLocaleString("default", { month: "short" })
            if (!grouped[month]) grouped[month] = { month, income: 0, expenses: 0 }
            if (t.type === "income") grouped[month].income += t.amount
            else grouped[month].expenses += t.amount
        })
        return Object.values(grouped).sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month))
        }, [data])

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(data))
        }, 
    [data])


    function toggleDarkMode(){
        setDarkMode(prev=>{
            document.documentElement.classList.toggle("dark",!prev)
            return !prev
        })
    }
    return (
        <AppContext.Provider  value={{role,setRole,darkMode,toggleDarkMode,data,setData,filters,setFilters,summaryData,monthlyData,sidebarOpen,setSidebarOpen,categoryData,page,setPage}}>
            {children}
        </AppContext.Provider>
    )
}
export const useApp=()=>{
    return useContext(AppContext)
}