
import React, { useEffect, useState, useRef } from 'react'

const stages = [
  { name: 'SOURCE', detail: 'Code integration', icon: '01' },
  { name: 'BUILD', detail: 'Artifact creation', icon: '02' },
  { name: 'TEST', detail: 'Quality assurance', icon: '03' },
  { name: 'STAGING', detail: 'Environment sync', icon: '04' },
  { name: 'DEPLOY', detail: 'Infrastructure', icon: '05' },
  { name: 'RELEASE', detail: 'Production', icon: '06' },
]

const messages = [
  'Establishing secure infrastructure',
  'Synchronizing source repositories',
  'Compiling deployment artifacts',
  'Executing quality validation',
  'Provisioning cloud environments',
  'Preparing production services',
]

function InfinityMark() {
  return (
    <svg viewBox="0 0 320 180" className="infinity-mark" fill="none">
      <defs>
        <linearGradient id="infinitySilver" x1="30" y1="10" x2="280" y2="170">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#8997A8" />
          <stop offset="38%" stopColor="#F9FAFC" />
          <stop offset="58%" stopColor="#9CA9B8" />
          <stop offset="76%" stopColor="#F8F9FC" />
          <stop offset="100%" stopColor="#68788C" />
        </linearGradient>

        <linearGradient id="infinityGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9D6231" />
          <stop offset="50%" stopColor="#FFD69A" />
          <stop offset="100%" stopColor="#B77A42" />
        </linearGradient>

        <filter id="infinityBlur">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Soft metallic illumination */}
      <path
        d="M160 90 C112 18 24 18 24 90 S112 162 160 90 S296 18 296 90 S208 162 160 90"
        stroke="#E4A75F"
        strokeWidth="20"
        opacity=".18"
        filter="url(#infinityBlur)"
      />

      {/* Main chrome ribbon */}
      <path
        d="M160 90 C112 18 24 18 24 90 S112 162 160 90 S296 18 296 90 S208 162 160 90"
        stroke="url(#infinitySilver)"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* Fine inner highlight */}
      <path
        d="M160 90 C112 18 24 18 24 90 S112 162 160 90 S296 18 296 90 S208 162 160 90"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        opacity=".7"
        strokeLinecap="round"
        strokeDasharray="95 450"
        className="ribbon-highlight"
      />

      {/* Champagne accent */}
      <path
        d="M160 90 C112 18 24 18 24 90 S112 162 160 90 S296 18 296 90 S208 162 160 90"
        stroke="url(#infinityGold)"
        strokeWidth="2"
        opacity=".85"
        strokeLinecap="round"
        strokeDasharray="75 450"
        className="ribbon-gold"
      />
    </svg>
  )
}

function StageTimeline({ progress }) {
  const active = Math.min(
    Math.floor(progress / (100 / stages.length)),
    stages.length - 1
  )

  return (
    <section className="stage-section">
      <div className="section-heading">
        <div>
          <span className="section-kicker">THE DELIVERY LIFECYCLE</span>
          <h3>From commit to production.</h3>
        </div>
        <span className="section-count">06 STAGES</span>
      </div>

      <div className="stage-list">
        <div className="stage-line">
          <div
            className="stage-line-active"
            style={{ width: `${progress}%` }}
          />
        </div>

        {stages.map((stage, index) => {
          const complete = progress >= ((index + 1) / 6) * 100
          const selected = index === active

          return (
            <div className="stage-item" key={stage.name}>
              <div className={`stage-point ${
                complete ? 'complete' : ''
              } ${selected ? 'selected' : ''}`}>
                {complete ? '✓' : ''}
              </div>

              <span className={`stage-number ${
                selected ? 'selected-text' : ''
              }`}>
                {stage.icon}
              </span>

              <strong className={selected ? 'selected-text' : ''}>
                {stage.name}
              </strong>

              <span className="stage-description">
                {stage.detail}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const finishRef = useRef(onFinish)

  useEffect(() => {
    finishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    let value = 0
    let finishTimer
    let exitTimer

    const interval = setInterval(() => {
      value = Math.min(value + 2, 100)
      setProgress(value)

      if (value === 100) {
        clearInterval(interval)

        finishTimer = setTimeout(() => {
          setExiting(true)
          exitTimer = setTimeout(() => {
            finishRef.current?.()
          }, 550)
        }, 250)
      }
    }, 50)

    return () => {
      clearInterval(interval)
      clearTimeout(finishTimer)
      clearTimeout(exitTimer)
    }
  }, [])

  const messageIndex = Math.min(
    Math.floor(progress / 17),
    messages.length - 1
  )

  return (
    <div className={`om-screen ${exiting ? 'om-exit' : ''}`}>

      {/* BACKGROUND ARCHITECTURE */}

      <div className="om-background">
        <div className="om-light om-light-blue" />
        <div className="om-light om-light-gold" />
        <div className="om-grid" />

        <div className="om-light-beam" />

        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className="om-particle"
            style={{
              left: `${(i * 47 + 9) % 100}%`,
              top: `${(i * 31 + 17) % 100}%`,
              animationDelay: `${(i % 6) * .8}s`,
            }}
          />
        ))}
      </div>

      {/* TOP NAVIGATION */}

      <header className="om-header">
        <div className="om-brand">
          <div className="om-small-mark">
            <InfinityMark />
          </div>
          <div>
            <div className="om-brand-name">OPSMIND</div>
            <div className="om-brand-caption">
              INFRASTRUCTURE PLATFORM
            </div>
          </div>
        </div>

        <div className="om-system-state">
          <span className="om-live-dot" />
          SYSTEM INITIALIZING
          <span className="om-version">PLATFORM / 01.0</span>
        </div>
      </header>

      {/* MAIN EXPERIENCE */}

      <main className="om-main">

        {/* HERO */}

        <section className="om-hero">
          <div className="om-eyebrow">
            <span />
            ENGINEERED FOR CONTINUOUS DELIVERY
            <span />
          </div>

          <h1>
            Engineering without
            <br />
            <span>boundaries.</span>
          </h1>

          <p>
            From code to cloud. Every stage, intelligently connected.
          </p>
        </section>

        {/* INFINITY BRAND EXPERIENCE */}

        <section className="om-identity">

          <div className="om-orbit om-orbit-one" />
          <div className="om-orbit om-orbit-two" />

          <div className="om-logo-glow" />

          <div className="om-logo-wrap">
            <InfinityMark />
          </div>

          <h2>OPSMIND</h2>

          <div className="om-tagline">
            INTELLIGENT OPERATIONS. WITHOUT LIMITS.
          </div>

          <div className="om-gold-divider" />

          <div className="om-brand-caption-large">
            AUTONOMOUS INFRASTRUCTURE
          </div>
        </section>

        {/* DELIVERY TIMELINE */}

        <StageTimeline progress={progress} />

        {/* INITIALIZATION CONSOLE */}

        <section className="om-console">

          <div className="om-console-top">
            <div>
              <span className="om-console-kicker">
                PLATFORM INITIALIZATION
              </span>
              <div className="om-console-message" key={messageIndex}>
                <span className="om-status-bullet" />
                {messages[messageIndex]}
              </div>
            </div>

            <div className="om-percentage">
              {String(progress).padStart(2, '0')}
              <span>%</span>
            </div>
          </div>

          <div className="om-progress-track">
            <div
              className="om-progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div
              className="om-progress-shine"
              style={{ left: `${Math.max(0, progress - 2)}%` }}
            />
          </div>

          <div className="om-console-bottom">
            <span>SECURE INITIALIZATION</span>
            <span>{progress === 100 ? 'READY' : 'IN PROGRESS'}</span>
          </div>

        </section>
      </main>

      {/* FOOTER */}

      <footer className="om-footer">
        <span>BUILT FOR MODERN INFRASTRUCTURE</span>
        <div className="om-footer-links">
          <span>INFRASTRUCTURE</span>
          <i />
          <span>ORCHESTRATION</span>
          <i />
          <span>AUTOMATION</span>
        </div>
        <span>OPSMIND © 2026</span>
      </footer>

      <style>{`

        .om-screen {
          --bg: #05080D;
          --white: #F5F7FB;
          --muted: #8190A2;
          --blue: #4EBCEB;
          --gold: #E6A35A;

          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 25px 5.2% 17px;
          background: var(--bg);
          color: var(--white);
          font-family: Inter, -apple-system, BlinkMacSystemFont,
            "SF Pro Display", "Segoe UI", sans-serif;
          isolation: isolate;
          transition: opacity .55s ease, transform .55s ease;
        }

        .om-screen * {
          box-sizing: border-box;
        }

        .om-exit {
          opacity: 0;
          transform: scale(1.025);
          pointer-events: none;
        }

        /* BACKGROUND */

        .om-background {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .om-light {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
        }

        .om-light-blue {
          width: 700px;
          height: 450px;
          left: 5%;
          top: 0;
          background: rgba(18, 75, 124, .19);
        }

        .om-light-gold {
          width: 600px;
          height: 350px;
          right: -15%;
          bottom: -15%;
          background: rgba(135, 81, 38, .13);
        }

        .om-grid {
          position: absolute;
          inset: 0;
          opacity: .12;
          background-image:
            linear-gradient(rgba(132,164,190,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(132,164,190,.12) 1px, transparent 1px);
          background-size: 75px 75px;
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
        }

        .om-light-beam {
          position: absolute;
          top: 0;
          left: -30%;
          width: 35%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(116,171,205,.025), transparent);
          transform: skewX(-20deg);
          animation: omBeam 12s linear infinite;
        }

        .om-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #67C7EF;
          border-radius: 50%;
          opacity: .3;
          animation: omParticle 4s ease-in-out infinite alternate;
        }

        /* HEADER */

        .om-header {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          animation: omReveal .8s both;
        }

        .om-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .om-small-mark {
          width: 38px;
          height: 25px;
        }

        .om-small-mark .infinity-mark {
          width: 100%;
          height: 100%;
        }

        .om-brand-name {
          font-size: 12px;
          letter-spacing: .29em;
          font-weight: 750;
        }

        .om-brand-caption {
          color: #75869A;
          font-size: 6px;
          letter-spacing: .22em;
          margin-top: 5px;
        }

        .om-system-state {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #8292A5;
          font-size: 7px;
          letter-spacing: .17em;
        }

        .om-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 12px var(--gold);
          animation: omBlink 1.5s infinite;
        }

        .om-version {
          color: #526276;
          margin-left: 14px;
        }

        /* MAIN */

        .om-main {
          width: 100%;
          max-width: 1130px;
          min-height: 0;
          flex: 1;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* HERO */

        .om-hero {
          text-align: center;
          animation: omReveal .9s .1s both;
        }

        .om-eyebrow {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 13px;
          color: #D7A15F;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: .28em;
          margin-bottom: 16px;
        }

        .om-eyebrow span {
          width: 20px;
          height: 1px;
          background: #B9844B;
        }

        .om-hero h1 {
          margin: 0;
          color: #F6F8FB;
          font-size: clamp(34px, 4.8vw, 61px);
          font-weight: 680;
          line-height: 1.08;
          letter-spacing: -.065em;
        }

        .om-hero h1 span {
          background: linear-gradient(100deg, #9CAABD, #F1F4F8);
          color: transparent;
          background-clip: text;
        }

        .om-hero p {
          margin: 13px 0 0;
          color: #8292A5;
          font-size: 10px;
          letter-spacing: .035em;
        }

        /* IDENTITY */

        .om-identity {
          height: clamp(210px, 30vh, 290px);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 4px 0;
          animation: omReveal 1s .2s both;
        }

        .om-logo-wrap {
          width: clamp(180px, 24vw, 250px);
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 0 16px rgba(223,165,103,.19));
          animation: omFloat 5s ease-in-out infinite;
        }

        .infinity-mark {
          width: 100%;
          overflow: visible;
        }

        .ribbon-highlight {
          animation: omShimmer 5s linear infinite;
        }

        .ribbon-gold {
          animation: omShimmer 7s linear infinite reverse;
        }

        .om-logo-glow {
          position: absolute;
          width: 220px;
          height: 100px;
          border-radius: 50%;
          background: rgba(191,130,70,.12);
          filter: blur(55px);
        }

        .om-orbit {
          position: absolute;
          width: 390px;
          height: 135px;
          border: 1px solid rgba(115,158,194,.13);
          border-radius: 50%;
        }

        .om-orbit-one {
          transform: rotate(-17deg);
          animation: omOrbit 24s linear infinite;
        }

        .om-orbit-two {
          width: 330px;
          height: 165px;
          border-color: rgba(213,151,84,.10);
          transform: rotate(35deg);
          animation: omOrbitReverse 32s linear infinite;
        }

        .om-identity h2 {
          z-index: 2;
          margin: -1px 0 0;
          font-size: clamp(25px, 3.2vw, 37px);
          letter-spacing: .29em;
          padding-left: .29em;
          font-weight: 680;
          color: transparent;
          background: linear-gradient(#FFFFFF, #A9B4C2);
          background-clip: text;
        }

        .om-tagline {
          z-index: 2;
          margin-top: 8px;
          color: #8593A5;
          font-size: 7px;
          letter-spacing: .28em;
        }

        .om-gold-divider {
          width: 35px;
          height: 2px;
          background: #DDA15C;
          margin-top: 14px;
          box-shadow: 0 0 12px rgba(222,158,82,.5);
        }

        .om-brand-caption-large {
          margin-top: 10px;
          color: #526477;
          font-size: 6px;
          letter-spacing: .24em;
        }

        /* TIMELINE */

        .stage-section {
          margin-top: 8px;
          animation: omReveal .9s .3s both;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 25px;
        }

        .section-kicker {
          color: #D8A363;
          font-size: 7px;
          letter-spacing: .22em;
        }

        .section-heading h3 {
          font-size: clamp(17px, 2vw, 23px);
          font-weight: 580;
          letter-spacing: -.045em;
          margin: 7px 0 0;
          color: #F2F4F8;
        }

        .section-count {
          color: #66778B;
          font-size: 7px;
          letter-spacing: .18em;
        }

        .stage-list {
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .stage-line {
          position: absolute;
          top: 6px;
          left: 0;
          right: 0;
          height: 1px;
          background: #354455;
        }

        .stage-line-active {
          height: 100%;
          background: linear-gradient(90deg, #50BCEB, #E4A25A);
          box-shadow: 0 0 8px rgba(221,160,86,.5);
          transition: width .12s linear;
        }

        .stage-item {
          position: relative;
          z-index: 1;
          width: 16.66%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .stage-point {
          width: 13px;
          height: 13px;
          border: 1px solid #61758C;
          border-radius: 50%;
          background: #080D14;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7CCCF0;
          font-size: 8px;
          transition: .3s;
        }

        .stage-point.complete {
          border-color: #56BCE8;
          background: #0B1E2B;
        }

        .stage-point.selected {
          border-color: #E5A35B;
          box-shadow: 0 0 13px rgba(229,163,91,.55);
          transform: scale(1.15);
        }

        .stage-number {
          color: #64778D;
          font-size: 6px;
          letter-spacing: .13em;
          margin-top: 10px;
        }

        .stage-item strong {
          color: #C1CBD7;
          font-size: 8px;
          letter-spacing: .16em;
          margin-top: 6px;
          font-weight: 650;
        }

        .stage-item .selected-text {
          color: #E5B376;
        }

        .stage-description {
          color: #748499;
          font-size: 8px;
          margin-top: 5px;
        }

        /* CONSOLE */

        .om-console {
          width: min(100%, 480px);
          margin: 28px auto 0;
          animation: omReveal .9s .4s both;
        }

        .om-console-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 13px;
        }

        .om-console-kicker {
          color: #C99B61;
          font-size: 7px;
          letter-spacing: .2em;
        }

        .om-console-message {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #8796A8;
          font-size: 9px;
          margin-top: 9px;
          animation: omReveal .3s both;
        }

        .om-status-bullet {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #E5A35A;
          box-shadow: 0 0 8px #E5A35A;
        }

        .om-percentage {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -.05em;
          font-variant-numeric: tabular-nums;
        }

        .om-percentage span {
          color: #A1ADBA;
          font-size: 13px;
          margin-left: 2px;
        }

        .om-progress-track {
          height: 4px;
          width: 100%;
          position: relative;
          background: #202D3A;
          border-radius: 8px;
          overflow: hidden;
        }

        .om-progress-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #B47B3E, #E8B36D, #FFF0CC);
          box-shadow: 0 0 12px rgba(235,169,93,.55);
          transition: width .12s linear;
        }

        .om-progress-shine {
          position: absolute;
          top: 0;
          width: 2px;
          height: 100%;
          background: white;
          box-shadow: 0 0 8px white;
        }

        .om-console-bottom {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(126,147,169,.14);
          padding-top: 10px;
          margin-top: 13px;
          font-size: 6px;
          letter-spacing: .19em;
          color: #63758A;
        }

        /* FOOTER */

        .om-footer {
          max-width: 1500px;
          width: 100%;
          flex-shrink: 0;
          margin: 0 auto;
          border-top: 1px solid rgba(126,147,169,.15);
          padding-top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #718196;
          font-size: 6px;
          letter-spacing: .15em;
        }

        .om-footer-links {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .om-footer-links i {
          width: 3px;
          height: 3px;
          background: #D49A56;
          border-radius: 50%;
        }

        /* MOTION */

        @keyframes omReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes omFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes omShimmer {
          to { stroke-dashoffset: -545; }
        }

        @keyframes omOrbit {
          to { transform: rotate(343deg); }
        }

        @keyframes omOrbitReverse {
          to { transform: rotate(-325deg); }
        }

        @keyframes omParticle {
          from { opacity: .12; transform: scale(.7); }
          to { opacity: .65; transform: scale(1.5); }
        }

        @keyframes omBlink {
          50% { opacity: .3; }
        }

        @keyframes omBeam {
          from { left: -35%; }
          to { left: 120%; }
        }

        /* RESPONSIVE */

        @media (max-width: 650px) {
          .om-screen {
            padding: 19px 18px 13px;
          }

          .om-version {
            display: none;
          }

          .om-system-state {
            font-size: 6px;
          }

          .om-hero h1 {
            font-size: clamp(31px, 8vw, 43px);
          }

          .om-hero p {
            font-size: 8px;
          }

          .om-identity {
            height: 210px;
          }

          .om-logo-wrap {
            width: 185px;
          }

          .om-orbit-one {
            width: 290px;
          }

          .om-orbit-two {
            width: 260px;
          }

          .section-heading h3 {
            font-size: 17px;
          }

          .stage-description {
            font-size: 6px;
          }

          .stage-item strong {
            font-size: 6px;
          }

          .om-footer {
            font-size: 5px;
            letter-spacing: .04em;
          }

          .om-footer-links {
            gap: 5px;
          }
        }

        @media (max-height: 740px) {
          .om-screen {
            padding-top: 12px;
            padding-bottom: 10px;
          }

          .om-identity {
            height: 180px;
          }

          .om-logo-wrap {
            width: 165px;
          }

          .om-console {
            margin-top: 16px;
          }

          .section-heading {
            margin-bottom: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .om-screen *,
          .om-screen *::before,
          .om-screen *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }

      `}</style>
    </div>
  )
}
