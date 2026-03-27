"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

const data = [
  { time: "Jan", value: 10000 },
  { time: "Feb", value: 11200 },
  { time: "Mar", value: 10800 },
  { time: "Apr", value: 13400 },
  { time: "May", value: 14500 },
  { time: "Jun", value: 14100 },
  { time: "Jul", value: 16800 },
  { time: "Aug", value: 18500 },
];

export default function DashboardChart() {
  return (
    <div className="w-full h-64 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8ab4f8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8ab4f8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(value) => `$${value / 1000}k`} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
            itemStyle={{ color: '#8ab4f8', fontWeight: 'bold' }}
            cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#8ab4f8" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorValue)" 
            activeDot={{ r: 6, fill: '#8ab4f8', stroke: '#0f172a', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
