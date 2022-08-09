import axios from 'axios'
const baseUrl = '/api/notes'

function getAll() {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

function create(newObject) {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

function update(id, newObject) {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
}

const noteService = { getAll, create, update }
export default noteService
