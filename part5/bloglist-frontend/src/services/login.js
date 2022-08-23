import axios from 'axios'

const login = async ({ username, password }) => {
    const result = await axios.post('/api/login', { username, password })
    return result.data
}

const loginServices = { login }
export default loginServices
