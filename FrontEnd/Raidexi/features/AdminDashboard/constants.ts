import type { LucideIcon } from "lucide-react";
import { Boxes, Camera, CircleGauge, Database, Radar, Ruler, Users } from "lucide-react";

export type MetricTone = "sage" | "brass" | "clay" | "ink";
export type AdminTabKey = "overview" | "users" | "profiles" | "brands" | "ai";

export type Metric = {
  label: string;
  value: string;
  delta: string;
  tone: MetricTone;
};

export type AdminNavItem = {
  key: AdminTabKey;
  label: string;
  eyebrow: string;
  icon: LucideIcon;
};

export type Operation = {
  name: string;
  state: string;
  value: string;
  icon: LucideIcon;
};

export const metrics: Metric[] = [
  { label: "Người dùng hoạt động", value: "12.8K", delta: "+18.4%", tone: "sage" },
  { label: "Hồ sơ fit", value: "48.2K", delta: "+9.7%", tone: "brass" },
  { label: "Lượt đo hôm nay", value: "1,248", delta: "+22.1%", tone: "clay" },
  { label: "Độ ổn định AI", value: "99.3%", delta: "+1.2%", tone: "ink" },
];

export const navItems: AdminNavItem[] = [
  { key: "overview", label: "Tổng quan", eyebrow: "Nhịp vận hành", icon: CircleGauge },
  { key: "users", label: "Người dùng", eyebrow: "Hành vi mua sắm", icon: Users },
  { key: "profiles", label: "Hồ sơ fit", eyebrow: "Dữ liệu cơ thể", icon: Ruler },
  { key: "brands", label: "Thương hiệu", eyebrow: "Logic size", icon: Boxes },
  { key: "ai", label: "Hệ thống AI", eyebrow: "Chất lượng gợi ý", icon: Radar },
];

export const tabCopy: Record<AdminTabKey, { pill: string; title: string; accent: string; description: string }> = {
  overview: {
    pill: "Admin dashboard",
    title: "Điều phối",
    accent: "trí tuệ chọn size.",
    description:
      "Một bảng điều khiển cho dữ liệu đo cơ thể, logic thương hiệu, chất lượng AI và nhịp vận hành của Raidexi.",
  },
  users: {
    pill: "User intelligence",
    title: "Hiểu người mua",
    accent: "trước khi họ chọn size.",
    description:
      "Theo dõi người dùng, phiên đo, hành vi chọn thương hiệu và các tín hiệu cần chăm sóc trong hành trình mua sắm.",
  },
  profiles: {
    pill: "Fit profiles",
    title: "Quản trị hồ sơ",
    accent: "cơ thể số.",
    description:
      "Kiểm tra chất lượng số đo, hồ sơ thiếu dữ liệu và các batch cần duyệt trước khi dùng cho gợi ý size.",
  },
  brands: {
    pill: "Brand logic",
    title: "Chuẩn hóa",
    accent: "ngôn ngữ size.",
    description:
      "Quản lý mức phủ dữ liệu, bảng size và độ tin cậy của từng thương hiệu trong hệ sinh thái Raidexi.",
  },
  ai: {
    pill: "AI control",
    title: "Giám sát",
    accent: "độ chính xác fit.",
    description:
      "Theo dõi pipeline đo lường, độ lệch gợi ý, cảnh báo chất lượng và sức khỏe của hệ thống AI.",
  },
};

export const operations: Operation[] = [
  { name: "Luồng đo cơ thể", state: "Ổn định", value: "99.3%", icon: Camera },
  { name: "Dịch bảng size", state: "Đang xử lý", value: "842", icon: Ruler },
  { name: "Đồng bộ thương hiệu", state: "Cần duyệt", value: "12", icon: Boxes },
  { name: "Kho dữ liệu fit", state: "Khỏe", value: "48K", icon: Database },
];

export const brandRows = [
  { brand: "UNIQLO", category: "Basic apparel", coverage: "94%", requests: "18.2K", status: "Đã chuẩn hóa" },
  { brand: "NIKE", category: "Sportswear", coverage: "88%", requests: "14.6K", status: "Đang tinh chỉnh" },
  { brand: "LEVI'S", category: "Denim", coverage: "91%", requests: "9.4K", status: "Đã chuẩn hóa" },
  { brand: "ZARA", category: "Fashion retail", coverage: "76%", requests: "7.8K", status: "Cần kiểm tra" },
];

export const timeline = [
  {
    time: "09:40",
    title: "Hoàn tất 320 hồ sơ fit",
    copy: "Batch đo buổi sáng đã được chuẩn hóa và lưu vào kho dữ liệu.",
  },
  {
    time: "10:15",
    title: "NIKE size logic được cập nhật",
    copy: "Bảng size thể thao có thay đổi ở nhóm áo oversize.",
  },
  {
    time: "11:05",
    title: "Phát hiện 12 bản ghi thiếu chiều cao",
    copy: "Hàng đợi kiểm tra cần đối soát trước khi dùng để gợi ý.",
  },
];

export const userSegments = [
  { label: "Người dùng mới", value: "2,418", detail: "Đã tạo hồ sơ trong 7 ngày", progress: 64 },
  { label: "Đã đo nhưng chưa mua", value: "892", detail: "Cần kích hoạt bằng gợi ý thương hiệu", progress: 42 },
  { label: "Quay lại mua lần hai", value: "1,126", detail: "Có lịch sử fit đáng tin cậy", progress: 78 },
];

export const fitProfileRows = [
  { id: "RX-4218", name: "Minh Anh", quality: "96%", signal: "Đầy đủ", lastScan: "2 phút trước" },
  { id: "RX-4192", name: "Hoàng Nam", quality: "82%", signal: "Thiếu vai", lastScan: "18 phút trước" },
  { id: "RX-4184", name: "Linh Chi", quality: "91%", signal: "Cần duyệt", lastScan: "31 phút trước" },
  { id: "RX-4176", name: "Gia Hân", quality: "88%", signal: "Ổn định", lastScan: "52 phút trước" },
];

export const aiMonitors = [
  { label: "Camera extraction", value: "99.1%", status: "Ổn định" },
  { label: "Body landmark model", value: "98.4%", status: "Đang học thêm" },
  { label: "Brand size matcher", value: "96.8%", status: "Cần theo dõi denim" },
  { label: "Recommendation latency", value: "124ms", status: "Trong ngưỡng" },
];

export const chartBars = [42, 58, 51, 72, 68, 88, 76, 94, 86, 101, 96, 118];

export const toneStyles: Record<MetricTone, string> = {
  sage: "text-[var(--signal-blue)] bg-[rgba(93,116,101,0.12)]",
  brass: "text-[var(--brass)] bg-[rgba(154,116,71,0.13)]",
  clay: "text-[var(--tailor-red)] bg-[rgba(159,74,61,0.11)]",
  ink: "text-[var(--ink)] bg-[rgba(24,23,20,0.07)]",
};
