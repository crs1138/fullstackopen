const http = require('http')

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-type': 'text/plain' })
    response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)
