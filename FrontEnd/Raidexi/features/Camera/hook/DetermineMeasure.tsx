
export function detectPose(lm: any) {
  const ls = lm[11],
    rs = lm[12];

  if (ls.visibility < 0.9 || rs.visibility < 0.9) return "INVALID";
  const dz = Math.abs(ls.z - rs.z);
  if (dz < 0.05) return "BODY";

  return "UNKNOWN";
}
const calculate3DDistance = (
  p1: { x: number; y: number; z: number },
  p2: { x: number; y: number; z: number }
) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = p1.z - p2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const calculateDepthFromZ = (
  leftZ: number,
  rightZ: number,
  baseWidth: number
) => {
  const zDiff = Math.abs(leftZ - rightZ);
  let ratio = 0.8 + (zDiff > 0.03 ? zDiff * 2 : 0);
  ratio = Math.max(0.7, Math.min(1.0, ratio));
  return baseWidth * ratio;
};

const calculateEllipseCircumference = (width: number, depth: number) => {
  const a = width / 2;
  const b = depth / 2;
  const h = Math.pow((a - b) / (a + b), 2);
  return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
};
function pushFrameToPoseEstimator(type: any, lm: any, buffer: any[]) {
  buffer.push(lm);
  if (buffer.length > 52) buffer.shift();
}
export { calculate3DDistance, calculateDepthFromZ, calculateEllipseCircumference, pushFrameToPoseEstimator };