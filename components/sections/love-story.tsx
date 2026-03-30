"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { StorySection } from '@/components/StorySection';
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from '@/content/site';
import { MapPin, Compass, Navigation } from 'lucide-react';

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Palette lives in globals.css → @theme inline → --color-motif-*
// Edit there once to update every component.

/* ─── Plane trail ────────────────────────────────────────────── */
const PlaneTrail: React.FC = () => {
  const pathData =
    'M 90,60 C 190,150 340,100 380,240 C 420,380 260,410 300,540 C 340,660 510,590 540,720 C 570,850 450,910 510,975'
  const dur = 10
  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-hidden">
      <svg viewBox="0 0 600 1000" className="w-full h-full opacity-45" preserveAspectRatio="xMidYMid meet">
        <defs>
          <mask id="loveTrailMask">
            <path d={pathData} fill="none" stroke="white" strokeWidth="8" strokeDasharray="3000" strokeDashoffset="3000">
              <animate attributeName="stroke-dashoffset" from="3000" to="0" dur={`${dur}s`} repeatCount="indefinite" calcMode="linear" />
            </path>
          </mask>
          <filter id="lovePencil" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
        <path d={pathData} fill="none" style={{ stroke: 'var(--color-motif-medium)' }} strokeWidth="1.5" strokeDasharray="6,10" strokeLinecap="round" filter="url(#lovePencil)" mask="url(#loveTrailMask)" />
        <g>
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" style={{ fill: 'var(--color-motif-deep)' }} transform="scale(1.4) rotate(90, 10.5, 12) translate(-10.5, -12)" />
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto" path={pathData} calcMode="paced" />
        </g>
      </svg>
    </div>
  )
}

const AirplaneSilhouette: React.FC<{ className?: string; style?: React.CSSProperties; size?: number }> = ({ className = '', style = {}, size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`absolute pointer-events-none select-none ${className}`} style={style} aria-hidden>
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="var(--color-motif-medium)" />
  </svg>
)

/* ─── Trail Divider ──────────────────────────────────────────── */
const TrailDivider = ({ milestone }: { milestone?: string }) => (
  <div className="bg-motif-cream flex flex-col items-center py-1 relative z-20 select-none">
    <div className="h-6 sm:h-10 w-px border-l-2 border-dashed border-motif-silver/60" />
    <div className="flex flex-col items-center gap-1">
      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-motif-deep/30 flex items-center justify-center bg-motif-cream shadow-sm">
        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-motif-deep/60" strokeWidth={1.5} />
      </div>
      {milestone && (
        <span className={`${cinzel.className} text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-motif-medium/70 text-center mt-0.5`}>
          {milestone}
        </span>
      )}
    </div>
    <div className="h-6 sm:h-10 w-px border-l-2 border-dashed border-motif-silver/60" />
  </div>
)

/* ─── Passport Stamp ─────────────────────────────────────────── */
const PassportStamp = ({
  line1, line2, line3, rotation = 0, size = "md",
}: {
  line1: string; line2?: string; line3?: string;
  rotation?: number; size?: "sm" | "md" | "lg";
}) => {
  const dim =
    size === "lg" ? "w-28 h-28 sm:w-36 sm:h-36" :
    size === "sm" ? "w-16 h-16 sm:w-20 sm:h-20" :
                    "w-20 h-20 sm:w-28 sm:h-28";
  const inner =
    size === "lg" ? "w-[82%] h-[82%]" :
    size === "sm" ? "w-[78%] h-[78%]" :
                    "w-[80%] h-[80%]";
  const txt =
    size === "lg" ? "text-[8px] sm:text-[10px]" :
    size === "sm" ? "text-[6px] sm:text-[7px]" :
                    "text-[7px] sm:text-[8px]";
  return (
    <div
      className={`inline-flex flex-col items-center justify-center ${dim} rounded-full border-[2.5px] border-motif-deep/25 opacity-55`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className={`border-[1.5px] border-motif-deep/25 rounded-full ${inner} flex flex-col items-center justify-center gap-0.5 px-2`}>
        <span className={`${cinzel.className} ${txt} tracking-[0.18em] uppercase text-motif-deep/60 text-center leading-tight`}>{line1}</span>
        {line2 && <div className="w-4/5 h-px bg-motif-deep/20 my-0.5" />}
        {line2 && <span className={`${cinzel.className} ${txt} tracking-[0.12em] uppercase text-motif-deep/50 text-center leading-tight`}>{line2}</span>}
        {line3 && <span className={`${cinzel.className} text-[5px] sm:text-[6px] tracking-[0.1em] uppercase text-motif-deep/40 text-center`}>{line3}</span>}
      </div>
    </div>
  )
}

/* ─── Passport Booklet Header ─────────────────────────────────── */
const PassportBooklet = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-motif-cream flex flex-col items-center py-8 sm:py-12 px-4 relative z-20 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Passport cover card */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
        {/* Floating stamps */}
        <div className="absolute -left-2 sm:-left-6 top-2 sm:top-4 z-10 pointer-events-none">
          <PassportStamp line1="Est." line2="2013" line3="12 years" rotation={-12} size="sm" />
        </div>
        <div className="absolute -right-2 sm:-right-6 top-6 sm:top-10 z-10 pointer-events-none">
          <PassportStamp line1="Promise" line2="Made" line3="2017" rotation={14} size="sm" />
        </div>

        {/* Card body */}
        <div className="bg-motif-deep rounded-sm px-6 sm:px-10 py-7 sm:py-10 flex flex-col items-center gap-3 sm:gap-4 shadow-xl">
          <p className={`${cinzel.className} text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-motif-cream/50 text-center`}>
            Republic of Love
          </p>
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-motif-cream/20 flex items-center justify-center">
            <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-motif-cream/60" strokeWidth={1} />
          </div>
          <h2 className={`${cinzel.className} text-lg sm:text-2xl md:text-3xl tracking-[0.1em] uppercase text-motif-cream/90 text-center leading-snug`}>
            {siteConfig.couple.bride} &amp; {siteConfig.couple.groom}
          </h2>
          <div className="w-12 sm:w-16 h-px bg-motif-cream/20" />
          <p className={`${cormorant.className} text-xs sm:text-sm tracking-[0.2em] uppercase text-motif-cream/50 text-center`}>
            Passport to Forever
          </p>
          {/* Barcode-style decoration */}
          <div className="flex gap-px mt-1">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="bg-motif-cream/20"
                style={{ width: i % 4 === 0 ? 3 : 1, height: i % 7 === 0 ? 18 : i % 3 === 0 ? 14 : 10 }}
              />
            ))}
          </div>
          <p className={`${cormorant.className} text-[8px] sm:text-[9px] tracking-[0.15em] text-motif-cream/30 uppercase`}>
            {siteConfig.wedding.date}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Map Destination Section ─────────────────────────────────── */
const MapDestination = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-motif-cream py-10 sm:py-14 md:py-20 px-4 flex flex-col items-center gap-6 sm:gap-8 relative z-20 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >

      {/* Bottom passport stamps row */}
      {/* <div className="flex items-center gap-4 sm:gap-6 mt-2 opacity-60">
        <PassportStamp line1="Batangas" line2="Philippines" line3="May 2026" rotation={-8} size="sm" />
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8 bg-motif-silver/40" />
          <Compass className="w-4 h-4 text-motif-deep/30" strokeWidth={1} />
          <div className="w-px h-8 bg-motif-silver/40" />
        </div>
        <PassportStamp line1="Entry" line2={siteConfig.wedding.date} rotation={6} size="sm" />
      </div> */}
    </div>
  )
}

export function LoveStory() {
  return (
    <div className="relative min-h-screen bg-motif-cream overflow-x-hidden">

      {/* Airplane silhouette background decorations */}
      <AirplaneSilhouette size={200} className="opacity-[0.10]" style={{ top: '3%', left: '2%', transform: 'rotate(-20deg)' }} />
      <AirplaneSilhouette size={130} className="opacity-[0.08]" style={{ top: '15%', right: '3%', transform: 'rotate(30deg)' }} />
      <AirplaneSilhouette size={110} className="opacity-[0.09]" style={{ top: '38%', left: '1%', transform: 'rotate(15deg)' }} />
      <AirplaneSilhouette size={160} className="opacity-[0.10]" style={{ bottom: '28%', right: '2%', transform: 'rotate(-35deg)' }} />
      <AirplaneSilhouette size={90}  className="opacity-[0.07]" style={{ bottom: '8%', left: '10%', transform: 'rotate(50deg)' }} />
      <AirplaneSilhouette size={120} className="opacity-[0.08]" style={{ top: '58%', right: '11%', transform: 'rotate(-10deg)' }} />

      {/* Plane trail animation */}
      <PlaneTrail />

      {/* <div className="text-center text-motif-medium z-0 relative px-4">
        <div className="w-12 sm:w-16 h-[1px] bg-motif-silver mx-auto mb-4 sm:mb-6 opacity-60"></div>
        <h1 className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-[0.14em] sm:tracking-[0.18em] font-normal leading-tight text-motif-deep mt-8`}>
          Our Love Story
        </h1>
      </div> */}

      {/* Passport booklet intro */}
      <PassportBooklet />

      {/* SECTION 1 */}
      <StorySection
        theme="light"
        layout="image-left"
        isFirst={true}
        title="Twelve Years in Love, Eight Years in Promise, A Lifetime in Faith"
        imageSrc="/mobile-background/couple (1).webp"
        text={
          <>
            <p className="mb-4">
              For twelve beautiful years, Aileen and Arjay have shared a love that grew from simple beginnings into something deeply rooted and enduring. Through laughter, challenges, distance, and dreams, their story has been a testament to patience, understanding, and the quiet strength of choosing each other every single day.
            </p>
          </>
        }
      />

      <TrailDivider milestone="2013" />

      {/* SECTION 2 */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (2).webp"
        text={
          <>
            <p>
              Eight years ago, they made a promise—not just of a future together, but of commitment, growth, and unwavering support. That promise carried them through life's uncertainties, shaping a bond that is not only romantic, but also grounded in friendship and trust. It is a love that has been tested, refined, and made stronger with time.
            </p>
          </>
        }
      />

      <TrailDivider milestone="2017" />

      {/* SECTION 3 */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (3).webp"
        text={
          <>
            <p>
              Their journey has never been perfect, but it has always been real. In every moment of doubt, they found clarity in each other. In every hardship, they discovered resilience together. And in every joy, they celebrated not just the moment—but the blessing of having one another.
            </p>
          </>
        }
      />

      <TrailDivider />

      {/* SECTION 4 */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (4).webp"
        text={
          <>
            <p>
              Now, as they stand on the threshold of a new chapter, Aileen and Arjay choose to seal their story with a sacred vow. With hearts full of gratitude and faith, they step forward not just as partners, but as one—ready to build a life guided by love, hope, and God's grace.
            </p>
          </>
        }
      />

      <TrailDivider milestone="2026" />

      {/* SECTION 5 */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (5).webp"
        text={
          <>
            <p>
              With this, they warmly invite you to witness and celebrate the beginning of their forever—a lifetime in faith, where love continues to grow, promises are fulfilled, and two souls become one.
            </p>
          </>
        }
      />

      <TrailDivider milestone="Forever" />

      {/* Map & destination section */}
      {/* <MapDestination /> */}

      {/* Footer Decoration */}
      <div className="bg-motif-cream pt-4 sm:pt-6 pb-16 sm:pb-20 md:pb-24 text-center text-motif-deep z-0 relative px-4">
        <div className="w-12 sm:w-16 h-[1px] bg-motif-silver mx-auto mb-4 sm:mb-6 opacity-60"></div>
        <Link
          href="#guest-list"
          className={`${cinzel.className} group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-[0.7rem] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-normal text-motif-cream bg-motif-deep rounded-sm border border-motif-deep transition-all duration-300 hover:bg-motif-accent hover:border-motif-accent hover:text-motif-cream hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-motif-soft/50 focus-visible:ring-offset-2 focus-visible:ring-offset-motif-cream`}
        >
          <span className="relative z-10">Join us</span>
          <div className="absolute inset-0 rounded-sm bg-motif-soft opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-300 -z-0"></div>
        </Link>
      </div>

    </div>
  );
}
