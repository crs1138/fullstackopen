import axios from 'axios'

const baseUrl = `http://localhost:3001/persons`

function getAll() {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

function save(newObject) {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

function remove(id) {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

function update(id, newObject) {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
}

const connectService = { getAll, save, update, remove }
export default connectService
