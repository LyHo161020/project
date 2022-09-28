const axios = require('axios');
// import { Movie } from '/';

const MovieService = require('./Movie.service');

const SeatTypeService = require("./SeatType.service");

const SeatService = require("./Seat.service");

const BranchService = require("./Branch.service");


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
    
        socket.on("get-all-movie", () => {
            MovieService.getAllMovie(socket);
        });

        socket.on("get-all-branch-by-movie", (movieId, clientId) => {
            MovieService.getAllBranchByMovie(socket, movieId, clientId);
        });

        socket.on('get-all-show-date-by-movie-and-branch', (movieId , branchId, clientId) => {
            MovieService.getAllShowDateByMovieAndBranch(socket, movieId , branchId, clientId);
        });

        socket.on('get-all-show-time-slot-home-page', (data) => {
            MovieService.getAllShowTimeSlotHomePage(socket, data);
        });

        socket.on("get-all-seat-type", () => {
            SeatTypeService.getAllSeatType(socket);
        })

        socket.on("get-seats-by-room" , (data) => {
            SeatService.getSeatsByRoomId(socket, data);
        })
//  <=========================================================>


        socket.on("get-all-branch" , () => {
            BranchService.getAllBranch(socket);
        })

        socket.on("get-all-schedule-movie", (data) => {
            
        }) 



        // socket.on('update-customer', (data) => {
        //     CustomerService.updateCustomer(socket, data);
        // });
    
        // socket.on('get-customer-deposit', (data) => {
        //     DepositService.getCustomerDeposit(socket, data);
        // });

        // socket.on('get-customer-withdraw', (data) => {
        //     WithdrawService.getCustomerWithdraw(socket, data);
        // });
    
        // socket.on('get-transfer', (data) => {
        //     TransferService.getTransfer(socket, data);
        // });

        
        // socket.on('deposit', (data) => {
        //     DepositService.deposit(socket, data);
        // });

        // socket.on('withdraw', (data) => {
        //     WithdrawService.withdraw(socket, data);
        // });
    
        // socket.on('transfer', (data) => {
        //     TransferService.transfer(socket, data);
        // });
    
        // socket.on("deactive-customer", (data) => {
        //     CustomerService.deactiveCustomer(socket, data);
        // });
    
    }
}

module.exports = new SocketService();