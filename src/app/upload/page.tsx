"use client";

import { useState } from "react";
import Papa from "papaparse";
import Link from "next/link";
import { ArrowLeft, UploadCloud, FileSpreadsheet, CheckCircle2 } from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setSuccess(false);

      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setData(results.data);
        },
      });
    }
  };

  const syncToFirestore = async () => {
    setLoading(true);
    // Simulate Firestore sync
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Synced data to firestore:", data);
    setLoading(false);
    setSuccess(true);
    setFile(null);
    setData([]);
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
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer touch-target"
              />
              <UploadCloud size={48} className="text-primary mb-3" />
              <h3 className="text-lg font-medium">Select a CSV file</h3>
              <p className="text-sm text-slate-400 mt-1 px-4">Ensure your CSV has headers: Date, Ticker, Quantity, Price, Fees, Type</p>
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
