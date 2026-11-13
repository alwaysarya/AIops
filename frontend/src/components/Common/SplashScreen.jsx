
import React, { useEffect, useState } from 'react'

const pipeline = [
  { name: 'SOURCE', detail: 'Code integration', x: 90 },
  { name: 'BUILD', detail: 'Artifact generation', x: 270 },
  { name: 'TEST', detail: 'Quality validation', x: 450 },
  { name: 'STAGING', detail: 'Environment sync', x: 630 },
  { name: 'DEPLOY', detail: 'Infrastructure rollout', x: 810 },
  { name: 'RELEASE', detail: 'Production delivery', x: 990 }
]

const messages = [
  'Establishing secure infrastructure...',
  'Connecting cloud environments...',
  'Preparing build pipelines...',
  'Executing quality validation...',
  'Synchronizing deployment environments...',
  'Finalizing platform initialization...'
]

function InfinityMark() {
  return (
    <svg viewBox="0 0 400 210" className="om-infinity">
      <defs>
        <linearGradient id="omChrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".2" stopColor="#64748B" />
          <stop offset=".43" stopColor="#F8FAFC" />
          <stop offset=".68" stopColor="#94A3B8" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>

        <linearGradient id="omAmber" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#B45309" />
          <stop offset=".5" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>

        <filter id="omGlow">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Soft ambient light */}
      <path
        d="M200 105 C135 8 25 8 25 105 S135 202 200 105 S375 8 375 105 S265 202 200 105Z"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="17"
        opacity=".22"
        filter="url(#omGlow)"
      />

      {/* Metallic infinity */}
      <path
        d="M200 105 C135 8 25 8 25 105 S135 202 200 105 S375 8 375 105 S265 202 200 105Z"
        fill="none"
        stroke="url(#omChrome)"
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* Amber inner edge */}
      <path
        d="M200 105 C135 8 25 8 25 105 S135 202 200 105 S375 8 375 105 S265 202 200 105Z"
        fill="none"
        stroke="url(#omAmber)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="125 600"
        className="om-logo-flow"
      />

      {/* Moving light */}
      <circle r="5" fill="#FDE68A" filter="url(#omGlow)">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M200 105 C135 8 25 8 25 105 S135 202 200 105 S375 8 375 105 S265 202 200 105Z"
        />
      </circle>
    </svg>
  )
}

function PipelineVisual({ progress }) {
  return (
    <div className="om-pipeline">
      <svg viewBox="0 0 1080 230" className="om-pipeline-svg">
        <defs>
          <linearGradient id="omPath" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#38BDF8" />
            <stop offset=".48" stopColor="#64748B" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>

          <filter id="omNodeGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Main connection path */}
        <path
          d="M90 112 H990"
          fill="none"
          stroke="#273548"
          strokeWidth="1.5"
        />

        <path
          d="M90 112 H990"
          fill="none"
          stroke="url(#omPath)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          className="om-path-dash"
        />

        {/* Active progress path */}
        <path
          d="M90 112 H990"
          fill="none"
          stroke="url(#omPath)"
          strokeWidth="2"
          pathLength="100"
          strokeDasharray={`${progress} 100`}
          className="om-path-progress"
        />

        {/* Nodes */}
        {pipeline.map((stage, i) => {
          const active = progress >= (i * 20)
          const x = stage.x

          return (
            <g key={stage.name}>
              {active && (
                <circle
                  cx={x}
                  cy="112"
                  r="15"
                  fill={i < 4 ? '#38BDF8' : '#F59E0B'}
                  opacity=".15"
                  filter="url(#omNodeGlow)"
                />
              )}

              <circle
                cx={x}
                cy="112"
                r="7"
                fill="#070C13"
                stroke={active ? (i < 4 ? '#38BDF8' : '#F59E0B') : '#475569'}
                strokeWidth="1.8"
              />

              <circle
                cx={x}
                cy="112"
                r="2.5"
                fill={active ? '#F8FAFC' : '#64748B'}
              />

              <text
                x={x}
                y="72"
                textAnchor="middle"
                fill={active ? '#F8FAFC' : '#64748B'}
                fontSize="12"
                fontWeight="600"
                letterSpacing="1.5"
              >
                {stage.name}
              </text>

              <text
                x={x}
                y="150"
                textAnchor="middle"
                fill="#8493A7"
                fontSize="10"
              >
                {stage.detail}
              </text>

              <path
                d={`M${x} 88V104`}
                stroke={active ? '#64748B' : '#334155'}
                strokeWidth="1"
              />
            </g>
          )
        })}

        {/* Moving pipeline signal */}
        <circle r="5" fill="#FDE68A" className="om-signal">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M90 112 H990"
          />
        </circle>
      </svg>
    </div>
  )
}

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let current = 0
    let finishTimer
    let exitTimer

    const interval = setInterval(() => {
      current = Math.min(current + 1, 100)
      setProgress(current)

      if (current >= 100) {
        clearInterval(interval)

        finishTimer = setTimeout(() => {
          setExiting(true)
          exitTimer = setTimeout(() => onFinish?.(), 800)
        }, 500)
      }
    }, 40)

    return () => {
      clearInterval(interval)
      clearTimeout(finishTimer)
      clearTimeout(exitTimer)
    }
  }, [onFinish])

  const messageIndex = Math.min(
    Math.floor(progress / 17),
    messages.length - 1
  )

  return (
    <div className={`om-screen ${exiting ? 'om-exit' : ''}`}>

      <div className="om-backdrop" />
      <div className="om-grain" />

      {/* HEADER */}
      <header className="om-header">
        <div className="om-brand">
          <div className="om-brand-mark">
            <InfinityMark />
          </div>

          <div className="om-brand-name">
            <strong>OPSMIND</strong>
            <span>AUTONOMOUS OPERATIONS</span>
          </div>
        </div>

        <div className="om-header-status">
          <span className="om-live-dot" />
          <span>PLATFORM INITIALIZING</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="om-main">

        <section className="om-intro">
          <div className="om-overline">
            INTELLIGENT INFRASTRUCTURE PLATFORM
          </div>

          <h1>
            Built to move
            <span> engineering forward.</span>
          </h1>

          <p>
            One platform. Every environment. Continuous delivery.
          </p>
        </section>

        {/* CENTRAL SIGNATURE VISUAL */}
        <section className="om-signature">

          <div className="om-orbit om-orbit-one" />
          <div className="om-orbit om-orbit-two" />

          <div className="om-logo-container">
            <InfinityMark />
          </div>

          <div className="om-logo-reflection" />

          <div className="om-signature-caption">
            <span>CONTINUOUS</span>
            <i />
            <span>CONNECTED</span>
            <i />
            <span>INTELLIGENT</span>
          </div>

        </section>

        {/* PIPELINE */}
        <section className="om-workflow">

          <div className="om-workflow-heading">
            <span>DELIVERY WORKFLOW</span>
            <span>01 — 06</span>
          </div>

          <PipelineVisual progress={progress} />

        </section>

        {/* LOADING */}
        <section className="om-loading">

          <div className="om-loading-top">
            <div>
              <span className="om-loading-label">
                INITIALIZING YOUR WORKSPACE
              </span>
              <div className="om-message" key={messageIndex}>
                {messages[messageIndex]}
              </div>
            </div>

            <div className="om-percent">
              {String(progress).padStart(2, '0')}
              <span>%</span>
            </div>
          </div>

          <div className="om-progress-track">
            <div
              className="om-progress-value"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="om-loading-bottom">
            <span>SECURE INITIALIZATION</span>
            <span>OPSMIND SYSTEMS</span>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="om-footer">
        <span>ENGINEERED FOR SCALE</span>
        <span>© OPSMIND</span>
        <span>INTELLIGENCE IN MOTION</span>
      </footer>

      <style>{`

        .om-screen {
          --om-blue: #67C8F5;
          --om-amber: #D99A45;
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          padding: 30px 5%;
          color: #F8FAFC;
          background: #05070B;
          font-family: Inter, -apple-system, BlinkMacSystemFont,
            "SF Pro Display", "Segoe UI", sans-serif;
          transition: opacity .8s ease, transform .8s ease;
          isolation: isolate;
        }

        .om-screen *,
        .om-screen *::before,
        .om-screen *::after {
          box-sizing: border-box;
        }

        .om-exit {
          opacity: 0;
          transform: scale(1.02);
          pointer-events: none;
        }

        .om-backdrop {
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(ellipse at 50% 42%,
              rgba(27,52,76,.48), transparent 45%),
            radial-gradient(ellipse at 50% 100%,
              rgba(107,64,27,.11), transparent 42%),
            #05070B;
        }

        .om-grain {
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: .13;
          pointer-events: none;
          background-image:
            linear-gradient(transparent 50%, rgba(255,255,255,.015) 50%);
          background-size: 100% 4px;
        }

        /* HEADER */

        .om-header {
          width: 100%;
          max-width: 1450px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
          animation: omEnter .8s both;
        }

        .om-brand {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .om-brand-mark {
          width: 39px;
          height: 24px;
        }

        .om-brand-mark svg {
          width: 100%;
        }

        .om-brand-name {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .om-brand-name strong {
          font-size: 14px;
          letter-spacing: .27em;
          font-weight: 750;
        }

        .om-brand-name span {
          font-size: 7px;
          color: #76869A;
          letter-spacing: .22em;
        }

        .om-header-status {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #9AA9B9;
          font-size: 8px;
          letter-spacing: .16em;
        }

        .om-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #D99A45;
          box-shadow: 0 0 12px #D99A45;
          animation: omPulse 1.5s infinite;
        }

        /* MAIN */

        .om-main {
          width: 100%;
          max-width: 1160px;
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        /* INTRO */

        .om-intro {
          text-align: center;
          animation: omEnter 1s .1s both;
        }

        .om-overline {
          color: #D7A85D;
          font-size: 9px;
          letter-spacing: .28em;
          font-weight: 650;
          margin-bottom: 17px;
        }

        .om-intro h1 {
          margin: 0;
          font-size: clamp(30px, 4vw, 53px);
          letter-spacing: -.055em;
          line-height: 1.13;
          font-weight: 620;
        }

        .om-intro h1 span {
          display: block;
          color: #8593A5;
        }

        .om-intro p {
          font-size: 12px;
          color: #8593A5;
          margin-top: 15px;
          letter-spacing: .015em;
        }

        /* SIGNATURE */

        .om-signature {
          width: min(100%, 650px);
          height: clamp(170px, 25vh, 245px);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4px 0 0;
        }

        .om-logo-container {
          width: clamp(180px, 27vw, 290px);
          position: relative;
          z-index: 3;
          filter: drop-shadow(0 0 22px rgba(180,145,95,.12));
          animation: omFloat 5s ease-in-out infinite;
        }

        .om-infinity {
          display: block;
          width: 100%;
          overflow: visible;
        }

        .om-logo-flow {
          animation: omDash 5s linear infinite;
        }

        .om-orbit {
          position: absolute;
          border: 1px solid rgba(148,163,184,.13);
          border-radius: 50%;
          transform: rotate(-13deg);
          pointer-events: none;
        }

        .om-orbit-one {
          width: 440px;
          height: 110px;
          animation: omOrbit 15s linear infinite;
        }

        .om-orbit-two {
          width: 510px;
          height: 145px;
          transform: rotate(12deg);
          border-color: rgba(217,154,69,.09);
          animation: omOrbit 22s linear infinite reverse;
        }

        .om-logo-reflection {
          position: absolute;
          width: 250px;
          height: 45px;
          bottom: 17px;
          background: rgba(217,154,69,.12);
          filter: blur(35px);
          border-radius: 50%;
        }

        .om-signature-caption {
          position: absolute;
          bottom: 0;
          display: flex;
          align-items: center;
          gap: 13px;
          color: #8290A0;
          font-size: 8px;
          letter-spacing: .2em;
        }

        .om-signature-caption i {
          width: 3px;
          height: 3px;
          background: #D99A45;
          border-radius: 50%;
        }

        /* WORKFLOW */

        .om-workflow {
          width: 100%;
          margin-top: 15px;
          animation: omEnter 1s .3s both;
        }

        .om-workflow-heading {
          display: flex;
          justify-content: space-between;
          padding: 0 4%;
          color: #8998AA;
          font-size: 8px;
          letter-spacing: .19em;
        }

        .om-pipeline {
          width: 100%;
          margin-top: 4px;
        }

        .om-pipeline-svg {
          width: 100%;
          display: block;
          overflow: visible;
        }

        .om-path-dash {
          animation: omPathDash 3s linear infinite;
        }

        .om-path-progress {
          transition: stroke-dasharray .2s linear;
        }

        .om-signal {
          filter: drop-shadow(0 0 6px #F59E0B);
        }

        /* LOADING */

        .om-loading {
          width: min(100%, 650px);
          margin-top: 18px;
          animation: omEnter 1s .5s both;
        }

        .om-loading-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .om-loading-label {
          color: #D7A85D;
          font-size: 8px;
          letter-spacing: .18em;
        }

        .om-message {
          color: #9AA7B5;
          font-size: 11px;
          margin-top: 7px;
          animation: omEnter .3s both;
        }

        .om-percent {
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -.04em;
        }

        .om-percent span {
          font-size: 12px;
          color: #8B98A7;
          margin-left: 2px;
        }

        .om-progress-track {
          height: 2px;
          background: #283442;
          position: relative;
          overflow: hidden;
        }

        .om-progress-value {
          height: 100%;
          background: linear-gradient(90deg,#B77932,#F8D28B);
          box-shadow: 0 0 12px rgba(217,154,69,.55);
          transition: width .1s linear;
          position: relative;
        }

        .om-progress-value::after {
          content: "";
          position: absolute;
          right: 0;
          width: 25px;
          height: 100%;
          background: #FFF1CF;
          filter: blur(4px);
        }

        .om-loading-bottom {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          color: #627286;
          font-size: 7px;
          letter-spacing: .17em;
        }

        /* FOOTER */

        .om-footer {
          width: 100%;
          max-width: 1450px;
          display: flex;
          justify-content: space-between;
          flex-shrink: 0;
          border-top: 1px solid rgba(148,163,184,.13);
          padding-top: 13px;
          color: #657386;
          font-size: 8px;
          letter-spacing: .15em;
        }

        /* MOTION */

        @keyframes omEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes omFloat {
          50% { transform: translateY(-7px); }
        }

        @keyframes omPulse {
          50% { opacity: .35; }
        }

        @keyframes omDash {
          to { stroke-dashoffset: -725; }
        }

        @keyframes omPathDash {
          to { stroke-dashoffset: -48; }
        }

        @keyframes omOrbit {
          to { transform: rotate(347deg); }
        }

        /* RESPONSIVE */

        @media(max-width: 700px) {
          .om-screen {
            padding: 20px 18px;
          }

          .om-brand-name strong {
            font-size: 12px;
          }

          .om-header-status {
            font-size: 6px;
          }

          .om-intro h1 {
            font-size: 32px;
          }

          .om-intro p {
            font-size: 10px;
          }

          .om-signature {
            height: 170px;
          }

          .om-logo-container {
            width: 185px;
          }

          .om-orbit-one {
            width: 290px;
            height: 80px;
          }

          .om-orbit-two {
            width: 320px;
            height: 100px;
          }

          .om-pipeline {
            width: 145%;
            margin-left: -22.5%;
          }

          .om-pipeline-svg text {
            font-size: 13px;
          }

          .om-loading {
            margin-top: 8px;
          }

          .om-footer {
            font-size: 6px;
          }
        }

        @media(max-height: 720px) {
          .om-screen {
            padding-top: 13px;
            padding-bottom: 12px;
          }

          .om-intro h1 {
            font-size: 31px;
          }

          .om-intro p {
            margin-top: 8px;
          }

          .om-signature {
            height: 145px;
          }

          .om-logo-container {
            width: 175px;
          }

          .om-workflow {
            margin-top: 5px;
          }

          .om-loading {
            margin-top: 7px;
          }
        }

        @media(prefers-reduced-motion: reduce) {
          .om-screen *,
          .om-screen *::before,
          .om-screen *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }

      `}</style>
    </div>
  )
}
