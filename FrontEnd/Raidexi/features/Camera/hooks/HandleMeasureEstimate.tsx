import { Landmark } from "@mediapipe/pose";
import { DrawCanvasTypeBody } from "./DrawCanvas";
import {
  calculate3DDistance,
  calculateDepthFromZ,
  calculateEllipseCircumference,
} from "./DetermineMeasure";

const averageLandmark = (
  buffer: Landmark[][],
  landmarkIndex: number
): Landmark => {
  const sumX = buffer.reduce((acc, frame) => acc + frame[landmarkIndex].x, 0);
  const sumY = buffer.reduce((acc, frame) => acc + frame[landmarkIndex].y, 0);
  const sumZ = buffer.reduce((acc, frame) => acc + frame[landmarkIndex].z, 0);
  const count = buffer.length;

  return {
    x: sumX / count,
    y: sumY / count,
    z: sumZ / count,
    visibility: 1,
  };
};



const TARGET_FRAMES = 50;

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
  const buffer = context.Buffer.current;

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
    buffer.length === TARGET_FRAMES &&
    !context.DataMeasured
  ) {
    const shoulderLeft = averageLandmark(buffer, 11);
    const shoulderRight = averageLandmark(buffer, 12);
    const leftHip = averageLandmark(buffer, 23);
    const rightHip = averageLandmark(buffer, 24);
    const nose = averageLandmark(buffer, 0);
    const kneeLeft = averageLandmark(buffer, 25);
    const kneeRight = averageLandmark(buffer, 26);

    const shoulderWidth = calculate3DDistance(shoulderLeft, shoulderRight) * 1.38 ;
    const shoulderDepth = calculateDepthFromZ(
      shoulderLeft.z,
      shoulderRight.z,
      shoulderWidth
    );
    const chest =
      calculateEllipseCircumference(shoulderWidth, shoulderDepth) *100;

    const hipWidth = calculate3DDistance(leftHip, rightHip);
    const hipDepth = calculateDepthFromZ(leftHip.z, rightHip.z, hipWidth);
    const hip =
      calculateEllipseCircumference(hipWidth, hipDepth) *  100 * 1.62;
    const waistRatio = 0.7;
    const leftWaist = {
      x: shoulderLeft.x * (1 - waistRatio) + leftHip.x * waistRatio,
      y: shoulderLeft.y * (1 - waistRatio) + leftHip.y * waistRatio,
      z: shoulderLeft.z * (1 - waistRatio) + leftHip.z * waistRatio,
    };
    const rightWaist = {
      x: shoulderRight.x * (1 - waistRatio) + rightHip.x * waistRatio,
      y: shoulderRight.y * (1 - waistRatio) + rightHip.y * waistRatio,
      z: shoulderRight.z * (1 - waistRatio) + rightHip.z * waistRatio,
    };

    const waistWidth = calculate3DDistance(leftWaist, rightWaist);
    const waistDepth = calculateDepthFromZ(
      leftWaist.z,
      rightWaist.z,
      waistWidth
    );
    const waist =
      calculateEllipseCircumference(waistWidth, waistDepth) *
      100 *
                1.44;

    const height = Math.abs(nose.y - (kneeLeft.y + kneeRight.y) / 2);
    const heightCm = height * 100 * 2.25;

    const ankleLeft  = averageLandmark(buffer, 27);
    const ankleRight = averageLandmark(buffer, 28);
    const elbowLeft  = averageLandmark(buffer, 13);
    const elbowRight = averageLandmark(buffer, 14);
    const wristLeft  = averageLandmark(buffer, 15);
    const wristRight = averageLandmark(buffer, 16);

    const upperArmLength = calculate3DDistance(shoulderLeft, elbowLeft);
    const upperArmCm = upperArmLength * 100 * 0.58;

    const sleeveLengthRaw =
      (calculate3DDistance(shoulderLeft, elbowLeft) +
       calculate3DDistance(elbowLeft, wristLeft)) * 100 * 0.95;

    const neckCm = shoulderWidth * 100 * 0.38;
    const armHoleCm = shoulderDepth * 100 * Math.PI * 0.55;

    const hipMidY  = (leftHip.y  + rightHip.y)  / 2;
    const ankleY   = (ankleLeft.y + ankleRight.y) / 2;
    const inseamCm = Math.abs(hipMidY - ankleY) * 100 * 2.0;

    const thighCm = hip * 0.28;

    const waistMidY     = (leftWaist.y + rightWaist.y) / 2;
    const outseamCm     = Math.abs(waistMidY - ankleY)  * 100 * 2.0;
    const crotchDepthCm = Math.abs(waistMidY - hipMidY) * 100 * 2.2;

    const measurements = {
      shoulderWidth: Math.round(shoulderWidth * 100),
      chest:         Math.round(chest),
      waist:         Math.round(waist),
      hip:           Math.round(hip),
      height:        Math.round(heightCm),
      neck:          Math.round(neckCm),
      sleeveLength:  Math.round(sleeveLengthRaw),
      armHole:       Math.round(armHoleCm),
      upperArm:      Math.round(upperArmCm),
      inseam:        Math.round(inseamCm),
      crotchDepth:   Math.round(crotchDepthCm),
      thigh:         Math.round(thighCm),
      outseamLength: Math.round(outseamCm),
    };
    context.setDataMeasured!(measurements);
  }

  if (context.isMeasured) {
    canvasCtx.clearRect(0, 0, canvasWidth * 0.5, canvasHeight * 0.15);
    canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    canvasCtx.fillRect(20, 20, canvasWidth * 0.4, canvasHeight * 0.12);

    canvasCtx.font = `bold ${Math.min(40, canvasHeight * 0.07)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
    canvasCtx.fillStyle = '#44FF44';
    canvasCtx.textAlign = 'left';
    canvasCtx.textBaseline = 'middle';
    canvasCtx.fillText('✓ Đo Thành Công!', 40, canvasHeight * 0.075);
  }
};