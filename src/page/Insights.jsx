import React from 'react'
import { useApp } from "../context/AppContext"

export default function Insights() {
  const { data, monthlyData, categoryData } = useApp()

  if (categoryData.length < 2 || monthlyData.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-on-surface-variant">
        <span className="material-symbols-outlined text-4xl mb-3">bar_chart</span>
        <p className="text-sm">Not enough data to show insights</p>
        <p className="text-xs mt-1">Add more transactions to see insights</p>
      </div>
    )
  }

  // Highest spending category
  const highestCategory = categoryData.reduce(
    (max, c) => (c.amount > max.amount ? c : max),
    categoryData[0]
  )

  // Last two months
  const prevMonth = monthlyData[monthlyData.length - 1]
  const secondprevMonth = monthlyData[monthlyData.length - 2]

  // Expense & income change (compare prevMonth vs secondprevMonth)
  const expenseChange = (
    ((prevMonth.expenses - secondprevMonth.expenses) / secondprevMonth.expenses) * 100
  ).toFixed(1)

  const incomeChange = (
    ((prevMonth.income - secondprevMonth.income) / secondprevMonth.income) * 100
  ).toFixed(1)


  const totalIncome = data
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = data
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const savingsRate = (
    ((totalIncome - totalExpenses) / totalIncome) * 100
  ).toFixed(1)

  const insights = [
    {
      title: "Top Spending Category",
      icon: "category",
      color: "text-tertiary",
      bg: "bg-tertiary/10",
      value: highestCategory.category,
      sub: `₹${highestCategory.amount.toLocaleString()} total spent`,
    },
    {
      title: "Monthly Expense Change",
      icon: "trending_up",
      color: expenseChange > 0 ? "text-error" : "text-primary",
      bg: expenseChange > 0 ? "bg-error/10" : "bg-primary/10",
      value: `${expenseChange > 0 ? "+" : ""}${expenseChange}%`,
      sub: `vs previous month (${secondprevMonth.month})`,
    },
    {
      title: "Monthly Income Change",
      icon: "payments",
      color: incomeChange >= 0 ? "text-primary" : "text-error",
      bg: incomeChange >= 0 ? "bg-primary/10" : "bg-error/10",
      value: `${incomeChange > 0 ? "+" : ""}${incomeChange}%`,
      sub: `vs previous month (${secondprevMonth.month})`,
    },
    {
      title: "Savings Rate",
      icon: "savings",
      color: "text-secondary",
      bg: "bg-secondary/10",
      value: `${savingsRate}%`,
      sub: "of total income saved",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Insights</h1>
        <p className="text-on-surface-variant text-sm mt-1">Key observations from your financial data</p>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {insights.map(item => (
          <div key={item.title} className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{item.title}</p>
            </div>
            <p className={`font-headline text-3xl font-extrabold tracking-tight ${item.color}`}>{item.value}</p>
            <p className="text-xs text-on-surface-variant mt-2">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10">
        <div className="px-6 py-4 border-b border-outline-variant/10">
          <h3 className="font-headline font-bold text-on-surface">Monthly Breakdown</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-surface-container-lowest/50">
            <tr>
              {["Month", "Income", "Expenses", "Net"].map(h => (
                <th key={h} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {monthlyData.map(m => (
              <tr key={m.month} className="hover:bg-surface-bright transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-on-surface">{m.month}</td>
                <td className="px-6 py-4 text-sm text-primary font-medium">+₹{m.income.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-error font-medium">-₹{m.expenses.toLocaleString()}</td>
                <td className={`px-6 py-4 text-sm font-bold ${m.income - m.expenses > 0 ? "text-primary" : "text-error"}`}>
                  ₹{(m.income - m.expenses).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
