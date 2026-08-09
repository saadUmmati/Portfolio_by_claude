export interface ProofNode {
  id: string;
  value: string;
  label: string; // shown on hover
  x: number; // percentage of panel width
  y: number; // percentage of panel height
  size: number; // px diameter
}

export interface ProofCategory {
  id: string;
  label: string;
  color: string; // matches the site's accent palette
  labelX: number;
  labelY: number;
  nodes: ProofNode[];
}

// Example values in the same spirit/structure as the reference that inspired this
// section — swap these for your own real numbers whenever you have them.
// Coordinates are hand-placed on a generous grid (min ~6% spacing between any two
// node centers) specifically so nothing overlaps -- see ProofNetwork.tsx for how
// these get converted to real pixel positions for the connecting lines.
export const proofCategories: ProofCategory[] = [
  {
    id: "cost",
    label: "Cost & Efficiency",
    color: "#34d399",
    labelX: 20,
    labelY: 40,
    nodes: [
      { id: "cost-1", value: "90%", label: "Manual work eliminated on a client's ops pipeline", x: 8, y: 16, size: 26 },
      { id: "cost-2", value: "72%", label: "Faster delivery after moving inference on-device", x: 18, y: 22, size: 20 },
      { id: "cost-3", value: "3x", label: "Faster iteration speed with automated workflows", x: 28, y: 18, size: 28 },
      { id: "cost-4", value: "15+", label: "Manual processes automated across client projects", x: 12, y: 33, size: 20 },
    ],
  },
  {
    id: "accuracy",
    label: "Accuracy & Quality",
    color: "#fbbf24",
    labelX: 50,
    labelY: 22,
    nodes: [
      { id: "acc-1", value: "5/5", label: "Average client satisfaction rating", x: 45, y: 6, size: 20 },
      { id: "acc-2", value: "100%", label: "On-time delivery across shipped projects", x: 55, y: 6, size: 20 },
      { id: "acc-3", value: "~97%", label: "Model accuracy on production clustering runs", x: 50, y: 14, size: 28 },
      { id: "acc-4", value: "0", label: "Critical bugs shipped to production", x: 43, y: 15, size: 18 },
    ],
  },
  {
    id: "scale",
    label: "Scale & Performance",
    color: "#22d3ee",
    labelX: 80,
    labelY: 40,
    nodes: [
      { id: "scale-1", value: "<300ms", label: "Typical API response time", x: 68, y: 12, size: 24 },
      { id: "scale-2", value: "<50ms", label: "On-device inference latency", x: 84, y: 6, size: 20 },
      { id: "scale-3", value: "99.9%", label: "Uptime across deployed services", x: 92, y: 14, size: 20 },
      { id: "scale-4", value: "60 FPS", label: "UI performance on mid-range Android devices", x: 96, y: 24, size: 20 },
      { id: "scale-5", value: "10k+", label: "Requests handled without degradation", x: 72, y: 26, size: 26 },
      { id: "scale-6", value: "7x", label: "Throughput improvement after optimization", x: 84, y: 28, size: 24 },
    ],
  },
  {
    id: "reliability",
    label: "Reliability & Ops",
    color: "#a78bfa",
    labelX: 84,
    labelY: 56,
    nodes: [
      { id: "rel-1", value: "24/7", label: "Monitoring on production automation workflows", x: 94, y: 46, size: 20 },
      { id: "rel-2", value: "0", label: "Security incidents to date", x: 74, y: 47, size: 18 },
      { id: "rel-3", value: "<1hr", label: "Average response time to critical issues", x: 68, y: 56, size: 22 },
      { id: "rel-4", value: "100%", label: "Data integrity across on-device pipelines", x: 94, y: 62, size: 20 },
    ],
  },
  {
    id: "reach",
    label: "Reach & Languages",
    color: "#f472b6",
    labelX: 62,
    labelY: 74,
    nodes: [
      { id: "reach-1", value: "10k+", label: "LinkedIn followers reached with AI & tech content", x: 52, y: 66, size: 24 },
      { id: "reach-2", value: "3+", label: "Countries with delivered client work", x: 66, y: 62, size: 18 },
      { id: "reach-3", value: "5+", label: "Industries served across projects", x: 58, y: 82, size: 22 },
      { id: "reach-4", value: "2", label: "Languages worked in professionally", x: 72, y: 84, size: 18 },
    ],
  },
  {
    id: "research",
    label: "Certifications & Learning",
    color: "#fb923c",
    labelX: 34,
    labelY: 80,
    nodes: [
      { id: "res-1", value: "5", label: "Professional certifications (Google, AWS ×2, more)", x: 38, y: 68, size: 22 },
      { id: "res-2", value: "1+", label: "Years specialized in on-device AI", x: 24, y: 76, size: 22 },
      { id: "res-3", value: "10+", label: "Shipped projects across AI, mobile & web", x: 34, y: 92, size: 22 },
    ],
  },
  {
    id: "breadth",
    label: "Systems Breadth",
    color: "#2dd4bf",
    labelX: 10,
    labelY: 58,
    nodes: [
      { id: "breadth-1", value: "6+", label: "Core tech stacks worked in professionally", x: 4, y: 48, size: 18 },
      { id: "breadth-2", value: "4", label: "Platforms shipped to (Android, Web, Cloud, AI)", x: 16, y: 68, size: 18 },
      { id: "breadth-3", value: "19", label: "Frameworks & tools in active rotation", x: 4, y: 74, size: 16 },
    ],
  },
];
