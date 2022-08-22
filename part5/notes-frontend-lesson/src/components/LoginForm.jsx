const LoginForm = ({
    onLogin,
    username,
    password,
    onUsernameChange,
    onPasswordChange,
}) => {
    return (
        <form onSubmit={onLogin}>
            <div>
                username {` `}
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={onUsernameChange}
                />
            </div>
            <div>
                password: {` `}
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={onPasswordChange}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm
