import { computed } from 'vue'
import { marked } from 'marked'
import { createHighlighter, type Highlighter } from 'shiki'
import type { BlogPost, BlogCategory, BlogArchive, BlogNavInfo } from '@/types/blog'
import { blogConfig } from '@/config/blog.config'

const allGlobModules = import.meta.glob<string>('/src/data/**/*.md', { eager: true, query: '?raw', import: 'default' })

function parseFrontmatter(raw: string): { meta: Record<string, unknown>; content: string } {
  const trimmed = raw.trimStart()
  if (!trimmed.startsWith('---')) return { meta: {}, content: raw }
  const end = trimmed.indexOf('---', 3)
  if (end < 0) return { meta: {}, content: raw }
  const fm = trimmed.slice(3, end).trim()
  const content = trimmed.slice(end + 3).replace(/^\r?\n/, '')
  const meta: Record<string, unknown> = {}
  let currentKey = ''
  let inArray = false
  const arrayItems: string[] = []
  for (const line of fm.split(/\r?\n/)) {
    const arrayMatch = line.match(/^\s+-\s+(.+)$/)
    if (inArray && arrayMatch) {
      arrayItems.push(arrayMatch[1].trim().replace(/^['"]|['"]$/g, ''))
      continue
    }
    if (inArray && currentKey) {
      meta[currentKey] = [...arrayItems]
      inArray = false
      arrayItems.length = 0
    }
    const kvMatch = line.match(/^(\w+):\s*(.*)$/)
    if (kvMatch) {
      currentKey = kvMatch[1]
      const val = kvMatch[2].trim()
      if (val === '') {
        inArray = true
      } else {
        const arrMatch = val.match(/^\[(.*)]$/)
        if (arrMatch) {
          meta[currentKey] = arrMatch[1]
            .split(',')
            .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
            .filter(Boolean)
        } else {
          meta[currentKey] = val.replace(/^['"]|['"]$/g, '')
        }
      }
    }
  }
  if (inArray && currentKey) {
    meta[currentKey] = [...arrayItems]
  }
  return { meta, content }
}

const toArray = (v: unknown): string[] => {
  if (Array.isArray(v)) return v as string[]
  if (typeof v === 'string' && v) return [v]
  return []
}

function buildPost(raw: string, pathSlug: string): BlogPost {
  const { meta, content } = parseFrontmatter(raw)
  const date = (meta.date as string) || (meta.pubDate as string) || ''
  const categories = toArray(meta.categories).length
    ? toArray(meta.categories)
    : toArray(meta.category)
  return {
    slug: pathSlug,
    title: (meta.title as string) || '',
    description: (meta.description as string) || '',
    date,
    updated: (meta.updated as string) || undefined,
    categories,
    tags: toArray(meta.tags),
    cover: (meta.cover as string) || '',
    author: (meta.author as string) || 'QiuMonster',
    content,
  }
}

const allPosts: BlogPost[] = Object.entries(allGlobModules)
  .filter(([path]) => path.startsWith(blogConfig.dataDir + '/'))
  .map(([path, raw]) => {
    const slug = path
      .replace(new RegExp(`^${blogConfig.dataDir}/`), '')
      .replace(/\.md$/, '')
    return buildPost(raw, slug)
  })
  .filter((p) => p.title && p.date)
  .sort((a, b) => b.date.localeCompare(a.date))

let highlighter: Highlighter | null = null
let highlighterPromise: Promise<Highlighter> | null = null

const shikiLangs = ['typescript', 'javascript', 'vue', 'html', 'css', 'json', 'bash', 'shell', 'markdown', 'rust', 'dockerfile', 'glsl', 'python', 'xml', 'yaml']

function getHighlighter(): Promise<Highlighter> {
  if (highlighter) return Promise.resolve(highlighter)
  if (highlighterPromise) return highlighterPromise
  highlighterPromise = createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: shikiLangs,
  }).then((h) => {
    highlighter = h
    return h
  })
  return highlighterPromise
}

getHighlighter()

const renderer = new marked.Renderer()
renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  const language = lang || ''
  if (language && highlighter) {
    try {
      const resolved = highlighter.getLoadedLanguages().includes(language) ? language : 'bash'
      const html = highlighter.codeToHtml(text, { lang: resolved, themes: { light: 'github-light', dark: 'github-dark' } })
      return `<pre class="code-block-wrapper shiki-highlight"><div class="code-header"><span class="code-lang">${language}</span><button type="button" class="code-copy-btn"><span class="copy-icon"></span><span class="copy-text">复制</span></button></div><div class="code-body">${html}</div></pre>`
    } catch {
      // fallback
    }
  }
  return `<pre class="code-block-wrapper"><div class="code-header"><span class="code-lang">${language || 'code'}</span><button type="button" class="code-copy-btn"><span class="copy-icon"></span><span class="copy-text">复制</span></button></div><div class="code-body"><code class="language-${language}">${text}</code></div></pre>`
}

marked.setOptions({ renderer })

async function renderMarkdownAsync(md: string): Promise<string> {
  await getHighlighter()
  return marked.parse(md, { async: false }) as string
}

function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string
}

function getCategories(list: BlogPost[]): BlogCategory[] {
  const map = new Map<string, number>()
  for (const p of list) {
    for (const c of p.categories) {
      map.set(c, (map.get(c) || 0) + 1)
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

function getArchives(list: BlogPost[]): BlogArchive[] {
  const map = new Map<string, Map<string, BlogPost[]>>()
  for (const p of list) {
    const year = p.date.slice(0, 4)
    const month = p.date.slice(5, 7)
    if (!map.has(year)) map.set(year, new Map())
    const yearMap = map.get(year)!
    if (!yearMap.has(month)) yearMap.set(month, [])
    yearMap.get(month)!.push(p)
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, monthMap]) => ({
      year,
      months: Array.from(monthMap.entries())
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([month, mPosts]) => ({ month, posts: mPosts })),
    }))
}

function getNavInfo(slug: string, list: BlogPost[]): BlogNavInfo {
  const idx = list.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? { slug: list[idx - 1].slug, title: list[idx - 1].title } : null,
    next: idx < list.length - 1 ? { slug: list[idx + 1].slug, title: list[idx + 1].title } : null,
  }
}

function countWords(md: string): number {
  const chinese = (md.match(/[\u4e00-\u9fff]/g) || []).length
  const english = (md.replace(/[\u4e00-\u9fff]/g, ' ').match(/[a-zA-Z]+/g) || []).length
  return chinese + english
}

export function useBlog() {
  const posts = computed(() => allPosts)
  const categories = computed(() => getCategories(allPosts))
  const archives = computed(() => getArchives(allPosts))

  function getPostBySlug(slug: string): BlogPost | undefined {
    return allPosts.find((p) => p.slug === slug)
  }

  function getPostsByCategory(name: string): BlogPost[] {
    return allPosts.filter((p) => p.categories.includes(name))
  }

  return {
    posts,
    categories,
    archives,
    renderMarkdown,
    renderMarkdownAsync,
    getPostBySlug,
    getPostsByCategory,
    getNavInfo,
    countWords,
  }
}
