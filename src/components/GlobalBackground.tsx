export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-background">
      <div className="bg-grid absolute inset-0 opacity-50" />

      <div className="animate-float-a animate-pulse-glow absolute -top-40 left-[-12%] h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[110px]" />
      <div className="animate-float-b animate-pulse-glow absolute top-1/3 right-[-14%] h-[30rem] w-[30rem] rounded-full bg-accent-2/15 blur-[120px]" />
      <div className="animate-float-c absolute bottom-[-15%] left-1/4 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[110px]" />
    </div>
  );
}
