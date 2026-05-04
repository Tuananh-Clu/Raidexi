import { UserData } from "@/features/Auth/types";
import { AuthContext } from "@/provider/AuthProvider";
import { useLoadingStore } from "@/Shared/store/loading.store";
import axios from "axios";

import { AnimatePresence, motion } from "framer-motion";
import { X, Lock, CheckCircle2 } from "lucide-react";
import { useContext, useState } from "react";

export const EditProfile = ({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: UserData;
}) => {
  const context = useContext(AuthContext);
  const loading=useLoadingStore((state)=>state.startLoading)
  const stopLoading=useLoadingStore((state)=>state.stopLoading)
  const [formData, setFormData] = useState({
    id: data.id,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    createdAt: data.createdAt,
    hashPassword: "",
    imageUrl:
      data.imageUrl == null
        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuB1CK5gxIw3QcqExryMiOtgmrbt08Y7Lln9OAe7ck3yYtUk7BVgbdBfAOpt7h2PnYRF1odP1OznTn81avW2SxKH-n4qyzHOJAI7lQimlUyxLG3GEiHjvlVQ4l67fDVwITH0sD78ZeiiV6mTh12ZRXMd3spZ-31PtcYLEaJRK2DoMFV2oe3JW15Vo_F-qcJ-GnyyDZffvmov-aGyogcH19Xqy3bXM6qsiWGf540cjfvHAaUWjrv3wjQooJSzYT6ui83YHd9VXI1q4meB"
        : data.imageUrl,
  } as any);
  const handleSave = async () => {
    try {
      console.log(formData);
      await context?.updateAccount(formData, setIsOpen);
    } catch {}
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "Raidexi");
    loading();

    axios
      .post("https://api.cloudinary.com/v1_1/dnxjlsyp4/image/upload", uploadData)
      .then((response) => {
        const newImageUrl = response.data.secure_url;
        setFormData((prev: any) => ({ ...prev, imageUrl: newImageUrl }));
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...data, imageUrl: newImageUrl }),
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        stopLoading();
      });
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black backdrop-blur-sm md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-black border border-outline-variant/40 w-full max-w-5xl h-full max-h-[90vh] flex flex-col relative shadow-2xl overflow-hidden rounded-none"
            >
              {/* Modal Header */}
              <header className="flex items-center justify-between flex-shrink-0 px-8 py-5 bg-black border-b border-outline-variant/20">
                <div className="flex items-center gap-4">
                  <span className="font-label text-xs text-primary-container tracking-[0.3em]">
                    RAIDEXI
                  </span>
                  <span className="w-px h-4 bg-outline-variant/30"></span>
                  <h2 className="text-xl italic tracking-wider font-headline text-tertiary-fixed">
                    Edit User Profile
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 transition-colors text-outline-variant hover:text-primary-container group"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </header>

              {/* Scrollable Body Content */}
              <div className="flex-1 p-8 overflow-y-auto lg:p-12 custom-scrollbar">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                  {/* Left Column: Identity & Security */}
                  <div className="flex flex-col gap-10 lg:col-span-4">
                    <section className="p-6 border bg-surface-container-low border-outline-variant/10">
                      <h3 className="font-label text-[11px] text-primary-container uppercase tracking-[0.2em] mb-6">
                        Profile Photo Management
                      </h3>
                      <div className="relative w-full mb-6 overflow-hidden border aspect-square bg-surface-container-highest border-outline-variant/30">
                        <img
                          alt="Profile large"
                          className="object-cover w-full h-full grayscale mix-blend-luminosity opacity-70"
                          src={formData.imageUrl}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 border-[8px] border-surface-container-low/50"></div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-label text-[10px] text-outline uppercase tracking-[0.2em]">
                          Upload New Photo
                        </label>
                        <input
                          name="imageUrl"
                          onChange={handleImageUpload}
                          className="w-full px-4 py-3 text-sm tracking-wider uppercase border-b rounded-none outline-none bg-surface-container-high border-outline-variant focus:border-primary focus:ring-0 font-label text-on-surface placeholder:text-outline-variant/30"
                          type="file"
                          placeholder="Enter image URL"
                        />
                        <button className="w-full text-outline-variant hover:text-error font-label text-[10px] py-2 tracking-widest transition-all uppercase rounded-none">
                          REMOVE PHOTO
                        </button>
                      </div>
                    </section>

                    <section className="p-6 border bg-surface-container-low border-outline-variant/10">
                      <h3 className="font-label text-[11px] text-primary-container uppercase tracking-[0.2em] mb-4">
                        Security
                      </h3>
                      <p className="font-body text-[11px] text-on-surface-variant mb-6 leading-relaxed">
                        Last credential rotation was performed 42 days ago.
                        Corporate policy requires a reset every 90 days.
                      </p>
                      <button className="w-full border border-outline-variant/40 text-on-surface font-label text-[10px] py-3 tracking-widest hover:bg-white/5 hover:border-outline-variant transition-all flex items-center justify-center gap-2 uppercase rounded-none">
                        <Lock className="w-3 h-3" />
                        PASSWORD RESET
                      </button>
                    </section>
                  </div>

                  {/* Right Column: Details */}
                  <div className="space-y-10 lg:col-span-8">
                    {/* Personal Info */}
                    <section className="p-8 border bg-surface-container-low border-outline-variant/10">
                      <h3 className="mb-8 text-2xl tracking-wide font-headline text-on-surface">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="col-span-2 space-y-2">
                          <label className="font-label text-[10px] text-outline uppercase tracking-[0.2em]">
                            Full Name
                          </label>
                          <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-sm tracking-wider text-black uppercase border-b rounded-none outline-none bg-surface-container-high border-outline-variant focus:border-primary focus:ring-0 font-label text-on-surface placeholder:text-outline-variant/30"
                            type="text"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-label text-[10px] text-outline uppercase tracking-[0.2em]">
                            Email
                          </label>
                          <input
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-sm tracking-wider text-black uppercase border-b rounded-none outline-none bg-surface-container-high border-outline-variant focus:border-primary focus:ring-0 font-label text-on-surface placeholder:text-outline-variant/30"
                            type="text"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-label text-[10px] text-outline uppercase tracking-[0.2em]">
                            Address
                          </label>
                          <input
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-sm tracking-wider text-black uppercase border-b rounded-none outline-none bg-surface-container-high border-outline-variant focus:border-primary focus:ring-0 font-label text-on-surface placeholder:text-outline-variant/30"
                            type="text"
                          />
                        </div>
                      </div>
                    </section>

                    {/* Contact */}
                    <section className="p-8 border bg-surface-container-low border-outline-variant/10">
                      <h3 className="mb-8 text-2xl tracking-wide font-headline text-on-surface">
                        Contact & Infrastructure
                      </h3>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="font-label text-[10px] text-outline uppercase tracking-[0.2em]">
                            Corporate Email
                          </label>
                          <div className="w-full px-4 py-3 text-sm border-b select-none bg-surface-container-lowest border-outline-variant/30 font-label text-outline-variant">
                            {formData.email}
                          </div>
                          <p className="text-[9px] font-label text-outline-variant uppercase tracking-tighter italic mt-1">
                            Managed by infrastructure admin
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="font-label text-[10px] text-outline uppercase tracking-[0.2em]">
                            Phone Extension
                          </label>
                          <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-sm tracking-wider border-b rounded-none outline-none bg-surface-container-high border-outline-variant focus:border-primary focus:ring-0 font-label text-on-surface text-black placeholder:text-outline-variant/30"
                            type="text"
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              {/* Modal Footer (Actions) */}
              <footer className="flex items-center justify-between flex-shrink-0 px-8 py-6 border-t bg-surface-container-lowest border-outline-variant/20">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 font-label text-[9px] text-primary-container">
                    <CheckCircle2 className="w-2 h-2 fill-primary-container" />{" "}
                    SYSTEM STABLE
                  </span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-8 py-3 border border-outline-variant/60 text-tertiary-fixed font-label text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 active:scale-95 transition-all rounded-none"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-10 py-3 bg-primary-container text-on-primary-container font-label font-bold text-[10px] uppercase tracking-[0.3em] hover:brightness-110 active:scale-95 shadow-xl transition-all rounded-none"
                  >
                    SAVE CHANGES
                  </button>
                </div>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 text-xs tracking-widest uppercase transition-all bg-primary-container text-on-primary-container font-label hover:brightness-110"
        >
          Open Profile Editor
        </button>
      )}
    </div>
  );
};
