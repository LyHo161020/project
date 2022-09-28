import { AppBase } from "./AppBase.js";
// const AppBase = require('./AppBase');


let homePage = {
    url: {
        getAllBranchByMovieId: AppBase.BASE_URL_API + "/branches/",
        getAllShowDateByMovieAndBranch: AppBase.BASE_URL_API + "/show-schedules/show_date_customer_page/",
        getAllShowTimeSlot: AppBase.BASE_URL_API + "/show-schedules/",
        getAllMovie: AppBase.BASE_URL_API + "/movies",
        getAllSeatType: AppBase.BASE_URL_API + "/seat_types",
        getSeatsByRoomId: AppBase.BASE_URL_API + "/seats/",
        getAllFood: AppBase.BASE_URL_API + "/foods"
    },
    element: {},
    loadData: {},
    commands: {},
    dialogs: {
        element: {},
        commands :{}
    }
}

export {
    homePage
};