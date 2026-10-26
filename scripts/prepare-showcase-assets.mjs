import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourceDir =
  "C:\\Users\\Kritiman\\.cursor\\projects\\d-website-pre-sales-The-Rising-Star-Manpower\\assets";
const outDir = path.resolve("public/assets");

fs.mkdirSync(outDir, { recursive: true });

const names = fs.readdirSync(sourceDir);
const propSources = {
  "car-prop.png": names.find((name) => name.includes("Tier_1_Prop")),
  "gate-prop.png": names.find((name) => name.includes("Tier_2_Prop")),
  "cart-prop.png": names.find((name) => name.includes("Tier_3_Prop")),
};

for (const [outName, sourceName] of Object.entries(propSources)) {
  if (!sourceName) {
    throw new Error(`Missing source for ${outName}. Found: ${names.join(" | ")}`);
  }
  console.log("source", outName, sourceName.length, sourceName.slice(0, 40));
}

function knockout(data, width, height, tolerance) {
  const pixels = width * height;
  const seen = new Uint8Array(pixels);
  const qx = new Int32Array(pixels);
  const qy = new Int32Array(pixels);
  let head = 0;
  let tail = 0;
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];

  const isBg = (x, y) => {
    const i = (y * width + x) * 4;
    return (
      Math.abs(data[i] - bgR) +
        Math.abs(data[i + 1] - bgG) +
        Math.abs(data[i + 2] - bgB) <=
      tolerance
    );
  };

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (seen[p] || !isBg(x, y)) return;
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

  for (let pass = 0; pass < 2; pass += 1) {
    const kill = [];
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const i = (y * width + x) * 4;
        if (data[i + 3] === 0) continue;
        let touches = false;
        for (const [dx, dy] of neighbors) {
          if (data[((y + dy) * width + (x + dx)) * 4 + 3] === 0) {
            touches = true;
            break;
          }
        }
        if (!touches) continue;
        const dist =
          Math.abs(data[i] - bgR) +
          Math.abs(data[i + 1] - bgG) +
          Math.abs(data[i + 2] - bgB);
        if (dist <= tolerance + 18) kill.push(i);
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
      if (data[(y * width + x) * 4 + 3] <= 12) continue;
      opaque += 1;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  return { minX, minY, maxX, maxY, opaque, removed: tail, bg: [bgR, bgG, bgB] };
}

async function writeTrimmed(data, info, bounds, output, maxWidth) {
  const pad = 8;
  const left = Math.max(0, bounds.minX - pad);
  const top = Math.max(0, bounds.minY - pad);
  const right = Math.min(info.width - 1, bounds.maxX + pad);
  const bottom = Math.min(info.height - 1, bounds.maxY + pad);

  let pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).extract({
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
  });

  if (right - left + 1 > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  const file = await pipeline
    .png({ compressionLevel: 9, effort: 8 })
    .toFile(output);

  return { crop: `${right - left + 1}x${bottom - top + 1}`, bytes: file.size };
}

const stagingDir = path.resolve("scripts/.prop-staging");
fs.mkdirSync(stagingDir, { recursive: true });

for (const [outName, sourceName] of Object.entries(propSources)) {
  const staged = path.join(stagingDir, outName);
  const longSource = "\\\\?\\" + path.join(sourceDir, sourceName);
  fs.copyFileSync(longSource, staged);
  const input = staged;
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const bounds = knockout(data, info.width, info.height, 28);
  const written = await writeTrimmed(
    data,
    info,
    bounds,
    path.join(outDir, outName),
    1600,
  );
  console.log(JSON.stringify({ outName, source: `${info.width}x${info.height}`, ...bounds, ...written }));
}

const people = [
  ["public/workforce/driver.webp", "driver.png"],
  ["public/workforce/security.webp", "security.png"],
  ["public/workforce/facility.webp", "facility.png"],
];

fs.rmSync(stagingDir, { recursive: true, force: true });

for (const [input, outName] of people) {
  const file = await sharp(input)
    .trim({ threshold: 12 })
    .resize({ height: 1600, withoutEnlargement: true })
    .png({ compressionLevel: 9, effort: 8 })
    .toFile(path.join(outDir, outName));
  console.log(JSON.stringify({ outName, bytes: file.size }));
}
