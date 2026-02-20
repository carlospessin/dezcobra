export default function Footer() {
    return (
        <footer className="mt-16 border-t border-gray-200 bg-white">

            <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-gray-500">

                <p>
                    © {new Date().getFullYear()} Dezcobra
                </p>

                <p className="mt-1">
                    Descubra mais sobre você através dos nossos quizzes.
                </p>

            </div>

        </footer>
    );
}