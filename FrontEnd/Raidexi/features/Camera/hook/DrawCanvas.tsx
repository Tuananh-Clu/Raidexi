import { Landmark } from "@mediapipe/pose";
import { pushFrameToPoseEstimator } from "./DetermineMeasure";

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
  FrontBuffer: React.MutableRefObject<Landmark[][]>,
  SideBuffer: React.MutableRefObject<Landmark[][]>,
  type: string,
  safeCountdown: number
) => {
  if (type === "FRONT" && safeCountdown > 10) {
    if (FrontBuffer.current.length < 10) {
      pushFrameToPoseEstimator(
        "FRONT",
        results.poseLandmarks,
        FrontBuffer.current
      );
    }
    canvasCtx.fillStyle = "rgba(0, 255, 0, 0.9)";
    canvasCtx.font = "bold 36px Arial";
    canvasCtx.strokeStyle = "black";
    canvasCtx.lineWidth = 3;

    if (FrontBuffer.current.length > 0 && FrontBuffer.current.length < 10) {
      const text = `Đang Thu Thập FRONT: ${FrontBuffer.current.length}/10`;
      canvasCtx.strokeText(text, 10, 150);
      canvasCtx.fillText(text, 10, 150);
    }

    if (FrontBuffer.current.length >= 10) {
      canvasCtx.fillStyle = "rgba(0, 255, 255, 0.9)";
      canvasCtx.font = "bold 28px Arial";
      const text1 = `✓ Đã Thu Thập Đủ Dữ Liệu FRONT`;
      const text2 = `→ Vui Lòng Chuyển Sang Tư Thế SIDE`;
      canvasCtx.strokeText(text1, 10, 150);
      canvasCtx.fillText(text1, 10, 150);
      canvasCtx.strokeText(text2, 10, 200);
      canvasCtx.fillText(text2, 10, 200);
    }
  } else {
    if (SideBuffer.current.length < 10) {
      pushFrameToPoseEstimator(
        "SIDE",
        results.poseLandmarks,
        SideBuffer.current
      );
    }

    canvasCtx.fillStyle = "rgba(255, 165, 0, 0.9)";
    canvasCtx.font = "bold 36px Arial";
    canvasCtx.strokeStyle = "black";
    canvasCtx.lineWidth = 3;

    if (SideBuffer.current.length > 0 && SideBuffer.current.length < 10) {
      const text = `Đang Thu Thập SIDE: ${SideBuffer.current.length}/10`;
      canvasCtx.strokeText(text, 10, 150);
      canvasCtx.fillText(text, 10, 150);
    }

    if (SideBuffer.current.length >= 10) {
      canvasCtx.fillStyle = "rgba(0, 255, 255, 0.9)";
      canvasCtx.font = "bold 28px Arial";
      const text1 = `✓ Đã Thu Thập Đủ Dữ Liệu SIDE`;
      const text2 = `→ Vui Lòng Giữ Nguyên Tư Thế Đến Khi Kết Thúc`;
      canvasCtx.strokeText(text1, 10, 150);
      canvasCtx.fillText(text1, 10, 150);
      canvasCtx.strokeText(text2, 10, 200);
      canvasCtx.fillText(text2, 10, 200);
    }
  }
};