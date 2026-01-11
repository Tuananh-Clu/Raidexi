import { Landmark } from "@mediapipe/pose";
import {
  calculateEllipseCircumference,
  extractAxis,
  getWaistLandmarks,
  Scale,
} from "./DetermineMeasure";
import { DrawCanvasTypeBody } from "./DrawCanvas";

export const HandleMeasureEstimate = ({
  context,
  canvasCtx,
  results,
  type,
}: {
  context: any;
  canvasCtx: CanvasRenderingContext2D;
  results: { poseLandmarks: Landmark[] | null };
  type: string;
}) => {
  const safeCountdown = context?.countdown ?? 0;

  DrawCanvasTypeBody(
    canvasCtx,
    results,
    context.frontBuffer!,
    context.sideBuffer!,
    type,
    safeCountdown
  );

  if (
    context.frontBuffer!.current.length >= 50 &&
    context.sideBuffer!.current.length >= 50
  ) {
    const realHeight = context.userHeight;

    const frontBufferWithWaist = context.frontBuffer!.current.map(
      (frame: Landmark[]) => {
        const waist = getWaistLandmarks(frame, "FRONT");
        const newFrame = [...frame];
        newFrame[25] = waist.left;
        newFrame[26] = waist.right;
        return newFrame;
      }
    );

    const sideBufferWithWaist = context.sideBuffer!.current.map(
      (frame: Landmark[]) => {
        const waist = getWaistLandmarks(frame, "SIDE");
        const newFrame = [...frame];
        newFrame[25] = waist.left;
        newFrame[26] = waist.right;
        return newFrame;
      }
    );

    const frontShoulderWidth = extractAxis(
      context.frontBuffer!.current,
      "FRONT",
      11,
      12,
      context.userHeight
    );
    const frontHipWidth = extractAxis(
      context.frontBuffer!.current,
      "FRONT",
      23,
      24,
      context.userHeight
    );
    const sideChestDepth = extractAxis(
      context.sideBuffer!.current,
      "SIDE",
      11,
      12,
      context.userHeight
    );
    const sideHipDepth = extractAxis(
      context.sideBuffer!.current,
      "SIDE",
      23,
      24,
      context.userHeight
    );
    const frontWaistWidth = extractAxis(frontBufferWithWaist, "FRONT", 25, 26, context.userHeight);
    const sideWaistDepth = extractAxis(sideBufferWithWaist, "SIDE", 25, 26, context.userHeight);

    console.log({
      frontShoulderWidth,
      sideChestDepth, 
      ratio: sideChestDepth / frontShoulderWidth, 
      Scale: Scale(context.frontBuffer!.current[0], realHeight),
      nose_y: context.frontBuffer!.current[0][0].y,
      ankle_y:
        (context.frontBuffer!.current[0][27].y +
          context.frontBuffer!.current[0][28].y) /
        2,
      height_y:
        (context.frontBuffer!.current[0][27].y +
          context.frontBuffer!.current[0][28].y) /
          2 -
        context.frontBuffer!.current[0][0].y,

      nose_z: context.sideBuffer!.current[0][0].z,
      shoulder_z: context.sideBuffer!.current[0][11].z,
    });
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
    const scale = Scale(context.frontBuffer!.current[0], realHeight) ?? 1;
    const scaledChest = chestCircumference * scale;
    const scaledHip = hipCircumference * scale;
    const scaledWaist = waistCircumference * scale;

    context?.setDataMeasured?.({
      chest: scaledChest,
      hip: scaledHip,
      waist: scaledWaist,
    });
  }
};
