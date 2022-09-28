const PageShowSchedule = require("../models/PageShowSchedule.model");

const getAllScheduleMovie = (socket , data) => {
    instanceAxios.get(PageShowSchedule.url.get)
        .then(function (resp) {
            socket.emit("get-all-movie-success", resp.data);
        })
        .catch(function (jqXHR) {
            socket.emit("get-all-movie-error", jqXHR.response.status);
        });
}