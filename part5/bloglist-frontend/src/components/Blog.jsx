import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
    const { title, author, url, likes, user } = blog
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

    return (
        <div style={blogStyle}>
            {title} - {author}{' '}
            <button type="button" onClick={toggleDetails}>
                {showDetails ? 'hide' : 'view'}
            </button>
            {showDetails && (
                <>
                    <div>{url}</div>
                    <div>
                        Likes {likes}{' '}
                        <button type="button" onClick={onLikeClick}>
                            Like
                        </button>
                    </div>
                    <div>{user.name}</div>
                </>
            )}
        </div>
    )
}

export default Blog
