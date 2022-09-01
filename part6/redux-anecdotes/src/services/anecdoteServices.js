import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/anecdotes`)
    return response.data
}

const anecdoteServices = { getAll }

export default anecdoteServices
