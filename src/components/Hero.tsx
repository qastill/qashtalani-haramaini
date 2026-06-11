import AnimatedHeading from './AnimatedHeading'
import FadeIn from './FadeIn'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden text-white">
      {/* Full-screen background video — raw, no overlay/dimming */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Foreground UI */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <header className="px-6 md:px-12 lg:px-16 pt-6">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            <span className="text-2xl font-semibold tracking-tight">VEX</span>

            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="#" className="transition-colors hover:text-gray-300">Story</a>
              <a href="#" className="transition-colors hover:text-gray-300">Investing</a>
              <a href="#" className="transition-colors hover:text-gray-300">Building</a>
              <a href="#" className="transition-colors hover:text-gray-300">Advisory</a>
            </div>

            <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100">
              Start a Chat
            </button>
          </nav>
        </header>

        {/* Hero content pinned to the bottom of the viewport */}
        <div className="px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 flex-1 flex flex-col justify-end">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            {/* Left column — main content */}
            <div>
              <AnimatedHeading
                text={'Shaping tomorrow\nwith vision and action.'}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4"
                style={{ letterSpacing: '-0.04em' }}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-medium">
                    Start a Chat
                  </button>
                  <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-white hover:text-black">
                    Explore Now
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right column — tag */}
            <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                  <span className="text-lg md:text-xl lg:text-2xl font-light">
                    Investing. Building. Advisory.
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
