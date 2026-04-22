import { cn } from "@/lib/utils";

type BadgeColor = "purple" | "cyan" | "blue" | "pink" | "orange";

interface NeonBadgeProps {
  label: string;
  color?: BadgeColor;
  className?: string;
}

const colorMap: Record<BadgeColor, string> = {
  purple: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  blue: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  pink: "bg-pink-500/10 text-pink-300 border-pink-500/30",
  orange: "bg-orange-500/10 text-orange-300 border-orange-500/30",
};

export default function NeonBadge({
  label,
  color = "purple",
  className,
}: NeonBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        colorMap[color],
        className
      )}
    >
      {label}
    </span>
  );
}
