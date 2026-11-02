import { HERO, buildTerrain, makePath, projectPaths } from "./terrain";

// Server-rendered SVG of the terrain at scroll 0 -- uses the SAME numbers as the live WebGL
// scene, so it is what you see instantly, on phones, with reduced motion, or without WebGL.
const terrain = buildTerrain();
const paths = projectPaths(terrain, makePath(terrain)(0), 1440, HERO.designH, 2);

export default function HeroPoster({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 1440 ${HERO.designH}`}
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="Fine-line 3D terrain of layered ridgelines receding to the horizon, one line in violet"
      className={className}
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="#000000"
          stroke={p.violet ? "#8b5cf6" : "#e2e8f0"}
          strokeWidth={p.violet ? p.sw + 1.2 : p.sw}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
