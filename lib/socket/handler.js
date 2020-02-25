/* eslint-disable no-restricted-syntax */
const logger = require('../logger');
const Socket = require('../socket');
const Subscriber = require('../cache/subscriber');

const subscriber = new Subscriber();

function SocketHandler(httpServer) {
  const socketIo = new Socket(httpServer);

  socketIo.sockets.on('connection', (socket) => {
    subscriber.subscribe('issues');
    subscriber.subscribe('commits');

    subscriber.client.on('message', (channel, message) => {
      socket.broadcast
        .to(message.projectId)
        .emit(channel, JSON.parse(message));
    });

    socket.on('subscribe', (data) => {
      socket.join(data.channel);
    });

    socket.on('unsubscribe', () => {
      const rooms = socketIo.sockets.manager.roomClients[socket.id];

      for (let room in rooms) {
        if (room.length > 0) {
          room = room.substr(1);
          socket.leave(room);
        }
      }
    });
  });

  socketIo.sockets.on('error', (...args) => {
    logger.error(args);
  });
}

module.exports = SocketHandler;
