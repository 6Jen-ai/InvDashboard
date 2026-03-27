"use client";

import dynamic from "next/dynamic";

const DashboardChart = dynamic(() => import("@/components/DashboardChart"), { ssr: false });

export default function ChartWrapper() {
  return <DashboardChart />;
}
