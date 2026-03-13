import { isIP } from "node:net";
import { NextResponse } from "next/server";

const LEGACY_SAFARI_USER_AGENT =
	"Mozilla/5.0 (iPhone; CPU iPhone OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3";
const PROXY_PATH = "/api/safari-proxy";

function isBlockedHostname(hostname: string) {
	const normalized = hostname.toLowerCase();

	if (
		normalized === "localhost" ||
		normalized === "::1" ||
		normalized === "0.0.0.0" ||
		normalized.endsWith(".local") ||
		normalized.startsWith("127.")
	) {
		return true;
	}

	if (isIP(normalized) === 4) {
		const [first = Number.NaN, second = Number.NaN] = normalized
			.split(".")
			.map(Number);
		if (
			first === 10 ||
			first === 127 ||
			(first === 169 && second === 254) ||
			(first === 172 && second >= 16 && second <= 31) ||
			(first === 192 && second === 168)
		) {
			return true;
		}
	}

	if (isIP(normalized) === 6) {
		return (
			normalized === "::1" ||
			normalized.startsWith("fc") ||
			normalized.startsWith("fd") ||
			normalized.startsWith("fe80:")
		);
	}

	return false;
}

function escapeHtmlAttribute(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll('"', "&quot;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

function unwrapProxyTargetUrl(value: string) {
	let currentValue = value;
	const visited = new Set<string>();

	while (!visited.has(currentValue)) {
		visited.add(currentValue);

		try {
			const parsed = new URL(currentValue);
			if (
				parsed.pathname !== PROXY_PATH &&
				!parsed.pathname.endsWith(PROXY_PATH)
			) {
				return currentValue;
			}

			const nestedUrl = parsed.searchParams.get("url");
			if (!nestedUrl) {
				return currentValue;
			}

			currentValue = nestedUrl;
		} catch {
			return currentValue;
		}
	}

	return currentValue;
}

function buildProxyDocument(title: string, description: string) {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtmlAttribute(title)}</title>
    <style>
      html, body {
        margin: 0;
        min-height: 100%;
        background: #f2f2f2;
        color: #111;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      }

      body {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }

      main {
        max-width: 280px;
        text-align: center;
      }

      h1 {
        margin: 0 0 12px;
        font-size: 24px;
        line-height: 1;
      }

      p {
        margin: 0;
        color: #5b6472;
        font-size: 14px;
        line-height: 1.45;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtmlAttribute(title)}</h1>
      <p>${escapeHtmlAttribute(description)}</p>
    </main>
  </body>
</html>`;
}

function buildBridgeScript(targetUrl: string, proxyOrigin: string) {
	const serializedTargetUrl = JSON.stringify(targetUrl);
	const serializedProxyPath = JSON.stringify(PROXY_PATH);
	const serializedProxyOrigin = JSON.stringify(proxyOrigin);

	return `(() => {
  const proxyPath = ${serializedProxyPath};
  const proxyOrigin = ${serializedProxyOrigin};
  let currentUrl = ${serializedTargetUrl};
  const createMemoryStorage = () => {
    const store = new Map();
    return {
      getItem(key) {
        return store.has(String(key)) ? store.get(String(key)) : null;
      },
      setItem(key, value) {
        store.set(String(key), String(value));
      },
      removeItem(key) {
        store.delete(String(key));
      },
      clear() {
        store.clear();
      },
      key(index) {
        return [...store.keys()][index] ?? null;
      },
      get length() {
        return store.size;
      },
    };
  };
  const localMemoryStorage = createMemoryStorage();
  const sessionMemoryStorage = createMemoryStorage();

  const safeDefine = (target, property, descriptor) => {
    try {
      Object.defineProperty(target, property, {
        configurable: true,
        enumerable: false,
        ...descriptor,
      });
    } catch {}
  };

  safeDefine(window, "localStorage", {
    get: () => localMemoryStorage,
  });
  safeDefine(window, "sessionStorage", {
    get: () => sessionMemoryStorage,
  });
  safeDefine(Document.prototype, "cookie", {
    get: () => "",
    set: () => true,
  });
  safeDefine(document, "cookie", {
    get: () => "",
    set: () => true,
  });
  safeDefine(navigator, "sendBeacon", {
    value: () => false,
  });

  const unwrapProxyUrl = (value) => {
    try {
      const parsed = new URL(String(value), currentUrl);
      if (
        (parsed.origin === proxyOrigin && parsed.pathname === proxyPath) ||
        parsed.pathname.endsWith(proxyPath)
      ) {
        const nestedUrl = parsed.searchParams.get("url");
        if (nestedUrl) {
          return unwrapProxyUrl(nestedUrl);
        }
      }

      return parsed.toString();
    } catch {
      return String(value);
    }
  };

  const toAbsoluteUrl = (value) => {
    try {
      return new URL(unwrapProxyUrl(value), currentUrl).toString();
    } catch {
      return null;
    }
  };

  const toProxyUrl = (value) => \`\${proxyOrigin}\${proxyPath}?url=\${encodeURIComponent(value)}\`;

  const postState = (kind) => {
    try {
      window.parent.postMessage(
        {
          type: "legacy-safari-proxy",
          kind,
          title: document.title || "",
          url: currentUrl,
        },
        "*",
      );
    } catch {}
  };

  const navigateTo = (value) => {
    const absoluteUrl = toAbsoluteUrl(value);
    if (!absoluteUrl) {
      return;
    }

    const parsed = new URL(absoluteUrl);
    if (!/^https?:$/.test(parsed.protocol)) {
      window.open(absoluteUrl, "_blank", "noopener,noreferrer");
      return;
    }

    currentUrl = absoluteUrl;
    window.location.assign(toProxyUrl(absoluteUrl));
  };

  document.addEventListener(
    "click",
    (event) => {
      const target =
        event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!target) {
        return;
      }

      const href = target.getAttribute("href");
      const targetAttr = (target.getAttribute("target") || "").toLowerCase();
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        target.hasAttribute("download") ||
        targetAttr === "_blank" ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      navigateTo(href);
    },
    true,
  );

  document.addEventListener(
    "submit",
    (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const method = (form.getAttribute("method") || "get").toLowerCase();
      if (method !== "get") {
        return;
      }

      const action = form.getAttribute("action") || currentUrl;
      const absoluteUrl = toAbsoluteUrl(action);
      if (!absoluteUrl) {
        return;
      }

      event.preventDefault();

      const nextUrl = new URL(absoluteUrl);
      const formData = new FormData(form);
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          nextUrl.searchParams.set(key, value);
        }
      }

      navigateTo(nextUrl.toString());
    },
    true,
  );

  for (const methodName of ["pushState", "replaceState"]) {
    const originalMethod = history[methodName].bind(history);
    history[methodName] = (...args) => {
      if (typeof args[2] === "string") {
        const absoluteUrl = toAbsoluteUrl(args[2]);
        if (absoluteUrl) {
          currentUrl = absoluteUrl;
        }
      }

      let result;
      try {
        result =
          args.length >= 2
            ? originalMethod(args[0], args[1] ?? "", undefined)
            : originalMethod(...args);
      } catch {
        result = undefined;
      }
      queueMicrotask(() => postState(methodName));
      return result;
    };
  }

  const titleElement = document.querySelector("title");
  if (titleElement) {
    const titleObserver = new MutationObserver(() => postState("title"));
    titleObserver.observe(titleElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => postState("domcontentloaded"), {
      once: true,
    });
  } else {
    postState("ready");
  }

  window.addEventListener("hashchange", () => {
    const [baseUrl] = currentUrl.split("#");
    currentUrl = \`\${baseUrl}\${window.location.hash}\`;
    postState("hashchange");
  });

  window.addEventListener("load", () => postState("load"), { once: true });
})();`.replaceAll("</script>", "<\\/script>");
}

function rewriteHtmlDocument(
	html: string,
	targetUrl: string,
	proxyOrigin: string,
) {
	const cleanedHtml = html
		.replace(/<base[^>]*>/gi, "")
		.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
		.replace(/<script\b[^>]*\/>/gi, "")
		.replace(
			/<link[^>]+rel=["'][^"']*(?:modulepreload|preload|prefetch|preconnect|dns-prefetch|manifest|apple-touch-startup-image)[^"']*["'][^>]*>/gi,
			"",
		)
		.replace(/<meta[^>]+http-equiv=["']content-security-policy["'][^>]*>/gi, "")
		.replace(/<meta[^>]+http-equiv=["']x-frame-options["'][^>]*>/gi, "");

	const injection = [
		`<base href="${escapeHtmlAttribute(targetUrl)}" />`,
		'<meta name="referrer" content="no-referrer" />',
		`<script>${buildBridgeScript(targetUrl, proxyOrigin)}</script>`,
	].join("");

	if (/<head[^>]*>/i.test(cleanedHtml)) {
		return cleanedHtml.replace(/<head([^>]*)>/i, `<head$1>${injection}`);
	}

	return `<!DOCTYPE html><html><head>${injection}</head><body>${cleanedHtml}</body></html>`;
}

function responseHeaders(contentType: string) {
	return {
		"Cache-Control": "no-store, max-age=0",
		"Content-Type": contentType,
	};
}

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const targetUrlParam = requestUrl.searchParams.get("url");

	if (!targetUrlParam) {
		return new NextResponse(
			buildProxyDocument(
				"Safari Proxy",
				"No URL was provided to the browser proxy.",
			),
			{
				status: 400,
				headers: responseHeaders("text/html; charset=utf-8"),
			},
		);
	}

	let targetUrl: URL;
	try {
		targetUrl = new URL(unwrapProxyTargetUrl(targetUrlParam));
	} catch {
		return new NextResponse(
			buildProxyDocument("Safari Proxy", "That address is invalid."),
			{
				status: 400,
				headers: responseHeaders("text/html; charset=utf-8"),
			},
		);
	}

	if (!/^https?:$/.test(targetUrl.protocol)) {
		return new NextResponse(
			buildProxyDocument(
				"Safari Proxy",
				"Only http and https addresses can be opened here.",
			),
			{
				status: 400,
				headers: responseHeaders("text/html; charset=utf-8"),
			},
		);
	}

	if (isBlockedHostname(targetUrl.hostname)) {
		return new NextResponse(
			buildProxyDocument(
				"Safari Proxy",
				"Private and local network addresses stay outside the browser proxy.",
			),
			{
				status: 403,
				headers: responseHeaders("text/html; charset=utf-8"),
			},
		);
	}

	let upstreamResponse: Response;
	try {
		upstreamResponse = await fetch(targetUrl.toString(), {
			headers: {
				Accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
				"Accept-Language":
					request.headers.get("accept-language") ?? "en-US,en;q=0.9",
				"Upgrade-Insecure-Requests": "1",
				"User-Agent": LEGACY_SAFARI_USER_AGENT,
			},
			redirect: "follow",
			signal: AbortSignal.timeout(12000),
		});
	} catch {
		return new NextResponse(
			buildProxyDocument(
				"Safari Proxy",
				"This page could not be loaded through the browser proxy.",
			),
			{
				status: 502,
				headers: responseHeaders("text/html; charset=utf-8"),
			},
		);
	}

	const finalUrl = new URL(upstreamResponse.url || targetUrl.toString());
	if (isBlockedHostname(finalUrl.hostname)) {
		return new NextResponse(
			buildProxyDocument(
				"Safari Proxy",
				"That redirect resolves to a private or local address, so it stays outside the browser proxy.",
			),
			{
				status: 403,
				headers: responseHeaders("text/html; charset=utf-8"),
			},
		);
	}

	const contentType = upstreamResponse.headers.get("content-type") ?? "";

	if (
		contentType.includes("text/html") ||
		contentType.includes("application/xhtml+xml")
	) {
		const rewrittenHtml = rewriteHtmlDocument(
			await upstreamResponse.text(),
			finalUrl.toString(),
			requestUrl.origin,
		);

		return new NextResponse(rewrittenHtml, {
			status: upstreamResponse.status,
			headers: responseHeaders("text/html; charset=utf-8"),
		});
	}

	return new NextResponse(await upstreamResponse.arrayBuffer(), {
		status: upstreamResponse.status,
		headers: responseHeaders(contentType || "application/octet-stream"),
	});
}
