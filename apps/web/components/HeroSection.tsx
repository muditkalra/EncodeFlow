import { Show, SignInButton } from "@clerk/nextjs";
import { MonitorPlay, MoveRight } from "lucide-react";
import Link from "next/link";
import HeroSectionillus from "./HeroSectionillus";
import { Button } from "./ui/button";

export default async function HeroSection() {
    return (
        <section className="py-20 md:py-32 xl:py-40">
            <div className="grid grid-cols-3 max-w-400 mx-auto gap-2">
                <div className="col-span-full sm:col-span-2 md:max-w-xl lg:max-w-full">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-4 gap-2">
                        Any Format. Any Screen. Instantly <MonitorPlay className="size-4" />
                    </div>

                    <h2 className="text-4xl xl:text-[48px] font-bold mb-4 tracking-tight">
                        Lighting-Fast Video Encoding at Scale.
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
                        Transform terabytes of raw video into optimized streams. Enterprise-grade reliability, simple APIs, and unbeatable per-minute pricing.
                    </p>
                    <Show when="signed-out">
                        <SignInButton mode="modal" forceRedirectUrl="/dashboard" signUpForceRedirectUrl='/dashboard'>
                            <Button className="rounded-full h-12 flex items-center gap-2 font-semibold text-base cursor-pointer">
                                Start Transcoding
                                <MoveRight className="size-4" />
                            </Button>
                        </SignInButton>
                    </Show>
                    <Show when="signed-in">
                        <Link href="/dashboard">
                            <Button className="rounded-full h-12 flex items-center gap-2 font-semibold text-base">
                                Start Transcoding
                                <MoveRight className="size-4" />
                            </Button>
                        </Link>
                    </Show>
                </div>
                <div className="hidden sm:flex col-span-1 justify-end">
                    <HeroSectionillus />
                </div>
            </div>
        </section>
    )
}
