export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-60" />

      <div className="animate-float-a animate-pulse-glow absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-accent/30 blur-[100px]" />
      <div className="animate-float-b animate-pulse-glow absolute top-10 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent-2/25 blur-[110px]" />
      <div className="animate-float-c absolute bottom-[-20%] left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-[100px]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
