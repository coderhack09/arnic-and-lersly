import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

// Motif palette — globals.css
//   deep:   #670626  Claret
//   medium: #9E2A4D  softened claret
//   accent: #E75480  vibrant pink
//   cream:  #FFF4F7  near-white
//   soft:   #F4C9D6  Peony

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

const desktopImages: string[] = [
  '/desktop-background/couple (1).webp',
  '/desktop-background/couple (2).webp',
  '/desktop-background/couple (3).webp',
  '/desktop-background/couple (4).webp',
  '/desktop-background/couple (5).webp',
];

const mobileImages: string[] = [
  '/mobile-background/couple (1).webp',
  '/mobile-background/couple (2).webp',
  '/mobile-background/couple (3).webp',
  '/mobile-background/couple (4).webp',
  '/mobile-background/couple (5).webp',
];

// ─── Plane trail ──────────────────────────────────────────────────────────────
const PlaneTrail: React.FC = () => {
  const pathData =
    'M 500,50 C 400,100 200,50 250,200 C 300,350 450,300 400,400 C 350,500 150,350 150,450 C 150,550 300,600 350,700 C 400,800 500,850 600,900';
  const dur = 8;
  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
      <svg viewBox="0 0 600 1000" className="w-full h-full opacity-40" preserveAspectRatio="xMidYMid meet">
        <defs>
          <mask id="heroTrailMask">
            <path d={pathData} fill="none" stroke="white" strokeWidth="8"
              strokeDasharray="3000" strokeDashoffset="3000">
              <animate attributeName="stroke-dashoffset" from="3000" to="0"
                dur={`${dur}s`} repeatCount="indefinite" calcMode="linear" />
            </path>
          </mask>
          <filter id="heroPencil" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
        <path d={pathData} fill="none" style={{ stroke: 'var(--color-motif-medium)' }}
          strokeWidth="1.5" strokeDasharray="6,10" strokeLinecap="round"
          filter="url(#heroPencil)" mask="url(#heroTrailMask)" />
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

// ─── Passport data field ──────────────────────────────────────────────────────
const Field: React.FC<{ label: string; value: string; wide?: boolean; size?: 'sm' | 'md' }> =
  ({ label, value, wide, size = 'sm' }) => (
    <div className={`flex flex-col ${wide ? 'col-span-2' : ''}`}>
      <span style={{
        fontFamily: '"Playfair Display", "Georgia", serif',
        fontSize: size === 'md' ? '0.6rem' : '0.45rem',
        letterSpacing: '0.18em',
        color: 'var(--color-motif-medium)',
        fontWeight: 700,
        textTransform: 'uppercase',
      }}>{label}</span>
      <span style={{
        fontFamily: '"Playfair Display", "Georgia", serif',
        fontSize: size === 'md' ? '0.82rem' : '0.62rem',
        letterSpacing: '0.06em',
        color: 'var(--color-motif-deep)',
        fontWeight: 700,
        borderBottom: '0.5px solid var(--color-motif-soft)',
        paddingBottom: '2px',
        marginTop: '2px',
      }}>{value}</span>
    </div>
  );

// ─── Decorative divider ───────────────────────────────────────────────────────
const DashedRule: React.FC<{ ornament?: 'circle' | 'star' }> = ({ ornament = 'circle' }) => (
  <div className="flex items-center gap-2 w-full">
    <div className="flex-1 border-t border-dashed" style={{ borderColor: 'var(--color-motif-soft)' }} />
    {ornament === 'circle' ? (
      <svg width="10" height="10" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="1.8" style={{ fill: 'var(--color-motif-soft)' }} />
        <circle cx="5" cy="5" r="4" style={{ stroke: 'var(--color-motif-soft)' }} strokeWidth="0.6" fill="none" />
      </svg>
    ) : (
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path d="M5 0.5 L6 3.5 L9.5 3.5 L6.8 5.5 L7.8 9 L5 7 L2.2 9 L3.2 5.5 L0.5 3.5 L4 3.5 Z"
          style={{ fill: 'var(--color-motif-accent)' }} />
      </svg>
    )}
    <div className="flex-1 border-t border-dashed" style={{ borderColor: 'var(--color-motif-soft)' }} />
  </div>
);

// ─── Open Invitation button ───────────────────────────────────────────────────
const OpenButton: React.FC<{ onClick: () => void; large?: boolean }> = ({ onClick, large }) => (
  <button
    onClick={onClick}
    className="group relative overflow-hidden rounded-sm border-2 transition-all duration-500 ease-out shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
    style={{
      borderColor: 'var(--color-motif-deep)',
      background: [
        'radial-gradient(ellipse at 18% 30%, rgba(255,255,255,0.07) 0%, transparent 55%)',
        'radial-gradient(ellipse at 82% 70%, rgba(0,0,0,0.15) 0%, transparent 55%)',
        'var(--color-motif-deep)',
      ].join(', '),
      color: '#D4AF37',
      padding: large ? '12px 48px' : 'clamp(8px,2vw,12px) clamp(28px,8vw,44px)',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-motif-medium)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-motif-deep)'; }}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
    <span className="relative flex items-center gap-2" style={{
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 700,
      fontSize: large ? '0.82rem' : 'clamp(0.6rem,1.8vw,0.78rem)',
      letterSpacing: '0.4em',
      textTransform: 'uppercase',
      textShadow: '0 1px 0 rgba(0,0,0,0.4), 0 0 10px rgba(212,175,55,0.3)',
    }}>
      <svg
        className={`${large ? 'w-4 h-4' : 'w-3 h-3 sm:w-3.5 sm:h-3.5'} -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300`}
        viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
      Open Invitation
    </span>
  </button>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => setIndex((p) => (p + 1) % 5), 5500);
    return () => clearInterval(timer);
  }, [mounted]);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setContentVisible(true), 300);
      return () => clearTimeout(t);
    } else {
      setContentVisible(false);
    }
  }, [visible]);

  const images = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);

  const mrz1 = `P<PHLBENITEZ<<ARJAY<<<<<<<<<<<<<<<<<<<<<<<`;
  const mrz2 = `052026<PHL2605080${siteConfig.couple.groom[0]}${siteConfig.couple.bride[0]}2605080<<<<<<<<<<<<<`;

  const fadeIn = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;

  return (
    <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
      visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
    }`}>

      {/* ── Background carousel ── */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <div key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: i === index ? 'scale(1)' : 'scale(1.05)', transition: 'opacity 1s ease-in-out, transform 1s ease-in-out' }}
          >
            <Image src={src} alt="Couple" fill quality={90} priority={i === 0} className="object-cover" sizes="100vw" />
          </div>
        ))}
        <div className="absolute inset-0 pointer-events-none opacity-[0.80]"
          style={{ backgroundColor: 'var(--color-motif-cream)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 35%, color-mix(in srgb, var(--color-motif-deep) 18%, transparent) 100%)' }} />
      </div>

      {/* ── Plane trail ── */}
      <PlaneTrail />

      {/* ══════════════════════════════════════════════════════
          MOBILE layout  (hidden on md+)
      ══════════════════════════════════════════════════════ */}
      <div className={`md:hidden relative z-20 flex flex-col h-full w-full max-w-sm mx-auto px-4 py-4 transition-all duration-700 ease-out ${
        contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
      }`}>
        <div className="relative flex flex-col h-full gap-1.5 px-4 py-4">

          {/* Header */}
          <div className={`flex flex-col items-center ${fadeIn('delay-100')}`}>
            <div className="flex items-center gap-2 w-full justify-between mb-1">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src={siteConfig.couple.monogram} alt="Monogram" fill className="object-contain" priority
                  style={{ filter: 'brightness(0) saturate(100%) invert(12%) sepia(80%) saturate(900%) hue-rotate(300deg) opacity(0.85)' }} />
              </div>
              <div className="flex flex-col items-center flex-1">
                <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.42rem', letterSpacing: '0.22em', color: 'var(--color-motif-medium)', textTransform: 'uppercase' }}>Republic of the Philippines</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-motif-soft)' }} />
                  <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.35em', color: 'var(--color-motif-deep)', textTransform: 'uppercase' }}>Passport</span>
                  <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-motif-soft)' }} />
                </div>
                <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 400, fontStyle: 'italic', fontSize: '0.4rem', letterSpacing: '0.15em', color: 'var(--color-motif-medium)' }}>To the Wedding of</span>
              </div>
              <div className="flex-shrink-0 -rotate-12 opacity-75">
                <div className="border rounded-full flex flex-col items-center justify-center w-10 h-10"
                  style={{ borderColor: 'var(--color-motif-medium)', borderWidth: '1.5px', color: 'var(--color-motif-medium)' }}>
                  <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.35rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Est.</span>
                  <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 900, fontSize: '0.65rem', lineHeight: 1 }}>2026</span>
                  <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.28rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>PHL</span>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 border-t" style={{ borderColor: 'var(--color-motif-soft)' }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-motif-medium)' }} />
              <div className="flex-1 border-t" style={{ borderColor: 'var(--color-motif-soft)' }} />
            </div>
          </div>

          {/* TYPE / CODE / NO */}
          <div className={`grid grid-cols-3 gap-x-2 ${fadeIn('delay-200')}`}>
            <Field label="Type" value="P" />
            <Field label="Code" value="PHL" />
            <Field label="No." value="052026" />
          </div>

          {/* Names */}
          <div className={`flex flex-col items-center my-auto ${fadeIn('delay-300')}`}>
            <DashedRule ornament="circle" />
            <div className="flex flex-col items-center w-full gap-0 leading-none mt-2">
              <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(3.5rem,15vw,5.5rem)', color: 'var(--color-motif-deep)', textShadow: '0 2px 12px rgba(103,6,38,0.2)', lineHeight: 1.05 }}>
                {siteConfig.couple.groomNickname}
              </span>
              <div className="flex items-center gap-2 w-full my-0.5">
                <div className="flex-1 border-t border-dashed" style={{ borderColor: 'var(--color-motif-soft)' }} />
                <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--color-motif-accent)', textTransform: 'uppercase' }}>&amp;</span>
                <div className="flex-1 border-t border-dashed" style={{ borderColor: 'var(--color-motif-soft)' }} />
              </div>
              <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(3.5rem,15vw,5.5rem)', color: 'var(--color-motif-deep)', textShadow: '0 2px 12px rgba(103,6,38,0.2)', lineHeight: 1.05 }}>
                {siteConfig.couple.brideNickname}
              </span>
            </div>
            <div className="mt-2 w-full"><DashedRule ornament="star" /></div>
          </div>

          {/* Data fields */}
          <div className={`grid grid-cols-2 gap-x-3 gap-y-1.5 ${fadeIn('delay-[400ms]')}`}>
            <Field label="Nationality" value="Filipino" />
            <Field label="Date of Issue" value={siteConfig.wedding.date} />
            <Field label="Date & Time" value={`${siteConfig.wedding.date} · ${siteConfig.wedding.time}`} wide />
            <Field label="Place of Ceremony" value={siteConfig.ceremony.location} wide />
            <Field label="Reception Venue" value={siteConfig.reception.location} wide />
          </div>

          {/* Boarding row */}
          <div className={`flex justify-between items-center ${fadeIn('delay-500')}`}>
            {[['Flight', 'AA-052026'], ['Gate', 'Forever'], ['Seat', 'Reserved']].map(([lbl, val], i) => (
              <div key={i} className={`flex flex-col ${i === 1 ? 'items-center' : i === 2 ? 'items-end' : ''}`}>
                <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.38rem', letterSpacing: '0.18em', color: 'var(--color-motif-medium)', textTransform: 'uppercase' }}>{lbl}</span>
                <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.6rem', color: 'var(--color-motif-deep)' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* MRZ */}
          <div className={`${fadeIn('delay-600')}`}>
            <div className="w-full border-t mb-1" style={{ borderColor: 'var(--color-motif-soft)' }} />
            {[mrz1, mrz2].map((line, i) => (
              <p key={i} style={{ fontFamily: '"Courier New", monospace', fontSize: 'clamp(0.35rem,1vw,0.48rem)', letterSpacing: '0.06em', color: 'var(--color-motif-deep)', opacity: 0.5, whiteSpace: 'nowrap', overflow: 'hidden' }}>{line}</p>
            ))}
          </div>

          {/* Button */}
          <div className={`flex flex-col items-center gap-1.5 ${fadeIn('delay-700')}`}>
            <p style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 400, fontStyle: 'italic', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--color-motif-medium)' }}>
              Please present this pass at the door
            </p>
            <OpenButton onClick={onOpen} />
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DESKTOP layout — open passport book spread
      ══════════════════════════════════════════════════════ */}
      <div className={`hidden md:flex relative z-20 w-full max-w-5xl xl:max-w-6xl mx-auto h-[88vh] max-h-[820px] transition-all duration-700 ease-out shadow-2xl ${
        contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
      }`}
        style={{
          background: 'color-mix(in srgb, var(--color-motif-cream) 92%, transparent)',
          backdropFilter: 'blur(2px)',
          border: '1px solid var(--color-motif-soft)',
        }}
      >

        {/* ── LEFT PAGE — names showcase ── */}
        <div className="flex-1 flex flex-col items-center justify-between px-10 xl:px-14 py-8 xl:py-10 overflow-hidden"
          style={{ borderRight: '1px solid var(--color-motif-soft)' }}>

          {/* Top: monogram + country */}
          <div className={`flex flex-col items-center w-full gap-2 ${fadeIn('delay-100')}`}>
            <div className="relative w-16 h-16 xl:w-20 xl:h-20">
              <Image src={siteConfig.couple.monogram} alt="Monogram" fill className="object-contain" priority
                style={{ filter: 'brightness(0) saturate(100%) invert(12%) sepia(80%) saturate(900%) hue-rotate(300deg) opacity(0.85)' }} />
            </div>
            <div className="flex flex-col items-center">
              <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--color-motif-medium)', textTransform: 'uppercase' }}>Republic of the Philippines</span>
              <div className="flex items-center gap-2 mt-1 w-full">
                <div className="flex-1 border-t" style={{ borderColor: 'var(--color-motif-soft)' }} />
                <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.4em', color: 'var(--color-motif-deep)', textTransform: 'uppercase' }}>Passport</span>
                <div className="flex-1 border-t" style={{ borderColor: 'var(--color-motif-soft)' }} />
              </div>
              <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 400, fontStyle: 'italic', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--color-motif-medium)' }}>To the Wedding of</span>
            </div>
          </div>

          {/* Center: HUGE names */}
          <div className={`flex flex-col items-center w-full flex-1 justify-center ${fadeIn('delay-200')}`}>
            <DashedRule ornament="circle" />
            <div className="flex flex-col items-center w-full my-3 xl:my-4 leading-none">
              <span style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(4.5rem, 8vw, 7rem)', color: 'var(--color-motif-deep)', textShadow: '0 3px 16px rgba(103,6,38,0.18)', lineHeight: 1 }}>
                {siteConfig.couple.groomNickname}
              </span>
              <div className="flex items-center gap-3 w-full my-2">
                <div className="flex-1 border-t border-dashed" style={{ borderColor: 'var(--color-motif-soft)' }} />
                <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.35em', color: 'var(--color-motif-accent)', textTransform: 'uppercase' }}>&amp;</span>
                <div className="flex-1 border-t border-dashed" style={{ borderColor: 'var(--color-motif-soft)' }} />
              </div>
              <span style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(4.5rem, 8vw, 7rem)', color: 'var(--color-motif-deep)', textShadow: '0 3px 16px rgba(103,6,38,0.18)', lineHeight: 1 }}>
                {siteConfig.couple.brideNickname}
              </span>
            </div>
            <DashedRule ornament="star" />
          </div>

          {/* Bottom: date + location + stamp */}
          <div className={`flex flex-col items-center w-full gap-2 ${fadeIn('delay-300')}`}>
            {/* Date strip */}
            <div className="border-y-2 border-dashed py-2 px-8 w-full text-center"
              style={{ borderColor: 'var(--color-motif-soft)' }}>
              <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.25em', color: 'var(--color-motif-deep)', textTransform: 'uppercase' }}>
                {siteConfig.wedding.date}
              </span>
            </div>
            <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 400, fontSize: '0.7rem', letterSpacing: '0.18em', color: 'var(--color-motif-medium)', textTransform: 'uppercase', textAlign: 'center' }}>
              {siteConfig.ceremony.location}
            </span>

            {/* Decorative stamp row */}
            <div className="flex items-center justify-between w-full mt-1">
              <div className="-rotate-12 opacity-60">
                <div className="border-2 rounded-full flex flex-col items-center justify-center w-14 h-14"
                  style={{ borderColor: 'var(--color-motif-medium)', color: 'var(--color-motif-medium)' }}>
                  <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.4rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Est.</span>
                  <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 900, fontSize: '0.85rem', lineHeight: 1 }}>2026</span>
                  <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.35rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>PHL</span>
                </div>
              </div>
              <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 400, fontStyle: 'italic', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-motif-medium)' }}>
                Please present this pass at the door
              </span>
              <div className="rotate-12 opacity-60">
                <div className="border-2 rounded-full flex flex-col items-center justify-center w-14 h-14"
                  style={{ borderColor: 'var(--color-motif-accent)', color: 'var(--color-motif-accent)' }}>
                  <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.35rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Gate</span>
                  <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 900, fontSize: '0.55rem', lineHeight: 1, textAlign: 'center' }}>Forever</span>
                  <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.3rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>AA-052026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SPINE shadow ── */}
        <div className="w-3 flex-shrink-0"
          style={{ background: 'linear-gradient(to right, rgba(103,6,38,0.08), rgba(103,6,38,0.14), rgba(103,6,38,0.08))' }} />

        {/* ── RIGHT PAGE — data + button ── */}
        <div className="flex-1 flex flex-col justify-between px-10 xl:px-14 py-8 xl:py-10 overflow-hidden">

          {/* Header */}
          <div className={`flex flex-col gap-3 ${fadeIn('delay-150')}`}>
            {/* TYPE / CODE / NO */}
            <div className="grid grid-cols-3 gap-4 pb-2" style={{ borderBottom: '1px solid var(--color-motif-soft)' }}>
              <Field label="Type" value="P" size="md" />
              <Field label="Code" value="PHL" size="md" />
              <Field label="No." value="052026" size="md" />
            </div>

            {/* Data fields grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Field label="Groom Name" value={siteConfig.couple.groom.toUpperCase()} size="md" />
              <Field label="Bride Name" value={siteConfig.couple.bride.toUpperCase()} size="md" />
              <Field label="Nationality" value="Filipino" size="md" />
              <Field label="Date of Issue" value={siteConfig.wedding.date} size="md" />
              <Field label="Date & Time" value={`${siteConfig.wedding.date} · ${siteConfig.wedding.time}`} wide size="md" />
              <Field label="Place of Ceremony" value={siteConfig.ceremony.location} wide size="md" />
              <Field label="Reception Venue" value={siteConfig.reception.location} wide size="md" />
            </div>
          </div>

          {/* Boarding pass row */}
          <div className={`flex justify-between items-end pt-3 ${fadeIn('delay-[350ms]')}`}
            style={{ borderTop: '1px solid var(--color-motif-soft)' }}>
            {[['Flight', 'AA-052026'], ['Gate', 'Forever'], ['Seat', 'Reserved']].map(([lbl, val], i) => (
              <div key={i} className={`flex flex-col ${i === 1 ? 'items-center' : i === 2 ? 'items-end' : ''}`}>
                <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--color-motif-medium)', textTransform: 'uppercase' }}>{lbl}</span>
                <span style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', color: 'var(--color-motif-deep)' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* MRZ zone */}
          <div className={`${fadeIn('delay-500')}`}>
            <div className="w-full border-t-2 mb-2" style={{ borderColor: 'var(--color-motif-soft)' }} />
            <div className="px-1 py-1 rounded-sm" style={{ background: 'color-mix(in srgb, var(--color-motif-soft) 20%, transparent)' }}>
              {[mrz1, mrz2].map((line, i) => (
                <p key={i} style={{ fontFamily: '"Courier New", monospace', fontSize: 'clamp(0.5rem,0.9vw,0.65rem)', letterSpacing: '0.1em', color: 'var(--color-motif-deep)', opacity: 0.5, whiteSpace: 'nowrap', overflow: 'hidden' }}>{line}</p>
              ))}
            </div>
          </div>

          {/* Button */}
          <div className={`flex flex-col items-center gap-2 ${fadeIn('delay-600')}`}>
            <OpenButton onClick={onOpen} large />
          </div>

        </div>
      </div>

    </div>
  );
};
