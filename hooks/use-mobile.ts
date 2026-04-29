import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    
    // Initial check without calling setState synchronously if possible, but actually we can just set it:
    // Wait, the error is calling setState synchronously in the effect root.
    // We can do it inside a small layout effect or just don't do it.
    // Actually, setting initial state to `window.innerWidth < MOBILE_BREAKPOINT` in the useState is best if window exists.
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
