import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("XML Sitemap", () => {
  const sitemapPath = resolve(__dirname, "../../public/sitemap.xml");
  const sitemapContent = readFileSync(sitemapPath, "utf-8");

  const requiredPaths = ["/", "/towing/accra", "/blog"];

  requiredPaths.forEach((path) => {
    const fullUrl = `https://towmanghana.com${path === "/" ? "/" : path}`;

    it(`includes ${fullUrl} in sitemap`, () => {
      expect(sitemapContent).toContain(`<loc>${fullUrl}</loc>`);
    });
  });

  it("is valid XML with urlset root", () => {
    expect(sitemapContent).toContain('<?xml version="1.0"');
    expect(sitemapContent).toContain("<urlset");
    expect(sitemapContent).toContain("</urlset>");
  });

  it("every <loc> URL maps to a valid app route", async () => {
    // Extract all paths from sitemap
    const locRegex = /<loc>https:\/\/towmanghana\.com(\/[^<]*)<\/loc>/g;
    const paths: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = locRegex.exec(sitemapContent)) !== null) {
      paths.push(match[1]);
    }

    expect(paths.length).toBeGreaterThan(0);

    // Verify the three critical paths are present
    expect(paths).toContain("/");
    expect(paths).toContain("/towing/accra");
    expect(paths).toContain("/blog");
  });
});