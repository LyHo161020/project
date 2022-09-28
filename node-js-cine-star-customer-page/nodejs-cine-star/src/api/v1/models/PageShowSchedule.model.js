// import { App } from './app.model';

const App = require('./App.model');

const PageShowSchedule = {
    url: {
        getDataLength: App.BASE_URL + "/show-schedules",
        getSchedulesPaging: App.BASE_URL + "/show-schedules/paging/",
        getScheduleById: App.BASE_URL + "/show-schedules/",
        createShowSchedule: App.BASE_URL + "/show-schedules/create",
        updateShowSchedule: App.BASE_URL + "/show-schedules/update/",
        deleteShowSchedule: App.BASE_URL + "/show-schedules/delete/",
        searchShowSchedule: App.BASE_URL + "/show-schedules/search",
        getAllBranch: App.BASE_URL + "/branches",
        getAllRoomByBranchId: App.BASE_URL + "/rooms/",
        getAllMovie: App.BASE_URL + "/movies",
        getAllBranchByMovieId: App.BASE_URL + "/branches/",
        getAllRoomByMovieAndBranch: App.BASE_URL + "/show-schedules/rooms/",
        getAllShowDateByMovieAndRoom: App.BASE_URL + "/show-schedules/show-date/",
        getAllShowTimeSlot: App.BASE_URL + "/show-schedules/show-time-slot/"
    },
    element: {},
    loadData: {},
    commands: {},
    dialogs: {
        element: {},
        commands :{}
    }
}


module.exports = PageShowSchedule;