import React, { useState } from "react";
import { Download, Mail, Send, X } from "lucide-react";
import { ExportFormat } from "../types";
import { HandleSendDataToMail } from "@/Shared/Service/DownloadService";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";

interface SidebarProps {
  handleClickExport: (format: ExportFormat) => void;
  currentFormat: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleClickExport, currentFormat, onFormatChange }) => {
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [data, setData] = useState({
    to: "",
    subject: "Raidexi Measurement Document",
    body: "",
    attachments: { base64: "", mineType: "", filenames: "" },
  });

  const handleSendEmail = async () => {
    if (isSendingEmail) return;
    setIsSendingEmail(true);
    try {
      await HandleSendDataToMail(data, currentFormat);
      ToasterUi("Tài liệu đã được gửi", "success");
      setIsEmailFormOpen(false);
    } catch {
      ToasterUi("Không thể gửi tài liệu", "error");
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <aside className="no-print w-full shrink-0 p-4 lg:w-[21.5rem] lg:p-5">
      <div className="rx-shell sticky top-24">
        <div className="rx-core space-y-6 p-5">
          <div>
            <p className="rx-label mb-3">Định dạng xuất</p>
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
              {(["pdf", "csv", "png"] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => onFormatChange(format)}
                  className={`rx-btn ${currentFormat === format ? "rx-btn-primary" : "rx-btn-secondary"}`}
                  type="button"
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => handleClickExport(currentFormat)} className="rx-btn rx-btn-primary w-full" type="button">
              <Download size={15} strokeWidth={1.35} />
              Tải xuống
            </button>
            <button onClick={() => setIsEmailFormOpen((value) => !value)} className="rx-btn rx-btn-secondary w-full" type="button">
              <Mail size={15} strokeWidth={1.35} />
              Gửi qua email
            </button>
          </div>

          {isEmailFormOpen && (
            <div className="rounded-[1.35rem] bg-[var(--surface-linen)] p-4 ring-1 ring-[rgba(24,23,20,0.08)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="rx-label">Chia sẻ tài liệu</p>
                <button onClick={() => setIsEmailFormOpen(false)} className="rx-icon-btn h-8 w-8" type="button" aria-label="Đóng">
                  <X size={14} strokeWidth={1.35} />
                </button>
              </div>
              <label className="block">
                <span className="rx-label mb-2 block">Email nhận</span>
                <input
                  type="email"
                  value={data.to}
                  onChange={(event) => setData((current) => ({ ...current, to: event.target.value }))}
                  placeholder="name@company.com"
                  className="rx-input"
                />
              </label>
              <label className="mt-3 block">
                <span className="rx-label mb-2 block">Ghi chú</span>
                <textarea
                  rows={3}
                  value={data.body}
                  onChange={(event) => setData((current) => ({ ...current, body: event.target.value }))}
                  placeholder="Nội dung gửi kèm"
                  className="rx-input resize-none py-3"
                />
              </label>
              <button onClick={handleSendEmail} disabled={isSendingEmail} className={`rx-btn rx-btn-primary mt-4 w-full ${isSendingEmail ? "rx-btn-loading" : ""}`} type="button">
                <Send size={14} strokeWidth={1.35} />
                {isSendingEmail ? "Đang gửi" : "Gửi tài liệu"}
              </button>
            </div>
          )}

          <p className="text-xs leading-relaxed text-[var(--ink-muted)]">
            Bản xuất giữ cấu trúc số đo chuẩn để gửi nội bộ, in tại cửa hàng hoặc chuyển cho đối tác may đo.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
