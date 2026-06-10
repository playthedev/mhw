"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { BookOpen, Clock, ArrowRight, Search, Tag, Filter, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { articles } from "@/lib/articles"

const categories = ["All", "Accounting", "NGO", "Tax", "Compliance", "Career"]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export default function StudyPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = articles.filter((a) => {
    const matchCategory = activeCategory === "All" || a.category === activeCategory
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchCategory && matchSearch
  })

  const featured = articles.filter((a) => a.featured)

  const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "All" ? articles.length : articles.filter((a) => a.category === cat).length
    return acc
  }, {})

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 hero-bg dot-grid overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/6 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/20 mb-6">
              <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">Study Resources</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-(--text) mb-6"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Knowledge Hub for
              <br />
              <span className="gradient-text">Professionals</span>
            </h1>
            <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-xl mx-auto mb-4">
              Free articles, guides, and resources on accounting, NGO compliance, tax, and professional development.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-8 mb-10">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <BookOpen className="w-4 h-4 text-primary-400" />
                <span><span className="text-(--text) font-semibold">{articles.length}</span> articles</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-(--surface-hover)" />
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span><span className="text-(--text) font-semibold">{categories.length - 1}</span> topics</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-(--surface-hover)" />
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Users className="w-4 h-4 text-green-400" />
                <span><span className="text-(--text) font-semibold">Free</span> to read</span>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search articles, topics, tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors"
              />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </section>

      {/* ── Sticky filter bar ── */}
      <section className="py-5 border-b border-(--border-soft) sticky top-16 z-30 bg-[var(--bg)]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "glass text-[var(--text-muted)] hover:text-(--text) border border-(--border-soft) hover:border-(--border)"
                }`}
              >
                {cat}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat ? "bg-(--surface-strong) text-(--text)" : "bg-(--surface) text-[var(--text-muted)]"
                }`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Featured strip (only on "All" with no search) ── */}
          {activeCategory === "All" && !search && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary-500 to-purple-500" />
                <h2
                  className="text-(--text) font-semibold text-lg"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Featured
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {featured.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Link href={`/study/${article.id}`} className="group flex flex-col sm:flex-row gap-5 glass-card rounded-2xl border border-(--border-soft) hover:border-primary-500/25 transition-all duration-300 overflow-hidden">
                      {/* Colour strip */}
                      <div className={`sm:w-2 h-2 sm:h-auto rounded-b-none sm:rounded-b-none sm:rounded-r-none bg-gradient-to-b ${article.color} flex-shrink-0`} />
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                            Featured
                          </span>
                          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] ml-auto">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime} min
                          </div>
                        </div>
                        <h3
                          className="text-(--text) font-semibold text-base leading-snug mb-2 group-hover:text-primary-300 transition-colors"
                          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                        >
                          {article.title}
                        </h3>
                        <p className="text-[var(--text-muted)] text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${article.color} flex items-center justify-center text-white text-xs font-bold`}>
                              {article.avatar}
                            </div>
                            <span className="text-xs text-[var(--text-muted)]">{article.author}</span>
                          </div>
                          <span className="text-xs text-primary-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read article <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── Results header ── */}
          <div className="flex items-center justify-between gap-3 mb-8">
            {activeCategory !== "All" || search ? (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary-500 to-purple-500 flex-shrink-0" />
                <h2
                  className="text-(--text) font-semibold text-lg truncate"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {search ? `Results for "${search}"` : activeCategory}
                </h2>
              </div>
            ) : (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary-500 to-purple-500 flex-shrink-0" />
                <h2
                  className="text-(--text) font-semibold text-lg"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  All Articles
                </h2>
              </div>
            )}
            <span className="text-sm text-[var(--text-muted)] flex-shrink-0">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {/* ── Article grid ── */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="glass-card rounded-2xl overflow-hidden border border-(--border-soft) hover:border-primary-500/20 transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail */}
                  <div className={`h-40 bg-gradient-to-br ${article.color} opacity-80 flex items-center justify-center relative`}>
                    <BookOpen className="w-10 h-10 text-(--text)/60 group-hover:scale-110 transition-transform duration-300" />
                    {article.featured && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-xs font-medium text-purple-300 border border-purple-500/30">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-3 right-3 text-xs text-(--text)/70 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {formatDate(article.date)}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>

                    <h3
                      className="text-(--text) font-semibold text-base leading-snug mb-3 group-hover:text-primary-300 transition-colors line-clamp-2"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                    >
                      {article.title}
                    </h3>

                    <p className="text-[var(--text-muted)] text-sm line-clamp-3 mb-5">{article.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-xs text-[var(--text-muted)] bg-(--surface) px-2.5 py-1 rounded-full"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author + CTA */}
                    <div className="mt-auto pt-4 border-t border-(--border-soft) flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${article.color} flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {article.avatar}
                        </div>
                        <div>
                          <p className="text-(--text) text-xs font-medium">{article.author}</p>
                          <p className="text-[var(--text-muted)] text-xs">{article.authorRole}</p>
                        </div>
                      </div>
                      <Link
                        href={`/study/${article.id}`}
                        className="text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 group/btn"
                      >
                        Read
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div className="w-16 h-16 rounded-2xl glass border border-(--border) flex items-center justify-center mx-auto mb-5">
                <BookOpen className="w-7 h-7 text-[var(--text-muted)]" />
              </div>
              <h3 className="text-(--text) font-semibold mb-2">No articles found</h3>
              <p className="text-[var(--text-muted)] text-sm max-w-xs mx-auto mb-6">
                Try a different search term or browse a different category.
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All") }}
                className="px-5 py-2.5 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm hover:bg-primary-500/20 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA / Newsletter ── */}
      <section className="section-py border-t border-(--border-soft)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl border border-(--border-soft) p-6 sm:p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-primary-500/6 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-500/20 mb-6">
                <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">Need Expert Help?</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--text) mb-4"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                Questions beyond the articles?
              </h2>
              <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-xl mx-auto mb-8">
                Our consultants are available for personalised advice on compliance, tax, and NGO management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
                >
                  Talk to a consultant
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass border border-(--border) text-(--text) font-semibold text-sm hover:border-(--border-strong) transition-all"
                >
                  Browse our courses
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
