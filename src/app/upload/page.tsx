"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import Link from "next/link";
import { ArrowLeft, UploadCloud, FileSpreadsheet, CheckCircle2, Download } from "lucide-react";
import { formatTickerForApi } from "@/lib/utils";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [firebaseAuth, setFirebaseAuth] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [firebaseDb, setFirebaseDb] = useState<any>(null);

  useEffect(() => {
    // Dynamically load firebase to prevent SSR execution
    let isMounted = true;
    import("@/lib/firebase").then((fb) => {
      if (isMounted) {
        setFirebaseAuth(fb.auth);
        setFirebaseDb(fb.db);
        setFirebaseLoaded(true);
      }
    }).catch(err => console.error("Failed to load Firebase", err));

    return () => { isMounted = false; };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setSuccess(false);

      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setData(results.data as any[]);
        },
      });
    }
  };

  const syncToFirestore = async () => {
    if (!firebaseLoaded) {
      alert("Firebase is still loading. Please try again.");
      return;
    }
    
    if (!firebaseAuth?.currentUser) {
      alert("Error: You must be logged in to sync transactions.");
      return;
    }

    setLoading(true);
    try {
      const { writeBatch, doc, collection } = await import("firebase/firestore");
      const db = firebaseDb;
      const batch = writeBatch(db);
      const userTransactionsRef = collection(db, "users", firebaseAuth.currentUser.uid, "transactions");

      data.forEach((row) => {
        if (!row.Date || !row.Ticker) return;

        const newDocRef = doc(userTransactionsRef);
        batch.set(newDocRef, {
          date: row.Date,
          ticker: formatTickerForApi(row.Ticker),
          type: row.Type?.toUpperCase() || "BUY",
          quantity: Number(row.Quantity) || 0,
          price: Number(row.Price) || 0,
          fees: Number(row.Fees) || 0,
          createdAt: new Date().toISOString(),
        });
      });

      await batch.commit();
      setSuccess(true);
      setFile(null);
      setData([]);
    } catch (error) {
      console.error("Error syncing to Firestore:", error);
      alert("Failed to sync data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 pb-24">
      <header className="flex items-center gap-4">
        <Link href="/" className="touch-target flex items-center justify-center w-12 h-12 -ml-3 text-slate-400 hover:text-white rounded-full p-2 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Bulk Upload</h1>
          <p className="text-slate-400 text-sm">Import your transaction history</p>
        </div>
      </header>

      <div className="bg-surface rounded-3xl p-6 surface-shadow flex flex-col gap-6 max-w-lg mx-auto w-full mt-4">
        {!success ? (
          <>
            <div className="relative border-2 border-dashed border-slate-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors bg-[#0f172a]/50">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer touch-target z-10"
              />
              <UploadCloud size={48} className="text-primary mb-3" />
              <h3 className="text-lg font-medium">Select a CSV file</h3>
              <p className="text-sm text-slate-400 mt-1 px-4 mb-4">Ensure your CSV has headers: Date, Ticker, Type, Quantity, Price, Fees</p>
              
              <a
                href="/template.csv"
                download
                className="z-20 relative flex items-center gap-2 touch-target bg-[#1e293b] text-sm text-slate-300 px-4 py-2 rounded-xl hover:bg-[#2a3a54] hover:text-white transition-colors border border-slate-700 mt-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={16} />
                Download Template
              </a>
              <p className="text-xs text-slate-500 mt-3 max-w-[250px]">
                Tip: Tickers can be US (e.g., <strong>AAPL</strong>) or Taiwan (e.g., <strong>0050.TW</strong>). Numeric-only tickers will automatically be assigned to Taiwan.
              </p>
            </div>

            {file && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 bg-[#0f172a] p-4 rounded-xl border border-slate-700/50">
                  <FileSpreadsheet className="text-success" />
                  <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                    <div className="font-medium text-sm">{file.name}</div>
                    <div className="text-xs text-slate-500">{data.length} records found</div>
                  </div>
                </div>

                <button
                  onClick={syncToFirestore}
                  disabled={loading || data.length === 0}
                  className="touch-target bg-primary text-[#0f172a] font-bold text-lg rounded-2xl w-full hover:bg-[#a6c8ff] transition-all active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-[#0f172a] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Sync to Firestore"
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
            <CheckCircle2 size={64} className="text-success mb-4" />
            <h3 className="text-xl font-bold mb-2">Upload Successful</h3>
            <p className="text-slate-400 mb-6">Your transactions have been securely synchronized to your ledger.</p>
            <button
              onClick={() => setSuccess(false)}
              className="touch-target bg-[#0f172a] border border-slate-700 text-white font-medium rounded-xl px-6 py-2 hover:bg-slate-800 transition-colors"
            >
              Upload Another File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
