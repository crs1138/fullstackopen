import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const save = async (newAnecdote) => {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const update = async (id, updatedObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
    return response.data
}

const anecdoteServices = { getAll, save, update }

export default anecdoteServices
