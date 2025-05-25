import Link from 'next/link'

const blogPosts = [
  { slug: 'structured-settlements', title: 'Understanding Structured Settlements' },
  { slug: 'should-you-sell', title: 'Should You Sell Your Settlement?' },
  { slug: 'how-fast-payout', title: 'How Fast Can You Get Your Payout?' },
]

export default function Blog() {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
} 