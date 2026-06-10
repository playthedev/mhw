"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Clock, Tag, BookOpen, ArrowRight, Share2, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { Article } from "@/lib/articles"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

function renderBody(paragraphs: string[]) {
  return paragraphs.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-xl font-bold text-(--text) mt-10 mb-4 scroll-mt-24"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {block.replace("## ", "")}
        </h2>
      )
    }

    const parts = block.split(/(\*\*[^*]+\*\*)/g)
    return (
      <p key={i} className="text-[var(--text-subtle)] leading-relaxed mb-5">
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j} className="text-(--text) font-semibold">
              {part.slice(2, -2)}
            </strong>
          ) : (
            part
          )
        )}
      </p>
    )
  })
}

export default function ArticleClient({ article, related }: { article: Article; related: Article[] }) {
  const [copied, setCopied] = useState(false)

  function handleShare() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* ── Hero banner ── */}
      <section className={`relative pt-32 pb-20 bg-gradient-to-br ${article.color} overflow-hidden`}>
        <div className="absolute inset-0 bg-[var(--bg)]/70" />
        <div className="absolute inset-0 dot-grid opacity-30" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/study"
              className="inline-flex items-center gap-2 text-sm text-(--text)/70 hover:text-(--text) transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Study
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-medium text-primary-300 bg-primary-500/15 px-3 py-1.5 rounded-full border border-primary-500/20">
                {article.category}
              </span>
              {article.featured && (
                <span className="text-xs font-medium text-purple-300 bg-purple-500/15 px-3 py-1.5 rounded-full border border-purple-500/20">
                  Featured
                </span>
              )}
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--text) mb-6 leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {article.title}
            </h1>

            <p className="text-(--text)/70 text-base sm:text-lg mb-8 max-w-2xl">{article.excerpt}</p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${article.color} flex items-center justify-center text-white text-sm font-bold shadow-lg shrink-0`}
                >
                  {article.avatar}
                </div>
                <div>
                  <p className="text-(--text) text-sm font-semibold">{article.author}</p>
                  <p className="text-(--text)/60 text-xs">{article.authorRole}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-(--surface-strong) hidden sm:block" />
              <div className="flex items-center gap-1.5 text-(--text)/60 text-sm">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </div>
              <div className="w-px h-8 bg-(--surface-strong) hidden sm:block" />
              <span className="text-(--text)/60 text-sm">{formatDate(article.date)}</span>

              <button
                onClick={handleShare}
                className="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-(--surface-hover) hover:bg-(--surface-hover) border border-(--border) text-(--text) text-sm transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                {copied ? "Copied!" : "Share"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">

            {/* Article content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <article className="prose-custom">
                {renderBody(article.body)}
              </article>

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-(--border-soft)">
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] bg-(--surface) border border-(--border-soft) px-3 py-1.5 rounded-full hover:border-(--border) transition-colors"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author card */}
              <div className="mt-10 p-6 glass-card rounded-2xl border border-(--border-soft)">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${article.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                  >
                    {article.avatar}
                  </div>
                  <div>
                    <p
                      className="text-(--text) font-semibold"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                    >
                      {article.author}
                    </p>
                    <p className="text-[var(--text-muted)] text-sm">{article.authorRole} · MHW Consultancy</p>
                    <p className="text-[var(--text-muted)] text-xs mt-1">
                      Expert in compliance, accounting, and NGO management with years of hands-on consulting experience.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-2xl border border-primary-500/15 p-6 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary-400" />
                </div>
                <h3
                  className="text-(--text) font-semibold mb-2"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Need personalised advice?
                </h3>
                <p className="text-[var(--text-muted)] text-xs mb-5 leading-relaxed">
                  Our consultants can help you apply these insights to your specific situation.
                </p>
                <Link
                  href="/contact"
                  className="block w-full py-3 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold text-center transition-all shadow-lg shadow-primary-500/25"
                >
                  Talk to a consultant
                </Link>
                <Link
                  href="/courses"
                  className="block w-full mt-3 py-3 px-4 rounded-xl glass border border-(--border) hover:border-(--border-strong) text-(--text) text-sm font-medium text-center transition-all"
                >
                  Browse courses
                </Link>
              </motion.div>

              {/* Related articles */}
              {related.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="glass-card rounded-2xl border border-(--border-soft) p-6"
                >
                  <h3
                    className="text-(--text) font-semibold mb-5"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {related.map((a) => (
                      <Link
                        key={a.id}
                        href={`/study/${a.id}`}
                        className="flex gap-3 group"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                        >
                          {a.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-(--text) text-xs font-medium leading-snug group-hover:text-primary-300 transition-colors line-clamp-2 mb-1">
                            {a.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                            <Clock className="w-3 h-3" />
                            {a.readTime} min
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-primary-400 flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ── Back nav ── */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <Link
            href="/study"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass border border-(--border) hover:border-(--border-strong) text-(--text) text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass border border-(--border) hover:border-(--border-strong) text-(--text) text-sm transition-all"
          >
            <Share2 className="w-4 h-4" />
            Share article
          </button>
        </div>
      </section>
    </div>
  )
}
