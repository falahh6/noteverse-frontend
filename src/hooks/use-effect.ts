import { useRef, useEffect as useEffectt } from 'react'

/**
 * A custom hook that works like `useEffect` but ensures the callback runs only once.
 * @param callback - The function to execute.
 * @param dependencies - Dependency array (optional). Even if they change, the callback will run only once.
 */
const useEffect = (callback: () => void, dependencies: any[] = []) => {
  const hasRun = useRef(false)

  useEffectt(() => {
    if (hasRun.current) return
    callback()
    hasRun.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export default useEffect
