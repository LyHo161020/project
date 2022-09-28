const Page = require('../models/Page.model');


let getCustomerDeposit = (socket, data) => {
    instanceAxios.get(Page.urls.getDeposit + "/" + data.customer.id)
        .then(function (resp) {
            let obj = {
                customer: resp.data,
                clientId: data.clientId
            }
            socket.emit("get-deposit-success", JSON.stringify(obj));
        })
        .catch(function (jqXHR) {
            socket.emit("get-deposit-error", jqXHR.response.status);
        });
}


let deposit = (socket, data) => {
    instanceAxios.post(Page.urls.doDeposit, data.deposit)
        .then(function (resp) {
            let obj = {
                customer: resp.data,
                clientId: data.clientId
            }
            _io.sockets.in(socket.roomByRooms).emit("deposit-success", JSON.stringify(obj));
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

            socket.emit("deposit-error", JSON.stringify(obj));
        });
}


let DepositService = {
    getCustomerDeposit,
    deposit
}

module.exports = DepositService;