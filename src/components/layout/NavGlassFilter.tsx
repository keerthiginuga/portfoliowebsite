/**
 * SVG filter defs for `url(#nav-glass-filter)` in portfolio-v2.css (nav glass backdrop).
 */
export function NavGlassFilter() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
      <defs>
        <filter
          id="nav-glass-filter"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65 0.65"
            numOctaves={4}
            seed={2}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="18" in="noise" result="saturatedNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="saturatedNoise"
            scale={6}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
        </filter>
      </defs>
    </svg>
  );
}
