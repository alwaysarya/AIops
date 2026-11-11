import React from 'react'

const Logo = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        {/* Purple capsule gradient */}
        <linearGradient
          id="opsCapsuleGradient"
          x1="35"
          y1="45"
          x2="160"
          y2="155"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#D8A0FF" />
          <stop offset="35%" stopColor="#A855F7" />
          <stop offset="70%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>

        {/* Soft purple glow */}
        <filter
          id="opsPurpleGlow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="9" />
        </filter>

        {/* White circuit glow */}
        <filter
          id="opsWhiteGlow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Purple capsule glow */}
      <rect
        x="37"
        y="65"
        width="126"
        height="70"
        rx="35"
        transform="rotate(-45 100 100)"
        fill="#9333EA"
        opacity="0.65"
        filter="url(#opsPurpleGlow)"
      />

      {/* Main diagonal capsule */}
      <rect
        x="37"
        y="65"
        width="126"
        height="70"
        rx="35"
        transform="rotate(-45 100 100)"
        fill="url(#opsCapsuleGradient)"
      />

      {/* Capsule highlight */}
      <path
        d="M62 117 C75 94 95 75 117 64"
        stroke="#E9D5FF"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.18"
      />

      {/* Circuit line glow */}
      <g
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
        filter="url(#opsWhiteGlow)"
      >
        <path d="M55 43 L55 68 C55 83 62 89 76 98 C91 108 103 120 112 132" />
        <path d="M112 132 C116 119 122 108 136 102 C148 97 153 88 158 80" />
        <path d="M112 132 C101 141 91 151 86 161" />
      </g>

      {/* Main white circuit connections */}
      <g
        stroke="#FFFFFF"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M55 43 L55 68 C55 83 62 89 76 98 C91 108 103 120 112 132" />

        <path d="M112 132 C116 119 122 108 136 102 C148 97 153 88 158 80" />

        <path d="M112 132 C101 141 91 151 86 161" />
      </g>

      {/* Circuit nodes - hollow white rings */}
      <g
        stroke="#FFFFFF"
        strokeWidth="5.5"
        fill="#08030F"
      >
        {/* Top node */}
        <circle cx="55" cy="35" r="10" />

        {/* Right node */}
        <circle cx="161" cy="75" r="10" />

        {/* Bottom node */}
        <circle cx="84" cy="165" r="10" />
      </g>
    </svg>
  )
}

export default Logo
