import Blog from './Blog'

export default function BlogList({blogs}) {
    return (
        <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
}