import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

function getAll() {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

async function create(newObject) {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

function update(id, newObject) {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
}

const noteService = { getAll, create, update, setToken }
export default noteService
