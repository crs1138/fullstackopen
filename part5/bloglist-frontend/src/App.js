import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const userLoggedIn =
            window.localStorage.getItem('bloglistAppUser') || null
        setUser(JSON.parse(userLoggedIn))
    }, [])

    const handleLogin = async (eve) => {
        try {
            eve.preventDefault()
            const user = await loginService.login({ username, password })
            setUser(user)
            window.localStorage.setItem('bloglistAppUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.error(exception.response.data.error)
        }
    }

    const logout = () => {
        setUser(null)
        window.localStorage.removeItem('bloglistAppUser')
    }

    return (
        <div>
            {user === null ? (
                <>
                    <h2>Login to the application</h2>
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
                    <p>
                        {user.name} logged in{' '}
                        <button type="button" onClick={logout}>
                            logout
                        </button>
                    </p>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </>
            )}
        </div>
    )
}

export default App
