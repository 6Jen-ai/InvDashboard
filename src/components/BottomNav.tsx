"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", scroll: false, icon: LayoutDashboard },
    { href: "/ledger", label: "Ledger", scroll: false, icon: Wallet },
    { href: "/rebalance", label: "Rebalance", scroll: false, icon: PieChart },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-surface/90 backdrop-blur-xl surface-shadow pb-[env(safe-area-inset-bottom)] z-50 md:hidden border-t border-slate-700/50">
      <div className="flex justify-around items-center p-2">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-14 touch-target transition-colors",
                isActive ? "text-primary" : "text-slate-400 hover:text-white"
              )}
            >
              <div className={cn("p-1.5 rounded-full mb-0.5 transition-all duration-300", isActive && "bg-primary/10")}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
