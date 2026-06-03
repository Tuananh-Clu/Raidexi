"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { Activity, Camera, File as FileIcon, Image as ImageIcon, Lock, Maximize, Shield, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { NavBar } from "@/Shared/Components/components/NavBar";
import { OpenAIService } from "@/Shared/Service/OpenAIService";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { sizeTransferFromPic } from "@/Shared/store/sizeTransferFromPic";
import ResultAnalyzePic from "@/features/AnalyzeFromPic/components/Result";
import { SizeCustomizer } from "@/features/Brand/components/SizeCustomizer";

export interface FileInfo {
  file: File;
  name: string;
  size: string;
  type: string;
  status: "idle" | "uploading" | "complete" | "error";
}

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;
const SUPPORTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export default function AIAnalyzeImage() {
  const [progress, setProgress] = useState(0);
  const { SetSizes, sizes } = sizeTransferFromPic();
  const { loadingAnalyze, setLoadingAnalyze } = useLoadingStore();
  const [file, setFile] = useState<FileInfo | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [inputMode, setInputMode] = useState<"upload" | "camera">("upload");
  const [cameraActive, setCameraActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [openSizeCustomizer, setOpenSizeCustomizer] = useState(false);
  const refCamera = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const diagnostics = useMemo(
    () => [
      { label: "Trạng thái hiệu chuẩn", value: "Đang hoạt động", icon: Activity },
      { label: "Độ tin cậy hệ thống", value: "99.98%", icon: Shield },
      { label: "Độ trễ xử lý", value: "< 45ms", icon: Maximize },
      { label: "Phiên bảo mật", value: "0xBF812", icon: Lock },
    ],
    [],
  );

  const validateAndSetFile = useCallback((selectedFile: File) => {
    if (!SUPPORTED_FILE_TYPES.includes(selectedFile.type)) {
      alert("Hiện chỉ hỗ trợ tệp JPG, PNG và PDF.");
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      alert("Dung lượng tối đa là 50MB.");
      return false;
    }

    setFile({
      name: selectedFile.name,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
      type: selectedFile.type,
      status: "complete",
      file: selectedFile,
    });

    return true;
  }, []);

  const handleAnalyze = async () => {
    if (!file?.file) {
      alert("Chưa chọn tệp. Vui lòng tải lên hoặc chụp ảnh trước.");
      return;
    }

    try {
      setLoadingAnalyze(true);
      setProgress(18);
      const sizeData = await OpenAIService().getMeasureWithPicture(file.file);
      if (!sizeData) return;

      setProgress(100);
      SetSizes(sizeData.sizes);
      setShowResult(true);
      setFile(null);
    } catch (error: any) {
      const apiMessage =
        error?.response?.data ||
        error?.message ||
        "Tải lên thất bại. Vui lòng thử lại bằng tệp JPG, PNG hoặc PDF.";
      alert(typeof apiMessage === "string" ? apiMessage : "Tải lên thất bại.");
    } finally {
      setLoadingAnalyze(false);
    }
  };

  const handleOpenCamera = () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Thiết bị hoặc trình duyệt này không hỗ trợ camera.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setCameraActive(true);
        if (refCamera.current) refCamera.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Không thể truy cập camera:", err);
        alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập và thử lại.");
      });
  };

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) validateAndSetFile(droppedFile);
    },
    [validateAndSetFile],
  );

  const capturePicture = useCallback(() => {
    if (!refCamera.current || !canvasRef.current) {
      alert("Camera chưa sẵn sàng. Vui lòng chờ và thử lại.");
      return;
    }

    const video = refCamera.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      validateAndSetFile(new File([blob], "bang-size-chup-tu-camera.png", { type: "image/png" }));
    }, "image/png");
  }, [validateAndSetFile]);

  return (
    <div className="rx-page min-h-screen">
      {sizes && sizes.length > 0 && showResult ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(24,23,20,0.82)] p-4 backdrop-blur-xl">
          <ResultAnalyzePic CLosed={() => setShowResult(false)} showCustomizer={setOpenSizeCustomizer} showResult={setShowResult} />
        </div>
      ) : null}

      {openSizeCustomizer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(24,23,20,0.82)] p-4 backdrop-blur-xl">
          <SizeCustomizer type="image" />
        </div>
      ) : null}

      <NavBar />
      <main className="rx-container grid gap-8 px-4 pb-16 pt-32 lg:grid-cols-[1fr_23rem]">
        <section className="rx-shell">
          <div className="rx-core p-6 md:p-8">
            <div className="mb-8 flex flex-col justify-between gap-5 border-b border-[rgba(24,23,20,0.1)] pb-7 md:flex-row md:items-end">
              <div>
                <span className="rx-badge rx-badge-blue">Phân tích bảng size</span>
                <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[var(--ink)] md:text-5xl">
                  Trích xuất bảng size từ ảnh hoặc PDF.
                </h1>
                <p className="rx-copy mt-4 max-w-2xl">
                  Tải bảng size của thương hiệu lên để Raidexi đọc thông số, chuẩn hóa dữ liệu và dùng cùng hồ sơ số đo của bạn.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setInputMode("upload")}
                  className={`rx-btn ${inputMode === "upload" ? "rx-btn-primary" : "rx-btn-secondary"}`}
                  type="button"
                >
                  <FileIcon size={15} strokeWidth={1.35} />
                  Tải tệp
                </button>
                <button
                  onClick={() => setInputMode("camera")}
                  className={`rx-btn ${inputMode === "camera" ? "rx-btn-primary" : "rx-btn-secondary"}`}
                  type="button"
                >
                  <Camera size={15} strokeWidth={1.35} />
                  Camera
                </button>
              </div>
            </div>

            {loadingAnalyze ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[1.6rem] bg-[rgba(93,116,101,0.08)] p-10 text-center ring-1 ring-[rgba(93,116,101,0.16)]">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.58, 1, 0.58] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-paper)] text-[var(--signal-blue)] ring-1 ring-[rgba(24,23,20,0.1)]"
                >
                  <Maximize size={34} strokeWidth={1.2} />
                </motion.div>
                <p className="rx-label text-[var(--signal-blue)]">Đang phân tích hình học</p>
                <h2 className="mt-3 text-3xl font-extrabold text-[var(--ink)]">Đang chuẩn hóa bảng size</h2>
                <div className="mt-7 h-2 w-full max-w-md overflow-hidden rounded-full bg-[rgba(24,23,20,0.08)]">
                  <motion.div
                    className="h-full rounded-full bg-[var(--signal-blue)]"
                    animate={{ width: [`${progress}%`, "82%", "96%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            ) : inputMode === "upload" ? (
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={handleDrop}
                className={`flex min-h-[420px] flex-col items-center justify-center rounded-[1.6rem] border-2 border-dashed p-10 text-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isDragging
                    ? "border-[var(--signal-blue)] bg-[rgba(93,116,101,0.1)]"
                    : "border-[rgba(93,116,101,0.34)] bg-[rgba(255,253,247,0.62)]"
                }`}
              >
                <ImageIcon className="mb-6 text-[var(--signal-blue)]" size={48} strokeWidth={1.2} />
                <h2 className="text-3xl font-extrabold text-[var(--ink)]">
                  {file ? "Đã tải bảng size" : "Kéo thả bảng size vào đây"}
                </h2>
                <p className="rx-copy mt-3 max-w-lg text-sm">
                  {file
                    ? `${file.name} (${file.size})`
                    : "Hỗ trợ JPG, PNG và PDF. Bảng càng rõ, kết quả trích xuất càng ổn định."}
                </p>
                <label className="rx-btn rx-btn-secondary mt-7 cursor-pointer">
                  <Upload size={15} strokeWidth={1.35} />
                  Chọn tệp
                  <input
                    type="file"
                    accept="image/png,image/jpeg,application/pdf"
                    className="hidden"
                    onChange={(event) => {
                      const selectedFile = event.target.files?.[0];
                      if (selectedFile) validateAndSetFile(selectedFile);
                    }}
                  />
                </label>
              </div>
            ) : (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[1.6rem] bg-[rgba(255,253,247,0.62)] p-8 text-center ring-1 ring-[rgba(24,23,20,0.1)]">
                {cameraActive ? (
                  <>
                    <video
                      ref={refCamera}
                      autoPlay
                      playsInline
                      className="aspect-video w-full max-w-2xl rounded-[1.2rem] object-cover ring-1 ring-[rgba(24,23,20,0.12)]"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    <p className="rx-copy mt-5 max-w-lg text-sm">Đặt bảng size trong khung hình rõ nét rồi chụp lại để phân tích.</p>
                    <button onClick={capturePicture} className="rx-btn rx-btn-primary mt-6" type="button">
                      <Camera size={15} strokeWidth={1.35} />
                      Chụp ảnh
                    </button>
                  </>
                ) : (
                  <>
                    <Camera className="mb-6 text-[var(--signal-blue)]" size={52} strokeWidth={1.2} />
                    <h2 className="text-3xl font-extrabold text-[var(--ink)]">Chụp bảng size bằng camera</h2>
                    <p className="rx-copy mt-3 max-w-lg text-sm">Dùng ánh sáng đều và giữ bảng size phẳng để AI đọc thông số dễ hơn.</p>
                    <button onClick={handleOpenCamera} className="rx-btn rx-btn-primary mt-7" type="button">
                      Bật camera
                    </button>
                  </>
                )}
              </div>
            )}

            {file ? (
              <div className="mt-6 flex flex-col justify-between gap-3 rounded-[1.35rem] bg-[rgba(24,23,20,0.04)] p-4 ring-1 ring-[rgba(24,23,20,0.08)] md:flex-row md:items-center">
                <div>
                  <p className="rx-label">Tệp sẵn sàng</p>
                  <p className="mt-1 text-sm font-bold text-[var(--ink)]">{file.name}</p>
                </div>
                <button onClick={handleAnalyze} disabled={loadingAnalyze} className="rx-btn rx-btn-primary" type="button">
                  Phân tích tệp
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rx-shell">
            <div className="rx-core p-6">
              <span className="rx-badge rx-badge-brass">Chẩn đoán hệ thống</span>
              <div className="mt-5 space-y-3">
                {diagnostics.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-b border-[rgba(24,23,20,0.08)] py-3 last:border-b-0">
                    <span className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--ink-soft)]">
                      <Icon size={15} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
                      {label}
                    </span>
                    <span className="font-mono text-xs font-bold text-[var(--ink)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rx-shell">
            <div className="rx-core p-6">
              <span className="rx-badge">Định dạng hỗ trợ</span>
              <p className="rx-copy mt-4 text-sm">
                JPG, PNG và PDF dưới 50MB. CSV chưa được hỗ trợ cho trích xuất bảng size bằng AI.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
