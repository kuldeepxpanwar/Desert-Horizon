"use client";

export default function SVGFilters() {
  return (
    <svg className="hidden absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Heat Haze Filter (Animated via SMIL) */}
        <filter id="heat-haze" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.1" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" values="0.01 0.1;0.015 0.12;0.01 0.1" dur="4s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Sand Ripple Filter for Buttons */}
        <filter id="sand-ripple" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.01" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.03 0.01;0.05 0.02;0.03 0.01" dur="2s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        
        {/* Static Sand Texture Mask (For text reveal) */}
        <filter id="sand-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 3 -1" />
        </filter>
      </defs>
    </svg>
  );
}
