import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { useApp } from "../../context/AppContext"



export default function BalanceTrack(){
  const {monthlyData}=useApp()
  return(
    <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
      <div className="mb-6">
        <h3 className="font-headline font-bold text-on-surface">Growth Trajectory</h3>
        <p className="text-on-surface-variant text-xs mt-1">Monthly income vs expenses</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f4945" />
          <XAxis dataKey="month" tick={{ fill: "#bfc9c4", fontSize: 11 }} />
          <YAxis tick={{ fill: "#bfc9c4", fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: "#2a2a2a", border: "none", borderRadius: "8px", color: "#e5e2e1" }} />
          <Line type="monotone" dataKey="income" stroke="#84d5c5" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="expenses" stroke="#ffb5a1" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-xs text-on-surface-variant">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-tertiary"></div>
          <span className="text-xs text-on-surface-variant">Expenses</span>
        </div>
      </div>

    </div>
  )
}