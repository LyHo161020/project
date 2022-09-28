const Page = require('../models/Page.model');


let getTransfer = (socket, data) => {
    instanceAxios.get(Page.urls.getTransfer + "/" + data.transfer.senderId)
        .then(function (resp) {
            let obj = {
                transfer: resp.data.transfer,
                recipients: resp.data.recipients,
                clientId: data.clientId
            }
            socket.emit("get-transfer-success", JSON.stringify(obj));
        })
        .catch(function (jqXHR) {
            socket.emit("get-transfer-error", jqXHR.response.status);
        });
}


let transfer = (socket, data) => {

    instanceAxios.post(Page.urls.doTransfer, data.transfer)
        .then(function (resp) {
            let obj = {
                sender: resp.data.sender,
                recipient: resp.data.recipient,
                clientId: data.clientId
            }
            _io.sockets.in(socket.roomByRooms).emit("transfer-success", JSON.stringify(obj));
        })
        .catch(function (jqXHR) {
            let statusCode = jqXHR.response.status;
            
            let obj = {
                statusCode: statusCode,
                errors: null
            }

            if (statusCode === 400) {
                obj.errors = jqXHR.response.data;
            }

            socket.emit("transfer-error", JSON.stringify(obj));
        });
}


let TransferService = {
    getTransfer,
    transfer
}

module.exports = TransferService;