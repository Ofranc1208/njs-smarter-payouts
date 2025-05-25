import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-4">The page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-600 hover:text-blue-800">
        Return to Home
      </Link>
    </div>
  )
} 