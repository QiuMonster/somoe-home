import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

interface RssPost {
  title: string
  slug: string
  description: string
  date: string
  categories: string[]
  tags: string[]
  author: string
}

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
            .map((s: string) => s.trim().replace(/^['"]|['"]$/g, ''))
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

function collectPosts(blogsDir: string): RssPost[] {
  const posts: RssPost[] = []
  function walk(dir: string) {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.md')) {
        const raw = fs.readFileSync(full, 'utf-8')
        const { meta } = parseFrontmatter(raw)
        const date = (meta.date as string) || (meta.pubDate as string) || ''
        const title = (meta.title as string) || ''
        if (!title || !date) continue
        const slug = path.relative(blogsDir, full).replace(/\.md$/, '').replace(/\\/g, '/')
        const categories = toArray(meta.categories).length ? toArray(meta.categories) : toArray(meta.category)
        posts.push({
          title,
          slug,
          description: (meta.description as string) || '',
          date,
          categories,
          tags: toArray(meta.tags),
          author: (meta.author as string) || 'QiuMonster',
        })
      }
    }
  }
  walk(blogsDir)
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function generateRss(siteUrl: string, posts: RssPost[]): string {
  const lastBuildDate = posts.length ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()
  const items = posts.map((p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteUrl}/blog/${escapeXml(p.slug)}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${escapeXml(p.slug)}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <author>${escapeXml(p.author)}</author>
${p.categories.map((c) => `      <category>${escapeXml(c)}</category>`).join('\n')}
${p.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join('\n')}
    </item>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Somoe Home</title>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <description>QiuMonster 创建的个人聚合门户</description>
    <language>zh-CN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`
}

export default function viteRssPlugin(siteUrl = 'https://somoe.xyz', dataDir = 'src/data/blogs'): Plugin {
  const virtualId = 'virtual:rss-xml'
  const resolvedVirtualId = '\0' + virtualId

  return {
    name: 'vite-plugin-rss',
    resolveId(id) {
      if (id === virtualId) return resolvedVirtualId
    },
    load(id) {
      if (id !== resolvedVirtualId) return null
      const blogsDir = path.resolve(process.cwd(), dataDir)
      const posts = collectPosts(blogsDir)
      return `export default ${JSON.stringify(generateRss(siteUrl, posts))}`
    },
    configureServer(server) {
      server.middlewares.use('/rss.xml', (_req, res) => {
        const blogsDir = path.resolve(process.cwd(), dataDir)
        const posts = collectPosts(blogsDir)
        res.setHeader('Content-Type', 'application/xml; charset=utf-8')
        res.end(generateRss(siteUrl, posts))
      })
    },
    generateBundle() {
      const blogsDir = path.resolve(process.cwd(), dataDir)
      const posts = collectPosts(blogsDir)
      this.emitFile({
        type: 'asset',
        fileName: 'rss.xml',
        source: generateRss(siteUrl, posts),
      })
    },
  }
}
