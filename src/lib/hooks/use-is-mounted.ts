import { useSyncExternalStore } from "react";

export const emptySubscribe = () => () => {};

/**
 * `false` on the server and during hydration, `true` afterwards.
 *
 * Replacement for the `useState(false) + useEffect(() => setIsMounted(true))`
 * pattern (which triggers a cascading render and is flagged by
 * `react/set-state-in-effect`).
 */
export function useIsMounted(): boolean {
	return useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);
}
