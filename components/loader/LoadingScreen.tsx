'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

// ─── Plane trail (unique IDs so they don't clash with Hero's SVG) ─────────────
const PlaneTrail: React.FC = () => {
  const pathData =
    'M 500,50 C 400,100 200,50 250,200 C 300,350 450,300 400,400 C 350,500 150,350 150,450 C 150,550 300,600 350,700 C 400,800 500,850 600,900';
  const dur = 8;
  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
      <svg viewBox="0 0 600 1000" className="w-full h-full opacity-35" preserveAspectRatio="xMidYMid meet">
        <defs>
          <mask id="loadingTrailMask">
            <path d={pathData} fill="none" stroke="white" strokeWidth="8"
              strokeDasharray="3000" strokeDashoffset="3000">
              <animate attributeName="stroke-dashoffset" from="3000" to="0"
                dur={`${dur}s`} repeatCount="indefinite" calcMode="linear" />
            </path>
          </mask>
          <filter id="loadingPencil" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
        <path d={pathData} fill="none" style={{ stroke: 'var(--color-motif-cream)' }}
          strokeWidth="1.5" strokeDasharray="6,10" strokeLinecap="round"
          filter="url(#loadingPencil)" mask="url(#loadingTrailMask)" />
        <g>
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            style={{ fill: 'var(--color-motif-deep)' }}
            transform="scale(1.4) rotate(90, 10.5, 12) translate(-10.5, -12)"
          />
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto"
            path={pathData} calcMode="paced" />
        </g>
      </svg>
    </div>
  );
};


interface LoadingScreenProps {
  onComplete: () => void;
}

// Countdown boxes with color photos - numbers show days, hours, minutes
const COUNTDOWN_BOXES = [
  { src: '/frontboxes/box1.webp' },
  { src: '/frontboxes/box2.webp' },
  { src: '/frontboxes/box3.webp' },
];

const MAIN_BW_IMAGE = '/frontboxes/mobile.webp';
const DESKTOP_BW_IMAGE = '/frontboxes/desktop.webp';
const STAGGER_DELAY_MS = 4000; // Each image appears every 4 seconds
const BOX_TRANSITION_MS = 1200; // Slow, smooth transition
const TOTAL_DURATION_MS = COUNTDOWN_BOXES.length * STAGGER_DELAY_MS + 3000;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());

    // Live countdown: days, hours, minutes until wedding
  const countdown = useMemo(() => {
    const weddingDate = new Date(siteConfig.wedding.date);
    const diff = weddingDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  }, [now]);

  const countdownText = useMemo(() => {
    const { days } = countdown;
    if (days === 0) return 'TODAY IS THE DAY';
    if (days === 1) return 'ONE DAY TO GO';
    if (days >= 28 && days <= 31) return 'ONE MONTH TO GO';
    if (days >= 58 && days <= 62) return 'TWO MONTHS TO GO';
    if (days >= 88 && days <= 93) return 'THREE MONTHS TO GO';
    if (days >= 118 && days <= 123) return 'FOUR MONTHS TO GO';
    if (days >= 148 && days <= 153) return 'FIVE MONTHS TO GO';
    return `${days} DAYS TO GO`;
  }, [countdown.days]);

  // Wedding date derived from siteConfig.wedding.date
  const debutDateObj = new Date(siteConfig.wedding.date);
  const debutMonthName = debutDateObj
    .toLocaleString('default', { month: 'short' })
    .toUpperCase(); // e.g. "MAY"
  const debutDay = String(debutDateObj.getDate()).padStart(2, '0'); // e.g. "09"
  const debutYear = String(debutDateObj.getFullYear()); // e.g. "2026"

  const countdownNumbers = [debutMonthName, debutDay, debutYear]; // e.g. May, 09, 2026
  const countdownLabels = ['Month', 'Day', 'Year']; // should return Month, Day, Year

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    COUNTDOWN_BOXES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleBoxes((prev) => [...prev, i]), i * STAGGER_DELAY_MS)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgress(pct);
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`;
  const hashtag = '#NOMAYnatedForKenneth';
  const productionCredit = '';


//   Background	#F5EFE6
// --color-motif-deep:    #9C5A63; /* deeper rose */
// --color-motif-medium:  #D88C9A; /* muted pink */
// --color-motif-accent:  #F2B5B5; /* pastel pink */
// --color-motif-cream:   #FFF8F5; /* creamy white */
// --color-motif-soft:    #F9E4E4; /* soft background */
// --color-motif-silver:  #CFC7C7; /* refined gray */
  const palette = {
    deep: '--color-motif-deep',
    medium: '--color-motif-medium',
    accent: '--color-motif-accent',
    cream: '--color-motif-cream',
    soft: '--color-motif-soft',
    silver: '--color-motif-silver',
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        {/* Mobile background */}
        <Image
          src={MAIN_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center md:hidden"
          sizes="100vw"
          priority
        />
        {/* Desktop background (md and above) */}
        <Image
          src={DESKTOP_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center hidden md:block"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay for readability and warmth */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, var(--color-motif-deep)40 0%, transparent 25%, transparent 75%, var(--color-motif-deep)55 100%)`,
          }}
        />
      </div>

      {/* Plane trail — above background, below content */}
      <PlaneTrail />

      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Top: headline + hashtag + countdown (readable over photo, no container) */}
        <div className="flex flex-col items-center justify-center w-full pt-12 sm:pt-16 md:pt-24 px-4 sm:px-6 flex-shrink-0">
          <div className="w-full max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span
                className="hidden sm:block h-px w-12 flex-shrink-0"
                style={{ backgroundColor: 'var(--color-motif-cream)' }}
              />
              <p className="text-center">
                {/* Passport cover badge — claret leather with gold embossed text */}
                <span
                  className="inline-block uppercase px-10 sm:px-14 py-3 sm:py-4"
                  style={{
                    fontFamily: '"Playfair Display", "Georgia", serif',
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 4vw, 1.6rem)',
                    letterSpacing: '0.55em',
                    color: '#D4AF37',
                    /* layered radial gradients simulate the mottled leather texture of a passport cover */
                    background: [
                      'radial-gradient(ellipse at 18% 30%, rgba(255,255,255,0.07) 0%, transparent 55%)',
                      'radial-gradient(ellipse at 82% 70%, rgba(0,0,0,0.18) 0%, transparent 55%)',
                      'radial-gradient(ellipse at 50% 50%, rgba(158,42,77,0.35) 0%, transparent 70%)',
                      'var(--color-motif-deep)',
                    ].join(', '),
                    border: '1.5px solid var(--color-motif-cream)',
                    /* inner glow + outer depth */
                    boxShadow: [
                      'inset 0 1px 0 rgba(255,255,255,0.08)',
                      'inset 0 -1px 0 rgba(0,0,0,0.3)',
                      '0 4px 14px rgba(103,6,38,0.45)',
                    ].join(', '),
                    /* stamped-gold text shadow */
                    textShadow: '0 1px 0 rgba(0,0,0,0.5), 0 0 12px rgba(212, 42, 77, 0.35)',
                  }}
                >
                  PASSPORT
                </span>
              </p>
              <span
                className="hidden sm:block h-px w-12 flex-shrink-0"
                style={{ backgroundColor: 'var(--color-motif-accent)' }}
              />
            </div>

            {/* Hashtag — passport stamp style, gold on claret */}
            <p className="text-center mb-4 sm:mb-5">
              <span
                className="inline-block uppercase px-5 sm:px-7 py-1.5 sm:py-2"
                style={{
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  fontWeight: 700,
                  fontSize: 'clamp(0.6rem, 2vw, 0.78rem)',
                  letterSpacing: '0.3em',
                  color: '#D4AF37',
                  background: [
                    'radial-gradient(ellipse at 18% 30%, rgba(255,255,255,0.06) 0%, transparent 55%)',
                    'radial-gradient(ellipse at 82% 70%, rgba(0,0,0,0.18) 0%, transparent 55%)',
                    'var(--color-motif-deep)',
                  ].join(', '),
                  border: '1px solid #B8942A',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.25), 0 3px 10px rgba(103,6,38,0.4)',
                  textShadow: '0 1px 0 rgba(0,0,0,0.45), 0 0 10px rgba(212,175,55,0.3)',
                }}
              >
                {hashtag}
              </span>
            </p>

            {/* Countdown text — Playfair Display, cream with gold glow */}
            <h2 className="text-center">
              <span
                className="inline-block font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase leading-tight px-2"
                style={{
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  fontWeight: 700,
                  fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
                  color: 'var(--color-motif-deep)',
                  textShadow: '0 2px 14px rgba(0,0,0,0.6), 0 0 28px rgba(212,175,55,0.25)',
                }}
              >
                {countdownText}
              </span>
            </h2>
          </div>
        </div>

        {/* Spacer - lets B&W image dominate (upper 2/3) */}
        <div className="flex-1 min-h-[12vh]" />

        {/* Middle: Three color countdown boxes - staggered reveal */}
        <div className="flex items-stretch justify-center gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 py-4 flex-shrink-0">
          {COUNTDOWN_BOXES.map((item, i) => {
            const isVisible = visibleBoxes.includes(i);
            return (
              <div
                key={i}
                className="relative flex-1 max-w-[28vw] sm:max-w-[140px] md:max-w-[160px] aspect-[3/4] overflow-hidden rounded-3xl border border-white/40 bg-white/10 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(28px) scale(0.94)',
                  transition: `opacity ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <Image
                  src={item.src}
                  alt={coupleNames}
                  fill
                  className="object-cover scale-105"
                  sizes="(max-width: 640px) 28vw, 160px"
                />
                {/* Soft gradient overlay for readable number */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(145deg, ${palette.deep}66 0%, transparent 40%, ${palette.accent}aa 100%)`,
                  }}
                />

                {/* Date number + label — Playfair Display, gold passport feel */}
                <div className="absolute bottom-2 inset-x-0 sm:bottom-3 flex flex-col items-center px-1">
                  <span
                    className="select-none leading-none"
                    style={{
                      fontFamily: '"Playfair Display", "Georgia", serif',
                      fontWeight: 900,
                      fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
                      color: 'var(--color-motif-cream)',
                      textShadow: '0 2px 8px rgba(0,0,0,0.55), 0 0 16px rgba(212,175,55,0.4)',
                    }}
                  >
                    {countdownNumbers[i]}
                  </span>
                  <span
                    className="mt-1 uppercase"
                    style={{
                      fontFamily: '"Playfair Display", "Georgia", serif',
                      fontWeight: 700,
                      fontSize: 'clamp(0.45rem, 1.5vw, 0.6rem)',
                      letterSpacing: '0.25em',
                      color: 'rgba(255,246,248,0.9)',
                      textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {countdownLabels[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: Names + production credit + progress bar */}
        <div className="flex flex-col items-center justify-center w-full py-6 sm:py-8 px-4 flex-shrink-0">

          {/* "Almost ready for" — Playfair Display italic, gold-tinted cream */}
          <p
            className="text-center mb-1"
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(0.65rem, 2vw, 0.85rem)',
              letterSpacing: '0.2em',
              color: 'var(--color-motif-cream)',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }}
          >
            Almost ready for
          </p>

          {/* Couple names — Great Vibes script, large, cream */}
          <div
            className="text-center mb-2"
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 7vw, 3.5rem)',
              color: 'var(--color-motif-cream)',
              textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.2)',
            }}
          >
            {coupleNames}
          </div>

          {productionCredit && (
            <p
              className="text-[10px] sm:text-xs tracking-wider"
              style={{
                fontFamily: '"Playfair Display", "Georgia", serif',
                color: '#D4AF37',
                opacity: 0.7,
              }}
            >
              {productionCredit}
            </p>
          )}

          {/* Progress label — Playfair Display italic */}
          <p
            className="mt-5 mb-2 italic"
            style={{
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 400,
              fontSize: 'clamp(0.6rem, 1.8vw, 0.75rem)',
              letterSpacing: '0.2em',
              color: 'var(--color-motif-cream)',
              textShadow: '0 1px 6px rgba(0,0,0,0.55)',
            }}
          >
            Preparing your passport…
          </p>

          {/* Progress bar — gold fill on muted track */}
          <div className="w-full max-w-xs mx-auto">
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #9E2A4D, #9E2A4D, #9E2A4D)',
                  boxShadow: '0 0 8px rgba(212, 42, 77, 0.6)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};