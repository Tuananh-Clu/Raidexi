"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  Shield,
  Image as ImageIcon,
  Activity,
  Database,
  Lock,
  Maximize,
  Camera,
  File,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavBar } from "@/Shared/Components/components/NavBar";
import { OpenAIService } from "@/Shared/Service/OpenAIService";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { sizeTransferFromPic } from "@/Shared/store/sizeTransferFromPic";
import ResultAnalyzePic from "@/features/AnalyzeFromPic/components/Result";
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
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<"upload" | "camera">("upload");
  const refCamera = React.useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setBase64Image(reader.result as string);
    };

    reader.readAsDataURL(file.file);
  }, [file]);
  const handleClick = async () => {
    console.log("Base64 Image:", base64Image);
    setLoadingAnalyze(true);
    const sizeData = await OpenAIService().getMeasureWithPicture(base64Image!);
    SetSizes(sizeData.sizes);
    setLoadingAnalyze(false);
    console.log("Received Size Data:", sizeData);
  };
  const handleOpenCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (refCamera.current) {
            refCamera.current.srcObject = stream;
            setCameraActive(true);
          }
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
          alert(
            "Unable to access camera. Please check permissions and try again.",
          );
        });
    }
  };
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile({
        name: droppedFile.name,
        size: `${(droppedFile.size / (1024 * 1024)).toFixed(2)} MB`,
        type: droppedFile.type,
        status: "complete",
        file: droppedFile,
      });
    }
  }, []);
  const capturePicture = () => {
    if (refCamera.current && canvasRef.current) {
      const video = refCamera.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (!blob) return;

          const capturedFile = new File([blob], "capture.png", {
            type: "image/png",
          });

          setFile({
            name: capturedFile.name,
            size: `${(capturedFile.size / (1024 * 1024)).toFixed(2)} MB`,
            type: capturedFile.type,
            status: "complete",
            file: capturedFile,
          });
        }, "image/png");
      }
    }
  };
  return (
    <div className="min-h-screen font-sans bg-background-dark text-aged-white selection:bg-brass selection:text-background-dark">
      {sizes != null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <ResultAnalyzePic />
        </div>
      ) : null}
      <div className="flex flex-col w-full min-h-screen mx-auto border-x border-brass/20">
        <NavBar />
        <main className="grid flex-1 grid-cols-12">
          <div className="col-span-8 p-10 border-r border-brass/20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="font-serif text-3xl tracking-tight uppercase text-aged-white">
                Enterprise Size Estimation
              </h2>
              <p className="font-mono text-xs tracking-widest uppercase text-brass/60">
                Module Access: Restricted
              </p>
            </motion.div>

            {loadingAnalyze === true ? (
              <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-brass/30 bg-brass/[0.03] p-12 md:p-20 mb-10 group transition-all duration-500 hover:bg-brass/[0.05] hover:border-brass/50">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brass/40"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brass/40"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brass/40"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brass/40"></div>

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
                      className="w-16 h-16 text-brass"
                      strokeWidth={1}
                    />
                  </motion.div>

                  <div className="w-full space-y-6">
                    <p className="font-serif text-xl md:text-2xl font-bold text-aged-white uppercase tracking-[0.25em]">
                      Analyzing Geometry...
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                        <span className="text-brass">
                          Normalizing Data Points...
                        </span>
                        <span className="text-brass/40">Active</span>
                      </div>
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                        <span className="text-brass/60">
                          Cross-Referencing Brand Logic...
                        </span>
                        <span className="text-brass/40">Pending</span>
                      </div>
                    </div>

                    <div className="w-full h-10 border border-brass/30 p-1.5 bg-background-dark/80 relative overflow-hidden">
                      <motion.div
                        className="relative h-full overflow-hidden bg-brass"
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
                      <p className="font-mono text-[10px] text-brass uppercase tracking-[0.4em]">
                        {Math.floor(progress)}% Complete
                      </p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 rounded-full ${i < progress / 20 ? "bg-brass" : "bg-brass/20"}`}
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
                    ? "border-brass bg-brass/10"
                    : "border-brass/40 bg-brass/5 hover:border-brass/70"
                }`}
              >
                <div className="flex flex-col items-center gap-6 text-center">
                  <motion.div
                    animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                    className="text-brass/40 group-hover:text-brass"
                  >
                    <ImageIcon className="w-12 h-12" />
                  </motion.div>

                  <div className="max-w-[400px]">
                    <p className="mb-3 font-serif text-xl font-bold tracking-wider uppercase text-aged-white">
                      {file ? "Chart Loaded" : "Drag & Drop Size Chart"}
                    </p>
                    <p className="font-mono text-[11px] uppercase leading-relaxed tracking-wide text-aged-white/60">
                      {file ? (
                        <span className="text-brass">
                          {file.name} ({file.size})
                        </span>
                      ) : (
                        <>
                          Ensure chart is clear and legible. <br />
                          Supported formats: JPG, PNG, PDF. <br />
                          Maximum payload: 50MB.
                        </>
                      )}
                    </p>
                  </div>
                 <label htmlFor="fileInput" className="mt-6 border border-brass px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brass cursor-pointer transition-all hover:bg-black hover:text-background-dark">
                  <h1>Select File</h1>
                   <input type="file" accept="image/*" className="hidden" id="fileInput" onChange={(e) => {  
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setFile({
                        name: selectedFile.name,
                        size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
                        type: selectedFile.type,
                        status: "complete",
                        file: selectedFile,
                      });
                    }
                  }}>
                    </input>

                  </label>
                </div>
              </div>
            ) : 
            cameraActive==true && refCamera ? (
                            <div className="relative flex flex-col items-center justify-center p-16 transition-all duration-300 border-2 border-dashed border-brass/40 bg-brass/5 hover:border-brass/70">
                <video
                  ref={refCamera}
                  autoPlay
                  className="w-full max-w-md border rounded-md border-brass/20"
                />
                <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-wide text-aged-white/60">
                  Camera mode is active. Please capture a clear image of the
                  size chart for analysis.
                </p>
              </div>
            ):
            (
              <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-brass/30 bg-brass/[0.03] text-center">
                <Camera className="w-16 h-16 text-brass" />
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
                  className="mt-6 border border-brass px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brass transition-all hover:bg-black hover:text-background-dark"
                >
                  Activate Camera
                </button>
                <button
                  onClick={() => setInputMode("upload")}
                  className="mt-6 border border-brass px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brass transition-all hover:bg-black hover:text-background-dark"
                >
                  Switch to Image Upload
                </button>
              </div>
            )}

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-brass/10">
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase text-brass/50">
                  Optical Standard
                </p>
                <p className="font-mono text-xs text-aged-white">
                  {diagnostics.opticalStandard}
                </p>
              </div>
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase text-brass/50">
                  Latency Profile
                </p>
                <p className="font-mono text-xs text-aged-white">
                  {diagnostics.latency}
                </p>
              </div>
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase text-brass/50">
                  Processing Node
                </p>
                <p className="font-mono text-xs text-aged-white">
                  {diagnostics.processingNode}
                </p>
              </div>
            </div>
          </div>

          <aside className="col-span-4 flex flex-col gap-8 bg-brass/[0.02] p-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 animate-pulse bg-brass" />
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
                    ? "border-brass bg-brass/10 text-brass shadow-[0_0_20px_rgba(212,163,64,0.25)]"
                    : "border-brass/20 text-brass/70 hover:border-brass/40 hover:bg-brass/5 hover:text-brass"
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-background-dark/70 border-brass/40">
                  <File className="w-4 h-4 text-brass" />
                </div>
                <span className="leading-tight text-left">
                  Image
                  <span className="block text-[9px] tracking-[0.22em] text-brass/60">
                    Upload Mode
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setInputMode("camera")}
                className={`flex w-40 h-20 items-center gap-3 px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase border transition-all duration-200 ${
                  inputMode === "camera"
                    ? "border-brass bg-brass/10 text-brass shadow-[0_0_20px_rgba(212,163,64,0.25)]"
                    : "border-brass/20 text-brass/70 hover:border-brass/40 hover:bg-brass/5 hover:text-brass"
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-background-dark/70 border-brass/40">
                  <Camera className="w-4 h-4 text-brass" />
                </div>
                <span className="leading-tight text-left">
                  Camera
                  <span className="block text-[9px] tracking-[0.22em] text-brass/60">
                    Live Capture
                  </span>
                </span>
              </button>
            </div>
            <div className="flex flex-row justify-between ">
              <p className="mb-1 font-mono text-[10px] uppercase text-brass/50">
                Module Version
              </p>
              <p className="font-mono text-xs text-aged-white">
                Raidexi AI v2.0.4
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-5 border border-brass/20 bg-background-dark/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brass/60">
                    Calibration Status
                  </p>
                  <Activity className="w-3 h-3 text-brass/40" />
                </div>
                <p className="font-mono text-2xl font-bold tracking-tighter text-aged-white">
                  {diagnostics.calibrationStatus}
                </p>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 ${i <= 3 ? "bg-brass" : "bg-brass/20"}`}
                    />
                  ))}
                </div>
              </div>

              {/* System Confidence */}
              <div className="p-5 border border-brass/20 bg-background-dark/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brass/60">
                    System Confidence
                  </p>
                  <Shield className="w-3 h-3 text-brass/40" />
                </div>
                <p className="font-mono text-2xl font-bold tracking-tighter text-aged-white">
                  {diagnostics.confidence}
                  <span className="ml-1 text-sm text-brass/40">%</span>
                </p>
              </div>

              <div className="p-5 border border-brass/20 bg-background-dark/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brass/60">
                    Active Node
                  </p>
                  <Database className="w-3 h-3 text-brass/40" />
                </div>
                <p className="font-mono text-sm tracking-widest text-aged-white">
                  {diagnostics.activeNode}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase text-brass/40">
                  Relay active via redundant fiber
                </p>
              </div>
            </div>
            {file && (
              <button
                onClick={handleClick}
                className="mt-4 border border-brass px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] cursor-pointer text-brass transition-all hover:bg-black hover:text-background-dark"
              >
                {loadingAnalyze ? "Analyzing..." : "Analyze Image"}
              </button>
            )}

            <div className="pt-10 mt-auto">
              <div className="relative flex items-end w-full h-12 overflow-hidden border-b border-brass/20">
                <div className="absolute inset-x-0 bottom-0 flex justify-between h-4 px-1">
                  {Array.from({ length: 21 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-[1px] ${
                        i % 10 === 0
                          ? "h-full bg-brass/40"
                          : i % 5 === 0
                            ? "h-3 bg-brass/30"
                            : "h-2 bg-brass/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-brass/30">
                Metric Calibration Reference (mm)
              </p>
            </div>
          </aside>
        </main>


        <footer className="flex items-center justify-between px-8 py-4 border-t border-brass/20 bg-background-dark">
          <p className="font-mono text-[9px] uppercase tracking-widest-plus text-brass/40">
            Proprietary Infrastructure // Raidexi Core
          </p>
          <div className="flex items-center gap-4">
            <Lock className="w-3 h-3 text-brass/40" />
            <p className="font-mono text-[9px] uppercase tracking-widest-plus text-brass/40">
              Encrypted Session 0xBF812
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
