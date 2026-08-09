export default function LiquidGlassFilter() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <filter id="liquid-glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.008 0.012"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="2" result="blurredNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurredNoise"
          scale="18"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
