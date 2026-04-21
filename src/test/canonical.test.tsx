import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import CityLanding from "@/pages/CityLanding";
import Blog from "@/pages/Blog";

afterEach(() => {
  cleanup();
  // Remove any canonical links added by SEO component
  document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
  // Reset title
  document.title = "";
});

function renderWithRouter(ui: React.ReactElement, { route = "/" } = {}) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
}

const BASE = "https://towmanghana.com";

describe("Canonical link tags", () => {
  it("/ renders canonical https://towmanghana.com/", async () => {
    renderWithRouter(<Index />);
    // SEO component runs in useEffect — wait a tick
    await new Promise((r) => setTimeout(r, 50));
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(link).not.toBeNull();
    expect(link!.href).toBe(`${BASE}/`);
  });

  it("/towing/accra renders canonical https://towmanghana.com/towing/accra", async () => {
    renderWithRouter(<CityLanding />, { route: "/towing/accra" });
    await new Promise((r) => setTimeout(r, 50));
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(link).not.toBeNull();
    expect(link!.href).toBe(`${BASE}/towing/accra`);
  });

  it("/blog renders canonical https://towmanghana.com/blog", async () => {
    renderWithRouter(<Blog />);
    await new Promise((r) => setTimeout(r, 50));
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(link).not.toBeNull();
    expect(link!.href).toBe(`${BASE}/blog`);
  });
});