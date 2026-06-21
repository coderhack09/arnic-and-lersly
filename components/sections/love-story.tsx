"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StorySection } from '@/components/StorySection';
import { Cinzel } from "next/font/google";
import { siteConfig } from '@/content/site';
import { MapPin } from 'lucide-react';

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const serif = '"Playfair Display", "Georgia", serif';

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
      className={`inline-flex flex-col items-center justify-center ${dim} rounded-full border-[2.5px] opacity-50`}
      style={{
        transform: `rotate(${rotation}deg)`,
        borderColor: 'rgba(188, 155, 97, 0.35)',
      }}
    >
      <div
        className={`border-[1.5px] rounded-full ${inner} flex flex-col items-center justify-center gap-0.5 px-2`}
        style={{ borderColor: 'rgba(188, 155, 97, 0.28)' }}
      >
        <span
          className={`${cinzel.className} ${txt} tracking-[0.18em] uppercase text-center leading-tight`}
          style={{ color: 'var(--passport-gold-muted)' }}
        >
          {line1}
        </span>
        {line2 && <div className="w-4/5 h-px my-0.5" style={{ backgroundColor: 'rgba(188, 155, 97, 0.22)' }} />}
        {line2 && (
          <span
            className={`${cinzel.className} ${txt} tracking-[0.12em] uppercase text-center leading-tight`}
            style={{ color: 'var(--passport-gold)' }}
          >
            {line2}
          </span>
        )}
        {line3 && (
          <span
            className={`${cinzel.className} text-[5px] sm:text-[6px] tracking-[0.1em] uppercase text-center`}
            style={{ color: 'rgba(188, 155, 97, 0.55)' }}
          >
            {line3}
          </span>
        )}
      </div>
    </div>
  )
}

/* ─── Passport cover atmosphere (matches LoadingScreen) ───────── */
const PassportCoverBackground: React.FC = () => (
  <>
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: [
          'radial-gradient(ellipse at 28% 12%, rgba(46, 55, 72, 0.22) 0%, transparent 52%)',
          'radial-gradient(ellipse at 72% 88%, rgba(0, 0, 0, 0.32) 0%, transparent 54%)',
          'linear-gradient(180deg, rgba(9, 25, 48, 0.4) 0%, transparent 42%, rgba(0, 0, 0, 0.22) 100%)',
        ].join(', '),
      }}
    />
    <div className="passport-noise absolute inset-0 pointer-events-none z-[1]" aria-hidden />
    <div className="passport-vignette absolute inset-0 pointer-events-none z-[1] opacity-55" aria-hidden />
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0 passport-map-fill opacity-[0.38]"
        style={{
          WebkitMaskImage: 'url(/decoration/background_map.png)',
          maskImage: 'url(/decoration/background_map.png)',
          WebkitMaskSize: 'cover',
          maskSize: 'cover',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
        aria-hidden
      />
    </div>
  </>
)

/* ─── Passport Booklet Header ─────────────────────────────────── */
const PassportBooklet = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const coupleNames = useMemo(
    () => `${siteConfig.couple.groomNickname} and ${siteConfig.couple.brideNickname}`,
    []
  );

  const formattedDate = useMemo(() => {
    const d = new Date(siteConfig.wedding.date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  }, []);

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
      className="bg-motif-cream flex flex-col items-center py-8 sm:py-12 md:py-16 px-4 relative z-20"
    >
      <div className="relative w-full max-w-[min(100%,28rem)] sm:max-w-md mx-auto">
        {/* Floating stamps */}
        <div
          className={`absolute -left-1 sm:-left-5 top-3 sm:top-5 z-20 pointer-events-none transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <PassportStamp line1="Est." line2="2024" line3="Love" rotation={-12} size="sm" />
        </div>
        <div
          className={`absolute -right-1 sm:-right-5 top-8 sm:top-12 z-20 pointer-events-none transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <PassportStamp line1="Forever" line2="Bound" rotation={14} size="sm" />
        </div>

        {/* Passport cover — styled like LoadingScreen */}
        <div
          className="relative overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(5,24,51,0.32)]"
          style={{ backgroundColor: 'var(--passport-navy)' }}
        >
          <PassportCoverBackground />

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-8 py-10 sm:py-14 md:py-16">
            {visible && (
              <>
                <p
                  className="passport-gold-text passport-gold-text-shimmer passport-enter uppercase"
                  data-text="WEDDING"
                  style={{
                    fontFamily: serif,
                    fontWeight: 400,
                    fontSize: 'clamp(0.48rem, 1.8vw, 0.62rem)',
                    letterSpacing: '0.62em',
                    marginBottom: '0.4rem',
                  }}
                >
                  Wedding
                </p>

                <h2
                  className="passport-gold-text passport-gold-text-shimmer passport-enter passport-enter-delay-1 uppercase"
                  data-text="PASSPORT"
                  style={{
                    fontFamily: serif,
                    fontWeight: 900,
                    fontSize: 'clamp(1.85rem, 8vw, 2.75rem)',
                    letterSpacing: '0.08em',
                    lineHeight: 0.95,
                    marginBottom: 'clamp(1.1rem, 4vw, 1.75rem)',
                  }}
                >
                  Passport
                </h2>

                <div
                  className="relative w-[min(72vw,320px)] aspect-[594/420] mb-[clamp(1rem, 3.5vw, 1.65rem)] passport-enter passport-enter-delay-2"
                  aria-hidden
                >
                  <Image
                    src="/decoration/compass_symbol_gold.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 72vw, 320px"
                  />
                </div>

                <p
                  className="passport-gold-text passport-enter passport-enter-delay-3 uppercase"
                  style={{
                    fontFamily: serif,
                    fontWeight: 400,
                    fontSize: 'clamp(0.42rem, 1.6vw, 0.54rem)',
                    letterSpacing: '0.48em',
                    marginBottom: 'clamp(0.6rem, 2vw, 0.95rem)',
                  }}
                >
                  To the Marriage of
                </p>

                <div
                  className="passport-enter passport-enter-delay-4 w-full max-w-[min(100%,20rem)] mx-auto"
                  style={{
                    marginBottom: 'clamp(0.75rem, 2.5vw, 1.15rem)',
                    paddingTop: 'clamp(0.5rem, 2vw, 0.85rem)',
                    paddingBottom: 'clamp(0.5rem, 2vw, 0.85rem)',
                    paddingLeft: 'clamp(0.75rem, 4vw, 1.5rem)',
                    paddingRight: 'clamp(0.75rem, 4vw, 1.5rem)',
                  }}
                >
                  <p
                    className="passport-gold-text passport-gold-text-shimmer"
                    data-text={coupleNames}
                    style={{
                      fontFamily: 'var(--font-serif), "Great Vibes", cursive',
                      fontSize: 'clamp(2rem, 7.5vw, 3.25rem)',
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {coupleNames}
                  </p>
                </div>

                <p
                  className="passport-gold-text passport-enter passport-enter-delay-5"
                  style={{
                    fontFamily: serif,
                    fontWeight: 400,
                    fontSize: 'clamp(0.72rem, 2.2vw, 0.88rem)',
                    letterSpacing: '0.22em',
                  }}
                >
                  {formattedDate}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {visible && (
        <div className="text-center mt-8 sm:mt-10 passport-enter passport-enter-delay-5">
          <div className="w-12 sm:w-16 h-px bg-motif-silver/50 mx-auto mb-4 sm:mb-5 opacity-60" />
          <h1
            className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.16em] sm:tracking-[0.2em] font-normal leading-tight text-motif-deep`}
          >
            Our Love Story
          </h1>
        </div>
      )}
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
        title="Where It All Began"
        imageSrc="/mobile-background/couple (3).jpeg"
        text={
          <>
            <p className="mb-4">
            Arnic and Lersly’s love story began on January 25, 2024, a day that was both meaningful and unforgettable—Arnic’s birthday. What started as a simple exchange of messages, “Hi, Ma’am” and “Happy Birthday, Sir,” soon became the spark that connected two hearts. Through daily conversations and shared moments online, their friendship gradually blossomed into something deeper.
            </p>
          </>
        }
      />

      {/* <TrailDivider milestone="2013" /> */}
      <TrailDivider />
      {/* SECTION 2 */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (2).jpeg"
        title="Love Across the Distance"
        text={
          <>
            <p>
            As time passed, Arnic and Lersly finally met in person and spent precious moments getting to know each other better. Their bond grew stronger with every conversation and every memory they created together. Although distance eventually separated them, their love remained steadfast. Through constant communication, trust, and unwavering commitment, they continued to nurture their relationship despite being miles apart.
            </p>
          </>
        }
      />

      {/* <TrailDivider milestone="2017" /> */}
      <TrailDivider />
      {/* SECTION 3 */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (4).jpeg"
        title='A New Journey Together'
        text={
          <>
            <p>
            While Arnic worked abroad as a seafarer, Lersly patiently waited for the day they would be together again. Months of longing only strengthened their love and reminded them of the future they dreamed of building. When Arnic finally returned home, they embraced the opportunity to turn their dreams into reality. United once more, they chose to begin a new chapter—building their little family together and preparing for a lifetime of love, partnership, and happiness. ❤️
            </p>
          </>
        }
      />

      <TrailDivider />

      {/* SECTION 4 */}
      {/* <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (4).webp"
        text={
          <>
            <p>
              Now, as they stand on the threshold of a new chapter, Arjay and Aileen choose to seal their story with a sacred vow. With hearts full of gratitude and faith, they step forward not just as partners, but as one—ready to build a life guided by love, hope, and God's grace.
            </p>
          </>
        }
      /> */}

      {/* <TrailDivider milestone="2026" /> */}

      {/* SECTION 5 */}
      {/* <StorySection
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
      /> */}
{/* 
      <TrailDivider milestone="Forever" /> */}

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
