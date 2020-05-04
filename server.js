const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  console.log('a socket is connected');
  socket.on('chatEvent', function (msg) {
    console.log('msg from client:' + msg);
    // socket.send('server says ' + msg)
    socket.broadcast.emit('ServerMsg', msg);
  })
})

http.listen(3001, function () {
  console.log('server is running on :3001')
})