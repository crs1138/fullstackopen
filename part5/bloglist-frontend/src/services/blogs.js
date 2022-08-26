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

const create = async ({ title, author, url, likes = 0 }) => {
    const config = { headers: { Authorization: token } }
    const request = await axios.post(
        baseUrl,
        { title, author, url, likes },
        config
    )
    return request.data
}

const update = async (id, newBlogData) => {
    const request = await axios.put(`${baseUrl}/${id}`, newBlogData)
    return request.data
}

const remove = async (id) => {
    const config = { headers: { Authorization: token } }
    await axios.delete(`${baseUrl}/${id}`, config)
}

const blogServices = { getAll, setToken, create, update, remove }
export default blogServices
