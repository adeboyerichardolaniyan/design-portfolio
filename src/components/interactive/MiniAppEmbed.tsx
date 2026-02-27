import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";

interface Props {
  beforeLabel?: string;
  afterLabel?: string;
  beforeColor?: string;
  afterColor?: string;
  caption?: string;
}

export default function MiniAppEmbed({
  beforeLabel = "Before",
  afterLabel = "After",
  beforeColor = "#f0f0f0",
  afterColor = "#0a0a0a",
  caption,
}: Props) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setPosition((x / rect.width) * 100);
    },
    [],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      handleMove(e.clientX);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [handleMove],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const getTextColor = (bgColor: string) => {
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 0.5 ? "#000" : "#fff";
  };

  const beforeTextColor = getTextColor(beforeColor);
  const afterTextColor = getTextColor(afterColor);

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className="relative h-72 cursor-col-resize select-none overflow-hidden rounded-[var(--radius-portfolio-lg)] border border-[var(--color-border-custom)] sm:h-96"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-label="Before and after comparison"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
          if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
        }}
      >
        {/* Before side */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: beforeColor }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-base font-medium" style={{ color: beforeTextColor }}>
              {beforeLabel}
            </p>
            {/* Mock wireframe UI */}
            <div className="flex w-48 flex-col gap-2 rounded-lg border border-current/10 p-4" style={{ color: beforeTextColor }}>
              <div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: `${beforeTextColor}20` }} />
              <div className="h-3 w-full rounded-full" style={{ backgroundColor: `${beforeTextColor}15` }} />
              <div className="h-3 w-1/2 rounded-full" style={{ backgroundColor: `${beforeTextColor}15` }} />
              <div className="mt-2 h-8 w-full rounded-md" style={{ backgroundColor: `${beforeTextColor}10` }} />
            </div>
          </div>
        </div>

        {/* After side (clipped) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: afterColor,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-base font-medium" style={{ color: afterTextColor }}>
              {afterLabel}
            </p>
            {/* Mock polished UI */}
            <div className="flex w-48 flex-col gap-2 rounded-xl border p-4" style={{ borderColor: `${afterTextColor}20`, color: afterTextColor }}>
              <div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: `${afterTextColor}30` }} />
              <div className="h-3 w-full rounded-full" style={{ backgroundColor: `${afterTextColor}20` }} />
              <div className="h-3 w-1/2 rounded-full" style={{ backgroundColor: `${afterTextColor}20` }} />
              <div className="mt-2 flex h-8 w-full items-center justify-center rounded-lg text-xs font-medium" style={{ backgroundColor: afterTextColor, color: afterColor }}>
                Get Started
              </div>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 bg-white"
          style={{ left: `${position}%`, boxShadow: "0 0 8px rgba(0,0,0,0.3)" }}
        />

        {/* Handle */}
        <motion.div
          className="absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/90 shadow-lg"
          style={{ left: `${position}%` }}
          animate={{ scale: isDragging ? 1.15 : 1 }}
          transition={{ duration: 0.15 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-gray-800"
          >
            <path
              d="M5 3L2 8L5 13M11 3L14 8L11 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Labels */}
        <div className="absolute top-3 left-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {beforeLabel}
        </div>
        <div className="absolute top-3 right-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {afterLabel}
        </div>
      </div>

      {caption && (
        <p className="text-center text-[var(--font-size-caption)] text-[var(--color-text-tertiary)]">
          {caption}
        </p>
      )}
    </div>
  );
}
