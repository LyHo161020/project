
class AppBase {
    // static DOMAIN_API = location.origin;
    static DOMAIN_API = 'http://localhost:10001';


    static BASE_URL_API = this.DOMAIN_API + "/api";
    static BASE_URL_LOGIN = this.BASE_URL_API + "/auth/login";
    static BASE_URL_MOVIE = this.BASE_URL_API + "/movies";
    static BASE_URL_CATEGORY = this.BASE_URL_API + "/categories";
    static BASE_URL_CUSTOMER_NOW_SHOWING = this.BASE_URL_API + "/customer/list_nowShowing"

    static BASE_URL_FOOD = this.BASE_URL_API + "/foods";
    static BASE_URL_SIZE = this.BASE_URL_API + "/sizes";
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
                position: 'center',
                showConfirmButton: false,
                timer: 1500
            })
        }

        static showErrorAlert(t) {
            Swal.fire({
                icon: 'error',
                title: 'Warning',
                text: t,
                position: 'center',
                timer: 1500
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

    static drawBranchesOnShowSchedulePage(branchId, branchName) {
        let str = `
            <li>
                <a href="javascript:void(0);"
                   data-target="${branchId}">
                   <h3>${branchName}</h3>
                </a>
            </li>
        `;
        return str;
    }

    static drawScheduleDetails(movieId, movieName, moviePic, movieDes) {
        let str = `
            <div class="schedule-item"  cine-id="${movieId}" cine-name="${movieName}">
                <div class="film-item cl-org t-2d">
                    <a href="http://cinestar.com.vn/phim/886acb7c-a361-478a-8922-7c33d7200137">
                                    <div class="film-item-pic">
                            <img src="${moviePic}" alt="${movieName}">
                        </div>
                                    <div class="film-item-txt">
                            <h3>${movieName}</h3>
                            <p>${movieDes}</p>
                        </div>
                    </a>
                    <div class="film-item-type">
                        <span class="icon-2d"></span>
                    </div>
                </div>
            
                <div class="schedule" id="schedule-${movieId}">                                  
                </div>
            </div>
        `;

        return str;
    }

    static drawShowDate(showDate, date, year) {
        let str = `
            <div class="row ${showDate}">
                <div class="row-date" data-date="${showDate}"><span>${date}<br>${year}</span></div>
            </div>
        `;
        return str;
    }

    static drawShowTimeSlot(movieId, roomId, slot) {
        let str = `
            <li data-id="${movieId}" data-room-name="${roomId}">${slot}</li>
        `;
        return str;
    }

    static drawSeat(id, name, price, left, top) {
        let str = `<div class="single" data-type-seat-id = "1" data-seat-id = "${id}" data-price="${price}" 
                        style="left:${left + 'px'}; top: ${top + 'px'}; width: 43px; height: 46px;position: absolute; padding: 12px; text-align: center; vertical-align: middle; font-family: 'Futurab'; font-weight: normal; font-size: 11px; color: #fff; text-transform: uppercase;">
                        ${name}
                   </div>`
        return str;
    }

    static drawSeatCouple(id, name, price, left, top) {
        let str = `<div class="couple" data-type-seat-id = "2" data-seat-id = "${id}" data-price="${price}" 
                        style="left:${left + 'px'}; top: ${top + 'px'}; width: 86px; height: 46px;position: absolute; padding: 12px; text-align: center; vertical-align: middle; font-family: 'Futurab'; font-weight: normal; font-size: 11px; color: #fff; text-transform: uppercase;">
                        ${name}
                   </div>`
        return str;
    }

    static drawMovie(obj) {
        let str = `
            <div class="slide-item" style="width: 240px;">
                <div class="movie-item n_2d hide">
                    <div class="movie-pic">
                        <img class="lazyload" alt="${obj.title}" src="${obj.fileUrl}">
                    </div>
                    <div class="movie-txt">
                        <h3>${obj.title}</h3>
                    </div>
                    <div class="movie-over">
                        <a href="https://cinestar.com.vn/phim/3e9eeda9-2fef-427b-a1ad-ea0a4d5b440f">
                            <p>${obj.description}</p>
                            <span class="atc" style="display: block;">...</span>
                            <span class="detail-link">Chi tiết</span>
                        </a>
                        <a class="trailler-btn fontsize13" href="${obj.trailer}">Xem trailer</a>
                        <a class="cart-btn fontsize13"
                           href="https://cinestar.com.vn/lichchieu/3e9eeda9-2fef-427b-a1ad-ea0a4d5b440f">
                           Mua vé
                       </a>
                    </div>
                </div>
            </div>
        `;

        return str;
    }

    static drawFood(data) {
        let str = ` 
                    <div class="combo-item">
                        <div class="combo-text">
                            <h3>${data.name}</h3>
                            <p>${data.name}</p>
                            <div class="combo-price">giá:<span class="text-price">${data.price}</span><sup>đ</sup></div>
                        </div>
                        <div class="combo-input"><a href="javascript:void(0);" class="cmb-minus">-</a><input data-price="${data.price}" data-name="${data.name}" type="text" value="0" size="3"><a
                                href="javascript:void(0);" class="cmb-add">+</a></div>
                        <div class="combo-total">
                            <div class="combo-total-outer"><span>0</span><sup>đ</sup></div>
                        </div>
                    </div>`;

        return str;
    }

    static drawBillMovie(data) {
        let str = `    <div class="confirm-film-pic"><img src="${data.image}"></div>
                       <div class="confirm-film-text">
                            <h3>${data.movieName}</h3>
                            <p>Ngày chiếu: <strong>${data.showDate}</strong></p>
                            <p>Xuất chiếu: <strong>${data.showTimeSlot}</strong></p>
                            <p><span class="icon-3d"></span></p>
                       </div>
                              `;
        return str;
    }
    

    static drawBillSeat(data) {
        let str = `  <li>
                        <div class="confirm-mark">${data.seatName}</div>
                        <div class="confirm-value"><span>${data.price}</span><sup>đ</sup></div>
                    </li>`;
        return str;
    }

    static drawBillFood(data) {
        let str = `<li>
                      <div class="confirm-mark">${data.product}</div>
                      <div class="confirm-value"><span>${data.totalPrice}</span><sup>đ</sup></div>
                  </li>`;
        return str;
    }
    
}

export {
    AppBase
};

// module.exports = AppBase;



