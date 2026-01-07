"use client";
import { BodyMeasureEstimateContext } from "@/Shared/Service/BodyMeasureEstimate";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
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

  if (dz < 0.02) return "FRONT";

  return "UNKNOWN";
}
const buffer: any[] = [];
function pushFrameToPoseEstimator(type: any, lm: any) {
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

const Viewport: React.FC<ViewportProps> = ({
  showGrid,
  triggerFlash,
  openCamera,
}) => {
  const [flashActive, setFlashActive] = useState(false);
  const camera = useRef<HTMLVideoElement | null>(null);
  const poseRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useContext(BodyMeasureEstimateContext);

  useEffect(() => {
    if (triggerFlash) {
      setFlashActive(true);
      const timer = setTimeout(() => setFlashActive(false), 150);
      return () => clearTimeout(timer);
    }
  }, [triggerFlash]);

  const onResults = useCallback((results: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = results.image.width;
    canvas.height = results.image.height;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(0,255,0,0.6)";
    ctx.lineWidth = 2;
    const landmarks = [
      results.poseLandmarks?.[11], // Left Shoulder
      results.poseLandmarks?.[12], // Right Shoulder
      results.poseLandmarks?.[23], // Left Hip
      results.poseLandmarks?.[24], // Right Hip
    ];
    if (results.poseLandmarks) {
      for (const landmark of landmarks) {
        ctx.beginPath();
        ctx.arc(
          landmark.x * canvas.width,
          landmark.y * canvas.height,
          5,
          0,
          2 * Math.PI
        );

        ctx.fillStyle = "rgba(0,255,0,0.6)";
        ctx.fill();
      }
    }
    ctx.restore();
    if (context.measuring) {
      useEffect(() => {
        const bru = setInterval(() => {
          context.setCountdown!((prev) => {
            if (prev <= 1) {
              clearInterval(bru);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(bru);
      }, []);
      if (results.poseLandmarks) {
        const shoulderWidth = Math.abs(
          results.poseLandmarks?.[11].x - results.poseLandmarks?.[12].x
        );

        const type = detectPose(results.poseLandmarks);
        if (type === "FRONT") {
          ctx.fillStyle = "rgba(0,255,0,0.8)";
          ctx.font = "20px Arial";
          ctx.fillText(`Pose: FRONT`, 10, 30);
        } else if (type === "SIDE") {
          ctx.fillStyle = "rgba(0,255,0,0.8)";
          ctx.font = "20px Arial";
          ctx.fillText(`Pose: SIDE`, 10, 30);
        }

        pushFrameToPoseEstimator(type, results.poseLandmarks);
        extractAxis(buffer, type, 11, 12);
      }
    }
  }, []);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const initPose = async () => {
      const mpPose = await import("@mediapipe/pose");

      const pose = new mpPose.Pose({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 2,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      });

      pose.onResults(onResults);
      poseRef.current = pose;

      if (openCamera && camera.current) {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "environment",
            frameRate: { ideal: 30 },
          },
          audio: false,
        });

        camera.current.srcObject = stream;
        const sendFrame = async () => {
          if (camera.current && poseRef.current) {
            await poseRef.current.send({ image: camera.current });
            requestAnimationFrame(sendFrame);
          }
        };

        sendFrame();
      }
    };

    initPose();

    return () => {
      poseRef.current?.close();
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [openCamera, onResults]);

  return (
    <div className="relative bg-[#0d0c0a] flex items-center justify-center p-4 lg:p-8 border-r border-grid-line overflow-hidden group h-full">
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-black border shadow-2xl border-grid-line">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 object-cover w-full h-full z-5"
        />
        <video
          ref={camera}
          autoPlay
          muted
          playsInline
          className="object-cover w-full h-full"
        ></video>
        <div className="absolute inset-0 z-10 pointer-events-none scanline opacity-20 crt-flicker" />

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
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-brass-light/30" />
              ))}
            </div>
          )}
          <div className="absolute top-[10%] left-[30%] right-[30%] bottom-[10%] border border-dashed border-brass-light/60 transition-all duration-1000 ease-in-out hover:border-solid hover:bg-brass-light/5">
            <div className="absolute -top-6 left-0 bg-brass-light text-black px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest animate-pulse">
              TARGET_LOCKED
            </div>
            <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mix-blend-difference">
              <span className="font-mono text-4xl font-thin tracking-widest lg:text-5xl text-brass-light opacity-60">
                300<span className="mx-2">×</span>300
              </span>
            </div>
          </div>
          <div className="absolute top-0 bottom-0 left-0 flex flex-col items-end justify-between w-8 py-12 pr-2 border-r border-brass-light/20">
            {["180", "160", "140", "120", "100", "080", "060"].map((mark) => (
              <span
                key={mark}
                className="text-[10px] font-mono text-brass-light/60"
              >
                {mark}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute z-30 px-4 py-2 -translate-x-1/2 border shadow-lg bottom-12 left-1/2 bg-black/80 border-brass-light backdrop-blur-sm">
          <p className="text-brass-light font-mono text-xs tracking-[0.2em] animate-pulse-fast">
            ALIGN SUBJECT WITHIN FRAME
          </p>
        </div>
      </div>
    </div>
  );
};

export default Viewport;
