const Page = require('../models/Page.model');


let getAllCustomers = (socket) => {
    instanceAxios.get(Page.urls.getAllCustomers)
        .then(function (resp) {
            socket.emit("get-all-customers-success", resp.data);
        })
        .catch(function (jqXHR) {
            socket.emit("get-all-customers-error", jqXHR.response.status);
        });
}

let getCustomerById = (socket, data) => {
    instanceAxios.get(Page.urls.getCustomerById + "/" + data.customer.id)
        .then(function (resp) {
            let obj = {
                customer: resp.data,
                clientId: data.clientId
            }
            socket.emit("get-customer-success", JSON.stringify(obj));
        })
        .catch(function (jqXHR) {
            socket.emit("get-customer-error", jqXHR.response.status);
        });
}

let createCustomer = (socket, data) => {
    // console.log("createCustomer data =====");
    // console.log(data);
    instanceAxios.post(Page.urls.saveNew, data.customer)
        .then(function (resp) {
            let obj = {
                customer: resp.data,
                clientId: data.clientId
            }
            _io.sockets.in(socket.roomByRooms).emit("create-customer-success", JSON.stringify(obj));
        })
        .catch(function (jqXHR) {
            let statusCode = jqXHR.response.status;
            
            let obj = {
                statusCode: statusCode,
                errors: null
            }

            if (statusCode === 400 || statusCode === 409) {
                obj.errors = jqXHR.response.data;
            }

            socket.emit("create-customer-error", JSON.stringify(obj));
        });
}

let updateCustomer = (socket, data) => {
    instanceAxios.put(Page.urls.saveEdit, data.customer)
        .then(function (resp) {
            let obj = {
                customer: resp.data,
                clientId: data.clientId
            }
            _io.sockets.in(socket.roomByRooms).emit("update-customer-success", JSON.stringify(obj));
        })
        .catch(function (jqXHR) {
            let statusCode = jqXHR.response.status;

            console.log(jqXHR.response);
            
            let obj = {
                statusCode: statusCode,
                errors: null
            }

            if (jqXHR.response.data.ts == 'false') {
                obj.ts = false;
            }

            if (statusCode === 400 || statusCode === 409) {
                obj.errors = jqXHR.response.data;
            }

            socket.emit("update-customer-error", JSON.stringify(obj));
        });
}

let deactiveCustomer = (socket, data) => {
    instanceAxios.delete(Page.urls.doDeactivate + "/" + data.customer.id)
        .then(function (resp) {
            let obj = {
                customer: data.customer,
                clientId: data.clientId
            }
            _io.sockets.in(socket.roomByRooms).emit("deactive-customer-success", JSON.stringify(obj));
        })
        .catch(function (jqXHR) {
            socket.emit("deactive-customer-error", jqXHR.response.status);
        });
}


let CustomerService = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deactiveCustomer
}

module.exports = CustomerService;