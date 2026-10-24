/**
 * Small deterministic PRNG (mulberry32).
 *
 * Use it instead of `Math.random()` for "random" visuals inside components:
 * seeded values stay stable across re-renders and hydration, which keeps
 * renders pure and avoids server/client mismatches.
 */
export function mulberry32(seed: number): () => number {
	let state = seed | 0;

	return () => {
		state = (state + 0x6d2b79f5) | 0;
		let t = Math.imul(state ^ (state >>> 15), 1 | state);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
