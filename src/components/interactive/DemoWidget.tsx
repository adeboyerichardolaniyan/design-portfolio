import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const tokens = [
  { name: "Primary", value: "#000000", semantic: "text-primary" },
  { name: "Secondary", value: "#697175", semantic: "text-secondary" },
  { name: "Tertiary", value: "#a0a0a0", semantic: "text-tertiary" },
  { name: "Surface", value: "#ffffff", semantic: "bg-surface" },
  { name: "Background", value: "#f9f9fa", semantic: "bg-secondary" },
  { name: "Border", value: "#e6eaeb", semantic: "border-default" },
];

const radiusOptions = ["0", "0.5rem", "1rem", "1.5rem", "9999px"];

function getTextColor(bgColor: string) {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export default function DemoWidget() {
  const [selectedToken, setSelectedToken] = useState(0);
  const [radius, setRadius] = useState(2);

  const token = tokens[selectedToken];

  return (
    <div
      className="overflow-hidden rounded-[var(--radius-portfolio-lg)] border border-[var(--color-border-custom)] bg-[var(--color-surface)]"
    >
      {/* Header */}
      <div className="border-b border-[var(--color-border-custom)] px-6 py-4">
        <p className="text-[var(--font-size-caption)] uppercase tracking-widest text-[var(--color-text-tertiary)]">
          Interactive Token Explorer
        </p>
      </div>

      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
        {/* Token list */}
        <div className="border-b border-[var(--color-border-custom)] p-6 sm:border-b-0 sm:border-r">
          <div className="flex flex-col gap-2">
            {tokens.map((t, i) => (
              <motion.button
                key={t.name}
                onClick={() => setSelectedToken(i)}
                className={`flex items-center gap-3 rounded-[var(--radius-portfolio-sm)] px-3 py-2.5 text-left transition-colors ${
                  selectedToken === i
                    ? "bg-[var(--color-bg-secondary)]"
                    : "hover:bg-[var(--color-bg-secondary)]"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className="h-5 w-5 shrink-0 rounded-full border border-[var(--color-border-custom)]"
                  style={{ backgroundColor: t.value }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {t.name}
                  </p>
                  <p className="font-mono text-xs text-[var(--color-text-tertiary)]">
                    {t.value}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-6 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedToken}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              {/* Color preview */}
              <div
                className="flex h-32 items-center justify-center border border-[var(--color-border-custom)]"
                style={{
                  backgroundColor: token.value,
                  borderRadius: radiusOptions[radius],
                }}
              >
                <p
                  className="text-sm font-medium"
                  style={{ color: getTextColor(token.value) }}
                >
                  {token.semantic}
                </p>
              </div>

              {/* Token details */}
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  {token.name}
                </p>
                <p className="font-mono text-xs text-[var(--color-text-secondary)]">
                  {token.semantic}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Radius control */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-[var(--color-text-tertiary)]">
              Border Radius
            </p>
            <div className="flex gap-1.5">
              {radiusOptions.map((r, i) => (
                <button
                  key={r}
                  onClick={() => setRadius(i)}
                  className={`rounded-[var(--radius-portfolio-sm)] px-2.5 py-1 text-xs transition-colors ${
                    radius === i
                      ? "bg-[var(--color-text-primary)] text-[var(--color-surface)]"
                      : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {r === "9999px" ? "full" : r === "0" ? "none" : r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
