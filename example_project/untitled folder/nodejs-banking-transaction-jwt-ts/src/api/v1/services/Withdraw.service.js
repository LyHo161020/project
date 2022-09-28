const Page = require('../models/Page.model');


let getCustomerWithdraw = (socket, data) => {
    instanceAxios.get(Page.urls.getWithdraw + "/" + data.customer.id)
        .then(function (resp) {
            let obj = {
                customer: resp.data,
                clientId: data.clientId
            }
            socket.emit("get-withdraw-success", JSON.stringify(obj));
        })
        .catch(function (jqXHR) {
            socket.emit("get-withdraw-error", jqXHR.response.status);
        });
}


let withdraw = (socket, data) => {
    instanceAxios.post(Page.urls.doWithdraw, data.withdraw)
        .then(function (resp) {
            let obj = {
                customer: resp.data,
                clientId: data.clientId
            }
            _io.sockets.in(socket.roomByRooms).emit("withdraw-success", JSON.stringify(obj));
        })
        .catch(function (jqXHR) {
            socket.emit("withdraw-error", jqXHR.response.data);
        });
}


let WithdrawService = {
    getCustomerWithdraw,
    withdraw
}

module.exports = WithdrawService;