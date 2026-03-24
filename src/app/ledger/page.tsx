import TransactionForm from "@/components/TransactionForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LedgerPage() {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 pb-24">
      <header className="flex items-center gap-4">
        <Link href="/" className="touch-target flex items-center justify-center w-12 h-12 -ml-3 text-slate-400 hover:text-white rounded-full p-2 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Ledger</h1>
          <p className="text-slate-400 text-sm">Add manual transactions</p>
        </div>
      </header>
      
      <TransactionForm />
    </div>
  );
}
