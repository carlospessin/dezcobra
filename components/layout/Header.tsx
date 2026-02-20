import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

type Props = {
    locale: Locale;
};

export default function Header({ locale }: Props) {
    return (
        <header className="border-b border-gray-200 bg-white">

            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">

                <Link
                    href={`/${locale}`}
                    className="flex items-center gap-3"
                >
                    <Image
                        src="/dezcobra.png"
                        alt="Dezcobra"
                        width={40}
                        height={40}
                    />

                    <span className="text-xl font-bold">
                        Dezcobra
                    </span>
                </Link>

            </div>

        </header>
    );
}