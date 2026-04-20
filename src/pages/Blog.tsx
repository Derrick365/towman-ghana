/* Blog Index — SEO content hub */
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO, { breadcrumbJsonLd } from "@/components/SEO";
import { blogPosts } from "@/lib/blog-data";
import { Calendar, Clock } from "lucide-react";

const Blog = () => (
  <div className="min-h-screen">
    <SEO
      title="Blog — Towing Tips, Guides & News"
      description="Expert towing advice, pricing guides, and road safety tips for Ghanaian drivers. Stay informed with Towman Ghana's blog."
      canonical="/blog"
      jsonLd={breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
      ])}
    />
    <Navbar />

    <div className="bg-primary pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-primary-foreground">
          Towman Ghana Blog
        </h1>
        <p className="text-primary-foreground/60 mt-2">
          Towing guides, safety tips, and industry insights for Ghanaian drivers
        </p>
      </div>
    </div>

    <section className="py-16 px-6">
      <div className="container mx-auto max-w-3xl space-y-8">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block p-6 bg-card rounded-xl border border-border hover:border-secondary transition-colors group"
          >
            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full mb-3">
              {post.category}
            </span>
            <h2 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors">
              {post.title}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <Footer />
  </div>
);

export default Blog;