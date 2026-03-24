"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";

export default function PerformancePage() {
  const assets = [
    { ticker: "AAPL", shares: 100, avgCost: 150, currentPrice: 175, realized: 500 },
    { ticker: "2330.TW", shares: 1000, avgCost: 600, currentPrice: 750, realized: 0 },
    { ticker: "TSLA", shares: 50, avgCost: 250, currentPrice: 200, realized: -200 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 pb-24">
      <header className="flex items-center gap-4">
        <Link href="/" className="touch-target flex items-center justify-center w-12 h-12 -ml-3 text-slate-400 hover:text-white rounded-full p-2 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Performance</h1>
          <p className="text-slate-400 text-sm">Realized & Unrealized Gains</p>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {assets.map((asset) => {
          const totalCost = asset.shares * asset.avgCost;
          const currentValue = asset.shares * asset.currentPrice;
          const unrealized = currentValue - totalCost;
          const unrealizedPercent = (unrealized / totalCost) * 100;
          const defaultIsPositive = unrealized >= 0;

          return (
            <div key={asset.ticker} className="bg-surface rounded-3xl p-5 surface-shadow border border-slate-700/30 flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                <div className="font-bold font-mono text-lg">{asset.ticker}</div>
                <div className="text-slate-400 text-sm">{asset.shares} Shares</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-500">Unrealized Gain</div>
                  <div className={`font-bold text-lg flex items-center gap-1 ${defaultIsPositive ? 'text-success' : 'text-danger'}`}>
                    {defaultIsPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    ${Math.abs(unrealized).toLocaleString()} ({unrealizedPercent.toFixed(2)}%)
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Realized Gain</div>
                  <div className={`font-bold text-lg ${asset.realized >= 0 ? 'text-success' : 'text-danger'}`}>
                    ${asset.realized.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Avg Cost</div>
                  <div className="font-medium">${asset.avgCost.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-slate-500">Current Price</div>
                  <div className="font-medium">${asset.currentPrice.toFixed(2)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
