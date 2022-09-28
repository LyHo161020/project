const Page = require("../models/Page.model");

const getAllSeatType = (socket) => {
    instanceAxios.get(Page.url.getAllSeatType) 
        .then ( function(resp) {
            socket.emit("get-all-seat-type-success", resp.data);
        })
        .catch(function (jqXHR) {
            socket.emit("get-all-seat-type-error", jqXHR.response.status);
        }); 
}

const SeatTypeService = {
    getAllSeatType
}

module.exports = SeatTypeService;