/* Individual Blog Post — SEO-optimized article page */
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO, { breadcrumbJsonLd } from "@/components/SEO";
import { getPostBySlug } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-bold font-display">Article Not Found</h1>
          <Button asChild className="mt-6">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Towman Ghana" },
    publisher: {
      "@type": "Organization",
      name: "Towman Ghana",
      logo: { "@type": "ImageObject", url: "https://towmanghana.com/logo.png" },
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        jsonLd={[articleJsonLd, breadcrumbJsonLd(breadcrumbs)]}
      />
      <Navbar />

      <div className="bg-primary pt-20 pb-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs font-medium rounded-full mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-primary-foreground leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-primary-foreground/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      <article className="py-12 px-6">
        <div className="container mx-auto max-w-3xl space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-foreground/80 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* CTA */}
          <div className="mt-12 p-8 bg-primary/5 rounded-xl border border-primary/20 text-center">
            <h3 className="text-lg font-bold text-foreground">Need a Tow Right Now?</h3>
            <p className="text-muted-foreground text-sm mt-2">
              Find verified operators near you in seconds.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <Button asChild>
                <Link to="/request-tow">Request a Tow</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/listings">Browse Operators</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;