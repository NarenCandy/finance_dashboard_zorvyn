import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { useApp } from "../../context/AppContext"


const COLORS = ["#84d5c5", "#bdc2ff", "#ffb5a1", "#ffd166", "#06d6a0", "#118ab2"];


export default function Spending() {
  const { categoryData } = useApp()

  return (
    <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
      <div className="mb-6">
        <h3 className="font-headline font-bold text-on-surface">Spending Breakdown</h3>
        <p className="text-on-surface-variant text-xs mt-1">By category</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={categoryData} dataKey="amount" nameKey="category" cx="50%" cy="50%" innerRadius={55} outerRadius={90}>
            {categoryData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#2a2a2a", border: "none", borderRadius: "8px", color: "#e5e2e1" }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {categoryData.map((item, i) => (
          <div key={item.category} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wide">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}