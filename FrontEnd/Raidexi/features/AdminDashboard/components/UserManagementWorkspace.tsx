"use client";

import { Mail, MoreHorizontal, Search, UserCheck, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { userSegments } from "../constants";
import { AdminPill } from "./AdminPill";

const users = [
  { name: "Minh Anh", email: "minhanh@mail.com", segment: "Đã đo", profile: "96%", action: "Gửi gợi ý size" },
  { name: "Hoàng Nam", email: "nam.fit@mail.com", segment: "Thiếu hồ sơ", profile: "42%", action: "Nhắc hoàn tất đo" },
  { name: "Linh Chi", email: "linhchi@mail.com", segment: "Mua lại", profile: "91%", action: "Mở lịch sử fit" },
  { name: "Gia Hân", email: "giahan@mail.com", segment: "Người mới", profile: "68%", action: "Gửi onboarding" },
];

export function UserManagementWorkspace() {
  const [activeSegment, setActiveSegment] = useState(userSegments[0].label);

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <div className="raidexi-shell rounded-[2rem] p-1.5">
        <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <AdminPill>Quản lý người dùng</AdminPill>
              <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[var(--ink)]">
                Phân loại và chăm sóc
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">
                Tập trung vào trạng thái hồ sơ fit của từng người để chọn hành động phù hợp: nhắc đo, gửi gợi ý hoặc mở lịch sử.
              </p>
            </div>
            <button
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 text-sm font-bold text-[var(--surface-paper)]"
              type="button"
            >
              <UserRoundPlus size={16} strokeWidth={1.15} />
              Thêm tài khoản
            </button>
          </div>

          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-full border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.62)] px-4 text-sm text-[var(--ink-muted)]">
              <Search size={15} strokeWidth={1.15} />
              <input className="w-full bg-transparent outline-none" placeholder="Tìm tên, email hoặc trạng thái hồ sơ..." />
            </label>
            <select className="min-h-12 rounded-full border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.72)] px-4 text-sm font-bold text-[var(--ink)] outline-none">
              <option>Tất cả trạng thái</option>
              <option>Đã đo</option>
              <option>Thiếu hồ sơ</option>
              <option>Mua lại</option>
            </select>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[rgba(24,23,20,0.08)]">
            {users.map((user) => (
              <article
                key={user.email}
                className="grid gap-4 border-b border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.5)] p-4 last:border-b-0 md:grid-cols-[1.2fr_0.7fr_0.5fr_auto]"
              >
                <div>
                  <p className="text-sm font-extrabold text-[var(--ink)]">{user.name}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-[var(--ink-muted)]">
                    <Mail size={13} strokeWidth={1.15} />
                    {user.email}
                  </p>
                </div>
                <span className="self-center rounded-full bg-[rgba(93,116,101,0.11)] px-3 py-1 text-xs font-bold text-[var(--signal-blue)]">
                  {user.segment}
                </span>
                <p className="self-center font-serif text-3xl font-light text-[var(--ink)]">{user.profile}</p>
                <button
                  className="self-center rounded-full border border-[rgba(24,23,20,0.1)] px-4 py-2 text-xs font-bold text-[var(--ink)] transition-colors hover:bg-[rgba(24,23,20,0.06)]"
                  type="button"
                >
                  {user.action}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-5">
        <section className="raidexi-shell rounded-[2rem] p-1.5">
          <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-5">
            <AdminPill>Segment</AdminPill>
            <div className="mt-5 space-y-2">
              {userSegments.map((segment) => {
                const isActive = segment.label === activeSegment;

                return (
                  <button
                    key={segment.label}
                    className={`w-full rounded-[1.2rem] border p-4 text-left transition-all ${
                      isActive
                        ? "border-[rgba(93,116,101,0.34)] bg-[rgba(93,116,101,0.12)]"
                        : "border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.5)] hover:bg-[rgba(24,23,20,0.04)]"
                    }`}
                    onClick={() => setActiveSegment(segment.label)}
                    type="button"
                  >
                    <span className="block text-sm font-extrabold text-[var(--ink)]">{segment.label}</span>
                    <span className="mt-2 block font-serif text-4xl font-light text-[var(--signal-blue)]">{segment.value}</span>
                    <span className="mt-1 block text-xs leading-5 text-[var(--ink-muted)]">{segment.detail}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="raidexi-shell rounded-[2rem] p-1.5">
          <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-5">
            <UserCheck size={20} strokeWidth={1.15} className="text-[var(--signal-blue)]" />
            <h3 className="mt-4 font-serif text-3xl font-light leading-none text-[var(--ink)]">Tác vụ nhanh</h3>
            <div className="mt-5 space-y-2">
              {["Gửi nhắc hoàn tất đo", "Xuất danh sách người dùng", "Tạo nhóm chăm sóc"].map((item) => (
                <button
                  key={item}
                  className="flex w-full items-center justify-between rounded-full border border-[rgba(24,23,20,0.09)] px-4 py-3 text-xs font-bold text-[var(--ink)] hover:bg-[rgba(24,23,20,0.05)]"
                  type="button"
                >
                  {item}
                  <MoreHorizontal size={14} strokeWidth={1.15} />
                </button>
              ))}
            </div>
          </div>
        </section>
      </aside>
    </section>
  );
}
