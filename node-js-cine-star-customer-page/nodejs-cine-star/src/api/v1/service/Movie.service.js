const Page = require('../models/Page.model');

const getAllMovie = (socket) => {
    instanceAxios.get(Page.url.getAllMovie)
        .then(function (resp) {
            socket.emit("get-all-movie-success", resp.data);
        })
        .catch(function (jqXHR) {
            socket.emit("get-all-movie-error", jqXHR.response.status);
        });
}

const getAllBranchByMovie = (socket , movieId, clientId) => {
    instanceAxios.get(Page.url.getAllBranchByMovieId + movieId)
        .then(function (resp) {
            socket.emit("get-all-branch-by-movie-success", resp.data);
        })
        .catch(function (jqXHR) {
            socket.emit("get-all-branch-by-movie-error", jqXHR.response.status);
        });
}

const getAllShowDateByMovieAndBranch = (socket , movieId, branchId, clientId) => {
    instanceAxios.get(Page.url.getAllShowDateByMovieAndBranch + movieId + "/" + branchId)
        .then(function (resp) {
            socket.emit("get-all-show-date-by-movie-and-branch-success", resp.data);
        })
        .catch(function (jqXHR) {
            socket.emit("get-all-show-date-by-movie-and-branch-error", jqXHR.response.status);
        });
}


const getAllShowTimeSlotHomePage = (socket, res) => {
    instanceAxios.get(Page.url.getAllShowTimeSlot + res.data.movieId + "/" + res.data.branchId + "/" + res.data.showDate)
        .then(function (resp) {
            socket.emit("get-all-show-time-slot-home-page-success", resp.data);
        })
        .catch(function (jqXHR) {
            socket.emit("get-all-show-time-slot-home-page-error", jqXHR.response.status);
        });
}




let MovieService = {
    getAllMovie,
    getAllBranchByMovie,
    getAllShowDateByMovieAndBranch,
    getAllShowTimeSlotHomePage
}

module.exports = MovieService;