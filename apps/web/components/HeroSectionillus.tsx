"use client";

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

export default function HeroSectionillus() {
    const { resolvedTheme } = useTheme();
    const ill = resolvedTheme == "dark" ? "/hero-section-dark.gif" : "/hero-section-light.gif";

    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <Image alt="icon" src={ill} className="size-52 md:size-60 lg:size-80" width={100} height={100} unoptimized />
    )
}
