import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import Navbar from "../components/home/Navigation";
import { Footer } from "../components/Footer";

const ArticlePost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Load article from localStorage
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      const articles = JSON.parse(storedArticles);
      const foundArticle = articles.find((a) => a.slug === slug);
      setArticle(foundArticle);
    }
    setLoading(false);
  }, [slug]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate read time
  const calculateReadTime = (htmlContent) => {
    const plainText = htmlContent.replace(/<[^>]*>/g, "");
    const wordCount = plainText.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min
    return `${readTime} min read`;
  };

  // Share article
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center px-4">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">
              Article Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/articles"
              className="inline-block bg-[#FFB300] text-[#003366] px-6 py-3 rounded-xl font-bold hover:bg-[#FFC433] transition-all"
            >
              Back to Articles
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Article Header */}
        <section className="pt-24 md:pt-28 pb-8 md:pb-12 bg-gradient-to-b from-[#003366] to-[#002244] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Back Button */}
            <button
              onClick={() => navigate("/articles")}
              className="flex items-center gap-2 text-white/80 hover:text-[#FFB300] transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Articles</span>
            </button>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-white/80 mb-6">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{calculateReadTime(article.content)}</span>
              </div>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </section>

        {/* Featured Image */}
        {article.image && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-[#003366] prose-headings:font-bold
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-[#FFB300] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-img:rounded-xl prose-img:shadow-lg
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* Article Footer */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="text-2xl font-bold text-[#003366] mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore more articles and continue your financial learning journey.
            </p>
            <Link
              to="/articles"
              className="inline-block bg-[#003366] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#002244] transition-all"
            >
              Read More Articles
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ArticlePost;
