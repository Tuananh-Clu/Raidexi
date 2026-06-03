"use client";

import { data } from "@/features/Camera/types";
import { Activity } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

interface AnalysisMeasureProps {
  dataMeasurements?: data[];
}

function calcScore(record: data): number {
  const values = [
    record.dataMeasure.shoulderWidth,
    record.dataMeasure.chest,
    record.dataMeasure.waist,
    record.dataMeasure.hip,
    record.dataMeasure.height,
  ];
  const filled = values.filter((value) => value !== undefined && value !== null && value > 0).length;
  return Math.min(100, Math.round((filled / 5) * 60 + 40));
}

function getScoreColor(score: number): string {
  if (score >= 80) return "var(--signal-blue)";
  if (score >= 60) return "var(--brass)";
  return "var(--tailor-red)";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Tốt";
  if (score >= 60) return "Khá tốt";
  return "Cần cải thiện";
}

function formatMonth(dateStr: string): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr.slice(0, 7);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export const AnalysisMeasure = ({ dataMeasurements }: AnalysisMeasureProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const enriched = useMemo(() => {
    if (!dataMeasurements?.length) return [];
    return [...dataMeasurements]
      .sort((a, b) => new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime())
      .map((record) => ({ ...record, score: calcScore(record) }));
  }, [dataMeasurements]);

  const stats = useMemo(() => {
    if (!enriched.length) return null;
    const scores = enriched.map((entry) => entry.score);
    const avg = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
    const latest = scores[scores.length - 1];
    const highest = Math.max(...scores);
    const first = scores[0];
    const previous = scores.length >= 2 ? scores[scores.length - 2] : first;
    return {
      avg,
      latest,
      highest,
      improvement: Math.round((latest - first) * 10) / 10,
      vsLast: Math.round((latest - previous) * 10) / 10,
    };
  }, [enriched]);

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

    const width = rect.width;
    const height = rect.height;
    const padL = 48;
    const padR = 24;
    const padT = 18;
    const padB = 40;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(24,23,20,0.08)";
    ctx.lineWidth = 1;
    ctx.font = "10px IBM Plex Mono, monospace";
    ctx.textAlign = "right";

    [0, 20, 40, 60, 80, 100].forEach((value) => {
      const y = padT + chartH - (value / 100) * chartH;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + chartW, y);
      ctx.stroke();
      ctx.fillStyle = "rgba(80,75,67,0.62)";
      ctx.fillText(`${value}%`, padL - 8, y + 4);
    });

    if (enriched.length < 2) return;

    const points = enriched.map((entry, index) => ({
      x: padL + (index / (enriched.length - 1)) * chartW,
      y: padT + chartH - (entry.score / 100) * chartH,
      month: formatMonth(entry.lastUpdate),
    }));

    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    grad.addColorStop(0, "rgba(93,116,101,0.24)");
    grad.addColorStop(1, "rgba(93,116,101,0)");

    ctx.beginPath();
    ctx.moveTo(points[0].x, padT + chartH);
    points.forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.lineTo(points[points.length - 1].x, padT + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "#5d7465";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    points.forEach((point, index) => (index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y)));
    ctx.stroke();

    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#fffaf1";
      ctx.fill();
      ctx.strokeStyle = "#5d7465";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "rgba(80,75,67,0.7)";
      ctx.font = "10px IBM Plex Mono, monospace";
      ctx.textAlign = "center";
      ctx.fillText(point.month, point.x, padT + chartH + 22);
    });
  }, [enriched]);

  if (!dataMeasurements?.length) return null;

  return (
    <section aria-labelledby="analysis-heading" className="rx-shell m-4">
      <div className="rx-core overflow-hidden">
        <header className="flex items-center justify-between gap-4 border-b border-[rgba(24,23,20,0.1)] p-5">
          <div className="flex items-center gap-3">
            <span className="rx-icon-btn pointer-events-none">
              <Activity size={17} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
            </span>
            <div>
              <span className="rx-badge rx-badge-blue">Phân tích số đo</span>
              <h2 id="analysis-heading" className="mt-2 text-lg font-extrabold text-[var(--ink)]">Phân tích số đo</h2>
            </div>
          </div>
          <span className="font-mono text-xs text-[var(--ink-muted)]">{enriched.length} bản ghi</span>
        </header>

        <div className="overflow-x-auto p-5">
          <table className="rx-table" aria-label="Bảng chi tiết số đo theo tháng">
            <thead>
              <tr>{["Tháng", "Vai", "Ngực", "Eo", "Hông", "Cao", "Điểm"].map((col) => <th key={col}>{col}</th>)}</tr>
            </thead>
            <tbody>
              {enriched.map((entry, index) => {
                const color = getScoreColor(entry.score);
                return (
                  <tr key={`${entry.lastUpdate}-${index}`}>
                    <td><time dateTime={entry.lastUpdate}>{formatMonth(entry.lastUpdate)}</time></td>
                    {[entry.dataMeasure.shoulderWidth, entry.dataMeasure.chest, entry.dataMeasure.waist, entry.dataMeasure.hip, entry.dataMeasure.height].map((value, idx) => (
                      <td key={idx} className="font-mono font-semibold text-[var(--ink)]">{value ?? "-"}</td>
                    ))}
                    <td>
                      <span className="rx-badge" style={{ color, borderColor: `${color}33`, backgroundColor: `${color}12` }}>
                        {entry.score}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {stats && (
          <section aria-label="Tổng quan thống kê" className="grid gap-px bg-[rgba(24,23,20,0.1)] md:grid-cols-4">
            {[
              { label: "Điểm trung bình", value: `${stats.avg}%`, sub: getScoreLabel(stats.avg), color: getScoreColor(stats.avg) },
              { label: "Gần nhất", value: `${stats.latest}%`, sub: `${stats.vsLast >= 0 ? "+" : ""}${stats.vsLast}% so lần trước`, color: getScoreColor(stats.latest) },
              { label: "Cao nhất", value: `${stats.highest}%`, sub: "Mốc tốt nhất", color: "var(--signal-blue)" },
              { label: "Cải thiện", value: `${stats.improvement >= 0 ? "+" : ""}${stats.improvement}%`, sub: "Từ bản ghi đầu", color: stats.improvement >= 0 ? "var(--sage)" : "var(--tailor-red)" },
            ].map((item) => (
              <article key={item.label} className="bg-[rgba(255,253,247,0.84)] p-5">
                <p className="rx-label">{item.label}</p>
                <p className="mt-2 font-mono text-2xl font-semibold" style={{ color: item.color }}>{item.value}</p>
                <p className="mt-1 text-xs text-[var(--ink-muted)]">{item.sub}</p>
              </article>
            ))}
          </section>
        )}

        <section aria-label="Biểu đồ tiến độ" className="border-t border-[rgba(24,23,20,0.1)] p-5">
          <p className="rx-label mb-4">Tiến trình theo thời gian</p>
          <div className="h-52 rounded-[1.2rem] bg-[var(--surface-linen)] p-3 ring-1 ring-[rgba(24,23,20,0.08)]">
            <canvas ref={canvasRef} aria-label="Biểu đồ đường hiển thị tiến trình điểm số theo thời gian" style={{ width: "100%", height: "100%", display: "block" }} />
          </div>
        </section>
      </div>
    </section>
  );
};
