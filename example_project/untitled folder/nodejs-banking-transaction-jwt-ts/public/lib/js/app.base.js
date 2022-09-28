class App {

    static DOMAIN = "http://localhost:8091";

    static BASE_URL_AUTH = this.DOMAIN + "/api/auth"
    static BASE_URL_CUSTOMER = this.DOMAIN + "/api/customers";
    static BASE_URL_TRANSFER = this.DOMAIN + "/api/transfers";

    static BASE_URL_PROVINCE = "https://vapi.vnappmob.com/api/province";

    static AlertMessageEn = class {
        static SUCCESS_CREATED = "Successful data generation !";
        static SUCCESS_UPDATED = "Data update successful !";
        static SUCCESS_DEPOSIT = "Deposit transaction successful !";
        static SUCCESS_WITHDRAW = "Withdrawal transaction successful !";
        static SUCCESS_TRANSFER = "Transfer transaction successful !";
        static SUCCESS_DEACTIVATE = "Deactivate the client successfully !";

        static ERROR_400 = "The operation failed, please check the data again.";
        static ERROR_401 = "Unauthorized - Your access token has expired or is not valid.";
        static ERROR_403 = "Forbidden - You are not authorized to access this resource.";
        static ERROR_404 = "This content has been removed or does not exist.";
        static ERROR_500 = "Server error, please contact the system administrator.";
        static ERROR_502 = "Server Error - The server encountered a temporary error and could not complete your request.";
        static ERROR_TS = "Customer information has been changed, updated data will be reloaded.";

        static ERROR_LOADING_PROVINCE = "Loading list of provinces - cities failed !";
        static ERROR_LOADING_DISTRICT = "Loading list of district - ward failed !"
        static ERROR_LOADING_WARD = "Loading list of wards - communes - towns failed !";
    }

    static Notify = class {
        static showSuccessAlert(m) {
            $.notify(m, "success");
        }

        static showErrorAlert(m) {
            $.notify(m, "error");
        }
    }

    static SweetAlert = class {
        static showSuccessAlert(t) {
            Swal.fire({
                icon: 'success',
                title: t,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            })
        }
    
        static showErrorAlert(t) {
            Swal.fire({
                icon: 'error',
                title: 'Warning',
                text: t,
            })
        }

        static showErrorAlertConfirm(t) {
            return Swal.fire({
                icon: 'error',
                title: 'Warning',
                showConfirmButton: true,
                allowOutsideClick: false,
                text: t,
            })
        }

        static showDeactivateConfirmDialog() {
            return Swal.fire({
                icon: 'warning',
                text: 'Are you sure to deactivate the selected customer ?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, please deactivate this client !',
                cancelButtonText: 'Cancel',
            })
        }
    }

    static IziToast = class {
        static showSuccessAlert(m) {
            iziToast.success({
                title: 'OK',
                position: 'bottomRight',
                timeout: 2500,
                message: m
            });
        }

        static showErrorAlert(m) {
            iziToast.error({
                title: 'Error',
                position: 'bottomRight',
                timeout: 2500,
                message: m
            });
        }
    }

    static formatNumber() {
        $(".num-space").number(true, 0, ',', ' ');
        $(".num-point").number(true, 0, ',', '.');
        $(".num-comma").number(true, 0, ',', ',');
    }

    static formatNumberSpace(x) {
        return x.toString().replace(/ /g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    static removeFormatNumberSpace(x) {
        return x.toString().replace(/ /g, "")
    }

    static formatTooltip() {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

export { 
    App
};