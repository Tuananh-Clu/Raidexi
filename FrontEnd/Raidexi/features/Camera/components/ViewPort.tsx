"use client";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { Landmark } from "@mediapipe/pose";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  useMemo,
} from "react";

interface ViewportProps {
  showGrid: boolean;
  triggerFlash: boolean;
  openCamera: boolean;
}

function detectPose(lm: any) {
  const ls = lm[11],
    rs = lm[12];

  if (ls.visibility < 0.9 || rs.visibility < 0.9) return "INVALID";

  const dx = Math.abs(ls.x - rs.x);
  const dz = Math.abs(ls.z - rs.z);

  if (dz / (dx + 1e-4) > 2.2 && dx < 0.04) return "SIDE";

  if (dz < 0.05) return "FRONT";

  return "UNKNOWN";
}

function pushFrameToPoseEstimator(type: any, lm: any, buffer: any[]) {
  if (detectPose(lm) === type) buffer.push(lm);
  if (buffer.length > 20) buffer.shift();
}

function extractAxis(frames: any, type: any, L: any, R: any) {
  const values = frames.map((lm: any) =>
    type === "FRONT" ? Math.abs(lm[L].x - lm[R].x) : Math.abs(lm[L].z - lm[R].z)
  );
  values.sort((a: any, b: any) => a - b);
  return values[Math.floor(values.length / 2)];
}

function Scale(lm: Landmark[], realHeight: number) {
  {
    const nose = lm[0];
    const ankleL = lm[27];
    const ankleR = lm[28];
    const avgAnkleY = (ankleL.y + ankleR.y) / 2;
    return realHeight / (avgAnkleY - nose.y);
  }
}
function calculateEllipseCircumference(a: number, b: number) {
  const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
  const circumference =
    Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  return circumference;
}

const Viewport: React.FC<ViewportProps> = ({
  showGrid,
  triggerFlash,
  openCamera,
}) => {
  const [flashActive, setFlashActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mpCameraRef = useRef<any | null>(null);
  const poseRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useContext(BodyMeasureEstimateContext);
  const [countDowns, setCountDowns] = useState(3);
  const FrontBuffer = useRef<Landmark[][]>([]);
  const SideBuffer = useRef<Landmark[][]>([]);

  useEffect(() => {
    if (triggerFlash) {
      setFlashActive(true);
      const timer = setTimeout(() => setFlashActive(false), 150);
      return () => clearTimeout(timer);
    }
  }, [triggerFlash]);

  useEffect(() => {
    if (!context.measuring) {
      setCountDowns(3);
       context?.setCountdown?.(15);
      return;
    }

    let count = 3;
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
  }, [countDowns, context]);
  const onResults = useCallback(
    (results: any) => {
      if (!results.poseLandmarks) return;
      if (!canvasRef.current || !videoRef.current) return;
      const canvasCtx = canvasRef.current.getContext("2d");
      if (!canvasCtx) return;
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      canvasCtx.save();

      const Landmarks = [
        results.poseLandmarks?.[0],
        results.poseLandmarks?.[11],
        results.poseLandmarks?.[12],
        results.poseLandmarks?.[23],
        results.poseLandmarks?.[24],
        results.poseLandmarks?.[25],
        results.poseLandmarks?.[26],
      ];
      canvasCtx.fillStyle = "rgba(255,255,0,0.8)";
      for (const landmark of Landmarks) {
        if (!landmark) continue;
        const x = landmark.x * canvasRef.current.width;
        const y = landmark.y * canvasRef.current.height;
        canvasCtx.beginPath();
        canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
        canvasCtx.fill();
      }
      if (results) {
        var type = detectPose(results.poseLandmarks);
        const safeCountdown = context?.countdown ?? 0;
        if (type == "FRONT" && safeCountdown > 10) {
          pushFrameToPoseEstimator(
            "FRONT",
            results.poseLandmarks,
            FrontBuffer.current
          );
          if(FrontBuffer.current.length>0){
            canvasCtx.font = "46px Arial";
            canvasCtx.fillText(`Đang Thu Thập Dữ Liệu FRONT`, 10, 150);
            
          }
           if(FrontBuffer.current.length>=10){
            canvasCtx.font = "26px Arial";
            canvasCtx.fillText(`Đã Thu Thập Đủ Dữ Liệu FRONT`, 10, 150);
            canvasCtx.fillText(`Vui Lòng Chuyển Sang Tư Thế SIDE`, 10, 210);
          }
        }
        else{
          pushFrameToPoseEstimator(
            "SIDE",
            results.poseLandmarks,
            SideBuffer.current
          );
          if(SideBuffer.current.length>0){
            canvasCtx.font = "46px Arial";
            canvasCtx.fillText(`Đang Thu Thập Dữ Liệu SIDE`, 10, 150);
          }
          if(SideBuffer.current.length>=10){
            canvasCtx.font = "26px Arial";
            canvasCtx.fillText(`Đã Thu Thập Đủ Dữ Liệu SIDE`, 10, 150);
            canvasCtx.fillText(`Vui Lòng Giữ Nguyên Tư Thế Đến Khi Kết Thúc`, 10, 210);
          }
        }

        if (
          FrontBuffer.current.length >= 10 &&
          SideBuffer.current.length >= 10 
          ) {
          const realHeight = 180;
          const frontShoulderWidth =
            extractAxis(FrontBuffer.current, "FRONT", 11, 12) *
            Scale(FrontBuffer.current[0], realHeight);
          const frontHipWidth =
            extractAxis(FrontBuffer.current, "FRONT", 23, 24) *
            Scale(FrontBuffer.current[0], realHeight);
          const sideChestDepth =
            extractAxis(SideBuffer.current, "SIDE", 11, 12) *
            Scale(SideBuffer.current[0], realHeight);
          const sideHipDepth =
            extractAxis(SideBuffer.current, "SIDE", 23, 24) *
            Scale(SideBuffer.current[0], realHeight);
          const frontWaistWidth =
            extractAxis(FrontBuffer.current, "FRONT", 25, 26) *
            Scale(FrontBuffer.current[0], realHeight);
          const sideWaistDepth =
            extractAxis(SideBuffer.current, "SIDE", 25, 26) *
            Scale(SideBuffer.current[0], realHeight);

          const chestCircumference = calculateEllipseCircumference(
            frontShoulderWidth / 2,
            sideChestDepth / 2
          );
          const hipCircumference = calculateEllipseCircumference(
            frontHipWidth / 2,
            sideHipDepth / 2
          );
          const waistCircumference = calculateEllipseCircumference(
            frontWaistWidth / 2,
            sideWaistDepth / 2
          );

          context?.setDataMeasured?.({
            chest: chestCircumference,
            hip: hipCircumference,
            waist: waistCircumference,
          });
          console.log("Measured Data:", {
            chest: chestCircumference,
            hip: hipCircumference,
            waist: waistCircumference,
          });

          FrontBuffer.current = [];
          SideBuffer.current = [];
        }
      }
      canvasCtx.restore();
    },
    [context.measuring, context.countdown, context.setDataMeasured]
  );
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
        width: 640,
        height: 480,
      });
      mpCameraRef.current.start();
    }
  };
  useEffect(() => {
    if (openCamera) {
      initPose();
    }
    return () => {
      if (mpCameraRef.current) {
        const track = mpCameraRef.current.video.srcObject
          ?.getTracks()
          .find((t: any) => t.kind === "video");
        track?.stop();
        mpCameraRef.current.stop();
        mpCameraRef.current = null;
      }
    };
  }, [openCamera]);

  const gridItems = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="border border-brass-light/30" />
      )),
    []
  );

  return (
    <div className="relative bg-[#0d0c0a] flex items-center justify-center p-4 lg:p-8 border-r border-grid-line overflow-hidden group h-full">
      {context.measuring && countDowns > 0 && (
        <div className="absolute flex items-center justify-center w-full h-full font-mono text-center bg-black/80 pointer-events-none z-[54] text-brass-light">
          <h1 className="text-6xl font-bold animate-pulse">{countDowns}</h1>
        </div>
      )}

      <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-black border shadow-2xl border-grid-line">
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
          className={`absolute inset-0 bg-white pointer-events-none z-50 transition-opacity duration-75 ${
            flashActive ? "opacity-80" : "opacity-0"
          }`}
        />

        <div className="absolute z-20 border pointer-events-none inset-4 lg:inset-8 border-brass-light/30">
          <div className="absolute top-0 left-0 border-t-2 border-l-2 size-4 border-brass-light" />
          <div className="absolute top-0 right-0 border-t-2 border-r-2 size-4 border-brass-light" />
          <div className="absolute bottom-0 left-0 border-b-2 border-l-2 size-4 border-brass-light" />
          <div className="absolute bottom-0 right-0 border-b-2 border-r-2 size-4 border-brass-light" />

          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-12 opacity-80">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brass-light/50" />
            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-brass-light/50" />
          </div>

          {showGrid && (
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
              {gridItems}
            </div>
          )}

          <div className="absolute top-[10%] left-[30%] right-[30%] bottom-[10%] border border-dashed border-brass-light/60">
            <div className="absolute -top-6 left-0 bg-brass-light text-black px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest">
              TARGET_LOCKED
            </div>
            <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mix-blend-difference">
              <span className="font-mono text-4xl font-thin tracking-widest lg:text-5xl text-brass-light opacity-60">
                300<span className="mx-2">×</span>300
              </span>
            </div>
          </div>
        </div>

        <div className="absolute z-30 px-4 py-2 -translate-x-1/2 border shadow-lg bottom-12 left-1/2 bg-black/80 border-brass-light backdrop-blur-sm">
          <p className="text-brass-light font-mono text-xs tracking-[0.2em]">
            ALIGN SUBJECT WITHIN FRAME
          </p>
        </div>
      </div>
    </div>
  );
};

export default Viewport;
