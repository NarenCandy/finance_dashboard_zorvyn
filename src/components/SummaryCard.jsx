import { useApp } from "../context/AppContext"


export default function SummaryCard(){
  const {summaryData}=useApp()
  const cards =[{
    label:"Total Balance",
    value:summaryData.totalBalance,
    icon:"account_balance_wallet",
    trend:"+5.2% ",
    trendUp:true,
    sub:"Funds settled"
  },
{
  label:"Total Income",
  value:summaryData.totalIncome,
  icon:"trending_up",
  trend:"+12.1% ",
  trendUp:true,
  sub:"All Time Income "
},
{
  label:"Total Expenses",
  value:summaryData.totalExpenses,
  icon:"trending_down",
  trend:"-3.4% ",
  trendUp:false,
  sub:"Monthly Expenses"
}]


  return(

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.label} className="bg-surface-container-high rounded-xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              {card.label}
            </span>
            <span className={`text-xs font-bold flex items-center gap-1 ${card.trendUp ? "text-primary" : "text-error"}`}>
              <span className="material-symbols-outlined text-sm">
                {card.trendUp ? "trending_up" : "trending_down"}
              </span>
              {card.trend}
            </span>
          </div>
          <p className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">
            ₹{card.value.toLocaleString()}
          </p>
          <p className="text-[10px] text-on-surface-variant mt-2 uppercase tracking-wider">
            {card.sub}
          </p>
        </div>
      ))}
    </div>
  )
    
}