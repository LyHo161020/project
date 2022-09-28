
let createRoom = (socket, roomName, listRooms) => {
    socket.join(roomName);
    socket.roomByRooms = roomName;

    if (listRooms.indexOf(roomName) >= 0) {

    } else {
        listRooms.push(roomName);
    }
    console.log("listRooms", listRooms);

    _io.sockets.emit("server-send-rooms", listRooms);
    socket.emit("server-send-room-socket", roomName);
    // socket.broadcast.emit("server-send-room-socket", roomName);
}


let RoomService = {
    createRoom
}

module.exports = RoomService;