import Server from 'socket.io';
import fs from 'fs';

export function startServer(store) {
  const io = new Server().attach(8090);
  store.subscribe(() => {
    //Emit the event upon state change, also save into json via fs. May cause race condition - not sure.
    io.emit('state', store.getState().toJS());
    fs.writeFileSync(`${__dirname}/../data/saved.json`, JSON.stringify(store.getState().toJS().movies));
  });

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });

  console.log('Socket.io is now listening at 8090');
}