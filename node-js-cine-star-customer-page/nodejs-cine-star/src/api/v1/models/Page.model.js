// import { App } from './app.model';

const App = require('./App.model');

const Page = {
    url: {
        getAllBranchByMovieId: App.BASE_URL + "/branches/",
        getAllShowDateByMovieAndBranch: App.BASE_URL + "/show-schedules/show_date_customer_page/",
        getAllShowTimeSlot: App.BASE_URL + "/show-schedules/",
        getAllMovie: App.BASE_URL + "/movies",
        getAllSeatType: App.BASE_URL + "/seat_types",
        getSeatsByRoomId: App.BASE_URL + "/seats/"

    },
    element: {},
    loadData: {},
    commands: {},
    dialogs: {
        element: {},
        commands :{}
    }
}


module.exports = Page;