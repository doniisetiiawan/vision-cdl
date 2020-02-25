const socketio = require('socket.io');
const config = require('../configuration');

function Socket(server) {
  socketio.listen(server);
  if (config.get('sockets:browserclientminification')) socketio.enable('browser client minification');
  if (config.get('sockets:browserclientetag')) socketio.enable('browser client etag');
  if (config.get('sockets:browserclientgzip')) socketio.enable('browser client gzip');
  socketio.set(
    'polling duration',
    config.get('sockets:pollingduration'),
  );
  socketio.set('log level', config.get('sockets:loglevel'));
  socketio.set('transports', [
    'websocket',
    'flashsocket',
    'htmlfile',
    'xhr-polling',
    'jsonp-polling',
  ]);

  return socketio;
}

module.exports = Socket;
