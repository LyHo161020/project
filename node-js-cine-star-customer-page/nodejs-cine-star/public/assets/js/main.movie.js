import { AppBase } from "./AppBase.js";

import {moviePage} from "./app.movie-page.js";


// import { Movie, Seat, SeatType } from "./app.model.js";

let socket = io();
let clientId = null;


// let movies = new Movie();

function  loadNowShowing() {

    $.ajax({
        headers: {
            "Content-Type": "Application/json",
            "Accept": "Application/json"
        },
        type: "GET",
        url: moviePage.urls.getAllMovies
    })

        .done((item) => {
            let count = 0;
            $.each(item, (i, item) => {
                let str = `
                    <div id="${item.id}" class="film-item t-2d" style="height: 475px;">
                        <a id="description${item.id}" href="">
                            <div class="film-item-pic">
                                <img src="${item.fileUrl}"
                                     alt="${item.title}" />
                            </div>
                            <div class="film-item-txt">
                                <h3>${item.title} (C13)</h3>
                                <p>${item.description}</p>
                            </div>
                        </a>
                        <div class="film-item-type">
                            <span class="icon-2d"></span>
                            <span class="icon-am3d"></span>
                            <span class="icon-3d"></span>
                        </div>
                        <div class="film-item-but">
                             <a class="trailer-btn fontsize13"
                               data-href="${item.trailer}">TRAILER
                             </a>

                            <a class="cart-btn fontsize13"
                               href="/assets/customer_page/lichchieu/38c7bd6f-8fea-4999-8afe-fdbb723cca3d.html">Mua vé</a>
                        </div>

                    </div>
            `;
                $("#tbListShowing").prepend(str);
                if (count %4 === 3) {
                    $(`#${item.id}`).addClass("cl-org");
                }
                 else if (count %4 === 2) {
                    $(`#${item.id}`).addClass("cl-ppl-dark");
                }
                else if (count %4 === 1) {
                    $(`#${item.id}`).addClass("cl-ppl");

                }
                else {
                    $(`#${item.id}`).addClass("cl-pnk");
                }
                count++;
            })
            // handleMovieDescription();
        })
        .fail((jqXHR) => {
            let str = ``;

            if (jqXHR.status === 401) {
                setTimeout(() => {
                    AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_401);
                }, 3000)

                location.href = moviePage.urls.logout;

            }  else if (jqXHR.status === 403) {
                AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_403);

            } else if (jqXHR.status === 500) {
                AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_500);

            } else if (jqXHR.responseJSON) {

                $.each(jqXHR.responseJSON, function (key, value) {
                    str += `<label id="${key}Load-error" class="error" for="${key}Load">${value}</label>`;
                    $("#" + key).addClass("error");
                });

            }
        })
}

loadNowShowing();


    $(".movie-col[ data-open = 'playing']").on("click",".film-item > a" , function (e) {
        let id = $(this).parent().attr("id");
        e.preventDefault();
        window.location.href = `/movies/${id}`;
    })

    $(document).on("click", "#tbListShowing .film-item .film-item-but .trailer-btn", function (e) {
        e.preventDefault();
        $(".allvideo").empty();
        let href = $(this).attr("data-href");
        console.log(href);
        let str = `<div class ="video-list">
                        <div class ="close-video"></div>
                        <div class ="video-wrap">
                            <iframe width="100%" height="100%" src="${href}"
                                    frameBorder="0" allowFullScreen=""></iframe>
                        </div>
                    </div>`;

        $(".allvideo").html(str);

        $(".allvideo").css({'width' : '100%' , 'display' :  'block'});

        $('.overlay-video').fadeIn(500, 'linear');

    })

$(document).on("click" , ".close-video" , function (e) {
    e.preventDefault();

    $(".allvideo").html("");

    $(".allvideo").css({'width' : '0px' , 'display' :  'none'});

    $('.overlay-video').fadeOut(500, 'linear');
})

