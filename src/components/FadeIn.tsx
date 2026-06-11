import { useEffect, useState, type ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  /** Delay before the fade-in starts, in milliseconds. */
  delay?: number
  /** Duration of the opacity transition, in milliseconds. */
  duration?: number
  className?: string
}

/**
 * Wraps its children and fades them in (opacity 0 -> 1) after `delay` ms,
 * using a configurable `duration`. Built on a setTimeout + React state and
 * Tailwind's `transition-opacity` utility.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className = '',
}: FadeInProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
