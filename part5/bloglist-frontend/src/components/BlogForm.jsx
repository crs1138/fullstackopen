import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onSubmit = (eve) => {
        eve.preventDefault()
        handleSubmit({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <>
            <h3>Add new blog</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="url">URL: </label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </>
    )
}

BlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}
export default BlogForm
