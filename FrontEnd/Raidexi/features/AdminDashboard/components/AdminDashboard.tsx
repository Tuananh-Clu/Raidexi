"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useRouterService } from "@/Shared/Service/routerService";
import type { AdminTabKey } from "../constants";
import { metrics } from "../constants";
import { AdminHero } from "./AdminHero";
import { AdminSidebar } from "./AdminSidebar";
import { AiControlWorkspace } from "./AiControlWorkspace";
import { BrandTable } from "./BrandTable";
import { BrandLogicWorkspace } from "./BrandLogicWorkspace";
import { FitProfileWorkspace } from "./FitProfileWorkspace";
import { MetricCard } from "./MetricCard";
import { OperationsPanel } from "./OperationsPanel";
import { QualityPanel } from "./QualityPanel";
import { TimelinePanel } from "./TimelinePanel";
import { UserManagementWorkspace } from "./UserManagementWorkspace";
import { VolumeChart } from "./VolumeChart";

function MetricsGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </section>
  );
}

function OverviewTab() {
  return (
    <>
      <MetricsGrid />
      <section className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <VolumeChart />
        <OperationsPanel />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <BrandTable />
        <div className="space-y-5">
          <TimelinePanel />
          <QualityPanel />
        </div>
      </section>
    </>
  );
}

function UsersTab() {
  return <UserManagementWorkspace />;
}

function ProfilesTab() {
  return <FitProfileWorkspace />;
}

function BrandsTab() {
  return <BrandLogicWorkspace />;
}

function AiTab() {
  return <AiControlWorkspace />;
}

function renderTab(activeTab: AdminTabKey) {
  switch (activeTab) {
    case "users":
      return <UsersTab />;
    case "profiles":
      return <ProfilesTab />;
    case "brands":
      return <BrandsTab />;
    case "ai":
      return <AiTab />;
    case "overview":
    default:
      return <OverviewTab />;
  }
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTabKey>("overview");
  const auth = useContext(AuthContext);
  const { navigate } = useRouterService();
  const adminName = auth?.userData?.fullName || auth?.userData?.username || auth?.userData?.email || "Admin";

  const logout = async () => {
    if (auth?.AuthLogout) {
      await auth.AuthLogout();
      return;
    }

    navigate("/Login");
  };

  return (
    <main
      className="min-h-[100dvh] overflow-x-hidden bg-[var(--surface-canvas)] px-4 py-4 text-[var(--ink)] md:px-6"
      style={{
        background:
          "radial-gradient(circle at 18% 8%, rgba(93,116,101,0.1), transparent 30%), radial-gradient(circle at 88% 18%, rgba(154,116,71,0.13), transparent 28%), linear-gradient(180deg, var(--surface-paper) 0%, var(--surface-canvas) 48%, var(--surface-linen) 100%)",
      }}
    >
      <div className="mx-auto grid max-w-[92rem] gap-5 lg:grid-cols-[18rem_1fr]">
        <AdminSidebar activeTab={activeTab} name={adminName} onLogout={logout} onTabChange={setActiveTab} />

        <section className="min-w-0 overflow-hidden">
          <AdminHero activeTab={activeTab} />
          <div key={activeTab} className="mt-5 space-y-5 motion-safe:animate-[rx-admin-tab_520ms_cubic-bezier(0.32,0.72,0,1)]">
            {renderTab(activeTab)}
          </div>
        </section>
      </div>
    </main>
  );
}
