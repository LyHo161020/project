import {AppBase} from "./AppBase.js";

let moviePage = {
    urls: {
        loadListNowShowing: AppBase.BASE_URL_CUSTOMER_NOW_SHOWING,
        getAllMovies : AppBase.BASE_URL_MOVIE,
        logout: AppBase.BASE_URL_LOGOUT
    },
    element: {},
    loadData: {},
    commands: {},
    dialogs: {
        element: {},
        commands: {},
        close: {},
        alertDanger: {},
        inputError: {}
    }
}

export {
    moviePage
}