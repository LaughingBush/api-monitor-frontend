import './Sparkline.css';

interface SparklineProps {
  data?: number[];
  width?: number;
  height?: number;
  className?: string;
}

export const Sparkline = ({
  data,
  width = 200,
  height = 60,
  className = ''
}: SparklineProps) => {
  // Generate random sparkline data if not provided
  const sparklineData = data || generateRandomSparkline();

  const max = Math.max(...sparklineData);
  const min = Math.min(...sparklineData);
  const range = max - min || 1;

  // Create SVG path
  const points = sparklineData.map((value, index) => {
    const x = (index / (sparklineData.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(' L ')}`;

  return (
    <svg
      className={`sparkline ${className}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      {/* Gradient definition */}
      <defs>
        <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(139, 92, 246, 0.8)" />
          <stop offset="100%" stopColor="rgba(219, 39, 119, 0.6)" />
        </linearGradient>
      </defs>

      {/* Area under the line */}
      <path
        d={`${pathData} L ${width},${height} L 0,${height} Z`}
        fill="url(#sparkline-gradient)"
        opacity="0.1"
      />

      {/* The line itself */}
      <path
        d={pathData}
        fill="none"
        stroke="url(#sparkline-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Generate random sparkline data for visualization
function generateRandomSparkline(points = 24): number[] {
  const data: number[] = [];
  let value = 4000 + Math.random() * 2000;

  for (let i = 0; i < points; i++) {
    // Random walk with some smoothing
    const change = (Math.random() - 0.5) * 1000;
    value = Math.max(2000, Math.min(8000, value + change));
    data.push(Math.round(value));
  }

  return data;
}
