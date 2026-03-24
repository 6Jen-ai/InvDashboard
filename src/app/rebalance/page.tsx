"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RebalancePage() {
  const [assets, setAssets] = useState([
    { ticker: "AAPL", currentValue: 15000, targetPercent: 40 },
    { ticker: "2330.TW", currentValue: 8000, targetPercent: 30 },
    { ticker: "VOO", currentValue: 12000, targetPercent: 30 },
  ]);

  const totalValue = assets.reduce((acc, a) => acc + a.currentValue, 0);

  const totalTargetPercent = assets.reduce((acc, a) => acc + a.targetPercent, 0);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 pb-24">
      <header className="flex items-center gap-4">
        <Link href="/" className="touch-target flex items-center justify-center w-12 h-12 -ml-3 text-slate-400 hover:text-white rounded-full p-2 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Rebalance</h1>
          <p className="text-slate-400 text-sm">Target vs Current Allocations</p>
        </div>
      </header>

      {totalTargetPercent !== 100 && (
        <div className="bg-danger/10 border border-danger/30 text-danger rounded-2xl p-4 flex gap-3 text-sm">
          <AlertCircle className="shrink-0" />
          <p>Your target percentages add up to {totalTargetPercent}%. They must equal exactly 100%.</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {assets.map((asset, i) => {
          const currentPercent = (asset.currentValue / totalValue) * 100;
          const targetValue = (totalValue * asset.targetPercent) / 100;
          const difference = targetValue - asset.currentValue;
          const isBuy = difference > 0;

          return (
            <div key={asset.ticker} className="bg-surface rounded-3xl p-5 surface-shadow border border-slate-700/30 flex flex-col gap-3">
              <div className="flex justify-between items-center bg-[#0f172a] p-3 rounded-2xl border border-slate-700/50">
                <div className="font-bold font-mono text-lg">{asset.ticker}</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={asset.targetPercent}
                    onChange={(e) => {
                      const newAssets = [...assets];
                      newAssets[i].targetPercent = Number(e.target.value);
                      setAssets(newAssets);
                    }}
                    className="bg-transparent border-b border-slate-500 w-12 text-center text-primary font-bold focus:outline-none focus:border-primary no-spin-buttons"
                  />
                  <span className="text-slate-400">%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mt-1">
                <div>
                  <div className="text-slate-500">Current Value</div>
                  <div className="font-medium">${asset.currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({currentPercent.toFixed(1)}%)</div>
                </div>
                <div>
                  <div className="text-slate-500">Target Value</div>
                  <div className="font-medium">${targetValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>

              <div className={cn("mt-2 p-3 rounded-xl flex items-center justify-between font-medium", isBuy ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                <span>{isBuy ? "To Buy" : "To Sell"}</span>
                <span className="font-mono tracking-wider">${Math.abs(difference).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="touch-target bg-[#1e293b] border border-slate-700 text-white font-semibold rounded-2xl mt-2 w-full hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
        <RefreshCw size={18} />
        Refresh Prices
      </button>
    </div>
  );
}
