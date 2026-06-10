"use client";

import { useEffect, useState } from "react";
import { Check, X, Clock, Search } from "lucide-react";
import { api_Response, API } from "@/Shared/Service/Api";
import type { BrandProfileRequest } from "../../Brand/types";

export function RequestsWorkspace() {
  const [requests, setRequests] = useState<BrandProfileRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api_Response(API.Brand.GetBrandProfileRequests, "GET");
      if (res && Array.isArray(res)) {
        setRequests(res);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id: string | undefined, status: string) => {
    if (!id) return;
    try {
      const endpoint = API.Brand.UpdateBrandProfileRequestStatus.replace("{id}", id);
      await api_Response(endpoint, "PUT", `"${status}"`, {
        "Content-Type": "application/json",
      });
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: status as any } : req))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(93,116,101,0.12)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--signal-blue)]">
            <Check size={12} strokeWidth={2} /> Đã duyệt
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(159,74,61,0.11)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--tailor-red)]">
            <X size={12} strokeWidth={2} /> Từ chối
          </span>
        );
      case "REVIEWING":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(154,116,71,0.13)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--brass)]">
            <Search size={12} strokeWidth={2} /> Đang xét
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(24,23,20,0.07)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]">
            <Clock size={12} strokeWidth={2} /> Chờ duyệt
          </span>
        );
    }
  };

  const filtered = requests.filter(
    (r) =>
      r.brandName.toLowerCase().includes(search.toLowerCase()) ||
      r.refCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="raidexi-shell rounded-[2.2rem] p-1.5">
      <div className="raidexi-core flex min-h-[30rem] flex-col rounded-[calc(2.2rem-0.375rem)] p-5">
        <header className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[var(--ink)]">Yêu cầu thương hiệu & số đo</h2>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">
              Quản lý và xét duyệt các yêu cầu thêm profile brand mới từ người dùng.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]"
              />
              <input
                type="text"
                placeholder="Tìm thương hiệu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 rounded-full border border-[rgba(24,23,20,0.1)] bg-[var(--surface-paper)] py-2 pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)]"
              />
            </div>
            <button
              onClick={fetchRequests}
              className="flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-bold text-[var(--surface-paper)] shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Làm mới
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(24,23,20,0.05)] text-[10px] font-bold uppercase tracking-widest text-[var(--ink-muted)]">
                <th className="pb-3 pl-4">Thương hiệu</th>
                <th className="pb-3">Phân loại</th>
                <th className="pb-3">Hệ size</th>
                <th className="pb-3">Người yêu cầu (Note)</th>
                <th className="pb-3">Trạng thái</th>
                <th className="pb-3 pr-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(24,23,20,0.05)]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[var(--ink-muted)]">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[var(--ink-muted)]">
                    Không tìm thấy yêu cầu nào.
                  </td>
                </tr>
              ) : (
                filtered.map((req) => (
                  <tr key={req.id} className="group transition-colors hover:bg-[rgba(24,23,20,0.02)]">
                    <td className="py-4 pl-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(24,23,20,0.04)] text-lg font-bold text-[var(--ink)]">
                          {req.brandName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-extrabold text-[var(--ink)]">{req.brandName}</p>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                            {req.refCode}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-bold text-[var(--ink)]">{req.category}</p>
                      <p className="text-xs text-[var(--ink-soft)]">{req.productType}</p>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex rounded border border-[rgba(24,23,20,0.1)] bg-[var(--surface-paper)] px-2 py-0.5 font-mono text-xs font-bold text-[var(--ink)]">
                        {req.sizeSystem}
                      </span>
                    </td>
                    <td className="py-4">
                      <p className="max-w-[200px] truncate text-xs text-[var(--ink-soft)]" title={req.requesterNote}>
                        {req.requesterNote || "Không có ghi chú"}
                      </p>
                    </td>
                    <td className="py-4">{getStatusBadge(req.status)}</td>
                    <td className="py-4 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {req.status === "PENDING" && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, "REVIEWING")}
                            className="rounded-full bg-[rgba(154,116,71,0.13)] px-3 py-1.5 text-xs font-bold text-[var(--brass)] transition-colors hover:bg-[rgba(154,116,71,0.2)]"
                          >
                            Duyệt thử
                          </button>
                        )}
                        {req.status !== "APPROVED" && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, "APPROVED")}
                            className="rounded-full bg-[rgba(93,116,101,0.12)] px-3 py-1.5 text-xs font-bold text-[var(--signal-blue)] transition-colors hover:bg-[rgba(93,116,101,0.2)]"
                          >
                            Chấp nhận
                          </button>
                        )}
                        {req.status !== "REJECTED" && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, "REJECTED")}
                            className="rounded-full bg-[rgba(159,74,61,0.11)] px-3 py-1.5 text-xs font-bold text-[var(--tailor-red)] transition-colors hover:bg-[rgba(159,74,61,0.2)]"
                          >
                            Từ chối
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
