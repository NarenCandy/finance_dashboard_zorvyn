import SummaryCards from "../components/SummaryCard"
import BalanceTrack from "../components/chart/BalanceTrack"
import Spending from "../components/chart/Spending"
import { useApp } from "../context/AppContext"

export default function Dashboard() {
  const { data, setPage } = useApp()
  const recent = data.slice(0, 5)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Financial Overview</h1>
        <p className="text-on-surface-variant text-sm mt-1">Track your income, expenses and balance</p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BalanceTrack/>
        <Spending />
      </div>

      <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10">
        <div className="px-6 py-4 flex justify-between items-center border-b border-outline-variant/10">
          <h3 className="font-headline font-bold text-on-surface">Recent Transactions</h3>
          <button onClick={() => setPage("transactions")} className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">
            View All
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-surface-container-lowest/50">
            <tr>
              {["Date", "Description", "Category", "Amount"].map(h => (
                <th key={h} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {recent.map(t => (
              <tr key={t.id} className="hover:bg-surface-bright transition-colors">
                <td className="px-6 py-4 text-xs text-on-surface-variant">{t.date}</td>
                <td className="px-6 py-4 text-sm font-semibold text-on-surface">{t.description}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-surface-container-highest rounded-full text-[10px] font-bold text-on-surface-variant uppercase">{t.category}</span>
                </td>
                <td className={`px-6 py-4 text-sm font-bold ${t.type === "income" ? "text-primary" : "text-error"}`}>
                  {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
