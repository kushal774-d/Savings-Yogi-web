import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "../components/home/Navigation";
import { Footer } from "../components/Footer";

const Article = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Load articles from localStorage
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    }
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Strip HTML tags and get plain text excerpt
  const getExcerpt = (htmlContent, length = 150) => {
    const plainText = htmlContent.replace(/<[^>]*>/g, "");
    return plainText.length > length
      ? plainText.substring(0, length) + "..."
      : plainText;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-28 pb-12 md:pt-32 md:pb-16 bg-[#003366] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-[#FFB300]" />
              <h1 className="text-3xl md:text-5xl font-bold">Articles</h1>
            </div>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Explore insightful articles on personal finance, savings strategies, and building wealth.
            </p>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {articles.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No articles yet
                </h3>
                <p className="text-gray-500">
                  Check back soon for new content!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/article/${article.slug}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]"
                  >
                    {/* Article Image */}
                    {article.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Article Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-[#003366] mb-3 line-clamp-2 group-hover:text-[#FFB300] transition-colors">
                        {article.title}
                      </h2>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                        {article.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                          </div>
                        )}
                      </div>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {getExcerpt(article.content)}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-[#FFB300] font-semibold text-sm group-hover:gap-3 transition-all">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-[#003366] to-[#002244] rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Want to contribute?
              </h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Share your financial insights and help others on their journey to financial freedom.
              </p>
              <Link
                to="/admin-article"
                className="inline-block bg-[#FFB300] text-[#003366] px-8 py-3 rounded-xl font-bold hover:bg-[#FFC433] transition-all transform hover:scale-105"
              >
                Write an Article
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Article;
