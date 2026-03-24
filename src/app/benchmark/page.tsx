"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const mockData = [
  { month: "Jan", portfolio: 100, spy: 100 },
  { month: "Feb", portfolio: 105, spy: 102 },
  { month: "Mar", portfolio: 102, spy: 105 },
  { month: "Apr", portfolio: 110, spy: 108 },
  { month: "May", portfolio: 115, spy: 104 },
  { month: "Jun", portfolio: 112, spy: 109 },
  { month: "Jul", portfolio: 120, spy: 115 },
];

export default function BenchmarkPage() {
  const [data] = useState(mockData);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 pb-24">
      <header className="flex items-center gap-4">
        <Link href="/" className="touch-target flex items-center justify-center w-12 h-12 -ml-3 text-slate-400 hover:text-white rounded-full p-2 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Benchmark</h1>
          <p className="text-slate-400 text-sm">Portfolio vs S&P 500</p>
        </div>
      </header>

      <div className="bg-surface rounded-3xl p-6 surface-shadow border border-slate-700/30">
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPort" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8ab4f8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8ab4f8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSpy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Area type="monotone" dataKey="portfolio" name="My Portfolio" stroke="#8ab4f8" strokeWidth={3} fillOpacity={1} fill="url(#colorPort)" />
              <Area type="monotone" dataKey="spy" name="S&P 500 (SPY)" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorSpy)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="bg-surface rounded-3xl p-5 surface-shadow border border-slate-700/30">
           <h3 className="text-slate-400 text-sm">Portfolio YTD</h3>
           <div className="text-2xl font-bold text-primary mt-1">+20.0%</div>
        </div>
        <div className="bg-surface rounded-3xl p-5 surface-shadow border border-slate-700/30">
           <h3 className="text-slate-400 text-sm">SPY YTD</h3>
           <div className="text-2xl font-bold text-slate-200 mt-1">+15.0%</div>
        </div>
      </div>
    </div>
  );
}
