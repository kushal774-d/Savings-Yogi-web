import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Save,
  X,
  Eye,
  FileText,
} from "lucide-react";
import ArticleEditor from "../components/ArticleEditor";
import Navbar from "../components/home/Navigation";

// Hardcoded admin credentials (for demo purposes only)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

const AdminArticle = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    slug: "",
  });

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Check if already logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn === "true") {
      setIsAuthenticated(true);
      loadArticles();
    }
  }, []);

  const loadArticles = () => {
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginForm.username === ADMIN_CREDENTIALS.username &&
      loginForm.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("adminLoggedIn", "true");
      setLoginError("");
      loadArticles();
    } else {
      setLoginError("Invalid credentials. Try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminLoggedIn");
    setLoginForm({ username: "", password: "" });
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const openNewArticle = () => {
    setFormData({
      title: "",
      content: "",
      author: "",
      image: "",
      slug: "",
    });
    setEditingArticle(null);
    setShowEditor(true);
  };

  const openEditArticle = (article) => {
    setFormData(article);
    setEditingArticle(article.slug);
    setShowEditor(true);
  };

  const saveArticle = () => {
    if (!formData.title || !formData.content) {
      alert("Title and content are required!");
      return;
    }

    let updatedArticles;

    if (editingArticle) {
      // Update existing article
      updatedArticles = articles.map((a) =>
        a.slug === editingArticle ? { ...formData } : a
      );
    } else {
      // Create new article
      const newArticle = {
        ...formData,
        date: new Date().toISOString(),
        slug: formData.slug || generateSlug(formData.title),
      };
      updatedArticles = [newArticle, ...articles];
    }

    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
    setShowEditor(false);
    setFormData({ title: "", content: "", author: "", image: "", slug: "" });
    setEditingArticle(null);
  };

  const deleteArticle = (slug) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      const updatedArticles = articles.filter((a) => a.slug !== slug);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
      setArticles(updatedArticles);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#002244] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-[#003366] mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#003366] mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">
              Enter credentials to manage articles
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
                placeholder="Enter password"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#003366] text-white py-3 rounded-xl font-bold hover:bg-[#002244] transition-all"
            >
              Login
            </button>

            <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-600">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Username: <span className="font-mono">admin</span></p>
              <p>Password: <span className="font-mono">admin123</span></p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Editor Modal
  if (showEditor) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#003366]">
                  {editingArticle ? "Edit Article" : "Create New Article"}
                </h2>
                <button
                  onClick={() => setShowEditor(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
                    placeholder="Enter article title"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {formData.slug && (
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Slug:</span>{" "}
                      <span className="font-mono text-[#003366]">
                        {formData.slug}
                      </span>
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content *
                  </label>
                  <ArticleEditor
                    content={formData.content}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={saveArticle}
                    className="flex-1 bg-[#FFB300] text-[#003366] py-3 rounded-xl font-bold hover:bg-[#FFC433] transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editingArticle ? "Update" : "Publish"} Article
                  </button>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Admin Dashboard
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#003366] mb-2">
                  Article Management
                </h1>
                <p className="text-gray-600">
                  Create, edit, and manage your articles
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/articles")}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Articles
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-sm text-gray-600 mb-1">Total Articles</p>
              <p className="text-3xl font-bold text-[#003366]">
                {articles.length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-[#003366] to-[#002244] rounded-xl shadow p-6 text-white md:col-span-2 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Ready to write something amazing?
                </h3>
                <p className="text-white/80 text-sm">
                  Share your knowledge and help others grow
                </p>
              </div>
              <button
                onClick={openNewArticle}
                className="bg-[#FFB300] text-[#003366] px-6 py-3 rounded-xl font-bold hover:bg-[#FFC433] transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Article
              </button>
            </div>
          </div>

          {/* Articles List */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#003366]">
                All Articles
              </h2>
            </div>

            {articles.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No articles yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first article to get started
                </p>
                <button
                  onClick={openNewArticle}
                  className="bg-[#FFB300] text-[#003366] px-6 py-3 rounded-xl font-bold hover:bg-[#FFC433] transition-all inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Article
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {articles.map((article) => (
                  <div
                    key={article.slug}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#003366] mb-2">
                          {article.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span>{formatDate(article.date)}</span>
                          {article.author && <span>by {article.author}</span>}
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            /article/{article.slug}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditArticle(article)}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteArticle(article.slug)}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminArticle;
