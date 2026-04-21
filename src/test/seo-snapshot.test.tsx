import { describe, it, expect, afterEach, beforeAll } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import CityLanding from "@/pages/CityLanding";
import Blog from "@/pages/Blog";
import { captureSeoSnapshot } from "./seo-helpers";

beforeAll(() => {
  if (!globalThis.IntersectionObserver) {
    globalThis.IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;
  }
});

afterEach(() => {
  cleanup();
  document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
  document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
  document.querySelectorAll('meta[property^="og:"]').forEach((el) => el.remove());
  document.title = "";
});

function renderRoute(ui: React.ReactElement, route: string, pattern = "*") {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={pattern} element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("SEO metadata snapshots", () => {
  it("/ has correct title, description, and canonical", async () => {
    renderRoute(<Index />, "/");
    const seo = await captureSeoSnapshot();
    expect(seo.title).toContain("Towman Ghana");
    expect(seo.description).toBeTruthy();
    expect(seo.description!.length).toBeGreaterThan(50);
    expect(seo.canonical).toBe("https://towmanghana.com/");
    expect(seo.ogTitle).toBe(seo.title);
    expect(seo.ogDescription).toBe(seo.description);
  });

  it("/towing/accra has city-specific metadata", async () => {
    renderRoute(<CityLanding />, "/towing/accra", "/towing/:city");
    const seo = await captureSeoSnapshot();
    expect(seo.title).toMatch(/accra/i);
    expect(seo.description).toMatch(/accra/i);
    expect(seo.canonical).toBe("https://towmanghana.com/towing/accra");
    expect(seo.ogTitle).toBe(seo.title);
  });

  it("/blog has blog-specific metadata", async () => {
    renderRoute(<Blog />, "/blog");
    const seo = await captureSeoSnapshot();
    expect(seo.title).toMatch(/blog/i);
    expect(seo.description).toBeTruthy();
    expect(seo.canonical).toBe("https://towmanghana.com/blog");
    expect(seo.ogTitle).toBe(seo.title);
  });
});