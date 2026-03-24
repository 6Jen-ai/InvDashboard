"use client";

import Link from "next/link";
import { ArrowLeft, Plus, DollarSign } from "lucide-react";

export default function DividendsPage() {
  const dividends = [
    { id: 1, date: "2026-03-15", ticker: "AAPL", amount: 24.50 },
    { id: 2, date: "2026-02-28", ticker: "VOO", amount: 135.20 },
    { id: 3, date: "2026-01-15", ticker: "2330.TW", amount: 350.00 }, // Converted or native currency
  ];

  const totalDividends = dividends.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 pb-24">
      <header className="flex items-center gap-4">
        <Link href="/" className="touch-target flex items-center justify-center w-12 h-12 -ml-3 text-slate-400 hover:text-white rounded-full p-2 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight">Dividends</h1>
          <p className="text-slate-400 text-sm">Passive income tracker</p>
        </div>
        <button className="touch-target bg-primary text-[#0f172a] rounded-full p-3 hover:bg-[#a6c8ff] transition-transform active:scale-95 shadow-lg shadow-primary/20">
          <Plus size={24} />
        </button>
      </header>

      <div className="bg-surface rounded-3xl p-6 surface-shadow border border-slate-700/30 flex items-center gap-4">
        <div className="bg-[#0f172a] p-4 rounded-2xl text-primary">
          <DollarSign size={32} />
        </div>
        <div>
          <h2 className="text-sm text-slate-400 font-medium mb-1">Total Dividends (YTD)</h2>
          <div className="text-3xl font-bold tracking-tight font-mono">${totalDividends.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <h3 className="text-lg font-semibold mb-1">Recent Payouts</h3>
        {dividends.map((div) => (
          <div key={div.id} className="bg-surface rounded-2xl p-4 surface-shadow flex justify-between items-center border border-slate-700/30">
            <div className="flex flex-col">
              <span className="font-bold font-mono text-lg">{div.ticker}</span>
              <span className="text-slate-400 text-sm">{new Date(div.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</span>
            </div>
            <div className="text-xl font-bold text-success font-mono">
              +${div.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
