"use client";

import { useEffect } from "react";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";

export default function OrkutCalculating({
    locale,
}: {
    locale: string;
}) {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const payload =
            params.get("payload");

        if (!payload) return;

        setTimeout(() => {
            router.push(
                `/${locale}/orkut/result/${payload}`
            );
        }, 2000);

    }, []);

    return (
        <div className="mx-auto max-w-2xl bg-white border rounded-2xl p-6 text-center">

            <h2 className="text-xl font-semibold">
                Gerando seu perfil Orkut...
            </h2>

            <p className="mt-2 text-gray-600">
                Calculando amigos, fãs e visitantes...
            </p>

        </div>
    );
}