"use client";

import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Maximize, Ruler, Sun, User } from "lucide-react";
import { DrawPointLandmark } from "../hooks/DrawCanvas";
import { HandleMeasureEstimate } from "../hooks/HandleMeasureEstimate";
import { detectPose } from "../hooks/DetermineMeasure";

interface ViewportProps {
  showGrid: boolean;
  triggerFlash: boolean;
}

const guideItems = [
  { icon: Ruler, text: "Đứng thẳng, nhìn về phía trước" },
  { icon: Maximize, text: "Dang tay khoảng 45 độ so với thân" },
  { icon: User, text: "Đặt toàn thân trong vùng hiệu chuẩn" },
  { icon: Sun, text: "Ánh sáng đều, nền đơn giản" },
];

const Viewport: React.FC<ViewportProps> = ({ showGrid, triggerFlash }) => {
  const [flashActive, setFlashActive] = useState(false);
  const [countDowns, setCountDowns] = useState(5);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mpCameraRef = useRef<any | null>(null);
  const poseRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const context = useContext(BodyMeasureEstimateContext);

  useEffect(() => {
    if (!triggerFlash) return;
    setFlashActive(true);
    const timer = setTimeout(() => setFlashActive(false), 150);
    return () => clearTimeout(timer);
  }, [triggerFlash]);

  useEffect(() => {
    if (!context.measuring) {
      setCountDowns(5);
      context.setCountdown?.(20);
      return;
    }

    let count = 5;
    const countdownInterval = setInterval(() => {
      count -= 1;
      setCountDowns(count);
      if (count <= 0) {
        clearInterval(countdownInterval);
        context.setCountdown?.(15);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [context.measuring, context.setCountdown]);

  useEffect(() => {
    if (countDowns !== 0) return;

    const measurementTimer = setInterval(() => {
      if (context.countdown === 0) {
        clearInterval(measurementTimer);
        return;
      }
      context.setCountdown?.((previous: number) => previous - 1);
    }, 1000);

    return () => clearInterval(measurementTimer);
  }, [context.countdown, context.setCountdown, countDowns]);

  const onResults = useCallback(
    (results: any) => {
      if (!results.poseWorldLandmarks || !canvasRef.current || !videoRef.current || !poseRef.current) return;

      const canvasCtx = canvasRef.current.getContext("2d");
      if (!canvasCtx) return;

      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;
      if (videoWidth === 0 || videoHeight === 0) return;

      if (canvasRef.current.width !== videoWidth || canvasRef.current.height !== videoHeight) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
      }

      canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
      canvasCtx.save();

      try {
        DrawPointLandmark(canvasCtx, "rgba(93,116,101,0.82)", results, canvasRef);
      } catch (error) {
        console.error("Error drawing landmarks:", error);
      }

      const landmarks = [
        results.poseLandmarks?.[0],
        results.poseLandmarks?.[11],
        results.poseLandmarks?.[12],
        results.poseLandmarks?.[23],
        results.poseLandmarks?.[24],
        results.poseLandmarks?.[25],
        results.poseLandmarks?.[26],
        results.poseLandmarks?.[27],
        results.poseLandmarks?.[28],
      ];

      const allLandmarksPresent = landmarks.every((landmark) => (landmark?.visibility ?? 0) > 0);
      if (!allLandmarksPresent) {
        canvasCtx.restore();
        return;
      }

      if (context.measuring && countDowns < 1) {
        try {
          const type = detectPose(results.poseWorldLandmarks);
          HandleMeasureEstimate({
            context,
            canvasCtx,
            results: { poseWorldLandmarks: results.poseWorldLandmarks },
            type,
          });
        } catch (error) {
          console.error("Error in measurement:", error);
        }
      }

      canvasCtx.restore();
    },
    [context, countDowns],
  );

  useEffect(() => {
    if (poseRef.current) poseRef.current.onResults(onResults);
  }, [onResults]);

  const cleanup = useCallback(() => {
    if (mpCameraRef.current) {
      const track = mpCameraRef.current.video.srcObject?.getTracks().find((item: any) => item.kind === "video");
      track?.stop();
      mpCameraRef.current.stop();
      mpCameraRef.current = null;
    }
    if (poseRef.current) {
      poseRef.current.close();
      poseRef.current = null;
    }
  }, []);

  const initPose = useCallback(async () => {
    if (poseRef.current) return;

    const mpPose = await import("@mediapipe/pose");
    const camera = await import("@mediapipe/camera_utils");

    poseRef.current = new mpPose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    poseRef.current.setOptions({
      modelComplexity: 2,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });
    poseRef.current.onResults(onResults);

    if (videoRef.current) {
      mpCameraRef.current = new camera.Camera(videoRef.current, {
        onFrame: async () => {
          if (poseRef.current) await poseRef.current.send({ image: videoRef.current! });
        },
        width: 1280,
        height: 720,
      });
      mpCameraRef.current.start();
    }
  }, [onResults]);

  useEffect(() => {
    const run = async () => {
      if (context.openCamera || context.measuring) {
        cleanup();
        await initPose();
      }
    };

    run();
    return () => {
      canvasRef.current?.getContext("2d")?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      cleanup();
    };
  }, [cleanup, context.openCamera, context.measuring, initPose]);

  useEffect(() => {
    if (!context.capturedFallback) return;

    (async () => {
      cleanup();
      if (context.Buffer) context.Buffer.current = [];
      setCountDowns(5);
      context.setMeasuring?.(false);
      context.setCountdown?.(20);
      context.setDataMeasured?.([]);
      context.setCapturedFallback?.(false);
      canvasRef.current?.getContext("2d")?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      await initPose();
    })();
  }, [
    cleanup,
    context.Buffer,
    context.capturedFallback,
    context.setCapturedFallback,
    context.setCountdown,
    context.setDataMeasured,
    context.setMeasuring,
    initPose,
  ]);

  const gridItems = useMemo(
    () => Array.from({ length: 16 }).map((_, index) => <div key={index} className="border border-[rgba(165,109,43,0.24)]" />),
    [],
  );

  return (
    <section aria-label="Màn hình camera" className="relative flex min-h-[68vh] items-center justify-center overflow-hidden p-4 lg:min-h-0 lg:p-5">
      <div className="rx-shell h-full w-full min-h-[540px]">
        <div className="rx-core relative flex h-full min-h-[540px] items-center justify-center overflow-hidden bg-[var(--ink)] text-[var(--surface-paper)]">
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-[5] h-full w-full object-cover" />
          <video ref={videoRef} autoPlay muted playsInline aria-label="Luồng video từ camera" className="h-full w-full object-cover opacity-92" />

          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(24,23,20,0.1)_42%,rgba(24,23,20,0.66)_100%)]" aria-hidden="true" />
          <div className={`pointer-events-none absolute inset-0 z-50 bg-[var(--surface-paper)] transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${flashActive ? "opacity-90" : "opacity-0"}`} aria-hidden="true" />

          {context.measuring && countDowns > 0 && (
            <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-[rgba(24,23,20,0.82)] text-center" aria-live="assertive">
              <div className="relative flex flex-col items-center gap-4">
                <p className="rx-label text-[var(--brass)]">Chuẩn bị tư thế</p>
                <h2 className="font-mono text-[8rem] font-semibold leading-none text-[var(--surface-paper)] tabular-nums" aria-label={`Còn lại ${countDowns} giây`}>
                  {countDowns}
                </h2>
                <p className="max-w-xs text-sm text-white/72">Đứng thẳng, dang tay 45 độ, nhìn thẳng về camera.</p>
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-4 z-20 rounded-[1.6rem] border border-[rgba(255,253,247,0.2)] lg:inset-6" aria-hidden="true">
            <div className="absolute inset-x-[25%] inset-y-[14%] rounded-[1.3rem] border border-dashed border-[rgba(242,166,13,0.5)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--surface-paper)] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--ink)] ring-1 ring-[rgba(24,23,20,0.12)]">
                Vùng hiệu chuẩn
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 opacity-70">
              <div className="absolute left-0 top-1/2 h-px w-full bg-[rgba(255,253,247,0.42)]" />
              <div className="absolute left-1/2 top-0 h-full w-px bg-[rgba(255,253,247,0.42)]" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brass)]" />
            </div>

            {showGrid && <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-45">{gridItems}</div>}
          </div>

          <div className="absolute right-6 top-6 z-30 flex items-center gap-2 rounded-full bg-[rgba(255,253,247,0.88)] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ink)] ring-1 ring-[rgba(255,253,247,0.22)]">
            <span className={`h-1.5 w-1.5 rounded-full ${context.openCamera ? "bg-[var(--tailor-red)]" : "bg-[var(--ink-muted)]"}`} />
            {context.openCamera ? "Đang ghi hình" : "Camera nghỉ"}
          </div>

          {context.openCamera && !context.measuring && (
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center p-5" aria-label="Hướng dẫn tư thế" role="complementary">
              <div className="rx-shell w-full max-w-[320px] bg-[rgba(255,253,247,0.62)]">
                <div className="rx-core p-5 text-[var(--ink)]">
                  <p className="rx-label text-[var(--signal-blue)]">Hướng dẫn tư thế</p>
                  <svg viewBox="0 0 100 160" className="mx-auto mt-4 h-36 w-24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="50" cy="14" r="11" stroke="var(--signal-blue)" strokeWidth="2.2" />
                    <line x1="50" y1="25" x2="50" y2="90" stroke="var(--signal-blue)" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="50" y1="45" x2="18" y2="72" stroke="var(--signal-blue)" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="50" y1="45" x2="82" y2="72" stroke="var(--signal-blue)" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="50" y1="90" x2="32" y2="150" stroke="var(--signal-blue)" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="50" y1="90" x2="68" y2="150" stroke="var(--signal-blue)" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M 30 48 A 22 22 0 0 1 70 48" stroke="var(--brass)" strokeWidth="1" strokeDasharray="3 2" opacity="0.75" />
                  </svg>
                  <ul className="mt-4 space-y-2" aria-label="Danh sách hướng dẫn tư thế">
                    {guideItems.map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-center gap-3 rounded-[1rem] bg-[rgba(24,23,20,0.04)] p-2.5 text-xs font-semibold text-[var(--ink-soft)]">
                        <Icon size={14} strokeWidth={1.35} className="shrink-0 text-[var(--signal-blue)]" aria-hidden="true" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-6 left-1/2 z-30 w-max max-w-[calc(100%-2rem)] -translate-x-1/2" role="status" aria-live="polite">
            <div className="rounded-full bg-[rgba(255,253,247,0.9)] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink)] ring-1 ring-[rgba(255,253,247,0.24)]">
              {context.measuring ? "Đang ghi nhận số đo" : context.openCamera ? "Camera sẵn sàng" : "Camera đang tắt"}
            </div>
          </div>

          <div className="absolute left-6 top-6 z-30 rounded-[1rem] bg-[rgba(255,253,247,0.88)] p-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)] ring-1 ring-[rgba(255,253,247,0.22)]" aria-hidden="true">
            <div className="text-[var(--ink)]">RX_CAM_01</div>
            <div className="mt-1 flex gap-2">
              <span>FPS 30</span>
              <span className="text-[var(--brass)]">HD 1080</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Viewport;
