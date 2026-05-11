"use client";
import React, { useState, useCallback } from "react";
import {
  Shield,
  Image as ImageIcon,
  Activity,
  Database,
  Lock,
  Maximize,
  Camera,
  File as FileIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavBar } from "@/Shared/Components/components/NavBar";
import { OpenAIService } from "@/Shared/Service/OpenAIService";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { sizeTransferFromPic } from "@/Shared/store/sizeTransferFromPic";
import ResultAnalyzePic from "@/features/AnalyzeFromPic/components/Result";
import { SizeCustomizer } from "@/features/Brand/components/SizeCustomizer";

export interface SystemDiagnostics {
  calibrationStatus: "OPERATIONAL" | "CALIBRATING" | "OFFLINE";
  confidence: number;
  activeNode: string;
  latency: string;
  opticalStandard: string;
  processingNode: string;
}

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
  const [diagnostics] = useState<SystemDiagnostics>({
    calibrationStatus: "OPERATIONAL",
    confidence: 99.98,
    activeNode: "US-EAST-MAIN-04",
    latency: "< 45ms Peak",
    opticalStandard: "ISO-9001:2024",
    processingNode: "Cluster-Alpha-7",
  });
  const { SetSizes } = sizeTransferFromPic();
  const { loadingAnalyze, setLoadingAnalyze } = useLoadingStore();
  const { sizes } = sizeTransferFromPic();
  const [file, setFile] = useState<FileInfo | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [inputMode, setInputMode] = useState<"upload" | "camera">("upload");
  const refCamera = React.useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [showResult, setShowResult] = useState(false);
  const [openSizeCustomizer, setOpenSizeCustomizer] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndSetFile = useCallback((selectedFile: File) => {
    if (!SUPPORTED_FILE_TYPES.includes(selectedFile.type)) {
      alert("Only JPG, PNG, and PDF files are supported right now.");
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      alert("Maximum payload is 50MB.");
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

  const handleClick = async () => {
    if (!file?.file) {
      alert("No file selected. Please upload or capture a file first.");
      return;
    }

    try {
      setLoadingAnalyze(true);
      setProgress(0);
      const sizeData = await OpenAIService().getMeasureWithPicture(file.file);

      if (!sizeData) {
        return;
      }

      setProgress(100);
      SetSizes(sizeData.sizes);
      console.log("Received Size Data:", sizeData);
      setShowResult(true);
      setFile(null);
    } catch (error: any) {
      const apiMessage =
        error?.response?.data ||
        error?.message ||
        "The upload failed. Please try again with a JPG, PNG, or PDF file.";
      alert(typeof apiMessage === "string" ? apiMessage : "The upload failed.");
    } finally {
      setLoadingAnalyze(false);
    }
  };

  const handleOpenCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCameraActive(true);
          if (refCamera.current) {
            refCamera.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
          alert(
            "Unable to access camera. Please check permissions and try again.",
          );
        });
    } else {
      alert("Camera not supported on this device or browser.");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, [validateAndSetFile]);

  const capturePicture = useCallback(() => {
    if (!refCamera.current || !canvasRef.current) {
      alert("Camera is not ready yet. Please wait and try again.");
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
      const capturedFile = new File([blob], "capture.png", {
        type: "image/png",
      });
      validateAndSetFile(capturedFile);
    }, "image/png");
  }, [validateAndSetFile]);

  return (
    <div className="min-h-screen font-sans bg-[#f8fafc] text-aged-white selection:bg-[#2563eb] selection:text-white">
      {sizes && sizes.length > 0 && showResult === true  ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <ResultAnalyzePic CLosed={() => setShowResult(false)} showCustomizer={setOpenSizeCustomizer} showResult={setShowResult} />
        </div>
      ) : null}
      {
        openSizeCustomizer && (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-100 backdrop-blur-sm">
            <SizeCustomizer type="image" />
          </div>
        )
      }
      <div className="flex flex-col w-full min-h-screen mx-auto border-x border-[#2563eb]/20">
        <NavBar />
        <main className="grid flex-1 grid-cols-12">
          <div className="col-span-8 p-10 border-r border-[#2563eb]/20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="font-serif text-3xl tracking-tight uppercase text-aged-white">
                Enterprise Size Estimation
              </h2>
              <p className="font-mono text-xs tracking-widest uppercase text-[#2563eb]/60">
                Module Access: Restricted
              </p>
            </motion.div>

            {loadingAnalyze === true ? (
              <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-[#2563eb]/30 bg-[#2563eb]/[0.03] p-12 md:p-20 mb-10 group transition-all duration-500 hover:bg-[#2563eb]/[0.05] hover:border-[#2563eb]/50">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#2563eb]/40"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#2563eb]/40"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#2563eb]/40"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#2563eb]/40"></div>

                <div className="flex flex-col items-center w-full max-w-md gap-8 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Maximize
                      className="w-16 h-16 text-[#2563eb]"
                      strokeWidth={1}
                    />
                  </motion.div>

                  <div className="w-full space-y-6">
                    <p className="font-serif text-xl md:text-2xl font-bold text-aged-white uppercase tracking-[0.25em]">
                      Analyzing Geometry...
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                        <span className="text-[#2563eb]">
                          Normalizing Data Points...
                        </span>
                        <span className="text-[#2563eb]/40">Active</span>
                      </div>
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                        <span className="text-[#2563eb]/60">
                          Cross-Referencing Brand Logic...
                        </span>
                        <span className="text-[#2563eb]/40">Pending</span>
                      </div>
                    </div>

                    <div className="w-full h-10 border border-[#2563eb]/30 p-1.5 bg-[#f8fafc]/80 relative overflow-hidden">
                      <motion.div
                        className="relative h-full overflow-hidden bg-[#2563eb]"
                        style={{ width: `${progress}%` }}
                        transition={{
                          type: "spring",
                          bounce: 0,
                          duration: 0.5,
                        }}
                      >
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </motion.div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[10px] text-[#2563eb] uppercase tracking-[0.4em]">
                        {Math.floor(progress)}% Complete
                      </p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 rounded-full ${i < progress / 20 ? "bg-[#2563eb]" : "bg-[#2563eb]/20"}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : inputMode === "upload" ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`group relative flex flex-col items-center justify-center border-2 border-dashed p-16 transition-all duration-300 ${
                  isDragging
                    ? "border-[#2563eb] bg-[#2563eb]/10"
                    : "border-[#2563eb]/40 bg-[#2563eb]/5 hover:border-[#2563eb]/70"
                }`}
              >
                <div className="flex flex-col items-center gap-6 text-center">
                  <motion.div
                    animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                    className="text-[#2563eb]/40 group-hover:text-[#2563eb]"
                  >
                    <ImageIcon className="w-12 h-12" />
                  </motion.div>

                  <div className="max-w-[400px]">
                    <p className="mb-3 font-serif text-xl font-bold tracking-wider uppercase text-aged-white">
                      {file ? "Chart Loaded" : "Drag & Drop Size Chart"}
                    </p>
                    <p className="font-mono text-[11px] uppercase leading-relaxed tracking-wide text-aged-white/60">
                      {file ? (
                        <span className="text-[#2563eb]">
                          {file.name} ({file.size})
                        </span>
                      ) : (
                        <>
                          Ensure chart is clear and legible. <br />
                          Supported formats: JPG, PNG, PDF. <br />
                          CSV is not supported for AI chart extraction yet. <br />
                          Maximum payload: 50MB.
                        </>
                      )}
                    </p>
                  </div>
                  <label
                    htmlFor="fileInput"
                    className="mt-6 border border-[#2563eb] px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#2563eb] cursor-pointer transition-all hover:bg-[#2563eb] hover:text-white"
                  >
                    <span>Select File</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,application/pdf"
                      className="hidden"
                      id="fileInput"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          validateAndSetFile(selectedFile);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            ) : inputMode == "camera" ? (
              <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-[#2563eb]/30 bg-[#2563eb]/[0.03] text-center">
                <Camera className="w-16 h-16 text-[#2563eb]" />
                <p className="mt-4 font-serif text-xl font-bold tracking-wider uppercase text-aged-white">
                  Camera Mode Active
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-wide text-aged-white/60">
                  Point your camera at a size chart to capture and analyze in
                  real-time. <br />
                  Ensure good lighting and clear focus for optimal results.
                </p>
                <button
                  onClick={handleOpenCamera}
                  className="mt-6 border border-[#2563eb] px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#2563eb] transition-all hover:bg-[#2563eb] hover:text-white"
                >
                  Activate Camera
                </button>
                <button
                  onClick={() => setInputMode("upload")}
                  className="mt-6 border border-[#2563eb] px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#2563eb] transition-all hover:bg-[#2563eb] hover:text-white"
                >
                  Switch to Image Upload
                </button>
              </div>
            ) : null}
            <div
              className={`${cameraActive ? "block" : "hidden"} relative flex flex-col items-center justify-center p-16 transition-all duration-300 border-2 border-dashed border-[#2563eb]/40 bg-[#2563eb]/5 hover:border-[#2563eb]/70`}
            >
              <video
                ref={refCamera}
                autoPlay
                playsInline
                className="w-full max-w-md border rounded-md border-[#2563eb]/20"
              />
              <canvas ref={canvasRef} className="hidden" />
              <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-wide text-aged-white/60">
                Camera mode is active. Please capture a clear image of the size
                chart for analysis.
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-[#2563eb]/10">
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase text-[#2563eb]/50">
                  Optical Standard
                </p>
                <p className="font-mono text-xs text-aged-white">
                  {diagnostics.opticalStandard}
                </p>
              </div>
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase text-[#2563eb]/50">
                  Latency Profile
                </p>
                <p className="font-mono text-xs text-aged-white">
                  {diagnostics.latency}
                </p>
              </div>
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase text-[#2563eb]/50">
                  Processing Node
                </p>
                <p className="font-mono text-xs text-aged-white">
                  {diagnostics.processingNode}
                </p>
              </div>
            </div>
          </div>

          <aside className="col-span-4 flex flex-col gap-8 bg-[#2563eb]/[0.02] p-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 animate-pulse bg-[#2563eb]" />
                <h3 className="font-serif text-lg font-bold tracking-widest uppercase text-aged-white">
                  System Diagnostics
                </h3>
              </div>
              <div className="mb-6 h-[1px] w-full bg-gradient-to-r from-brass/40 to-transparent" />
            </div>
            <div className="flex flex-row gap-4">
              <button
                type="button"
                onClick={() => setInputMode("upload")}
                className={`flex w-40 h-20 items-center gap-3 px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase border transition-all duration-200 ${
                  inputMode === "upload"
                    ? "border-[#2563eb] bg-[#2563eb]/10 text-[#2563eb] shadow-[0_0_20px_rgba(212,163,64,0.25)]"
                    : "border-[#2563eb]/20 text-[#2563eb]/70 hover:border-[#2563eb]/40 hover:bg-[#2563eb]/5 hover:text-[#2563eb]"
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-[#f8fafc]/70 border-[#2563eb]/40">
                  <FileIcon className="w-4 h-4 text-[#2563eb]" />
                </div>
                <span className="leading-tight text-left">
                  Image
                  <span className="block text-[9px] tracking-[0.22em] text-[#2563eb]/60">
                    Upload Mode
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setInputMode("camera")}
                className={`flex w-40 h-20 items-center gap-3 px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase border transition-all duration-200 ${
                  inputMode === "camera"
                    ? "border-[#2563eb] bg-[#2563eb]/10 text-[#2563eb] shadow-[0_0_20px_rgba(212,163,64,0.25)]"
                    : "border-[#2563eb]/20 text-[#2563eb]/70 hover:border-[#2563eb]/40 hover:bg-[#2563eb]/5 hover:text-[#2563eb]"
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-[#f8fafc]/70 border-[#2563eb]/40">
                  <Camera className="w-4 h-4 text-[#2563eb]" />
                </div>
                <span className="leading-tight text-left">
                  Camera
                  <span className="block text-[9px] tracking-[0.22em] text-[#2563eb]/60">
                    Live Capture
                  </span>
                </span>
              </button>
            </div>
            <div className="flex flex-row justify-between">
              <p className="mb-1 font-mono text-[10px] uppercase text-[#2563eb]/50">
                Module Version
              </p>
              <p className="font-mono text-xs text-aged-white">
                Raidexi AI v2.0.4
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-5 border border-[#2563eb]/20 bg-[#f8fafc]/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#2563eb]/60">
                    Calibration Status
                  </p>
                  <Activity className="w-3 h-3 text-[#2563eb]/40" />
                </div>
                <p className="font-mono text-2xl font-bold tracking-tighter text-aged-white">
                  {diagnostics.calibrationStatus}
                </p>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 ${i <= 3 ? "bg-[#2563eb]" : "bg-[#2563eb]/20"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-5 border border-[#2563eb]/20 bg-[#f8fafc]/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#2563eb]/60">
                    System Confidence
                  </p>
                  <Shield className="w-3 h-3 text-[#2563eb]/40" />
                </div>
                <p className="font-mono text-2xl font-bold tracking-tighter text-aged-white">
                  {diagnostics.confidence}
                  <span className="ml-1 text-sm text-[#2563eb]/40">%</span>
                </p>
              </div>

              <div className="p-5 border border-[#2563eb]/20 bg-[#f8fafc]/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#2563eb]/60">
                    Active Node
                  </p>
                  <Database className="w-3 h-3 text-[#2563eb]/40" />
                </div>
                <p className="font-mono text-sm tracking-widest text-aged-white">
                  {diagnostics.activeNode}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase text-[#2563eb]/40">
                  Relay active via redundant fiber
                </p>
              </div>
            </div>

            {cameraActive && (
              <button
                onClick={capturePicture}
                className="mt-4 border border-[#2563eb] px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] cursor-pointer text-[#2563eb] transition-all hover:bg-[#2563eb] hover:text-white"
              >
                Capture Image
              </button>
            )}

            {file && (
              <button
                onClick={handleClick}
                disabled={loadingAnalyze}
                className="mt-4 border border-[#2563eb] px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] cursor-pointer text-[#2563eb] transition-all hover:bg-[#2563eb] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingAnalyze ? "Analyzing..." : "Analyze File"}
              </button>
            )}

            <div className="pt-10 mt-auto">
              <div className="relative flex items-end w-full h-12 overflow-hidden border-b border-[#2563eb]/20">
                <div className="absolute inset-x-0 bottom-0 flex justify-between h-4 px-1">
                  {Array.from({ length: 21 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-[1px] ${
                        i % 10 === 0
                          ? "h-full bg-[#2563eb]/40"
                          : i % 5 === 0
                            ? "h-3 bg-[#2563eb]/30"
                            : "h-2 bg-[#2563eb]/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-[#2563eb]/30">
                Metric Calibration Reference (mm)
              </p>
            </div>
          </aside>
        </main>

        <footer className="flex items-center justify-between px-8 py-4 border-t border-[#2563eb]/20 bg-[#f8fafc]">
          <p className="font-mono text-[9px] uppercase tracking-widest-plus text-[#2563eb]/40">
            Proprietary Infrastructure // Raidexi Core
          </p>
          <div className="flex items-center gap-4">
            <Lock className="w-3 h-3 text-[#2563eb]/40" />
            <p className="font-mono text-[9px] uppercase tracking-widest-plus text-[#2563eb]/40">
              Encrypted Session 0xBF812
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
