"use client";

import { useEffect, useState } from "react";

type Props = {
    title: string;

    steps: string[];

    onComplete: () => void;

    progressLabel?: string;

    dramaticPauseMs?: number;

    className?: string;
};

export default function FakeProgressLoader({
    title,
    steps,
    onComplete,
    progressLabel = "progresso",
    dramaticPauseMs = 1200,
    className = "",
}: Props) {
    const [progress, setProgress] = useState(0);

    const [stageIndex, setStageIndex] = useState(0);

    useEffect(() => {
        let current = 0;

        const timer = setInterval(() => {
            let increment;

            if (current < 60)
                increment = Math.random() * 4;

            else if (current < 85)
                increment = Math.random() * 2;

            else if (current < 92)
                increment = Math.random() * 0.6;

            else if (current < 98)
                increment = Math.random() * 0.15;

            else increment = 0;

            current = Math.min(current + increment, 98);

            setProgress(current);

            const step =
                Math.floor((current / 100) * steps.length);

            setStageIndex(
                Math.min(step, steps.length - 1)
            );

            if (current >= 98) {
                clearInterval(timer);

                setTimeout(() => {
                    onComplete();
                }, dramaticPauseMs);
            }
        }, 80);

        return () => clearInterval(timer);
    }, [steps, onComplete, dramaticPauseMs]);

    const currentStep =
        steps[Math.min(stageIndex, steps.length - 1)];

    return (
        <section
            className={`mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}
        >
            {/* header */}
            <div className="mb-6 flex items-center gap-3">

                <div className="relative">

                    <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse" />

                    <div className="absolute inset-0 h-4 w-4 rounded-full bg-green-400 animate-ping opacity-40" />

                </div>

                <h2 className="text-2xl font-semibold">
                    {title}
                </h2>

            </div>

            {/* mensagem atual */}
            <div className="mb-2 text-sm text-gray-600 animate-fade-in">
                {currentStep}
            </div>

            {/* progresso */}
            <div className="mb-2 flex justify-between text-sm text-gray-500">

                <span>
                    {progressLabel}
                </span>

                <span>
                    {Math.floor(progress)}%
                </span>

            </div>

            {/* barra */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 mb-6">

                <div
                    className="h-full rounded-full bg-green-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />

            </div>

            {/* histórico */}
            <div className="grid gap-2">

                {steps
                    .slice(0, stageIndex + 1)
                    .map((step) => (
                        <div
                            key={step}
                            className="text-sm text-green-700 animate-fade-in"
                        >
                            ✓ {step}
                        </div>
                    ))}

            </div>

        </section>
    );
}