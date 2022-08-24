import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
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
    const handleLogin = async ({ username, password }) => {
        try {
            const user = await loginService.login({ username, password })

            showNotification({
                message: `User ${user.name} logged in successfully`,
                type: 'success',
            })
            window.localStorage.setItem('bloglistAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
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
    const addBlog = async ({ title, author, url }) => {
        try {
            const blog = await blogService.create({ title, author, url })

            showNotification({
                message: `A new blog "${blog.title}" by ${blog.author} added.`,
                type: 'success',
            })

            setBlogs(blogs.concat(blog))

            blogFormRef.current.toggleVisibility()
        } catch (exception) {
            setNotification(exception.response.data.error, 'error')
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const blogFormRef = useRef()

    const blogForm = () => (
        <Toggable buttonLabel="Add blog" ref={blogFormRef}>
            <BlogForm handleSubmit={addBlog} />
        </Toggable>
    )

    const handleLike = async (newBlogItem) => {
        const newUserData = {
            ...newBlogItem,
            user: newBlogItem.user.id,
        }
        const newBlogDetails = await blogService.update(
            newBlogItem.id,
            newUserData
        )
        const updatedBlogs = blogs.map((blog) => {
            return blog.id === newBlogDetails.id
                ? { ...newBlogDetails, user: blog.user }
                : blog
        })
        setBlogs(updatedBlogs)
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
                    <LoginForm handleLogin={handleLogin} />
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
                    {blogForm()}

                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            handleLike={handleLike}
                        />
                    ))}
                </>
            )}
        </div>
    )
}

export default App
