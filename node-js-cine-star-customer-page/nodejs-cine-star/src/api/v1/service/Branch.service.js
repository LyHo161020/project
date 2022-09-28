const PageShowSchedule = require("../models/PageShowSchedule.model");

const getAllBranch = (socket) => {
    instanceAxios.get(PageShowSchedule.url.getAllBranch)
        .then(function (resp) {
            socket.emit("get-all-branch-success", resp.data);
        })
        .catch(function (jqXHR) {
            socket.emit("get-all-branch-error", jqXHR.response.status);
        });
}

const BranchService = {
    getAllBranch
}

module.exports = BranchService;