"use client";

import { useState } from "react";
import { cn, formatTickerForApi } from "@/lib/utils";

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    ticker: "",
    quantity: "",
    price: "",
    fees: "0",
    type: "BUY", // BUY or SELL
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect Firebase Firestore
    const formattedTicker = formatTickerForApi(formData.ticker);
    console.log("Submitting transaction", { ...formData, ticker: formattedTicker });
    alert(`Transaction added for ${formattedTicker}!`);
    setFormData(prev => ({ ...prev, ticker: "", quantity: "", price: "", fees: "0" }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 bg-surface surface-shadow rounded-3xl max-w-md w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold mb-2 tracking-tight">New Transaction</h2>
      
      <div className="flex bg-[#0f172a] rounded-2xl overflow-hidden touch-target p-1.5 surface-shadow">
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, type: "BUY" }))}
          className={cn("flex-1 touch-target rounded-xl font-semibold transition-all duration-300", formData.type === "BUY" ? "bg-success text-white shadow-md transform scale-[1.02]" : "text-slate-400 hover:bg-[#1e293b]")}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, type: "SELL" }))}
          className={cn("flex-1 touch-target rounded-xl font-semibold transition-all duration-300", formData.type === "SELL" ? "bg-danger text-white shadow-md transform scale-[1.02]" : "text-slate-400 hover:bg-[#1e293b]")}
        >
          Sell
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-300 ml-1">Date</label>
        <input 
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="touch-target bg-[#0f172a] border border-slate-700/50 rounded-2xl px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full text-white transition-all duration-300"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-300 ml-1">Ticker (e.g. AAPL or 2330.TW)</label>
        <input 
          type="text"
          name="ticker"
          value={formData.ticker.toUpperCase()}
          onChange={handleChange}
          required
          placeholder="AAPL"
          className="touch-target bg-[#0f172a] border border-slate-700/50 rounded-2xl px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full text-white placeholder-slate-500 uppercase transition-all duration-300 font-mono tracking-wider"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300 ml-1">Price</label>
          <input 
            type="number"
            step="any"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="0.00"
            className="touch-target bg-[#0f172a] border border-slate-700/50 rounded-2xl px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full text-white placeholder-slate-500 transition-all duration-300 font-mono"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300 ml-1">Quantity</label>
          <input 
            type="number"
            step="any"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            placeholder="0"
            className="touch-target bg-[#0f172a] border border-slate-700/50 rounded-2xl px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full text-white placeholder-slate-500 transition-all duration-300 font-mono"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-300 ml-1">Fees</label>
        <input 
          type="number"
          step="any"
          name="fees"
          value={formData.fees}
          onChange={handleChange}
          placeholder="0.00"
          className="touch-target bg-[#0f172a] border border-slate-700/50 rounded-2xl px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full text-white placeholder-slate-500 transition-all duration-300 font-mono"
        />
      </div>

      <button type="submit" className="touch-target bg-primary text-[#0f172a] font-bold text-lg rounded-2xl mt-4 hover:bg-[#a6c8ff] transition-colors active:scale-[0.98] shadow-lg shadow-primary/20">
        Record Entry
      </button>
    </form>
  );
}
