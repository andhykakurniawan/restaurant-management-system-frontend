export default function AuthLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full overflow-hidden font-sans">

            {/* LEFT PANEL — BRANDING */}
            <div className="relative hidden w-1/2 flex-col items-center justify-center bg-[#1A1A1A] lg:flex">

                {/* Texture overlay */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                <div className="relative z-10 flex flex-col items-center text-center">

                    {/* LOGO CONTAINER */}
                    <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-3xl bg-[#111111] shadow-2xl border border-[#C49A6C]/20">
                        {/* Placeholder monogram */}
                        <span className="text-6xl font-bold tracking-tighter">
                            <span className="text-[#C49A6C]">T</span>
                            <span className="text-[#F5E6CA]">R</span>
                        </span>
                    </div>

                    {/* BRAND NAME */}
                    <h1 className="text-5xl font-bold tracking-tight text-[#F5E6CA] uppercase">
                        TEMU <span className="text-[#C49A6C]">RASA</span>
                    </h1>

                    {/* TAGLINE */}
                    <p className="mt-4 text-lg italic text-gray-400">
                        Try and Find Your Best Moment
                    </p>

                </div>
            </div>


            {/* RIGHT PANEL — FORM AREA */}
            <div className="flex w-full items-center justify-center bg-white px-8 lg:w-1/2">
                {children}
            </div>

        </div>
    );
}