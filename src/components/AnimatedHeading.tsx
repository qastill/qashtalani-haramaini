import { useEffect, useState, type CSSProperties } from 'react'

interface AnimatedHeadingProps {
  /** Text to animate. Use "\n" to split into separate lines. */
  text: string
  className?: string
  style?: CSSProperties
  /** Initial delay before the whole animation begins, in milliseconds. */
  initialDelay?: number
  /** Per-character stagger step, in milliseconds. */
  charDelay?: number
  /** Per-character transition duration, in milliseconds. */
  duration?: number
}

/**
 * Splits `text` by "\n" into lines, then each line into individual characters.
 * Every character is rendered as an inline-block <span> that transitions from
 * opacity 0 / translateX(-18px) to opacity 1 / translateX(0). Each character's
 * delay is staggered as:
 *   (lineIndex * lineLength * charDelay) + (charIndex * charDelay)
 * and the whole sequence is kicked off via React state after `initialDelay`.
 */
export default function AnimatedHeading({
  text,
  className = '',
  style,
  initialDelay = 200,
  charDelay = 30,
  duration = 500,
}: AnimatedHeadingProps) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), initialDelay)
    return () => clearTimeout(timer)
  }, [initialDelay])

  const lines = text.split('\n')

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => {
        const lineLength = line.length
        return (
          <span key={lineIndex} className="block">
            {line.split('').map((char, charIndex) => {
              const stagger =
                lineIndex * lineLength * charDelay + charIndex * charDelay
              return (
                <span
                  key={charIndex}
                  className="inline-block"
                  style={{
                    opacity: started ? 1 : 0,
                    transform: started ? 'translateX(0)' : 'translateX(-18px)',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: `${duration}ms`,
                    transitionTimingFunction: 'ease',
                    transitionDelay: `${stagger}ms`,
                  }}
                >
                  {char === ' ' ? ' ' : char}
                </span>
              )
            })}
          </span>
        )
      })}
    </h1>
  )
}
