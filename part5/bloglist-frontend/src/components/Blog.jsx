import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser }) => {
    const { id, title, author, url, likes, user } = blog
    const [showDetails, setShowDetails] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    const onLikeClick = () => {
        handleLike({ ...blog, likes: likes + 1 })
    }

    const deleteBlog = () => {
        handleRemove({ id, title, author })
    }

    return (
        <div className="blog" data-cy="blog" style={blogStyle}>
            {title} - {author}{' '}
            <button type="button" onClick={toggleDetails}>
                {showDetails ? 'hide' : 'view'}
            </button>
            {showDetails && (
                <>
                    <div>{url}</div>
                    <div>
                        Likes <span data-cy="likes-count">{likes}</span>{' '}
                        <button
                            type="button"
                            data-cy="like-button"
                            onClick={onLikeClick}
                        >
                            Like
                        </button>
                    </div>
                    <div>{user.name}</div>
                    {loggedInUser === user.username && (
                        <div>
                            <button type="button" onClick={deleteBlog}>
                                Remove
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Blog
