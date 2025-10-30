import React, { useMemo } from "react";

type GradientProgressBarProps = {
    current: number;
    target: number;
    progress: number;
    label?: string;
    className?: string;
};

const GradientProgressBar: React.FC<GradientProgressBarProps> = ({
    current,
    target,
    progress,
    label = "Current / Target",
    className = "",
}) => {
    const percentage = useMemo(() => Math.min((current / target) * 100, 100), [current, target]);
    const progressPercent = useMemo(() => Math.min((progress / target) * 100, 100), [progress, target]);

    const formattedCurrent = current.toLocaleString();
    const formattedTarget = target.toLocaleString();
    const formattedProgress = `${progress}%`;

    return (
        <div className={`relative w-full ${className}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-[#5A6C7D]">{label}</div>
                <div className="text-lg font-bold text-[#0A4A7A] tabular-nums">
                    {formattedCurrent} / {formattedTarget}
                </div>
            </div>

            <div className="relative w-full h-3 rounded-full bg-[#E5E7EB] overflow-hidden">
                <div 
                    className="h-full rounded-full bg-linear-to-r from-[#0A4A7A] to-[#2E865F] transition-all duration-500 ease-out"
                    data-width={percentage}
                />
            </div>

            <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-[#9CA3AF]">Progress</span>
                <span className="text-sm font-semibold text-[#2E865F] tabular-nums">
                    {formattedProgress}
                </span>
            </div>

            <style jsx>{`
                [data-width="${percentage}"] {
                    width: ${percentage}%;
                }
            `}</style>
        </div>
    );
};

export default GradientProgressBar;
