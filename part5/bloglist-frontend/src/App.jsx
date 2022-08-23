import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [notification, setNotification] = useState(null)

    const showNotification = ({ message, type }) => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 3333)
    }

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const userLoggedIn = window.localStorage.getItem('bloglistAppUser')
            ? JSON.parse(window.localStorage.getItem('bloglistAppUser'))
            : null
        setUser(userLoggedIn)
        blogService.setToken(userLoggedIn?.token)
    }, [])

    // Login/logout handlers
    const handleLogin = async (eve) => {
        try {
            eve.preventDefault()
            const user = await loginService.login({ username, password })

            showNotification({
                message: `User ${user.name} logged in successfully`,
                type: 'success',
            })
            window.localStorage.setItem('bloglistAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            showNotification({
                message: `wrong username or password`,
                type: 'error',
            })
        }
    }

    const logout = () => {
        setUser(null)
        window.localStorage.removeItem('bloglistAppUser')
    }

    // BlogForm handlers
    const addBlog = async (eve) => {
        eve.preventDefault()
        try {
            const blog = await blogService.create({ title, author, url })

            showNotification({
                message: `A new blog "${blog.title}" by ${blog.author} added.`,
                type: 'success',
            })

            setBlogs(blogs.concat(blog))
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            setNotification(exception.response.data.error, 'error')
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const handleTitleChange = ({ target }) => {
        setTitle(target.value)
    }
    const handleAuthorChange = ({ target }) => {
        setAuthor(target.value)
    }
    const handleUrlChange = ({ target }) => {
        setUrl(target.value)
    }

    return (
        <div>
            {user === null ? (
                <>
                    <h2>Login to the application</h2>
                    {notification && (
                        <Notification
                            message={notification.message}
                            type={notification.type}
                        />
                    )}
                    <LoginForm
                        onSubmit={handleLogin}
                        username={username}
                        password={password}
                        onUsernameChange={({ target }) =>
                            setUsername(target.value)
                        }
                        onPasswordChange={({ target }) =>
                            setPassword(target.value)
                        }
                    />
                </>
            ) : (
                <>
                    <h2>Blogs</h2>
                    {notification && (
                        <Notification
                            message={notification.message}
                            type={notification.type}
                        />
                    )}
                    <p>
                        {user.name} logged in{' '}
                        <button type="button" onClick={logout}>
                            logout
                        </button>
                    </p>
                    <BlogForm
                        title={title}
                        author={author}
                        url={url}
                        onTitleChange={handleTitleChange}
                        onAuthorChange={handleAuthorChange}
                        onUrlChange={handleUrlChange}
                        onSubmit={addBlog}
                    />
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </>
            )}
        </div>
    )
}

export default App
