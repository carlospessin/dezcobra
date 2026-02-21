"use client";

import type {
    WorthClassKey,
} from "@/services/worth/worthQuiz";

type Props = {
    classKey: WorthClassKey;
    label: string;
};

const CLASS_CONFIG: Record<
    WorthClassKey,
    {
        bg: string;
        border: string;
        text: string;
    }
> = {
    SS: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
    },
    S: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-700",
    },
    A: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
    },
    B: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-700",
    },
    C: {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-700",
    },
};

export default function WorthClassBadge({
    classKey,
    label,
}: Props) {
    const config =
        CLASS_CONFIG[classKey];

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

                <div
                    className={`
                        text-3xl font-bold
                        ${config.text}
                    `}
                >
                    Classe {classKey}
                </div>

                <div className="mt-1 text-base text-gray-600">
                    {label}
                </div>

            </div>

        </div>
    );
}