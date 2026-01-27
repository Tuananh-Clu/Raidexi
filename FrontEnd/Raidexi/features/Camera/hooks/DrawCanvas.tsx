import { Landmark } from "@mediapipe/pose";
import { pushFrameToPoseEstimator } from "./DetermineMeasure";
import { buffer } from "stream/consumers";


export const DrawPointLandmark = (
  canvasCtx: CanvasRenderingContext2D,
  color: string,
  results: any,
  canvasRef: React.RefObject<HTMLCanvasElement> | null
) => {
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

  canvasCtx.fillStyle = color;
  for (const landmark of Landmarks) {
    if (!landmark) continue;
    const x = landmark.x * (canvasRef?.current?.width ?? 0);
    const y = landmark.y * (canvasRef?.current?.height ?? 0);
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
    canvasCtx.fill();
  }
};

export const DrawCanvasTypeBody = (
  canvasCtx: CanvasRenderingContext2D,
  results: any,
  Buffer: React.MutableRefObject<Landmark[][]>,
  type: string,
  safeCountdown: number,
  canvasWidth: number,
  canvasHeight: number
) => {

  canvasCtx.clearRect(0, 0, canvasWidth * 0.3, canvasHeight * 0.15);


  canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  canvasCtx.fillRect(20, 20, canvasWidth * 0.4, canvasHeight * 0.12);

  const messages = {
    start: { text: 'Bắt Đầu Đo', fontSize: Math.min(48, canvasHeight * 0.08), color: '#FF4444' },
    processing: { text: 'Đang Xử Lý...', fontSize: Math.min(48, canvasHeight * 0.08), color: '#FFAA00' },
    success: { text: 'Đo Thành Công!', fontSize: Math.min(40, canvasHeight * 0.07), color: '#44FF44' }
  };

  let status = null;

  if (type === "BODY" ) {
    if(Buffer.current.length <= 49)
    {
       pushFrameToPoseEstimator(type, results.poseWorldLandmarks, Buffer.current);
    }
   
    status = messages.start;
  } else if (Buffer.current.length < 50) {
    status = messages.processing;
  } else if (Buffer.current.length >= 50) {
    status = messages.success;
    
  }

  if (status) {
    canvasCtx.font = `bold ${status.fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
    canvasCtx.fillStyle = status.color;
    canvasCtx.textAlign = 'left';
    canvasCtx.textBaseline = 'middle';
    canvasCtx.fillText(status.text, 40, canvasHeight * 0.075);
  }
  if (Buffer.current.length <= 50 && Buffer.current.length > 0) {
    const progress = Buffer.current.length / 50;
    canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    canvasCtx.fillRect(40, canvasHeight * 0.095, canvasWidth * 0.35, 8);
    canvasCtx.fillStyle = '#44FF44';
    canvasCtx.fillRect(40, canvasHeight * 0.095, (canvasWidth * 0.35) * progress, 8);
  }
};
