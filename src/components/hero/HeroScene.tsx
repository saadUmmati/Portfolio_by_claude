"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { HERO, buildTerrain, makePath, type Terrain } from "./terrain";

/* Flat, unlit, palette-exact 3D: a black heightfield surface hides the lines behind it
   (hidden-line look), slate hairlines run along every ridge, one ridge is violet.
   No lights, no fog, no tone mapping, no gradients -- every pixel is one of the 3 colours. */

function TerrainMesh({ terr }: { terr: Terrain }) {
  const { size } = useThree();

  const parts = useMemo(() => {
    const n = terr.rows.length, c = HERO.cols + 1;

    const pos = new Float32Array(n * c * 3);
    terr.rows.forEach((r, i) => pos.set(r, i * c * 3));
    const idx: number[] = [];
    for (let i = 0; i < n - 1; i++)
      for (let k = 0; k < c - 1; k++) {
        const a = i * c + k, b = a + 1, d = (i + 1) * c + k, e = d + 1;
        idx.push(a, b, d, b, e, d);
      }
    const surface = new THREE.BufferGeometry();
    surface.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    surface.setIndex(idx);

    const seg: number[] = [];
    terr.rows.forEach((r, i) => {
      if (i === HERO.violetRow) return;
      for (let k = 0; k < c - 1; k++)
        seg.push(r[k * 3], r[k * 3 + 1], r[k * 3 + 2], r[k * 3 + 3], r[k * 3 + 4], r[k * 3 + 5]);
    });
    const lines = new THREE.BufferGeometry();
    lines.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));

    const vGeo = new LineGeometry();
    vGeo.setPositions(Array.from(terr.rows[HERO.violetRow]));
    const vMat = new LineMaterial({
      color: 0x8b5cf6,
      linewidth: 2,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    const violet = new Line2(vGeo, vMat);
    violet.frustumCulled = false;

    return { surface, lines, violet, vMat, vGeo };
  }, [terr]);

  useEffect(() => {
    parts.vMat.resolution.set(size.width, size.height);
  }, [size, parts]);

  useEffect(
    () => () => {
      parts.surface.dispose();
      parts.lines.dispose();
      parts.vGeo.dispose();
      parts.vMat.dispose();
    },
    [parts]
  );

  return (
    <>
      <mesh geometry={parts.surface} frustumCulled={false}>
        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
      </mesh>
      <lineSegments geometry={parts.lines} frustumCulled={false}>
        <lineBasicMaterial color="#e2e8f0" />
      </lineSegments>
      <primitive object={parts.violet} />
    </>
  );
}

function Rig({
  terr,
  progress,
  onFps,
}: {
  terr: Terrain;
  progress: React.RefObject<number>;
  onFps?: (fps: number) => void;
}) {
  const path = useMemo(() => makePath(terr), [terr]);
  const cur = useRef(0);
  const acc = useRef({ t: 0, n: 0 });

  useFrame(({ camera }, dt) => {
    // light damping on top of Lenis' smoothing so the camera never snaps
    cur.current += (progress.current - cur.current) * (1 - Math.exp(-dt * 10));
    const p = path(cur.current);
    camera.position.set(p.x, p.y, p.z);
    camera.rotation.set(-p.pitch, 0, 0);

    if (onFps) {
      acc.current.t += dt; acc.current.n += 1;
      if (acc.current.t >= 0.5) { onFps(Math.round(acc.current.n / acc.current.t)); acc.current = { t: 0, n: 0 }; }
    }
  });
  return null;
}

export default function HeroScene({
  progress,
  active,
  onReady,
  onFps,
}: {
  progress: React.RefObject<number>;
  active: boolean;
  onReady: () => void;
  onFps?: (fps: number) => void;
}) {
  const terr = useMemo(() => buildTerrain(), []);
  return (
    <Canvas
      flat                                   // no tone mapping: colours stay exact
      dpr={[1, 1.5]}                         // cap pixel ratio: smooth on laptops
      frameloop={active ? "always" : "never"} // stop drawing when the hero is off screen
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: HERO.fov, near: 0.5, far: 4000, position: [0, HERO.camY0, 0] }}
      onCreated={() => onReady()}
      aria-hidden="true"
    >
      <color attach="background" args={["#000000"]} />
      <TerrainMesh terr={terr} />
      <Rig terr={terr} progress={progress} onFps={onFps} />
    </Canvas>
  );
}
