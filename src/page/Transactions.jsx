import { useApp } from "../context/AppContext"
import AddTransactionModal from "../components/AddTransactionModal"
import { useState } from "react"
import EditTransactionModal from "../components/EditTransactionModal"

export default function Transactions() {
  const { data, filters, setFilters, role,setData } = useApp()
  const [showModal, setShowModal] = useState(false)
  const [editTransaction, setEditTransaction] = useState(null)
  const [sort, setSort] = useState("date-desc")
  function handleDelete(id){
    setData(prev=> prev.filter(t=>t.id!==id ))
  }

  function exportCSV() {
    const headers = ["Date", "Description", "Category", "Type", "Amount"]
    const rows = filtered.map(t => [t.date, t.description, t.category, t.type, t.amount])
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
    URL.revokeObjectURL(url)
}


  const filtered = data.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(filters.search.toLowerCase())
    const matchCategory = filters.category === "" || t.category === filters.category
    const matchType = filters.type === "" || t.type === filters.type
    return matchSearch && matchCategory && matchType
  }).sort((a, b) => {
    if (sort === "date-desc") return new Date(b.date) - new Date(a.date)
    if (sort === "date-asc") return new Date(a.date) - new Date(b.date)
    if (sort === "amount-desc") return b.amount - a.amount
    if (sort === "amount-asc") return a.amount - b.amount
    return 0
  })

  const categories = [...new Set(data.map(t => t.category))]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Transactions</h1>
        <p className="text-on-surface-variant text-sm mt-1">{filtered.length} records found</p>
      </div>

  
      <div className="bg-surface-container-low rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            className="bg-surface-container-high text-on-surface text-xs px-4 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-primary/30 placeholder:text-on-surface-variant"
          />
          <select
            value={filters.category}
            onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
            className="bg-surface-container-high text-on-surface text-xs px-4 py-2.5 rounded-lg outline-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={filters.type}
            onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
            className="bg-surface-container-high text-on-surface text-xs px-4 py-2.5 rounded-lg outline-none cursor-pointer"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-surface-container-high text-on-surface text-xs px-4 py-2.5 rounded-lg outline-none cursor-pointer"
          >
            <option value="date-desc">Date: Newest</option>
            <option value="date-asc">Date: Oldest</option>
            <option value="amount-desc">Amount: High</option>
            <option value="amount-asc">Amount: Low</option>
          </select>
        </div>
        <div className="flex gap-3">
       
        {role === "admin" && (
        <button className="flex items-center gap-2 bg-primary text-on-primary text-xs font-bold px-4 py-2.5 rounded-xl" onClick={() => setShowModal(true)}>
          <span className="material-symbols-outlined text-sm">add</span>
          Add Transaction
        </button>
          )}
        <button onClick={exportCSV} className="flex items-center gap-2 bg-surface-container-high text-on-surface text-xs font-bold px-4 py-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-bright transition-colors">
          <span className="material-symbols-outlined text-sm">download</span>
          Export CSV
        </button>
</div>

          
        
        

        
      </div>

      <div className="bg-surface-container-low rounded-xl overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant">No transactions found</div>
        ) : (
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="bg-surface-container-lowest/50 border-b border-outline-variant/10">
              <tr>
                {["Date", "Description", "Category", "Type", "Amount"].map(h => (
                  <th key={h} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{h}</th>
                ))}
                {role === "admin" && <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-surface-bright transition-colors group">
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{t.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-on-surface">{t.description}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-surface-container-highest rounded-full text-[10px] font-bold text-on-surface-variant uppercase">{t.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-xs font-medium ${t.type === "income" ? "text-primary" : "text-error"}`}>
                      <span className="material-symbols-outlined text-sm">{t.type === "income" ? "south_west" : "arrow_outward"}</span>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold ${t.type === "income" ? "text-primary" : "text-on-surface"}`}>
                    {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
                  </td>
                  {role === "admin" && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={()=>setEditTransaction(t)} className="p-1.5 text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button onClick={()=>handleDelete(t.id)} className="p-1.5 text-on-surface-variant hover:text-error transition-colors">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>



      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
      {editTransaction && <EditTransactionModal transaction={editTransaction} onClose={() => setEditTransaction(null)} />}
    </div>
  )
}
