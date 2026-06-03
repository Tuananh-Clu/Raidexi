import toast from "react-hot-toast";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

type ToastState = "success" | "error" | "warning";

const config = {
  success: { icon: CheckCircle2, tone: "text-[var(--signal-blue)]", label: "Thành công" },
  error: { icon: XCircle, tone: "text-[var(--tailor-red)]", label: "Lỗi" },
  warning: { icon: AlertTriangle, tone: "text-[var(--brass)]", label: "Cần chú ý" },
};

export const ToasterUi = (message: string, state: ToastState) => {
  const Icon = config[state].icon;

  toast.custom((t) => (
    <div
      className={`rx-shell pointer-events-auto w-full max-w-md transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        t.visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      role="status"
    >
      <div className="rx-core flex items-start gap-3 p-4">
        <span className="rx-icon-btn pointer-events-none h-9 w-9 shrink-0">
          <Icon size={17} strokeWidth={1.35} className={config[state].tone} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="rx-label">{config[state].label}</p>
          <p className="mt-1 text-sm font-semibold text-[var(--ink)]">{message}</p>
        </div>
      </div>
    </div>
  ));
};
