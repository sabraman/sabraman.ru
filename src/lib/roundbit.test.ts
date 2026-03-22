import { describe, expect, it } from "vitest";

import { buildRoundbitPaths } from "~/lib/roundbit";

describe("buildRoundbitPaths", () => {
	it("clamps full radii to the available box size", () => {
		const result = buildRoundbitPaths({
			corners: {
				bottomLeft: Number.POSITIVE_INFINITY,
				bottomRight: Number.POSITIVE_INFINITY,
				topLeft: Number.POSITIVE_INFINITY,
				topRight: Number.POSITIVE_INFINITY,
			},
			height: 40,
			width: 80,
		});

		expect(result.corners).toEqual({
			bottomLeft: 20,
			bottomRight: 20,
			topLeft: 20,
			topRight: 20,
		});
		expect(result.clipPath).toContain("0px 20px");
		expect(result.clipPath).toContain("20px 0px");
		expect(result.clipPath).not.toContain("NaN");
	});

	it("shrinks inset geometry without drifting arbitrary radii", () => {
		const result = buildRoundbitPaths({
			corners: {
				bottomLeft: 18,
				bottomRight: 18,
				topLeft: 18,
				topRight: 18,
			},
			height: 64,
			inset: 6,
			step: 4,
			width: 120,
		});

		expect(result.width).toBe(108);
		expect(result.height).toBe(52);
		expect(result.corners).toEqual({
			bottomLeft: 12,
			bottomRight: 12,
			topLeft: 12,
			topRight: 12,
		});
		expect(result.step).toBe(4);
		expect(result.clipPath).not.toContain("NaN");
	});

	it("keeps rotated corners symmetric for 20px at step 4", () => {
		const result = buildRoundbitPaths({
			corners: {
				bottomLeft: 20,
				bottomRight: 20,
				topLeft: 20,
				topRight: 20,
			},
			height: 80,
			step: 4,
			width: 160,
		});

		expect(result.clipPath.startsWith("polygon(")).toBe(true);
		expect(result.clipPath).toContain(
			"0px 20px, 4px 20px, 4px 16px, 4px 12px, 8px 12px, 8px 8px, 12px 8px, 12px 4px, 16px 4px, 20px 4px, 20px 0px",
		);
		expect(result.clipPath).toContain(
			"140px 0px, 140px 4px, 144px 4px, 148px 4px, 148px 8px, 152px 8px, 152px 12px, 156px 12px, 156px 16px, 156px 20px, 160px 20px",
		);
		expect(result.clipPath).toContain(
			"20px 80px, 20px 76px, 16px 76px, 12px 76px, 12px 72px, 8px 72px, 8px 68px, 4px 68px, 4px 64px, 4px 60px, 0px 60px",
		);
	});

	it("keeps tiny radii valid even when the step size is larger", () => {
		const result = buildRoundbitPaths({
			corners: {
				bottomLeft: 0,
				bottomRight: 1,
				topLeft: 1,
				topRight: 0,
			},
			height: 20,
			step: 4,
			width: 20,
		});

		expect(result.corners).toEqual({
			bottomLeft: 0,
			bottomRight: 1,
			topLeft: 1,
			topRight: 0,
		});
		expect(result.clipPath.startsWith("polygon(")).toBe(true);
		expect(result.clipPath).not.toContain("NaN");
	});

	it("keeps corner paths axis-aligned for arbitrary radii", () => {
		const result = buildRoundbitPaths({
			corners: {
				bottomLeft: 18,
				bottomRight: 18,
				topLeft: 18,
				topRight: 18,
			},
			height: 160,
			step: 2,
			width: 320,
		});

		expect(result.clipPath).toContain("6px 8px, 8px 8px, 8px 6px");
		expect(result.clipPath).not.toContain("6px 8px, 8px 6px");

		for (const [current, next] of getPolygonEdges(result.clipPath)) {
			expect(current.x === next.x || current.y === next.y).toBe(true);
		}
	});
});

function getPolygonEdges(clipPath: string) {
	const rawPoints = clipPath
		.replace(/^polygon\(/, "")
		.replace(/\)$/, "")
		.split(", ")
		.map((point) => {
			const [rawX, rawY] = point.split(" ");
			return {
				x: Number.parseFloat(rawX?.replace("px", "") ?? "0"),
				y: Number.parseFloat(rawY?.replace("px", "") ?? "0"),
			};
		});

	return rawPoints.map((point, index) => [
		point,
		rawPoints[(index + 1) % rawPoints.length]!,
	] as const);
}
