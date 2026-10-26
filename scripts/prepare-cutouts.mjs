import sharp from "sharp";
import { unlink } from "node:fs/promises";
import path from "node:path";

const jobs = [
  ["public/workforce/driver-source.png", "public/workforce/driver.webp"],
  ["public/workforce/security-source.png", "public/workforce/security.webp"],
  ["public/workforce/facility-source.png", "public/workforce/facility.webp"],
];

function knockout(data, width, height) {
  const pixels = width * height;
  const seen = new Uint8Array(pixels);
  const qx = new Int32Array(pixels);
  const qy = new Int32Array(pixels);
  let head = 0;
  let tail = 0;

  const maxChannel = (x, y) => {
    const i = (y * width + x) * 4;
    return Math.max(data[i], data[i + 1], data[i + 2]);
  };

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (seen[p]) return;
    if (maxChannel(x, y) > 16) return;
    seen[p] = 1;
    qx[tail] = x;
    qy[tail] = y;
    tail += 1;
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  const neighbors = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (head < tail) {
    const x = qx[head];
    const y = qy[head];
    head += 1;
    for (const [dx, dy] of neighbors) push(x + dx, y + dy);
  }

  for (let p = 0; p < pixels; p += 1) {
    if (seen[p]) data[p * 4 + 3] = 0;
  }

  for (let pass = 0; pass < 3; pass += 1) {
    const kill = [];
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const i = (y * width + x) * 4;
        if (data[i + 3] === 0) continue;
        let touches = false;
        for (const [dx, dy] of neighbors) {
          const j = ((y + dy) * width + (x + dx)) * 4 + 3;
          if (data[j] === 0) {
            touches = true;
            break;
          }
        }
        if (!touches) continue;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const saturation = max === 0 ? 0 : (max - min) / max;
        if (max < 40 && saturation < 0.2) kill.push(i);
      }
    }
    for (const i of kill) data[i + 3] = 0;
  }

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let opaque = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] <= 18) continue;
      opaque += 1;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  return { minX, minY, maxX, maxY, opaque, removed: tail };
}

for (const [input, output] of jobs) {
  const absoluteIn = path.resolve(input);
  const { data, info } = await sharp(absoluteIn)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const corner = [data[0], data[1], data[2], data[3]];
  const bounds = knockout(data, info.width, info.height);
  const pad = 12;
  const left = Math.max(0, bounds.minX - pad);
  const top = Math.max(0, bounds.minY - pad);
  const right = Math.min(info.width - 1, bounds.maxX + pad);
  const bottom = Math.min(info.height - 1, bounds.maxY + pad);
  const cropWidth = right - left + 1;
  const cropHeight = bottom - top + 1;

  let pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).extract({ left, top, width: cropWidth, height: cropHeight });

  if (cropHeight > 1600) {
    pipeline = pipeline.resize({ height: 1600, withoutEnlargement: true });
  }

  const file = await pipeline
    .webp({ quality: 90, alphaQuality: 100, effort: 5 })
    .toFile(path.resolve(output));

  console.log(
    JSON.stringify({
      file: output,
      source: `${info.width}x${info.height}`,
      corner,
      opaque: bounds.opaque,
      removed: bounds.removed,
      crop: `${cropWidth}x${cropHeight}`,
      bytes: file.size,
    }),
  );

  await unlink(absoluteIn);
}
