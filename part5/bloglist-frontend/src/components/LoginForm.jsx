const LoginForm = ({
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
}) => (
    <form onSubmit={onSubmit}>
        <div>
            Username: {` `}
            <input
                type="text"
                name="Username"
                value={username}
                onChange={onUsernameChange}
            />
        </div>
        <div>
            Password: {` `}
            <input
                type="password"
                name="Password"
                value={password}
                onChange={onPasswordChange}
            />
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
    </form>
)

export default LoginForm
