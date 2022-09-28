const axios = require('axios');

const RoomService = require('./Room.service');
const AuthService = require('./Auth.service');
const CustomerService = require('./Customer.service');
const DepositService = require('./Deposit.service');
const WithdrawService = require('./Withdraw.service');
const TransferService = require('./Transfer.service');

var listRooms = [];

class SocketService {
    // Connection socket
    connection(socket) {

        console.log("Connected: " + socket.id);
        // console.log("rooms", socket.adapter.rooms);
    
        socket.emit("server-connection", socket.id);
    
        socket.use((packet, next) => {
            global.instanceAxios = axios.create({
                timeout: 10000,
                headers: {
                    Cookie: socket.request.headers.cookie
                },
                withCredentials:true
            });
    
            next();
        });
    
        socket.on("create-room", (roomName) => {
            RoomService.createRoom(socket, roomName, listRooms);
        });

        socket.on("login", (data) => {
            AuthService.login(socket, data);
        });

        socket.on("register", (data) => {
            console.log("begin data ================");
            console.log(data);
            console.log("end data ================");
            AuthService.register(socket, data);
        });
    
        socket.on("disconnect", () => {
            console.log(socket.id + " disconnected");
        });
    
        socket.on("get-all-customers", () => {
            CustomerService.getAllCustomers(socket);
        });

        socket.on("get-customer", (data) => {
            CustomerService.getCustomerById(socket, data);
        });

        socket.on('create-customer', (data) => {
            CustomerService.createCustomer(socket, data);
        });

        socket.on('update-customer', (data) => {
            CustomerService.updateCustomer(socket, data);
        });
    
        socket.on('get-customer-deposit', (data) => {
            DepositService.getCustomerDeposit(socket, data);
        });

        socket.on('get-customer-withdraw', (data) => {
            WithdrawService.getCustomerWithdraw(socket, data);
        });
    
        socket.on('get-transfer', (data) => {
            TransferService.getTransfer(socket, data);
        });

        
        socket.on('deposit', (data) => {
            DepositService.deposit(socket, data);
        });

        socket.on('withdraw', (data) => {
            WithdrawService.withdraw(socket, data);
        });
    
        socket.on('transfer', (data) => {
            TransferService.transfer(socket, data);
        });
    
        socket.on("deactive-customer", (data) => {
            CustomerService.deactiveCustomer(socket, data);
        });
    
    }
}

module.exports = new SocketService();