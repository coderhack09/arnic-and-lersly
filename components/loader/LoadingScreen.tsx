'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

const TOTAL_DURATION_MS = 15000;

interface LoadingScreenProps {
  onComplete: () => void;
}

const serif = '"Playfair Display", "Georgia", serif';

const PlaneTrail: React.FC = () => {
  const pathData =
    'M 500,50 C 400,100 200,50 250,200 C 300,350 450,300 400,400 C 350,500 150,350 150,450 C 150,550 300,600 350,700 C 400,800 500,850 600,900';
  const dur = 8;

  return (
    <div className="absolute inset-0 pointer-events-none z-[2] w-full h-full">
      <svg
        viewBox="0 0 600 1000"
        className="w-full h-full opacity-40"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id="loadingTrailMask">
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
          <filter id="loadingPencil" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
        <path
          d={pathData}
          fill="none"
          stroke="var(--passport-gold)"
          strokeWidth="1.5"
          strokeDasharray="6,10"
          strokeLinecap="round"
          filter="url(#loadingPencil)"
          mask="url(#loadingTrailMask)"
          opacity="0.55"
        />
        <g opacity="0.85">
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="var(--passport-gold-light)"
            transform="scale(1.4) rotate(90, 10.5, 12) translate(-10.5, -12)"
          />
          <animateMotion
            dur={`${dur}s`}
            repeatCount="indefinite"
            rotate="auto"
            path={pathData}
            calcMode="paced"
          />
        </g>
      </svg>
    </div>
  );
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

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
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100));
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(onComplete, 600);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: 'var(--passport-navy)' }}
    >
      {/* Leather / paper depth */}
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
      <div
        className="passport-vignette absolute inset-0 pointer-events-none z-[1] opacity-55"
        aria-hidden
      />

      {/* World map — original asset, tinted to match passport cover */}
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

      <PlaneTrail />

      {/* Passport cover */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center max-w-lg mx-auto w-full">
        <p
          className="passport-gold-text passport-gold-text-shimmer passport-enter uppercase"
          data-text="WEDDING"
          style={{
            fontFamily: serif,
            fontWeight: 400,
            fontSize: 'clamp(0.52rem, 2vw, 0.66rem)',
            letterSpacing: '0.62em',
            marginBottom: '0.45rem',
          }}
        >
          Wedding
        </p>

        <h1
          className="passport-gold-text passport-gold-text-shimmer passport-enter passport-enter-delay-1 uppercase"
          data-text="PASSPORT"
          style={{
            fontFamily: serif,
            fontWeight: 900,
            fontSize: 'clamp(2.15rem, 10vw, 3.5rem)',
            letterSpacing: '0.08em',
            lineHeight: 0.95,
            marginBottom: 'clamp(1.5rem, 5vw, 2.35rem)',
          }}
        >
          Passport
        </h1>

        <div
          className="relative w-[min(80vw,400px)] aspect-[594/420] mb-[clamp(1.35rem, 4.8vw, 2.4rem)] passport-enter passport-enter-delay-2"
          aria-hidden
        >
          <Image
            src="/decoration/compass_symbol_gold.png"
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 768px) 80vw, 400px"
            priority
          />
        </div>

        <p
          className="passport-gold-text passport-enter passport-enter-delay-3 uppercase"
          style={{
            fontFamily: serif,
            fontWeight: 400,
            fontSize: 'clamp(0.46rem, 1.8vw, 0.58rem)',
            letterSpacing: '0.48em',
            marginBottom: 'clamp(0.75rem, 2.5vw, 1.1rem)',
          }}
        >
          To the Marriage of
        </p>

        <div
          className="passport-enter passport-enter-delay-4 w-full max-w-[min(100%,22rem)] sm:max-w-md mx-auto"
          style={{
            marginTop: 'clamp(0.25rem, 1.5vw, 0.5rem)',
            marginBottom: 'clamp(0.85rem, 3vw, 1.35rem)',
            paddingTop: 'clamp(0.65rem, 2.5vw, 1rem)',
            paddingBottom: 'clamp(0.65rem, 2.5vw, 1rem)',
            paddingLeft: 'clamp(1rem, 5vw, 2rem)',
            paddingRight: 'clamp(1rem, 5vw, 2rem)',
          }}
        >
          <p
            className="passport-gold-text passport-gold-text-shimmer"
            data-text={coupleNames}
            style={{
              fontFamily: 'var(--font-serif), "Great Vibes", cursive',
              fontSize: 'clamp(2.35rem, 9vw, 3.75rem)',
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
            fontSize: 'clamp(0.78rem, 2.6vw, 0.95rem)',
            letterSpacing: '0.22em',
            marginTop: 'clamp(0.35rem, 1.5vw, 0.65rem)',
          }}
        >
          {formattedDate}
        </p>
      </div>

      {/* Progress */}
      <div className="relative z-10 w-full max-w-[240px] mx-auto pb-9 px-6 passport-enter passport-enter-delay-6">
        <p
          className="passport-gold-text text-center mb-3 uppercase"
          style={{
            fontFamily: serif,
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(0.52rem, 1.6vw, 0.62rem)',
            letterSpacing: '0.28em',
            opacity: 0.85,
          }}
        >
          Preparing your passport
        </p>
        <div
          className="relative h-px overflow-hidden rounded-full"
          style={{ backgroundColor: 'rgba(188, 155, 97, 0.18)' }}
        >
          <div
            className="relative h-full passport-gold-fill passport-progress-shimmer transition-[width] duration-300 ease-out"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 12px rgba(188, 155, 97, 0.4)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
