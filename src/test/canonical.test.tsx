import { describe, it, expect, afterEach, beforeAll } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import CityLanding from "@/pages/CityLanding";
import Blog from "@/pages/Blog";

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
  document.title = "";
});

function wrap(ui: React.ReactElement, route: string) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

function wrapWithParam(route: string, pattern: string, ui: React.ReactElement) {
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

const BASE = "https://towmanghana.com";

describe("Canonical link tags", () => {
  it("/ renders canonical https://towmanghana.com/", async () => {
    wrap(<Index />, "/");
    await new Promise((r) => setTimeout(r, 50));
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(link).not.toBeNull();
    expect(link!.href).toBe(`${BASE}/`);
  });

  it("/towing/accra renders canonical https://towmanghana.com/towing/accra", async () => {
    wrapWithParam("/towing/accra", "/towing/:city", <CityLanding />);
    await new Promise((r) => setTimeout(r, 50));
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(link).not.toBeNull();
    expect(link!.href).toBe(`${BASE}/towing/accra`);
  });

  it("/blog renders canonical https://towmanghana.com/blog", async () => {
    wrap(<Blog />, "/blog");
    await new Promise((r) => setTimeout(r, 50));
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(link).not.toBeNull();
    expect(link!.href).toBe(`${BASE}/blog`);
  });
});