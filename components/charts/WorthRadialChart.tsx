"use client";

import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";

type Props = {
    score: number;
    rankingTopPercent: number;
};

function formatBRL(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function WorthRadialChart({
    score,
    rankingTopPercent,
}: Props) {
    // inverter: menor percent = melhor
    const value = 100 - rankingTopPercent;

    const data = [
        {
            value,
            fill: "#22c55e",
        },
    ];

    return (
        <div className="relative h-64 w-full">

            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    innerRadius="75%"
                    outerRadius="100%"
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        tick={false}
                    />

                    <RadialBar
                        dataKey="value"
                        cornerRadius={999}
                        animationDuration={1200}
                    />

                </RadialBarChart>
            </ResponsiveContainer>

            {/* centro */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                <div className="text-3xl font-bold text-gray-900">
                    {formatBRL(score)}
                </div>

                <div className="text-sm text-gray-500">
                    Top {rankingTopPercent}%
                </div>

            </div>

        </div>
    );
}