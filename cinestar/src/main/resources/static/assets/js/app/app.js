class App {
    static DOMAIN = location.origin;
    static BASE_URL = this.DOMAIN + "/api";
    static BASE_URL_LOGIN = this.DOMAIN + "/api/auth/login";
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

        static showRemoveConfirmDialogFood() {
            return Swal.fire({
                icon: 'warning',
                text: 'Bạn có chắc muốn xoá đồ ăn này không?',
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
                timer: 2000
            })
        }

        static showErrorAlert(t) {
            Swal.fire({
                icon: 'error',
                title: 'Warning',
                text: t,
                position: 'center',
                timer: 2000
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

    static drawRowMovie(id, title, image, premiereDate, showDuration, director, actor, language) {
        let str = `
            <tr id="tr_${id}" >
                <td>
                    <b>${id}</b>
                </td>
                <td>
                    ${title}
                </td>
                <td>
                    <img src="${image}" class="rounded mx-auto d-block img-thumbnail" alt="">
                </td>
                <td>
                    ${premiereDate}
                </td>
                <td>
                    ${showDuration}
                </td>
                <td id="tdCategory_${id}">
<!--                    <span class="badge badge-secondary">Low</span>-->
<!--                    <span class="badge badge-success">Open</span>-->
                </td>
                <td>
                    ${director}
                </td>
                <td>
                     ${actor}
                </td>
                <td>
                    ${language}
                </td>
                <td>
                    <button type="button" id="btn_edit_movie_${id}" class="btn btn-primary btn-sm waves-effect waves-light btn_edit_movie mb-1">
                        <i class="fas fa-edit"></i></i>
                    </button>
                    <button type="button" id="btn_delete_movie_${id}" class="btn btn-danger btn-sm waves-effect waves-light btn_delete_movie">
                        <i class="fas fa-ban"></i></i>
                    </button>
                </td>
              
        `;

        return str;
    }

    static drawCheckboxCategory(id, category){
        let str = `
            <div class="col-lg-4">
                <div class="custom-control custom-checkbox custom-checkbox-info mb-3">
                    <input type="checkbox" class="custom-control-input category" id="category_${id}" name="${category}">
                    <label class="custom-control-label" for="category_${id}">${category}</label>
                </div>    
            </div>
                
        `;
        return str;
    }
    static drawCheckboxCategoryUp(id, category){
        let str = `
            <div class="col-lg-4">
                <div class="custom-control custom-checkbox custom-checkbox-info mb-3">
                    <input type="checkbox" class="custom-control-input categoryUp ${category}" id="categoryUp_${id}" name="${category}">
                    <label class="custom-control-label" for="categoryUp_${id}">${category}</label>
                </div>    
            </div>
                
        `;
        return str;
    }

    static drawBranchesOnShowSchedulePage(branchId, branchName){
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

    static drawScheduleDetails(movieId, movieName, moviePic, movieDes){
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
                                            
<!--                    <div class="row">-->
                        
<!--                        <div class="row-date" data-date="08/09/2022"><span>08/09<br>2022</span></div>-->
            
<!--                        <div class="row-hour">-->
<!--                            <ul>-->
<!--                            </ul>-->
<!--                        </div>            -->
<!--                    </div>-->
                                    
                </div>
            </div>
        `;

        return str;
    }

    static drawShowDate(showDate, date, year){
        let str = `
            <div class="row ${showDate}">
                <div class="row-date" data-date="${showDate}"><span>${date}<br>${year}</span></div>
<!--                <div class="row-date" data-date="${showDate}"><span>${showDate}</span></div>-->
            </div>
        `;
        return str;
    }

    static drawShowTimeSlot(movieId,roomId, slot){
        let str = `
            <li data-id="${movieId}" data-room-name="${roomId}">${slot}</li>
        `;
        return str;
    }

    static drawSeat(id, name, price, left, top) {
        let str = `<div class="single" data-type-seat-id="${id}" data-price="${price}" 
                        style="left:${left + 'px'}; top: ${top + 'px'}; width: 43px; height: 46px;position: absolute; padding: 12px; text-align: center; vertical-align: middle; font-family: 'Futurab'; font-weight: normal; font-size: 11px; color: #fff; text-transform: uppercase;">
                        ${name}
                   </div>`
        return str;
    }

    static drawSeatCouple(id, name, price, left, top) {
        let str = `<div class="couple" data-type-seat-id="${id}" data-price="${price}" 
                        style="left:${left + 'px'}; top: ${top + 'px'}; width: 86px; height: 46px;position: absolute; padding: 12px; text-align: center; vertical-align: middle; font-family: 'Futurab'; font-weight: normal; font-size: 11px; color: #fff; text-transform: uppercase;">
                        ${name}
                   </div>`
        return str;
    }

}

class User {
    constructor(id, username, password, fullName, phone, email, address, dateOfBirth, status, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.status = status;
        this.role = role;
    }
}




class ShowSchedule {
    constructor(id, movieId, movieName, roomId,roomName, branchId, branchName, showDate, showTimeSlot) {
        this.id = id;
        this.movieId = movieName;
        this.movieName = movieName;
        this.roomId = roomId;
        this.roomName = roomName;
        this.branchId = branchId;
        this.branchName = branchName;
        this.showDate = showDate;
        this.showTimeSlot = showTimeSlot;
    }
}

class Branch {
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}


class Room {
    constructor(id, name, capacity, numberOfRows) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.numberOfRows = numberOfRows;
    }
}


class Status {
    constructor(id, status) {
        this.id = id;
        this.statusName = status;
    }
}

class Role {
    constructor(id, code, name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}


class Movie {
    constructor(id, title, premiereDate, showDuration, categories, fileUrl, director, actor, language, description) {
        this.id = id;
        this.title = title;
        this.premiereDate = premiereDate;
        this.showDuration = showDuration;
        this.categories = categories;
        this.fileUrl = fileUrl;
        this.director = director;
        this.actor = actor;
        this.language = language;
        this.description = description;
    }
}


class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Food {
    constructor(id, name, price, size, deleted) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.sizes = size;
        this.deleted = deleted;

    }
}

class Size {
    constructor(id, size) {
        this.id = id;
        this.size = size;
    }
}

class Seat {
    constructor(id, name, seatType, room) {
        this.id = id;
        this.name = name;
        this.seatType = seatType;
        this.room = room;
    }
}

class SeatType {
    constructor(id , name , price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}


