const socketIo = require('socket.io')

const SocketServer = (server) => {
    const io = socketIo(server)

    io.on('connection', (socket)=> {
        socket.on('join', async(user) => {
            console.log("new user join: ", user.firstName);
        })
    })
}

module.exports = SocketServer