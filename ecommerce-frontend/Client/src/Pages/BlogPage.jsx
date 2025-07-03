"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, User, Tag, ArrowRight, TrendingUp, Clock, Eye } from "lucide-react"

// Sample blog data - aap isko apne backend se replace kar sakte hain
const blogPosts = [
  {
    id: 1,
    title: "Top 10 Fashion Trends for 2024",
    excerpt:
      "Discover the latest fashion trends that are taking the world by storm this year. From sustainable fashion to bold colors.",
    content: "Fashion industry is constantly evolving...",
    author: "Priya Sharma",
    date: "2024-01-15",
    category: "Fashion",
    tags: ["Fashion", "Trends", "Style"],
    image: "https://i.postimg.cc/rFSJ0FtW/pexels-rfera-432059.jpg",
    readTime: "5 min read",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "How to Choose the Perfect Smartphone in 2024",
    excerpt: "Complete guide to selecting the right smartphone based on your needs, budget, and preferences.",
    content: "Choosing a smartphone can be overwhelming...",
    author: "Rahul Kumar",
    date: "2024-01-12",
    category: "Technology",
    tags: ["Smartphone", "Technology", "Guide"],
    image: "https://i.postimg.cc/m2CPTPFx/pexels-tdcat-3571093.jpg",
    readTime: "8 min read",
    views: 2100,
    featured: true,
  },
  {
    id: 3,
    title: "Best Home Decor Ideas on a Budget",
    excerpt: "Transform your living space without breaking the bank. Creative and affordable home decoration tips.",
    content: "Home decoration doesn't have to be expensive...",
    author: "Anjali Gupta",
    date: "2024-01-10",
    category: "Home & Living",
    tags: ["Home Decor", "Budget", "DIY"],
    image: "https://i.postimg.cc/NfP7yJsh/pexels-homegrounds-co-3480562-5200284.jpg",
    readTime: "6 min read",
    views: 890,
    featured: false,
  },
  {
    id: 4,
    title: "Skincare Routine for Different Skin Types",
    excerpt: "Personalized skincare routines and product recommendations for oily, dry, and combination skin.",
    content: "Understanding your skin type is crucial...",
    author: "Dr. Meera Patel",
    date: "2024-01-08",
    category: "Beauty",
    tags: ["Skincare", "Beauty", "Health"],
    image: "https://i.postimg.cc/c4rggdkh/pexels-polina-tankilevitch-5468661.jpg",
    readTime: "7 min read",
    views: 1680,
    featured: false,
  },
  {
    id: 5,
    title: "Fitness Equipment for Home Workouts",
    excerpt: "Essential fitness equipment to create an effective home gym setup without spending a fortune.",
    content: "Working out at home has become increasingly popular...",
    author: "Vikash Singh",
    date: "2024-01-05",
    category: "Fitness",
    tags: ["Fitness", "Home Gym", "Health"],
    image: "https://i.postimg.cc/nhcGRX2J/pexels-shvets-production-8899511.jpg",
    readTime: "4 min read",
    views: 950,
    featured: false,
  },
  {
    id: 6,
    title: "Sustainable Shopping: Eco-Friendly Products Guide",
    excerpt: "Make environmentally conscious choices with our guide to sustainable and eco-friendly products.",
    content: "Sustainable shopping is more than a trend...",
    author: "Neha Agarwal",
    date: "2024-01-03",
    category: "Lifestyle",
    tags: ["Sustainable", "Eco-friendly", "Environment"],
    image: "https://i.postimg.cc/k4GtdSZQ/pexels-minh-ng-c-62200136-13816956.jpg",
    readTime: "9 min read",
    views: 1420,
    featured: true,
  },
]

const categories = ["All", "Fashion", "Technology", "Home & Living", "Beauty", "Fitness", "Lifestyle"]

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  useEffect(() => {
    let filtered = blogPosts

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory])

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-yellow-300">Blog</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Latest trends, tips, and insights for smart shopping and lifestyle
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
  type="text"
  placeholder="Search articles, tips, trends..."
  className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] focus:shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_30px_rgba(147,51,234,0.3)]"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "All" && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <TrendingUp className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">{post.category}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString("en-IN")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                      </div>
                      <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium group">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div>
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>
            <div className="ml-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredPosts.length} articles
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === "All" ? regularPosts : filteredPosts).map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString("en-IN")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                      </div>
                      <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium group">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated!</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest trends, tips, and exclusive offers.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] focus:shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_30px_rgba(147,51,234,0.3)]"
            />
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
