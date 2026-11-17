type LinePatternProps = {
  className?: string;
};

export default function LinePattern({ className = "" }: LinePatternProps) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full text-atelier-details/30 ${className}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <circle
        cx="800"
        cy="450"
        r="280"
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="800"
        cy="450"
        r="340"
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        strokeDasharray="2 6"
      />
    </svg>
  );
}
