const Page = require("../models/Page.model");

const getSeatsByRoomId = (socket, res) => {
    console.log(res.data.roomId);
    instanceAxios.get(Page.url.getSeatsByRoomId + res.data.roomId)
        .then(function(resp) {
            socket.emit("get-seats-by-room-success", resp.data);
        })
        .catch(function (jqXHR) {
            console.log(jqXHR);
            socket.emit("get-seats-by-room-error", jqXHR.response.status);
        }); 
}


const SeatService = {
    getSeatsByRoomId
}

module.exports = SeatService;