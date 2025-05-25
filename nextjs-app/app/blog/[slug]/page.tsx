import { type Metadata } from 'next';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPost({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mb-6">
        Blog Post: {params.slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </h1>
      <p className="text-lg text-gray-600">
        This is a placeholder for the blog post content. The actual content will be migrated from the React version.
      </p>
    </div>
  );
}
