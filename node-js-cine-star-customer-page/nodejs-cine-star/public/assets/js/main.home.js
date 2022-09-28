import { homePage } from "./app.home-page.js";

import { AppBase } from "./AppBase.js";


import { Movie, Seat, SeatType, Food, Invoice, Ticket, User} from "./app.model.js";



let socket = io();
let clientId = null;
let listSeat = [];
let listFood = [];


let movieCine = new Movie();
let seatType = new SeatType();
let seat = new Seat();
let food = new Food();
let invoice = new Invoice();
let ticket = new Ticket();
let customer = new User();

homePage.element.tempLoadMovieHome = $("#tempLoadMovieHome");
homePage.element.tempContentPrice = $("#tempContentPrice");
homePage.element.tbBodyHomeMovie = $("#homeMovie");
homePage.element.tbcontentPrice = $("#content-price");
homePage.element.ulFood = $(".cons-box ul li");
homePage.element.divSeat = $(".seat-container");
homePage.element.confirmMovie = $(".confirm-film");
homePage.element.confirmTicket = $(".confirm-ticket .confirm-text ul");
homePage.element.confirmTotal = $(".confirm-total .confirm-value");
homePage.element.confirmCons = $(".confirm-cons .confirm-text ul");

homePage.dialogs.element.ulMovie = $("#selectMovie ul");
homePage.dialogs.element.ulBranch = $("#selectBranch ul");
homePage.dialogs.element.ulShowDate = $("#selectShowDate ul");
homePage.dialogs.element.ulShowTimeSlot = $("#selectShowTimeSlot ul");



let tempContentPrice = $.validator.format($.trim(homePage.element.tempContentPrice.val().toString()));


homePage.commands.addRow = () => {
    let str = AppBase.drawMovie(movieCine);
    homePage.element.tbBodyHomeMovie.prepend(str);
}

homePage.commands.addRowPrice = () => {
    homePage.element.tbcontentPrice.prepend($(tempContentPrice(seatType.id, seatType.name, seatType.price)));
}

homePage.commands.addFood = () => {
    let str = AppBase.drawFood(food);
    homePage.element.ulFood.append(str);
}

homePage.commands.addSeat = (left, top) => {
    let str = "";

        if(Number(seat.seatType.id) === 1){
            str = AppBase.drawSeat(seat.id, seat.name, seat.seatType.price, left , top);
        } else {
            str = AppBase.drawSeatCouple(seat.id, seat.name, seat.seatType.price, left , top);
        }
        $(".seat-container").prepend(str);
}

homePage.commands.loadMovies = () => {
    socket.emit("get-all-movie");
}

socket.on("get-all-movie-success", (data) => {
    homePage.dialogs.element.ulMovie.empty();

    $.each(data, (i, item) => {
        movieCine = item;
        let str = `
                    <li>
                        <a href="javascript:void(0);" data-img="${item.fileUrl}" data-id="${item.id}" >
                            <h3>${item.title}</h3>
                        </a>
                    </li>`;
        homePage.dialogs.element.ulMovie.append(str);
        homePage.commands.addRow();

    })
});

socket.on("get-all-movie-error", (statusCode) => {

    if (statusCode === 401) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_401);
    }

    if (statusCode === 403) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_403);
    }
});


homePage.commands.getAllBranchByMovie = (movieId) => {
    socket.emit("get-all-branch-by-movie", movieId, clientId);
}


socket.on("get-all-branch-by-movie-success", (data) => {
    if (data.length) {
        homePage.dialogs.element.ulBranch.empty();

        $.each(data, (i, item) => {

            let str = `<li class = "show"><a href="javascript:void(0);"  data-id="${item.id}" ><h3>${item.name}</h3></a></li>`;
            homePage.dialogs.element.ulBranch.append(str);

        })
    }
});

socket.on("get-all-branch-by-movie-error", (statusCode) => {
    if (statusCode === 401) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_401);
    }

    if (statusCode === 403) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_403);
    }
});

homePage.commands.getAllShowDateByMovieAndBranch = (movieId, branchId) => {
    socket.emit("get-all-show-date-by-movie-and-branch", movieId, branchId, clientId);
}

socket.on("get-all-show-date-by-movie-and-branch-success", (data) => {
    if (data.length) {
        homePage.dialogs.element.ulShowDate.empty();

        $.each(data, (i, item) => {

            let str = `<li class="show"><a href="javascript:void(0);" data-date="${item}"><h3>${item}</h3></a></li>`;
            homePage.dialogs.element.ulShowDate.append(str);

        })
    }
});

socket.on("get-all-show-date-by-movie-and-branch-error", (statusCode) => {
    if (statusCode === 401) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_401);
    }

    if (statusCode === 403) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_403);
    }
});


homePage.commands.getAllShowTimeSlot = (movieId, branchId, showDate) => {

    let data = {
        "movieId": movieId,
        "branchId": branchId,
        "showDate": showDate
    }
    socket.emit("get-all-show-time-slot-home-page", { data, clientId });
}

socket.on("get-all-show-time-slot-home-page-success", (data) => {
    if (data.length) {
        homePage.dialogs.element.ulShowTimeSlot.empty();

        $.each(data, (i, item) => {

            let str = `<li class="show"><a href="javascript:void(0);" data-room-id = "${item.room.id} "data-hour="${item.showTimeSlot}"><h3>${item.showTimeSlot}</h3></a></li>`;
            homePage.dialogs.element.ulShowTimeSlot.append(str);

        })
    }
});

socket.on("get-all-show-time-slot-home-page-error", (statusCode) => {


    if (statusCode === 401) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_401);
    }

    if (statusCode === 403) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_403);
    }
});

homePage.commands.getAllSeatType = () => {
    socket.emit("get-all-seat-type")
}

socket.on("get-all-seat-type-success", (data) => {
    if (data.length) {
        homePage.element.tbcontentPrice.empty();

        $.each(data, (i, item) => {
            seatType = item;
            homePage.commands.addRowPrice();
        })
    }
});

socket.on("get-all-seat-type-error", (statusCode) => {

    if (statusCode === 401) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_401);
    }

    if (statusCode === 403) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_403);
    }
});

homePage.commands.getSeatsByRoomId = (roomId) => {
    let data = {
        "roomId": roomId,
        "clientId": clientId
    }
    socket.emit("get-seats-by-room", { data, clientId });
}

socket.on("get-seats-by-room-success", (data) => {
    if (data.length) {
        $(".seat-container").empty();

        let left = 50;
        let top = 43;
        let size = data.length;
        let count = 0;

        for (let j = 0; j < data[0].room.numberOfRows; j++) {
            let row = (size > 10) ? 10 : size;

            for (let i = 0; i < row; i++) {
                if (count >= data.length) {
                    break;
                }

                if (data[count].seatType.id === 2) {
                    top += 70;
                    left = 50;
                    let rowFinish = data.length - count;

                    for (let k = 0; k < rowFinish; k++) {
                        seat = data[count];
                        homePage.commands.addSeat(left, top);
                        left += 100;
                        count++;
                    }
                    break;
                }


                seat = data[count];
                homePage.commands.addSeat(left, top);

                left += 50;
                count++;
            }
            size -= 10;
            left = 50;
            top += 50;
        }

    }
});

socket.on("get-seats-by-room-error", (statusCode) => {

    if (statusCode === 401) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_401);
    }

    if (statusCode === 403) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_403);
    }
});


homePage.commands.getAllFood = () => {
    return $.ajax({
        type: "GET",
        url : homePage.url.getAllFood
    }).done( (data) => {

        homePage.element.ulFood.empty();
        homePage.element.ulFood.append("<h2>Đồ Ăn - Thức Uống</h2>");

        $.each(data , (i , item) => {
            food = item;
            homePage.commands.addFood();
        })
    }).fail((err) => {
        alert("Load food fail");
    })
}


function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function removeCharactor(charactor, letters) {
    letters = letters.replaceAll(charactor, "");
    return letters;
}

$('.sub-tab li a').click(function (e) {

    e.preventDefault();
    $('.sub-tab li').removeClass('current');
    $(this).parent().addClass('current');
    // var url = $(this).attr('href');
    let dataName = $(this).attr('data-name');


    if ($('.movie-content .slide-wrapper').children().length > 0) {
        $('.movie-content .slide-wrapper').children().remove();
    }

    if (dataName == "playing") {
        homePage.commands.loadMovies();
    }

    $('.movie-load').css({ "opacity": 1 });

});

$("#selectMovie").on('click', "li a", function (e) {
    // let cate = $(this).parents('.select-list').attr('data-cate');
    let movie_id = $(this).attr("data-id");

    $(this).parents('.select-list').find('.select-header h3').text($(this).text());
    $(this).closest('.select-box').fadeOut(200, 'linear');
    $(this).parent().parent().find(' > li').removeClass('selected');
    $(this).parent().addClass('selected');

    // if(cate === "film") {
    homePage.commands.getAllBranchByMovie(movie_id);
    // }

})

$("#selectBranch").on("click", "li a", function () {
    let movie_id = $("#selectMovie li.selected a").attr("data-id");
    let branchId = $(this).attr("data-id");

    $(this).parents('.select-list').find('.select-header h3').text($(this).text());
    $(this).closest('.select-box').fadeOut(200, 'linear');

    $(this).parent().parent().find(' > li').removeClass('selected');
    $(this).parent().addClass('selected');

    homePage.commands.getAllShowDateByMovieAndBranch(movie_id, branchId);
})


$("#selectShowDate").on("click", "li a", function () {
    let movie_id = $("#selectMovie li.selected a").attr("data-id");
    let branchId = $("#selectBranch li.selected a").attr("data-id");
    let showDate = $(this).attr("data-date");

    $(this).parents('.select-list').find('.select-header h3').text($(this).text());
    $(this).closest('.select-box').fadeOut(200, 'linear');

    $(this).parent().parent().find(' > li').removeClass('selected');
    $(this).parent().addClass('selected');

    homePage.commands.getAllShowTimeSlot(movie_id, branchId, showDate);
})

$("#selectShowTimeSlot").on("click", "li a", function () {
    let movieName = $(".select-header h3[data-holder = 'Chọn phim']").text();
    let showTimeSlot = $(this).attr("data-hour");
    let showDate = $("#selectShowDate li.selected a").attr("data-date");

    $('.container').css({ 'height': $(window).height(), 'overflow-y': 'hidden', 'opacity': 0.5 });

    $(this).parent().parent().find(' > li').removeClass('selected');
    $(this).parent().addClass('selected');

    $(".order-overview h2 span").text(movieName);
    $(".about-ticket li:nth-child(1) p.value").text(showTimeSlot);
    $(".about-ticket li:nth-child(2) p.value").text(showDate)

    $(".section-order").css({ "height": $(window).height() });
    $('.order-content').css({ 'display': 'block' });
    $('.ticket-content').css({ 'display': 'block' });

    homePage.commands.getAllSeatType();

});

$(document).on("click", "#ticket-back", function(e) {
    e.preventDefault();

    $('.container').css({ 'height': "auto", 'overflow-y': 'auto', 'opacity': 1 });
    $('.order-content').css({ 'display': 'none' });
    $('.ticket-content').css({ 'display': 'none' });

    $('.section-order').stop().animate({'height': 0}, 200, 'linear', function(){
                resetForm();
                resetOrder();
    
    });

})


$('.movie-item').off();

$('.movie-content .movie-load').on("mouseenter", ".movie-item", function (e) {
    $('.movie-item.show').removeClass('show').addClass('hide');
    hoverMovie($(this));
})

$('.movie-content .movie-load').on("mouseleave", ".movie-item", function (e) {
    leaveMovie($(this));
})

$(document).on("click", ".add", function (e) {
    e.preventDefault();

    let totalSeat = 0;
    let totalPrice = 0;
    let ticket_num = parseInt($(this).parent().parent().find(".ticket-num input").val());
    ticket_num++;
    $(this).parent().parent().find(".ticket-num input").val(ticket_num);
    let ticket_price = parseInt($(this).parent().parent().find(".ticket-price").attr("data-price"));

    $(".ticket-num input").each(function (i, item) {
        totalSeat += parseInt($(item).val());
    })

    if (ticket_num > 0) {
        $("#ticket-back").parent().addClass("active");
    }

    if (totalSeat > 10) {
        $(this).parent().parent().find(".ticket-num input").val(--ticket_num);
        alert("Vui lòng chọn tối đa 10 ghế!");
        return;
    }

    let ticket_total = ticket_num * ticket_price;

    $(this).parent().parent().find(".ticket-total span").text(formatNumber(ticket_total));

    $(".ticket-total span").each(function (i, item) {
        totalPrice += parseInt(removeCharactor(".", $(item).text()));
    });


    $(".about-ticket li:nth-child(3) p.value span").text(totalSeat);
    $(".total-ticket-num span").text(totalSeat);
    $(".about-ticket li:nth-child(4) p.value span").text(formatNumber(totalPrice))
    $(".total-ticket-amount span").text(formatNumber(totalPrice));
})

$(document).on("click", ".minus", function (e) {

    e.preventDefault();

    let totalSeat = 0;
    let totalPrice = 0;
    let ticket_num = parseInt($(this).parent().parent().find(".ticket-num input").val());

    if (ticket_num === 0) {
        alert("Vui lòng chọn số lượng ghế phù hợp!");
        return;
    }

    ticket_num--;
    $(this).parent().parent().find(".ticket-num input").val(ticket_num);
    let ticket_price = parseInt($(this).parent().parent().find(".ticket-price").attr("data-price"));

    $(".ticket-num input").each(function (i, item) {
        totalSeat += parseInt($(item).val());
    })

    if (ticket_num === 0) {
        $("#ticket-back").parent().removeClass("active");
    }

    if (totalSeat > 10) {
        $(this).parent().parent().find(".ticket-num input").val(--ticket_num);
        alert("Vui lòng chọn tối đa 10 ghế!");
        return;
    }



    let ticket_total = ticket_num * ticket_price;

    $(this).parent().parent().find(".ticket-total span").text(formatNumber(ticket_total));

    $(".ticket-total span").each(function (i, item) {
        let price = removeCharactor(".", $(item).text());
        console.log(price);
        totalPrice += parseInt(removeCharactor(".", $(item).text()));
        console.log(totalPrice);
    });
    console.log(totalPrice);



    $(".about-ticket li:nth-child(3) p.value span").text(totalSeat);
    $(".total-ticket-num span").text(totalSeat);
    console.log(formatNumber(totalPrice));
    $(".about-ticket li:nth-child(4) p.value span").text(formatNumber(totalPrice))
    $(".total-ticket-amount span").text(formatNumber(totalPrice));
})





$("#ticket-next").on("click", function () {
    $(".final-content").attr("style", "display:none");
    $(".ticket-content").attr("style", "display:none");
    $(".user-content").attr("style", "display:none");
    $('.section-order').css({ 'height': 'auto' });


    $("#cinema-content").css({ "opacity": "1", "display": "block" });

    let branchName = $(".cart-content .select-list[data-cate = 'cine'] .select-header h3").text();

    $(".cinema-name h2").text(branchName);

    let roomId = $("#selectShowTimeSlot li.selected a").attr("data-room-id");

    homePage.commands.getSeatsByRoomId(roomId);

})

$(document).on("click" , "#cinema-back", function(e) {
    e.preventDefault();

    listSeat = [];
    listFood = [];
    $('.seat-number').html('');
    $('.cinema-seat td').removeClass('choosing');
    $(".cinema-btn").removeClass("active");
    $('.cons-text').html('');
    $('.cons-value span').html('0');

    $(".ticket-content").css({"display" : "block", "opacity" : 0});
    $('.section-order').css({ 'height': 'auto' });
    $("#cinema-content").css({ "opacity": "0", "display": "none" });

    $('.combo-item').each(function(index, element) {
        $(element).find('input').val(0).attr({'data-total':0});
        $(element).find('.combo-total-outer span').html('0');
        $('.cons-but').removeClass('show');
    });

    $('html, body').stop().animate({scrollTop: 0}, 150, 'linear', function(){
        $('.ticket-content').css({'opacity': 1});
    });
})

$(document).on("click", ".cons-chose", function(e) {
    e.preventDefault();

    $(".order-content").prepend("<span class='overlay-cons'></span>");

    $(".cons-content").addClass("show");

    listFood = [];

    // homePage.commands.getAllFood();
})


$(document).on("click",".cmb-add", function(e) {
    e.preventDefault();

    let price = $(this).parent().find("input").attr("data-price");
    let num = $(this).parent().find("input").val();
    let nameFood = $(this).parent().find("input").attr("data-name");
 
    
    $(this).parent().find("input").val(++num);

    let total = parseInt(price) * num;

    $(this).parent().parent().find(".combo-total-outer span").text(formatNumber(total));
    
    if(num == 1) {
        $(".cons-text").append(`<li data-name = "${nameFood}"> ${num} x ${nameFood} </li>`);
    } else {
        $(`.cons-text li[data-name = "${nameFood}"]`).remove();
        $(".cons-text").append(`<li data-name = "${nameFood}"> ${num} x ${nameFood} </li>`);
    }


    let totalPrice = 0;
    $(".combo-total-outer span").each(function (i, item) {
        totalPrice += parseInt(removeCharactor(".", $(item).text()));
    });

    $(".cons-total").css({"display" : "inline-block"});
    $(".cons-value span").text(formatNumber(totalPrice));
})

$(document).on("click",".cmb-minus", function(e) {
    e.preventDefault();

    let price = $(this).parent().find("input").attr("data-price");
    let num = $(this).parent().find("input").val();
    let nameFood = $(this).parent().find("input").attr("data-name");

    if(num == 0) {
        return;
    }

    
    $(this).parent().find("input").val(--num);

    let total = parseInt(price) * num;

    $(this).parent().parent().find(".combo-total-outer span").text(formatNumber(total));
    
    if(num == 0) {
        $(`.cons-text li[data-name = "${nameFood}"]`).remove();
    } else {
        $(`.cons-text li[data-name = "${nameFood}"]`).remove();
        $(".cons-text").append(`<li data-name = "${nameFood}"> ${num} x ${nameFood} </li>`);
    }


    let totalPrice = 0;
    $(".combo-total-outer span").each(function (i, item) {
        totalPrice += parseInt(removeCharactor(".", $(item).text()));
    });

    $(".cons-total").css({"display" : "inline-block"});
    $(".cons-but").addClass("show");
    $(".cons-value span").text(formatNumber(totalPrice));
})


$(document).on('click', '#cons-cancel', function(e) {
    $('.cons-total').css({'display': 'none'});
    $('.cons-text').html('');
    $('.cons-value span').html('0');


    $('.combo-item').each(function(index, element) {
        $(element).find('input').val(0).attr({'data-total':0});
        $(element).find('.combo-total-outer span').html('0');
        $('.cons-but').removeClass('show');
    });

    $(".order-content > span").remove();

    $(".cons-content").removeClass("show");

    listFood = [];

});

$(document).on("click", "#cons-ok", function(e) {
    e.preventDefault();

    $(".order-content > span").remove();

    $(".cons-content").removeClass("show");

    let count = 0;
    $(".combo-item").each( function(index, item) {
        let num = $(item).find(".combo-input input").val();
        console.log($(item));
        console.log($(item).find(".combo-input input"));

        if(num > 0) {
          count++;
          $(".cons-but").addClass("show");
          let totalPrice = removeCharactor(".",$(item).find(".combo-total-outer span").text());
          let name = $(item).find(".combo-text h3").text();
          let food = {"product" : `${num} x ${name}`, "totalPrice" : totalPrice};
          console.log(num);
          console.log(name);
          console.log(food);

          listFood.push(food);
        }
    })
    
    if(count == 0 ) {
        $(".cons-but").removeClass("show");
    }
})


$(".seat-container").on("click", "div", function(e) {
    let numberSeatOfCouple = $("#content-price tr[data-seatstyle-id = '2'] input").val();
    let numberSeatOfSingle = $("#content-price tr[data-seatstyle-id = '1'] input").val();
    let statusSeat = $(this).attr("class");
    let seatTypeId = $(this).attr("data-type-seat-id");
    let seatName = $(this).text().trim();
    let price = $(this).attr("data-price");
    

    if(statusSeat.includes("busy")) {
        alert("Ghế này đã được đặt rồi! Vui lòng chọn ghế khác!");
        return;
    }

    if(statusSeat.includes("choosing")) {
        $(this).removeClass("choosing");
        $('.cinema-btn').removeClass("active");
        $(`.seat-number span[data-name = '${seatName}'`).remove();
        listSeat = listSeat.filter(function (item,index) {
            return item.price != price && item.seatName != seatName;
        })
        return;
    }

    if(numberSeatOfCouple == 0 && statusSeat.includes("couple")) {
        alert("Bạn không đặt ghế loại này! Vui lòng chọn ghế loại khác!");
        return;
    }

    if(numberSeatOfSingle == 0 && statusSeat.includes("single")) {
        alert("Bạn không đặt ghế loại này! Vui lòng chọn ghế loại khác!");
        return;
    }

    let countSingle = 0;
    let countCouple = 0;
    $(".seat-container div").each( (i, item) => {
        console.log($(item));
        if($(item).attr("class").includes("single choosing")){
            countSingle++;
        }

        if($(item).attr("class").includes("couple choosing")){
            countCouple++;
        }
    })

    if((countSingle == numberSeatOfSingle && statusSeat.includes("single")) || (countCouple == numberSeatOfCouple && statusSeat.includes("couple"))) {
        alert("Bạn đã đặt đủ số lượng ghế loại này!");
        return;
    }

    listSeat.push({ "price" : price, "seatName": seatName});


    $(this).addClass("choosing");
    (seatTypeId == 1) ? countSingle++ : countCouple++;

    $(".seat-number").append(`<span data-num="${seatTypeId}" data-name = "${seatName}" >${seatName}</span>`);

    if(numberSeatOfSingle == countSingle && numberSeatOfCouple == countCouple) {
        $('.cinema-btn').addClass("active");

        let top = $('.cinema-content').innerHeight();
        $('html, body').animate({scrollTop: top}, 'slow');
    }

})


$(document).on("click", "#cinema-next", function(e) {
    e.preventDefault();

    $(".final-content").css({"display" : "block"});
    $("#cinema-content").css({"display" : "none" , "opacity" : 0});

    let movieName = $(".select-header h3[data-holder = 'Chọn phim']").text();
    let image = $("#selectMovie li.selected a").attr("data-img");
    let showTimeSlot = $("#selectShowTimeSlot li.selected a").attr("data-hour");
    let showDate = $("#selectShowDate li.selected a").attr("data-date");
    let priceTicket = parseInt(removeCharactor(".",$(".about-ticket li:nth-child(4) p.value span").text()));
    let priceFood = parseInt(removeCharactor("." , $(".cons-but .cons-total .cons-value span").text()));
    console.log(priceTicket + priceFood);
    

    let data = {
        "movieName": movieName,
        "image" : image,
        "showTimeSlot" : showTimeSlot,
        "showDate" : showDate
    }

    let str = AppBase.drawBillMovie(data);
    homePage.element.confirmMovie.append(str);

    for(let i = 0; i < listSeat.length; i++) {
        homePage.element.confirmTicket.append(AppBase.drawBillSeat(listSeat[i]));
    }

    if(listFood.length == 0) {
        $(".confirm-cons").css({"opacity" : 0});
    }else {
        $(".confirm-cons").css({"opacity" : 1});
        for(let i = 0; i < listFood.length; i++) {
            homePage.element.confirmCons.append(AppBase.drawBillFood(listFood[i]));
        }
    }

   

    homePage.element.confirmTotal.append(`<span>${formatNumber(priceTicket + priceFood)}</span><sup>đ</sup>`);

    
})

$(document).on("click", "#payment-back", function(e) {
    e.preventDefault();

    homePage.element.confirmMovie.html("");
    homePage.element.confirmTicket.html("");
    homePage.element.confirmTotal.html("");
    homePage.element.confirmCons.html("");

    $(".final-content").css({"display" : "none"});
    $("#cinema-content").css({"display" : "block" , "opacity" : 1});
})

$("#payment-next").on("click", function(e) {
    e.preventDefault();

    if($('.check_terms_condition:checked').length == 0) {
        alert('Vui lòng chọn chấp nhận các điều khoản, điều kiện và phương thức thanh toán.');
        return;
    }

    customer.id = 1;

    invoice.customer = customer;
    



})

$(() => {
    homePage.commands.getAllFood();
});

