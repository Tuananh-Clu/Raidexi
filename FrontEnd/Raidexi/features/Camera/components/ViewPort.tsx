"use client";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { DrawPointLandmark } from "../hooks/DrawCanvas";
import { HandleMeasureEstimate } from "../hooks/HandleMeasureEstimate";
import { detectPose } from "../hooks/DetermineMeasure";
import { Ruler, Maximize, User, Sun } from "lucide-react";


interface ViewportProps {
  showGrid: boolean;
  triggerFlash: boolean;
}

const Viewport: React.FC<ViewportProps> = ({ showGrid, triggerFlash }) => {
  const [flashActive, setFlashActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mpCameraRef = useRef<any | null>(null);
  const poseRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const context = useContext(BodyMeasureEstimateContext);
  const [countDowns, setCountDowns] = useState(5);

  useEffect(() => {
    if (triggerFlash) {
      setFlashActive(true);
      const timer = setTimeout(() => setFlashActive(false), 150);
      return () => clearTimeout(timer);
    }
  }, [triggerFlash]);

  useEffect(() => {
    if (!context.measuring) {
      setCountDowns(5);
      context?.setCountdown?.(20);
      return;
    }

    let count = 5;
    const countdownInterval = setInterval(() => {
      count--;
      setCountDowns(count);
      if (count <= 0) {
        clearInterval(countdownInterval);
        context?.setCountdown?.(15);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [context.measuring]);

  useEffect(() => {
    if (countDowns === 0) {
      const er = setInterval(() => {
        if (context.countdown === 0) {
          clearInterval(er);
          return;
        }

        context?.setCountdown?.((prev: number) => prev - 1);
      }, 1000);
      return () => clearInterval(er);
    }
  }, [countDowns, context.countdown, context.setCountdown]);

  const onResults = useCallback(
    (results: any) => {
      if (!results.poseWorldLandmarks) return;
      if (!canvasRef.current || !videoRef.current || !poseRef.current) return;

      const canvasCtx = canvasRef.current.getContext("2d");
      if (!canvasCtx) return;
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      if (videoWidth === 0 || videoHeight === 0) {
        console.warn("⚠️ Video dimensions not ready");
        return;
      }
      if (
        canvasRef.current.width !== videoWidth ||
        canvasRef.current.height !== videoHeight
      ) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
      }
      canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
      canvasCtx.save();

      try {
        DrawPointLandmark(
          canvasCtx,
          "rgba(0, 255, 0, 0.8)",
          results,
          canvasRef
        );
      } catch (error) {
        console.error("❌ Error drawing landmarks:", error);
      }
      results.poseWorldLandMarks
      const Landmarks = [
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
      const allLandmarksPresent = Landmarks.every((landmark) => landmark.visibility! > 0);
      if (!allLandmarksPresent) {
        console.warn("⚠️ Not all required landmarks are detected.");
        canvasCtx.restore();
        return;
      }
      if (context.measuring === true && countDowns < 1 && allLandmarksPresent) {
        try {
          const type = detectPose(results.poseWorldLandmarks);

          HandleMeasureEstimate({
            context,
            canvasCtx,
            results:{
              poseWorldLandmarks: results.poseWorldLandmarks,
            },
            type,
          });
        } catch (error) {
          console.error("❌ Error in measurement:", error);
        }
      }

      canvasCtx.restore();
    },
    [context, countDowns]
  );
  useEffect(() => {
    if (poseRef.current) {
      poseRef.current.onResults(onResults);
    }
  }, [onResults]);
  const initPose = async () => {
    if (poseRef.current) return;
    const mpPose = await import("@mediapipe/pose");
    const camera = await import("@mediapipe/camera_utils");
    poseRef.current = new mpPose.Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
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
          if (poseRef.current)
            await poseRef.current.send({ image: videoRef.current! });
        },
        width: 1280,
        height: 720,
      });
      mpCameraRef.current.start();
    }
  };
  const cleanup = () => {
    if (mpCameraRef.current) {
      const track = mpCameraRef.current.video.srcObject
        ?.getTracks()
        .find((t: any) => t.kind === "video");
      track?.stop();
      mpCameraRef.current.stop();
      mpCameraRef.current = null;
    }
    if (poseRef.current) {
      poseRef.current.close();
      poseRef.current = null;
    }
  };
  useEffect(() => {
    const run = async () => {
      if (context.openCamera || context.measuring) {
        cleanup();
        await initPose();
      }
    };
    run();
    return () => {
      if (canvasRef.current) {
        canvasRef.current
          .getContext("2d")
          ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      if (mpCameraRef.current) {
        const track = mpCameraRef.current.video.srcObject
          ?.getTracks()
          .find((t: any) => t.kind === "video");
        track?.stop();
        mpCameraRef.current.stop();
        mpCameraRef.current = null;
      }
    };
  }, [context.openCamera]);

  useEffect(() => {
    if (!context.capturedFallback) return;
    (async () => {
      await cleanup();
      context.Buffer!.current = [];
      setCountDowns(5);
      context?.setMeasuring!(false);
      context.setCountdown!(20);
      context.setDataMeasured!([]);
      context.setCapturedFallback!(false);
      const ctx = canvasRef.current?.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      await initPose();
    })();
  }, [context.capturedFallback]);

  const gridItems = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="border border-[#c87832]/20" />
      )),
    []
  );

  return (
    <section aria-label="Màn hình Camera" className="relative bg-slate-50 flex items-center justify-center p-4 lg:p-6 border-r border-slate-200 overflow-hidden group h-full font-sans">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" aria-hidden="true" />
      
      {context.measuring && countDowns > 0 && (
        <div className="absolute flex items-center justify-center w-full h-full font-mono text-center bg-slate-900/80 backdrop-blur-md pointer-events-none z-[54]" aria-live="assertive">
          <div className="relative flex flex-col items-center gap-4">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl animate-pulse" aria-hidden="true" />
            <p className="relative z-10 text-xs tracking-[0.3em] text-blue-400 uppercase font-semibold">Chuẩn bị tư thế</p>
            <h2 className="relative z-10 text-[120px] leading-none font-bold text-white drop-shadow-[0_0_40px_rgba(59,130,246,0.5)] tabular-nums" aria-label={`Còn lại ${countDowns} giây`}>
              {countDowns}
            </h2>
            <p className="relative z-10 text-sm text-slate-300 font-medium tracking-wide">Đứng thẳng · Dang tay 45° · Nhìn thẳng</p>
          </div>
        </div>
      )}
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-slate-900 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-200" role="presentation">
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30" aria-hidden="true"></div>

        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 object-cover w-full h-full z-5"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          aria-label="Luồng video từ camera"
          className="object-cover w-full h-full"
        />

        <div
          className={`absolute inset-0 bg-white z-50 transition-opacity duration-150 ${
            flashActive ? "opacity-90" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        <div className="absolute z-20 border border-blue-400/30 rounded-2xl pointer-events-none inset-4 lg:inset-6" aria-hidden="true">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl border-blue-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl border-blue-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl border-blue-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl border-blue-500"></div>

          <div className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-60">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
            <div className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-blue-500"></div>
          </div>

          {showGrid && (
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
              {gridItems}
            </div>
          )}

          <div className="absolute top-[15%] left-[25%] right-[25%] bottom-[15%] border border-dashed border-blue-400/40 rounded-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-blue-200 text-blue-600 px-3 py-1 text-[9px] font-mono font-bold tracking-widest rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> TARGET_AREA
            </div>
            <div className="absolute inset-0 rounded-xl bg-blue-500/[0.02]"></div>
          </div>

          <div className="absolute flex items-center gap-2 top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_5px_rgba(244,63,94,0.8)] animate-pulse"></div>
            <div className="font-mono text-[10px] font-bold text-rose-600 tracking-wider">
              REC
            </div>
          </div>
        </div>

        {/* Posture guide overlay */}
        {context.openCamera && !context.measuring && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none" aria-label="Hướng dẫn tư thế" role="complementary">
            <div className="relative flex flex-col items-center gap-4 p-6 border border-slate-200 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-[280px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-50 to-transparent opacity-50" aria-hidden="true" />
              <p className="relative z-10 font-mono text-[10px] tracking-[0.2em] font-bold text-blue-600 uppercase">
                Hướng Dẫn Tư Thế
              </p>

              <svg
                viewBox="0 0 100 160"
                className="relative z-10 w-24 h-36 opacity-80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="50" cy="14" r="11" stroke="#3b82f6" strokeWidth="2.5" />
                <line x1="50" y1="25" x2="50" y2="90" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="50" y1="45" x2="18" y2="72" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="50" y1="45" x2="82" y2="72" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="50" y1="90" x2="32" y2="150" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="50" y1="90" x2="68" y2="150" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 30 48 A 22 22 0 0 1 70 48" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
              </svg>

              <ul className="relative z-10 space-y-2.5 w-full" aria-label="Danh sách hướng dẫn tư thế">
                {[
                  { icon: Ruler, text: "Đứng thẳng, nhìn về phía trước" },
                  { icon: Maximize, text: "Dang tay ra ~45° so với thân" },
                  { icon: User, text: "Toàn thân trong khung hình" },
                  { icon: Sun, text: "Ánh sáng đủ, nền đơn giản" },
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Icon size={14} className="text-blue-500 shrink-0" aria-hidden="true" />
                    <span className="text-[10px] font-medium text-slate-700 leading-tight">{text}</span>
                  </li>
                ))}
              </ul>

              <p className="relative z-10 text-[10px] text-slate-500 text-center mt-1">
                Nhấn <span className="text-blue-600 font-bold">Bắt đầu đo ngay</span> khi đã sẵn sàng
              </p>
            </div>
          </div>
        )}

        {/* Bottom status bar */}
        <div className="absolute z-30 -translate-x-1/2 bottom-8 left-1/2 w-max" role="status" aria-live="polite">
          {context.measuring ? (
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-blue-600 border border-blue-500 shadow-[0_4px_20px_rgba(59,130,246,0.3)]">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true" />
              <p className="font-mono text-xs font-bold text-white tracking-wide">Đang ghi nhận số đo — giữ nguyên!</p>
            </div>
          ) : context.openCamera ? (
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 border border-slate-200 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" aria-hidden="true" />
              <p className="font-mono text-xs text-slate-700 font-semibold tracking-wide">Camera sẵn sàng</p>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 border border-slate-200 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 bg-slate-400 rounded-full" aria-hidden="true" />
              <p className="font-mono text-xs text-slate-500 tracking-wide uppercase font-semibold">Camera đang tắt</p>
            </div>
          )}
        </div>

        <div className="absolute top-4 left-4 z-30 font-mono text-[9px] font-bold text-slate-600 tracking-widest space-y-1.5 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-slate-200 shadow-sm" aria-hidden="true">
          <div className="text-slate-800">CAM_01_SYS</div>
          <div className="flex gap-2">
            <span>FPS: 30</span>
            <span className="text-slate-300">|</span>
            <span className="text-blue-600">HD_1080</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Viewport;
