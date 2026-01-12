import { Landmark } from "@mediapipe/pose";
import { DrawCanvasTypeBody } from "./DrawCanvas";
import {
  calculate3DDistance,
  calculateDepthFromZ,
  calculateEllipseCircumference,
} from "./DetermineMeasure";

export const HandleMeasureEstimate = ({
  context,
  canvasCtx,
  results,
  type,
}: {
  context: any;
  canvasCtx: CanvasRenderingContext2D;
  results: { poseWorldLandmarks: Landmark[] | null };
  type: string;
}) => {
  const safeCountdown = context?.countdown ?? 0;
  const canvasWidth = canvasCtx.canvas.width;
  const canvasHeight = canvasCtx.canvas.height;

  DrawCanvasTypeBody(
    canvasCtx,
    results,
    context.Buffer!,
    type,
    safeCountdown,
    canvasWidth,
    canvasHeight
  );
  if (
    type === "BODY" &&
    context.Buffer.current.length >= 50 &&
    results.poseWorldLandmarks
  ) {
    const [shoulderLeft, shoulderRight, leftHip, rightHip] = [
      results.poseWorldLandmarks[11],
      results.poseWorldLandmarks[12],
      results.poseWorldLandmarks[23],
      results.poseWorldLandmarks[24],
    ];

    const shoulderWidth = calculate3DDistance(shoulderLeft, shoulderRight);
    const shoulderDepth = calculateDepthFromZ(
      shoulderLeft.z,
      shoulderRight.z,
      shoulderWidth
    );
    const chest =
      calculateEllipseCircumference(shoulderWidth, shoulderDepth) * 100;

    const hipWidth = calculate3DDistance(leftHip, rightHip);
    const hipDepth = calculateDepthFromZ(leftHip.z, rightHip.z, hipWidth);
    const hip = calculateEllipseCircumference(hipWidth, hipDepth) * 100 * 1.62;

    const leftWaist = {
      x: shoulderLeft.x * 0.3 + leftHip.x * 0.7,
      y: shoulderLeft.y * 0.3 + leftHip.y * 0.7,
      z: shoulderLeft.z * 0.3 + leftHip.z * 0.7,
    };
    const rightWaist = {
      x: shoulderRight.x * 0.3 + rightHip.x * 0.7,
      y: shoulderRight.y * 0.3 + rightHip.y * 0.7,
      z: shoulderRight.z * 0.3 + rightHip.z * 0.7,
    };
    const waistWidth = calculate3DDistance(leftWaist, rightWaist);
    const waistDepth = calculateDepthFromZ(
      leftWaist.z,
      rightWaist.z,
      waistWidth
    );
    const waist =
      calculateEllipseCircumference(waistWidth, waistDepth) * 100 * 1.44;
    const nose = results.poseWorldLandmarks[0];
    const kneeLeft = results.poseWorldLandmarks[25];
    const kneeRight = results.poseWorldLandmarks[26];
    const height = Math.abs(nose.y - (kneeLeft.y + kneeRight.y) / 2);
    const heightCm = height * 100 * 2.25;

    const avg = (arr: number[]) => {
      const value = arr.reduce((a, b) => a + b, 0) / arr.length;
      return Math.round(value).toString();
    };
    console.log("Measurements:", {
      chest: chest,
      waist: waist,
      hip: hip,
      height: heightCm,
    });
    context.setDataMeasured!({
      chest: Math.round(chest),
      waist: Math.round(waist),
      hip: Math.round(hip),
      height: Math.round(heightCm),
    });
  }
};
