import { AuthContext } from "@/provider/AuthProvider";
import { useLoadingStore } from "@/Shared/store/loading.store";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Lock, Upload, X } from "lucide-react";
import { useContext, useState } from "react";

type EditableUser = {
  id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  imageUrl?: string | null;
  role?: string;
};

export const EditProfile = ({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data?: EditableUser;
}) => {
  const context = useContext(AuthContext);
  const loading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  const [formData, setFormData] = useState({
    id: data?.id ?? "",
    fullName: data?.fullName ?? "",
    email: data?.email ?? "",
    phone: data?.phone ?? "",
    address: data?.address ?? "",
    createdAt: data?.createdAt ?? "",
    hashPassword: "",
    imageUrl: data?.imageUrl ?? "",
      role: data?.role ?? "",
  });

  const handleSave = async () => {
    await context?.updateAccount(formData, setIsOpen);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "Raidexi");
    loading();

    axios
      .post("https://api.cloudinary.com/v1_1/dnxjlsyp4/image/upload", uploadData)
      .then((response) => {
        const newImageUrl = response.data.secure_url;
        setFormData((current) => ({ ...current, imageUrl: newImageUrl }));
        localStorage.setItem("userData", JSON.stringify({ ...data, imageUrl: newImageUrl }));
      })
      .finally(() => stopLoading());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rx-modal-backdrop z-50 flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 42, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.62, ease: [0.32, 0.72, 0, 1] }}
            className="rx-shell w-full max-w-5xl"
          >
            <div className="rx-core max-h-[90vh] overflow-hidden">
              <header className="flex items-center justify-between border-b border-[rgba(24,23,20,0.1)] p-5 md:p-7">
                <div>
                  <span className="rx-badge rx-badge-blue">Cài đặt hồ sơ</span>
                  <h2 className="mt-3 text-2xl font-extrabold text-[var(--ink)]">Chỉnh sửa hồ sơ</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="rx-icon-btn" aria-label="Đóng" type="button">
                  <X size={18} strokeWidth={1.35} />
                </button>
              </header>

              <div className="grid max-h-[calc(90vh-150px)] gap-6 overflow-y-auto p-5 md:grid-cols-12 md:p-7">
                <aside className="md:col-span-4">
                  <div className="rx-card p-5">
                    <p className="rx-label">Ảnh đại diện</p>
                    <div className="mt-3 aspect-square overflow-hidden rounded-[1.5rem] bg-[rgba(24,23,20,0.06)] ring-1 ring-[rgba(24,23,20,0.1)]">
                      {formData.imageUrl ? (
                        <img
                          alt="Ảnh hồ sơ"
                          className="h-full w-full object-cover"
                          src={formData.imageUrl}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-serif text-7xl text-[var(--ink)]">
                          {(formData.fullName || "U")[0]?.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <label className="rx-btn rx-btn-secondary mt-4 w-full cursor-pointer">
                      <Upload size={15} strokeWidth={1.35} />
                      Tải ảnh mới
                      <input name="imageUrl" onChange={handleImageUpload} className="hidden" type="file" />
                    </label>
                  </div>

                  <div className="rx-card mt-5 p-5">
                    <p className="rx-label">Bảo mật</p>
                    <p className="rx-copy text-sm">
                      Thông tin hồ sơ được dùng để gắn số đo với tài khoản. Mật khẩu có thể được thay đổi khi cần.
                    </p>
                    <button className="rx-btn rx-btn-secondary mt-4 w-full" type="button">
                      <Lock size={14} strokeWidth={1.35} />
                      Đặt lại mật khẩu
                    </button>
                  </div>
                </aside>

                <section className="md:col-span-8">
                  <div className="rx-card p-5 md:p-7">
                    <h3 className="mb-6 text-xl font-extrabold text-[var(--ink)]">Thông tin cá nhân</h3>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="rx-label" htmlFor="fullName">
                          Họ tên
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="rx-input"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="rx-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="rx-input"
                          type="email"
                        />
                      </div>
                      <div>
                        <label className="rx-label" htmlFor="phone">
                          Điện thoại
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="rx-input"
                          type="text"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="rx-label" htmlFor="address">
                          Khu vực
                        </label>
                        <input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="rx-input"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <footer className="flex flex-col justify-between gap-4 border-t border-[rgba(24,23,20,0.1)] p-5 md:flex-row md:items-center md:p-7">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-[var(--sage)]">
                  <CheckCircle2 size={14} strokeWidth={1.35} />
                  Hồ sơ sẵn sàng đồng bộ
                </span>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button onClick={() => setIsOpen(false)} className="rx-btn rx-btn-secondary" type="button">
                    Hủy
                  </button>
                  <button onClick={handleSave} className="rx-btn rx-btn-primary" type="button">
                    Lưu thay đổi
                  </button>
                </div>
              </footer>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
