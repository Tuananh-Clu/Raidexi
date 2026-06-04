"use client";

import { FormEvent, useMemo, useState } from "react";
import { Building2, Send, X } from "lucide-react";
import { brandApi } from "../api/brandApi";
import { BrandProfileRequest } from "../types";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";

const categoryOptions = [
  { label: "Việt Nam", value: "Vietnam" },
  { label: "Quốc tế", value: "International" },
];

const productOptions = [
  { label: "Áo", value: "top" },
  { label: "Quần", value: "bottom" },
  { label: "Đầm", value: "dress" },
  { label: "Nhiều nhóm hàng", value: "mixed" },
];

const sizeSystems = ["VN", "US", "UK", "EU", "JP", "KR"];

export function BrandProfileRequestForm({
  initialBrandName,
  onClose,
}: {
  initialBrandName: string;
  onClose: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<BrandProfileRequest>({
    brandName: initialBrandName === "Yêu cầu thương hiệu mới" ? "" : initialBrandName,
    refCode: "",
    category: "Vietnam",
    origin: "",
    segment: "",
    productType: "top",
    sizeSystem: "VN",
    requesterNote: "",
  });

  const generatedRef = useMemo(() => {
    return form.brandName
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 24);
  }, [form.brandName]);

  const updateField = (field: keyof BrandProfileRequest, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.brandName.trim()) {
      ToasterUi("Vui lòng nhập tên thương hiệu", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await brandApi.createBrandProfileRequest({
        ...form,
        brandName: form.brandName.trim(),
        refCode: form.refCode.trim() || generatedRef || "NEW-BRAND",
      });
      ToasterUi("Đã gửi yêu cầu tạo brand profile cho admin", "success");
      onClose();
    } catch {
      ToasterUi("Không gửi được yêu cầu, vui lòng thử lại", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rx-shell mx-auto w-full max-w-3xl">
      <div className="rx-core overflow-hidden">
        <form onSubmit={handleSubmit} className="grid max-h-[86vh] gap-0 overflow-hidden md:grid-cols-[0.86fr_1.14fr]">
          <aside className="flex flex-col justify-center border-b border-[rgba(24,23,20,0.1)] bg-[linear-gradient(160deg,rgba(93,116,101,0.13),rgba(154,116,71,0.1),rgba(255,253,247,0.54))] p-6 md:border-b-0 md:border-r md:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--surface-paper)]">
              <Building2 size={18} strokeWidth={1.25} />
            </span>
            <p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              New brand profile
            </p>
            <h2 className="mt-4 font-serif text-5xl font-light leading-[0.92] text-[var(--ink)]">
              Gửi thương hiệu
              <span className="block italic text-[var(--signal-blue)]">cho admin duyệt.</span>
            </h2>
            <p className="mt-5 text-sm leading-6 text-[var(--ink-soft)]">
              Form này tạo request để admin thêm hồ sơ thương hiệu, ref code và ngữ cảnh size. Chưa cần bảng size thật ngay.
            </p>
          </aside>

          <section className="overflow-y-auto p-6 md:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <span className="rx-badge rx-badge-blue">Yêu cầu brand mới</span>
                <h3 className="mt-4 text-2xl font-extrabold text-[var(--ink)]">Thông tin brand profile</h3>
              </div>
              <button onClick={onClose} className="rx-icon-btn" type="button" aria-label="Đóng">
                <X size={16} strokeWidth={1.35} />
              </button>
            </div>

            <div className="grid gap-5">
              <label>
                <span className="rx-label">Tên thương hiệu</span>
                <input
                  value={form.brandName}
                  onChange={(event) => updateField("brandName", event.target.value)}
                  className="rx-input"
                  placeholder="Ví dụ: YODY, Coolmate, H&M..."
                  required
                />
              </label>

              <label>
                <span className="rx-label">Mã ref</span>
                <input
                  value={form.refCode}
                  onChange={(event) => updateField("refCode", event.target.value)}
                  className="rx-input"
                  placeholder={generatedRef || "Tự tạo nếu bỏ trống"}
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="rx-label">Khu vực</span>
                  <select value={form.category} onChange={(event) => updateField("category", event.target.value)} className="rx-input">
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="rx-label">Xuất xứ</span>
                  <input
                    value={form.origin}
                    onChange={(event) => updateField("origin", event.target.value)}
                    className="rx-input"
                    placeholder="Việt Nam, Japan, US..."
                  />
                </label>
              </div>

              <label>
                <span className="rx-label">Phân khúc / ngành hàng</span>
                <input
                  value={form.segment}
                  onChange={(event) => updateField("segment", event.target.value)}
                  className="rx-input"
                  placeholder="Basic apparel, Sportswear, Denim..."
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="rx-label">Loại sản phẩm ưu tiên</span>
                  <select value={form.productType} onChange={(event) => updateField("productType", event.target.value)} className="rx-input">
                    {productOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="rx-label">Hệ size chính</span>
                  <select value={form.sizeSystem} onChange={(event) => updateField("sizeSystem", event.target.value)} className="rx-input">
                    {sizeSystems.map((system) => (
                      <option key={system} value={system}>{system}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                <span className="rx-label">Ghi chú cho admin</span>
                <textarea
                  value={form.requesterNote}
                  onChange={(event) => updateField("requesterNote", event.target.value)}
                  className="rx-input min-h-28 resize-none rounded-[1.3rem] py-4"
                  placeholder="Ví dụ: Brand này form rộng, size áo thường lớn hơn Uniqlo một chút..."
                />
              </label>
            </div>

            <div className="mt-7 flex flex-col gap-3 md:flex-row">
              <button onClick={onClose} className="rx-btn rx-btn-secondary flex-1" type="button">Hủy</button>
              <button disabled={isSubmitting} className={`rx-btn rx-btn-primary flex-1 ${isSubmitting ? "rx-btn-loading" : ""}`} type="submit">
                Gửi request
                <Send size={16} strokeWidth={1.35} />
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
