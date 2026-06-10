"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2, XCircle, AlertCircle, RefreshCw, Send } from "lucide-react";
import { brandApi } from "@/features/Brand/api/brandApi";
import { BrandProfileRequest } from "@/features/Brand/types";

export function MyBrandRequests() {
  const [requests, setRequests] = useState<BrandProfileRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await brandApi.getMyBrandProfileRequests();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch brand requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status?: string) => {
    switch (status) {
      case "APPROVED":
        return { label: "Đã duyệt", color: "text-emerald-600 bg-emerald-50 ring-emerald-500/20", icon: CheckCircle2 };
      case "REJECTED":
        return { label: "Từ chối", color: "text-red-600 bg-red-50 ring-red-500/20", icon: XCircle };
      case "REVIEWING":
        return { label: "Đang xem xét", color: "text-blue-600 bg-blue-50 ring-blue-500/20", icon: AlertCircle };
      case "PENDING":
      default:
        return { label: "Chờ duyệt", color: "text-amber-600 bg-amber-50 ring-amber-500/20", icon: Clock };
    }
  };

  if (loading) {
    return (
      <div className="rx-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="rx-skeleton h-8 w-8 rounded-full" />
          <div className="rx-skeleton h-6 w-40" />
        </div>
        <div className="space-y-4">
          <div className="rx-skeleton h-16 w-full rounded-2xl" />
          <div className="rx-skeleton h-16 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rx-card p-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--signal-blue)]/10 text-[var(--signal-blue)]">
              <Send size={18} strokeWidth={1.35} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[var(--ink)]">Yêu cầu thương hiệu</h3>
              <p className="text-xs text-[var(--ink-muted)]">Theo dõi trạng thái các thương hiệu bạn đã gửi</p>
            </div>
          </div>
          <button onClick={fetchRequests} className="rx-icon-btn h-8 w-8 transition hover:bg-[rgba(24,23,20,0.06)]">
            <RefreshCw size={14} strokeWidth={1.35} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center border-t border-[rgba(24,23,20,0.08)]">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(24,23,20,0.04)] text-[var(--ink-muted)]">
            <Send size={24} strokeWidth={1.2} />
          </div>
          <p className="font-bold text-[var(--ink)]">Chưa có yêu cầu nào</p>
          <p className="mt-1 max-w-sm text-xs text-[var(--ink-muted)]">Bạn chưa gửi yêu cầu tạo hồ sơ kích thước cho thương hiệu nào. Hãy khám phá và kết nối với các thương hiệu nhé!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rx-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--signal-blue)]/10 text-[var(--signal-blue)]">
            <Send size={18} strokeWidth={1.35} />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[var(--ink)]">Yêu cầu thương hiệu</h3>
            <p className="text-xs text-[var(--ink-muted)]">Theo dõi trạng thái các thương hiệu bạn đã gửi</p>
          </div>
        </div>
        <button onClick={fetchRequests} className="rx-icon-btn h-8 w-8 transition hover:bg-[rgba(24,23,20,0.06)]">
          <RefreshCw size={14} strokeWidth={1.35} />
        </button>
      </div>

      <div className="grid gap-3">
        {requests.map((req) => {
          const config = getStatusConfig(req.status);
          const Icon = config.icon;
          return (
            <div key={req.id} className="flex flex-col gap-3 rounded-2xl border border-[rgba(24,23,20,0.08)] bg-[rgba(24,23,20,0.015)] p-4 sm:flex-row sm:items-center sm:justify-between transition hover:border-[rgba(24,23,20,0.15)] hover:bg-[rgba(24,23,20,0.03)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--ink)]">{req.brandName}</span>
                  <span className="font-mono text-[10px] text-[var(--ink-muted)] uppercase bg-[rgba(24,23,20,0.06)] px-2 py-0.5 rounded-full">{req.category}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-3 font-mono text-xs text-[var(--ink-soft)]">
                  <span>Mã: {req.refCode}</span>
                  <span>&middot;</span>
                  <span>{req.createdAt ? new Date(req.createdAt).toLocaleDateString("vi-VN") : "—"}</span>
                </div>
              </div>
              
              <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${config.color} sm:self-center w-fit`}>
                <Icon size={13} strokeWidth={2} />
                {config.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
