/**
 * SEO test helper — captures title, description, and canonical from the DOM
 * after a component with the SEO component has rendered.
 */
export interface SeoSnapshot {
  title: string;
  description: string | null;
  canonical: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
}

export async function captureSeoSnapshot(waitMs = 50): Promise<SeoSnapshot> {
  await new Promise((r) => setTimeout(r, waitMs));
  return {
    title: document.title,
    description:
      (document.querySelector('meta[name="description"]') as HTMLMetaElement | null)?.content ?? null,
    canonical:
      (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href ?? null,
    ogTitle:
      (document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null)?.content ?? null,
    ogDescription:
      (document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null)?.content ?? null,
    ogImage:
      (document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null)?.content ?? null,
  };
}