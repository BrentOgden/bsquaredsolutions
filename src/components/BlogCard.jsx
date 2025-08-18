import React from 'react'
import { Link } from 'react-router-dom'
import BlogPost from '../pages/Blogs/BlogPostTest'

export default function BlogCard({ post }) {
  return (
    <article className="bg-white glow-hover rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-200">
      {post.image && (
        <Link to={`/blog/${post.slug}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        </Link>
      )}
      <div className="p-4">
        <time className="text-xs text-gray-900">{post.date}</time>
        <h3 className="mt-1 text-lg font-semibold text-primary">
          <Link to={`/blog/${post.slug}`} className="hover:text-[#0185e4]/70">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-gray-700 text-sm">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="mt-4 inline-block text-primary hover:font-bold text-md font-medium"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
