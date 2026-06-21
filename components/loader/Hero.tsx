import React, { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '@/content/site';

const NAVY = '#0b1d3a';
const INK = '#111111';
const MUTED = '#9a9a9a';
const CREAM = '#f7f6f2';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

const mono = '"Courier New", Courier, monospace';
const serif = '"Playfair Display", "Georgia", serif';
const sans = 'var(--font-inter, "Inter", system-ui, sans-serif)';

function formatRibbonDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}

function formatTimePhrase(time: string) {
  const upper = time.toUpperCase();
  return upper.includes('PM')
    ? `AT ${upper.replace(' PM', '')} IN THE AFTERNOON`
    : `AT ${upper.replace(' AM', '')} IN THE MORNING`;
}

const WaveBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden" style={{ backgroundColor: CREAM }}>
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <pattern id="heroWaveLines" width="120" height="22" patternUnits="userSpaceOnUse">
          <path d="M0 11 C30 6, 60 16, 120 11" fill="none" stroke="rgba(160,160,160,0.34)" strokeWidth="0.55" />
          <path d="M0 17 C30 12, 60 22, 120 17" fill="none" stroke="rgba(175,175,175,0.24)" strokeWidth="0.45" />
          <path d="M0 5 C30 0, 60 10, 120 5" fill="none" stroke="rgba(185,185,185,0.18)" strokeWidth="0.4" />
        </pattern>
        <radialGradient id="heroVignette" cx="50%" cy="45%" r="65%">
          <stop offset="55%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="#d8d8d8" stopOpacity="0.12" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#heroWaveLines)" />
      <rect width="100%" height="100%" fill="url(#heroVignette)" />
    </svg>

    {/* Subtle map watermark on cream */}
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        WebkitMaskImage: 'url(/decoration/background_map.png)',
        maskImage: 'url(/decoration/background_map.png)',
        WebkitMaskSize: 'cover',
        maskSize: 'cover',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        backgroundColor: NAVY,
      }}
      aria-hidden
    />
  </div>
);

const PlaneTrail: React.FC = () => {
  const pathData =
    'M 500,50 C 400,100 200,50 250,200 C 300,350 450,300 400,400 C 350,500 150,350 150,450 C 150,550 300,600 350,700 C 400,800 500,850 600,900';
  const dur = 8;

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] h-full w-full">
      <svg viewBox="0 0 600 1000" className="h-full w-full opacity-25" preserveAspectRatio="xMidYMid meet">
        <defs>
          <mask id="heroTrailMask">
            <path
              d={pathData}
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeDasharray="3000"
              strokeDashoffset="3000"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="3000"
                to="0"
                dur={`${dur}s`}
                repeatCount="indefinite"
                calcMode="linear"
              />
            </path>
          </mask>
          <filter id="heroPencil" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
        <path
          d={pathData}
          fill="none"
          stroke={NAVY}
          strokeWidth="1.5"
          strokeDasharray="6,10"
          strokeLinecap="round"
          filter="url(#heroPencil)"
          mask="url(#heroTrailMask)"
        />
        <g>
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill={NAVY}
            transform="scale(1.4) rotate(90, 10.5, 12) translate(-10.5, -12)"
          />
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto" path={pathData} calcMode="paced" />
        </g>
      </svg>
    </div>
  );
};

const ElegantEmblem: React.FC = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" aria-hidden className="mx-auto">
    <circle cx="34" cy="34" r="32" stroke={NAVY} strokeWidth="0.65" opacity="0.18" />
    <path
      d="M34 54 C34 54 13 38 13 24 C13 16 18.5 11 25 11 C29 11 32.5 14 34 18 C35.5 14 39 11 43 11 C49.5 11 55 16 55 24 C55 38 34 54 34 54"
      stroke={NAVY}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M34 48 C34 48 17 35 17 24.5 C17 18.5 21 14.5 25.5 14.5 C28.5 14.5 31.5 17 34 20 C36.5 17 39.5 14.5 42.5 14.5 C47 14.5 51 18.5 51 24.5 C51 35 34 48 34 48"
      stroke={NAVY}
      strokeWidth="0.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.3"
    />
  </svg>
);

const DatePlaque: React.FC<{ date: string }> = ({ date }) => {
  const [day, month, year] = date.split('.');

  return (
    <div className="my-5 flex w-full max-w-[280px] flex-col items-center sm:my-6">
      <span
        className="mb-2 uppercase"
        style={{
          fontFamily: sans,
          fontSize: 'clamp(0.48rem, 1.6vw, 0.56rem)',
          letterSpacing: '0.38em',
          color: NAVY,
          fontWeight: 600,
          opacity: 0.75,
        }}
      >
        Save the date
      </span>
      <div className="relative flex w-full items-center gap-3 sm:gap-4">
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${NAVY}33)` }} />
        <div
          className="relative px-5 py-2.5 sm:px-6"
          style={{
            borderTop: `1px solid ${NAVY}33`,
            borderBottom: `1px solid ${NAVY}33`,
          }}
        >
          <div
            className="absolute left-0 top-1/2 h-3 w-px -translate-y-1/2"
            style={{ backgroundColor: `${NAVY}44` }}
            aria-hidden
          />
          <div
            className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2"
            style={{ backgroundColor: `${NAVY}44` }}
            aria-hidden
          />
          <p
            className="flex items-baseline gap-1.5 sm:gap-2"
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: 'clamp(1.15rem, 4.2vw, 1.45rem)',
              letterSpacing: '0.06em',
              color: NAVY,
              margin: 0,
              lineHeight: 1,
            }}
          >
            <span>{day}</span>
            <span style={{ opacity: 0.35, fontWeight: 400, fontSize: '0.85em' }}>·</span>
            <span>{month}</span>
            <span style={{ opacity: 0.35, fontWeight: 400, fontSize: '0.85em' }}>·</span>
            <span>{year}</span>
          </p>
        </div>
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${NAVY}33, transparent)` }} />
      </div>
    </div>
  );
};

const ThinRule: React.FC = () => (
  <div className="my-4 flex w-full max-w-[200px] items-center gap-3 sm:my-5" aria-hidden>
    <div className="h-px flex-1" style={{ backgroundColor: 'rgba(11, 29, 58, 0.12)' }} />
    <div
      className="h-1 w-1 rotate-45"
      style={{ border: `1px solid ${NAVY}`, opacity: 0.35 }}
    />
    <div className="h-px flex-1" style={{ backgroundColor: 'rgba(11, 29, 58, 0.12)' }} />
  </div>
);

const OpenButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="hero-open-btn group mt-8 flex items-center gap-2.5 rounded-sm border px-8 py-3.5 transition-all duration-300 hover:bg-[#0b1d3a] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b1d3a] focus-visible:ring-offset-2 sm:mt-10 sm:px-10"
    style={{
      borderColor: NAVY,
      color: NAVY,
      backgroundColor: 'rgba(255,255,255,0.5)',
      fontFamily: sans,
      fontSize: 'clamp(0.58rem, 1.85vw, 0.65rem)',
      letterSpacing: '0.28em',
      fontWeight: 700,
    }}
  >
    <svg
      className="h-3.5 w-3.5 -rotate-45"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
    OPEN INVITATION
  </button>
);

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [contentVisible, setContentVisible] = useState(false);

  const ribbonDate = useMemo(() => formatRibbonDate(siteConfig.wedding.date), []);
  const timePhrase = useMemo(() => formatTimePhrase(siteConfig.ceremony.time), []);
  const coupleLine = useMemo(
    () => `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`.toUpperCase(),
    []
  );

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setContentVisible(true), 250);
      return () => clearTimeout(t);
    }
    setContentVisible(false);
  }, [visible]);

  const enter = (delay: string) =>
    contentVisible ? `hero-invite-enter ${delay}` : 'opacity-0';

  const monoBody = {
    fontFamily: mono,
    fontSize: 'clamp(0.56rem, 2vw, 0.7rem)',
    letterSpacing: '0.13em',
    color: INK,
    lineHeight: 1.9,
  } as const;

  const monoMuted = {
    ...monoBody,
    fontSize: 'clamp(0.5rem, 1.75vw, 0.62rem)',
    color: MUTED,
    letterSpacing: '0.11em',
  } as const;

  return (
    <div
      className={`fixed inset-0 z-30 flex items-center justify-center overflow-y-auto overflow-x-hidden transition-opacity duration-500 ${
        visible ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
      }`}
    >
      <WaveBackground />
      <PlaneTrail />

      <div
        className={`hero-invite-card relative z-10 mx-4 w-full max-w-md px-7 py-9 sm:max-w-[27rem] sm:px-11 sm:py-12 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}
      >
        <div
          className="pointer-events-none absolute inset-x-6 top-0 h-px sm:inset-x-8"
          style={{ background: `linear-gradient(90deg, transparent, ${NAVY}22, transparent)` }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px sm:inset-x-8"
          style={{ background: `linear-gradient(90deg, transparent, ${NAVY}22, transparent)` }}
          aria-hidden
        />

        <div className={`text-center ${enter('hero-invite-enter-delay-1')}`}>
          <p className="uppercase" style={monoBody}>
            Anchored in love, join us as we
            <br />
            set sail to the wedding of
          </p>
        </div>

        <div className={`my-4 flex justify-center sm:my-5 ${enter('hero-invite-enter-delay-2')}`}>
          <ElegantEmblem />
        </div>

        <h1
          className={`text-center uppercase ${enter('hero-invite-enter-delay-3')}`}
          style={{
            fontFamily: serif,
            fontWeight: 900,
            fontSize: 'clamp(2rem, 8.5vw, 2.95rem)',
            letterSpacing: '0.07em',
            color: INK,
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          {coupleLine}
        </h1>

        <div className={`flex justify-center ${enter('hero-invite-enter-delay-4')}`}>
          <DatePlaque date={ribbonDate} />
        </div>

        <div className={`text-center ${enter('hero-invite-enter-delay-5')}`}>
          <p className="uppercase" style={{ ...monoBody, margin: 0 }}>
            {timePhrase}
          </p>
          <p className="mt-1 uppercase" style={{ ...monoBody, margin: 0 }}>
            {siteConfig.ceremony.location.toUpperCase()}
          </p>
          <p className="mt-0.5 uppercase" style={{ ...monoMuted, margin: 0 }}>
            {siteConfig.ceremony.venue.toUpperCase()}
          </p>
        </div>

        <div className={`flex justify-center ${enter('hero-invite-enter-delay-6')}`}>
          <ThinRule />
        </div>

        <div className={`text-center ${enter('hero-invite-enter-delay-6')}`}>
          <p
            className="uppercase"
            style={{
              fontFamily: sans,
              fontWeight: 800,
              fontSize: 'clamp(0.62rem, 2.1vw, 0.74rem)',
              letterSpacing: '0.24em',
              color: NAVY,
              margin: 0,
            }}
          >
            Reception to follow at
          </p>
          <p className="mt-2 uppercase" style={{ ...monoBody, margin: 0 }}>
            {siteConfig.reception.location.toUpperCase()}
          </p>
          <p className="mt-0.5 uppercase" style={{ ...monoMuted, margin: 0 }}>
            {siteConfig.reception.venue.toUpperCase()}
          </p>
        </div>

        <div className={`flex justify-center ${enter('hero-invite-enter-delay-7')}`}>
          <OpenButton onClick={onOpen} />
        </div>
      </div>
    </div>
  );
};
