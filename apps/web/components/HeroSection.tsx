import { MonitorPlay, MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import HeroSectionillus from "./HeroSectionillus";

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
                    <Button className="cursor-pointer rounded-full text-base font-semibold flex gap-2 h-12 justify-center">
                        Start Transcoding<MoveRight className="size-4" />
                    </Button>

                </div>
                <div className="hidden sm:flex col-span-1 justify-end">
                    <HeroSectionillus />
                </div>
            </div>
        </section>
    )
}
