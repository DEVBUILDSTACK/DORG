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
    const percentage = useMemo(() => (current / target) * 100, [current, target]);
    const progressPercent = useMemo(() => (progress / target) * 100, [progress, target]);

    const formattedCurrent = `${current.toLocaleString()}`;
    const formattedTarget = `${target.toLocaleString()}`;
    const formattedProgress = `${progress.toLocaleString()}%`;

    return (
        <div className={`relative bg-[#0d1117] text-white rounded-md w-full ${className}`}>
            {/* Top Label */}
            <div className="flex items-center justify-between w-full h-full bg-background rounded-2xl mb-3">
                <div className="text-white/80 text-sm md:text-base lg:text-sm text-start w-fit">{label}</div>

                {/* Top Value */}
                <div
                    className="text-lg md:text-base lg:text-lg text-right font-semibold text-white"
                    style={{
                        left: `calc(${progressPercent}% - 50px)`,
                    }}
                >
                    {formattedCurrent}
                    {" "}
                    /
                    {formattedTarget}
                </div>
            </div>

            {/* Progress Wrapper */}
            <div className="relative w-full h-4 rounded-full bg-zinc-800 overflow-hidden">
                {/* Progress Milestone Label (above bar) */}
                <div
                    className="absolute -top-6 text-xl md:text-lg lg:text-sm font-semibold whitespace-nowrap text-white transition-all"
                    style={{
                        left: `calc(${progressPercent}% - 50px)`,
                    }}
                >
                    {formattedProgress}
                </div>

                {/* Progress Fill with animation */}
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${percentage}%`,
                        background: "linear-gradient(to right, #6ba8ff, #b4fba3)",
                        animation: `fillAnim 1.2s ease-out forwards`,
                    }}
                />
            </div>

            {/* Progress Milestone Label (belowe bar) */}
            <div
                className="absolute text-white px-4 py-2 rounded-lg text-lg md:text-base lg:text-lg font-semibold transform -translate-x-1/2 lg:mt-8 md:mt-6 mt-4"
                style={{
                    left: `${percentage}%`,
                    top: "25px",
                    minWidth: "80px",
                    textAlign: "center",
                }}
            >
                {formattedProgress}
            </div>

        </div>
    );
};

export default GradientProgressBar;
