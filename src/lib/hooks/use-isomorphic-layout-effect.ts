import { useEffect, useLayoutEffect } from "react";

/**
 * A custom hook that maps to `useLayoutEffect` on the client and `useEffect` on the server
 * to prevent hydration/SSR console warnings.
 */
export const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;
