import { useState, useEffect } from "react";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import insightsHero from "@/assets/insights-hero.jpg";

export const InsightsSection = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Load articles from localStorage
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles);
      // Sort by date (newest first) and take latest 4
      const sortedArticles = parsedArticles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);
      setArticles(sortedArticles);
    }
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate read time
  const calculateReadTime = (htmlContent) => {
    const plainText = htmlContent.replace(/<[^>]*>/g, "");
    const wordCount = plainText.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return `${readTime} min read`;
  };

  // Strip HTML tags and get plain text excerpt
  const getExcerpt = (htmlContent, length = 120) => {
    const plainText = htmlContent.replace(/<[^>]*>/g, "");
    return plainText.length > length
      ? plainText.substring(0, length) + "..."
      : plainText;
  };

  // If no articles, show default content
  if (articles.length === 0) {
    return (
      <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted/30">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Latest Articles
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Expert tips and guides for smarter money management.
              </p>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-accent font-semibold text-sm sm:text-base hover:text-primary transition-colors group"
            >
              View all articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Default Content */}
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No articles yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Check back soon for insightful articles on personal finance and savings strategies.
            </p>
            <Link
              to="/articles"
              className="inline-block bg-[#003366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#002244] transition-all"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 4);

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Latest Articles
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Expert tips and guides for smarter money management.
            </p>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-accent font-semibold text-sm sm:text-base hover:text-primary transition-colors group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Featured Article (Latest) */}
          <Link to={`/article/${featuredArticle.slug}`} className="group block">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
              {featuredArticle.image ? (
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-[#003366] to-[#002244] flex items-center justify-center">
                  <span className="text-white text-6xl font-bold opacity-20">
                    {featuredArticle.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                <span className="bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  LATEST
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground mb-2">
              <span className="font-medium text-accent">NEW ARTICLE</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(featuredArticle.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {calculateReadTime(featuredArticle.content)}
              </span>
              {featuredArticle.author && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {featuredArticle.author}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {featuredArticle.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              {getExcerpt(featuredArticle.content)}
            </p>
          </Link>

          {/* Side Articles */}
          <div className="space-y-4 sm:space-y-6">
            {sideArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/article/${article.slug}`}
                className="flex gap-3 sm:gap-4 group cursor-pointer block"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-24 flex-shrink-0 overflow-hidden rounded-lg sm:rounded-xl">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#003366] to-[#002244] flex items-center justify-center">
                      <span className="text-white text-2xl font-bold opacity-30">
                        {article.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <span className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-1">
                    {formatDate(article.date)}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-1">
                    {getExcerpt(article.content, 80)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

