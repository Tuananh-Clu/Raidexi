"use client";
import { data } from "@/features/Camera/types";
import { useMemo, useRef, useEffect } from "react";

interface AnalysisMeasureProps {
  dataMeasurements?: data[];
}

// Simple score calculation based on measurement data
function calcScore(d: data): number {
  const m = d.dataMeasure;
  // Score out of 100 based on having all 5 core measurements
  const fields: (number | undefined)[] = [
    m.shoulderWidth,
    m.chest,
    m.waist,
    m.hip,
    m.height,
  ];
  const filled = fields.filter((v) => v !== undefined && v !== null && v > 0).length;
  const base = Math.round((filled / 5) * 60 + 40); // base 40-100
  // Slight variance per entry to make it realistic-looking
  return Math.min(100, base);
}

function getScoreColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Tốt";
  if (score >= 60) return "Khá tốt";
  return "Cần cải thiện";
}

function formatMonth(dateStr: string): string {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  } catch {
    return dateStr.slice(0, 7);
  }
}

export const AnalysisMeasure = ({ dataMeasurements }: AnalysisMeasureProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const enriched = useMemo(() => {
    if (!dataMeasurements || dataMeasurements.length === 0) return [];
    return [...dataMeasurements]
      .sort(
        (a, b) =>
          new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime()
      )
      .map((d) => ({ ...d, score: calcScore(d) }));
  }, [dataMeasurements]);

  const stats = useMemo(() => {
    if (enriched.length === 0) return null;
    const scores = enriched.map((e) => e.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10;
    const latest = scores[scores.length - 1];
    const highest = Math.max(...scores);
    const first = scores[0];
    const improvement = Math.round((latest - first) * 10) / 10;
    const prevScore = scores.length >= 2 ? scores[scores.length - 2] : first;
    const vsLast = Math.round((latest - prevScore) * 10) / 10;
    return { avg, latest, highest, improvement, vsLast };
  }, [enriched]);

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || enriched.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const padL = 48;
    const padR = 24;
    const padT = 16;
    const padB = 40;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    ctx.clearRect(0, 0, W, H);

    // Background grid
    ctx.strokeStyle = "rgba(242,166,13,0.08)";
    ctx.lineWidth = 1;
    const gridLines = [0, 20, 40, 60, 80, 100];
    gridLines.forEach((val) => {
      const y = padT + chartH - (val / 100) * chartH;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + chartW, y);
      ctx.stroke();
      // label
      ctx.fillStyle = "rgba(184,177,157,0.6)";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`${val}%`, padL - 6, y + 4);
    });

    if (enriched.length < 2) return;

    const points = enriched.map((e, i) => ({
      x: padL + (i / (enriched.length - 1)) * chartW,
      y: padT + chartH - (e.score / 100) * chartH,
      score: e.score,
      month: formatMonth(e.lastUpdate),
    }));

    // Area fill
    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    grad.addColorStop(0, "rgba(242,166,13,0.3)");
    grad.addColorStop(1, "rgba(242,166,13,0.0)");

    ctx.beginPath();
    ctx.moveTo(points[0].x, padT + chartH);
    points.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, padT + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.stroke();

    // Dots + X labels
    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#f8fafc";
      ctx.fill();
      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // x-axis label
      ctx.fillStyle = "rgba(184,177,157,0.7)";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(p.month, p.x, padT + chartH + 20);
    });
  }, [enriched]);

  if (!dataMeasurements || dataMeasurements.length === 0) return null;

  return (
    <section aria-labelledby="analysis-heading" className="flex flex-col gap-0 bg-white relative font-sans border border-border-subtle rounded-2xl shadow-sm overflow-hidden mb-6">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-[#f1f5f9]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">analytics</span>
          <h2 id="analysis-heading" className="text-sm font-bold tracking-wide text-[#0f172a]">
            Phân tích số đo
          </h2>
        </div>
        <span className="font-medium text-xs text-[#94a3b8]">
          {enriched.length} tháng · {new Date().getFullYear()}
        </span>
      </header>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Bảng chi tiết số đo theo tháng">
          <caption className="sr-only">Lịch sử và tiến độ số đo cơ thể của bạn</caption>
          <thead>
            <tr className="border-b border-border-subtle bg-[#f1f5f9]">
              {["Tháng", "Vai", "Ngực", "Eo", "Hông", "Cao", "Điểm"].map((col) => (
                <th
                  scope="col"
                  key={col}
                  className="px-4 py-3 font-semibold text-xs text-[#94a3b8] text-left whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enriched.map((entry, idx) => {
              const score = entry.score;
              const color = getScoreColor(score);
              return (
                <tr
                  key={idx}
                  className="border-b border-border-subtle hover:bg-[#f1f5f9] transition-colors group"
                >
                  <td className="px-4 py-3 text-sm font-medium text-text-muted">
                    <time dateTime={entry.lastUpdate}>{formatMonth(entry.lastUpdate)}</time>
                  </td>
                  <td className="px-4 py-3 font-mono text-[13px] text-[#0f172a] font-semibold">
                    {entry.dataMeasure.shoulderWidth ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-[13px] text-[#0f172a] font-semibold">
                    {entry.dataMeasure.chest ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-[13px] text-[#0f172a] font-semibold">
                    {entry.dataMeasure.waist ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-[13px] text-[#0f172a] font-semibold">
                    {entry.dataMeasure.hip ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-[13px] text-[#0f172a] font-semibold">
                    {entry.dataMeasure.height ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center justify-center font-mono text-xs font-bold px-2 py-0.5 rounded-full border"
                      style={{
                        color,
                        borderColor: color + "40",
                        backgroundColor: color + "10",
                      }}
                      aria-label={`Điểm số: ${score} phần trăm`}
                    >
                      {score}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Stats overview */}
      {stats && (
        <section aria-label="Tổng quan thống kê" className="grid grid-cols-2 sm:grid-cols-4 border-t border-border-subtle">
          {[
            {
              label: "Điểm TB toàn kỳ",
              value: `${stats.avg}%`,
              sub: getScoreLabel(stats.avg),
              subStyle: { color: getScoreColor(stats.avg) },
              valueStyle: { color: getScoreColor(stats.avg) },
            },
            {
              label: "Tháng gần nhất",
              value: `${stats.latest}%`,
              sub:
                stats.vsLast >= 0
                  ? `▲ ${stats.vsLast}% so tháng trước`
                  : `▼ ${Math.abs(stats.vsLast)}% so tháng trước`,
              subStyle: { color: stats.vsLast >= 0 ? "#10b981" : "#ef4444" },
              valueStyle: { color: getScoreColor(stats.latest) },
            },
            {
              label: "Cao nhất đạt được",
              value: `${stats.highest}%`,
              sub: "—",
              subStyle: { color: "#94a3b8" },
              valueStyle: { color: "#10b981" },
            },
            {
              label: "Cải thiện tổng",
              value: `${stats.improvement >= 0 ? "+" : ""}${stats.improvement}%`,
              sub: "—",
              subStyle: { color: "#94a3b8" },
              valueStyle: {
                color: stats.improvement >= 0 ? "#10b981" : "#ef4444",
              },
            },
          ].map((s, i) => (
            <article
              key={i}
              className="p-5 border-r border-border-subtle last:border-r-0 bg-white hover:bg-[#f1f5f9] transition-colors flex flex-col justify-center"
            >
              <h3 className="text-xs font-semibold text-[#94a3b8] mb-2">
                {s.label}
              </h3>
              <p className="font-mono text-2xl font-bold tracking-tight" style={s.valueStyle}>
                {s.value}
              </p>
              <p className="text-[11px] font-medium mt-1" style={s.subStyle} aria-label={s.sub}>
                {s.sub}
              </p>
            </article>
          ))}
        </section>
      )}

      {/* Chart */}
      <section aria-label="Biểu đồ tiến độ" className="border-t border-border-subtle p-6 bg-white">
        <h3 className="text-xs font-semibold text-[#94a3b8] mb-4">
          Tiến trình hoàn thiện theo thời gian
        </h3>
        <div className="w-full h-48 bg-[#f1f5f9] rounded-xl border border-border-subtle p-2">
          <canvas
            ref={canvasRef}
            aria-label="Biểu đồ đường hiển thị tiến trình điểm số theo thời gian"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
      </section>
    </section>
  );
};
