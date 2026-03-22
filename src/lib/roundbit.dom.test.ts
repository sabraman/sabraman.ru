// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
	buildRoundbitPaths,
	initRoundbit,
	type RoundbitController,
} from "~/lib/roundbit";

class ResizeObserverMock {
	disconnect() {}
	observe() {}
	unobserve() {}
}

describe("initRoundbit", () => {
	const controllers: RoundbitController[] = [];

	beforeEach(() => {
		document.head.innerHTML = "";
		document.body.innerHTML = "";
		globalThis.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;
	});

	afterEach(() => {
		while (controllers.length > 0) {
			controllers.pop()?.disconnect();
		}

		document.head.innerHTML = "";
		document.body.innerHTML = "";
	});

	it("writes a clip-path for direct mode elements", () => {
		const element = document.createElement("button");
		element.className = "roundbit-lg";
		element.style.setProperty("--roundbit-step", "4px");
		setUniformRadiusStyles(element, "18px");
		setElementRect(element, { height: 64, width: 120 });
		document.body.append(element);

		const controller = initRoundbit(document);
		controllers.push(controller);

		expect(element.style.getPropertyValue("--roundbit-clip-path")).toBe(
			buildRoundbitPaths({
				corners: {
					bottomLeft: 18,
					bottomRight: 18,
					topLeft: 18,
					topRight: 18,
				},
				height: 64,
				step: 4,
				width: 120,
			}).clipPath,
		);
	});

	it("does not recurse on its own style writes", async () => {
		const element = document.createElement("div");
		element.className = "roundbit-xl";
		setUniformRadiusStyles(element, "24px");
		const rectCallCount = setElementRect(element, { height: 72, width: 144 });
		document.body.append(element);

		const controller = initRoundbit(document);
		controllers.push(controller);

		await flushDomWork();
		await flushDomWork();

		expect(rectCallCount.value).toBe(1);
	});

	it("recomputes percentage radii after a refresh", () => {
		const element = document.createElement("div");
		element.className = "roundbit";
		setUniformRadiusStyles(element, "50%");
		document.body.append(element);

		setElementRect(element, { height: 80, width: 120 });
		const controller = initRoundbit(document);
		controllers.push(controller);

		expect(element.style.getPropertyValue("--roundbit-clip-path")).toBe(
			buildRoundbitPaths({
				corners: {
					bottomLeft: 40,
					bottomRight: 40,
					topLeft: 40,
					topRight: 40,
				},
				height: 80,
				step: 2,
				width: 120,
			}).clipPath,
		);

		setElementRect(element, { height: 60, width: 60 });
		controller.refresh();

		expect(element.style.getPropertyValue("--roundbit-clip-path")).toBe(
			buildRoundbitPaths({
				corners: {
					bottomLeft: 30,
					bottomRight: 30,
					topLeft: 30,
					topRight: 30,
				},
				height: 60,
				step: 2,
				width: 60,
			}).clipPath,
		);
	});

	it("recomputes when inline styles change after initialization", async () => {
		const element = document.createElement("div");
		element.className = "roundbit";
		setUniformRadiusStyles(element, "12px");
		setElementRect(element, { height: 60, width: 100 });
		document.body.append(element);

		const controller = initRoundbit(document);
		controllers.push(controller);

		await flushDomWork();
		setUniformRadiusStyles(element, "20px");
		await flushDomWork();

		expect(element.style.getPropertyValue("--roundbit-clip-path")).toBe(
			buildRoundbitPaths({
				corners: {
					bottomLeft: 20,
					bottomRight: 20,
					topLeft: 20,
					topRight: 20,
				},
				height: 60,
				step: 2,
				width: 100,
			}).clipPath,
		);
	});

	it("follows resolved corner precedence and reacts to dir changes", async () => {
		injectRoundbitTestStyles();

		const wrapper = document.createElement("div");
		wrapper.setAttribute("dir", "ltr");

		const element = document.createElement("div");
		element.className = "roundbit-lg roundbit-tl-sm roundbit-e-[18px]";
		element.style.setProperty("--roundbit-step", "2px");
		setElementRect(element, { height: 60, width: 100 });

		wrapper.append(element);
		document.body.append(wrapper);

		const controller = initRoundbit(document);
		controllers.push(controller);

		expect(element.style.getPropertyValue("--roundbit-clip-path")).toBe(
			buildRoundbitPaths({
				corners: {
					bottomLeft: 16,
					bottomRight: 18,
					topLeft: 4,
					topRight: 18,
				},
				height: 60,
				step: 2,
				width: 100,
			}).clipPath,
		);

		wrapper.setAttribute("dir", "rtl");
		await flushDomWork();

		expect(element.style.getPropertyValue("--roundbit-clip-path")).toBe(
			buildRoundbitPaths({
				corners: {
					bottomLeft: 18,
					bottomRight: 16,
					topLeft: 18,
					topRight: 16,
				},
				height: 60,
				step: 2,
				width: 100,
			}).clipPath,
		);
	});

	it("proxies frame borders, outlines, shadows, and clears stale content state", async () => {
		const frame = document.createElement("div");
		frame.className = "roundbit-frame";
		frame.style.border = "2px solid rgb(15, 23, 42)";
		frame.style.outlineColor = "rgb(255, 255, 255)";
		frame.style.outlineOffset = "0px";
		frame.style.outlineStyle = "solid";
		frame.style.outlineWidth = "1px";
		frame.style.boxShadow = "0px 12px 24px rgba(0, 0, 0, 0.28)";
		setUniformRadiusStyles(frame, "20px");

		const content = document.createElement("div");
		content.className = "roundbit-content";
		frame.append(content);

		setElementRect(frame, { height: 80, width: 140 });
		document.body.append(frame);

		const controller = initRoundbit(document);
		controllers.push(controller);

		expect(frame.dataset.roundbitProxyBorder).toBe("true");
		expect(frame.dataset.roundbitProxyOutline).toBe("true");
		expect(frame.dataset.roundbitProxyShadow).toBe("true");
		expect(frame.style.getPropertyValue("--roundbit-content-inset")).toBe(
			"4px",
		);
		expect(frame.style.getPropertyValue("--roundbit-outline-width")).toBe(
			"2px",
		);
		expect(frame.style.getPropertyValue("--roundbit-border-image")).toContain(
			"data:image/svg+xml,",
		);
		expect(frame.style.getPropertyValue("--roundbit-shadow-filter")).toContain(
			"drop-shadow(",
		);
		expect(content.style.getPropertyValue("--roundbit-inner-clip-path")).toBe(
			frame.style.getPropertyValue("--roundbit-inner-clip-path"),
		);
		expect(
			content.style.getPropertyValue("--roundbit-inner-clip-path"),
		).toContain("polygon(24px 4px, 116px 4px");
		expect(
			content.style.getPropertyValue("--roundbit-inner-clip-path"),
		).toContain("136px 24px, 136px 56px");
		expect(
			content.style.getPropertyValue("--roundbit-inner-clip-path"),
		).toContain("24px 76px, 24px 74px");

		frame.className = "";
		await flushDomWork();

		expect(frame.style.getPropertyValue("--roundbit-clip-path")).toBe("");
		expect(frame.style.getPropertyValue("--roundbit-border-image")).toBe("");
		expect(content.style.getPropertyValue("--roundbit-inner-clip-path")).toBe(
			"",
		);
	});

	it("keeps border and outline on separate snapped layers in frame mode", () => {
		const frame = document.createElement("div");
		frame.className = "roundbit-frame";
		frame.style.border = "1px solid rgb(15, 23, 42)";
		frame.style.outlineColor = "rgb(255, 255, 255)";
		frame.style.outlineOffset = "0px";
		frame.style.outlineStyle = "solid";
		frame.style.outlineWidth = "1px";
		setUniformRadiusStyles(frame, "20px");

		const content = document.createElement("div");
		content.className = "roundbit-content";
		frame.append(content);

		setElementRect(frame, { height: 80, width: 140 });
		document.body.append(frame);

		const controller = initRoundbit(document);
		controllers.push(controller);

		expect(frame.style.getPropertyValue("--roundbit-outline-width")).toBe(
			"2px",
		);
		expect(frame.style.getPropertyValue("--roundbit-content-inset")).toBe(
			"4px",
		);
		expect(
			frame.style.getPropertyValue("--roundbit-middle-clip-path"),
		).toContain("polygon(22px 2px");
		expect(
			frame.style.getPropertyValue("--roundbit-inner-clip-path"),
		).toContain("polygon(24px 4px");
	});

	it("stabilizes frame proxy state across repeated refreshes", () => {
		const frame = document.createElement("div");
		frame.className = "roundbit-frame";
		frame.style.border = "1px solid rgb(15, 23, 42)";
		frame.style.outlineColor = "rgb(255, 255, 255)";
		frame.style.outlineOffset = "0px";
		frame.style.outlineStyle = "solid";
		frame.style.outlineWidth = "1px";
		frame.style.boxShadow = "0px 10px 0px rgba(0, 0, 0, 0.18)";
		setUniformRadiusStyles(frame, "20px");

		const content = document.createElement("div");
		content.className = "roundbit-content";
		frame.append(content);

		setElementRect(frame, { height: 80, width: 140 });
		document.body.append(frame);

		const controller = initRoundbit(document);
		controllers.push(controller);

		const states = new Set<string>();

		for (let index = 0; index < 6; index += 1) {
			controller.refresh();
			states.add(
				JSON.stringify({
					border: frame.dataset.roundbitProxyBorder,
					clip: frame.style.getPropertyValue("--roundbit-clip-path"),
					contentInset: frame.style.getPropertyValue(
						"--roundbit-content-inset",
					),
					inner: frame.style.getPropertyValue("--roundbit-inner-clip-path"),
					middle: frame.style.getPropertyValue("--roundbit-middle-clip-path"),
					outline: frame.dataset.roundbitProxyOutline,
					shadow: frame.dataset.roundbitProxyShadow,
				}),
			);
		}

		expect(states.size).toBe(1);
	});

	it("snaps roundbit elements to the nearest device-pixel grid", () => {
		const frame = document.createElement("div");
		frame.className = "roundbit-frame";
		frame.style.border = "2px solid rgb(15, 23, 42)";
		setUniformRadiusStyles(frame, "20px");

		const content = document.createElement("div");
		content.className = "roundbit-content";
		frame.append(content);

		setElementRect(frame, {
			height: 80,
			left: 10.25,
			top: 20.25,
			width: 140,
		});
		document.body.append(frame);

		const controller = initRoundbit(document);
		controllers.push(controller);

		expect(frame.dataset.roundbitSnapped).toBe("true");
		expect(frame.style.getPropertyValue("--roundbit-snap-x")).toBe("-0.25px");
		expect(frame.style.getPropertyValue("--roundbit-snap-y")).toBe("-0.25px");
	});

	it("keeps square-side frame insets orthogonal when only the right edge is rounded", () => {
		const frame = document.createElement("div");
		frame.className = "roundbit-frame";
		frame.style.border = "2px solid rgb(15, 23, 42)";
		frame.style.outlineColor = "rgb(255, 255, 255)";
		frame.style.outlineOffset = "0px";
		frame.style.outlineStyle = "solid";
		frame.style.outlineWidth = "1px";
		frame.style.borderTopRightRadius = "40px";
		frame.style.borderBottomRightRadius = "40px";
		frame.style.borderTopLeftRadius = "0px";
		frame.style.borderBottomLeftRadius = "0px";

		const content = document.createElement("div");
		content.className = "roundbit-content";
		frame.append(content);

		setElementRect(frame, { height: 176, width: 320 });
		document.body.append(frame);

		const controller = initRoundbit(document);
		controllers.push(controller);

		expect(
			frame.style.getPropertyValue("--roundbit-middle-clip-path"),
		).toContain("polygon(2px 2px, 278px 2px, 278px 4px");
		expect(
			frame.style.getPropertyValue("--roundbit-middle-clip-path"),
		).not.toContain("polygon(2px 2px, 278px 4px");
		expect(
			frame.style.getPropertyValue("--roundbit-inner-clip-path"),
		).toContain("polygon(4px 4px, 276px 4px, 276px 6px");
		expect(
			frame.style.getPropertyValue("--roundbit-inner-clip-path"),
		).not.toContain("polygon(4px 4px, 280px 6px");
	});

	it("uses dedicated roundbit border utilities ahead of plain native fallback", () => {
		const frame = document.createElement("div");
		frame.className = "roundbit-frame";
		frame.style.setProperty("--roundbit-border-source", "1");
		frame.style.border = "2px solid rgb(14, 165, 233)";
		setUniformRadiusStyles(frame, "20px");

		const content = document.createElement("div");
		content.className = "roundbit-content";
		frame.append(content);

		setElementRect(frame, { height: 80, width: 140 });
		document.body.append(frame);

		const controller = initRoundbit(document);
		controllers.push(controller);

		expect(frame.dataset.roundbitProxyBorder).toBe("true");
		expect(decodeRoundbitBorderImage(frame)).toContain(
			'fill="rgb(14, 165, 233)"',
		);
	});

	it("renders dashed and double frame borders for uniform roundbit borders", () => {
		const dashedFrame = document.createElement("div");
		dashedFrame.className = "roundbit-frame";
		dashedFrame.style.setProperty("--roundbit-border-source", "1");
		dashedFrame.style.border = "2px dashed rgb(14, 165, 233)";
		setUniformRadiusStyles(dashedFrame, "20px");
		const dashedContent = document.createElement("div");
		dashedContent.className = "roundbit-content";
		dashedFrame.append(dashedContent);
		setElementRect(dashedFrame, { height: 80, width: 140 });
		document.body.append(dashedFrame);

		const doubleFrame = document.createElement("div");
		doubleFrame.className = "roundbit-frame";
		doubleFrame.style.setProperty("--roundbit-border-source", "1");
		doubleFrame.style.border = "4px double rgb(14, 165, 233)";
		setUniformRadiusStyles(doubleFrame, "20px");
		const doubleContent = document.createElement("div");
		doubleContent.className = "roundbit-content";
		doubleFrame.append(doubleContent);
		setElementRect(doubleFrame, { height: 80, width: 140 });
		document.body.append(doubleFrame);

		const controller = initRoundbit(document);
		controllers.push(controller);

		expect(decodeRoundbitBorderImage(dashedFrame)).toContain(
			"stroke-dasharray=",
		);
		expect(
			decodeRoundbitBorderImage(doubleFrame).match(/<path /g)?.length,
		).toBe(2);
	});

	it("suppresses frame borders when the dedicated border style is none or hidden", () => {
		const noneFrame = document.createElement("div");
		noneFrame.className = "roundbit-frame";
		noneFrame.style.setProperty("--roundbit-border-source", "1");
		noneFrame.style.border = "2px none rgb(14, 165, 233)";
		setUniformRadiusStyles(noneFrame, "20px");
		const noneContent = document.createElement("div");
		noneContent.className = "roundbit-content";
		noneFrame.append(noneContent);
		setElementRect(noneFrame, { height: 80, width: 140 });
		document.body.append(noneFrame);

		const hiddenFrame = document.createElement("div");
		hiddenFrame.className = "roundbit-frame";
		hiddenFrame.style.setProperty("--roundbit-border-source", "1");
		hiddenFrame.style.border = "2px hidden rgb(14, 165, 233)";
		setUniformRadiusStyles(hiddenFrame, "20px");
		const hiddenContent = document.createElement("div");
		hiddenContent.className = "roundbit-content";
		hiddenFrame.append(hiddenContent);
		setElementRect(hiddenFrame, { height: 80, width: 140 });
		document.body.append(hiddenFrame);

		const controller = initRoundbit(document);
		controllers.push(controller);

		expect(noneFrame.dataset.roundbitProxyBorder).toBe("false");
		expect(hiddenFrame.dataset.roundbitProxyBorder).toBe("false");
		expect(noneFrame.style.getPropertyValue("--roundbit-border-image")).toBe(
			"none",
		);
		expect(hiddenFrame.style.getPropertyValue("--roundbit-border-image")).toBe(
			"none",
		);
	});
});

function injectRoundbitTestStyles() {
	const style = document.createElement("style");
	style.textContent = `
		.roundbit-lg {
			border-bottom-left-radius: 16px;
			border-bottom-right-radius: 16px;
			border-top-left-radius: 16px;
			border-top-right-radius: 16px;
		}

		.roundbit-tl-sm {
			border-top-left-radius: 4px;
		}

		[dir="ltr"] .roundbit-e-\\[18px\\] {
			border-bottom-right-radius: 18px;
			border-top-right-radius: 18px;
		}

		[dir="rtl"] .roundbit-e-\\[18px\\] {
			border-bottom-left-radius: 18px;
			border-top-left-radius: 18px;
		}
	`;
	document.head.append(style);
}

function setElementRect(
	element: HTMLElement,
	{
		height,
		left = 0,
		top = 0,
		width,
	}: { height: number; left?: number; top?: number; width: number },
) {
	const callCount = { value: 0 };

	Object.defineProperty(element, "offsetHeight", {
		configurable: true,
		get: () => height,
	});

	Object.defineProperty(element, "offsetWidth", {
		configurable: true,
		get: () => width,
	});

	Object.defineProperty(element, "getBoundingClientRect", {
		configurable: true,
		value: () => {
			callCount.value += 1;

			return {
				bottom: top + height,
				height,
				left,
				right: left + width,
				toJSON() {
					return null;
				},
				top,
				width,
				x: left,
				y: top,
			} satisfies DOMRect;
		},
	});

	return callCount;
}

async function flushDomWork() {
	await new Promise((resolve) => {
		window.setTimeout(resolve, 0);
	});
}

function setUniformRadiusStyles(element: HTMLElement, value: string) {
	element.style.borderBottomLeftRadius = value;
	element.style.borderBottomRightRadius = value;
	element.style.borderTopLeftRadius = value;
	element.style.borderTopRightRadius = value;
}

function decodeRoundbitBorderImage(frame: HTMLElement) {
	const rawValue = frame.style.getPropertyValue("--roundbit-border-image");
	const encodedSvg = rawValue.match(/data:image\/svg\+xml,([^"]+)/)?.[1] ?? "";
	return decodeURIComponent(encodedSvg);
}
