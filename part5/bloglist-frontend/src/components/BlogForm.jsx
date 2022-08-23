const BlogForm = ({
    title,
    author,
    url,
    onTitleChange,
    onAuthorChange,
    onUrlChange,
    onSubmit,
}) => (
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
                    onChange={onTitleChange}
                />
            </div>
            <div>
                <label htmlFor="author">Author: </label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={author}
                    onChange={onAuthorChange}
                />
            </div>
            <div>
                <label htmlFor="url">URL: </label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    value={url}
                    onChange={onUrlChange}
                />
            </div>
            <div>
                <button type="submit">Create</button>
            </div>
        </form>
    </>
)

export default BlogForm
