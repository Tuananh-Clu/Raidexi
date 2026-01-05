import toast from "react-hot-toast"

type ToastState = "success" | "error" | "warning"

export const ToasterUi = (message: string, state: ToastState) => {
  toast.custom((t) => (
    <div
      className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        max-w-md w-full
        bg-[#f2a60d]
        border-2 border-[#f2a60d]
        shadow-lg
        pointer-events-auto
        flex
      `}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          
          {/* ICON */}
          <div className="flex-shrink-0 pt-0.5">
            {state === "success" && (
              <span className="text-red-600 material-symbols-outlined">
                check_circle
              </span>
            )}
            {state === "error" && (
              <span className="text-red-600 material-symbols-outlined">
                error
              </span>
            )}
            {state === "warning" && (
              <span className="text-red-600 material-symbols-outlined">
                warning
              </span>
            )}
          </div>

          {/* TEXT */}
          <div className="flex-1 ml-3">
            <p className="text-sm font-semibold text-red-700">
              {message}
            </p>
          </div>

        </div>
      </div>
    </div>
  ))
}
