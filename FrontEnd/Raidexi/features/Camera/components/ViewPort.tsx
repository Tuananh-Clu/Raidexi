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
      context.setDataMeasured!({
        height: 0,
        chest: 0,
        waist: 0,
        hip: 0,
        shoulderWidth: 0,
        neck: 0,
        sleeveLength: 0,
        armHole: 0,
        upperArm: 0,
        inseam: 0,
        crotchDepth: 0,
        thigh: 0,
        outseamLength: 0,
      });
      context.setCapturedFallback!(false);
      const ctx = canvasRef.current?.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      await initPose();
    })();
  }, [context.capturedFallback]);

  const gridItems = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="border border-brass-light/30" />
      )),
    []
  );

  return (
    <div className="relative bg-gradient-to-br from-[#0a0908] via-[#0d0c0a] to-[#121110] flex items-center justify-center p-4 lg:p-8 border-r border-grid-line overflow-hidden group h-full">
      {context.measuring && countDowns > 0 && (
        <div className="absolute flex items-center justify-center w-full h-full font-mono text-center bg-gradient-to-b from-black/90 via-black/80 to-black/90 pointer-events-none z-[54] backdrop-blur-sm">
          <div className="relative flex flex-col items-center gap-4">
            <div className="absolute inset-0 rounded-full bg-brass-light/20 blur-3xl animate-pulse" />
            <p className="relative z-10 text-[11px] tracking-[0.3em] text-brass-light/70 uppercase">Chuẩn bị tư thế</p>
            <h1 className="relative z-10 text-[96px] leading-none font-bold text-brass-light drop-shadow-[0_0_30px_rgba(212,175,55,0.5)] animate-pulse tabular-nums">
              {countDowns}
            </h1>
            <p className="relative z-10 text-sm text-white/60">Đứng thẳng · Dang tay 45° · Nhìn thẳng</p>
          </div>
        </div>
      )}
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-black border-2 rounded-lg shadow-2xl border-brass-light/20">
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 object-cover w-full h-full z-5"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="object-cover w-full h-full"
        />

        <div
          className={`absolute inset-0 bg-gradient-radial from-white via-white/80 to-transparent pointer-events-none z-50 transition-opacity duration-75 ${
            flashActive ? "opacity-90" : "opacity-0"
          }`}
        />

        <div className="absolute z-20 border-2 rounded-sm pointer-events-none inset-4 lg:inset-8 border-brass-light/40">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-sm border-brass-light animate-pulse"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-sm border-brass-light animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-sm border-brass-light animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-sm border-brass-light animate-pulse"></div>

          <div className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-80">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brass-light to-transparent shadow-lg shadow-brass-light/50"></div>
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-brass-light to-transparent shadow-lg shadow-brass-light/50"></div>
            <div className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg top-1/2 left-1/2 bg-brass-light shadow-brass-light/50 animate-ping"></div>
            <div className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-brass-light"></div>
          </div>

          {showGrid && (
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
              {gridItems}
            </div>
          )}

          <div className="absolute top-[10%] left-[30%] right-[30%] bottom-[10%] border-2 border-dashed border-brass-light/70 rounded-sm shadow-inner">
            <div className="absolute -top-7 left-0 bg-gradient-to-r from-brass-light via-brass-light to-brass-light/80 text-black px-3 py-1 text-[11px] font-mono font-bold tracking-widest rounded-sm shadow-lg shadow-brass-light/30">
              <span className="animate-pulse">●</span> TARGET_LOCKED
            </div>
            <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mix-blend-screen">
              <span className="font-mono text-5xl font-thin tracking-widest lg:text-6xl text-brass-light opacity-70 drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                300<span className="mx-3 text-brass-light/50">×</span>300
              </span>
            </div>
            <div className="absolute inset-0 rounded-sm bg-brass-light/5"></div>
          </div>

          <div className="absolute flex gap-2 top-4 right-4">
            <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg animate-pulse shadow-red-500/50"></div>
            <div className="font-mono text-[10px] text-brass-light/70 tracking-wider">
              REC
            </div>
          </div>
        </div>

        {/* Posture guide overlay - shown when camera is on, not measuring */}
        {context.openCamera && !context.measuring && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">
            {/* Silhouette diagram */}
            <div className="relative flex flex-col items-center gap-3 p-5 border border-brass-light/30 bg-black/70 backdrop-blur-sm rounded-sm shadow-2xl max-w-[240px]">
              <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-brass-light/5 to-transparent" />
              <p className="relative z-10 font-mono text-[10px] tracking-[0.3em] text-brass-light uppercase">
                ● Hướng Dẫn Tư Thế
              </p>

              {/* Human stick figure SVG */}
              <svg
                viewBox="0 0 100 160"
                className="relative z-10 w-20 h-32 opacity-90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Head */}
                <circle cx="50" cy="14" r="11" stroke="#D4AF37" strokeWidth="2.5" />
                {/* Spine */}
                <line x1="50" y1="25" x2="50" y2="90" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
                {/* Left arm - angled 45° */}
                <line x1="50" y1="45" x2="18" y2="72" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
                {/* Right arm - angled 45° */}
                <line x1="50" y1="45" x2="82" y2="72" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
                {/* Left leg */}
                <line x1="50" y1="90" x2="32" y2="150" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
                {/* Right leg */}
                <line x1="50" y1="90" x2="68" y2="150" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
                {/* Angle arc hint for arms */}
                <path d="M 30 48 A 22 22 0 0 1 70 48" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
              </svg>

              {/* Tips list */}
              <ul className="relative z-10 space-y-1.5 w-full">
                {[
                  { icon: "straighten", text: "Đứng thẳng, nhìn về phía trước" },
                  { icon: "open_with", text: "Dang tay ra ~45° so với thân" },
                  { icon: "person", text: "Toàn thân trong khung hình" },
                  { icon: "light_mode", text: "Ánh sáng đủ, nền đơn giản" },
                ].map(({ icon, text }) => (
                  <li key={icon} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[13px] text-primary shrink-0">{icon}</span>
                    <span className="font-mono text-[9px] text-brass-light/80 leading-tight">{text}</span>
                  </li>
                ))}
              </ul>

              <p className="relative z-10 font-mono text-[9px] text-[#8a806d] text-center">
                Nhấn <span className="text-primary font-bold">START ESTIMATE</span> khi sẵn sàng
              </p>
            </div>
          </div>
        )}

        {/* Bottom status bar */}
        <div className="absolute z-30 -translate-x-1/2 bottom-6 left-1/2">
          {context.measuring ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/60 backdrop-blur-md shadow-[0_0_16px_rgba(242,166,13,0.3)]">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="font-mono text-xs font-bold text-primary tracking-wider">Đang ghi nhận số đo — giữ nguyên!</p>
            </div>
          ) : context.openCamera ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/30 backdrop-blur-md">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <p className="font-mono text-xs text-white/90 tracking-wider">Sẵn sàng · Nhấn <span className="text-primary font-bold">Bắt đầu đo ngay</span></p>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-brass-light/30 backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-brass-light/60 rounded-full" />
              <p className="font-mono text-[10px] text-brass-light/70 tracking-[0.2em] uppercase">Đưa toàn thân vào khung hình</p>
            </div>
          )}
        </div>

        <div className="absolute top-4 left-4 z-30 font-mono text-[10px] text-brass-light/60 tracking-wider space-y-1">
          <div>CAM_01</div>
          <div className="flex gap-2">
            <span>FPS: 30</span>
            <span>|</span>
            <span>HD</span>
          </div>
        </div>
      </div>

      <div className="absolute z-30 flex gap-1 bottom-4 right-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 bg-brass-light/30"
            style={{ height: `${Math.random() * 20 + 10}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Viewport;
