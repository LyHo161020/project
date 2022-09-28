// import { App } from './app.model';

const App = require('./App.model');

const Page = {
    urls: {
        login: App.BASE_URL_AUTH + "/login",
        register: App.BASE_URL_AUTH + "/register",
        getAllCustomers: App.BASE_URL_CUSTOMER,
        getAllProvinces: App.BASE_URL_PROVINCE + "/",
        getAllDistricts: App.BASE_URL_PROVINCE + "/district",
        getAllWards: App.BASE_URL_PROVINCE + "/ward",
        getCustomerById: App.BASE_URL_CUSTOMER + '/edit',
        getDeposit: App.BASE_URL_CUSTOMER + '/deposit',
        getWithdraw: App.BASE_URL_CUSTOMER + '/withdraw',
        getTransfer: App.BASE_URL_CUSTOMER + '/transfer',
        saveNew: App.BASE_URL_CUSTOMER,
        saveEdit: App.BASE_URL_CUSTOMER + '/edit',
        doDeposit: App.BASE_URL_CUSTOMER + '/deposit',
        doWithdraw: App.BASE_URL_CUSTOMER + '/withdraw',
        doTransfer: App.BASE_URL_CUSTOMER + '/transfer',
        doDeactivate: App.BASE_URL_CUSTOMER + '/deactivate'
    },
    elements: {},
    loadData: {},
    commands: {},
    dialogs: {
        elements: {},
        loadData: {},
        commands: {},
        close: {},
        alertDanger: {},
        inputError: {}
    }
}


module.exports = Page;