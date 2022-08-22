const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs?.length === 0) {
        return 0
    }

    const reducer = (acc, item) => acc + item.likes
    return blogs?.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const orderdByLikes = blogs.sort((a, b) => b.likes - a.likes)
    const [favoriteBlog] = orderdByLikes
    delete favoriteBlog._id
    delete favoriteBlog.__v
    delete favoriteBlog.url
    return favoriteBlog
}

const mostBlogs = (blogs) => {
    const blogCount = blogs.reduce((acc, blog) => {
        const authorBlogsIndex = acc.findIndex(
            (el) => el.author === blog.author
        )

        if (authorBlogsIndex >= 0) {
            acc[authorBlogsIndex].blogs++
            return acc
        } else {
            return acc.concat({ author: blog.author, blogs: 1 })
        }
    }, [])
    const sortedBlogCount = blogCount.sort((a, b) => b.blogs - a.blogs)
    return sortedBlogCount[0]
}

const mostLikes = (blogs) => {
    const likesCount = blogs.reduce((acc, blog) => {
        const authorLikesIndex = acc.findIndex(
            (el) => el.author === blog.author
        )

        if (authorLikesIndex >= 0) {
            acc[authorLikesIndex].likes += blog.likes
            return acc
        } else {
            return acc.concat({ author: blog.author, likes: blog.likes })
        }
    }, [])
    const sortedLikesCount = likesCount.sort((a, b) => b.likes - a.likes)
    return sortedLikesCount[0]
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
