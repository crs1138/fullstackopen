import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (eve) => {
        eve.preventDefault()
        handleLogin({ username, password })
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                Username: {` `}
                <input
                    type="text"
                    name="Username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                Password: {` `}
                <input
                    type="password"
                    name="Password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm
