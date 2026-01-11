import { Landmark } from "@mediapipe/pose";
export function detectPose(lm: any) {
  const ls = lm[11],
    rs = lm[12];

  if (ls.visibility < 0.9 || rs.visibility < 0.9) return "INVALID";

  const dx = Math.abs(ls.x - rs.x);
  const dz = Math.abs(ls.z - rs.z);

  if (dz / (dx + 1e-4) > 2.2 && dx < 0.04) return "SIDE";

  if (dz < 0.05) return "FRONT";

  return "UNKNOWN";
}

export function pushFrameToPoseEstimator(type: any, lm: any, buffer: any[]) {
  if (detectPose(lm) === type) buffer.push(lm);
  if (buffer.length >= 51) buffer.shift();
}

export function extractAxis(
  frames: any, 
  type: any, 
  L: any, 
  R: any,
  context: { userHeight: number | undefined }
) {
  const values = frames.map((lm: any) => {
    if (type === "FRONT") {
      return Math.abs(lm[L].x - lm[R].x);
    } else {

      const zDiffMeter = Math.abs(lm[L].z - lm[R].z);
      
      if (context.userHeight && lm[0] && lm[27] && lm[28]) {
        const nose = lm[0];
        const avgAnkleY = (lm[27].y + lm[28].y) / 2;
        const heightNormalized = avgAnkleY - nose.y;
        const realHeightMeter = context.userHeight / 100; 
        
        // Convert Z to normalized scale
        return zDiffMeter * (heightNormalized / realHeightMeter);
      }
      
      // Fallback: ước lượng nếu không có realHeight
      return zDiffMeter * 0.4;
    }
  });
  values.sort((a: any, b: any) => a - b);
  return values[Math.floor(values.length / 2)];
}

export function Scale(lm: Landmark[], realHeight: number|undefined) {
  {

    const nose = lm[0];
    const ankleL = lm[27];
    const ankleR = lm[28];
    const avgAnkleY = (ankleL.y + ankleR.y) / 2;
    return realHeight ? realHeight / (avgAnkleY - nose.y) : undefined;
  }
}
export function calculateEllipseCircumference(a: number, b: number) {
  const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
  const circumference =
    Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  return circumference;
}
export function getWaistLandmarks(lm: Landmark[], type: string) {
  const shoulderX = (lm[11].x + lm[12].x) / 2;
  const shoulderY = (lm[11].y + lm[12].y) / 2;
  const shoulderZ = (lm[11].z + lm[12].z) / 2;

  const hipX = (lm[23].x + lm[24].x) / 2;
  const hipY = (lm[23].y + lm[24].y) / 2;
  const hipZ = (lm[23].z + lm[24].z) / 2;

  const waistX = (shoulderX + hipX) / 2;
  const waistY = (shoulderY + hipY) / 2;
  const waistZ = (shoulderZ + hipZ) / 2;

  const shoulderWidth = Math.abs(lm[11].x - lm[12].x);
  const hipWidth = Math.abs(lm[23].x - lm[24].x);
  const waistHalfWidth = (shoulderWidth + hipWidth) / 2 / 2;

  const shoulderDepth = Math.abs(lm[11].z - lm[12].z);
  const hipDepth = Math.abs(lm[23].z - lm[24].z);
  const waistHalfDepth = (shoulderDepth + hipDepth) / 2 / 2;

  if (type === "FRONT") {
    return {
      left: { x: waistX - waistHalfWidth, y: waistY, z: waistZ, visibility: 1 },
      right: {
        x: waistX + waistHalfWidth,
        y: waistY,
        z: waistZ,
        visibility: 1,
      },
    };
  } else {
    return {
      left: { x: waistX, y: waistY, z: waistZ - waistHalfDepth, visibility: 1 },
      right: {
        x: waistX,
        y: waistY,
        z: waistZ + waistHalfDepth,
        visibility: 1,
      },
    };
  }
}