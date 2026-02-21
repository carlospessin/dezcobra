import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";

import OrkutProfileMobile from "@/components/quiz/orkut/OrkutProfileMobile";

import {
    decodeOrkutPayload,
} from "@/components/quiz/orkut/orkutCodec";

export default async function Page({
    params,
}: {
    params: Promise<{
        locale: Locale;
        encoded: string;
    }>;
}) {

    const { encoded } =
        await params;

    const data =
        decodeOrkutPayload(encoded);

    if (!data) {
        notFound();
    }

    const profile = {
        name: data.name,
        status: "online agora",
        about: `Curte ${data.weekend}, tem alma ${data.vibe}.`,
        avatar: "/orkut.png",
        friends: data.friends,
        fans: data.fans,
        visits: data.visits,

        testimonials: [
            {
                author: "Carlos",
                text: "Pessoa incrível!",
            },
            {
                author: "Ana",
                text: "Muito popular!",
            },
        ],

        communities: [
            "Odeio acordar cedo",
            "MSN era melhor",
            "Internet raiz",
        ],
    };

    return (
        <main className="min-h-screen bg-[#e5ecf9] px-4 py-10">

            <OrkutProfileMobile
                data={profile}
            />

        </main>
    );
}