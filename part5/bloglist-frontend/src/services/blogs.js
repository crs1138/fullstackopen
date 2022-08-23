import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = async ({ title, author, url }) => {
    const config = { headers: { Authorization: token } }
    const request = await axios.post(baseUrl, { title, author, url }, config)
    return request.data
}

const blogServices = { getAll, setToken, create }
export default blogServices
