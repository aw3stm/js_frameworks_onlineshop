type FlowerLineProps = {
  className?: string;
  cx?: number;
  cy?: number;
  size?: number;
  tailIn?: boolean;
  tailOut?: boolean;
};

type Flower = {
  cx: number;
  cy: number;
  size: number;
};

const PETAL_A = 68;
const PETAL_B = 95;
const ROTATION = -0.3;
const LINE_OUT_Y = 470;

type Point = [number, number];

function flowerPoint(t: number, { cx, cy, size }: Flower): Point {
  const a = PETAL_A * size;
  const b = PETAL_B * size;
  const wobble = 1 + 0.08 * Math.sin(2 * t + 1) + 0.05 * Math.cos(3 * t);
  const x = wobble * (a * Math.cos(t) + b * Math.cos(-4 * t));
  const y = wobble * (a * Math.sin(t) + b * Math.sin(-4 * t));

  return [
    cx + x * Math.cos(ROTATION) - y * Math.sin(ROTATION),
    cy + x * Math.sin(ROTATION) + y * Math.cos(ROTATION),
  ];
}

function direction(t: number, flower: Flower): Point {
  const [x1, y1] = flowerPoint(t - 0.001, flower);
  const [x2, y2] = flowerPoint(t + 0.001, flower);
  const length = Math.hypot(x2 - x1, y2 - y1);
  return [(x2 - x1) / length, (y2 - y1) / length];
}

function findStart(flower: Flower) {
  let bestT = 0;
  let lowestY = -Infinity;

  for (let i = 0; i < 2000; i++) {
    const t = (i / 2000) * Math.PI * 2;
    const [, y] = flowerPoint(t, flower);
    const [dx] = direction(t, flower);

    if (dx > 0.3 && y > lowestY) {
      lowestY = y;
      bestT = t;
    }
  }
  return bestT;
}

const r = (n: number) => n.toFixed(1);

function buildPath(flower: Flower, tailIn: boolean, tailOut: boolean) {
  const start = findStart(flower);
  const end = start + Math.PI * 2 + 0.45;
  const steps = 600;

  const [sx, sy] = flowerPoint(start, flower);
  const [sdx, sdy] = direction(start, flower);
  let d = tailIn
    ? `M 760 940 C 800 800, ${r(sx - sdx * 300)} ${r(sy - sdy * 300)}, ${r(sx)} ${r(sy)}`
    : `M ${r(sx)} ${r(sy)}`;

  for (let i = 1; i <= steps; i++) {
    const [x, y] = flowerPoint(start + ((end - start) * i) / steps, flower);
    d += ` L ${r(x)} ${r(y)}`;
  }

  if (tailOut) {
    const [ex, ey] = flowerPoint(end, flower);
    const [edx, edy] = direction(end, flower);
    d += ` C ${r(ex + edx * 180)} ${r(ey + edy * 180)}, 1480 ${LINE_OUT_Y - 50}, 1650 ${LINE_OUT_Y}`;
  }

  return d;
}

export default function FlowerLine({
  className = "",
  cx = 1290,
  cy = 600,
  size = 1,
  tailIn = true,
  tailOut = true,
}: FlowerLineProps) {
  const d = buildPath({ cx, cy, size }, tailIn, tailOut);

  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full text-atelier-details/15 ${className}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
