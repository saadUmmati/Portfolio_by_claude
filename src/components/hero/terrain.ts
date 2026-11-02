// Pure geometry for the hero terrain -- no three.js here, so the SAME numbers feed the static
// SVG poster (server-rendered, instant) and the live WebGL scene (progressive enhancement).
// World: camera looks down -z. Rows are "ridgelines" at geometric distances (even spacing on screen).

export const HERO = {
  rows: 34,          // ridgelines
  cols: 110,         // points per ridgeline
  d0: 16,            // distance of the nearest ridgeline from the start camera (world units)
  growth: 1.11,      // each further row is 11% further than the last
  violetRow: 22,     // the single violet ridgeline
  fov: 50,           // vertical field of view, degrees
  aspect: 1.8,       // design aspect ratio (width / height); rows are made wider than any screen
  designH: 860,      // design height in px (poster viewBox is 1440 x 860)
  camY0: 14,         // starting camera height
} as const;

export type Terrain = {
  /** rows[i] = (cols+1) points as x,y,z triples, far-to-near order is rows.length-1 -> 0 */
  rows: Float32Array[];
  dist: number[];
};

const F = (HERO.designH / 2) / Math.tan((HERO.fov * Math.PI) / 360); // focal length in design px

function ridgeNoise(u: number, i: number) {
  const s = (a: number) => 0.5 * (Math.sin(a) + 1);
  return 0.6 * s(6.2 * u + 0.31 * i) + 0.3 * s(13 * u + 0.7 * i + 1.1) + 0.1 * s(29 * u + 1.3 * i + 2.2);
}
function envelope(u: number) {
  return 0.22 + 0.78 * Math.exp(-(((u - 0.64) / 0.2) ** 2)) + 0.18 * Math.exp(-(((u - 0.18) / 0.12) ** 2));
}

export function buildTerrain(): Terrain {
  const { rows, cols, d0, growth } = HERO;
  const out: Float32Array[] = [];
  const dist: number[] = [];
  for (let i = 0; i < rows; i++) {
    const t = i / (rows - 1);
    const d = d0 * growth ** i;
    const ampPx = 16 + 150 * t ** 1.15;       // how tall the peaks read on screen
    const amp = (ampPx * d) / F;               // ...converted to world height at this distance
    const pts = new Float32Array((cols + 1) * 3);
    for (let k = 0; k <= cols; k++) {
      const u = k / cols;
      const x = (u * 2 - 1) * d * 1.15;        // wider than the widest screen (up to ~2.5:1) at this depth
      const h = amp * envelope(u) * ridgeNoise(u, i) ** 1.5;
      pts[k * 3] = x; pts[k * 3 + 1] = h; pts[k * 3 + 2] = -d;
    }
    out.push(pts); dist.push(d);
  }
  return { rows: out, dist };
}

/** Highest terrain point near the camera's line of travel at depth z (z is negative). */
function clearanceAt(terr: Terrain, z: number) {
  let m = 0;
  for (let i = 0; i < terr.rows.length; i++) {
    const rz = -terr.dist[i];
    if (rz > z + 4 || rz < z - 45) continue;
    const r = terr.rows[i];
    for (let k = 0; k < r.length; k += 3) if (Math.abs(r[k]) < 34) m = Math.max(m, r[k + 1]);
  }
  return m;
}

export type CamPose = { x: number; y: number; z: number; pitch: number };

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/** Camera path for scroll progress p in [0,1]: glide over the ridges, then dive at the violet line. */
export function makePath(terr: Terrain, samples = 240) {
  const travel = terr.dist[HERO.violetRow] - 14;
  const ys: number[] = [];
  for (let s = 0; s <= samples; s++) {
    const p = s / samples;
    const z = -travel * (p * p * (3 - 2 * p));
    const floor = HERO.camY0 + (6 - HERO.camY0) * smooth(0.3, 1, p); // descend toward the violet line
    ys.push(Math.max(floor, clearanceAt(terr, z) + 4));
  }
  for (let pass = 0; pass < 4; pass++) for (let s = 1; s < samples; s++) ys[s] = (ys[s - 1] + ys[s] * 2 + ys[s + 1]) / 4; // smooth
  return (p: number): CamPose => {
    const q = Math.min(1, Math.max(0, p));
    const f = q * samples, i0 = Math.floor(f), i1 = Math.min(samples, i0 + 1), a = f - i0;
    const e = q * q * (3 - 2 * q);
    return { x: 0, y: ys[i0] * (1 - a) + ys[i1] * a, z: -travel * e, pitch: 0.02 + 0.03 * smooth(0.5, 1, q) };
  };
}

/** Project the terrain to 2D paths (painter's algorithm: far ridges first, each filled black). */
export function projectPaths(terr: Terrain, cam: CamPose, W = 1440, H = HERO.designH, step = 1) {
  const sinP = Math.sin(cam.pitch), cosP = Math.cos(cam.pitch);
  const out: { d: string; violet: boolean; sw: number }[] = [];
  for (let i = terr.rows.length - 1; i >= 0; i--) {
    const r = terr.rows[i];
    const pts: string[] = [];
    let ok = true;
    for (let k = 0; k < r.length; k += 3 * step) {
      const rx = r[k] - cam.x, ry = r[k + 1] - cam.y, rz = r[k + 2] - cam.z;
      const depth = -rz * cosP - ry * sinP;          // along the view direction
      const up = ry * cosP - -rz * sinP;             // camera-up component
      if (depth < 1) { ok = false; break; }
      pts.push(`${Math.round(W / 2 + (F * rx) / depth)} ${Math.round(H / 2 - (F * up) / depth)}`);
    }
    if (!ok) continue;
    const t = i / (terr.rows.length - 1);
    out.push({ d: `M${pts.join("L")}L${W + 40} ${H + 40}L-40 ${H + 40}Z`, violet: i === HERO.violetRow, sw: Math.round((0.7 + t) * 100) / 100 });
  }
  return out;
}
