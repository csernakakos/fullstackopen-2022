import Blog from './Blog'

export default function BlogList({blogs, setBlogs,  setUpdatedBlogs, user}) {

  const order = {
    field: 'likes',
    asc: true,
  }

  blogs.sort((a, b) => {

    if (order.asc) {
      if (a[order.field] > b[order.field]) {
        return 1
      } else if (a[order.field] < b[order.field]) {
        return -1
      } else {
        return 0
      }
    }
  });

    return (
        <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setUpdatedBlogs={setUpdatedBlogs} setBlogs={setBlogs} user={user} />
        )}
      </div>
    )
}