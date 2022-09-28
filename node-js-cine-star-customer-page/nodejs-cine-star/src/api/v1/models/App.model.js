class App {
    // static DOMAIN = location.origin;

    static DOMAIN = 'http://localhost:10001';


    static BASE_URL = this.DOMAIN + "/api";
    static BASE_URL_MOVIE = this.DOMAIN + "/api/movies";
    static BASE_URL_CATEGORY = this.DOMAIN + "/api/categories";
    static BASE_URL_CUSTOMER_NOW_SHOWING = this.DOMAIN + "/api/customer/list_nowShowing"

    static BASE_URL_FOOD = this.DOMAIN + "/api/foods";
    static BASE_URL_SIZE = this.DOMAIN + "/api/sizes";
    static BASE_URL_LOGOUT = "/logout";

    static SUCCESS_ADDED = "Add food successfully!!";
    static SUCCESS_EDITED = "Edit food successfully!";
    static SUCCESS_REMOVED = "Remove successfully!";
    static FAIL_LOAD = "Load data failed!";


    static ERROR_400 = "Giao dịch không thành công, vui lòng kiểm tra lại dữ liệu.";
    static ERROR_401 = "Bạn chưa đăng nhập! Vui lòng đăng nhập!";
    static ERROR_403 = "Thực hiện thất bại! Tài khoản của bạn không có quyền thực hiện chức năng này.";
    static ERROR_404 = "An error occurred. Please try again later!";
    static ERROR_500 = "Lưu dữ liệu không thành công, vui lòng liên hệ quản trị hệ thống.";

    static UNLOCK_USER_SUCCESS = "Unlock user success!";
    static BLOCK_USER_SUCCESS = "Block user success!";
    static CREATE_USER_SUCCESS = "Create user success!";
    static UPDATE_USER_SUCCESS = "Update user success!";


    static CREATE_SHOW_SCHEDULE_SUCCESS = "Create show schedule success!";
    static UPDATE_SHOW_SCHEDULE_SUCCESS = "Update show schedule success!";
    static DELETE_SHOW_SCHEDULE_SUCCESS = "Delete show schedule success!";

    static SweetAlert = class {

        static showConfirmDelete(mess, ok, notOk) {
            return Swal.fire({
                icon: 'warning',
                text: mess,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: ok,
                cancelButtonText: notOk,
            })
        }

        static showRemoveConfirmDialog() {
            return Swal.fire({
                icon: 'warning',
                text: 'Bạn có chắc muốn xoá đi lịch chiếu này không?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý!',
                cancelButtonText: 'Huỷ',
            })
        }

        static showSuspendConfirmDialogCustomer() {
            return Swal.fire({
                icon: 'warning',
                text: 'Bạn có chắc muốn khoá tài khoản này không?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý!',
                cancelButtonText: 'Huỷ',
            })
        }

        static showUnlockConfirmDialogCustomer() {
            return Swal.fire({
                icon: 'warning',
                text: 'Bạn có chắc muốn mở khoá tài khoản này không?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý!',
                cancelButtonText: 'Huỷ',
            })
        }

        static showSuccessAlert(t) {
            Swal.fire({
                icon: 'success',
                title: t,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500
            })
        }

        static showErrorAlert(t) {
            Swal.fire({
                icon: 'error',
                title: 'Warning',
                text: t
            })
        }
    }

    static IziToast = class {
        static showSuccessAlert(t) {
            iziToast.success({
                title: 'OK',
                position: 'topRight',
                timeout: 2500,
                message: t
            });
        }

        static showErrorAlert(t) {
            iziToast.error({
                title: 'Error',
                position: 'topRight',
                timeout: 3500,
                message: t
            });
        }
    }
}

module.exports = App;