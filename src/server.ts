import http from 'http'
import app from './app'

const port = process.env.PORT || 3000
app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') throw error
  /* eslint-disable no-fallthrough */
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`)
      process.exit(1)
      case 'EADDRINUSE':
        console.error(`Port ${port} is already in use`)
        process.exit(1)
    default:
      throw error
  }
})

server.on('listening', () => {
  const addr = server.address()
  if (addr) {
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
    console.log(`Listening on ${bind}`)
  }
})
