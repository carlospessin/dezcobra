"use client";

type Props = {
    rankingTopPercent: number;
};

function getRankingColor(percent: number) {
    if (percent <= 5)
        return {
            bg: "bg-purple-50",
            border: "border-purple-200",
            text: "text-purple-700",
            label: "Excepcional",
        };

    if (percent <= 15)
        return {
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-700",
            label: "Elite",
        };

    if (percent <= 30)
        return {
            bg: "bg-green-50",
            border: "border-green-200",
            text: "text-green-700",
            label: "Acima da média",
        };

    return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-700",
        label: "Em evolução",
    };
}

export default function WorthRankingBadge({
    rankingTopPercent,
}: Props) {
    const config =
        getRankingColor(rankingTopPercent);

    return (
        <div className="flex justify-center md:justify-start">

            <div
                className={`
          rounded-2xl border px-10 py-7 text-center
          min-w-[220px]
          ${config.bg}
          ${config.border}
        `}
            >

                <div className="text-xs text-gray-500 mb-1">
                    Ranking global
                </div>

                <div
                    className={`
            text-3xl font-bold
            ${config.text}
          `}
                >
                    Top {rankingTopPercent}%
                </div>

                <div className="mt-1 text-base text-gray-600">
                    {config.label}
                </div>

            </div>

        </div>
    );
}