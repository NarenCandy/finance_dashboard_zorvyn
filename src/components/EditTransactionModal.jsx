import { useState } from "react"
import { useApp } from "../context/AppContext"

export default function EditTransactionModal({ transaction, onClose }) {
  const { data, setData } = useApp()
  const [form, setForm] = useState({ ...transaction })

  const categories = ["Food", "Salary", "Freelance", "Transport", "Shopping", "Health", "Utilities"]

  function handleSubmit(e) {
    e.preventDefault()
    setData(prev => prev.map(t => t.id === form.id ? { ...form, amount: parseFloat(form.amount) } : t))
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-surface-container-high rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline font-bold text-lg text-on-surface">Edit Transaction</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="bg-surface-container-highest text-on-surface text-sm px-4 py-3 rounded-lg outline-none focus:ring-1 focus:ring-primary/30"
          />
          <input
            type="number"
            value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
            className="bg-surface-container-highest text-on-surface text-sm px-4 py-3 rounded-lg outline-none focus:ring-1 focus:ring-primary/30"
          />
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="bg-surface-container-highest text-on-surface text-sm px-4 py-3 rounded-lg outline-none cursor-pointer"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            className="bg-surface-container-highest text-on-surface text-sm px-4 py-3 rounded-lg outline-none cursor-pointer"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            className="bg-surface-container-highest text-on-surface text-sm px-4 py-3 rounded-lg outline-none"
          />
          <button type="submit" className="bg-primary text-on-primary font-bold text-sm py-3 rounded-xl mt-2">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
