"use client";

import { FormEvent, useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Building2, CheckCircle2, ChevronDown, ChevronRight, Code2, Plus, Send, Trash2, X } from "lucide-react";
import { brandApi } from "../api/brandApi";
import { BrandProfileRequest } from "../types";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";

const categoryOptions = [
  { label: "Việt Nam", value: "Vietnam" },
  { label: "Quốc tế", value: "International" },
];
const productOptions = [
  { label: "Áo (top)", value: "top" },
  { label: "Quần (bottom)", value: "bottom" },
  { label: "Đầm (dress)", value: "dress" },
  { label: "Nhiều nhóm", value: "mixed" },
];
const sizeSystems = ["VN", "US", "UK", "EU", "JP", "KR"];
const GENDERS = ["male", "female"];
const PRODUCT_TYPES = ["top", "bottom", "dress"];

const CHART_TEMPLATE = `[
  {
    "gender": "male",
    "productType": "top",
    "items": [
      {
        "labels": { "VN": "S", "US": "S", "EU": "44" },
        "Chest":  { "Min": 84, "Max": 88 },
        "Waist":  { "Min": 70, "Max": 74 },
        "ShoulderWidth": { "Min": 40, "Max": 42 },
        "Height": { "Min": 160, "Max": 165 }
      },
      {
        "labels": { "VN": "M", "US": "M", "EU": "46" },
        "Chest":  { "Min": 88, "Max": 92 },
        "Waist":  { "Min": 74, "Max": 78 },
        "ShoulderWidth": { "Min": 42, "Max": 44 },
        "Height": { "Min": 165, "Max": 170 }
      }
    ]
  }
]`;


type Step = "profile" | "chart";

interface ChartBlock {
  gender: string;
  productType: string;
  rawJson: string;
  error: string | null;
}

// ─── helpers ──────────────────────────────────────────────────────────────────
function parseChartBlocks(blocks: ChartBlock[]): object[] | null {
  try {
    return blocks.map((b) => {
      const items = JSON.parse(b.rawJson);
      return { gender: b.gender, productType: b.productType, items };
    });
  } catch {
    return null;
  }
}

// ─── sub-components ───────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "profile", label: "Brand Profile" },
    { key: "chart", label: "Size Chart" },
  ];
  return (
    <nav aria-label="Các bước" className="flex items-center gap-2">
      {steps.map((s, i) => {
        const isActive = s.key === step;
        const isDone = step === "chart" && s.key === "profile";
        return (
          <div key={s.key} className="flex items-center gap-2">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${isDone ? "bg-[var(--signal-blue)] text-white" : isActive ? "bg-[var(--ink)] text-[var(--surface-paper)]" : "border border-[rgba(24,23,20,0.15)] text-[var(--ink-muted)]"}`}>
              {isDone ? <CheckCircle2 size={13} strokeWidth={2} /> : i + 1}
            </div>
            <span className={`text-xs font-semibold ${isActive ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"}`}>{s.label}</span>
            {i < steps.length - 1 && <ChevronRight size={13} className="text-[var(--ink-muted)]" />}
          </div>
        );
      })}
    </nav>
  );
}

function ChartBlockEditor({
  block,
  index,
  onChange,
  onRemove,
}: {
  block: ChartBlock;
  index: number;
  onChange: (b: ChartBlock) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(true);

  const handleJsonChange = (raw: string) => {
    let error: string | null = null;
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) error = "Phải là một mảng [ ... ]";
    } catch (e: any) {
      error = e.message;
    }
    onChange({ ...block, rawJson: raw, error });
  };

  return (
    <div className="rounded-2xl border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.6)] overflow-hidden">
      {/* header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button type="button" onClick={() => setOpen((v) => !v)} className="flex flex-1 items-center gap-3 text-left">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--ink)] text-xs font-bold text-[var(--surface-paper)]">{index + 1}</span>
          <div>
            <p className="text-sm font-bold text-[var(--ink)] capitalize">
              {block.gender} · {block.productType}
            </p>
          </div>
          <ChevronDown size={14} strokeWidth={1.5} className={`ml-auto text-[var(--ink-muted)] transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <button type="button" onClick={onRemove} className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-muted)] transition hover:bg-red-50 hover:text-red-500">
          <Trash2 size={14} strokeWidth={1.5} />
        </button>
      </div>

      {open && (
        <div className="border-t border-[rgba(24,23,20,0.08)] px-4 pb-4 pt-3 grid gap-3">
          {/* gender + productType */}
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="rx-label">Giới tính</span>
              <select value={block.gender} onChange={(e) => onChange({ ...block, gender: e.target.value })} className="rx-input">
                {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
            <label>
              <span className="rx-label">Loại sản phẩm</span>
              <select value={block.productType} onChange={(e) => onChange({ ...block, productType: e.target.value })} className="rx-input">
                {PRODUCT_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
          </div>

          {/* json editor */}
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <Code2 size={13} strokeWidth={1.5} className="text-[var(--ink-muted)]" />
              <span className="rx-label mb-0">Mảng items (JSON)</span>
            </div>
            <textarea
              value={block.rawJson}
              onChange={(e) => handleJsonChange(e.target.value)}
              spellCheck={false}
              rows={10}
              className={`w-full rounded-xl border px-4 py-3 font-mono text-xs leading-5 text-[var(--ink)] outline-none transition resize-y bg-[rgba(24,23,20,0.025)] ${block.error ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-[rgba(24,23,20,0.1)] focus:border-[rgba(93,116,101,0.4)] focus:ring-2 focus:ring-[rgba(93,116,101,0.1)]"}`}
            />
            {block.error && (
              <div className="mt-1.5 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                <AlertCircle size={13} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                <span className="font-mono">{block.error}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── main ─────────────────────────────────────────────────────────────────────
export function BrandProfileRequestForm({
  initialBrandName,
  onClose,
}: {
  initialBrandName: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skipChart, setSkipChart] = useState(false);


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


  const [chartBlocks, setChartBlocks] = useState<ChartBlock[]>([
    { gender: "male", productType: "top", rawJson: CHART_TEMPLATE, error: null },
  ]);

  const generatedRef = useMemo(
    () => form.brandName.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24),
    [form.brandName]
  );
  const resolvedRef = form.refCode.trim() || generatedRef || "NEW-BRAND";

  const updateField = (field: keyof BrandProfileRequest, value: string) =>
    setForm((c) => ({ ...c, [field]: value }));


  const handleProfileNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.brandName.trim()) { ToasterUi("Vui lòng nhập tên thương hiệu", "error"); return; }
    setStep("chart");
  };

  const addBlock = () =>
    setChartBlocks((b) => [...b, { gender: "female", productType: "dress", rawJson: "[\n  {\n    \"labels\": { \"VN\": \"S\" },\n    \"Chest\": { \"Min\": 82, \"Max\": 86 },\n    \"Waist\": { \"Min\": 64, \"Max\": 68 },\n    \"Hip\":   { \"Min\": 86, \"Max\": 90 }\n  }\n]", error: null }]);

  const updateBlock = (i: number, b: ChartBlock) =>
    setChartBlocks((prev) => prev.map((x, idx) => (idx === i ? b : x)));

  const removeBlock = (i: number) =>
    setChartBlocks((prev) => prev.filter((_, idx) => idx !== i));

  const hasJsonErrors = chartBlocks.some((b) => b.error !== null);

  const handleFinalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!skipChart && hasJsonErrors) { ToasterUi("Có lỗi JSON trong size chart", "error"); return; }

    setIsSubmitting(true);
    try {
      await brandApi.createBrandProfileRequest({ ...form, brandName: form.brandName.trim(), refCode: resolvedRef });
      if (!skipChart && chartBlocks.length > 0) {
        const charts = parseChartBlocks(chartBlocks);
        if (charts) {
          await brandApi.addBrandSizeChart([{ brandRefCode: resolvedRef, charts }]);
        }
      }
      ToasterUi("Đã gửi brand profile" + (!skipChart && chartBlocks.length > 0 ? " + size chart" : "") + " cho admin", "success");
      onClose();
    } catch {
      ToasterUi("Gửi thất bại, vui lòng thử lại", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="rx-shell mx-auto w-full max-w-3xl">
      <div className="rx-core overflow-hidden">

        {/* ── STEP 1: Profile ──────────────────────────────────────────────── */}
        {step === "profile" && (
          <form onSubmit={handleProfileNext} className="grid max-h-[86vh] gap-0 overflow-hidden md:grid-cols-[0.86fr_1.14fr]">
            {/* left panel */}
            <aside className="flex flex-col justify-center border-b border-[rgba(24,23,20,0.1)] bg-[linear-gradient(160deg,rgba(93,116,101,0.13),rgba(154,116,71,0.1),rgba(255,253,247,0.54))] p-6 md:border-b-0 md:border-r md:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--surface-paper)]">
                <Building2 size={18} strokeWidth={1.25} />
              </span>
              <p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">New brand profile</p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-[0.92] text-[var(--ink)]">
                Gửi thương hiệu
                <span className="block italic text-[var(--signal-blue)]">cho admin duyệt.</span>
              </h2>
              <p className="mt-5 text-sm leading-6 text-[var(--ink-soft)]">
                Bước 1: điền thông tin cơ bản của brand. Bước 2 cho phép đính kèm bảng size JSON ngay lúc gửi.
              </p>
              <div className="mt-6">
                <StepIndicator step={step} />
              </div>
            </aside>

            {/* right panel */}
            <section className="overflow-y-auto p-6 md:p-8">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <span className="rx-badge rx-badge-blue">Bước 1 / 2</span>
                  <h3 className="mt-4 text-2xl font-extrabold text-[var(--ink)]">Thông tin brand profile</h3>
                </div>
                <button onClick={onClose} className="rx-icon-btn" type="button" aria-label="Đóng"><X size={16} strokeWidth={1.35} /></button>
              </div>

              <div className="grid gap-5">
                <label>
                  <span className="rx-label">Tên thương hiệu</span>
                  <input value={form.brandName} onChange={(e) => updateField("brandName", e.target.value)} className="rx-input" placeholder="Ví dụ: YODY, Coolmate, H&M..." required />
                </label>
                <label>
                  <span className="rx-label">Mã ref</span>
                  <input value={form.refCode} onChange={(e) => updateField("refCode", e.target.value)} className="rx-input" placeholder={generatedRef || "Tự tạo nếu bỏ trống"} />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label>
                    <span className="rx-label">Khu vực</span>
                    <select value={form.category} onChange={(e) => updateField("category", e.target.value)} className="rx-input">
                      {categoryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </label>
                  <label>
                    <span className="rx-label">Xuất xứ</span>
                    <input value={form.origin} onChange={(e) => updateField("origin", e.target.value)} className="rx-input" placeholder="Việt Nam, Japan, US..." />
                  </label>
                </div>
                <label>
                  <span className="rx-label">Phân khúc / ngành hàng</span>
                  <input value={form.segment} onChange={(e) => updateField("segment", e.target.value)} className="rx-input" placeholder="Basic apparel, Sportswear..." />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label>
                    <span className="rx-label">Loại sản phẩm ưu tiên</span>
                    <select value={form.productType} onChange={(e) => updateField("productType", e.target.value)} className="rx-input">
                      {productOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </label>
                  <label>
                    <span className="rx-label">Hệ size chính</span>
                    <select value={form.sizeSystem} onChange={(e) => updateField("sizeSystem", e.target.value)} className="rx-input">
                      {sizeSystems.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                </div>
                <label>
                  <span className="rx-label">Ghi chú cho admin</span>
                  <textarea value={form.requesterNote} onChange={(e) => updateField("requesterNote", e.target.value)} className="rx-input min-h-24 resize-none rounded-[1.3rem] py-4" placeholder="Ví dụ: Brand này form rộng, size áo thường lớn hơn Uniqlo một chút..." />
                </label>
              </div>

              <div className="mt-7 flex flex-col gap-3 md:flex-row">
                <button onClick={onClose} className="rx-btn rx-btn-secondary flex-1" type="button">Hủy</button>
                <button className="rx-btn rx-btn-primary flex-1" type="submit">
                  Tiếp theo: Size chart
                  <ArrowRight size={16} strokeWidth={1.35} />
                </button>
              </div>
            </section>
          </form>
        )}

        {/* ── STEP 2: Size Chart ───────────────────────────────────────────── */}
        {step === "chart" && (
          <form onSubmit={handleFinalSubmit} className="grid max-h-[90vh] gap-0 overflow-hidden md:grid-cols-[0.86fr_1.14fr]">
            {/* left panel */}
            <aside className="flex flex-col justify-between border-b border-[rgba(24,23,20,0.1)] bg-[linear-gradient(160deg,rgba(93,116,101,0.1),rgba(255,253,247,0.54))] p-6 md:border-b-0 md:border-r md:p-8">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--signal-blue)] text-white">
                  <Code2 size={18} strokeWidth={1.25} />
                </span>
                <p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">Size Chart JSON</p>
                <h2 className="mt-4 font-serif text-3xl font-light leading-[0.95] text-[var(--ink)]">
                  Nhập bảng size
                  <span className="block italic text-[var(--signal-blue)]">theo định dạng JSON.</span>
                </h2>
                <p className="mt-5 text-sm leading-6 text-[var(--ink-soft)]">
                  Mỗi block là 1 nhóm (gender + productType). Mảng <code className="rounded bg-[rgba(24,23,20,0.08)] px-1 font-mono text-xs">items</code> chứa các size cụ thể.
                </p>

                {/* preview info */}
                <div className="mt-6 rounded-xl border border-[rgba(93,116,101,0.18)] bg-[rgba(255,253,247,0.7)] p-4 text-xs">
                  <p className="font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider mb-2">Brand</p>
                  <p className="font-bold text-[var(--ink)]">{form.brandName || "—"}</p>
                  <p className="mt-1 font-mono text-[var(--ink-muted)]">{resolvedRef}</p>
                </div>
              </div>

              <div className="mt-6">
                <StepIndicator step={step} />
              </div>
            </aside>

            {/* right panel */}
            <section className="flex flex-col overflow-hidden">
              <div className="flex items-start justify-between gap-4 px-6 pt-6 md:px-8 md:pt-8">
                <div>
                  <span className="rx-badge rx-badge-blue">Bước 2 / 2</span>
                  <h3 className="mt-4 text-xl font-extrabold text-[var(--ink)]">Cấu hình Size Chart</h3>
                </div>
                <button onClick={onClose} className="rx-icon-btn" type="button" aria-label="Đóng"><X size={16} strokeWidth={1.35} /></button>
              </div>

              {/* skip toggle */}
              <div className="mx-6 mt-4 flex items-center gap-3 rounded-xl border border-[rgba(24,23,20,0.08)] bg-[rgba(24,23,20,0.025)] px-4 py-3 md:mx-8">
                <input type="checkbox" id="skipChart" checked={skipChart} onChange={(e) => setSkipChart(e.target.checked)} className="h-4 w-4 rounded accent-[var(--signal-blue)]" />
                <label htmlFor="skipChart" className="text-sm text-[var(--ink)]">
                  <span className="font-semibold">Bỏ qua bước này</span>
                  <span className="ml-2 text-[var(--ink-muted)]">— chỉ gửi brand profile, thêm chart sau</span>
                </label>
              </div>

              {/* blocks list */}
              {!skipChart && (
                <div className="flex-1 overflow-y-auto px-6 py-4 md:px-8 grid gap-3">
                  {chartBlocks.map((b, i) => (
                    <ChartBlockEditor key={i} block={b} index={i} onChange={(nb) => updateBlock(i, nb)} onRemove={() => removeBlock(i)} />
                  ))}
                  <button type="button" onClick={addBlock} className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[rgba(93,116,101,0.3)] py-3.5 text-sm font-semibold text-[var(--ink-muted)] transition hover:border-[rgba(93,116,101,0.55)] hover:bg-[rgba(93,116,101,0.04)] hover:text-[var(--ink)]">
                    <Plus size={15} strokeWidth={1.5} />
                    Thêm chart block
                  </button>
                </div>
              )}
              {skipChart && (
                <div className="flex flex-1 items-center justify-center px-8 text-center text-sm text-[var(--ink-muted)]">
                  <p>Chỉ gửi brand profile request.<br />Size chart có thể thêm sau từ Admin dashboard.</p>
                </div>
              )}

              {/* actions */}
              <div className="flex flex-col gap-3 px-6 pb-6 pt-3 md:flex-row md:px-8 md:pb-8 border-t border-[rgba(24,23,20,0.07)] mt-2">
                <button type="button" onClick={() => setStep("profile")} className="rx-btn rx-btn-secondary flex-1">
                  <ArrowLeft size={16} strokeWidth={1.35} />
                  Quay lại
                </button>
                <button disabled={isSubmitting || (!skipChart && hasJsonErrors)} className={`rx-btn rx-btn-primary flex-1 ${isSubmitting ? "rx-btn-loading" : ""}`} type="submit">
                  {isSubmitting ? "Đang gửi..." : "Gửi request"}
                  <Send size={16} strokeWidth={1.35} />
                </button>
              </div>
            </section>
          </form>
        )}

      </div>
    </div>
  );
}
