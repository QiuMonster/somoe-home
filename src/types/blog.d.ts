export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  categories: string[]
  tags: string[]
  cover?: string
  content: string
  author?: string
  wordCount?: number
}

export interface BlogCategory {
  name: string
  count: number
}

export interface BlogArchive {
  year: string
  months: {
    month: string
    posts: BlogPost[]
  }[]
}

export interface BlogNavInfo {
  prev: { slug: string; title: string } | null
  next: { slug: string; title: string } | null
}

