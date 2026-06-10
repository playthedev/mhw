import { notFound } from "next/navigation"
import { articles, getArticleById, getRelatedArticles } from "@/lib/articles"
import ArticleClient from "./ArticleClient"

export function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getArticleById(id)
  if (!article) return {}
  return {
    title: `${article.title} | MHW Consultancy`,
    description: article.excerpt,
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getArticleById(id)
  if (!article) notFound()

  const related = getRelatedArticles(article)
  return <ArticleClient article={article} related={related} />
}
