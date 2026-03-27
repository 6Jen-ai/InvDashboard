import Link from "next/link";
import { PlusCircle, Upload, PieChart, BarChart3, TrendingUp, DollarSign, Activity, RefreshCw } from "lucide-react";
import ChartWrapper from "@/components/ChartWrapper";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500 pb-28 pt-4">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold mb-2 tracking-tight">Dashboard</h1>
          <p className="text-slate-400">Welcome back to your portfolio.</p>
        </div>
        <button className="touch-target p-3 bg-surface surface-shadow rounded-full text-slate-400 hover:text-white transition-colors active:rotate-180 duration-500">
          <RefreshCw size={24} />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-surface rounded-3xl p-6 surface-shadow flex flex-col justify-center border border-slate-700/30">
          <h2 className="text-sm text-slate-400 mb-1 font-medium">Total Balance</h2>
          <div className="text-4xl font-bold tracking-tight font-mono">$0.00</div>
        </div>
        <div className="bg-surface rounded-3xl p-6 surface-shadow flex flex-col justify-center border border-slate-700/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={64} />
          </div>
          <h2 className="text-sm text-slate-400 mb-1 font-medium">Unrealized Gains</h2>
          <div className="text-4xl font-bold tracking-tight text-success font-mono">+$0.00</div>
        </div>
        <Link href="/dividends" className="bg-surface rounded-3xl p-6 surface-shadow flex flex-col justify-center border border-slate-700/30 hover:bg-[#2a3a54] transition-colors touch-target">
          <h2 className="text-sm text-slate-400 mb-1 font-medium">Dividends (YTD)</h2>
          <div className="text-4xl font-bold tracking-tight text-primary font-mono">$0.00</div>
        </Link>
      </div>

      <div className="bg-surface rounded-3xl p-6 surface-shadow border border-slate-700/30">
        <h2 className="text-xl font-semibold tracking-tight">Portfolio Performance</h2>
        <ChartWrapper />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Link href="/ledger" className="bg-surface rounded-2xl p-5 surface-shadow flex flex-col items-center gap-3 hover:bg-[#2a3a54] transition-all touch-target border border-transparent hover:border-primary/30 active:scale-[0.98]">
            <div className="bg-[#0f172a] p-3 rounded-2xl w-full flex justify-center">
              <PlusCircle className="text-primary w-7 h-7" />
            </div>
            <span className="font-semibold mt-1">Add Entry</span>
          </Link>
          <Link href="/upload" className="bg-surface rounded-2xl p-5 surface-shadow flex flex-col items-center gap-3 hover:bg-[#2a3a54] transition-all touch-target border border-transparent hover:border-primary/30 active:scale-[0.98]">
            <div className="bg-[#0f172a] p-3 rounded-2xl w-full flex justify-center">
              <Upload className="text-primary w-7 h-7" />
            </div>
            <span className="font-semibold mt-1">Upload</span>
          </Link>
          <Link href="/performance" className="bg-surface rounded-2xl p-5 surface-shadow flex flex-col items-center gap-3 hover:bg-[#2a3a54] transition-all touch-target border border-transparent hover:border-primary/30 active:scale-[0.98]">
             <div className="bg-[#0f172a] p-3 rounded-2xl w-full flex justify-center">
              <Activity className="text-primary w-7 h-7" />
            </div>
            <span className="font-semibold mt-1">Performance</span>
          </Link>
          <Link href="/rebalance" className="bg-surface rounded-2xl p-5 surface-shadow flex flex-col items-center gap-3 hover:bg-[#2a3a54] transition-all touch-target border border-transparent hover:border-primary/30 active:scale-[0.98]">
             <div className="bg-[#0f172a] p-3 rounded-2xl w-full flex justify-center">
              <PieChart className="text-primary w-7 h-7" />
            </div>
            <span className="font-semibold mt-1">Rebalance</span>
          </Link>
          <Link href="/benchmark" className="bg-surface rounded-2xl p-5 surface-shadow flex flex-col items-center gap-3 hover:bg-[#2a3a54] transition-all touch-target border border-transparent hover:border-primary/30 active:scale-[0.98]">
             <div className="bg-[#0f172a] p-3 rounded-2xl w-full flex justify-center">
              <BarChart3 className="text-primary w-7 h-7" />
            </div>
            <span className="font-semibold mt-1">Benchmark</span>
          </Link>
          <Link href="/dividends" className="bg-surface rounded-2xl p-5 surface-shadow flex flex-col items-center gap-3 hover:bg-[#2a3a54] transition-all touch-target border border-transparent hover:border-primary/30 active:scale-[0.98]">
             <div className="bg-[#0f172a] p-3 rounded-2xl w-full flex justify-center">
              <DollarSign className="text-primary w-7 h-7" />
            </div>
            <span className="font-semibold mt-1">Dividends</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
